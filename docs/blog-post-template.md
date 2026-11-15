# Writing a blog post

The working example is `src/content/blog/example-post/index.md`. Copy that folder, rename it, and edit.

```
src/content/blog/
  my-new-post/          ← folder name becomes the URL: /blog/my-new-post
    index.md            ← the post (or index.mdx to use components)
    cover.jpg
    figure-1.png
```

## Header (frontmatter)

Checked on every build. A missing or wrong field stops the build with an error instead of publishing a broken post.

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | yes | text | |
| `description` | yes | text | 1–2 sentences; used on post cards and for search/social previews |
| `date` | yes | `YYYY-MM-DD` | Posts are sorted newest first |
| `updated` | no | `YYYY-MM-DD` | Shows "Updated …" |
| `tags` | no | list | Shown as small tags |
| `experience` | no | `astropulse` / `soar` / `garmin` | Links the post to that experience page; the experience page lists it under related posts |
| `cover` | no | `./image.jpg` | Shown at the top of the post and on cards |
| `coverAlt` | with `cover` | text | Image description for accessibility |
| `draft` | no | `true` / `false` | `true` = never built, even when the blog is on |

## Body

- Standard Markdown: headings, bold/italic, links, lists, quotes, tables
- Image with caption: `![alt text](./image.png "Caption")`
- Code: fenced blocks with a language, optional `title="file.cpp"`; copy button added automatically
- Callouts: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`
- Maths: `$inline$` and `$$ block $$` (KaTeX)
- Video: put the file in `public/videos/`, then `![alt](/videos/clip.mp4 "Caption")`
- Added automatically: reading time, table of contents (wide screens), previous/next links

## Publishing

1. Set `draft: false` (or remove the line).
2. Make sure `features.blog` is `true` in `site.config.ts`.
3. `npm run check`, commit, push. GitHub Actions rebuilds the site.
