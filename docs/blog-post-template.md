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
| `documents` | no | list | Optional Documents section after the post. Each item: `title`, `file` (path inside `public/`, e.g. `documents/my-post/slides.pdf`), optional `description`. PDFs open in a new tab, `.pptx` downloads |
| `draft` | no | `true` / `false` | `true` = never built, even when the blog is on |

## Body

- Standard Markdown: headings, bold/italic, links, lists, quotes, tables
- Image with caption: `![alt text](./image.png "Caption")`
- Image size: end the caption with `{width=50%}` (or a pixel width like `{width=480px}`) to shrink an image or video and centre it: `![alt](./tall.png "Caption {width=50%}")`. Use it for tall or low-resolution images. Phones always show full width
- Images side by side: put 2 or 3 images on **one line** (separated by a space). They become one row of equal tiles (portrait 3:4 crop) with their captions joined by " · "
- Code: fenced blocks with a language, optional `title="file.cpp"`; copy button added automatically
- Callouts: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`
- Maths: `$inline$` and `$$ block $$` (KaTeX)
- Video: put the file in `public/videos/`, then `![alt](/videos/clip.mp4 "Caption")`
- GIF-style clip (muted, looping, autoplays, no controls): add `#loop` → `![alt](/videos/clip.mp4#loop "Caption")`. Use a short MP4 instead of a real GIF (about a tenth of the size). Encode with e.g. `ffmpeg -i in.mov -an -vf scale=1280:-2 -c:v libx264 -preset veryfast -crf 27 -pix_fmt yuv420p -movflags +faststart out.mp4`. Visitors who prefer reduced motion get it paused with controls
- Added automatically: reading time, table of contents (wide screens), previous/next links

## Publishing

1. Set `draft: false` (or remove the line).
2. Make sure `features.blog` is `true` in `site.config.ts`.
3. `npm run check`, commit, push. GitHub Actions rebuilds the site.
