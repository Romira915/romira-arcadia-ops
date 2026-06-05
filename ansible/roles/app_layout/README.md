# app_layout

Manage application runtime directories and verify externally deployed files exist.

This role intentionally does not build, deploy, pull, or update application code or Docker images.
Files marked as `managed: false` are checked with `stat`/`assert` only.
