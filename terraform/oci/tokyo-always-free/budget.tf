resource "oci_budget_budget" "tokyo_always_free" {
  amount         = var.budget_amount
  compartment_id = var.tenancy_id
  display_name   = "tokyo-always-free-budget"
  description    = "東京 always-free 環境の課金監視用予算"
  reset_period   = "MONTHLY"
  target_type    = "COMPARTMENT"
  targets        = [var.compartment_id]
}

locals {
  budget_actual_alert_thresholds = {
    for threshold in var.budget_actual_alert_thresholds : tostring(threshold) => threshold
  }
  budget_forecast_alert_thresholds = {
    for threshold in var.budget_forecast_alert_thresholds : tostring(threshold) => threshold
  }
}

resource "oci_budget_alert_rule" "tokyo_always_free_actual" {
  for_each = local.budget_actual_alert_thresholds

  budget_id      = oci_budget_budget.tokyo_always_free.id
  display_name   = "tokyo-always-free-actual-${replace(each.key, ".", "-")}-amount"
  message        = format("東京 always-free 環境の実績支出が請求通貨の %s に達しました。OCI の請求額を確認してください。", each.key)
  recipients     = var.budget_alert_recipients
  threshold      = each.value
  threshold_type = "ABSOLUTE"
  type           = "ACTUAL"
}

resource "oci_budget_alert_rule" "tokyo_always_free_forecast" {
  for_each = local.budget_forecast_alert_thresholds

  budget_id      = oci_budget_budget.tokyo_always_free.id
  display_name   = "tokyo-always-free-forecast-${replace(each.key, ".", "-")}-amount"
  message        = format("東京 always-free 環境の予測支出が請求通貨の %s に達する見込みです。OCI のリソースと請求額を確認してください。", each.key)
  recipients     = var.budget_alert_recipients
  threshold      = each.value
  threshold_type = "ABSOLUTE"
  type           = "FORECAST"
}

moved {
  from = oci_budget_alert_rule.tokyo_always_free_actual
  to   = oci_budget_alert_rule.tokyo_always_free_actual["1"]
}

moved {
  from = oci_budget_alert_rule.tokyo_always_free_forecast
  to   = oci_budget_alert_rule.tokyo_always_free_forecast["1"]
}
