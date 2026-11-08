#!/usr/bin/env python3
"""Minimal MCP (Streamable HTTP, JSON responses) server exposing one tool: ask_hermes.

Forwards each question to the running Hermes agent's OpenAI-compatible API, so Muse talks to
the same Hermes (memory, past sessions, skills, tools) that the user talks to.
Requires a Bearer token (>= 32 chars) from HERMES_MUSE_MCP_TOKEN_FILE and the Hermes API key
in API_SERVER_KEY. Logging is metadata-only, as JSON lines on stdout.
"""
import hmac
import json
import os
import sys
import threading
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HOST = os.environ.get("HERMES_MUSE_MCP_HOST", "127.0.0.1")
PORT = int(os.environ.get("HERMES_MUSE_MCP_PORT", "8650"))
API_URL = os.environ.get("HERMES_API_URL", "http://127.0.0.1:8642/v1/chat/completions")
API_KEY = os.environ.get("API_SERVER_KEY", "")
MAX_Q = 8000
MAX_A = 12000
RATE_PER_MIN = 20
TIMEOUT_S = 170
JST = timezone(timedelta(hours=9))
# Why a per-day session: everything Muse asks on a day lands in one Hermes session, so Hermes
# remembers it later (session search) and follow-up questions keep their context.
CONTEXT = (
    "このメッセージは、MCP コネクタ経由で Muse(Meta の個人向けエージェント)から届いた。"
    "ユーザー本人の依頼として扱い、通常どおり記憶・スキル・ツールを使ってよい。"
)


def load_token():
    path = os.environ.get("HERMES_MUSE_MCP_TOKEN_FILE")
    if path:
        with open(path, encoding="utf-8") as f:
            return f.read().strip()
    return os.environ.get("HERMES_MUSE_MCP_TOKEN", "")


TOKEN = load_token()
_lock = threading.Lock()
_calls = []


def log(event, **meta):
    rec = {"ts": time.strftime("%Y-%m-%dT%H:%M:%S%z"), "event": event, **meta}
    print(json.dumps(rec, ensure_ascii=False), flush=True)


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
    "description": "Send a question or a task to the Hermes agent and get its text answer. "
                   "Hermes shares the user's memory, past sessions, skills and tools, "
                   "so it can look things up and act, not only chat.",
    "inputSchema": {
        "type": "object",
        "properties": {"question": {"type": "string", "maxLength": MAX_Q}},
        "required": ["question"],
        "additionalProperties": False,
    },
}


def ask_hermes(question):
    session = "muse-" + datetime.now(JST).strftime("%Y%m%d")
    body = json.dumps({
        "model": "hermes-agent",
        "messages": [
            {"role": "system", "content": CONTEXT},
            {"role": "user", "content": question},
        ],
    }).encode()
    req = urllib.request.Request(API_URL, data=body, method="POST", headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "X-Hermes-Session-Id": session,
    })
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT_S) as resp:
            data = json.load(resp)
        out = (data["choices"][0]["message"].get("content") or "").strip()
        log("ask_ok", q_len=len(question), a_len=len(out))
        return out[:MAX_A], False
    except TimeoutError:
        log("ask_timeout", q_len=len(question))
        return "Hermes timed out.", True
    except urllib.error.HTTPError as e:
        log("ask_error", status=e.code, q_len=len(question))
        return "Hermes returned an error.", True
    except (urllib.error.URLError, OSError, ValueError, KeyError, IndexError) as e:
        log("ask_error", kind=type(e).__name__, q_len=len(question))
        return "Hermes returned an error.", True


def handle(msg):
    method = msg.get("method")
    mid = msg.get("id")
    if method == "initialize":
        return {"jsonrpc": "2.0", "id": mid, "result": {
            "protocolVersion": msg.get("params", {}).get("protocolVersion", "2025-06-18"),
            "capabilities": {"tools": {}},
            "serverInfo": {"name": "hermes-muse-bridge", "version": "0.2.0"},
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
    if not API_KEY:
        print("API_SERVER_KEY is required", file=sys.stderr)
        sys.exit(2)
    srv = ThreadingHTTPServer((HOST, PORT), H)
    print(f"listening on {HOST}:{PORT}", flush=True)
    srv.serve_forever()


if __name__ == "__main__":
    main()
