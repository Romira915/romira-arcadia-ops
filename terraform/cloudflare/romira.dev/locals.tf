locals {
  zone_id = data.cloudflare_zones.romira_dev.result[0].id
}
