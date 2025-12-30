# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an Infrastructure as Code (IaC) repository for managing personal environments using Terraform and Ansible.

## Critical Restrictions

**NEVER execute apply commands:**
- `terraform apply` is forbidden
- `ansible-playbook` without `--check` flag is forbidden
- Any infrastructure changes must only be planned/checked, never applied

## Common Commands

### Terraform Commands
```bash
# Validate configuration (run from specific terraform directory)
cd terraform/oci/tokyo-always-free/  # or other terraform directory
terraform init  # first time only
terraform validate

# Format check (prefer Claude Code hooks for auto-formatting)
terraform fmt

# Plan changes (apply is forbidden)
terraform plan

# Create tfmigrate file for importing existing resources
touch tfmigrate/$(date "+%Y%m%d%H%M%S")_{migrate_name}.hcl
```

### Ansible Commands
```bash
# Lint all Ansible code (run from ansible/ directory)
cd ansible && ansible-lint .

# Check playbook execution (dry-run only)
ansible-playbook --check --diff -i inventories/[inventory_name]/hosts [playbook].yml

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

## Task Completion Checklist

When modifying Terraform:
1. Run `terraform fmt` (or let Claude Code hooks handle it)
2. Run `terraform validate`
3. Run `terraform plan` to verify changes

When modifying Ansible:
1. Run `ansible-lint .` from ansible/ directory
2. Run playbook with `--check --diff` flags
3. Verify no sensitive data is exposed in plain text