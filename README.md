# Shivam Desai — personal website

Astro + React + Tailwind, deployed to GitHub Pages.

```bash
npm install        # once
npm run dev        # http://localhost:4321/
npm run check      # type check, build and content rules — run before committing
npm run check:flags  # builds with all optional features on and off
```

- Feature flags (blog, design page, light/dark toggle): `site.config.ts`
- Resume, skills and other roles: `src/data/resume.ts`
- Experience pages: `src/content/experience/<slug>/index.md`
- Blog posts: `src/content/blog/<slug>/index.md` — see `docs/blog-post-template.md`
- Design gallery: `src/content/design/*.md`

Working on the site with Claude Code? Start with `CLAUDE.md`, then `docs/PROGRESS.md`.

## Publishing

Pushing to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).
One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
