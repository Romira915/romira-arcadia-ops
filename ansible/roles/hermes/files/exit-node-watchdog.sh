#!/bin/sh
# Route Hermes through the wakaba exit node only while wakaba answers; otherwise go out directly.
# Why not a static exit node: wakaba sleeps at night and a pinned exit node would blackhole
# Hermes' Cron jobs, which are allowed to use the datacenter IP while wakaba is down.
# Why allow LAN access: replies to the published dashboard/API ports and OpenClaw traffic stay on
# the Docker networks instead of being sent to the exit node.
# Why two failures before falling back: a single lost probe should not drop the residential IP.
set -u

exit_node="${HERMES_EXIT_NODE:?HERMES_EXIT_NODE is required}"
interval=30
failure_threshold=2

ts() {
  tailscale --socket="$TS_SOCKET" "$@"
}

log() {
  echo "exit-node-watchdog: $*"
}

current=unknown
failures=0
while :; do
  if ts ping --c=1 --timeout=5s "$exit_node" >/dev/null 2>&1; then
    failures=0
    want=$exit_node
  else
    failures=$((failures + 1))
    if [ "$failures" -ge "$failure_threshold" ] || [ "$current" = unknown ]; then
      want=direct
    else
      want=$current
    fi
  fi

  if [ "$want" != "$current" ]; then
    if [ "$want" = direct ]; then
      applied=0
      ts set --exit-node= && applied=1
    else
      applied=0
      ts set --exit-node="$want" --exit-node-allow-lan-access=true && applied=1
    fi
    if [ "$applied" -eq 1 ]; then
      current=$want
      log "now routing via $want"
    else
      log "failed to switch to $want; retrying"
    fi
  fi
  sleep "$interval"
done
