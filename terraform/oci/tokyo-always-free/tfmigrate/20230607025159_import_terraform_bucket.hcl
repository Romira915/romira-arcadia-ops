migration "state" "import_terraform_bucket" {
    actions = [
        "import oci_objectstorage_bucket.terraform-backend n/nr7eduszgfzb/b/terraform-backend"
    ]
}
