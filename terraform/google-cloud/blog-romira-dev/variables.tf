variable "project_id" {
  description = "GCP project ID"
  type        = string
  default     = "always-free-00001"
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "asia-northeast1"
}

variable "bucket_name" {
  description = "Name of the GCS bucket for blog images"
  type        = string
  default     = "blog-romira-dev-images"
}
