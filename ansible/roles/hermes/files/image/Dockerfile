ARG HERMES_BASE_IMAGE
FROM ${HERMES_BASE_IMAGE}

USER root

RUN set -eux; \
    test "$(id -u hermes)" = "10000"; \
    apt-get update; \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends sudo; \
    rm -rf /var/lib/apt/lists/*; \
    printf '%s\n' 'hermes ALL=(ALL:ALL) NOPASSWD: ALL' > /etc/sudoers.d/hermes; \
    chmod 0440 /etc/sudoers.d/hermes; \
    visudo -cf /etc/sudoers.d/hermes
