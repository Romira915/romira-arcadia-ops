#!/bin/bash

PATH=/usr/local/sbin:/usr/bin:/bin

if [ -z $ARCHIVE_DIR ]; then
  echo 'Please set the "ARCHIVE_DIR" environment variable and try again.' >&2
  exit -1
fi

if [ -z $TARGET_DIR ]; then
  echo 'Please set the "TARGET_DIR" environment variable and try again.' >&2
  exit -1
fi

# 今日の日付
DATE=$(/bin/date '+%Y%m%d')

# バックアップ後のファイル名
BACKUP_FILE_NAME=backup-$DATE.tar.bz2

# 削除する日付
# touch -m -d $(/bin/date -d '-7 day' +%Y%m%d) /tmp/wpbk-$BACKUP_ID

# バックアップ処理
tar -C "$(dirname $TARGET_DIR)" -cjf "./$BACKUP_FILE_NAME" "$(basename $TARGET_DIR)"
mv $BACKUP_FILE_NAME $ARCHIVE_DIR

# 古いバックアップを削除
find $ARCHIVE_DIR -mtime +7 -name "*tar.bz2" | xargs rm -f
