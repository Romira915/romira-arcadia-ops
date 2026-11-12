#!/usr/bin/env python3
"""Print the user's recent conversations with Hermes, for the Muse digest cron job.

Read-only. Why direct SQLite instead of the session_search tool: that tool lists only the ten most
recent sessions, so it cannot give the cron agent a complete day. Why a rolling window instead of
"since the last run": a failed run then never loses messages, and Muse de-duplicates on its side.
Only human conversations count; Muse's own sessions, cron output, subagents and one-shot calls are
left out so the digest never echoes what Muse already knows.
"""
import sqlite3
import subprocess
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

DB = "/opt/data/state.db"
WINDOW_HOURS = 24
SOURCES = ("discord", "desktop", "tui", "local")
JST = timezone(timedelta(hours=9))
MAX_TOTAL = 50000
MAX_SESSION = 8000
MAX_USER = 600
MAX_ASSISTANT = 150
SOURCES_DIR = Path("/opt/data/scripts/muse_digest_sources")
SOURCE_TIMEOUT_SECONDS = 180
MAX_SOURCE = 12000


def clip(text, limit):
    text = " ".join((text or "").split())
    return text if len(text) <= limit else text[:limit] + "…"


def main():
    since = time.time() - WINDOW_HOURS * 3600
    conn = sqlite3.connect(f"file:{DB}?mode=ro", uri=True)
    marks = ",".join("?" for _ in SOURCES)
    sessions = conn.execute(
        f"""SELECT s.id, s.source, COALESCE(NULLIF(s.display_name, ''), s.id)
            FROM sessions s
            WHERE s.source IN ({marks})
              AND EXISTS (SELECT 1 FROM messages m WHERE m.session_id = s.id AND m.timestamp >= ?)
            ORDER BY (SELECT MIN(m.timestamp) FROM messages m
                      WHERE m.session_id = s.id AND m.timestamp >= ?)""",
        (*SOURCES, since, since),
    ).fetchall()
    now = datetime.now(JST).strftime("%Y-%m-%d %H:%M JST")
    out = [f"# 直近{WINDOW_HOURS}時間のユーザーとHermesの会話(生成: {now}、{len(sessions)}セッション)"]
    # Why a per-session budget: one long session must not push later sessions out of the digest.
    budget = min(MAX_SESSION, MAX_TOTAL // max(len(sessions), 1))
    for sid, source, title in sessions:
        out.append(f"\n## [{source}] {clip(title, 80)}")
        used = 0
        omitted = 0
        rows = conn.execute(
            """SELECT role, content, timestamp FROM messages
               WHERE session_id = ? AND timestamp >= ? AND role IN ('user', 'assistant')
                 AND content IS NOT NULL AND content != ''
               ORDER BY timestamp, id""",
            (sid, since),
        ).fetchall()
        for role, content, ts in rows:
            when = datetime.fromtimestamp(ts, JST).strftime("%m-%d %H:%M")
            if role == "user":
                line = f"- {when} ユーザー: {clip(content, MAX_USER)}"
            else:
                line = f"  - {when} Hermes: {clip(content, MAX_ASSISTANT)}"
            if used + len(line) > budget:
                omitted += 1
                continue
            used += len(line)
            out.append(line)
        if omitted:
            out.append(f"  …(字数の上限で{omitted}件を省略)")
    out.append(extra_sources())
    text = "\n".join(out)
    sys.stdout.write(text + "\n")


def extra_sources():
    """Append what Hermes' own source scripts print (schedules to cross-check, job anomalies).

    Why a directory of Hermes-owned scripts instead of code here: they read the user's calendars and
    Hermes' notes, whose identifiers do not belong in this public repository, and Hermes maintains them.
    """
    parts = []
    for script in sorted(SOURCES_DIR.glob("*.py")):
        try:
            result = subprocess.run([sys.executable, "-I", str(script)], capture_output=True, text=True,
                                    timeout=SOURCE_TIMEOUT_SECONDS)
            if result.returncode == 0:
                body = result.stdout.strip()
            else:
                body = f"# {script.name}\n- 取得失敗（終了コード {result.returncode}）。この資料による照合はできていない。"
        except subprocess.TimeoutExpired:
            body = f"# {script.name}\n- 取得失敗（{SOURCE_TIMEOUT_SECONDS}秒で打ち切り）。この資料による照合はできていない。"
        parts.append(clip_block(body, MAX_SOURCE))
    return "\n\n".join(parts)


def clip_block(text, limit):
    return text if len(text) <= limit else text[:limit] + "\n…(字数の上限で以降を省略)"


if __name__ == "__main__":
    main()
