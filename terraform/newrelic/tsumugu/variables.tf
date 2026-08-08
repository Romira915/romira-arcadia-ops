variable "account_id" {
  description = "New Relic account ID."
  type        = string
}

variable "collector_interval_minutes" {
  description = "collector の cron 実行間隔（分）。stale 判定はこの 2 倍の間イベントが無いこと（最大 60 分）。"
  type        = number
  default     = 30
}

variable "collector_run_failed_threshold" {
  description = "超過したら critical とする、失敗した collector 実行数（0 なら 1 回でも検知）。"
  type        = number
  default     = 0
}

variable "generation_failure_rate_threshold" {
  description = "候補生成の失敗割合（%）がこれを超えたら critical。"
  type        = number
  default     = 30
}

variable "worker_5xx_threshold" {
  description = "window 内の 5xx リクエスト数がこれを超えたら critical。"
  type        = number
  default     = 10
}

variable "worker_5xx_window_minutes" {
  description = "worker 5xx が閾値超過で critical とみなす継続時間（分）。"
  type        = number
  default     = 5
}

variable "backlog_threshold" {
  description = "実行終了時点の処理待ちキュー件数（queuedAtEnd）がこれを超えたら critical。"
  type        = number
  default     = 50
}