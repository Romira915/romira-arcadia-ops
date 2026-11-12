#!/usr/bin/python3
"""Replace the Hermes image with the one pinned on the ops repository's main branch.

The host pulls a reviewed value instead of GitHub pushing to the host, so no host credential
lives in GitHub. Merging the ops pull request is the only step that allows a replacement.
"""

import argparse
import fcntl
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import urllib.request

import yaml

IMAGE_PATTERN = re.compile(
    r"^ghcr\.io/romira915/hermes-agent-image:v[0-9]+\.[0-9]+\.[0-9]+-r[0-9]+@sha256:[0-9a-f]{64}$"
)
SHA256_PATTERN = re.compile(r"^[0-9a-f]{64}$")
# Why claimed too: a claimed run is about to start, and recreating the container would lose it.
ACTIVE_RUN_STATES = ("claimed", "running")


class Abort(Exception):
    """A failure that leaves the running containers untouched."""


class TolerantLoader(yaml.SafeLoader):
    """Read inventory YAML that contains Ansible tags such as !vault without decrypting them."""


TolerantLoader.add_multi_constructor("!", lambda loader, suffix, node: None)


def log(message):
    print(message, file=sys.stderr, flush=True)


def notify(config, message):
    log(message)
    body = json.dumps({"content": f"[hermes-image-apply] {message}"[:1900]}).encode()
    request = urllib.request.Request(
        config["webhook_url"], data=body, headers={"Content-Type": "application/json", "User-Agent": "hermes-image-apply"}
    )
    try:
        urllib.request.urlopen(request, timeout=15).close()
    except OSError as error:
        log(f"Discord notification failed: {error}")


def run(argv, check=True, timeout=600):
    result = subprocess.run(argv, capture_output=True, text=True, timeout=timeout)
    if check and result.returncode != 0:
        raise Abort(f"{' '.join(argv[:4])} failed: {result.stderr.strip()[-500:]}")
    return result


