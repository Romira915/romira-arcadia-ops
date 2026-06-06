resource "cloudflare_dns_record" "blog" {
  name    = "blog"
  content = data.terraform_remote_state.tokyo_always_free.outputs.ampere_public_ip
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
}

resource "cloudflare_dns_record" "dev-site" {
  name    = "dev-site"
  content = data.terraform_remote_state.tokyo_always_free.outputs.ampere_public_ip
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
  comment = "開発用のサイト"
}

resource "cloudflare_dns_record" "oci-ampere" {
  name    = "oci-ampere"
  content = data.terraform_remote_state.tokyo_always_free.outputs.ampere_public_ip
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = false
}

resource "cloudflare_dns_record" "oci-e2-1-micro" {
  name    = "oci-e2-1-micro"
  content = data.terraform_remote_state.tokyo_always_free.outputs.e2-1-micro-01-public_ip
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = false
}

resource "cloudflare_dns_record" "vaultwarden" {
  name    = "vaultwarden"
  content = data.terraform_remote_state.tokyo_always_free.outputs.ampere_public_ip
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
}

resource "cloudflare_dns_record" "_5922315cc2292383243deff9301b2cb9_blog" {
  name    = "_5922315cc2292383243deff9301b2cb9.blog"
  content = "_ee71a08cd30b86aa7ff3a2a72599526d.xyscsmcmgv.acm-validations.aws"
  type    = "CNAME"
  zone_id = local.zone_id
  ttl     = 1
  proxied = false
}

resource "cloudflare_dns_record" "atproto" {
  name    = "_atproto"
  content = "did=did:plc:olexjetrerhh33nxps5t6rfk"
  type    = "TXT"
  zone_id = local.zone_id
  ttl     = 1
}

resource "cloudflare_dns_record" "blog_TXT" {
  name    = "blog"
  content = "google-site-verification=InZeDXEu17AyByzP_Vu3tQM2yG4IbOUrebPdZTRoQkc"
  type    = "TXT"
  zone_id = local.zone_id
  ttl     = 1
}

resource "cloudflare_dns_record" "wakaba_cloud_A" {
  name    = "wakaba.cloud"
  content = "223.132.3.241"
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = false
}

# resource "cloudflare_dns_record" "wakaba_cloud_AAAA" {
#   name    = "wakaba.cloud"
#   content = "240d:1a:fb7:6900:a916:e195:7e64:7152"
#   type    = "AAAA"
#   zone_id = local.zone_id
#   ttl     = 1
#   proxied = false
# }

resource "cloudflare_dns_record" "wakaba_vpn_A" {
  name    = "wakaba.vpn"
  content = "223.132.3.241"
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = false
}

# resource "cloudflare_dns_record" "wakaba_vpn_AAAA" {
#   name    = "wakaba.vpn"
#   content = "240d:1a:fb7:6900:a916:e195:7e64:7152"
#   type    = "AAAA"
#   zone_id = local.zone_id
#   ttl     = 1
#   proxied = false
# }

resource "cloudflare_dns_record" "api_wakaba_game_A" {
  name    = "api.wakaba.game"
  content = "223.132.3.241"
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = false
}

resource "cloudflare_dns_record" "librechat_A" {
  name    = "librechat"
  content = data.terraform_remote_state.tokyo_always_free.outputs.ampere_public_ip
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
}

resource "cloudflare_dns_record" "obsidian_sync_A" {
  name    = "obsidian-sync"
  content = data.terraform_remote_state.tokyo_always_free.outputs.ampere_public_ip
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = false
}

# --- 以下、Terraform 未管理だったレコード (imported) ---

resource "cloudflare_dns_record" "opencode" {
  name    = "opencode"
  content = "138.2.19.89"
  type    = "A"
  zone_id = local.zone_id
  ttl     = 1
  proxied = false
  comment = "opencode in openchamber"
}

resource "cloudflare_dns_record" "astro" {
  name    = "astro"
  content = "astro-cloudflare-sandbox.pages.dev"
  type    = "CNAME"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
}

resource "cloudflare_dns_record" "cdn_blog" {
  name    = "cdn.blog"
  content = "public.r2.dev"
  type    = "CNAME"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
}

resource "cloudflare_dns_record" "cloud_hinokuni" {
  name    = "cloud-hinokuni"
  content = "5181ba52-9a6d-4472-9445-16ff3be3d0b8.cfargotunnel.com"
  type    = "CNAME"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
}

resource "cloudflare_dns_record" "files_misskey" {
  name    = "files.misskey"
  content = "public.r2.dev"
  type    = "CNAME"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
}

resource "cloudflare_dns_record" "public_comiketer" {
  name    = "public.comiketer"
  content = "public.r2.dev"
  type    = "CNAME"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
}

resource "cloudflare_dns_record" "mx_route1" {
  name     = "@"
  content  = "route1.mx.cloudflare.net"
  type     = "MX"
  zone_id  = local.zone_id
  ttl      = 1
  priority = 54
}

resource "cloudflare_dns_record" "mx_route2" {
  name     = "@"
  content  = "route2.mx.cloudflare.net"
  type     = "MX"
  zone_id  = local.zone_id
  ttl      = 1
  priority = 79
}

resource "cloudflare_dns_record" "mx_route3" {
  name     = "@"
  content  = "route3.mx.cloudflare.net"
  type     = "MX"
  zone_id  = local.zone_id
  ttl      = 1
  priority = 44
}

resource "cloudflare_dns_record" "spf" {
  name    = "@"
  content = "v=spf1 include:_spf.mx.cloudflare.net ~all"
  type    = "TXT"
  zone_id = local.zone_id
  ttl     = 1
}

resource "cloudflare_dns_record" "dmarc" {
  name    = "_dmarc"
  content = "\"v=DMARC1;  p=none; rua=mailto:0d96724bef164d0eb8e53d9a7a87659c@dmarc-reports.cloudflare.net\""
  type    = "TXT"
  zone_id = local.zone_id
  ttl     = 1
}

resource "cloudflare_dns_record" "cf2024_domainkey" {
  name    = "cf2024-1._domainkey"
  content = "\"v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiweykoi+o48IOGuP7GR3X0MOExCUDY/BCRHoWBnh3rChl7WhdyCxW3jgq1daEjPPqoi7sJvdg5hEQVsgVRQP4DcnQDVjGMbASQtrY4WmB1VebF+RPJB2ECPsEDTpeiI5ZyUAwJaVX7r6bznU67g7LvFq35yIo4sdlmtZGV+i0H4cpYH9+3JJ78k\" \"m4KXwaf9xUJCWF6nxeD+qG6Fyruw1Qlbds2r85U9dkNDVAS3gioCvELryh1TxKGiVTkg4wqHTyHfWsp7KD3WQHYJn0RyfJJu6YEmL77zonn7p2SRMvTMP3ZEXibnC9gz3nnhR6wcYL8Q7zXypKTMD58bTixDSJwIDAQAB\""
  type    = "TXT"
  zone_id = local.zone_id
  ttl     = 1
}

resource "cloudflare_dns_record" "frontend_comiketer" {
  name    = "frontend.comiketer"
  content = "100::"
  type    = "AAAA"
  zone_id = local.zone_id
  ttl     = 1
  proxied = true
}
