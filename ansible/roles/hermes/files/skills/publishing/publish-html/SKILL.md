---
name: publish-html
description: "Publish generated HTML pages to a URL, choose private (tailnet only) or public (anyone with the link), switch visibility, update, list, or remove pages with the hermes-pages CLI."
version: 1.0.0
platforms: [linux]
metadata:
  hermes:
    tags: [HTML, Web, Publish, Share, URL]
---

# Publish HTML

Use this skill whenever the user wants a generated HTML page (report, visualization, slides, tool, etc.) viewable at a URL, or asks to share, publish, unpublish, update, or delete such a page.

Always use the `hermes-pages` CLI. Do not write into `/opt/data/workspace/html` directly, and never build a page URL yourself: report only the `url` the CLI prints.

## Visibility

| Visibility | Who can open it | URL |
|---|---|---|
| `private` | Only devices on the user's tailnet | Printed by the CLI |
| `public` | Anyone with the link (the slug is random and the site is not indexed) | Printed by the CLI |

Choose the visibility from the request:

| Request | Visibility |
|---|---|
| No visibility mentioned, or the page is for the user | `private` |
| The user explicitly says to publish it, make it public, or share it externally | `public` |
| Sharing with someone outside the tailnet is implied but not stated (for example "to send to a friend") | First check the page for personal information (email addresses, schedules, private notes, credentials, account names, internal URLs). Tell the user what you found and ask whether to publish it as `public`; publish as `private` until they confirm. |

Before any page becomes `public` (by `publish --visibility public` or `set-visibility ... public`), check it for personal information as above. If you find any, tell the user and wait for confirmation.

## Create a page

1. Build the page in a working directory such as `/opt/data/workspace/tmp/<name>/` with `index.html` at its top. Put assets (CSS, JS, images) inside the same directory and reference them with relative paths. Symbolic links are refused.
2. Make the page self-contained: inline or bundle what it needs. External CDNs may be used for scripts and styles, but a public page cannot send data to other origins (`connect-src 'self'`).
3. Publish:

   ```sh
   hermes-pages publish /opt/data/workspace/tmp/<name> --visibility private --name "<short english name>"
   ```

   `--name` becomes the readable part of the slug; use a few ASCII words.

4. Open the `url` from the output and confirm it answers 200 before replying:

   ```sh
   curl -s -o /dev/null -w '%{http_code}\n' <url>
   ```

   Both private and public URLs are reachable from this container. If it is not 200, investigate instead of sending the URL.
5. Reply with the page's purpose, its visibility, and the `url` from the output.

## Change an existing page

Find the page first; the user usually refers to it by title or by "the page you just made".

```sh
hermes-pages list
```

| Request | Command |
|---|---|
| Make it public / share it | `hermes-pages set-visibility <slug> public` |
| Make it private / stop sharing | `hermes-pages set-visibility <slug> private` |
| Replace its contents | `hermes-pages update <slug> <directory>` |
| Delete it | `hermes-pages remove <slug>` |

Changing visibility keeps the slug, so only the host part of the URL changes, and the old URL stops working immediately. After `publish`, `update` or `set-visibility`, check the new URL with `curl` as above (200) before replying. Tell the user the new URL and that the old one no longer works.

## Output and errors

Every command prints JSON (`slug`, `visibility`, `url`; `list` prints an array with `title`). On failure it prints `hermes-pages: <reason>` to stderr and exits non-zero; fix the cause (missing `index.html`, symbolic link, unknown slug) and retry rather than working around the CLI.
