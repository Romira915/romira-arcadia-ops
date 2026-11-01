FROM ghcr.io/openclaw/openclaw:2026.10.9-browser@sha256:da9f2abe72fa8824ee434017d1f367724acce96078365a788da629815b102991

COPY --chown=node:node extensions/codex/src/app-server/attempt-startup.ts /app/extensions/codex/src/app-server/attempt-startup.ts
COPY --chown=node:node extensions/codex/src/app-server/plugin-thread-config-deadline.ts /app/extensions/codex/src/app-server/plugin-thread-config-deadline.ts
COPY --chown=node:node extensions/codex/src/app-server/run-attempt-tool-setup.ts /app/extensions/codex/src/app-server/run-attempt-tool-setup.ts
COPY --chown=node:node extensions/codex/src/app-server/scheduled-app-authority.ts /app/extensions/codex/src/app-server/scheduled-app-authority.ts
COPY dist/cron-tool-CczCyZqC.mjs /app/dist/cron-tool-CczCyZqC.mjs
COPY dist/run-attempt-BA-4g-pn.mjs /app/dist/run-attempt-BA-4g-pn.mjs
COPY dist/thread-lifecycle-run-BZgVbiLr.mjs /app/dist/thread-lifecycle-run-BZgVbiLr.mjs
