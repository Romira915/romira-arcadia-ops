import {
  to = google_storage_bucket.blog_images
  id = "blog-romira-dev-images"
}

resource "google_storage_bucket" "blog_images" {
  name     = var.bucket_name
  location = "US-WEST1"
  project  = var.project_id

  storage_class               = "STANDARD"
  uniform_bucket_level_access = true

  cors {
    origin          = ["https://blog.romira.dev", "http://localhost:3000", "http://127.0.0.1:3000"]
    method          = ["PUT", "GET", "HEAD", "OPTIONS"]
    response_header = ["Content-Type", "Content-Length"]
    max_age_seconds = 3600
  }

  labels = local.common_labels
}
