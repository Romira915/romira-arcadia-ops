data "newrelic_notification_destination" "slack" {
  id = "19d9283e-ce8d-459c-901e-eb179d421475"
}

resource "newrelic_notification_channel" "tsumugu_slack" {
  name           = "tsumugu"
  type           = "SLACK"
  destination_id = data.newrelic_notification_destination.slack.id
  product        = "IINT"

  property {
    key           = "channelId"
    value         = "C06HR2WC9AA"
    display_value = "newrelic"
  }

  property {
    key   = "customDetailsSlack"
    value = "@channel"
  }
}

resource "newrelic_workflow" "tsumugu" {
  name                  = "Policy: tsumugu"
  muting_rules_handling = "DONT_NOTIFY_FULLY_MUTED_ISSUES"
  enrichments_enabled   = true

  issues_filter {
    name = "tsumugu policy"
    type = "FILTER"

    predicate {
      attribute = "labels.policyIds"
      operator  = "EXACTLY_MATCHES"
      values    = [newrelic_alert_policy.tsumugu.id]
    }
  }

  enrichments {
    nrql {
      name = "Collector error details"

      configuration {
        query = <<-NRQL
          SELECT timestamp, message, screenName, failureCategory, error, attemptCount, deadLettered, sourceUrl
          FROM XEventAgentLog
          WHERE message IN (
            'collector_failed',
            'collector_account_failed',
            'collector_candidate_requeued',
            'collector_external_sync_failed',
            'collector_external_sync_retry_failed'
          )
          SINCE 2 hours ago
          LIMIT 10
        NRQL
      }
    }

    nrql {
      name = "Worker error details"

      configuration {
        query = <<-NRQL
          SELECT timestamp, logtype, statusCode, url, scope, message, durationMs
          FROM Log
          WHERE service = 'tsumugu-web'
            AND (statusCode >= 500 OR logtype = 'app_error')
          SINCE 30 minutes ago
          LIMIT 10
        NRQL
      }
    }
  }

  destination {
    channel_id = newrelic_notification_channel.tsumugu_slack.id
    notification_triggers = [
      "ACKNOWLEDGED",
      "ACTIVATED",
      "CLOSED",
    ]
    update_original_message = true
  }
}
