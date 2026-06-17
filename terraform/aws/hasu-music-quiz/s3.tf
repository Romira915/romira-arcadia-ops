resource "aws_s3_bucket" "backend_deploy_artifacts" {
  bucket = var.backend_artifact_bucket_name
}

resource "aws_s3_bucket_public_access_block" "backend_deploy_artifacts" {
  bucket = aws_s3_bucket.backend_deploy_artifacts.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "backend_deploy_artifacts" {
  bucket = aws_s3_bucket.backend_deploy_artifacts.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "backend_deploy_artifacts" {
  bucket = aws_s3_bucket.backend_deploy_artifacts.id

  rule {
    id     = "delete-temporary-backend-artifacts"
    status = "Enabled"

    filter {
      prefix = "backend/"
    }

    expiration {
      days = 1
    }
  }
}
