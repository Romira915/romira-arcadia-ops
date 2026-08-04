# Ansible

## Common setup

1. create .vault-password-file
   ```shell
   echo "${VAULT_PASSWORD} > .vault-password-file
   ```

## develop_ubuntu

1. Install require asnible galaxy
   ```shell
   ansible-galaxy install markosamuli.linuxbrew
   ```
1. Execute ansible-playbook.
   ```shell
   ansible-playbook --diff -i inventories/develop_ubuntu/hosts site.yml --limit 127.0.0.1 --connection local
   ```

### Google Maps MCP credentials (POSIX shells and Windows MSYS2)

The Google Maps API key is stored in Ansible Vault, exported by the user's
shell profile, and placed in OpenCode's env directory. Add it under
`vault_opencode_env` in the relevant inventory's `group_vars/all/vault.yml`:

```yaml
vault_opencode_env:
  google_maps_api_key: "AIza..."
```

Apply only the environment task for the target platform:

```shell
ansible-playbook --diff -i inventories/develop_ubuntu/hosts site.yml \
  --limit 127.0.0.1 --connection local --tags opencode_env,google_maps_env
```

For macOS, run `develop_macOS.yml` with the `develop_macOS` inventory. For
Windows MSYS2, run `develop_windows.yml` with the `develop_windows` inventory
and the target host limit.

The generated shell profile file is
`~/.config/romira-s-config/shell/profile.d/google-maps` with mode `0600` on
Linux/macOS. On Windows, the same file is written under the Windows home
directory with `win_copy`; MSYS2 fish loads it through the existing POSIX
profile bridge. The OpenCode env file
`~/.config/opencode/env/google-maps-api-key` is generated with mode `0600` on
POSIX systems. On Windows it is written to
`C:\Users\<user>\.config\opencode\env\google-maps-api-key` using the
user's Windows profile. Secret files are not stored in Git.

## develop_macOS

1. Execute ansible-playbook.
   ```shell
   ansible-playbook --diff -i inventories/develop_macOS/hosts develop_macOS.yml --limit localhost --connection local
   ```

## develop_windows

### Setup for windows

1. Setup WinRM.
    ```powershell
    $url = "https://raw.githubusercontent.com/ansible/ansible-documentation/devel/examples/scripts/ConfigureRemotingForAnsible.ps1"
    $file = "$env:temp\ConfigureRemotingForAnsible.ps1"

    (New-Object -TypeName System.Net.WebClient).DownloadFile($url, $file)

    powershell.exe -ExecutionPolicy ByPass -File $file
    ```

1. Disable firewall or allow 5986 port.
1. Execute ansible-playbook.
   ```shell
   ansible-playbook --diff -i inventories/develop_windows/hosts site.yml --limit ${WINDOWS_HOSTNAME}
   ```
1. Enable firewall.

## homeserver

1. Execute ansible-playbook.
   ```shell
   ansible-playbook --diff -i inventories/homeserver/hosts site.yml --limit home
   ```
