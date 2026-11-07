#!/bin/sh
# Pull the latest Hermes base image and recreate the container only when it changed.
# Why compare image IDs: a nightly restart with no new release would interrupt Hermes for nothing.
# Why a state file: a failed build must retry the next night, while a release that failed its
# health check must not be retried (and rolled back) every night until upstream publishes another.
# Why not auto-pin by digest: the user chose to follow the latest tag and accept upstream breakage,
# so the safety net is the rollback below rather than a pinned digest.
set -eu

project_dir="$1"
env_file="$project_dir/.env"
state_file=/var/lib/hermes-image-update/handled-base-id
derived_image=hermes-agent-sudo:arm64
rollback_image=hermes-agent-sudo:rollback
health_timeout=300

log() {
  logger -t hermes-image-update "$*"
}

compose() {
  docker compose --project-name hermes --project-directory "$project_dir" --env-file "$env_file" "$@"
}

wait_healthy() {
  waited=0
  while [ "$waited" -lt "$health_timeout" ]; do
    if [ "$(docker inspect --format '{{.State.Health.Status}}' hermes-agent 2>/dev/null || true)" = healthy ]; then
      return 0
    fi
    sleep 5
    waited=$((waited + 5))
  done
  return 1
}

# Why /run/lock: it is world-writable with the sticky bit, matching hermes-config-sync.
exec 9>/run/lock/hermes-image-update.lock
flock -n 9 || exit 0

base_image=$(sed -n 's/^HERMES_IMAGE=//p' "$env_file")
if [ -z "$base_image" ]; then
  log "HERMES_IMAGE is missing from $env_file"
  exit 1
fi

old_base_id=$(docker image inspect --format '{{.Id}}' "$base_image" 2>/dev/null || true)
if ! docker pull --quiet --platform linux/arm64 "$base_image" >/dev/null; then
  log "docker pull failed for $base_image"
  exit 1
fi
new_base_id=$(docker image inspect --format '{{.Id}}' "$base_image")

# Why the pre-pull ID as the first baseline: the first run must not restart an unchanged install.
handled_id=$(cat "$state_file" 2>/dev/null || printf '%s' "$old_base_id")
if [ "$new_base_id" = "$handled_id" ]; then
  exit 0
fi

old_derived_id=$(docker image inspect --format '{{.Id}}' "$derived_image" 2>/dev/null || true)
if [ -n "$old_derived_id" ]; then
  docker tag "$old_derived_id" "$rollback_image"
fi

log "updating Hermes to $new_base_id"
if ! compose build hermes; then
  log "build failed; keeping the running container and retrying next run"
  exit 1
fi
compose up -d --no-build hermes

install -d -m 0755 "$(dirname "$state_file")"
if wait_healthy; then
  printf '%s\n' "$new_base_id" > "$state_file"
  docker image prune -f >/dev/null
  log "updated Hermes to $new_base_id"
  exit 0
fi

# Why record the ID before rolling back: this release is skipped until upstream publishes another.
printf '%s\n' "$new_base_id" > "$state_file"
if [ -z "$old_derived_id" ]; then
  log "new image is unhealthy and no previous image exists to roll back to"
  exit 1
fi
log "new image is unhealthy; rolling back to $old_derived_id"
docker tag "$rollback_image" "$derived_image"
compose up -d --no-build hermes
if wait_healthy; then
  log "rollback succeeded"
else
  log "rollback is also unhealthy; manual intervention required"
fi
exit 1
