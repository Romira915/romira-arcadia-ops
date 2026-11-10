"""Fact gate: block monitoring-scope answers that were not grounded in the roster.

Called from agent/turn_stop_gates.apply_stop_gates before the final answer is
delivered. If the final answer makes a monitoring-scope claim about a named cast
member, a roster handle, or a shared account, and no tool result in the current
user turn touched monitoring-roster, the caller gets a nudge to read the roster
and answer again.

Pure functions (no Hermes imports) so the gate can be unit-tested in isolation.
Kill switch: /opt/data/factgate.disabled. Log: /opt/data/logs/factgate.log.
"""
from __future__ import annotations

import json
import os
import re
import time
from typing import Any, Iterable, Optional

ROSTER_PATH = "/opt/data/skills/hasunosora-cast-watch/references/monitoring-roster.md"
KILL_SWITCH = "/opt/data/factgate.disabled"
LOG_PATH = "/opt/data/logs/factgate.log"
MAX_NUDGES = 2

# Words that make an answer a monitoring-scope claim.
CLAIM_RE = re.compile(r"(監視|対象外|対象に|拾[うっえい]|検索対象|チェック対象|監視対象)")
HANDLE_RE = re.compile(r"@[A-Za-z0-9_]{1,15}")
# Markers that a tool result carried the roster text.
NON_NAME_HEADS = {"事務所", "事務所等", "本人", "関連", "注意"}
ROSTER_MARKERS = ("monitoring-roster", "蓮ノ空キャスト個人告知 監視ロースター", "監視上の注意（人物別）")


def parse_roster_names(roster_text: str) -> set[str]:
    """Extract cast names from roster lines.

    Handles both forms: '- DOLLCHESTRA枠（3）: 野中ここな、佐々木琴子' and
    '- 星宮じゅりあ: ユーザー確認により…'. Handles and group headings are skipped.
    """
    names: set[str] = set()
    for line in roster_text.splitlines():
        m = re.match(r"^- ([^:：]+)[:：](.*)$", line)
        if not m:
            continue
        head, tail = m.group(1).strip(), m.group(2)
        if "枠" in head:
            for part in re.split(r"[、,]", tail):
                name = re.sub(r"[（(].*$", "", part).strip()
                if name and "@" not in name and len(name) <= 12:
                    names.add(name)
        elif "@" not in head and 1 <= len(head) <= 12 and "枠" not in head:
            names.add(head)
    return names - NON_NAME_HEADS


def load_roster_names(path: str = ROSTER_PATH) -> set[str]:
    try:
        with open(path, encoding="utf-8") as fh:
            return parse_roster_names(fh.read())
    except OSError:
        return set()


def is_monitoring_claim(answer: str, names: Iterable[str]) -> bool:
    """True when the answer claims something about monitoring scope for a known entity."""
    if not answer or not CLAIM_RE.search(answer):
        return False
    if HANDLE_RE.search(answer):
        return True
    return any(name and name in answer for name in names)


def current_turn_messages(messages: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Messages since the last real user message (synthetic nudge rows are skipped)."""
    out: list[dict[str, Any]] = []
    for m in reversed(messages):
        if m.get("role") == "user" and not any(str(k).endswith("_synthetic") for k in m):
            break
        out.append(m)
    return out


def roster_read_in_turn(messages: list[dict[str, Any]]) -> bool:
    """True if a tool call or tool result in the current turn touched the roster.

    Checks both raw and \\u-escaped JSON forms, since tool payloads may be stored either way.
    """
    markers = list(ROSTER_MARKERS) + [json.dumps(mk)[1:-1] for mk in ROSTER_MARKERS]
    for m in current_turn_messages(messages):
        for form in (json.dumps(m, ensure_ascii=False, default=str), json.dumps(m, default=str)):
            if any(marker in form for marker in markers):
                return True
    return False


def _log(line: str) -> None:
    try:
        os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
        with open(LOG_PATH, "a", encoding="utf-8") as fh:
            fh.write(time.strftime("%Y-%m-%dT%H:%M:%S") + " " + line + "\n")
    except OSError:
        pass


def factgate_nudge(
    *,
    final_response: Any,
    messages: list[dict[str, Any]],
    nudges_so_far: int,
    platform: Optional[str] = None,
    session_id: str = "-",
    names: Optional[Iterable[str]] = None,
    kill_switch: str = KILL_SWITCH,
) -> Optional[str]:
    """Return a nudge string to continue the turn, or None to let the answer through."""
    if os.path.exists(kill_switch):
        return None
    if platform == "cron":
        return None
    if not isinstance(final_response, str) or not final_response.strip():
        return None
    roster_names = set(names) if names is not None else load_roster_names()
    if not is_monitoring_claim(final_response, roster_names):
        return None
    if roster_read_in_turn(messages):
        _log(f"PASS sid={session_id} claim=yes roster_read=yes")
        return None
    if nudges_so_far >= MAX_NUDGES:
        _log(f"GIVEUP sid={session_id} claim=yes roster_read=no nudges={nudges_so_far}")
        return None
    _log(f"NUDGE sid={session_id} claim=yes roster_read=no nudges={nudges_so_far}")
    return (
        "[System note: fact gate. Your answer makes a monitoring-scope claim about a named "
        "cast member, handle or shared account, but monitoring-roster.md was not read in this turn. "
        "Read /opt/data/skills/hasunosora-cast-watch/references/monitoring-roster.md now, quote the "
        "matching line, and answer again. If the roster has no matching line, say so.]"
    )
