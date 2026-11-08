#!/usr/bin/env python3
"""Minimal MCP (Streamable HTTP, JSON responses) server exposing one tool: ask_hermes.

Localhost-only by default. Requires a Bearer token (>= 32 chars) read from
HERMES_MUSE_MCP_TOKEN_FILE (or HERMES_MUSE_MCP_TOKEN).
Each call runs a one-shot query on the tool-less `muse-qa` Hermes profile; metadata-only logging.
"""
import hmac
import json
import os
import subprocess
import sys
import tempfile
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HOST = os.environ.get("HERMES_MUSE_MCP_HOST", "127.0.0.1")
PORT = int(os.environ.get("HERMES_MUSE_MCP_PORT", "8650"))
# Why a profile and no per-call toolset option: the default profile has every tool enabled,
# so the restriction must live in a profile that the caller of this bridge cannot widen.
PROFILE = "muse-qa"


def load_token():
    path = os.environ.get("HERMES_MUSE_MCP_TOKEN_FILE")
    if path:
        with open(path, encoding="utf-8") as f:
            return f.read().strip()
    return os.environ.get("HERMES_MUSE_MCP_TOKEN", "")


TOKEN = load_token()
MAX_Q = 2000
MAX_A = 4000
RATE_PER_MIN = 20
TIMEOUT_S = 150
LOG = os.environ.get("HERMES_MUSE_MCP_LOG", "/opt/data/logs/muse_mcp_bridge.log")
SCRATCH = "/opt/data/cache/scratch"

_lock = threading.Lock()
_calls = []


def log(event, **meta):
    os.makedirs(os.path.dirname(LOG), exist_ok=True)
    rec = {"ts": time.strftime("%Y-%m-%dT%H:%M:%S%z"), "event": event, **meta}
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")


def rate_ok():
    now = time.time()
    with _lock:
        _calls[:] = [t for t in _calls if now - t < 60]
        if len(_calls) >= RATE_PER_MIN:
            return False
        _calls.append(now)
        return True


TOOL = {
    "name": "ask_hermes",
    "description": "Ask the Hermes agent a question and get its text answer. "
                   "Read-only Q&A; no file writes or outbound actions.",
    "inputSchema": {
        "type": "object",
        "properties": {"question": {"type": "string", "maxLength": MAX_Q}},
        "required": ["question"],
        "additionalProperties": False,
    },
}


def ask_hermes(question):
    os.makedirs(SCRATCH, exist_ok=True)
    fd, path = tempfile.mkstemp(dir=SCRATCH, prefix="muse-q-", suffix=".txt")
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        f.write(question)
    cmd = ["hermes", "-p", PROFILE, "chat", "--query-file", path, "--oneshot", "-Q"]
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, timeout=TIMEOUT_S)
        lines = (p.stdout or "").rstrip().splitlines()
        # Why: Hermes prints a trailing session_id line, which is not part of the answer.
        while lines and (not lines[-1].strip() or lines[-1].startswith("session_id:")):
            lines.pop()
        out = "\n".join(lines).strip()
        if p.returncode != 0:
            log("ask_error", rc=p.returncode, q_len=len(question))
            return "Hermes returned an error.", True
        log("ask_ok", q_len=len(question), a_len=len(out))
        return out[:MAX_A], False
    except subprocess.TimeoutExpired:
        log("ask_timeout", q_len=len(question))
        return "Hermes timed out.", True
    finally:
        try:
            os.remove(path)
        except OSError:
            pass


def handle(msg):
    method = msg.get("method")
    mid = msg.get("id")
    if method == "initialize":
        return {"jsonrpc": "2.0", "id": mid, "result": {
            "protocolVersion": msg.get("params", {}).get("protocolVersion", "2025-06-18"),
            "capabilities": {"tools": {}},
            "serverInfo": {"name": "hermes-muse-bridge", "version": "0.1.0"},
        }}
    if method and method.startswith("notifications/"):
        return None
    if method == "ping":
        return {"jsonrpc": "2.0", "id": mid, "result": {}}
    if method == "tools/list":
        return {"jsonrpc": "2.0", "id": mid, "result": {"tools": [TOOL]}}
    if method == "tools/call":
        params = msg.get("params", {})
        if params.get("name") != "ask_hermes":
            return {"jsonrpc": "2.0", "id": mid, "error": {"code": -32602, "message": "unknown tool"}}
        q = (params.get("arguments") or {}).get("question", "")
        if not isinstance(q, str) or not q.strip() or len(q) > MAX_Q:
            return {"jsonrpc": "2.0", "id": mid, "result": {
                "content": [{"type": "text", "text": f"question must be 1..{MAX_Q} chars"}], "isError": True}}
        if not rate_ok():
            log("rate_limited")
            return {"jsonrpc": "2.0", "id": mid, "result": {
                "content": [{"type": "text", "text": "rate limited"}], "isError": True}}
        text, is_err = ask_hermes(q)
        return {"jsonrpc": "2.0", "id": mid, "result": {
            "content": [{"type": "text", "text": text}], "isError": is_err}}
    return {"jsonrpc": "2.0", "id": mid, "error": {"code": -32601, "message": "method not found"}}


class H(BaseHTTPRequestHandler):
    server_version = "muse-bridge"

    def log_message(self, *a):
        pass

    def _send(self, code, body=None):
        self.send_response(code)
        if body is not None:
            data = json.dumps(body, ensure_ascii=False).encode()
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
        else:
            self.send_header("Content-Length", "0")
        self.end_headers()
        if body is not None:
            self.wfile.write(data)

    def do_GET(self):
        if self.path == "/health":
            return self._send(200, {"status": "ok"})
        self._send(404)

    def do_POST(self):
        if self.path != "/mcp":
            return self._send(404)
        auth = self.headers.get("Authorization", "")
        if not TOKEN or not hmac.compare_digest(auth, f"Bearer {TOKEN}"):
            log("auth_fail", peer=self.client_address[0])
            return self._send(401, {"error": "unauthorized"})
        n = int(self.headers.get("Content-Length", "0") or 0)
        if n > 64 * 1024:
            return self._send(413, {"error": "too large"})
        try:
            msg = json.loads(self.rfile.read(n) or b"{}")
        except json.JSONDecodeError:
            return self._send(400, {"error": "bad json"})
        resp = handle(msg)
        if resp is None:
            return self._send(202)
        log("rpc", method=msg.get("method"))
        self._send(200, resp)


def main():
    if len(TOKEN) < 32:
        print("Muse MCP token missing or shorter than 32 chars", file=sys.stderr)
        sys.exit(2)
    srv = ThreadingHTTPServer((HOST, PORT), H)
    print(f"listening on {HOST}:{PORT}", flush=True)
    srv.serve_forever()


if __name__ == "__main__":
    main()
