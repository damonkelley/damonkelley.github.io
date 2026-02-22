# damonkelley.com

Personal website and blog. Built with [Eleventy](https://www.11ty.dev/) v3, deployed to [Netlify](https://www.netlify.com/).

## Development

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # Build to ./_site/
```

## Content

- **Articles** (`src/blog/`) — Long-form posts organized by `year/month/day/` directory structure
- **Notes** (`src/notes/`) — Short-form micro-posts, named by datetime

Both are written in Markdown with YAML frontmatter. Managed via [Pages CMS](https://pagescms.org/) (configured in `.pages.yml`).

## IndieWeb

- [Microformats2](https://microformats.org/) markup (`h-entry`, `h-card`, `h-feed`)
- Webmentions received via [webmention.io](https://webmention.io/) and displayed on each post
- [Bridgy Fed](https://fed.brid.gy/) bridges the site to the fediverse and Bluesky (webmention-only mode)
- WebFinger/host-meta proxied through Netlify redirects in `netlify.toml`

## Social Metadata

- OpenGraph and Twitter Card meta tags on all pages
- Default OG image (`public/images/og-default.png`) used when no `heroImage` is set
- `p-summary` on articles and notes for clean Bridgy Fed/Bluesky display
