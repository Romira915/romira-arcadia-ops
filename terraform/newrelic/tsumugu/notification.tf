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

  issues_filter {
    name = "tsumugu policy"
    type = "FILTER"

    predicate {
      attribute = "labels.policyIds"
      operator  = "EXACTLY_MATCHES"
      values    = [newrelic_alert_policy.tsumugu.id]
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
