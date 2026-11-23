# Shivam Desai — personal website

My personal website, made to document the work I've done and to talk about my designs, my thought process and what I'm working on now. The design is mine; the code was written by Claude. It's built to be extremely easy to edit: I write all of the content in Markdown files, and the site turns them into the pages you see. That makes adding, editing and publishing something as simple as writing a new file.

Live at [shivamdesai248.github.io/Website](https://shivamdesai248.github.io/Website/).

## How it's built

Astro + React + Tailwind, deployed to GitHub Pages.

```bash
npm install        # once
npm run dev        # http://localhost:4321/
npm run dev:fresh  # same, but clears Astro's cache first (use after changing site code)
npm run check      # type check, build and content rules — run before committing
npm run check:flags  # builds with all optional features on and off
```

- Feature flags (blog, design page, C++ notes, light/dark toggle): `site.config.ts`
- Resume, skills and other roles: `src/data/resume.ts`
- Experience pages: `src/content/experience/<slug>/index.md`
- Blog posts: `src/content/blog/<slug>/index.md` — see `docs/blog-post-template.md`
- Design gallery: `src/content/design/*.md`
- Embedded C++ notes: `src/content/cpp/index.md` and `src/content/cpp/<topic>/index.md`

Working on the site with Claude Code? Start with `CLAUDE.md`, then `docs/PROGRESS.md`.

## Publishing

Pushing to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).
One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
