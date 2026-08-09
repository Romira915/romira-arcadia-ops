locals {
  # provider に notification channel の検索用 data source がないため、既存 workflow の channel ID を参照する。
  hasunosora_twitter_watch_slack_channel_id = "58ee5e02-31c2-4e09-849c-616f5156a556"
}

import {
  to = newrelic_workflow.hasunosora_twitter_watch_slack
  id = "54524a31-f011-4253-b976-ff9ddc38abf5"
}

resource "newrelic_workflow" "hasunosora_twitter_watch_slack" {
  name                  = "Policy 5087508: hasunosora-twitter-watch policy"
  muting_rules_handling = "DONT_NOTIFY_FULLY_MUTED_ISSUES"

  issues_filter {
    name = ""
    type = "FILTER"

    predicate {
      attribute = "labels.policyIds"
      operator  = "EXACTLY_MATCHES"
      values = [
        "5087508",
        newrelic_alert_policy.tsumugu.id,
      ]
    }
  }

  destination {
    channel_id = local.hasunosora_twitter_watch_slack_channel_id
    notification_triggers = [
      "ACKNOWLEDGED",
      "ACTIVATED",
      "CLOSED",
    ]
    update_original_message = true
  }
}
