# 認証は環境変数で渡す（git 管理しない）:
#   NEW_RELIC_API_KEY        … User API key
#   NEW_RELIC_ACCOUNT_ID     … アカウント ID（vars でなく env でも可）
# もしくは `export TF_VAR_account_id=<ID>` で variables に注入する。
provider "newrelic" {
  account_id = var.account_id
}
