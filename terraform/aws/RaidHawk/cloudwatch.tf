# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${var.lambda_function_name}"
  retention_in_days = 1
}

# EventBridge Rule for Scheduled Execution
resource "aws_cloudwatch_event_rule" "lambda_schedule" {
  name                = "RaidHawk-schedule"
  description         = "RaidHawk battle content monitoring schedule"
  schedule_expression = "rate(12 hours)"
}

# EventBridge Target for Lambda
resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.lambda_schedule.name
  target_id = "RaidHawkLambdaTarget"
  arn       = "arn:aws:lambda:${local.region}:${data.aws_caller_identity.current.account_id}:function:${var.lambda_function_name}"
}