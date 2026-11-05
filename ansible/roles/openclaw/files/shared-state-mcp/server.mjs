import { mkdirSync, chmodSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { DatabaseSync } from "node:sqlite";

const SERVER_NAME = "cron-shared-state";
const SERVER_VERSION = "1.0.0";
const MAX_CONTENT_BYTES = 262_144;
const MAX_GROUP_CODE_POINTS = 64;
const MAX_GROUP_BYTES = 128;

const INSTRUCTIONS = [
  "Shared memory for trusted Cron jobs. Use it only when jobs should intentionally share durable state.",
  "Choose one exact group name for related jobs; groups_list shows existing names without exposing their contents.",
  "For each participating Cron, include the exact tool IDs cron_shared_state__shared_state_get and cron_shared_state__shared_state_set in its finite toolsAllow. Keep groups_list for owner setup, not routine runs. A new group is created by the first set at revision 0; no restart or per-job ID registration is needed.",
  "Use shared_state_get before shared_state_set. Pass the returned currentRevision as expectedRevision; on a revision conflict, read again and reconcile.",
  "Access is granted per job by its finite toolsAllow list. Any job granted these tools can read or change any group, so grant them only to jobs that need shared state.",
  "Do not store credentials, tokens, or other secrets. Content is limited to 256 KiB and writes cannot delete a group."
].join(" ");

const TOOLS = [
  {
    name: "groups_list",
    description: "List shared state group names and revisions without returning their contents.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false
    },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
  },
  {
    name: "shared_state_get",
    description: "Read shared state for an exact group name. A missing group has content null and currentRevision 0.",
    inputSchema: {
      type: "object",
      properties: {
        group: { type: "string", minLength: 1, maxLength: MAX_GROUP_CODE_POINTS, description: "Exact shared group name; names are case-sensitive." }
      },
      required: ["group"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
  },
  {
    name: "shared_state_set",
    description: "Replace shared state for an exact group name using compare-and-swap. Requires the currentRevision returned by shared_state_get; content must be a string of at most 256 KiB. This tool cannot delete a group.",
    inputSchema: {
      type: "object",
      properties: {
        group: { type: "string", minLength: 1, maxLength: MAX_GROUP_CODE_POINTS, description: "Exact shared group name; names are case-sensitive." },
        content: { type: "string", maxLength: MAX_CONTENT_BYTES },
        expectedRevision: { type: "integer", minimum: 0 }
      },
      required: ["group", "content", "expectedRevision"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false }
  }
];

process.umask(0o077);

const stateRoot = process.env.OPENCLAW_STATE_DIR || join(homedir(), ".openclaw");
const databaseDirectory = join(stateRoot, "shared-state");
mkdirSync(databaseDirectory, { recursive: true, mode: 0o700 });
chmodSync(databaseDirectory, 0o700);

const databasePath = join(databaseDirectory, "cron-groups.sqlite");
const database = new DatabaseSync(databasePath);
chmodSync(databasePath, 0o600);
database.exec("PRAGMA busy_timeout = 5000");
database.exec("PRAGMA journal_mode = WAL");
database.exec("PRAGMA synchronous = FULL");
database.exec(`
  CREATE TABLE IF NOT EXISTS shared_state_groups (
    group_name TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    revision INTEGER NOT NULL CHECK (revision > 0),
    updated_at_ms INTEGER NOT NULL
  )
`);

const selectGroup = database.prepare(
  "SELECT group_name, content, revision, updated_at_ms FROM shared_state_groups WHERE group_name = ?"
);
const listGroups = database.prepare(
  "SELECT group_name, revision, updated_at_ms FROM shared_state_groups ORDER BY updated_at_ms DESC, group_name COLLATE NOCASE ASC LIMIT 201"
);

function normalizeGroup(value) {
  if (typeof value !== "string") throw new TypeError("group must be a string");
  const group = value.normalize("NFC").trim();
  const codePoints = [...group];
  if (
    codePoints.length === 0 ||
    codePoints.length > MAX_GROUP_CODE_POINTS ||
    Buffer.byteLength(group, "utf8") > MAX_GROUP_BYTES ||
    /[\p{Cc}\p{Cf}]/u.test(group)
  ) {
    throw new TypeError("group must be 1–64 characters without control or formatting characters");
  }
  return group;
}

function readGroup(groupValue) {
  const group = normalizeGroup(groupValue);
  const row = selectGroup.get(group);
  return {
    group,
    content: row?.content ?? null,
    currentRevision: row?.revision ?? 0,
    updatedAtMs: row?.updated_at_ms ?? null,
    maxBytes: MAX_CONTENT_BYTES
  };
}

function writeGroup(groupValue, content, expectedRevision) {
  const group = normalizeGroup(groupValue);
  if (typeof content !== "string") throw new TypeError("content must be a string");
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0) {
    throw new TypeError("expectedRevision must be a non-negative integer from shared_state_get");
  }
  if (Buffer.byteLength(content, "utf8") > MAX_CONTENT_BYTES) {
    throw new TypeError(`content exceeds ${MAX_CONTENT_BYTES} UTF-8 bytes`);
  }

  database.exec("BEGIN IMMEDIATE");
  try {
    const current = selectGroup.get(group);
    const currentRevision = current?.revision ?? 0;
    if (currentRevision !== expectedRevision) {
      database.exec("ROLLBACK");
      return { ok: false, reason: "revision-conflict", currentRevision };
    }

    const nextRevision = currentRevision + 1;
    const updatedAtMs = Date.now();
    if (current) {
      database.prepare(
        "UPDATE shared_state_groups SET content = ?, revision = ?, updated_at_ms = ? WHERE group_name = ?"
      ).run(content, nextRevision, updatedAtMs, group);
    } else {
      database.prepare(
        "INSERT INTO shared_state_groups (group_name, content, revision, updated_at_ms) VALUES (?, ?, ?, ?)"
      ).run(group, content, nextRevision, updatedAtMs);
    }
    database.exec("COMMIT");
    return { ok: true, group, currentRevision: nextRevision, updatedAtMs, maxBytes: MAX_CONTENT_BYTES };
  } catch (error) {
    try {
      database.exec("ROLLBACK");
    } catch {
      // The transaction may already have been rolled back by SQLite.
    }
    throw error;
  }
}

function listGroupNames() {
  const rows = listGroups.all();
  const groups = rows.slice(0, 200);
  return {
    groups: groups.map((row) => ({
      group: row.group_name,
      currentRevision: row.revision,
      updatedAtMs: row.updated_at_ms
    })),
    truncated: rows.length > groups.length
  };
}

function toolSuccess(value) {
  return {
    content: [{ type: "text", text: JSON.stringify(value) }],
    structuredContent: value,
    isError: false
  };
}

function toolFailure(error) {
  const message = error instanceof TypeError ? error.message : "shared state operation failed";
  return { content: [{ type: "text", text: message }], isError: true };
}

function callTool(name, input) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    throw new TypeError("arguments must be an object");
  }
  switch (name) {
    case "groups_list":
      if (Object.keys(input).length > 0) throw new TypeError("groups_list accepts no arguments");
      return toolSuccess(listGroupNames());
    case "shared_state_get":
      if (Object.keys(input).some((key) => key !== "group")) throw new TypeError("shared_state_get accepts only group");
      return toolSuccess(readGroup(input.group));
    case "shared_state_set":
      if (Object.keys(input).some((key) => !["group", "content", "expectedRevision"].includes(key))) {
        throw new TypeError("shared_state_set accepts only group, content, and expectedRevision");
      }
      return toolSuccess(writeGroup(input.group, input.content, input.expectedRevision));
    default:
      throw new TypeError(`unknown shared state tool: ${name}`);
  }
}

