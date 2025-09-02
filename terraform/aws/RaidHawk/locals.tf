# RaidHawk - DQX Battle Content Notifier Infrastructure

locals {
  # AWS Configuration
  region      = "ap-northeast-1"
  aws_profile = "romira-AdministratorAccess"

  # KMS encrypted Discord webhook URL
  discord_webhook_url_encrypted = "AQICAHiTFWDNgyFwP7Anwn2JozOiEGRP0UgtdgABJWFmeahi1wFKQwgzp/xp5cByzXnHauoCAAAA3DCB2QYJKoZIhvcNAQcGoIHLMIHIAgEAMIHCBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDHDGZCFBXMp+/fVtGgIBEICBlEjRsThUPRmrrOQHE0fn+kMqmNS8ysaq/R6ihencPR61lvV4TxZkc/UAkdMNrdwGy0cRRSdA23AVKOG0Add2l+92DHy0hpHotXhOwjOKLGAWYAqL9iNR3QXtgEMin3BDrIeZ8L91lUrs4haQJBeoUWzmfIPQKGN7hcs02E3AXexnuWUMBAwS46lIj9009ON17f4DwzA="

  common_tags = {
    Project     = "RaidHawk"
    Environment = "production"
    ManagedBy   = "terraform"
    Purpose     = "game-content-monitoring"
  }
}
