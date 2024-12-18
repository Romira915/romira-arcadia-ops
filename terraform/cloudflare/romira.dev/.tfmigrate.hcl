tfmigrate {
    migration_dir = "./tfmigrate"
    history {
        storage "s3" {
            bucket                      = "terraform-backend"
            key                         = "cloudflare/romira.dev/history.json"
            profile                     = "oci_s3"
            region                      = "ap-tokyo-1"
            endpoint                    = "https://nr7eduszgfzb.compat.objectstorage.ap-tokyo-1.oraclecloud.com"
            skip_credentials_validation = true
            skip_metadata_api_check     = true
            force_path_style            = true
        }
    }
}
