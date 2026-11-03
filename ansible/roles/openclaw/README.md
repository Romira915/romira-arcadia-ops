# OpenClaw on OCI

The `openclaw` role manages OpenClaw on `oci-tokyo-ampere`. It deploys Compose and the environment file into `/opt/openclaw`, clones or updates `romira-s-config` in `/opt/romira-s-config`, and stores OpenClaw state under `/mnt/d/openclaw/data`.

Before starting the Gateway, the role builds the pinned OpenClaw image with the tracked Codex app authority patch in `files/codex-apps-patch/`. The patch carries the authenticated app-tool surface into cron creator authority while each automation remains restricted by its own finite `toolsAllow` list.

Cron jobs that need durable shared memory use the standard MCP server in `files/shared-state-mcp/server.mjs`. Ansible installs the script and its SQLite database under the existing persistent OpenClaw state mount, then registers it as `mcp.servers.cron_shared_state`; it does not patch an OpenClaw compiled bundle for shared-state behavior. A job opts in by listing `cron_shared_state__shared_state_get` and `cron_shared_state__shared_state_set` in its finite `toolsAllow`. Related jobs use the same exact group name. The owner agent can use `groups_list` to choose an existing group when creating a job. New groups need no Gateway restart or per-job ID registration.

Hermes accesses Android notifications and the same Cron-state database through the internal `hermes-mcp-bridge` sidecar. The sidecar invokes only `notifications.list` on the paired Android node and exposes the two shared-state operations; it does not expose the OpenClaw Gateway token or arbitrary node commands to Hermes. Its HTTP MCP port is reachable only on `openclaw_default`, and requests require a separate encrypted-inventory bearer token.

Any job granted the shared-state tools can read and write any group, so grant them only to jobs that need cross-job memory. Writes use revision compare-and-swap, group names are validated, content is capped at 256 KiB, and credentials or other secrets must not be stored there. OpenClaw image upgrades preserve both the server script and database through the existing state mount and retain the MCP server registration in `openclaw.json`.

OpenClaw uses the existing `ai-config/CLAUDE.md` as its workspace `AGENTS.md`. Shared skills are mounted read-only. The shared Vault at `/mnt/d/obsidian/vault` is mounted read-write in both Gateway and CLI containers; POSIX ACLs grant the OpenClaw and Hermes runtime UIDs write access to existing entries and future files without changing the LiveSync owner. The current repository has no tracked `ai-config/rules` directory.

The private file `/mnt/d/openclaw/data/personal/personal.md` is created empty only if absent and mounted read-only as `/home/node/.claude/personal.md` in the containers. Its contents are not managed in Git or overwritten by Ansible.

When `openclaw_proxy_enabled` is enabled, the role trusts the Docker bridge address for proxy attribution and adds the origins listed in `openclaw_proxy_origins` to the Control UI allowlist. Existing entries and Gateway authentication are retained. The reverse proxy itself is configured separately.

The role keeps the shared Vault at `/mnt/d/obsidian/vault` and LiveSync state at `/mnt/d/obsidian/livesync`. It verifies that the Vault contains Markdown notes before ensuring LiveSync runs. Compose refuses to create a missing Vault bind mount.

The role retains existing Gateway credentials and state. Gateway access stays on loopback and is reached through the separately configured Tailscale Serve route.

Run from `ansible/` with the OCI inventory and `--tags openclaw`. Follow the repository guidance for lint, check mode, and apply authorization. Gateway tokens and provider credentials must not be committed.
