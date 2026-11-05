#!/bin/sh
# Pull the shared configuration clone. Hermes reads it through a directory mount and
# AGENTS.md symlink, so no container restart is needed; running sessions are not interrupted.
# Why: a single-file mount would keep the old inode after git replaces the file, forcing a restart.
set -eu

repo_dir="$1"
repo_owner="$2"

# Why: a lock prevents overlapping pulls if one run takes longer than an hour.
exec 9>/run/hermes-config-sync.lock
flock -n 9 || exit 0

# Why: run git as the clone's owner so Git's ownership check passes.
if ! runuser -u "$repo_owner" -- git -C "$repo_dir" pull --ff-only --quiet; then
  logger -t hermes-config-sync "git pull --ff-only failed in $repo_dir"
  exit 1
fi
