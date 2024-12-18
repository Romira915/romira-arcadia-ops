resource "oci_core_instance" "ampere_instance_02" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.compartment_id
  shape               = "VM.Standard.A1.Flex"

  shape_config {
    ocpus         = 4
    memory_in_gbs = 24
  }

  source_details {
    source_id   = var.canonical_Ubuntu_22_04_Minimal_aarch64_2023_09_28_0
    source_type = "image"

    boot_volume_size_in_gbs = "100"
  }

  create_vnic_details {
    assign_public_ip = true
    subnet_id        = oci_core_subnet.public_main_subnet.id
  }

  display_name = "ampere-instance-02"
  defined_tags = {
    "${oci_identity_tag_namespace.ray_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }

  lifecycle {
    ignore_changes = [
      metadata
    ]
  }
}
