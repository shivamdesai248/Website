# Design rules

The visual system for the site. Every UI change must follow these rules so the theme stays consistent. If a rule needs to change, change it here first (in the same commit as the code).

Approved references: `docs/mockups/` (hero in dark and light, phone, iPad, desktop).
Inspiration: Lime Duo (limeduo.com), SpaceX, Anduril — near-black, minimal, big type, one accent.

---

## 1. Colour

All colours are CSS variables defined **only** in `src/styles/global.css`. Components never contain hex, rgb or named colours (`npm run check` fails if they do; the one exception is the `theme-color` meta tag).

| Token | Dark (default) | Light | Use for |
|---|---|---|---|
| `--bg` / `--bg-rgb` | `#0a0a0a` | `#f4f4f1` | Page background; `--bg-rgb` for fades `rgba(var(--bg-rgb), x)` |
| `--surface` | `#121212` | `#ffffff` | Cards, panels, figures |
| `--surface-2` | `#181818` | `#ecece8` | Image wells, inline code |
| `--line` | `#262626` | `#d6d6d1` | Hairline borders, dividers, tags |
| `--line-strong` | `#3a3a3a` | `#bdbdb7` | Outlined buttons, hover borders |
| `--fg` | `#f2f2f2` | `#0a0a0a` | Headings, primary text |
| `--fg-2` | `#cfcfcf` | `#2a2a2a` | Body copy in articles, nav links |
| `--muted` | `#9a9a9a` | `#5c5c5c` | Secondary text, labels, captions |
| `--accent` | `#b8f23c` | `#b8f23c` | **Fills only**: primary buttons, arrow badges |
| `--on-accent` | `#0a0a0a` | `#0a0a0a` | Text/icons on an `--accent` fill |
| `--accent-ink` | `#b8f23c` | `#4f7a00` | Accent as **text or icon**: section numbers, arrows, link underlines, stat values, list bullets and numbered-list numbers |
| `--accent-soft` | lime 12% | dark green 10% | Faint glow behind renders |
| `--caption` | `#5e6b80` | `#8a8a86` | Vertical photo caption in the hero |
| `--warn` / `--danger` | amber / red | darker | Callout borders only |

Rules:
- **One accent colour.** No second brand colour (blue, orange, etc.). Photos and renders keep their own colours; the UI doesn't.
- Use `--accent` for fills and `--accent-ink` for text/icons. Never put lime text on a light background.
- Accent is used sparingly: one primary button per view area, small marks (numbers, arrows, dots). Never for large blocks of text or backgrounds.
- New colours need a token in both `[data-theme='dark']` and `[data-theme='light']`.

## 2. Light and dark mode

- **Dark is the default.** Light mode only exists when `features.themeToggle` is true.
- Every component must work in both themes — check both before calling work done.
- Images that only suit one theme use `class="theme-dark-only"` / `class="theme-light-only"` (e.g. hero night/day photos).
- Fades and overlays use `--bg` / `--bg-rgb`, never black/white, so they work in both themes.
- Switching theme cross-fades the whole page in one step (View Transitions API, 0.4s). Don't add `transition` on `background`/`color` for the page or large surfaces; it makes parts change out of step (e.g. the hero photo's fade edge showing).

## 3. Typography

Fonts are self-hosted (`@fontsource-variable/*`). No Google Fonts, no other families.

| Role | Font | Style |
|---|---|---|
| Name / wordmark | Archivo Expanded Black | class `.wordmark`: `font-stretch:125%`, weight 900, uppercase, `letter-spacing:-0.02em`, `line-height:0.9` |
| Headings | Inter Tight | class `.h-display`: weight 500, `letter-spacing:-0.03em`, `line-height:1.04` |
| Body | Inter Tight | 17px (articles 18px), `line-height:1.6` (articles 1.75) |
| Labels | Inter Tight | class `.label`: 12px, weight 500, uppercase, `letter-spacing:0.12em`, `--muted` |
| Code | System mono | via expressive-code / `.prose code` |

- The wordmark font is **only** for the name (hero, top bar, footer, resume header) and the 404 headline. Not for section headings.
- Weights: 400 and 500 for UI; 600 only for `<strong>` in articles; 900 only in the wordmark.
- Sentence case for headings and buttons ("See experience", not "See Experience"). Labels are uppercase via CSS — write them in normal case in the source.
- Use `clamp()` for large type so it scales smoothly:

