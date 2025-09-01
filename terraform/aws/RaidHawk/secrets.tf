# Secrets Manager for Discord Webhook URL
resource "aws_secretsmanager_secret" "discord_webhook" {
  name        = var.secrets_manager_name
  description = "Discord webhook URL for RaidHawk"

}

# Secrets Manager Secret Version
resource "aws_secretsmanager_secret_version" "discord_webhook_version" {
  secret_id = aws_secretsmanager_secret.discord_webhook.id
  secret_string = jsonencode({
    DISCORD_WEBHOOK_URL = "placeholder-will-be-updated-manually"
  })

  lifecycle {
    ignore_changes = [secret_string]
  }
}