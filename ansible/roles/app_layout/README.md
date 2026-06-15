# app_layout

Manage application runtime directories and verify externally deployed files exist.

This role intentionally does not build, deploy, pull, or update application code or Docker images.
Files marked as `managed: false` are checked with `stat`/`assert` only.
Files marked as `managed: true` are copied from `files/app_layout/<app-name>/<path>` before the check.
