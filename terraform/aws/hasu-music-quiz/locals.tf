locals {
  region      = "ap-northeast-1"
  aws_profile = "romira-AdministratorAccess"

  github_subject = "repo:${var.github_repository}:ref:${var.github_ref}"

  ssm_document_arn         = "arn:aws:ssm:${local.region}::document/AWS-RunShellScript"
  ssm_managed_instance_arn = "arn:aws:ssm:${local.region}:${data.aws_caller_identity.current.account_id}:managed-instance/${var.ssm_managed_instance_id}"

  common_tags = {
    Project     = "hasu-music-quiz"
    Environment = "production"
    ManagedBy   = "terraform"
    Purpose     = "backend-deployment"
  }
}
