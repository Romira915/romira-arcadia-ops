# RaidHawk - DQX Battle Content Notifier Infrastructure

locals {
  common_tags = {
    Project     = "RaidHawk"
    Environment = "production"
    ManagedBy   = "terraform"
    Purpose     = "game-content-monitoring"
  }
}