| Element | Size |
|---|---|
| Hero name | `clamp(56px, 9vw, 140px)` (phone: `15.5vw`) |
| Page title (experience, blog, design) | `clamp(40px, 6.4vw, 92px)` |
| Contact headline | `clamp(44px, 7vw, 104px)` |
| Section title | `clamp(32px, 4.4vw, 56px)` |
| Hero headline | `clamp(30px, 3.2vw, 46px)` |
| Card title | 22–24px |

## 4. Layout and spacing

- Content sits in `.container`: `max-width:1360px`, side padding `clamp(20px, 4vw, 56px)`.
- Home sections use `.section` (vertical padding `clamp(64px, 9vw, 128px)`).
- Article text (`.prose`) is capped at 720px; on wide screens it sits in a two-column grid with a ~260px side column (tags or table of contents).
- Gaps: 18–20px between cards; 8px between tags; 10px between buttons.
- Lists of rows (skills, resume roles) use 1px `--line` dividers top and bottom, not boxes.

**Breakpoints** (keep to these):

| Width | Behaviour |
|---|---|
| ≤ 700px | Phone: single column, hero photo on top, stacked buttons |
| ≤ 760px | Top bar collapses to name + toggle + menu button; card grids go to 1 column |
| ≤ 900px | Two-column article/about layouts go to 1 column |
| ≤ 1100px | Experience grid goes to 2 columns; hero photo widens to ~72% |

Check every change at **390, 820, 1180, 1440 and 1920px**, in both themes.

## 5. Components

Reuse these before writing new UI.

| Component | File | Notes |
|---|---|---|
| Pill button | `src/components/Pill.astro` | `variant="primary"` (lime fill) or `"secondary"` (outlined); always has the round arrow badge. Radius 999px. |
| Section header | `src/components/SectionHeader.astro` | `01 / Label` + title + optional "All … ↗" link. Numbers come from `sectionCounter()` — never hard-code them. |
| Experience card | `src/components/ExperienceCard.astro` | Image well (4:3) + label + title + summary + up to 3 tags + lime arrow badge |
| Card (generic) | `src/components/Card.astro` | Same look as the experience card; used for experience tracks. `ExperienceCard` wraps it. |
| Experience write-up | `src/components/ExperienceDetail.astro` | Back link, header, stats strip, cover, tags + prose, gallery, related posts, next link. Used by experience pages and their tracks. |
| Experience hub | `src/pages/experience/[slug].astro` | When an experience has tracks: back link, wide hero photo (16:7, 4:3 on phones, `heroPosition` sets the crop), title + intro side by side, then a 2-column grid of track cards (1 column on phones). |
| Photo title | `src/components/PhotoTitle.astro` | Wide photo (16:7, 20px radius) with the page's label + `<h1>` laid over the bottom-left on a dark multi-stop fade. Desktop only (> 760px); on phones the text sits below the photo in normal colours. Text over the photo uses `--on-photo` / `--on-photo-muted` and the fade uses `--overlay-rgb`, which stay dark in both themes. See "When to use the photo title" below. |
| Gallery | `src/components/Gallery.astro` | Section title (`.h-display`, `clamp(28px, 3vw, 40px)`) + masonry of photos (CSS columns, ~260px min, 16px gaps). Photos keep their own shape and fill their tile edge to edge: no glow, no padding, 14px radius, 1px `--line` border. Click opens a lightbox over a blurred page (`--overlay-rgb` at .55 + 18px blur) with prev/next, Esc and click-outside to close. |
| Documents | `src/components/Documents.astro` | Optional section after the Gallery on experience, sub-page and blog pages, set by a `documents:` list in frontmatter (`title`, `file`, optional `description`). Same title style as Gallery. Each document is a full-width link row between 1px `--line` rules: small uppercase label with the type and size (worked out at build time, e.g. `PDF · 6.1 MB`), then a large title (`clamp(24px, 3.4vw, 44px)`, weight 500) with a lime `↗`, like the "Next" link. Hover turns the title `--accent-ink` and nudges the arrow. PDFs open in a new tab; other types (e.g. `.pptx`) download. Files live in `public/documents/<page>/`; compress big PDFs first (aim for under ~15 MB). |
| Post card | `src/components/PostCard.astro` | Cover (16:10) + date/reading time label + title + description |
| Tag | `.tag` | 1px `--line` border, pill radius, 13px, `--fg-2` |
| Arrow link | `.link-arrow` | Text + `↗` in `--accent-ink` |
| Round icon button | `.icon-btn` (in `TopBar`) | 42px circle, 1px `--line` border |
| Top bar | `src/components/TopBar.astro` | Always fixed to the top. At the top of the page it's transparent over the hero. After scrolling: on desktop it becomes a slim bar (`rgba(var(--bg-rgb), var(--bar-alpha))` + `blur(var(--bar-blur))` + `--line` bottom border; dark .82 / 10px, light .62 / 8px so the frosted effect is visible in both); on phones (≤ 760px) it collapses to a single 48px floating menu bubble (`--surface`, `--line-strong` border) top-right. The phone menu opens as a full-screen frosted sheet (`rgba(var(--bg-rgb), .75)` + 22px blur, solid `--bg` fallback where blur isn't supported) rendered into `<body>`. Nav links, the theme/menu icon buttons and phone-menu links turn `--accent-ink` (green) on hover in dark mode. In light mode they use the signature lime `--accent` as a fill (nav links become a lime pill with dark text, icon buttons fill lime) or, for the large phone-menu links, a thick lime underline — never lime or dark-green text. Pages without a hero get a spacer so content starts below the bar. Anything `position: sticky` must use `top: var(--sticky-top)` so it sits below the bar. |

