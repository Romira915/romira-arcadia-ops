"""Enforce dictionary namespaces for every project configuration source.

Run with the Python interpreter used by Ansible. Vault contents are parsed in
memory using the configured password file; values are never printed.
"""

from pathlib import Path
import unittest

from ansible.parsing.dataloader import DataLoader
from ansible.parsing.vault import VaultSecret


ROOT = Path(__file__).resolve().parents[1]


def scalar_inputs(values):
    """Ansible-owned inputs keep their API names; project inputs are mappings."""
    return [
        key for key, value in (values or {}).items()
        if not key.startswith("ansible_") and not isinstance(value, dict)
    ]


def variable_blocks(value):
    if isinstance(value, dict):
        if isinstance(value.get("vars"), dict):
            yield value["vars"]
        if isinstance(value.get("hosts"), dict):
            for variables in value["hosts"].values():
                if isinstance(variables, dict):
                    yield variables
        for child in value.values():
            yield from variable_blocks(child)
    elif isinstance(value, list):
        for child in value:
            yield from variable_blocks(child)


class VariableNamespaces(unittest.TestCase):
    def test_configuration_sources(self):
        loader = DataLoader()
        password = ROOT / ".vault-password-file"
        if password.exists():
            loader.set_vault_secrets([
                ("default", VaultSecret(password.read_bytes().strip()))
            ])
        sources = set()
        for extension in ("yml", "yaml"):
            for pattern in (
                "roles/*/defaults/*", "roles/*/vars/*",
                "inventories/*/group_vars/**/*",
                "inventories/*/host_vars/**/*", "vars/*",
            ):
                sources.update(ROOT.glob(pattern + "." + extension))
        for path in sorted(sources):
            with self.subTest(path=str(path.relative_to(ROOT))):
                values = loader.load_from_file(str(path))
                self.assertFalse(scalar_inputs(values))
        documents = set(ROOT.rglob("*.yml")) | set(ROOT.rglob("*.yaml"))
        for path in sorted(documents):
            if "files" in path.parts or path in sources:
                continue
            with self.subTest(path=str(path.relative_to(ROOT))):
                values = loader.load_from_file(str(path))
                for variables in variable_blocks(values):
                    self.assertFalse(scalar_inputs(variables))

    def test_scalar_prefixes_are_not_namespaces(self):
        self.assertEqual(scalar_inputs({"openclaw_project_dir": "/opt/openclaw"}),
                         ["openclaw_project_dir"])
        self.assertEqual(scalar_inputs({"apt_upgrade": False}), ["apt_upgrade"])
        self.assertEqual(scalar_inputs({"app_layouts": []}), ["app_layouts"])

    def test_namespaces_and_ansible_inputs(self):
        self.assertEqual(scalar_inputs({
            "openclaw": {"project_dir": "/opt/openclaw"},
            "apt": {"upgrade": False},
            "ansible_connection": "local",
        }), [])


if __name__ == "__main__":
    unittest.main()
