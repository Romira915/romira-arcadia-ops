# jellyfin

Manage Jellyfin as an official Docker Compose application.

The Compose project is deployed to `/opt/jellyfin`. Configuration and cache
are stored under that directory, while the media directory is supplied by the
target inventory. On Wakaba, `/mnt/d/romira` is mounted read-only as `/media`,
so Jellyfin libraries should use subdirectories such as `/media/Contents`.
The HTTP port is bound to loopback for access through a reverse proxy or an
SSH/VPN tunnel.

On Wakaba, the public domain and published server URL are supplied by Ansible
Vault. OpenLiteSpeed proxies WebSocket traffic at `/socket` and expects the
Let's Encrypt certificate under `/etc/letsencrypt/live/<domain>/`. The DNS
record and certificate must exist before applying the OpenLiteSpeed
configuration.
