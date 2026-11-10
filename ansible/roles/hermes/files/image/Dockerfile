ARG HERMES_BASE_IMAGE
FROM ${HERMES_BASE_IMAGE}

ENV PATH="/opt/data/bin:${PATH}"

RUN install -d /etc/profile.d \
    && printf '%s\n' 'export PATH="/opt/data/bin:$PATH"' > /etc/profile.d/hermes-data-bin.sh \
    && chmod 0644 /etc/profile.d/hermes-data-bin.sh

USER root

RUN set -eux; \
    if ! getent group 1001 >/dev/null; then groupadd --gid 1001 oci-share; fi; \
    usermod --append --groups "$(getent group 1001 | cut -d: -f1)" hermes

ARG CLAUDE_CODE_VERSION=2.1.318
RUN npm install --global --prefix /usr/local --allow-scripts=@anthropic-ai/claude-code @anthropic-ai/claude-code@${CLAUDE_CODE_VERSION} \
    && npm cache clean --force \
    && claude --version

RUN set -eux; \
    test "$(id -u hermes)" = "10000"; \
    apt-get update; \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends sudo; \
    rm -rf /var/lib/apt/lists/*; \
    printf '%s\n' 'hermes ALL=(ALL:ALL) NOPASSWD: ALL' > /etc/sudoers.d/hermes; \
    chmod 0440 /etc/sudoers.d/hermes; \
    visudo -cf /etc/sudoers.d/hermes

# Local stop-gate patches (work-queue gate + fact gate) baked into the image.
# Guarded by sha256 of the upstream v0.23.0 file: if upstream changes
# agent/turn_stop_gates.py, the build fails instead of silently dropping the gates.
COPY factgate/factgate.py /opt/hermes/agent/factgate.py
COPY factgate/turn_stop_gates.combined.diff /tmp/factgate/turn_stop_gates.combined.diff
COPY factgate/turn_stop_gates.base.sha256 /tmp/factgate/turn_stop_gates.base.sha256
COPY factgate/turn_stop_gates.result.sha256 /tmp/factgate/turn_stop_gates.result.sha256
RUN set -eux; apt-get update; DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends patch; rm -rf /var/lib/apt/lists/*; cd /opt/hermes/agent; sha256sum -c /tmp/factgate/turn_stop_gates.base.sha256; patch --batch turn_stop_gates.py < /tmp/factgate/turn_stop_gates.combined.diff; sha256sum -c /tmp/factgate/turn_stop_gates.result.sha256; rm -rf /tmp/factgate
