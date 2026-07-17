# DynamoDB Table for Content States
resource "aws_dynamodb_table" "content_states" {
  name         = var.dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "content_name"

  attribute {
    name = "content_name"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  point_in_time_recovery {
    enabled = false
  }

  server_side_encryption {
    enabled = true
  }
}

# CalendarSync event and analyzer state.
resource "aws_dynamodb_table" "calendar_events" {
  name         = var.calendar_dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "event_key"
  table_class  = "STANDARD"

  attribute {
    name = "event_key"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  # PITR is a separately billed optional feature and is unnecessary for
  # reproducible crawler/analyzer state.
  point_in_time_recovery {
    enabled = false
  }

  server_side_encryption {
    enabled = true
  }

  tags = local.common_tags
}
