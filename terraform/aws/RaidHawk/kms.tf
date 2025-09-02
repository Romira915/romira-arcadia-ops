# KMS key for encrypting secrets
resource "aws_kms_key" "secrets" {
  description             = "KMS key for RaidHawk secrets encryption"
  deletion_window_in_days = 7

  tags = {
    Name = "RaidHawk-secrets-key"
  }
}

resource "aws_kms_alias" "secrets" {
  name          = "alias/raidhawk-secrets"
  target_key_id = aws_kms_key.secrets.key_id
}