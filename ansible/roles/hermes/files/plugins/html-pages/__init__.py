"""Pages dashboard tab. The agent side registers nothing; the tab lives in dashboard/."""


def register(ctx) -> None:
    """Hermes loads every enabled plugin through register(); this one only adds a dashboard tab."""
