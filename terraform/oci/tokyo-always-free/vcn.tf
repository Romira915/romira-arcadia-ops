# For ampere
resource "oci_core_vcn" "ampere_vcn" {
  display_name   = "main-vcn"
  compartment_id = var.compartment_id
  cidr_blocks    = ["172.16.0.0/20"]
  dns_label      = "ampere"

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_internet_gateway" "internet_gateway_for_ampere" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.ampere_vcn.id

  enabled      = true
  display_name = "Internet Gateway main-vcn"

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_route_table" "route_table_for_public_subnet" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.ampere_vcn.id

  display_name = "Route Table public subnet"
  route_rules {
    network_entity_id = oci_core_internet_gateway.internet_gateway_for_ampere.id
    destination       = "0.0.0.0/0"
  }

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_security_list" "security_list_for_ampere" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.ampere_vcn.id

  display_name = "Security List for main"
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "ssh port"
    tcp_options {
      max = var.instance_ssh_port
      min = var.instance_ssh_port
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
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "RDP port"
    tcp_options {
      max = var.rdp_port
      min = var.rdp_port
    }
  }
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "Minecarft port"
    tcp_options {
      max = 25565
      min = 25565
    }
  }
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "Minecarft rcon port"
    tcp_options {
      max = 25575
      min = 25575
    }
  }
  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_subnet" "public_ampere_subnet" {
  vcn_id         = oci_core_vcn.ampere_vcn.id
  cidr_block     = "172.16.0.0/24"
  compartment_id = var.compartment_id
  display_name   = "public main subnet"
  dns_label      = "public"
  route_table_id = oci_core_route_table.route_table_for_public_subnet.id
  security_list_ids = [
    oci_core_security_list.security_list_for_ampere.id
  ]

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

# For e2-1-micro
resource "oci_core_vcn" "app_vcn" {
  display_name   = "app-vcn"
  compartment_id = var.compartment_id
  cidr_blocks    = ["172.16.0.0/20"]
  dns_label      = "app"

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}


resource "oci_core_internet_gateway" "internet_gateway_for_app" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.app_vcn.id

  enabled      = true
  display_name = "Internet Gateway app_vcn"

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}


resource "oci_core_route_table" "route_table_for_app_public_subnet" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.app_vcn.id

  display_name = "Route Table public subnet"
  route_rules {
    network_entity_id = oci_core_internet_gateway.internet_gateway_for_app.id
    destination       = "0.0.0.0/0"
  }

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_security_list" "security_list_for_app" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.app_vcn.id

  display_name = "Security List for app"
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "ssh port"
    tcp_options {
      max = var.instance_ssh_port
      min = var.instance_ssh_port
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
  ingress_security_rules {
    protocol    = "6"
    source      = "0.0.0.0/0"
    description = "ssh port"
    tcp_options {
      max = 7080
      min = 7080
    }
  }
  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_core_subnet" "public_app_subnet" {
  vcn_id         = oci_core_vcn.app_vcn.id
  cidr_block     = "172.16.0.0/24"
  compartment_id = var.compartment_id
  display_name   = "public app subnet"
  dns_label      = "main"
  route_table_id = oci_core_route_table.route_table_for_app_public_subnet.id
  security_list_ids = [
    oci_core_security_list.security_list_for_app.id
  ]

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}
