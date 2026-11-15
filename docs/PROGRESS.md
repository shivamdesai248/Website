# Progress

Tick items as they're done and add a dated note at the end of each phase. A new session should read this file after `CLAUDE.md` and continue from the first unticked item.

## Phase 1 — Project setup ✅
- [x] Astro 7 + React + TypeScript + Tailwind 4, self-hosted fonts
- [x] `site.config.ts` with feature flags (`blog`, `design`, `themeToggle`, `showDrafts`) and env overrides
- [x] Optional routes controlled by flag via `getStaticPaths` (`src/pages/blog/[...slug].astro`, `src/pages/design/[...index].astro`); changed 2026-11-14 so toggling works live in dev
- [x] Markdown plugins configured with `unified()` from `@astrojs/markdown-remark` (Astro 7 API)
- [x] GitHub Pages workflow written (`.github/workflows/deploy.yml`) — see Phase 8, needs adding to the repo by hand; site builds for the root URL, workflow passes the Pages path
- [x] Checks: `npm run check` (types, build, banned words, nav/route consistency, no hard-coded colours) and `npm run check:flags`

## Phase 2 — Theme and top bar ✅
- [x] Tokens for dark and light in `src/styles/global.css`
- [x] Theme toggle (React), saved in localStorage, no-flash head script, dark default
- [x] Top bar: wordmark, links, toggle, Resume pill; mobile menu sheet

## Phase 3 — Hero ✅
- [x] Photo bleeds right/top/bottom, multi-stop left fade, bottom fade; phone layout photo-on-top
- [x] Night grade (dark) and daylight photo (light)
- [ ] **Needs Shivam:** full-resolution `IMG_2913` — regrade night/day versions into `src/assets/hero/`
- [ ] **Needs Shivam:** confirm caption text in `src/components/Hero.astro` (currently "SOAR · Ouroboros launch")

## Phase 4 — Home sections ✅
- [x] Experience cards, Design teaser (flag), About / how I work, Skills, Latest posts (flag), Contact
- [x] Removed the "Other experience" section from the home page (2026-11-14); those roles stay on /resume
- [x] Section numbers computed
- [ ] **Needs Shivam:** rewrite the About intro and the four principles in `src/pages/index.astro` in his own words (current text is a draft)

## Phase 5 — Experience pages ✅
- [x] Content collection + `/experience/[slug]` with stats strip, cover, tags, prose, gallery, related posts, next link
- [x] AstroPulse, SOAR, Garmin written from the resume, poster and Garmin notes
- [ ] **Needs Shivam:** review all three for accuracy and public-safety (especially Garmin)
- [x] Clean HET render for the AstroPulse cover and home card (`Group 142.png`, 2026-11-14)
- [ ] Add photos: review the HEIC photos and videos in `Website Info`, convert the good ones (HEIC → JPG) into the experience folders and galleries
- [ ] Pull images and write-up material from `Shivam Desai - HET Development.pptx` and `Shivam Desai.pptx`

## Phase 5b — SOAR hub (2026-11-14) ✅
- [x] SOAR card renamed to "SOAR"; page is a hub: team photo (`Picture36.jpg`), intro, cards for Embedded and Mechanical engineering
- [x] Track pages `/experience/soar/embedded` and `/experience/soar/mechanical` with placeholder text and images from `Website Info` (Picture1–28)
- [ ] **Needs Shivam:** rewrite the SOAR intro and both track pages; check every image caption (several are guesses, e.g. the battery pack)

## Phase 6 — Resume page ✅
- [x] `/resume` from `src/data/resume.ts`, links to experience pages, print styles
- [ ] **Needs Shivam:** check wording and the skills list (Blender added because he uses it; remove if not wanted)

## Phase 7 — Blog and Design (hidden at launch) ✅
- [x] Blog index + post page (cover, tags, experience link, TOC, reading time, prev/next), drafts excluded
- [x] Markdown: figures with captions, code with titles + copy, callouts, KaTeX maths, video, tables
- [x] Example post `src/content/blog/example-post` (draft) and `docs/blog-post-template.md`
- [x] Design page from `src/content/design/*.md` (3 items)
- [ ] **Needs Shivam:** tools used for the capstone poster (`src/content/design/capstone-poster.md`)

## Phase 8 — Launch
- [ ] Add `.github/workflows/deploy.yml` (couldn't be written remotely; the file was sent in the Claude chat on 2026-11-14 — same content as described in README)
- [ ] On GitHub: Settings → Pages → Source: **GitHub Actions**
- [ ] Rename the repo on GitHub to `shivamdesai248.github.io` so the site has no `/Website` in its address (decided 2026-11-14), and update the local remote: `git remote set-url origin https://github.com/shivamdesai248/shivamdesai248.github.io.git`
- [ ] Commit and push to `main`; confirm the site at https://shivamdesai248.github.io/
- [ ] Social preview image (`og:image`) for the home page
- [ ] Final pass at 390 / 820 / 1180 / 1440 / 1920 px in both themes; Lighthouse check

## Notes
- **2026-11-14:** Phases 1–7 built in one session from the approved plan and mockups. All checks pass (`npm run check`, `npm run check:flags`, `astro check`: 0 errors, 0 warnings). Screenshots reviewed at phone, iPad portrait, desktop and 1920 px, dark and light. Astro 7 uses a new default Markdown processor; `@astrojs/markdown-remark` is installed so the remark/rehype plugins keep working.
- Hero photo is the 640×800 copy, so it's soft on large screens until the original is supplied.
