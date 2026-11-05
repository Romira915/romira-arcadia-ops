import { createHash, timingSafeEqual } from "node:crypto";
import { mkdirSync, chmodSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";

const VERSION = "1.0.0";
const PORT = Number(process.env.HERMES_OPENCLAW_MCP_PORT || 18790);
const ANDROID_NODE = "a98c6bfad2f7815b27bbe5779f99a760d24b5f53fc62f02c9a629027b698e977";
const DEFAULT_MAX_AGE_MS = 21_600_000;
const MAX_MAX_AGE_MS = 86_400_000;
const MAX_NOTIFICATIONS = 50;
const MAX_NOTIFICATION_TEXT_CHARS = 2_000;
const MAX_CONTENT_BYTES = 262_144;
const MAX_GROUP_CODE_POINTS = 64;
const MAX_GROUP_BYTES = 128;
const bearerToken = process.env.HERMES_OPENCLAW_MCP_TOKEN || "";

if (bearerToken.length < 32) {
  throw new Error("HERMES_OPENCLAW_MCP_TOKEN is not configured");
}

const ANDROID_TOOLS = [
  {
    name: "notifications_list",
    description: "Read recent Android notifications from the paired phone. This tool never opens, marks, deletes, or replies to notifications.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "integer", minimum: 1, maximum: MAX_NOTIFICATIONS, default: 20 },
        maxAgeMs: { type: "integer", minimum: 1, maximum: MAX_MAX_AGE_MS, default: DEFAULT_MAX_AGE_MS }
      },
      additionalProperties: false
    },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
  }
];

const STATE_TOOLS = [
  {
    name: "shared_state_get",
    description: "Read shared state for an exact group name. A missing group has content null and currentRevision 0.",
    inputSchema: {
      type: "object",
      properties: { group: { type: "string", minLength: 1, maxLength: MAX_GROUP_CODE_POINTS } },
      required: ["group"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
  },
  {
    name: "shared_state_set",
    description: "Replace shared state using compare-and-swap. Use currentRevision from shared_state_get. This tool cannot delete a group.",
    inputSchema: {
      type: "object",
      properties: {
        group: { type: "string", minLength: 1, maxLength: MAX_GROUP_CODE_POINTS },
        content: { type: "string", maxLength: MAX_CONTENT_BYTES },
        expectedRevision: { type: "integer", minimum: 0 }
      },
      required: ["group", "content", "expectedRevision"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false }
  }
];

const stateRoot = process.env.OPENCLAW_STATE_DIR || join(homedir(), ".openclaw");
const databaseDirectory = join(stateRoot, "shared-state");
mkdirSync(databaseDirectory, { recursive: true, mode: 0o700 });
chmodSync(databaseDirectory, 0o700);
const database = new DatabaseSync(join(databaseDirectory, "cron-groups.sqlite"));
chmodSync(join(databaseDirectory, "cron-groups.sqlite"), 0o600);
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

function normalizeGroup(value) {
  if (typeof value !== "string") throw new TypeError("group must be a string");
  const group = value.normalize("NFC").trim();
  const points = [...group];
  if (
    points.length === 0 || points.length > MAX_GROUP_CODE_POINTS ||
    Buffer.byteLength(group, "utf8") > MAX_GROUP_BYTES || /[\p{Cc}\p{Cf}]/u.test(group)
  ) throw new TypeError("invalid group name");
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
  if (typeof content !== "string" || Buffer.byteLength(content, "utf8") > MAX_CONTENT_BYTES) {
    throw new TypeError("invalid shared state content");
  }
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0) {
    throw new TypeError("expectedRevision must be a non-negative integer");
  }
  database.exec("BEGIN IMMEDIATE");
  try {
    const current = selectGroup.get(group);
    const revision = current?.revision ?? 0;
    if (revision !== expectedRevision) {
      database.exec("ROLLBACK");
      return { ok: false, reason: "revision-conflict", currentRevision: revision };
    }
    const nextRevision = revision + 1;
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
    try { database.exec("ROLLBACK"); } catch { /* transaction already rolled back */ }
    throw error;
  }
}

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function toolResult(value, isError = false) {
  return {
    content: [{ type: "text", text: JSON.stringify(value) }],
    structuredContent: value,
    isError
  };
}

function jsonRpcError(id, code, message) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

function runOpenClaw(args, timeoutMs = 30_000) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: "/app",
      env: { ...process.env, OPENCLAW_GATEWAY_PORT: "18789" },
      stdio: ["ignore", "pipe", "ignore"]
    });
    let stdout = "";
    let settled = false;
    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error) reject(error); else resolve(value);
    };
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      finish(new Error("invoke-timeout"));
    }, timeoutMs);
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      if (stdout.length > 2_000_000) {
        child.kill("SIGKILL");
        finish(new Error("invoke-output-limit"));
      }
    });
    child.once("error", () => finish(new Error("invoke-start-failed")));
    child.once("close", (code) => {
      if (code !== 0) return finish(new Error("invoke-failed"));
      try { finish(null, JSON.parse(stdout.trim())); }
      catch { finish(new Error("invoke-invalid-json")); }
    });
  });
}

