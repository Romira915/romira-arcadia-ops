migration "state" "import_oci_objectstorage_bucket" {
    actions = [
        "import oci_objectstorage_bucket.os-bucket n/nr7eduszgfzb/b/os",
        "import oci_objectstorage_bucket.image-bucket n/nr7eduszgfzb/b/image-bucket",
    ]
}
