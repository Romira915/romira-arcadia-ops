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

# Initial CalendarSync infrastructure plan. The schedule remains disabled and
# no Lambda target/permission is created before cargo-lambda deployment.
terraform plan \
  -var='calendar_lambda_deployed=false' \
  -var='calendar_schedule_enabled=false'

# After RaidHawkCalendarSync has been deployed and manually verified:
terraform plan
```

`terraform apply` is forbidden per this repository's `CLAUDE.md`; an
infrastructure administrator must perform the reviewed change through the
approved workflow.

## CalendarSync cost controls

- DynamoDB Standard: PAY_PER_REQUEST
- DynamoDB PITR: disabled
- SSM Parameter Store: Standard tier under `/RaidHawk/calendar/*`
- CloudWatch Logs retention: 1 day
- EventBridge rule: disabled until the Lambda manual test is complete
- Secrets Manager and customer-managed KMS keys are not used
