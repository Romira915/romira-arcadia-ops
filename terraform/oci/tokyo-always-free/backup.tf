resource "oci_core_volume_backup_policy" "ampere_daily" {
  compartment_id = var.compartment_id
  display_name   = "ampere-block-daily-1-day"

  schedules {
    backup_type = "INCREMENTAL"
    period      = "ONE_DAY"

    # データ側を長期保持するとブート3世代と合わせて無料枠5件を超えるため1日とする。
    retention_seconds = 86400
    offset_type       = "STRUCTURED"
    hour_of_day       = 20
    time_zone         = "REGIONAL_DATA_CENTER_TIME"
  }
}

resource "oci_core_volume_backup_policy" "ampere_boot_daily" {
  compartment_id = var.compartment_id
  display_name   = "ampere-boot-daily-3-days"

  schedules {
    backup_type       = "INCREMENTAL"
    period            = "ONE_DAY"
    retention_seconds = 259200
    offset_type       = "STRUCTURED"
    # データ側と同時刻に作成すると期限切れ削除待ちが重なるため時刻を分ける。
    hour_of_day = 0
    time_zone   = "REGIONAL_DATA_CENTER_TIME"
  }
}

resource "oci_core_volume_backup_policy_assignment" "ampere_boot_daily" {
  asset_id  = "ocid1.bootvolume.oc1.ap-tokyo-1.abxhiljrlz5pu2qteuzlcl46ewapbqm3euux4mohqekvfwinegakeoeqa37q"
  policy_id = oci_core_volume_backup_policy.ampere_boot_daily.id
}

resource "oci_core_volume_backup_policy_assignment" "ampere_daily" {
  asset_id  = "ocid1.volume.oc1.ap-tokyo-1.abxhiljrilil6s2nln3ljdkr4igmrrn2xgo3z3q3m75aouf5j7doefy5gs4q"
  policy_id = oci_core_volume_backup_policy.ampere_daily.id
}
