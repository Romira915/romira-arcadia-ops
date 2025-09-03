terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.100"
    }
  }

  backend "s3" {
    bucket  = "terraform-backend"
    key     = "aws/RaidHawk/terraform.tfstate"
    profile = "oci_s3"
    region  = "ap-tokyo-1"
    endpoints = {
      s3 = "https://nr7eduszgfzb.compat.objectstorage.ap-tokyo-1.oraclecloud.com"
    }
    skip_region_validation      = true
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_requesting_account_id  = true
    force_path_style            = true
    skip_s3_checksum            = true
  }
}
