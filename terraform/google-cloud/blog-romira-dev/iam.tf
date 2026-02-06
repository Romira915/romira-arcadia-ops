resource "google_service_account" "blog_image_uploader" {
  account_id   = "blog-image-uploader"
  display_name = "Blog Image Upload Service Account"
  project      = var.project_id
}

resource "google_storage_bucket_iam_member" "blog_image_uploader_admin" {
  bucket = google_storage_bucket.blog_images.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.blog_image_uploader.email}"
}

# 署名付きURLを生成するために必要
resource "google_service_account_iam_member" "blog_image_uploader_token_creator" {
  service_account_id = google_service_account.blog_image_uploader.name
  role               = "roles/iam.serviceAccountTokenCreator"
  member             = "serviceAccount:${google_service_account.blog_image_uploader.email}"
}

resource "google_service_account_key" "blog_image_uploader_key" {
  service_account_id = google_service_account.blog_image_uploader.name
}
