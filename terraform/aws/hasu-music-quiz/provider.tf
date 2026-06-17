provider "aws" {
  region  = local.region
  profile = local.aws_profile

  default_tags {
    tags = local.common_tags
  }
}
