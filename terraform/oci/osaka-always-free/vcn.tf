resource "oci_core_vcn" "main_vcn" {
  display_name   = "main-vcn"
  compartment_id = var.compartment_id
  cidr_blocks    = ["172.20.0.0/20"]
  dns_label      = "main"

  defined_tags = {
    "${oci_identity_tag_namespace.ray_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_internet_gateway" "internet_gateway_for_main" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main_vcn.id

  enabled      = true
  display_name = "Internet Gateway main-vcn"

  defined_tags = {
    "${oci_identity_tag_namespace.ray_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_route_table" "route_table_for_public_subnet" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main_vcn.id

  display_name = "Route Table public subnet"
  route_rules {
    network_entity_id = oci_core_internet_gateway.internet_gateway_for_main.id
    destination       = "0.0.0.0/0"
  }

  defined_tags = {
    "${oci_identity_tag_namespace.ray_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_security_list" "security_list_for_main" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main_vcn.id

  display_name = "Security List for main"
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "ssh port"
    tcp_options {
      max = 22
      min = 22
    }
  }
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "ssh port"
    tcp_options {
      max = var.ampere_ssh_port
      min = var.ampere_ssh_port
    }
  }
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "http port"
    tcp_options {
      max = 80
      min = 80
    }
  }
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "https port"
    tcp_options {
      max = 443
      min = 443
    }
  }
  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }

  defined_tags = {
    "${oci_identity_tag_namespace.ray_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_subnet" "public_main_subnet" {
  vcn_id         = oci_core_vcn.main_vcn.id
  cidr_block     = "172.20.0.0/24"
  compartment_id = var.compartment_id
  display_name   = "public main subnet"
  dns_label      = "public"
  route_table_id = oci_core_route_table.route_table_for_public_subnet.id
  security_list_ids = [
    oci_core_security_list.security_list_for_main.id
  ]

  defined_tags = {
    "${oci_identity_tag_namespace.ray_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}