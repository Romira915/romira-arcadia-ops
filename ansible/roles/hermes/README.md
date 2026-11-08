# Hermes on OCI

The `hermes` role deploys the official multi-architecture Hermes Agent image on `oci-tokyo-ampere`. The image follows the `latest` tag, the container selects `linux/arm64`, and all mutable Hermes state lives under `/mnt/d/hermes/data`.

The dashboard is available through the tailnet at port `8444`; host ports `19119` (dashboard) and `18642` (OpenAI-compatible API) bind to loopback only. Tailscale's HTTPS origin is configured as the dashboard's public URL, and only the Hermes Docker bridge gateway is trusted to supply forwarded headers. Dashboard Basic Auth, its stable cookie secret, and the API bearer key are kept in the encrypted inventory file `inventories/oci-tokyo-ampere/group_vars/all/vault-hermes.yml` and rendered into `/opt/hermes/.env` with mode `0600`. The API is not served through Tailscale.

Hermes runs its agent processes as the verified `hermes` user (UID/GID `10000:10000`) inside the container. The derived image installs `sudo` and grants that user passwordless root access inside the container so it can install packages. `no-new-privileges` is disabled because it blocks sudo's UID transition; Docker's default capability set and the existing `NET_RAW`/`NET_ADMIN` drops remain in place. Runtime package installs live in the container's writable layer and are lost when the container is recreated; add packages that must survive recreation to `files/image/Dockerfile`.

## Outbound traffic via the wakaba exit node

Hermes shares the network namespace of the `hermes-tailscale` sidecar (`ampere-hermes` on the tailnet), so only Hermes' outbound traffic can leave through wakaba's residential IP. The host's Tailscale, OpenClaw and every other host service are unchanged. The `exit-node-watchdog` container pings `hermes.exit_node` every 30 seconds: it sets the exit node (with LAN access, so the published ports and OpenClaw stay on the Docker networks) while wakaba answers, and clears it after two failed probes so Hermes goes out directly while wakaba sleeps. Switching drops open connections, which Hermes reconnects. The watchdog owns the exit-node state; do not set it in the sidecar's environment.

First login is interactive and must happen before the sidecar first runs: containerboot gives up after 60 seconds without a login and restarts in a loop, and every sidecar restart leaves Hermes attached to a dead namespace. Log in once with a temporary container that shares the persisted state, then start the stack:

```sh
ssh -t oci-tokyo-ampere 'sudo docker run --rm -it --device /dev/net/tun --cap-add NET_ADMIN -v /opt/hermes/tailscale:/var/lib/tailscale --entrypoint sh docker.io/tailscale/tailscale:stable -c "tailscaled --statedir=/var/lib/tailscale --tun=userspace-networking >/dev/null 2>&1 & sleep 3; tailscale up --hostname=ampere-hermes --accept-dns=false; tailscale status | head -3"'
```

Disable key expiry for `ampere-hermes` in the Tailscale admin console. Whenever the sidecar is recreated, recreate `hermes` too (`docker compose up -d --force-recreate tailscale exit-node-watchdog hermes`); otherwise Hermes keeps a stale namespace and its ports and DNS stop working. The sidecar image is pulled only when absent, so refresh it manually when needed.

Hermes loads the shared `ai-config/skills` as a read-only external skill directory. The whole `ai-config` directory is mounted read-only at `/opt/data/shared-config`, and workspace `AGENTS.md` is a symlink to its `CLAUDE.md`. Hermes reads `AGENTS.md` at session start, so a directory mount (rather than a single-file mount) picks up git updates without a container restart. Existing sessions keep the content they started with; a `/new` starts a session with the updated file. An hourly cron (`/etc/cron.d/hermes-config-sync`, from `inventories/oci-tokyo-ampere/files/cron/`) runs `git pull --ff-only` on `/opt/romira-s-config` and never restarts Hermes. The personal file is mounted read-only and is not auto-loaded. Hermes-created skills, memory, sessions, and provider authentication stay in its separate persistent data directory.

Hermes and OpenClaw both mount `/mnt/d/obsidian/vault` read-write. The OpenClaw role grants POSIX ACLs to their runtime UIDs on existing Vault entries and default ACLs on every directory, so new notes remain editable by both agents. LiveSync credentials live outside the Vault under `/mnt/d/obsidian/livesync` and are not mounted into either agent. Existing LiveSync remains the sole sync service.

Gog is the standard Google Workspace interface for Hermes conversations and Cron jobs. Its native MCP exposes Gog tools, including Gmail sending; when a specific operation is not exposed by MCP, the managed Google Workspace skill routes it through the same Gog CLI. This keeps Calendar event creation and Drive writes available without treating an MCP tool gap as missing Google authorization. Gog permanently deletes Gmail messages only when separately enabled with the `mail.google.com` OAuth scope. The Gog file-keyring password is stored in Ansible Vault and supplied to Hermes at runtime; Ansible does not copy or expose the OAuth client file.

