locals {
  # EventBridge Scheduler replaces context attributes only when angle brackets
  # remain literal. Terraform's jsonencode escapes them, so restore them after
  # encoding while keeping the rest of the payload safely JSON-encoded.
  scheduler_event_input = replace(replace(jsonencode({
    version       = "0"
    id            = "<aws.scheduler.execution-id>"
    "detail-type" = "Scheduled Event"
    source        = "aws.scheduler"
    account       = data.aws_caller_identity.current.account_id
    time          = "<aws.scheduler.scheduled-time>"
    region        = local.region
    resources     = ["<aws.scheduler.schedule-arn>"]
    detail        = {}
  }), "\\u003c", "<"), "\\u003e", ">")
}

resource "aws_scheduler_schedule_group" "raidhawk" {
  name = "RaidHawk"
  tags = local.common_tags
}

resource "aws_iam_role" "scheduler_execution_role" {
  name = "RaidHawkScheduler-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "scheduler.amazonaws.com"
        }
        Action = "sts:AssumeRole"
        Condition = {
          StringEquals = {
            "aws:SourceAccount" = data.aws_caller_identity.current.account_id
          }
          ArnLike = {
            "aws:SourceArn" = aws_scheduler_schedule_group.raidhawk.arn
          }
        }
      }
    ]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy" "scheduler_execution_policy" {
  name = "RaidHawkScheduler-execution-policy"
  role = aws_iam_role.scheduler_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "InvokeRaidHawkLambdas"
        Effect = "Allow"
        Action = "lambda:InvokeFunction"
        Resource = [
          "arn:aws:lambda:${local.region}:${data.aws_caller_identity.current.account_id}:function:${var.lambda_function_name}",
          "arn:aws:lambda:${local.region}:${data.aws_caller_identity.current.account_id}:function:${var.calendar_lambda_function_name}"
        ]
      }
    ]
  })
}

resource "aws_scheduler_schedule" "lambda_schedule" {
  name        = "RaidHawk-schedule"
  group_name  = aws_scheduler_schedule_group.raidhawk.name
  description = "RaidHawk battle content monitoring schedule"
  state       = var.scheduler_schedule_enabled ? "ENABLED" : "DISABLED"

  schedule_expression = "rate(2 hours)"

  flexible_time_window {
    mode = "OFF"
  }

  target {
    arn      = "arn:aws:lambda:${local.region}:${data.aws_caller_identity.current.account_id}:function:${var.lambda_function_name}"
    role_arn = aws_iam_role.scheduler_execution_role.arn
    input    = local.scheduler_event_input

    retry_policy {
      maximum_event_age_in_seconds = 3600
      maximum_retry_attempts       = 2
    }
  }

  lifecycle {
    precondition {
      condition     = !(var.legacy_schedule_enabled && var.scheduler_schedule_enabled)
      error_message = "Legacy EventBridge rules and EventBridge Scheduler schedules cannot both be enabled."
    }
  }

  depends_on = [aws_iam_role_policy.scheduler_execution_policy]
}

resource "aws_scheduler_schedule" "calendar_lambda_schedule" {
  count = var.calendar_lambda_deployed ? 1 : 0

  name        = "RaidHawkCalendarSync-schedule"
  group_name  = aws_scheduler_schedule_group.raidhawk.name
  description = "RaidHawk DQX event calendar synchronization schedule"
  state       = var.scheduler_schedule_enabled && var.calendar_schedule_enabled ? "ENABLED" : "DISABLED"

  schedule_expression = "rate(2 hours)"

  flexible_time_window {
    mode = "OFF"
  }

  target {
    arn      = "arn:aws:lambda:${local.region}:${data.aws_caller_identity.current.account_id}:function:${var.calendar_lambda_function_name}"
    role_arn = aws_iam_role.scheduler_execution_role.arn
    input    = local.scheduler_event_input

    retry_policy {
      maximum_event_age_in_seconds = 3600
      maximum_retry_attempts       = 2
    }
  }

  lifecycle {
    precondition {
      condition     = !var.scheduler_schedule_enabled || var.calendar_lambda_deployed
      error_message = "scheduler_schedule_enabled requires calendar_lambda_deployed=true."
    }
    precondition {
      condition     = !(var.legacy_schedule_enabled && var.scheduler_schedule_enabled)
      error_message = "Legacy EventBridge rules and EventBridge Scheduler schedules cannot both be enabled."
    }
  }

  depends_on = [aws_iam_role_policy.scheduler_execution_policy]
}
