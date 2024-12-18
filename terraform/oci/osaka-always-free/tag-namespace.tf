resource "oci_identity_tag_namespace" "ray_tags" {
  #Required
  compartment_id = var.compartment_id
  description    = "My resource manage tags"
  name           = "Ray-Tags"
}

resource "oci_identity_tag" "always_free" {
  #Required
  description      = "Free cost resource"
  name             = "Always-Free"
  tag_namespace_id = oci_identity_tag_namespace.ray_tags.id

  validator {
    validator_type = "ENUM"
    values = [
      "true",
      "false",
    ]
  }
}
