# Personal website: plan

Source of truth for what the site should be (this repo copy supersedes `website-plan.md` in the Claude project). Update this file whenever a decision changes.

## Decisions
- **Framework:** Astro + React islands + TypeScript + Tailwind
- **Hosting:** GitHub Pages (free) via `.github/workflows/deploy.yml`. Fall back to Vercel if Pages causes problems.
  - The site is built for the root URL (`base: '/'`). The deploy workflow passes GitHub's real Pages path in `SITE_BASE`/`SITE_URL`.
  - Decision (2026-11-14): no `/Website` in the address. Rename the repo to `shivamdesai248.github.io` so it serves at `https://shivamdesai248.github.io/`, or add a custom domain.
- **Contact:** email (in `site.config.ts`) and LinkedIn. No phone number.
- **Fonts are self-hosted** via `@fontsource-variable/archivo` and `@fontsource-variable/inter-tight`.

## Visual theme
Inspiration: Lime Duo (limeduo.com), SpaceX, Anduril. Near-black, minimal, one green-lime accent. Dark mode is the default; light mode is optional.

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--bg` | `#0A0A0A` | `#F4F4F1` | Page |
| `--surface` | `#121212` | `#FFFFFF` | Cards |
| `--line` | `#262626` | `#D6D6D1` | Borders, outlined buttons |
| `--fg` | `#F2F2F2` | `#0A0A0A` | Body / headings |
| `--muted` | `#9A9A9A` | `#5C5C5C` | Secondary text, labels |
| `--accent` | `#B8F23C` | `#B8F23C` | Filled buttons (dark text on lime) |
| `--accent-ink` | `#B8F23C` | `#4F7A00` | Accent as text/icons; darker in light mode for readability |

- Fonts: name/wordmark Archivo Expanded Black (wdth 125, wght 900); headings and body Inter Tight; labels small uppercase, `0.12em` tracking.
- Buttons: pill with a round arrow badge (filled accent primary, outlined secondary).
- Section headers: plain title only (e.g. "Experience"), optional intro paragraph and "All … ↗" link on the right. No numbers, labels or taglines.
- No "open to opportunities" pill. No location clock.
- Top bar: plain at the top of the page; stays pinned while scrolling (slim solid bar on desktop, small floating menu bubble on phones — added 2026-11-14). Name left, links centre (Experience, About, plus Blog/Design when enabled), right: theme toggle (when enabled) + lime Resume pill. Mobile: name, toggle, round menu button.
- Wording: section names (headings, nav, labels) say "Experience", not "Projects". The word is fine in body text.

## Theme toggle
- Round sun/moon button beside Resume. Default dark. Choice remembered in `localStorage`.
- Inline script in `<head>` applies the saved theme before paint (no flash).
- `features.themeToggle: false` removes the button and script; site is dark only.

## Hero
- SOAR launch photo `IMG_2913.JPG`.
  - Dark mode: blue-black "night" grade, natural flame colour, faint warm glow (`src/assets/hero/launch-night.jpg`).
  - Light mode: original daylight photo, slightly desaturated (`src/assets/hero/launch-day.jpg`).
- Horizontal (≥ 701 px): text left (label, `SHIVAM / DESAI` stacked, headline, intro, buttons). Photo fills the right ~58% and bleeds off top/right/bottom; left edge fades gradually into `--bg` via multi-stop gradient overlay (no hard line); bottom fades too. Vertical caption at right edge. iPad portrait: photo ~72% wide.
- Vertical (≤ 700 px): photo full width across the top ~60% of the screen, fading into `--bg`; text below.
- Fades are gradient overlays in the background colour, not CSS masks.
- **Pending:** full-resolution original (current is 640×800) and the correct caption (currently "SOAR · Ouroboros launch", unconfirmed).
- Approved mockups: `docs/mockups/`.

## Feature flags (`site.config.ts`)
When a flag is off, its UI, home section and routes are absent from the build.

| Flag | Initial | Controls |
|---|---|---|
| `blog` | `false` | /blog, /blog/[post], home "Latest writing", nav link, related posts on experience pages |
| `design` | `false` | /design, home Design teaser, nav link |
| `themeToggle` | `true` | Light/dark toggle; off = dark only |

Blog posts and design items also support `draft: true`.

## Blog post format
See `docs/blog-post-template.md` and the example post in `src/content/blog/example-post/`.

## Site map
- **Home**
  1. Hero
  2. Experience: cards for AstroPulse, SOAR, Garmin → experience pages
  3. Design teaser (only when `design` on)
  4. About / how I work
  5. Skills
  6. Latest writing (only when `blog` on)
  7. Contact / footer
- Yukon 3D Solutions and Schulich Technical Services appear on the resume page only (removed from the home page 2026-11-14).
- **/experience/astropulse** — Hall effect thruster capstone (22 mN, 1220 s, 450 W)
- **/experience/soar** — titled "SOAR". Hub layout (2026-11-14): team photo first, intro paragraph, then two cards:
  - **/experience/soar/embedded** — Embedded engineering (flight software, avionics architecture, hardware testing)
  - **/experience/soar/mechanical** — Mechanical engineering (avionics bays, RWS, battery packs, FEA)
  - Text on all three is a draft/placeholder from the resume; image captions need checking
- **/experience/garmin** — intern (MSS, OPT) and full-time (Sensor Core). Public-safe only.
- **/resume** — themed web page (no PDF). Data in `src/data/resume.ts`.
- **/design** — renders, posters, presentations (built, hidden at launch)
- **/blog**, **/blog/[post]** — built, hidden at launch

## Garmin full-time role
- Embedded Software Engineer 1, Garmin, July 2026 – present
- Sensor Core platform team: platform integrating low-level modules, the OS and app features so product teams can integrate easily
- Low-level board bring-up for a new product (unnamed): schematic review, SPI/I2C/UART driver integration
- Research and implementation of AI-integrated workflows; built agents and skills to automate parts of the job
- Primary firmware development in C++

## Content sources (`Documents/Website Info`, outside the repo)
- `resume.pdf`, `Final Capstone Fair Poster.pdf`
- Avionics bay and RWS renders (13200×10200 PNGs; resized copies in `src/assets/experience/`)
- `IMG_2913.JPG` (hero), HEIC photos, `MVI_0258.MOV`, `video.MP4` (not yet reviewed)
- `Shivam Desai - HET Development.pptx`, `Shivam Desai.pptx` (~110 MB each) — HET images and write-ups

## Open questions
- Which rocket/launch is in `IMG_2913`, and the full-resolution original
- Rename repo to `shivamdesai248.github.io`?
- Clean HET render without poster annotations for the AstroPulse page
