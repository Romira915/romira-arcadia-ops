---
name: google-workspace
description: "Use Gog MCP and CLI for Gmail, Calendar, Drive, Docs, Sheets, Slides, Forms, Contacts, Chat, Tasks, and other supported Google Workspace services."
version: 2.0.0
platforms: [linux]
metadata:
  hermes:
    tags: [Google, Gmail, Calendar, Drive, Docs, Sheets, Slides, Forms, Contacts, Chat, Tasks, Gog]
---

# Google Workspace

Use Gog as the single Google Workspace interface for Gmail, Calendar, Drive, Docs, Sheets, Slides, Forms, Contacts, Chat, Tasks, and other services supported by the installed Gog version. Prefer the Gog MCP tools when they provide the requested operation. If an MCP tool does not expose that operation, use the Gog CLI from Terminal; a missing MCP operation does not mean the Google service or account lacks access.

## Resolve the command and account

- Run `command -v gog` and `gog --version` in the actual Hermes Terminal session. The deployed service adds `/opt/data/bin` to `PATH`. If that shell does not inherit the path, use `/opt/data/bin/gog` directly; do not reinstall an existing binary.
- Use the already configured Gog account with `--account auto` unless the user names another account. Check Gog's own login state with `gog auth list` when needed.
- Discover exact command syntax with `gog --help` and the relevant service help. Do not claim an operation is unsupported until checking both the MCP tools and the installed CLI.
- Do not infer authentication state from a missing MCP tool or from unrelated credential files. Never print, log, or send OAuth client secrets, tokens, or authorization codes. Do not ask the user to paste them.
- Start Gog's OAuth flow only when Gog reports that the configured account or a previously approved Google Workspace service is not authorized. Preserve the existing account and its approved service access; do not trigger reauthorization because an MCP operation is missing.

## Read and write Google data

- Resolve the exact account, resource, and destination before changing data. For writes, use the narrowest operation that fulfills the user's request and read the result back when the API supports it.
- Use Gog CLI through Terminal for supported operations missing from MCP, including Calendar event creation and Drive writes. Report an operation as successful only after the service confirms it; do not treat a command being issued as proof of success.
- For Gmail, distinguish searching, labeling, modifying, sending, and permanently deleting messages. Do not broaden the requested action.
- For complex Gmail query syntax, consult `references/gmail-search-syntax.md`; for the configured daily briefing workflow, consult `references/daily-brief.md`.
- For Drive and its Docs, Sheets, and Slides files, confirm the exact file or folder before editing, moving, sharing, or deleting it.

## Calendar event workflow

- Match the requested calendar by both its exact ID and title, and inspect its access role. Do not substitute a similarly named calendar or infer that one calendar's role applies to another.
- Check existing events for duplicates before creating one. Register only a real, new, public schedule. Do not put personal application, payment, or attendance details on a public calendar.
- After creating or updating an event, fetch it by event ID and confirm the saved fields. After a requested deletion, read it back and confirm its resulting state. Never create a dummy event as an unrequested write test.
- Set a personal `Primary` calendar only if the user says they will attend or plan to attend. Ask before creating a personal application or payment task in Notion.
- For announcement Cron jobs, send the “🗓️ 蓮ノ空キャストカレンダー｜登録済み” notice only after both the write and read-back succeed. Do not notify about completed events or follow-up streams/archive notices for previously announced events unless explicitly asked.
