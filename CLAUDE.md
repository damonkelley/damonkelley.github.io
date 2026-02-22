# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Personal blog built with Eleventy (11ty) v3. Nunjucks templates. Deployed to Netlify. Uses bun as the package manager.

**Site URL:** https://damonkelley.com

## Development Commands

```bash
bun install       # Install dependencies
bun run dev       # Start dev server with live reload
bun run build     # Build production site to ./_site/
bun run preview   # Same as dev (11ty --serve)
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

- `eleventy.config.js` — Passthrough copy, RSS feed plugin, date filters, `excerpt` filter, feed collection
- `netlify.toml` — Build config, Bridgy Fed WebFinger/host-meta proxy redirects
- `.pages.yml` — Pages CMS configuration for articles and notes
- Input: `src/`, Output: `_site/`

### Static Assets

- `public/` — Passthrough copied to site root (favicon, fonts, images, OG default image)

### IndieWeb

- Microformats2: `h-entry` on articles/notes, `h-card` in footer, `h-feed` on listing pages
- Webmentions: received via webmention.io, displayed via client-side JS in `webmentions.njk`
- Bridgy Fed: `u-bridgy-fed` link in article/note templates; in webmention-only mode (new posts require sending a webmention to `https://fed.brid.gy/webmention`)
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
