# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${var.lambda_function_name}"
  retention_in_days = 1
}

# EventBridge Rule for Scheduled Execution
resource "aws_cloudwatch_event_rule" "lambda_schedule" {
  name                = "RaidHawk-schedule"
  description         = "RaidHawk battle content monitoring schedule"
  schedule_expression = "rate(2 hours)"
}

# EventBridge Target for Lambda
resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.lambda_schedule.name
  target_id = "RaidHawkLambdaTarget"
  arn       = "arn:aws:lambda:${local.region}:${data.aws_caller_identity.current.account_id}:function:${var.lambda_function_name}"
}

resource "aws_cloudwatch_log_group" "calendar_lambda_logs" {
  name              = "/aws/lambda/${var.calendar_lambda_function_name}"
  retention_in_days = 1
  tags              = local.common_tags
}

resource "aws_cloudwatch_event_rule" "calendar_lambda_schedule" {
  name                = "RaidHawkCalendarSync-schedule"
  description         = "RaidHawk DQX event calendar synchronization schedule"
  schedule_expression = "rate(2 hours)"
  state               = var.calendar_schedule_enabled ? "ENABLED" : "DISABLED"
  tags                = local.common_tags

  lifecycle {
    precondition {
      condition     = !var.calendar_schedule_enabled || var.calendar_lambda_deployed
      error_message = "calendar_schedule_enabled requires calendar_lambda_deployed=true."
    }
  }
}

resource "aws_cloudwatch_event_target" "calendar_lambda_target" {
  count = var.calendar_lambda_deployed ? 1 : 0

  rule      = aws_cloudwatch_event_rule.calendar_lambda_schedule.name
  target_id = "RaidHawkCalendarSyncLambdaTarget"
  arn       = "arn:aws:lambda:${local.region}:${data.aws_caller_identity.current.account_id}:function:${var.calendar_lambda_function_name}"
}