function jsonRpcError(id, code, message) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

function handleRequest(message) {
  if (!message || typeof message !== "object" || Array.isArray(message) || message.jsonrpc !== "2.0") {
    return jsonRpcError(null, -32600, "Invalid Request");
  }
  const id = message.id;
  const isNotification = id === undefined;
  const method = message.method;
  const params = message.params && typeof message.params === "object" ? message.params : {};

  if (typeof method !== "string") return isNotification ? null : jsonRpcError(id, -32600, "Invalid Request");
  if (method.startsWith("notifications/")) return null;
  if (isNotification) return null;

  try {
    switch (method) {
      case "initialize":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: typeof params.protocolVersion === "string" ? params.protocolVersion : "2025-03-26",
            capabilities: { tools: { listChanged: false } },
            serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
            instructions: INSTRUCTIONS
          }
        };
      case "ping":
        return { jsonrpc: "2.0", id, result: {} };
      case "tools/list":
        return { jsonrpc: "2.0", id, result: { tools: TOOLS } };
      case "tools/call": {
        try {
          const result = callTool(params.name, params.arguments ?? {});
          return { jsonrpc: "2.0", id, result };
        } catch (error) {
          return { jsonrpc: "2.0", id, result: toolFailure(error) };
        }
      }
      default:
        return jsonRpcError(id, -32601, `Method not found: ${method}`);
    }
  } catch {
    return jsonRpcError(id, -32603, "Internal error");
  }
}

function send(message) {
  if (message !== null) process.stdout.write(`${JSON.stringify(message)}\n`);
}

const input = createInterface({ input: process.stdin, crlfDelay: Infinity });
for await (const line of input) {
  if (!line.trim()) continue;
  let request;
  try {
    request = JSON.parse(line);
  } catch {
    send(jsonRpcError(null, -32700, "Parse error"));
    continue;
  }
  if (Array.isArray(request)) {
    for (const item of request) send(handleRequest(item));
  } else {
    send(handleRequest(request));
  }
}

database.close();
