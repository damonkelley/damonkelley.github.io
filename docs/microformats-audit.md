# Microformats2 Audit for Bridgy Fed Federation

## How Bridgy Fed determines post type

Bridgy Fed uses the [Post Type Discovery algorithm](https://indieweb.org/post-type-discovery). The order matters — first match wins:

1. `u-in-reply-to` → **reply**
2. `u-repost-of` → **repost**
3. `u-like-of` → **like**
4. `u-video` → **video post**
5. **`u-photo` → photo post**
6. Has `p-name` that differs from content → **article**
7. No `p-name` (or name ≈ content) → **note**

`u-photo` at step 5 takes priority over article/note detection at steps 6-7. If you blindly add `u-photo` to every `<img>` in markdown, all articles become "photo posts" in the fediverse instead of articles.

## How each post type appears when federated

| Post type | Mastodon behavior | Bluesky behavior |
|---|---|---|
| **Article** (has `p-name`) | Shows title + link to original. NOT full text. | Shows truncated text + link embed |
| **Note** (no `p-name`) | Shows full `e-content` text | Shows full text (truncated at 300 chars) |
| **Photo** (`u-photo`) | Shows text + image as native media attachment | Shows text + embedded image |

From the Bridgy Fed docs:

> "It also understands and translates microformats2 classes like `u-photo`, `u-video`, `p-category`, and more."

> "Use `<img class="u-photo">` for the image in your post."

## Current markup inventory

### post.njk (articles)

| Property | Status | Element |
|---|---|---|
| `h-entry` | ✅ | `<article class="h-entry">` |
| `p-name` | ✅ | `<h1 class="p-name">` |
| `e-content` | ✅ | `<div class="e-content">` |
| `dt-published` | ✅ | `<time class="dt-published">` |
| `dt-updated` | ✅ | `<time class="dt-updated">` (conditional) |
| `p-summary` | ✅ | `<p class="p-summary" hidden>` |
| `u-url` | ✅ | `<a class="u-url" hidden>` |
| `p-author h-card` | ✅ | `<a class="p-author h-card" hidden>` |
| `u-bridgy-fed` | ✅ | `<a class="u-bridgy-fed" hidden>` (conditional on status + federate) |
| `u-photo` | ❌ | — |
| `u-featured` | ❌ | — (heroImage exists in frontmatter but no mf2 class) |
| `p-category` | ❌ | — |

### note.njk (notes)

| Property | Status | Element |
|---|---|---|
| `h-entry` | ✅ | `<article class="h-entry">` |
| `p-name` | ✅ absent | (correctly omitted — makes it a "note" in PTD) |
| `e-content` | ✅ | `<div class="e-content">` |
| `dt-published` | ✅ | `<time class="dt-published">` |
| `p-summary` | ✅ intentionally absent | Removed — Bridgy Fed was duplicating it alongside `e-content` on Bluesky |
| `u-url` | ✅ | `<a class="u-url" hidden>` |
| `p-author h-card` | ✅ | `<a class="p-author h-card" hidden>` |
| `u-bridgy-fed` | ✅ | `<a class="u-bridgy-fed" hidden>` (conditional) |
| `u-photo` | ❌ | — |
| `p-category` | ❌ | — |

### base.njk — h-card (footer)

```html
<footer class="h-card">
  <p>&copy; 2026 <span class="p-name">Damon Kelley</span></p>
  <nav>
    <a href="..." rel="me">GitHub</a>
    <a href="mailto:..." class="u-email" rel="me">Email</a>
  </nav>
</footer>
```

| Property | Status | Notes |
|---|---|---|
| `h-card` | ✅ | On `<footer>` |
| `p-name` | ✅ | Author name |
| `u-email` | ✅ | mailto link |
| `u-url` | ❌ missing | Required for representative h-card. Needs `<a class="u-url" href="/">` |
| `u-photo` | ❌ missing | Profile picture/avatar for Mastodon and Bluesky |
| `u-featured` | ❌ missing | Optional — becomes header/banner image on Mastodon |

Without `u-url` and `u-photo` on the h-card, Bridgy Fed falls back to OG/Twitter meta tags for profile info.

### Listing pages (index.njk, writing.njk, micro.njk, archive.njk)

All have:
- `h-feed` wrapper ✅
- `h-entry` per item ✅
- `u-url`, `dt-published` per item ✅
- `p-name` on articles, absent on notes ✅
- `p-summary` on articles ✅
- `e-content` on notes (in index.njk, micro.njk) ✅

### feed.njk (RSS/Atom)

- `u-bridgy-fed` link injected into `<content>` for federate-enabled posts ✅
- No other mf2 markup (Atom feeds don't use mf2 — this is correct)

## What's missing — recommendations

### High priority

**`u-photo` on images in notes**

Notes with images should be classified as "photo posts" for proper federation. Images would appear as native media attachments on Mastodon/Bluesky instead of inline HTML.

Do NOT add `u-photo` globally to all markdown images — it would reclassify articles as photo posts. Only add it in the note template context.

Options:
- Add `u-photo` class via markdown-it renderer only when the layout is `note.njk`
- Or post-process note content in the template to add the class

### Medium priority
~~**`p-summary` on notes**~~

Previously removed on purpose — Bridgy Fed was showing `p-summary` alongside `e-content` on Bluesky, causing duplicate text. Leave it out.

**`u-url` on h-card**

Add to the footer h-card in base.njk to make it a proper representative h-card:
```html
<a class="u-url" href="/" hidden></a>
```

**`u-photo` (avatar) on h-card**

Add a profile image to the h-card so Bridgy Fed uses it as avatar on Mastodon/Bluesky:
```html
<img class="u-photo" src="/images/profile.jpg" alt="Damon Kelley" hidden />
```

### Low priority

**`u-featured` for article hero images**

When `heroImage` is set in article frontmatter, add it as `u-featured` in post.njk. This provides a preview/banner image without reclassifying the post as a photo:
```html
{% if heroImage %}<img class="u-featured" src="{{ heroImage }}" hidden />{% endif %}
```

**`p-category` for hashtags**

Bridgy Fed translates `p-category` links into hashtags on Mastodon/Bluesky. To support this, content would need `<a class="p-category" href="...">#tag</a>` markup. This is more of a content authoring convention than a template change.

**`u-uid` on h-entry**

Not strictly required, but helps parsers deduplicate entries. Set to the post's permalink:
```html
<a class="u-uid" href="{{ page.url }}" hidden></a>
```

## Key takeaway

The `u-photo` question is nuanced:
- **Notes with images** → YES, add `u-photo`. Makes them native photo posts.
- **Articles with images** → NO, do not add `u-photo`. Use `u-featured` for hero images instead.
- Adding `u-photo` globally via the markdown renderer would break article federation.

## References

- [Bridgy Fed docs](https://fed.brid.gy/docs) — "From the web" section
- [Post Type Discovery spec](https://ptd.spec.indieweb.org/)
- [IndieWeb photo](https://indieweb.org/photo) — markup guidance
- [IndieWeb h-entry](https://indieweb.org/h-entry)
- [Representative h-card](https://microformats.org/wiki/representative-h-card-authoring)
