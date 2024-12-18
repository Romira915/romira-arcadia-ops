variable "compartment_id" {
  description = "OCID from your tenancy page"
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

