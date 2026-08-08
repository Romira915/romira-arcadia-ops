output "dashboard_guid" {
  description = "tsumugu ダッシュボードの GUID（New Relic UI で開く場合）"
  value       = newrelic_one_dashboard_json.tsumugu.guid
}

output "alert_policy_id" {
  description = "tsumugu アラートポリシー ID"
  value       = newrelic_alert_policy.tsumugu.id
}
