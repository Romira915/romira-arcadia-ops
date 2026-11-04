# Google Calendar writes through Hermes

## Route writes to the authenticated Gog CLI

Use this when a request needs to create, update, or delete a Calendar event and the Calendar MCP exposes only reads. A read-only MCP tool is a limit of that tool, not evidence that Google OAuth or the target calendar lacks write access. In this Hermes deployment, Terminal is enabled, the Gog CLI is installed at `/opt/data/bin/gog`, and the Hermes service explicitly puts that directory on `PATH`.

1. **Resolve the executable in the actual Hermes process.** Try `command -v gog` and verify it with `gog --version`. If a tool shell still cannot resolve it, invoke `/opt/data/bin/gog` directly and report that the shell did not inherit the configured `PATH`; do not reinstall an existing binary.
2. **Check Gog's own login state.** Use the resolved binary's `auth list` and the existing `GOG_HOME` configuration. This Hermes deployment already has a Gog account authorized for Calendar, Drive, and Gmail; use `--account auto` unless the user names a different account. For this Gog route, do not inspect or report `google_token.json` or `google_api.py` status; those belong to a separate helper and are irrelevant to Gog authentication. Never print token, client-secret, or authorization-code contents.
3. **Confirm the exact destination.** Use Gog to list calendars for the selected account and match the exact requested title and ID. Inspect that calendar's access role. Do not substitute a similarly named calendar. A read-only result from the MCP is not the ACL result for another calendar.
4. **Perform the requested operation with Gog through Terminal.** For example, use `gog --account auto calendar create <calendarId> ...` for an event, then fetch it with `gog --account auto calendar event <calendarId> <eventId>`. Do not stop after discovering that the MCP has no write operation, and do not ask the user to install Gog or provide credentials when the existing CLI and account work.
5. **Verify before reporting.** Read the created or changed event back from the same calendar and compare its title and time. Report success only after both the write and readback succeed. Do not create a dummy event for testing; only create, update, or delete events requested by the user.

## When authorization really is missing

Only start OAuth if Gog's own `auth list` or an actual Gog API error shows that the required account/service is not authorized. Preserve existing Gog credentials and follow the user's previously stated Google-service consent. If a new consent is required, use Gog's supported authorization flow and wait for the user to complete it. Do not infer a missing Gog login from the Calendar MCP tool list, a failed PATH lookup, or the presence/absence of `google_token.json`.

When explaining a failure, identify the exact executable, Gog account state, target calendar, and observed error. Keep the answer focused on the selected Gog route; omit unrelated helper credentials and setup state. Never claim Calendar writes are unavailable while the authenticated Gog CLI can perform them.
