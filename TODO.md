# TODO

## In Progress

- [ ] Add `u-photo` to images in notes for photo post federation
- [ ] Add `u-featured` support for article hero images
- [ ] Set up a lightweight way to test/validate microformat markup

## Backlog

### Microformats

Items from [microformats-audit.md](./docs/microformats-audit.md):

- [ ] Add `u-url` to h-card in footer (representative h-card)
- [ ] Add `u-photo` (avatar) to h-card in footer
- [ ] Support `p-category` for hashtags
- [ ] Add `u-uid` to h-entry on articles and notes
 [ ] Add proper h-card (u-url, u-photo avatar, u-featured header)

### CMS

- [ ] Try out Sveltia CMS locally (added to `public/admin/`)
- [ ] Set up authentication for production use (GitHub PAT or Netlify OAuth)
- [ ] Decide whether to keep Sveltia CMS or Pages CMS (or both)
 [x] Set default sort order for collections (date descending)
 [ ] Add about page to CMS
 [ ] Media backend?

### Syndication

- [ ] Show `u-syndication` links on posts ("Also on Bluesky / Mastodon")
  - Bridgy Fed doesn't send syndication URLs back via webmention
  - Options: query AT Protocol by DID, query ActivityPub, or add manually to frontmatter

### Publishing

 [ ] Set up scheduled posts

### Automation

 [ ] Add an agent to create PRs based on vale findings
 [ ] Add LinkedIn automation
 [ ] AI todo automation
 [ ] Note cards
 [ ] TIL category
 [ ] Favicon
 [ ] Styles
