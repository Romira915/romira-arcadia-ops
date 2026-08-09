# tsumugu (x-event-agent) New Relic 管理

x-event-agent の New Relic ダッシュボードとアラートを Terraform で管理する。

- ダッシュボード: `dashboards/tsumugu.json`(NRQL ダッシュボード。`__ACCOUNT_ID__` プレースホルダを `var.account_id` で置換)
- アラート: `alert.tf`(ポリシー `tsumugu` 配下の NRQL アラート 5 本)
- イベント定義・NRQL の全体像: x-event-agent リポジトリ `docs/observability.md`

## 適用方法

```bash
# 認証情報（git 管理しない）
export NEW_RELIC_API_KEY=<User API key>
export TF_VAR_account_id=<account id>
export AWS_PROFILE=oci_s3   # backend（OCI S3 互換）用プロファイル

terraform init
terraform plan
terraform apply
```

`NEW_RELIC_API_KEY` が未設定の場合は `newrelic` provider が API を呼べず plan が失敗する。
backend は既存プロジェクトと同じ `terraform-backend` バケット（key = `newrelic/tsumugu/terraform.tfstate`）。

## アラート一覧

New Relic の streaming NRQL アラートはクエリ内に `SINCE` 句を持てないため、
評価窓は条件側の `threshold_duration`（継続時間）で表現している。

| 条件 | NRQL の要点 | 既定閾値 |
|---|---|---|
| Collector run failed | `XEventAgentRun WHERE status='failed'` | 1 回以上（5 分継続） |
| Collector stale | `XEventAgentRun` の count | 0 が実行間隔 ×2 継続（既定 60 分、上限 60 分） |
| Generation failure rate | `failed / 全実行` の割合 | > 30%（10 分継続） |
| Worker 5xx | `Log statusCode >= 500` | 10 件超が 5 分継続 |
| Candidate backlog | `latest(queuedAtEnd)` | > 50（10 分継続） |

閾値は `variables.tf` の変数で調整できる（`collector_interval_minutes` は cron 実行間隔に合わせる、`worker_5xx_window_minutes` は継続時間）。
