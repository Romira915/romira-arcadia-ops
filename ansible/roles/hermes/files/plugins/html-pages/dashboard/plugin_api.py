"""Pages dashboard tab backend, mounted at /api/plugins/html-pages/.

Lists pages by running `hermes-pages list`, so the CLI stays the only code that reads the page tree.
"""
import json
import subprocess

from fastapi import APIRouter, HTTPException

from hermes_constants import get_hermes_home

router = APIRouter()

LIST_TIMEOUT_SECONDS = 15


@router.get("/pages")
def pages():
    command = [str(get_hermes_home() / "bin" / "hermes-pages"), "list"]
    try:
        completed = subprocess.run(command, capture_output=True, text=True, timeout=LIST_TIMEOUT_SECONDS, check=False)
    except (OSError, subprocess.TimeoutExpired) as error:
        raise HTTPException(status_code=502, detail=f"hermes-pages list failed: {error}") from error
    if completed.returncode != 0:
        raise HTTPException(status_code=502, detail=completed.stderr.strip() or "hermes-pages list failed")
    return {"pages": json.loads(completed.stdout)}
