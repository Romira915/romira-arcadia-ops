# RaidHawk AWS Infrastructure

## Secret Management

### Encrypting Discord Webhook URL

To encrypt a new Discord webhook URL for secure storage:

```bash
# Encrypt the webhook URL using KMS
echo -n "YOUR_DISCORD_WEBHOOK_URL" | aws kms encrypt \
  --key-id "arn:aws:kms:ap-northeast-1:$(terraform output -raw aws_account_id):alias/raidhawk-secrets" \
  --plaintext fileb:///dev/stdin \
  --output text \
  --query CiphertextBlob \
  --profile romira-AdministratorAccess \
  --region ap-northeast-1
```

Update the encrypted value in `terraform.tfvars`:
```hcl
discord_webhook_url_encrypted = "ENCRYPTED_BASE64_VALUE"
```

### Decrypting Discord Webhook URL

To decrypt and verify the stored webhook URL:

```bash
# Decrypt the webhook URL
echo "ENCRYPTED_BASE64_VALUE" | base64 -d | aws kms decrypt \
  --ciphertext-blob fileb:///dev/stdin \
  --output text \
  --query Plaintext \
  --profile romira-AdministratorAccess \
  --region ap-northeast-1 | base64 -d
```

### Commands

```bash
# Validate configuration
terraform validate

# Plan changes (apply is forbidden per CLAUDE.md)
terraform plan
```
