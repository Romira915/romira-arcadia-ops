data "oci_identity_availability_domains" "ads" {
  compartment_id = var.compartment_id
}

data "oci_objectstorage_namespace" "ray_namespace" {
  compartment_id = var.compartment_id
}
