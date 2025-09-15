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
```

### Ansible Commands
```bash
# Lint all Ansible code
ansible-lint .

# Check playbook execution (dry-run only)
ansible-playbook --check --diff -i inventories/[inventory_name]/hosts [playbook].yml

# Examples:
ansible-playbook --check --diff -i inventories/develop_ubuntu/hosts site.yml --limit 127.0.0.1 --connection local
ansible-playbook --check --diff -i inventories/homeserver/hosts site.yml --limit home
```

## Project Architecture

### Terraform Structure
- **terraform/cloudflare/**: Manages romira.dev domain DNS records
- **terraform/oci/**: Oracle Cloud Infrastructure resources
  - Each subdirectory is an independent Terraform project with its own state
  - Backend: OCI Object Storage (S3-compatible)
  - Uses tfmigrate for import history management

### Ansible Structure
- **ansible/roles/**: Reusable configuration modules (Docker, MySQL, OpenLiteSpeed, etc.)
- **ansible/inventories/**: Host-specific configurations
  - Each inventory has `group_vars/all/vars.yml` and `vault.yml`
  - Vault password file: `.vault-password-file`
- **Playbooks**:
  - `site.yml`: Main playbook
  - `develop_*.yml`: Development environment setup
  - `homeserver.yml`, `wakaba.yml`, `hinokuni.yml`: Server-specific

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
1. Run `ansible-lint .`
2. Run playbook with `--check --diff` flags
3. Verify no sensitive data is exposed in plain text

## Repository-Specific Notes

- This manages personal infrastructure across OCI (Oracle Cloud) and Cloudflare
- Supports Ubuntu, Windows, and macOS configuration management
- All Ansible commands must include vault password file (configured in ansible.cfg)