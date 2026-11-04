ARG HERMES_BASE_IMAGE
FROM ${HERMES_BASE_IMAGE}

ENV PATH="/opt/data/bin:${PATH}"

RUN install -d /etc/profile.d \
    && printf '%s\n' 'export PATH="/opt/data/bin:$PATH"' > /etc/profile.d/hermes-data-bin.sh \
    && chmod 0644 /etc/profile.d/hermes-data-bin.sh

USER root

RUN set -eux; \
    test "$(id -u hermes)" = "10000"; \
    apt-get update; \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends sudo; \
    rm -rf /var/lib/apt/lists/*; \
    printf '%s\n' 'hermes ALL=(ALL:ALL) NOPASSWD: ALL' > /etc/sudoers.d/hermes; \
    chmod 0440 /etc/sudoers.d/hermes; \
    visudo -cf /etc/sudoers.d/hermes
