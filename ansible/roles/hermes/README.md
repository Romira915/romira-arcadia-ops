# Hermes on OCI

The `hermes` role deploys the official multi-architecture Hermes Agent image on `oci-tokyo-ampere`. The image is pinned by its multi-platform manifest digest, the container selects `linux/arm64`, and all mutable Hermes state lives under `/mnt/d/hermes/data`.

The dashboard is available through the tailnet at port `8444`; host ports `19119` (dashboard) and `18642` (OpenAI-compatible API) bind to loopback only. Tailscale's HTTPS origin is configured as the dashboard's public URL, and only the Hermes Docker bridge gateway is trusted to supply forwarded headers. Dashboard Basic Auth, its stable cookie secret, and the API bearer key are kept in the encrypted inventory file `inventories/oci-tokyo-ampere/group_vars/all/vault-hermes.yml` and rendered into `/opt/hermes/.env` with mode `0600`. The API is not served through Tailscale.

Hermes runs its agent processes as the verified `hermes` user (UID/GID `10000:10000`) inside the container. The derived image installs `sudo` and grants that user passwordless root access inside the container so it can install packages. `no-new-privileges` is disabled because it blocks sudo's UID transition; Docker's default capability set and the existing `NET_RAW`/`NET_ADMIN` drops remain in place. Runtime package installs live in the container's writable layer and are lost when the container is recreated; add packages that must survive recreation to `files/image/Dockerfile`.

Hermes loads the shared `ai-config/skills` as a read-only external skill directory, and uses the shared `CLAUDE.md` as workspace `AGENTS.md`. The personal file is mounted read-only and is not auto-loaded. Hermes-created skills, memory, sessions, and provider authentication stay in its separate persistent data directory.

Hermes and OpenClaw both mount `/mnt/d/obsidian/vault` read-write. The OpenClaw role grants POSIX ACLs to their runtime UIDs on existing Vault entries and default ACLs on every directory, so new notes remain editable by both agents. LiveSync credentials live outside the Vault under `/mnt/d/obsidian/livesync` and are not mounted into either agent. Existing LiveSync remains the sole sync service.

Gog is the standard Google Workspace interface for Hermes conversations and Cron jobs. Its native MCP exposes Gog tools, including Gmail sending; when a specific operation is not exposed by MCP, the managed Google Workspace skill routes it through the same Gog CLI. This keeps Calendar event creation and Drive writes available without treating an MCP tool gap as missing Google authorization. Gog permanently deletes Gmail messages only when separately enabled with the `mail.google.com` OAuth scope. The Gog file-keyring password is stored in Ansible Vault and supplied to Hermes at runtime; Ansible does not copy or expose the OAuth client file.

The derived Hermes image and Compose service both add `/opt/data/bin` to `PATH`, so the gateway and its command tools resolve commands such as `gog`. The role replaces the bundled Google Workspace skill with a Gog-first version and removes its retired Python helper scripts and the unused duplicate OAuth client copy. It also removes the legacy `google-readonly` MCP and token only after confirming that no Cron configuration or prompt references them. The original OAuth client file is left untouched.

The Compose file leaves CPU and memory limits unset, so Hermes can use the OCI VM's available resources. The VM's current size is 2 OCPU and 12 GB RAM. Hermes model/provider authentication is instance-local.

The derived image includes Claude Code pinned to the version in `files/image/Dockerfile`. The role installs the official `claude-subscription-directsdk` plugin into persistent storage without changing the selected model. For Claude Pro/Max, log in using the official CLI as the runtime user:

```sh
ssh -t oci-tokyo-ampere 'sudo docker exec -it --user 10000:10000 hermes-agent claude auth login'
ssh -t oci-tokyo-ampere 'sudo docker exec -it --user 10000:10000 hermes-agent /opt/hermes/bin/hermes model'
```

Open the login URL in your local browser and finish the CLI's prompts, then select `Claude Subscription DirectSDK (Experimental)` in the model picker. Claude stores its login under the persistent `/opt/data` home; do not copy tokens into Ansible or the host environment. This experimental subscription provider is distinct from native Anthropic OAuth, which requires Max extra usage credits. See the [official plugin instructions](https://hermes-agent.nousresearch.com/docs/plugins/claude-subscription-directsdk).

Run from `ansible/` with the OCI inventory and `--tags hermes,openclaw,tailscale` after explicit user authorization. The Hermes Docker install is updated by changing the image digest and re-running the role; `hermes update` is not supported in Docker.
