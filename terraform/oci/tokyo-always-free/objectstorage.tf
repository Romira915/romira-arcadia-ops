resource "oci_objectstorage_bucket" "terraform-backend" {
  compartment_id = var.compartment_id
  name           = "terraform-backend"
  namespace      = data.oci_objectstorage_namespace.romira_namespace.namespace

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
    "Oracle-Tags.CreatedBy"                                                               = "oracleidentitycloudservice/y.tanaka0915@gmail.com"
    "Oracle-Tags.CreatedOn"                                                               = "2021-09-05T20:16:39.183Z"
  }
}

resource "oci_objectstorage_bucket" "os-bucket" {
  compartment_id = var.compartment_id
  name           = "os"
  namespace      = data.oci_objectstorage_namespace.romira_namespace.namespace

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
    "Oracle-Tags.CreatedBy"                                                               = "oracleidentitycloudservice/y.tanaka0915@gmail.com"
    "Oracle-Tags.CreatedOn"                                                               = "2022-05-02T13:34:24.263Z"
  }
}

resource "oci_objectstorage_bucket" "image-bucket" {
  compartment_id = var.compartment_id
  name           = "image-bucket"
  namespace      = data.oci_objectstorage_namespace.romira_namespace.namespace

  access_type = "ObjectRead"

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
    "Oracle-Tags.CreatedBy"                                                               = "oracleidentitycloudservice/y.tanaka0915@gmail.com"
    "Oracle-Tags.CreatedOn"                                                               = "2021-09-13T05:47:35.884Z"
  }
}

resource "oci_objectstorage_bucket" "vaultwarden-backup" {
  compartment_id = var.compartment_id
  name           = "vaultwarden-backup"
  namespace      = data.oci_objectstorage_namespace.romira_namespace.namespace

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}

resource "oci_objectstorage_bucket" "misskey-backup" {
  compartment_id = var.compartment_id
  name           = "misskey-backup"
  namespace      = data.oci_objectstorage_namespace.romira_namespace.namespace

  defined_tags = {
    "${oci_identity_tag_namespace.romira_tags.name}.${oci_identity_tag.always_free.name}" = "${oci_identity_tag.always_free.validator[0].values[0]}"
  }
}
