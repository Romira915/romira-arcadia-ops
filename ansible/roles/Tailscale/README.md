# Tailscale

This role installs Tailscale on Ubuntu Noble. Existing router-oriented forwarding and NIC settings are controlled by `tailscale_configure_router`, which defaults to `true` to preserve existing hosts' behavior.

Set `tailscale_connect: true` to run `tailscale up` with default client settings. If interactive authentication is required, the playbook reports the login URL and stops; complete authentication and rerun it.

With `tailscale_connect: true`, configure tailnet-only HTTPS proxies with `tailscale_serve_routes`, for example:

```yaml
tailscale_serve_routes:
  - port: 8443
    target: http://127.0.0.1:18789
```

The role leaves unrelated Serve endpoints intact and refuses to replace a conflicting port. Tailscale HTTPS/Serve may require tailnet administration approval. Application-specific proxy trust and authentication remain the application's responsibility.
