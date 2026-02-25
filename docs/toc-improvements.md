# TOC Sidebar — Future Improvements

## Replace `<h2>` with `<span>` in TOC heading

**File:** `src/_includes/layouts/post.njk`

**Current markup:**
```html
<aside class="toc-sidebar" aria-label="Table of contents">
  <nav>
    <h2 class="toc-heading">On this page</h2>
    {{ tocContent | safe }}
  </nav>
</aside>
```

**Problem:** The `<h2>` appears in the document's heading outline alongside the article's actual `<h2>` headings. The TOC is navigational — "On this page" is a visual label, not a content section heading. Screen reader users navigating by headings will encounter it mixed in with article headings.

**Proposed fix:** Replace `<h2>` with a `<span>`. The `aria-label` on the `<aside>` already provides the accessible name for the landmark.

```html
<aside class="toc-sidebar" aria-label="Table of contents">
  <nav>
    <span class="toc-heading">On this page</span>
    {{ tocContent | safe }}
  </nav>
</aside>
```

No CSS changes needed — `.toc-heading` styles are element-agnostic.
