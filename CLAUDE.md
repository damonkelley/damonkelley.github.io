# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Personal blog built with Eleventy (11ty) v3. Nunjucks templates. Deployed to Netlify. Uses bun as the package manager.

**Site URL:** https://damonkelley.com

## Development Commands
```bash
bun install              # Install dependencies
bun run dev              # Start dev server with live reload
bun run build            # Build production site to ./_site/
bun run preview          # Same as dev (11ty --serve)
bun run bridge:sync      # Dry-run: show bridged posts not in RSS feed
bun run bridge:sync:send # Send delete webmentions for orphaned posts
```

## Architecture

### Content

- **Articles** live in `src/blog/` organized by `year/month/day/` directory structure
  - Markdown with frontmatter: `title`, `description`, `date` (datetime), `updatedDate` (optional), `heroImage` (optional), `archived` (optional)
  - `src/blog/blog.11tydata.js` assigns the `post.njk` layout and `articles` tag
- **Notes** live in `src/notes/` named by datetime (e.g. `2026-02-22-095737.md`)
  - Markdown with frontmatter: `date` (datetime, required)
  - No title — short-form content only
  - `src/notes/notes.11tydata.js` assigns the `note.njk` layout, `notes` tag, and auto-generates `description` via `eleventyComputed`

### Templates (Nunjucks)

- `src/_includes/base.njk` — Base HTML shell (head, header, footer, OG/Twitter meta tags)
- `src/_includes/post.njk` — Article layout (h-entry, p-summary, u-bridgy-fed, webmentions)
- `src/_includes/note.njk` — Note layout (h-entry, p-summary, u-bridgy-fed, webmentions)
- `src/_includes/webmentions.njk` — Client-side webmention fetch and display
- `src/index.njk` — Homepage (interleaved feed of all content)
- `src/writing.njk` — Articles-only listing
- `src/micro.njk` — Notes-only listing
- `src/about.njk` — About page
- `src/archive.njk` — Archived articles
- `src/sitemap.njk` — XML sitemap

### Data

- `src/_data/metadata.json` — Site title, description, URL, author info

### Configuration

- `eleventy.config.js` — Passthrough copy, RSS plugin (filters only), date filters, `excerpt` filter, feed collection
- `src/feed.njk` — Manual Atom feed template (includes `u-bridgy-fed` link in each entry's content for webmention.app discovery)
- `netlify.toml` — Build config, Bridgy Fed WebFinger/host-meta proxy redirects
- `.pages.yml` — Pages CMS configuration for articles and notes
- `scripts/bridge-sync.js` — Compares Bluesky bridged posts against RSS feed, sends delete webmentions for orphans
- Input: `src/`, Output: `_site/`

### Static Assets

- `public/` — Passthrough copied to site root (favicon, fonts, images, OG default image)

### IndieWeb / Bridgy Fed
- Microformats2: `h-entry` on articles/notes, `h-card` in footer, `h-feed` on listing pages
- Webmentions: received via webmention.io, displayed via client-side JS in `webmentions.njk`
- Bridgy Fed: bridges site to fediverse and Bluesky via webmention-only mode
  - `u-bridgy-fed` link in article/note templates (outside `e-content`, inside `h-entry` to avoid Mastodon link previews)
  - `u-bridgy-fed` link also in RSS feed `<content>` (in `src/feed.njk`) so webmention.app can discover it
  - **New posts**: automated via webmention.app Netlify webhook (deploy succeeded → scans RSS → sends webmentions)
  - **Deleted posts**: run `bun run bridge:sync:send` after deleting content and deploying (posts must return 404 first)
  - DID: `did:plc:h7u3m47syy7vkuewhms6oest`
- `p-summary`: present on articles (from `description`) and notes (from truncated content) for clean federation

### Social Metadata

- OpenGraph and Twitter Card meta tags in `base.njk` with fallback chain:
  - Title: `title` → "Note by Damon Kelley"
  - Description: `description` → `content | excerpt` → `metadata.description`
  - Image: `heroImage` → `/images/og-default.png`

### Deployment

- Netlify auto-deploys from `main` branch
- Build command: `bun run build`
- Netlify auto-detects bun when `bun.lock` is present
