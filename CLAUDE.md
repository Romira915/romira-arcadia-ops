# CLAUDE.md

This file provides repository guidance for AI coding agents working in this repository.

## Repository Overview

This is an Infrastructure as Code (IaC) repository for managing personal environments using Terraform and Ansible.

## Apply Restrictions

Apply commands require explicit user authorization for the target and operation.
Planning and check mode are the default when authorization has not been given.

- Without explicit authorization, `terraform apply` is forbidden.
- Without explicit authorization, `ansible-playbook` without `--check` is forbidden.
- When the user explicitly authorizes a target and operation, execute the requested apply without an additional approval prompt.
- Do not broaden the target or operation beyond the explicit authorization.

## Common Commands

### Terraform Commands
```bash
# Validate configuration (run from specific terraform directory)
cd terraform/oci/tokyo-always-free/  # or other terraform directory
terraform init  # first time only
terraform validate

# Format check (prefer Claude Code hooks for auto-formatting)
terraform fmt

# Plan changes (default; apply requires explicit authorization)
terraform plan

# Apply changes only after explicit user authorization for the target
terraform apply

# Create tfmigrate file for importing existing resources
touch tfmigrate/$(date "+%Y%m%d%H%M%S")_{migrate_name}.hcl
```

### Ansible Commands
```bash
# Lint all Ansible code (run from ansible/ directory)
cd ansible && ansible-lint .

# Check playbook execution (default)
ansible-playbook --check --diff -i inventories/[inventory_name]/hosts [playbook].yml

# Full execution only after explicit user authorization for the target
ansible-playbook -i inventories/[inventory_name]/hosts [playbook].yml

# Examples:
ansible-playbook --check --diff -i inventories/develop_ubuntu/hosts site.yml --limit 127.0.0.1 --connection local
ansible-playbook --check --diff -i inventories/homeserver/hosts site.yml --limit home
ansible-playbook --check --diff -i inventories/oci-tokyo-ampere/hosts oci-tokyo-ampere.yml
```

## Project Architecture

### Terraform Structure
Each subdirectory is an independent Terraform project with its own state and backend configuration.

- **terraform/cloudflare/**: Manages romira.dev domain DNS records
- **terraform/oci/**: Oracle Cloud Infrastructure (tokyo-always-free, osaka-always-free)
  - Backend: OCI Object Storage (S3-compatible)
- **terraform/aws/**: AWS resources (RaidHawk project - Lambda, DynamoDB, CloudWatch, IAM)
  - Project-specific README contains KMS encryption commands

All Terraform projects use tfmigrate for import history management (see `tfmigrate/` directories).

### Ansible Structure
- **ansible/roles/**: Reusable configuration modules (docker, postgresql, brew, MySQL, OpenLiteSpeed, Tailscale, etc.)
- **ansible/inventories/**: Host-specific configurations
  - Each inventory has `group_vars/all/vars.yml` and `vault.yml`
  - Vault password is auto-loaded via ansible.cfg
- **Playbooks**: `site.yml` (main), `develop_*.yml` (dev environments), server-specific (homeserver.yml, wakaba.yml, hinokuni.yml, oci-tokyo-ampere.yml)

### Security Considerations
- Sensitive data must be in `vault.yml` files (already encrypted)
- `.vault-password-file` provides decryption (never commit)
- Check `git diff` before commits to ensure no secrets are exposed

## Incus テスト環境

`ansible/molecule/develop_ubuntu_incus/` に Incus コンテナを使ったテスト環境がある。
テストコンテナ内での `ansible-playbook` 実行は `--check` 制限の例外とする。

```bash
cd ansible/molecule/develop_ubuntu_incus

# 全テストライフサイクル実行（destroy → create → converge → verify）
just test

# 個別ステップ
just create    # コンテナ起動 + Python3/sudo インストール
just converge  # テスト用プレイブック実行
just verify    # 検証プレイブック実行
just destroy   # コンテナ削除
just login     # デバッグ用シェル接続
```

## Task Completion Checklist

When modifying Terraform:
1. Run `terraform fmt` (or let Claude Code hooks handle it)
2. Run `terraform validate`
3. Run `terraform plan` to verify changes
4. Run `terraform apply` only when the user has explicitly authorized the target and operation.

When modifying Ansible:
1. Run `ansible-lint .` from ansible/ directory
2. Run the playbook with `--check --diff` flags by default.
3. Run the full playbook only when the user has explicitly authorized the target and operation.
4. Verify no sensitive data is exposed in plain text
