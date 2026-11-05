#!/bin/sh
# Pull the shared configuration clone. Hermes reads it through a directory mount and
# AGENTS.md symlink, so no container restart is needed; running sessions are not interrupted.
# Why: a single-file mount would keep the old inode after git replaces the file, forcing a restart.
# Why run as the clone's owner: the script only runs git, so it needs no root and no docker access.
set -eu

repo_dir="$1"

# Why: a lock prevents overlapping pulls if one run takes longer than an hour.
# Why /run/lock: it is world-writable with the sticky bit, so a non-root owner can create the lock.
exec 9>/run/lock/hermes-config-sync.lock
flock -n 9 || exit 0

if ! git -C "$repo_dir" pull --ff-only --quiet; then
  logger -t hermes-config-sync "git pull --ff-only failed in $repo_dir"
  exit 1
fi
