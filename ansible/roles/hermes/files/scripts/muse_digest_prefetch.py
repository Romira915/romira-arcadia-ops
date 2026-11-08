#!/usr/bin/env python3
"""Print the user's recent conversations with Hermes, for the Muse digest cron job.

Read-only. Why direct SQLite instead of the session_search tool: that tool lists only the ten most
recent sessions, so it cannot give the cron agent a complete day. Why a rolling window instead of
"since the last run": a failed run then never loses messages, and Muse de-duplicates on its side.
Only human conversations count; Muse's own sessions, cron output, subagents and one-shot calls are
left out so the digest never echoes what Muse already knows.
"""
import sqlite3
import sys
import time
from datetime import datetime, timedelta, timezone

DB = "/opt/data/state.db"
WINDOW_HOURS = 24
SOURCES = ("discord", "desktop", "tui", "local")
JST = timezone(timedelta(hours=9))
MAX_TOTAL = 50000
MAX_SESSION = 8000
MAX_USER = 600
MAX_ASSISTANT = 150


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
    text = "\n".join(out)
    sys.stdout.write(text + "\n")


if __name__ == "__main__":
    main()
