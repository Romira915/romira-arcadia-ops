# Note: Lambda function is deployed separately via cargo lambda deploy
# We only manage the IAM role and permissions here

# Lambda Permission for EventBridge
resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowExecutionFromRaidHawkEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.lambda_schedule.arn
}

resource "aws_lambda_permission" "allow_calendar_eventbridge" {
  count = var.calendar_lambda_deployed ? 1 : 0

  statement_id  = "AllowExecutionFromRaidHawkCalendarSyncEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = var.calendar_lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.calendar_lambda_schedule.arn
}
