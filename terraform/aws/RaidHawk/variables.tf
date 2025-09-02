variable "lambda_function_name" {
  description = "Name of the Lambda function"
  type        = string
  default     = "RaidHawk"
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
  default     = "RaidHawk-content-states"
}

variable "secrets_manager_name" {
  description = "Name of the Secrets Manager secret"
  type        = string
  default     = "RaidHawk-secrets"
}

variable "iam_role_name" {
  description = "Name of the IAM execution role"
  type        = string
  default     = "RaidHawk-execution-role"
}

variable "iam_policy_name" {
  description = "Name of the IAM execution policy"
  type        = string
  default     = "RaidHawk-execution-policy"
}

variable "github_repo" {
  description = "GitHub repository in format owner/repo"
  type        = string
  default     = "Romira915/RaidHawk"
}
