# 動作確認: クローラー死活 / 生成品質 / worker エラー率 / backlog。
# 閾値の調整は variables.tf を参照。イベント定義は x-event-agent/docs/observability.md。
#
# 注意: New Relic の streaming NRQL アラートはクエリ内の SINCE 句を拒否する。
# 評価期間はアラート条件の集計(aggregation window / threshold_duration)で制御するため、
# 以下のクエリに SINCE は含めない。

# --- 1. collector の実行が失敗したら検知 ---
resource "newrelic_nrql_alert_condition" "collector_run_failed" {
  policy_id                    = newrelic_alert_policy.tsumugu.id
  type                         = "static"
  name                         = "Collector run failed"
  description                  = "collector の実行が失敗した（XEventAgentRun.status = failed）"
  enabled                      = true
  violation_time_limit_seconds = 86400
  nrql {
    query = "SELECT count(*) FROM XEventAgentRun WHERE status = 'failed'"
  }
  critical {
    operator              = "above"
    threshold             = var.collector_run_failed_threshold
    threshold_duration    = 300
    threshold_occurrences = "AT_LEAST_ONCE"
  }
}

# --- 2. クローラーが想定間隔で実行されなくなったら検知 ---
# 集計ウィンドウ（既定 60 秒）で count = 0 が、実行間隔 × 2 の間続いたら stale とみなす。
# threshold_duration の上限は 3600 秒のため、間隔が 30 分を超える場合はクランプされる。
resource "newrelic_nrql_alert_condition" "collector_stale" {
  policy_id                    = newrelic_alert_policy.tsumugu.id
  type                         = "static"
  name                         = "Collector stale"
  description                  = "集計イベントが実行間隔 ×2 の間 1 件もない = クローラー停止の可能性"
  enabled                      = true
  violation_time_limit_seconds = 86400
  nrql {
    query = "SELECT count(*) FROM XEventAgentRun"
  }
  critical {
    operator              = "equals"
    threshold             = 0
    threshold_duration    = min(var.collector_interval_minutes * 2 * 60, 3600)
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
    query = "SELECT filter(count(*), WHERE status = 'failed') * 100 / count(*) AS pct FROM XEventAgentRun"
  }
  critical {
    operator              = "above"
    threshold             = var.generation_failure_rate_threshold
    threshold_duration    = 600
    threshold_occurrences = "ALL"
  }
}

# --- 4. worker で 5xx が集中したら検知 ---
# 5xx が閾値を超える状態が worker_5xx_window_minutes（既定 5 分）継続したら critical。
resource "newrelic_nrql_alert_condition" "worker_5xx" {
  policy_id                    = newrelic_alert_policy.tsumugu.id
  type                         = "static"
  name                         = "Worker 5xx"
  description                  = "tsumugu-web の 5xx レスポンス数が閾値を超えた"
  enabled                      = true
  violation_time_limit_seconds = 86400
  nrql {
    query = "SELECT count(*) FROM Log WHERE service = 'tsumugu-web' AND logtype = 'request' AND statusCode >= 500"
  }
  critical {
    operator              = "above"
    threshold             = var.worker_5xx_threshold
    threshold_duration    = var.worker_5xx_window_minutes * 60
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
    query = "SELECT latest(queuedAtEnd) FROM XEventAgentRun"
  }
  critical {
    operator              = "above"
    threshold             = var.backlog_threshold
    threshold_duration    = 600
    threshold_occurrences = "ALL"
  }
}
