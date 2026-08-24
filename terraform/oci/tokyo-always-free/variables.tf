variable "compartment_id" {
  description = "OCID from your tenancy page"
  type        = string
  sensitive   = true
}

variable "tenancy_id" {
  description = "Budget を作成するテナンシー（ルートコンパートメント）の OCID"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "region where you have OCI tenancy"
  type        = string
  default     = "ap-tokyo-1"
}

variable "ubuntu_20_04_aarch64_2021_08_26_0" {
  description = "Canonical-Ubuntu-20.04-aarch64-2021.08.26-0"
  type        = string
  default     = "ocid1.image.oc1.ap-tokyo-1.aaaaaaaaxmfmyofygv4bmv533zrkpt5suie2cl5s5ajfx4f3dqv23c3vccpa"
}

variable "ubuntu_20_04_minimal_2021_07_19_0" {
  description = "Canonical-Ubuntu-20.04-Minimal-2021.07.19-0"
  type        = string
  default     = "ocid1.image.oc1.ap-tokyo-1.aaaaaaaaymes4ncljbztzxnf5bchyc7ag4oumbh5nwxt2wrbxfyycdngc6yq"
}

variable "ubuntu_22_04_Minimal_2023_10_15_0" {
  description = "Canonical-Ubuntu-22.04-Minimal-2023.10.15-0"
  type        = string
  default     = "ocid1.image.oc1.ap-tokyo-1.aaaaaaaaifle6j3per4xl7e4zpcdius454hud4rubcgyldrll7vj3jmguffa"
}

variable "instance_ssh_port" {
  type    = number
  default = 22
}

# For ampere
variable "rdp_port" {
  type    = number
  default = 3389
}

variable "budget_amount" {
  description = "月次予算額。OCI の顧客レートカードの通貨単位で、予算は課金を停止するハードリミットではない"
  type        = number
  default     = 1000

  validation {
    condition     = var.budget_amount >= 1
    error_message = "OCI の予算額は 1 以上で指定してください。"
  }
}

variable "budget_actual_alert_thresholds" {
  description = "実績支出に対する段階的な絶対額アラート閾値。OCI の顧客レートカードの通貨単位"
  type        = list(number)
  default     = [1, 10, 100, 300, 500, 1000]

  validation {
    condition = (
      length(var.budget_actual_alert_thresholds) > 0 &&
      length(distinct(var.budget_actual_alert_thresholds)) == length(var.budget_actual_alert_thresholds) &&
      alltrue([for threshold in var.budget_actual_alert_thresholds : threshold > 0 && threshold <= 10000])
    )
    error_message = "予算アラートの閾値は重複しない 0 より大きく 10000 以下の値で指定してください。"
  }
}

variable "budget_forecast_alert_thresholds" {
  description = "予測支出に対する段階的な絶対額アラート閾値。OCI の顧客レートカードの通貨単位"
  type        = list(number)
  default     = [1, 100, 500, 1000]

  validation {
    condition = (
      length(var.budget_forecast_alert_thresholds) > 0 &&
      length(distinct(var.budget_forecast_alert_thresholds)) == length(var.budget_forecast_alert_thresholds) &&
      alltrue([for threshold in var.budget_forecast_alert_thresholds : threshold > 0 && threshold <= 10000])
    )
    error_message = "予算アラートの閾値は重複しない 0 より大きく 10000 以下の値で指定してください。"
  }
}

variable "budget_alert_recipients" {
  description = "予算アラートの通知先メールアドレス。複数の場合はカンマ区切り"
  type        = string
  sensitive   = true
}
