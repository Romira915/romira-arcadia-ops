#!/bin/bash

mode="off"

# 引数をチェック
while getopts "m:" opt; do
  case ${opt} in
    m )
      mode="$OPTARG"
      ;;
    \? )
      echo "Invalid option: $OPTARG" 1>&2
      exit 1
      ;;
    : )
      echo "Option -$OPTARG requires an argument." 1>&2
      exit 1
      ;;
  esac
done
shift $((OPTIND -1))

/usr/bin/curl -s https://holidays-jp.github.io/api/v1/date.json | jq -s -r '[ .[] | keys ] | flatten | unique | .[]' | grep $(date '+%Y-%m-%d') || rtcwake -m $mode -s 28800