async function listNotifications(args) {
  const limit = args.limit === undefined ? 20 : args.limit;
  const maxAgeMs = args.maxAgeMs === undefined ? DEFAULT_MAX_AGE_MS : args.maxAgeMs;
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_NOTIFICATIONS) throw new TypeError("limit must be 1–50");
  if (!Number.isInteger(maxAgeMs) || maxAgeMs < 1 || maxAgeMs > MAX_MAX_AGE_MS) throw new TypeError("maxAgeMs is out of range");

  const response = await runOpenClaw([
    "dist/index.js", "nodes", "invoke",
    "--node", ANDROID_NODE,
    "--command", "notifications.list",
    "--params", JSON.stringify({ limit, maxAgeMs }),
    "--timeout", "30000",
    "--invoke-timeout", "15000",
    "--json"
  ]);
  if (response?.ok !== true) throw new Error("notifications-unavailable");
  const payload = asObject(response.payload);
  const items = payload.notifications;
  if (!Array.isArray(items) || !items.every((item) => item && Number.isFinite(item.postTimeMs))) {
    throw new Error("notifications-invalid-response");
  }

  const fetchedAt = Date.now();
  const cutoff = fetchedAt - maxAgeMs;
  const sorted = items.every((item, index) => index === 0 || items[index - 1].postTimeMs >= item.postTimeMs);
  const boundaryReached = sorted && items.some((item) => item.postTimeMs <= cutoff);
  const countMatches = Number.isFinite(payload.count) && payload.count === items.length;
  const recent = items
    .filter((item) => item.postTimeMs >= cutoff)
    .sort((a, b) => b.postTimeMs - a.postTimeMs)
    .slice(0, MAX_NOTIFICATIONS)
    .map((item) => {
      const packageName = typeof item.packageName === "string" ? item.packageName : "";
      const title = typeof item.title === "string" ? item.title : "";
      const text = typeof item.text === "string" ? item.text : "";
      const subText = typeof item.subText === "string" ? item.subText : "";
      const fingerprint = createHash("sha256")
        .update(JSON.stringify([item.postTimeMs, packageName, title, text, subText]))
        .digest("hex")
        .slice(0, 32);
      let remaining = MAX_NOTIFICATION_TEXT_CHARS;
      const clip = (value, maximum) => {
        const clipped = value.slice(0, Math.min(maximum, remaining));
        remaining -= clipped.length;
        return clipped;
      };
      const clippedPackage = clip(packageName, 200);
      const clippedTitle = clip(title, 400);
      const clippedText = clip(text, 1_200);
      const clippedSubText = clip(subText, 200);
      return {
        postTimeMs: item.postTimeMs,
        packageName: clippedPackage,
        title: clippedTitle,
        text: clippedText,
        subText: clippedSubText,
        fingerprint,
        contentTruncated: clippedPackage.length < packageName.length || clippedTitle.length < title.length || clippedText.length < text.length || clippedSubText.length < subText.length
      };
    });
  const recentCount = items.filter((item) => item.postTimeMs >= cutoff).length;
  const complete = payload.connected === true && (countMatches || boundaryReached) && recentCount <= MAX_NOTIFICATIONS;

  return {
    status: complete ? "complete" : "incomplete",
    connected: payload.connected === true,
    fetchedAt,
    cutoff,
    countReported: Number.isFinite(payload.count) ? payload.count : null,
    countParsed: items.length,
    sortedNewestFirst: sorted,
    boundaryReached,
    recentCount,
    returnedCount: recent.length,
    notifications: recent
  };
}

