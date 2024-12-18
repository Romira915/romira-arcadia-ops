output "ampere_public_ip" {
  value = oci_core_instance.ampere_instance.public_ip
}

output "e2-1-micro-01-public_ip" {
  value = oci_core_instance.e2_1_micro_01_instance.public_ip
}
