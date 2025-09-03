# RaidHawk - DQX Battle Content Notifier Infrastructure

locals {
  # AWS Configuration
  region      = "ap-northeast-1"
  aws_profile = "romira-AdministratorAccess"


  common_tags = {
    Project     = "RaidHawk"
    Environment = "production"
    ManagedBy   = "terraform"
    Purpose     = "game-content-monitoring"
  }
}
