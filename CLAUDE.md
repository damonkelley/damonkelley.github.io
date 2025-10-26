# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static blog site built with Astro 5, based on the Bear Blog theme. The site features a minimal, brutalist design aesthetic with sparing use of color (mustard yellow accent).

**Site URL:** https://damonkelley.github.io

## Development Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

## Architecture

### Content Management

Blog posts are managed using Astro's Content Collections API:
- Posts live in `src/content/blog/` organized by year/month/day directory structure
- Content is written in Markdown or MDX format
- Frontmatter schema enforced via `src/content.config.ts`:
  - `title` (required)
  - `description` (required)
  - `pubDate` (required, auto-coerced to Date)
  - `updatedDate` (optional)
  - `heroImage` (optional)

### Routing

- `src/pages/index.astro` - Homepage
- `src/pages/blog/index.astro` - Blog listing page
- `src/pages/blog/[...slug].astro` - Dynamic blog post pages (uses content collections)
- `src/pages/about.astro` - About page

### Styling Architecture

**Global styles:** `src/styles/global.css` contains all base styling
- CSS custom properties defined in `:root` for color system
- Current accent color: `#D4A017` (mustard yellow) - used sparingly
- No CSS frameworks, no preprocessors, plain vanilla CSS only

**Component styles:** Scoped `<style>` blocks in `.astro` components
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/layouts/BlogPost.astro`

**Design constraints:**
- Avoid using !important
- Avoid overriding global styles
- Maintain minimal, brutalist aesthetic

### Integrations

- `@astrojs/mdx` - MDX support for blog posts
- `@astrojs/sitemap` - Automatic sitemap generation
- `@astrojs/rss` - RSS feed generation (configured in site)