def fetch_pin(config):
    request = urllib.request.Request(
        config["source_url"], headers={"Accept": "application/vnd.github.raw", "User-Agent": "hermes-image-apply"}
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        document = yaml.load(response.read(), Loader=TolerantLoader)
    hermes = (document or {}).get("hermes") or {}
    image = hermes.get("image")
    verify = hermes.get("image_verify") or {}
    if not isinstance(image, str) or not IMAGE_PATTERN.match(image):
        raise Abort(f"hermes.image on main is not a pinned hermes-agent-image tag and digest: {image!r}")
    if not verify or not all(
        isinstance(path, str) and path.startswith("/") and isinstance(digest, str) and SHA256_PATTERN.match(digest)
        for path, digest in verify.items()
    ):
        # Why strings only: an unquoted digest of digits (or digits and one "e") would load as a number.
        raise Abort("hermes.image_verify on main must map absolute paths to quoted SHA-256 digests")
    return image, verify


def read_env(path):
    with open(path, encoding="utf-8") as handle:
        return handle.read().splitlines()


def current_image(lines):
    for line in lines:
        if line.startswith("HERMES_IMAGE="):
            return line.split("=", 1)[1]
    raise Abort("HERMES_IMAGE is missing from .env")


def write_env(path, lines, image):
    replaced = [f"HERMES_IMAGE={image}" if line.startswith("HERMES_IMAGE=") else line for line in lines]
    # Why a temporary file and rename: a crash never leaves a half-written .env that Compose cannot read.
    fd, temporary = tempfile.mkstemp(dir=os.path.dirname(path), prefix=".env.")
    with os.fdopen(fd, "w", encoding="utf-8") as handle:
        handle.write("\n".join(replaced) + "\n")
    os.chmod(temporary, 0o600)
    os.replace(temporary, path)


def read_failed(path):
    try:
        with open(path, encoding="utf-8") as handle:
            return {line.strip() for line in handle if line.strip()}
    except FileNotFoundError:
        return set()


def record_failed(path, image):
    with open(path, "a", encoding="utf-8") as handle:
        handle.write(image + "\n")


def active_cron_runs():
    result = run(["docker", "exec", "hermes-agent", "hermes", "cron", "runs", "--limit", "50"], check=False, timeout=60)
    if result.returncode != 0:
        # Why proceed: without a running Hermes there is no job to interrupt.
        log(f"could not list Hermes cron runs, assuming none: {result.stderr.strip()[-200:]}")
        return []
    return [line for line in result.stdout.splitlines() if len(line.split()) > 1 and line.split()[1] in ACTIVE_RUN_STATES]


def mismatched_files(sha256sum_argv, verify):
    """Return the expected files whose SHA-256 differs; sha256sum_argv runs sha256sum in the image."""
    result = run(sha256sum_argv + list(verify.keys()), check=False, timeout=300)
    actual = {}
    for line in result.stdout.splitlines():
        parts = line.split()
        if len(parts) == 2:
            actual[parts[1]] = parts[0]
    return [path for path, digest in verify.items() if actual.get(path) != digest]


def compose_up(config):
    run(
        ["docker", "compose", "--project-directory", config["project_dir"], "-p", "hermes", "--env-file",
         config["env_file"], "up", "-d", "--pull", "never", "hermes", "muse-bridge"],
        timeout=600,
    )


def wait_healthy(timeout_seconds):
    deadline = time.monotonic() + timeout_seconds
    while time.monotonic() < deadline:
        result = run(["docker", "inspect", "-f", "{{.State.Health.Status}}", "hermes-agent"], check=False, timeout=30)
        if result.stdout.strip() == "healthy":
            return True
        time.sleep(10)
    return False


def running_image(container):
    return run(["docker", "inspect", "-f", "{{.Config.Image}}", container], check=False, timeout=30).stdout.strip()


def replace(config, old_image, new_image, verify, env_lines):
    write_env(config["env_file"], env_lines, new_image)
    try:
        compose_up(config)
        healthy = wait_healthy(int(config["health_timeout_seconds"]))
        problems = []
        if not healthy:
            problems.append(f"hermes-agent was not healthy within {config['health_timeout_seconds']} seconds")
        for container in ("hermes-agent", "hermes-muse-bridge"):
            if running_image(container) != new_image:
                problems.append(f"{container} is not running the new image")
        if healthy:
            mismatched = mismatched_files(["docker", "exec", "hermes-agent", "sha256sum"], verify)
            if mismatched:
                problems.append("SHA-256 mismatch in the running container: " + ", ".join(mismatched))
    except (Abort, subprocess.TimeoutExpired) as error:
        problems = [str(error)]
    if not problems:
        return None
    write_env(config["env_file"], env_lines, old_image)
    try:
        compose_up(config)
        restored = wait_healthy(int(config["health_timeout_seconds"]))
    except (Abort, subprocess.TimeoutExpired) as error:
        restored = False
        problems.append(f"rollback failed: {error}")
    problems.append("rolled back to the previous image" + ("" if restored else ", but it is NOT healthy"))
    return problems


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("config", help="JSON configuration written by the hermes Ansible role")
    parser.add_argument("--dry-run", action="store_true", help="report what would happen without pulling or replacing")
    args = parser.parse_args()
    with open(args.config, encoding="utf-8") as handle:
        config = json.load(handle)

    os.makedirs(config["state_dir"], mode=0o700, exist_ok=True)
    lock = open(os.path.join(config["state_dir"], "lock"), "w", encoding="utf-8")
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        log("another run is in progress")
        return 0
    failed_file = os.path.join(config["state_dir"], "failed")

    try:
        new_image, verify = fetch_pin(config)
    except Abort as error:
        notify(config, f"stopped before any change: {error}")
        return 1
    except OSError as error:
        # Why only a log: GitHub being briefly unreachable is retried on the next tick.
        log(f"could not read the pinned image from main: {error}")
        return 1

    env_lines = read_env(config["env_file"])
    old_image = current_image(env_lines)
    if new_image == old_image:
        log(f"already running {new_image}")
        return 0
    if new_image in read_failed(failed_file):
        log(f"{new_image} failed earlier and is not retried; pin a new revision on main")
        return 0
    active = active_cron_runs()
    if active:
        log(f"deferred: {len(active)} Hermes cron run(s) active")
        return 0
    if args.dry_run:
        log(f"would replace {old_image} with {new_image}")
        return 0

    try:
        run(["docker", "pull", new_image], timeout=1800)
    except (Abort, subprocess.TimeoutExpired) as error:
        notify(config, f"pull failed, still running {old_image}: {error}")
        return 1

    # Why check before switching: an image without the stop-gate patches is rejected without downtime.
    mismatched = mismatched_files(["docker", "run", "--rm", "--entrypoint", "sha256sum", new_image], verify)
    if mismatched:
        record_failed(failed_file, new_image)
        notify(config, f"rejected {new_image}: SHA-256 mismatch in {', '.join(mismatched)}; still running {old_image}")
        return 1

    problems = replace(config, old_image, new_image, verify, env_lines)
    if problems:
        record_failed(failed_file, new_image)
        notify(config, f"replacing with {new_image} failed: " + "; ".join(problems))
        return 1
    notify(config, f"replaced {old_image} with {new_image}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
