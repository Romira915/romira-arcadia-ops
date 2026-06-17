variable "github_repository" {
  description = "GitHub repository allowed to assume the deploy role."
  type        = string
  default     = "Romira915/hasu-music-quiz"
}

variable "github_ref" {
  description = "Git ref allowed to assume the deploy role."
  type        = string
  default     = "refs/heads/main"
}

variable "github_actions_role_name" {
  description = "IAM role name for GitHub Actions backend deploys."
  type        = string
  default     = "hasu-music-quiz_github_actions_deploy_role"
}

variable "backend_artifact_bucket_name" {
  description = "Private S3 bucket for temporary backend deployment artifacts."
  type        = string
  default     = "hasu-music-quiz-backend-deploy-616657986447"
}

variable "ssm_managed_instance_id" {
  description = "SSM managed instance ID for the backend host."
  type        = string
  default     = "mi-0c7195454110abb6d"
}
