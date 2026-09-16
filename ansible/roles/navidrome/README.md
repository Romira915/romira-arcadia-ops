# navidrome

Manage Navidrome as a Docker Compose application.

The Compose project is deployed to `/opt/navidrome`. Its database and cache
are stored under `/opt/navidrome/data`. The music directory is mounted
read-only. On Wakaba, MusicBee's exported M3U8 files are under the relative
`Playlists` path and are imported by Navidrome automatically.

The HTTP port is bound to loopback so access can later be provided through a
reverse proxy or an SSH/VPN tunnel. The Navidrome database must be backed up
before any destructive library maintenance.
