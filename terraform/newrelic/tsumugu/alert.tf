# 動作確認: クローラー死活 / 生成品質 / worker エラー率 / backlog。
# 閾値の調整は variables.tf を参照。イベント定義は x-event-agent/docs/observability.md。

# --- 1. collector の実行が失敗したら検知 ---
resource "newrelic_nrql_alert_condition" "collector_run_failed" {
  policy_id                    = newrelic_alert_policy.tsumugu.id
  type                         = "static"
  name                         = "Collector run failed"
  description                  = "collector の実行が失敗した（XEventAgentRun.status = failed）"
  enabled                      = true
  violation_time_limit_seconds = 86400
  nrql {
    query = "SELECT count(*) FROM XEventAgentRun WHERE status = 'failed' SINCE 60 minutes ago"
  }
  critical {
    operator              = "above"
    threshold             = var.collector_run_failed_threshold
    threshold_duration    = 300
    threshold_occurrences = "ALL"
  }
}

# --- 2. クローラーが想定間隔で実行されなくなったら検知（間隔 × 2 の窓で 0 件） ---
resource "newrelic_nrql_alert_condition" "collector_stale" {
  policy_id                    = newrelic_alert_policy.tsumugu.id
  type                         = "static"
  name                         = "Collector stale"
  description                  = "集計イベントが検知窓（実行間隔 ×2）に 1 件もない = クローラー停止の可能性"
  enabled                      = true
  violation_time_limit_seconds = 86400
  nrql {
    query = "SELECT count(*) FROM XEventAgentRun SINCE ${var.collector_interval_minutes * 2} minutes ago"
  }
  critical {
    operator              = "equals"
    threshold             = 0
    threshold_duration    = 300
    threshold_occurrences = "ALL"
  }
}

# --- 3. 候補生成の失敗割合が閾値を超えたら検知 ---
resource "newrelic_nrql_alert_condition" "generation_failure_rate" {
  policy_id                    = newrelic_alert_policy.tsumugu.id
  type                         = "static"
  name                         = "Generation failure rate"
  description                  = "草稿生成候補の失敗割合が閾値を超えた（CLI / モデル劣化の兆候）"
  enabled                      = true
  violation_time_limit_seconds = 86400
  nrql {
    query = "SELECT filter(count(*), WHERE status = 'failed') * 100 / count(*) AS pct FROM XEventAgentRun SINCE 60 minutes ago"
  }
  critical {
    operator              = "above"
    threshold             = var.generation_failure_rate_threshold
    threshold_duration    = 600
    threshold_occurrences = "ALL"
  }
}

# --- 4. worker で 5xx が集中したら検知 ---
resource "newrelic_nrql_alert_condition" "worker_5xx" {
  policy_id                    = newrelic_alert_policy.tsumugu.id
  type                         = "static"
  name                         = "Worker 5xx"
  description                  = "tsumugu-web の 5xx レスポンス数が閾値を超えた"
  enabled                      = true
  violation_time_limit_seconds = 86400
  nrql {
    query = "SELECT count(*) FROM Log WHERE service = 'tsumugu-web' AND logtype = 'request' AND statusCode >= 500 SINCE ${var.worker_5xx_window_minutes} minutes ago"
  }
  critical {
    operator              = "above"
    threshold             = var.worker_5xx_threshold
    threshold_duration    = 300
    threshold_occurrences = "ALL"
  }
}

# --- 5. 処理待ちキュー（backlog）が滞留したら検知 ---
resource "newrelic_nrql_alert_condition" "backlog" {
  policy_id                    = newrelic_alert_policy.tsumugu.id
  type                         = "static"
  name                         = "Candidate backlog"
  description                  = "実行終了時点の処理待ちキュー件数が閾値を超え、候補生成が追いついていない可能性"
  enabled                      = true
  violation_time_limit_seconds = 86400
  nrql {
    query = "SELECT latest(queuedAtEnd) FROM XEventAgentRun SINCE 1 day ago"
  }
  critical {
    operator              = "above"
    threshold             = var.backlog_threshold
    threshold_duration    = 600
    threshold_occurrences = "ALL"
  }
}