The derived Hermes image and Compose service both add `/opt/data/bin` to `PATH`, so the gateway and its command tools resolve commands such as `gog`. The role seeds a Gog-first Google Workspace skill only when it is absent, because Hermes updates its own skills and an existing file is never overwritten; later changes to the repository copy do not reach the host. It removes its retired Python helper scripts and the unused duplicate OAuth client copy. It also removes the legacy `google-readonly` MCP and token only after confirming that no Cron configuration or prompt references them. The original OAuth client file is left untouched.

The Compose file leaves CPU and memory limits unset, so Hermes can use the OCI VM's available resources. The VM's current size is 2 OCPU and 12 GB RAM. Hermes model/provider authentication is instance-local.

The derived image includes Claude Code pinned to the version in `files/image/Dockerfile`. The role installs the official `claude-subscription-directsdk` plugin into persistent storage without changing the selected model. For Claude Pro/Max, log in using the official CLI as the runtime user:

```sh
ssh -t oci-tokyo-ampere 'sudo docker exec -it --user 10000:10000 hermes-agent claude auth login'
ssh -t oci-tokyo-ampere 'sudo docker exec -it --user 10000:10000 hermes-agent /opt/hermes/bin/hermes model'
```

Open the login URL in your local browser and finish the CLI's prompts, then select `Claude Subscription DirectSDK (Experimental)` in the model picker. Claude stores its login under the persistent `/opt/data` home; do not copy tokens into Ansible or the host environment. This experimental subscription provider is distinct from native Anthropic OAuth, which requires Max extra usage credits. See the [official plugin instructions](https://hermes-agent.nousresearch.com/docs/plugins/claude-subscription-directsdk).

Run from `ansible/` with the OCI inventory and `--tags hermes,openclaw,tailscale` after explicit user authorization. `hermes update` is not supported in Docker; the install is updated by pulling a new image.

`/etc/cron.d/hermes-image-update` (from `inventories/oci-tokyo-ampere/files/cron/`) runs `/usr/local/bin/hermes-image-update` daily at 05:00 JST. Check `hermes cron list` before adding jobs near it. The script pulls `latest`, and only when the image ID changed it rebuilds the derived image and recreates the container, which interrupts running sessions for about a minute. It waits up to 5 minutes for the container healthcheck. If the new image is unhealthy, it retags the previous derived image (`hermes-agent-sudo:rollback`), recreates the container, and does not retry that release; a failed build is retried the next night. Results are written to syslog under the `hermes-image-update` tag (`journalctl -t hermes-image-update`); there is no other notification. Re-running the role keeps using the local `latest` image because the role never pulls (`pull: never`).

Configuration defaults live in `defaults/main.yml` under the `hermes` dictionary. Environment-specific overrides use the same dictionary in the target inventory; secrets stay in encrypted Vault files.

The wakaba `romira` Samba share is mounted read-write on demand at `/mnt/z` on the host and in Hermes. systemd automount avoids blocking startup when wakaba is asleep; an access while it is offline can fail or block until the mount timeout, and a later access retries. Existing open files can fail across interruptions. The host `wakaba_mount` role assigns ownership to OCI ubuntu UID and GID 1001; Hermes receives GID 1001 as a supplementary group for write access. Credentials are taken from the encrypted wakaba inventory. The container receives `/mnt` read-only with slave propagation so a mount created after container startup is visible.

## Muse bridge

`muse-bridge` (a separate Compose service sharing the Tailscale sidecar's network namespace) runs `files/mcp/muse_mcp_bridge.py`, which exposes one MCP tool, `ask_hermes`, over Streamable HTTP. Each call runs `hermes -p muse-qa chat --oneshot` on a profile with every toolset disabled, so a caller can only get text answers. The container receives no `.env` secrets, drops all capabilities and cannot gain privileges. The host publishes it on `127.0.0.1:18650` and the Tailscale role serves it to the tailnet as `https://<host>.<tailnet>.ts.net:8650/mcp` (Serve only; no Funnel).

- The Bearer token is `secrets/muse-mcp.token` under the Hermes data root. It is generated once when absent and is never rotated by Ansible. Paste it into Muse's connector from that file; do not put it in chat or logs.
- The `muse-qa` profile, its toolset restrictions and its plugin symlink (`profiles/muse-qa/plugins/claude-subscription-directsdk-experimental` → `/opt/data/plugins/…`) are Hermes state under the data root, not managed by Ansible. If the profile is missing, `hermes -p` fails and the bridge answers with an error; it never falls back to the default profile.
- `hermes chat` opens a session through the profile's gateway. Do not `park` `muse-qa` (`hermes -p muse-qa gateway stop`): chat then fails with `Gateway starting: deadline`. `hermes -p muse-qa gateway start` serves it from the default gateway.
- The bridge listens on `0.0.0.0` inside the sidecar's namespace so the published port can reach it; every request still needs the Bearer token.
- The sidecar sets `TS_AUTH_ONCE=true`. The exit-node watchdog persists its own preferences, and without this setting containerboot's `tailscale up` fails after the container is recreated, leaving Hermes off the tailnet.
