# Secrets Manager for Discord Webhook URL
resource "aws_secretsmanager_secret" "discord_webhook" {
  name        = var.secrets_manager_name
  description = "Discord webhook URL for RaidHawk"
  kms_key_id  = aws_kms_key.secrets.arn
}

# KMS decrypt the encrypted webhook URL
data "aws_kms_secrets" "discord_webhook" {
  secret {
    name    = "discord_webhook_url"
    payload = local.discord_webhook_url_encrypted
  }
}

# Secrets Manager Secret Version
resource "aws_secretsmanager_secret_version" "discord_webhook_version" {
  secret_id = aws_secretsmanager_secret.discord_webhook.id
  secret_string = jsonencode({
    DISCORD_WEBHOOK_URL = data.aws_kms_secrets.discord_webhook.plaintext["discord_webhook_url"]
  })
}