**Radii:** pills/tags 999px · experience cards and cover images 20px · cards/galleries 16px · article figures 14px · code blocks and callouts 12px.

**Borders:** always 1px solid `--line` (hover `--line-strong`). No drop shadows.

### When to use the photo title

Use it when a page opens with a strong, wide photo that *is* the subject (a team, a launch, hardware in context) and the title would otherwise be pushed below the first screen. Currently: experience pages with `heroPhoto` set (AstroPulse, SOAR).

Don't use it when:
- the photo is busy or bright across the bottom third, so the title would be hard to read even with the fade;
- the key detail of the photo (faces, medals, the rocket) sits bottom-left where the text goes; pick a different `heroPosition` crop or don't use it;
- the image is a render, diagram or screenshot (use a normal cover image instead);
- the page has no photo, or the photo is small (it blurs when shown wide).

To turn it on for an experience page, set `heroPhoto`, `heroAlt` and optionally `heroPosition` in its Markdown header. Without `heroPhoto` the page uses the normal text-first header.

## 6. Imagery

- **Photos** (hero, launch shots): full-bleed or in rounded frames; edges fade into `--bg` with multi-stop gradient overlays, never a hard line. No CSS masks for fades.
- **CAD renders with transparent backgrounds**: shown with `object-fit: contain` on a `--surface` panel with the faint `--accent-soft` radial glow (`coverFit: contain` / `fit: contain`).
- **Charts and screenshots with white backgrounds**: keep them on white (flatten transparency onto white) so axis text stays readable in dark mode.
- All images go through `astro:assets` (`<Image>` or Markdown images) for resizing; give every image real `alt` text.
- Don't use third-party/copyrighted figures (textbook charts, other people's photos) without permission and a credit.

## Scrollbar

Thin (6px) square-edged lime scrollbar (no rounded corners) on a transparent track (`--accent` thumb, `--accent-ink` on hover), no arrow buttons, set globally in `global.css`. Keep `scrollbar-width`/`scrollbar-color` inside the Firefox-only `@supports not selector(::-webkit-scrollbar)` block: in Chrome/Edge they override the `::-webkit-scrollbar` rules and bring back square thumbs and arrows.

## 7. Motion

- Subtle only: 0.2–0.25s ease transitions on colour/border; cards lift `translateY(-3px)`; images scale to `1.02–1.03` on hover; arrow icons nudge 1–2px.
- No scroll-jacking, parallax or auto-playing animation.
- Everything respects `prefers-reduced-motion` (handled globally in `global.css`).

## 8. Writing style in the UI

- Section names (headings, nav links, labels) say **"Experience"**, never "Projects" (enforced by `npm run check`). The word is fine in body text.
- Short, plain labels; sentence case; no exclamation marks.
- No "open to opportunities" pill, no location clock.
- Contact is email and LinkedIn only.

## 9. Accessibility

- Text contrast: `--fg`/`--fg-2` for body, `--muted` only for secondary text. Lime text only via `--accent-ink`.
- Visible focus ring (`:focus-visible` uses `--accent-ink`) — don't remove outlines.
- Icon-only buttons need `aria-label`; decorative icons `aria-hidden="true"`.
- One `<h1>` per page.

## Checklist for any visual change

- [ ] Colours only from tokens; accent used per §1
- [ ] Works in dark **and** light mode
- [ ] Checked at 390 / 820 / 1180 / 1440 / 1920px
- [ ] Reuses existing components and type classes
- [ ] Section names say "Experience", not "Projects"; sentence case
- [ ] `npm run check` passes (and `npm run check:flags` if flags/routes changed)
