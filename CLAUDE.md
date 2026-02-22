# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static blog built with Eleventy (11ty) v3. Nunjucks templates. Deployed to GitHub Pages.

**Site URL:** https://damonkelley.github.io

## Development Commands

```bash
npm run dev       # Start dev server with live reload
npm run build     # Build production site to ./_site/
npm run preview   # Same as dev (11ty --serve)
```

## Architecture

### Content

- Blog posts live in `src/blog/` organized by year/month/day directory structure
 Written in Markdown with frontmatter: `title`, `description`, `date`, `updatedDate` (optional), `heroImage` (optional), `archived` (optional)
 `src/blog/blog.11tydata.js` assigns the `post.njk` layout and `posts` tag

### Templates (Nunjucks)

- `src/_includes/base.njk` — Base HTML shell (head, header, footer)
- `src/_includes/post.njk` — Blog post layout (extends base)
- `src/index.njk` — Homepage (non-archived posts)
- `src/about.njk` — About page
- `src/archive.njk` — Archived posts
- `src/sitemap.njk` — XML sitemap

### Data

- `src/_data/metadata.json` — Site title, description, URL, author info

### Configuration

- `eleventy.config.js` — Passthrough copy (`public/` → root), RSS feed plugin, date filters
- Input: `src/`, Output: `_site/`

### Static Assets

- `public/` — Passthrough copied to site root (favicon, fonts, images)

### Deployment

- GitHub Actions workflow in `.github/workflows/deploy.yml`
- Builds with Node 22, deploys `_site/` to GitHub Pages
