# NRQL ダッシュボード定義（dashboards/tsumugu.json）をそのまま適用する。
# JSON 内の `__ACCOUNT_ID__` プレースホルダはアカウント ID に置換する。
resource "newrelic_one_dashboard_json" "tsumugu" {
  json = replace(
    file("${path.module}/dashboards/tsumugu.json"),
    "__ACCOUNT_ID__",
    var.account_id,
  )
}
