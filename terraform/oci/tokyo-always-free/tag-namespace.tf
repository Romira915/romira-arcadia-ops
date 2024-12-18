resource "oci_identity_tag_namespace" "romira_tags" {
  #Required
  compartment_id = var.compartment_id
  description    = "My resource manage tags"
  name           = "Romira-Tags"
}

resource "oci_identity_tag" "always_free" {
  #Required
  description      = "Free cost resource"
  name             = "Always-Free"
  tag_namespace_id = oci_identity_tag_namespace.romira_tags.id

  validator {
    validator_type = "ENUM"
    values = [
      "true",
      "false",
    ]
  }
}
