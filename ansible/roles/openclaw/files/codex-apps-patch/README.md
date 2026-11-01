# OpenClaw Codex app automation tool-cap patch

Base: OpenClaw 2026.10.9 browser image, pinned to its ARM64 manifest digest for oci-tokyo-ampere.

This patch addresses the gap between two existing capability surfaces:
- the authenticated Codex app authority captures per-app native action names;
- the cron creator tool-cap snapshot previously contained only OpenClaw dynamic tools.

Every Codex app action present in the exact captured owner authority is added to the finite cron creator surface, including flat and nested app tool maps. Explicitly denied actions are excluded. The job's `toolsAllow` list is also carried into scheduled app policy, so unlisted actions remain disabled at run time in addition to the captured/current app policy and approval checks.

The cron updater now applies to any job ID and any finite Codex app `toolsAllow` edit. It resolves the fresh authenticated owner authority, verifies every requested app tool survives resolution, normalizes exposed MCP aliases to their canonical scheduled-policy keys, and fails closed before writing if any requested tool is absent. It respects the OpenClaw capability boundary: the runtime payload remains in an opaque grant while the caller receives a boolean indicating the grant contains runtime authority. Creator tool names are filtered against the captured app payload before crossing that boundary. It does not widen the job cap.

The image itself does not change cron IDs, schedules, prompts, or job state. The compose deployment consumes the selected image via OPENCLAW_IMAGE; job state remains in the existing bind-mounted OpenClaw state directory.

The pinned OpenClaw cron tool uses a JSON-compatible patch object; its structured-clone step falls back to a JSON round trip in runtimes that do not expose `structuredClone`.

The gateway loads the compiled Codex extension from `/app/dist`, not only the TypeScript files in `/app/extensions/codex/src`. The Docker build therefore overlays the compiled cron, run-attempt, and thread-lifecycle bundles. Scheduled app tool policy intersects each action with the job's finite `toolsAllow` list, and that list participates in the thread-config fingerprint.

When an authenticated owner turn has no intersecting installed, enabled, callable app, policy entry, and app-server tool inventory, authority capture fails closed with counts and connector IDs for those sources. Neither diagnostic records credentials or event/message data.