function toolsFor(path) {
  if (path === "/mcp/android") return ANDROID_TOOLS;
  if (path === "/mcp/state") return STATE_TOOLS;
  return null;
}

async function dispatch(path, message) {
  if (!message || typeof message !== "object" || Array.isArray(message) || message.jsonrpc !== "2.0") {
    return jsonRpcError(null, -32600, "Invalid Request");
  }
  const id = message.id;
  const isNotification = id === undefined;
  const params = asObject(message.params);
  if (typeof message.method !== "string") return isNotification ? null : jsonRpcError(id, -32600, "Invalid Request");
  if (message.method.startsWith("notifications/")) return null;
  if (isNotification) return null;

  switch (message.method) {
    case "initialize":
      return {
        jsonrpc: "2.0", id,
        result: {
          protocolVersion: typeof params.protocolVersion === "string" ? params.protocolVersion : "2025-03-26",
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: "openclaw-hermes-bridge", version: VERSION }
        }
      };
    case "ping":
      return { jsonrpc: "2.0", id, result: {} };
    case "tools/list": {
      const tools = toolsFor(path);
      if (!tools) return jsonRpcError(id, -32600, "Unknown endpoint");
      return { jsonrpc: "2.0", id, result: { tools } };
    }
    case "tools/call": {
      const args = asObject(params.arguments);
      try {
        if (path === "/mcp/android" && params.name === "notifications_list") {
          return { jsonrpc: "2.0", id, result: toolResult(await listNotifications(args)) };
        }
        if (path === "/mcp/state" && params.name === "shared_state_get") {
          if (Object.keys(args).some((key) => key !== "group")) throw new TypeError("unexpected argument");
          return { jsonrpc: "2.0", id, result: toolResult(readGroup(args.group)) };
        }
        if (path === "/mcp/state" && params.name === "shared_state_set") {
          if (Object.keys(args).some((key) => !["group", "content", "expectedRevision"].includes(key))) throw new TypeError("unexpected argument");
          return { jsonrpc: "2.0", id, result: toolResult(writeGroup(args.group, args.content, args.expectedRevision)) };
        }
        return { jsonrpc: "2.0", id, result: toolResult({ error: "unknown-tool" }, true) };
      } catch (error) {
        const reason = error instanceof TypeError ? error.message : "source-unavailable";
        return { jsonrpc: "2.0", id, result: toolResult({ error: reason }, true) };
      }
    }
    default:
      return jsonRpcError(id, -32601, "Method not found");
  }
}

function authorized(request) {
  const header = request.headers.authorization || "";
  const expected = Buffer.from(`Bearer ${bearerToken}`);
  const actual = Buffer.from(header);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url || "/", "http://localhost").pathname;
  if (request.method === "GET" && pathname === "/healthz") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end('{"status":"ok"}');
    return;
  }
  if (pathname !== "/mcp/android" && pathname !== "/mcp/state") {
    response.writeHead(404);
    response.end();
    return;
  }
  if (!authorized(request)) {
    response.writeHead(401, { "www-authenticate": "Bearer" });
    response.end();
    return;
  }
  if (request.method !== "POST") {
    response.writeHead(405, { allow: "POST" });
    response.end();
    return;
  }
  let body = "";
  request.setEncoding("utf8");
  request.on("data", (chunk) => {
    body += chunk;
    if (body.length > 512_000) request.destroy();
  });
  request.on("end", async () => {
    let message;
    try { message = JSON.parse(body); }
    catch {
      response.writeHead(400, { "content-type": "application/json" });
      response.end(JSON.stringify(jsonRpcError(null, -32700, "Parse error")));
      return;
    }
    const result = await dispatch(pathname, message);
    if (result === null) {
      response.writeHead(202);
      response.end();
      return;
    }
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(result));
  });
});

server.listen(PORT, "0.0.0.0");
