#!/bin/bash

# 引数で受け取る
DEVICE="$1"
WEBHOOK_URL="$2"

# 引数が不足している場合にエラーメッセージを表示
if [[ -z "$DEVICE" || -z "$WEBHOOK_URL" ]]; then
    echo "Usage: $0 <device> <webhook_url>"
    exit 1
fi

# S.M.A.R.T. ヘルスステータスを取得
result=$(smartctl -H -d sat "$DEVICE" 2>&1)

# エラーがあるかチェック
if echo "$result" | grep -q "PASSED"; then
    exit 0
else
    # 異常がある場合、Discord に通知
    message="⚠️ **HDDのヘルスチェックで異常検出** ⚠️\n```\n$result\n```"
    curl -H "Content-Type: application/json" \
         -X POST \
         -d "{\"content\": \"$message\"}" \
         "$WEBHOOK_URL"
fi
