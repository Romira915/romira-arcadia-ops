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

| 条件 | NRQL の要点 | 既定閾値 |
|---|---|---|
| Collector run failed | `XEventAgentRun WHERE status='failed'` | 1 回以上 |
| Collector stale | `XEventAgentRun` が間隔 ×2 で 0 件 | 実行間隔の 2 倍（既定 60 分） |
| Generation failure rate | `failed / 全実行` の割合 | > 30% |
| Worker 5xx | `Log statusCode >= 500` | 5 分窓で 10 件超 |
| Candidate backlog | `latest(queuedAtEnd)` | > 50 |

閾値は `variables.tf` の変数で調整できる（`collector_interval_minutes` は cron 実行間隔に合わせる）。
