output "bucket_name" {
  description = "Name of the GCS bucket for blog images"
  value       = google_storage_bucket.blog_images.name
}

output "service_account_email" {
  description = "Email of the blog image uploader service account"
  value       = google_service_account.blog_image_uploader.email
}

output "service_account_key" {
  description = "Service account key JSON (base64 encoded)"
  value       = google_service_account_key.blog_image_uploader_key.private_key
  sensitive   = true
}
