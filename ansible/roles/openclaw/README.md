# OpenClaw on OCI

The `openclaw` role manages OpenClaw on `oci-tokyo-ampere`. It deploys Compose and the environment file into `/opt/openclaw`, clones or updates `romira-s-config` in `/opt/romira-s-config`, and stores OpenClaw state under `/mnt/d/openclaw/data`.

OpenClaw uses the existing `ai-config/CLAUDE.md` as its workspace `AGENTS.md`. Shared skills and the shared Vault at `/mnt/d/obsidian/vault` are mounted read-only. The current repository has no tracked `ai-config/rules` directory.

The private file `/mnt/d/openclaw/data/personal/personal.md` is created empty only if absent and mounted read-only as `/home/node/.claude/personal.md` in the containers. Its contents are not managed in Git or overwritten by Ansible.

When `openclaw_proxy_enabled` is enabled, the role trusts the Docker bridge address for proxy attribution and adds the origins listed in `openclaw_proxy_origins` to the Control UI allowlist. Existing entries and Gateway authentication are retained. The reverse proxy itself is configured separately.

The role keeps the shared Vault at `/mnt/d/obsidian/vault` and LiveSync state at `/mnt/d/obsidian/livesync`. It verifies that the Vault contains Markdown notes before ensuring LiveSync runs. Compose refuses to create a missing Vault bind mount.

The role retains existing Gateway credentials and state. Gateway access stays on loopback and is reached through the separately configured Tailscale Serve route.

Run from `ansible/` with the OCI inventory and `--tags openclaw`. Follow the repository guidance for lint, check mode, and apply authorization. Gateway tokens and provider credentials must not be committed.
