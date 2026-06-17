output "github_actions_role_arn" {
  description = "IAM role ARN used by hasu-music-quiz .github/workflows/deploy-backend.yml."
  value       = aws_iam_role.github_actions_deploy.arn
}

output "backend_artifact_bucket_name" {
  description = "S3 bucket for temporary backend deployment artifacts."
  value       = aws_s3_bucket.backend_deploy_artifacts.bucket
}

output "allowed_github_subject" {
  description = "GitHub OIDC subject allowed to assume the role."
  value       = local.github_subject
}

output "ssm_managed_instance_arn" {
  description = "SSM managed instance ARN allowed for backend deployment commands."
  value       = local.ssm_managed_instance_arn
}
