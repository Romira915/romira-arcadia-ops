# tokyo-always-free

This is OCI tokyo region Ampere instance

## 予算監視

`oci_budget_budget` で東京環境の月次予算を作成し、実績・予測の両方を `oci_budget_alert_rule` で段階的に監視する。予算額は OCI の顧客レートカードの通貨単位で 1000（JPY の場合は円）。OCI の1予算あたりのアラート上限10個に合わせ、実支出は 1、10、100、300、500、1000、予測は 1、100、500、1000 としている。実支出を細かくして、予測は大きな異常を拾う配分にしている。

予算は課金を停止するハードリミットではない。通知先は Git 管理しない `budget.auto.tfvars` または `TF_VAR_budget_alert_recipients` で指定する。
