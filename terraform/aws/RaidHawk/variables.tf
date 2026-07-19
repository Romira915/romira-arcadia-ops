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

variable "calendar_lambda_function_name" {
  description = "Name of the CalendarSync Lambda function"
  type        = string
  default     = "RaidHawkCalendarSync"
}

variable "calendar_dynamodb_table_name" {
  description = "Name of the CalendarSync DynamoDB table"
  type        = string
  default     = "RaidHawk-calendar-events"
}

variable "calendar_iam_role_name" {
  description = "Name of the CalendarSync Lambda execution role"
  type        = string
  default     = "RaidHawkCalendarSync-execution-role"
}

variable "calendar_iam_policy_name" {
  description = "Name of the CalendarSync Lambda execution policy"
  type        = string
  default     = "RaidHawkCalendarSync-execution-policy"
}

variable "calendar_parameter_path_prefix" {
  description = "SSM Parameter Store path containing CalendarSync credentials"
  type        = string
  default     = "/RaidHawk/calendar"
}

variable "calendar_lambda_deployed" {
  description = "Create EventBridge target and Lambda permission after cargo-lambda has deployed the function"
  type        = bool
  default     = true
}

variable "calendar_schedule_enabled" {
  description = "Enable the CalendarSync schedule after manual invocation has been verified"
  type        = bool
  default     = true
}

variable "legacy_schedule_enabled" {
  description = "Keep the legacy EventBridge scheduled rules enabled during the Scheduler migration"
  type        = bool
  default     = true
}

variable "scheduler_schedule_enabled" {
  description = "Enable the replacement EventBridge Scheduler schedules after they have been provisioned and verified"
  type        = bool
  default     = false
}
