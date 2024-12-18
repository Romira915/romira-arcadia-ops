terraform {
  required_providers {
    oci = {
      source  = "hashicorp/oci"
      version = "5.0.0"
    }
  }

  backend "s3" {
    bucket                      = "terraform-backend"
    key                         = "osaka-always-free/terraform.tfstate"
    profile                     = "oci_s3"
    region                      = "ap-tokyo-1"
    endpoint                    = "https://nr7eduszgfzb.compat.objectstorage.ap-tokyo-1.oraclecloud.com"
    skip_region_validation      = true
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    force_path_style            = true
  }
}
