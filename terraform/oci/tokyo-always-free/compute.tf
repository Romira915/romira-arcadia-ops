# For ampere
resource "oci_core_instance" "ampere_instance" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.compartment_id
  shape               = "VM.Standard.A1.Flex"

  display_name = "ampere-instance-01"

  fault_domain = "FAULT-DOMAIN-3"

  extended_metadata = {}
  freeform_tags     = {}

  state = "RUNNING"

  instance_options {
    are_legacy_imds_endpoints_disabled = false
  }
  launch_options {
    boot_volume_type                    = "PARAVIRTUALIZED"
    firmware                            = "UEFI_64"
    is_consistent_volume_naming_enabled = true
    is_pv_encryption_in_transit_enabled = false
    network_type                        = "PARAVIRTUALIZED"
    remote_data_volume_type             = "PARAVIRTUALIZED"
  }
  agent_config {
    are_all_plugins_disabled = false
    is_management_disabled   = false
    is_monitoring_disabled   = false
  }
  availability_config {
    is_live_migration_preferred = false
    recovery_action             = "RESTORE_INSTANCE"
  }
  create_vnic_details {
    assign_public_ip          = true
    subnet_id                 = oci_core_subnet.public_ampere_subnet.id
    assign_private_dns_record = false
    defined_tags = {
      "Oracle-Tags.CreatedBy"                                                               = "oracleidentitycloudservice/y.tanaka0915@gmail.com"
      "Oracle-Tags.CreatedOn"                                                               = "2022-05-02T12:54:55.749Z"
      "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
    }
    display_name           = "ampere-instance"
    freeform_tags          = {}
    hostname_label         = "ampere-instance"
    nsg_ids                = []
    private_ip             = "172.16.0.28"
    skip_source_dest_check = false
  }
  shape_config {
    ocpus         = 4
    memory_in_gbs = 24
  }
  source_details {
    source_id               = var.ubuntu_20_04_aarch64_2021_08_26_0
    boot_volume_size_in_gbs = "47"
    source_type             = "image"
  }

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }

  lifecycle {
    # create時のcloud-initを除外できなかったため無視する．
    ignore_changes = [
      metadata
    ]
  }
}

# For e2-1-micro
resource "oci_core_instance" "e2_1_micro_01_instance" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.compartment_id
  shape               = "VM.Standard.E2.1.Micro"

  display_name = "e2-1-micro-01-instance"

  extended_metadata = {}
  fault_domain      = "FAULT-DOMAIN-3"
  freeform_tags     = {}
  state             = "RUNNING"

  agent_config {
    are_all_plugins_disabled = false
    is_management_disabled   = false
    is_monitoring_disabled   = false
  }

  availability_config {
    is_live_migration_preferred = false
    recovery_action             = "RESTORE_INSTANCE"
  }

  create_vnic_details {
    assign_public_ip          = true
    subnet_id                 = oci_core_subnet.public_ampere_subnet.id
    assign_private_dns_record = true
    defined_tags = {
      "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
    }
    display_name           = "e2-1-micro-01-instance"
    freeform_tags          = {}
    hostname_label         = "e2-1-micro-01-instance"
    nsg_ids                = []
    private_ip             = "172.16.0.248"
    skip_source_dest_check = false
  }

  instance_options {
    are_legacy_imds_endpoints_disabled = false
  }

  launch_options {
    boot_volume_type                    = "PARAVIRTUALIZED"
    firmware                            = "UEFI_64"
    is_consistent_volume_naming_enabled = true
    network_type                        = "PARAVIRTUALIZED"
    remote_data_volume_type             = "PARAVIRTUALIZED"
  }

  shape_config {
    memory_in_gbs = 1
    ocpus         = 1
  }

  source_details {
    boot_volume_size_in_gbs = "50"
    boot_volume_vpus_per_gb = "10"
    source_id               = var.ubuntu_22_04_Minimal_2023_10_15_0
    source_type             = "image"
  }

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }

  metadata = {
    # "ssh_authorized_keys" = file(var.ssh_public_key_path)
    "user_data" = base64encode(join("\n", [
      "#cloud-config",
      yamlencode({
        timezone : "Asia/Tokyo",
        package_update : true,
        package_upgrade : true,
        packages : [
          "iptables-persistent",
        ],
        runcmd : [
          "curl https://github.com/Romira915.keys >> /home/ubuntu/.ssh/authorized_keys",
          format("/bin/sed -i -e \"s/#Port 22/Port %d/\" /etc/ssh/sshd_config", var.instance_ssh_port),
          format("/bin/sed -i -e \"s/-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT/-A INPUT -p tcp -m state --state NEW -m tcp --dport %d -j ACCEPT/\" /etc/iptables/rules.v4", var.instance_ssh_port),
          ["systemctl", "restart", "ssh"],
          ["systemctl", "restart", "sshd"],
          "iptables-restore < /etc/iptables/rules.v4",
        ],
      }),
      ]
    ))
  }

  lifecycle {
    # create時のcloud-initを除外できなかったため無視する．
    ignore_changes = [
      metadata
    ]
  }
}


