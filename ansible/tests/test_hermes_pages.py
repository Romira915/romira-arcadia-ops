"""Behaviour of the hermes-pages CLI that Hermes uses to publish HTML."""

import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


CLI = Path(__file__).resolve().parents[1] / "roles/hermes/files/bin/hermes-pages"
PRIVATE_URL = "https://tailnet.example:8445/"
PUBLIC_URL = "https://pages.example/"


class HermesPages(unittest.TestCase):
    def setUp(self):
        self.workdir = tempfile.TemporaryDirectory()
        base = Path(self.workdir.name)
        self.root = base / "html"
        for directory in ("private", "public", ".staging"):
            (self.root / directory).mkdir(parents=True)
        self.config = base / "config.json"
        self.config.write_text(json.dumps({
            "root": str(self.root),
            "base_urls": {"private": PRIVATE_URL, "public": PUBLIC_URL},
        }))
        self.source = self.make_source(base / "Weekly Report", "<title>Weekly report</title>v1")

    def tearDown(self):
        self.workdir.cleanup()

    def make_source(self, path, html):
        path.mkdir()
        (path / "index.html").write_text(html)
        return path

    def run_cli(self, *arguments):
        return subprocess.run(
            [sys.executable, str(CLI), *arguments],
            capture_output=True,
            text=True,
            env={**os.environ, "HERMES_PAGES_CONFIG": str(self.config)},
            check=False,
        )

    def run_ok(self, *arguments):
        completed = self.run_cli(*arguments)
        self.assertEqual(completed.returncode, 0, completed.stderr)
        return json.loads(completed.stdout)

    def publish(self, visibility="private"):
        return self.run_ok("publish", str(self.source), "--visibility", visibility)

    def assert_refused(self, *arguments):
        completed = self.run_cli(*arguments)
        self.assertNotEqual(completed.returncode, 0)
        self.assertIn("hermes-pages:", completed.stderr)

    def test_publish_places_the_page_under_its_visibility_and_returns_its_url(self):
        page = self.publish("public")

        self.assertRegex(page["slug"], r"^weekly-report-[a-z0-9]{8}$")
        self.assertEqual(page["url"], f"{PUBLIC_URL}{page['slug']}/")
        published = self.root / "public" / page["slug"] / "index.html"
        self.assertEqual(published.read_text(), "<title>Weekly report</title>v1")
        self.assertEqual(published.stat().st_mode & 0o777, 0o644)
        self.assertFalse((self.root / "private" / page["slug"]).exists())

    def test_set_visibility_moves_the_page_and_changes_only_the_host(self):
        page = self.publish("private")

        moved = self.run_ok("set-visibility", page["slug"], "public")

        self.assertEqual(moved["url"], f"{PUBLIC_URL}{page['slug']}/")
        self.assertTrue((self.root / "public" / page["slug"]).is_dir())
        self.assertFalse((self.root / "private" / page["slug"]).exists())

        back = self.run_ok("set-visibility", page["slug"], "private")

        self.assertEqual(back["url"], page["url"])
        self.assertFalse((self.root / "public" / page["slug"]).exists())

    def test_update_replaces_contents_and_keeps_visibility(self):
        page = self.publish("public")
        replacement = self.make_source(Path(self.workdir.name) / "v2", "v2")

        updated = self.run_ok("update", page["slug"], str(replacement))

        self.assertEqual(updated, page)
        self.assertEqual((self.root / "public" / page["slug"] / "index.html").read_text(), "v2")
        self.assertEqual([path.name for path in (self.root / ".staging").iterdir()], [".lock"])

    def test_list_reports_title_visibility_and_url(self):
        page = self.publish("private")

        self.assertEqual(self.run_ok("list"), [{**page, "title": "Weekly report"}])

    def test_remove_deletes_the_page(self):
        page = self.publish("private")

        self.run_ok("remove", page["slug"])

        self.assertEqual(self.run_ok("list"), [])
        self.assertEqual([path.name for path in (self.root / ".staging").iterdir()], [".lock"])

    def test_refuses_sources_with_symbolic_links(self):
        (self.source / "secret").symlink_to("/etc/hostname")

        self.assert_refused("publish", str(self.source), "--visibility", "public")
        self.assertEqual(list((self.root / "public").iterdir()), [])

    def test_refuses_sources_without_index_html(self):
        (self.source / "index.html").unlink()

        self.assert_refused("publish", str(self.source), "--visibility", "private")

    def test_refuses_slugs_that_could_leave_the_page_directories(self):
        self.publish("private")

        for slug in ("../private", "..", "page", "x/../../etc-abcdefgh"):
            with self.subTest(slug=slug):
                self.assert_refused("set-visibility", slug, "public")
                self.assert_refused("remove", slug)

    def test_refuses_unknown_pages(self):
        self.assert_refused("remove", "missing-abcdefgh")


if __name__ == "__main__":
    unittest.main()
