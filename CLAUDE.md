# CLAUDE.md — Shivam Desai personal website

Read this first in every session. Then read `docs/PROGRESS.md` to see where work stands, `docs/PLAN.md` for the full spec, and **`docs/DESIGN.md` before any visual change** (colours, type, spacing, components, imagery). Approved mockups are in `docs/mockups/`.

## Stack
- Astro 7 (static output) + React islands + TypeScript + Tailwind 4 (via `@tailwindcss/vite`)
- Content: Astro content collections in `src/content/` (Markdown/MDX), schemas in `src/content.config.ts`
- Code blocks: `astro-expressive-code`; maths: `remark-math` + `rehype-katex`; callouts: `remark-github-blockquote-alert`
- Hosting: GitHub Pages via `.github/workflows/deploy.yml`. `base` is `/` locally; the deploy workflow sets `SITE_BASE`/`SITE_URL` from GitHub Pages (see `site.config.ts`). Always build internal links with `url()` from `src/lib/url.ts`, never hard-coded `/…` paths.

## Commands
- `npm run dev` — local dev server
- `npm run check` — type check + build + content rules (run before every commit)
- `npm run check:flags` — builds with every flag on and every flag off, and checks the output

## Non-negotiable rules
(Short version — the full design system is `docs/DESIGN.md`.)
1. **Colours only from the CSS variables** in `src/styles/global.css` (`--bg`, `--surface`, `--line`, `--fg`, `--muted`, `--accent`, `--accent-ink`, …). Never add new hex colours in components.
2. **One accent colour:** lime `#B8F23C`. Filled buttons use `--accent` with dark text; accent used as text or icons uses `--accent-ink`.
3. **Dark mode is the default.** Light mode exists only when `features.themeToggle` is true.
4. **Fonts:** wordmark/name = Archivo Expanded Black (`font-display` / `.wordmark`); everything else = Inter Tight. Labels are small uppercase with `0.12em` tracking (`.label`). Self-hosted via `@fontsource-variable/*`; no Google Fonts.
5. **Section names say "Experience", never "Projects"** (headings, nav links, section labels). The word is fine in body text. `npm run check` fails if a heading, nav link or label says "Projects".
6. **No "open to opportunities" pill**, no location clock.
7. **Feature flags live in `site.config.ts`** (`blog`, `design`, `themeToggle`). When a flag is off, its nav link, home section and routes must be absent from the built site, not hidden with CSS. Blog and design routes are `src/pages/blog/[...slug].astro` and `src/pages/design/[...index].astro`; their `getStaticPaths` return nothing when the flag is off (this also updates live in the dev server).
8. **Section numbers (`01 /`) are computed**, never hard-coded, so hiding a section leaves no gap.
9. **Garmin content stays public-safe.** Don't name unreleased products or internal details.
10. **Responsive:** every change must look right at 390 px (phone), 820 px (iPad portrait), 1180 px (iPad landscape), 1440 px and 1920 px.
11. Contact is email (`site.config.ts`) and LinkedIn only. No phone number.

## Where things are
- `site.config.ts` — name, email, links, feature flags, base path
- `src/styles/global.css` — design tokens, base styles, `.prose` article styles
- `src/layouts/Base.astro` — page shell, theme script, top bar, footer
- `src/components/` — UI pieces (`TopBar`, `ThemeToggle.tsx`, `MobileMenu.tsx`, `Pill`, `SectionHeader`, …)
- `src/data/resume.ts` — single source for the resume page and the home page skills
- `src/content/experience/<slug>/index.md` — AstroPulse, SOAR, Garmin pages
- `src/content/experience/<slug>/<track>/index.md` — optional sub-pages ("tracks"), e.g. SOAR → embedded, mechanical. An experience with tracks renders as a hub (hero photo, intro, track cards). HTML comments (`<!-- note -->`) in Markdown are stripped from the published page, so use them for authoring notes.
- `src/content/blog/<slug>/index.md` — blog posts (format: `docs/blog-post-template.md`)
- `src/content/design/<slug>.md` — design gallery items
- `src/components/pages/` — the blog index, blog post and design gallery page bodies, rendered by the flag-driven routes above

## Working method
- Work phase by phase from `docs/PROGRESS.md`. Tick items off and add a dated note when a phase is done.
- Run `npm run check` (and `npm run check:flags` when touching flags or routes) before committing. Commit at the end of each phase.
- Follow `docs/DESIGN.md` and run its checklist for every visual change; compare against `docs/mockups/` at the sizes above before calling visual work done.
- If something in the plan needs to change, update `docs/PLAN.md` in the same commit.
