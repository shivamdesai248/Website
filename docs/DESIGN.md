# Design rules

The visual system for the site. Every UI change must follow these rules so the theme stays consistent. If a rule needs to change, change it here first (in the same commit as the code).

Approved references: `docs/mockups/` (hero in dark and light, phone, iPad, desktop).
Inspiration: Lime Duo (limeduo.com), SpaceX, Anduril — near-black, minimal, big type, one accent.

---

## 1. Colour

All colours are CSS variables defined **only** in `src/styles/global.css`. Components never contain hex, rgb or named colours (`npm run check` fails if they do; the one exception is the `theme-color` meta tag).

| Token | Dark | Light (default) | Use for |
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
| `--accent-ink` | `#b8f23c` | `#4f7a00` | Accent as **text or icon**: arrows, link underlines, stat values, list bullets and numbered-list numbers |
| `--accent-soft` | lime 12% | dark green 10% | Faint glow behind renders |
| `--caption` | `#5e6b80` | `#8a8a86` | Vertical photo caption in the hero |
| `--warn` / `--danger` | amber / red | darker | Callout borders only |

Rules:
- **One accent colour.** No second brand colour (blue, orange, etc.). Photos and renders keep their own colours; the UI doesn't.
- Use `--accent` for fills and `--accent-ink` for text/icons. Never put lime text on a light background.
- Accent is used sparingly: one primary button per view area, small marks (numbers, arrows, dots). Never for large blocks of text or backgrounds.
- New colours need a token in both `[data-theme='dark']` and `[data-theme='light']`.

## 2. Light and dark mode

- **Light is the default.** Dark mode exists only when `features.themeToggle` is true.
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
| Section titles | Inter Tight | class `.h-display .h-section`: `clamp(28px, 3vw, 40px)`, weight 500 (Related writing, Gallery, Documents, resume Experience / Education / Skills) |
| Sidebar title | Inter Tight | class `.h-side`: 16px, weight 500, `--fg` ("On this page") |
| Code | System mono | via expressive-code / `.prose code` |

- The wordmark font is **only** for the name (hero, top bar, footer, resume header) and the 404 headline. Not for section headings.
- Weights: 400 and 500 for UI; 600 only for `<strong>` in articles; 900 only in the wordmark.
- Never use the small uppercase `.label` style as a section title. Section titles use `.h-section`; sub-headings inside a section (e.g. the SOAR groups on the resume) are 18px, weight 600, normal case. `.label` is only for small metadata: dates, file types, kinds, "Next", pager links.
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
- Intro paragraphs with nothing beside them (home section intros, experience intros and summaries, blog/design/C++ page intros, blog post descriptions) run to `--intro-w` (940px, set once in `global.css`) with `text-wrap: pretty` so no word sits alone on the last line. Article body text (`.prose`) stays at 720px for comfortable reading.
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
| Section header | `src/components/SectionHeader.astro` | Plain title only (`title`: Experience, Design, About, Blog, Contact) + optional intro paragraph (`intro`; same as the About text: `clamp(17px, 1.25vw, 19px)`, line height 1.6, `--fg`, max `--intro-w` (940px) — wider than About because no photo sits beside it) + optional "All … ↗" link. No section numbers, no label above it, no tagline as the heading. The title matches the page the section links to (Design, Blog). The home Blog section shows the Blog page's intro, taken from `src/data/intros.ts` so the text is written once. Home page sections and their order come from `homeSections` in `site.config.ts` (currently About, Experience, Blog, Contact); the top bar lists those in the same order (minus Contact), then `navExtra` (Design and C++ live only in the top bar). |
| Experience card | `src/components/ExperienceCard.astro` | Image well (4:3) + label + title + summary + up to 3 tags + lime arrow badge |
| Card (generic) | `src/components/Card.astro` | Same look as the experience card; used for experience tracks. `ExperienceCard` wraps it. |
| Experience write-up | `src/components/ExperienceDetail.astro` | Back link, header, stats strip, cover, tags + prose, gallery, related posts, next link. Used by experience pages and their tracks. |
| Experience hub | `src/pages/experience/[slug].astro` | When an experience has tracks: back link, wide hero photo (16:7, 4:3 on phones, `heroPosition` sets the crop), title + intro side by side, then a 2-column grid of track cards (1 column on phones), then the optional `gallery:` (same masonry Gallery as write-up pages; SOAR uses it for team photos), documents and related writing. |
| Photo title | `src/components/PhotoTitle.astro` | Wide photo (16:7, 20px radius) with the page's label + `<h1>` laid over the bottom-left on a dark multi-stop fade. Desktop only (> 760px); on phones the text sits below the photo in normal colours. Text over the photo uses `--on-photo` / `--on-photo-muted` and the fade uses `--overlay-rgb`, which stay dark in both themes. See "When to use the photo title" below. |
| Gallery | `src/components/Gallery.astro` | Section title (`.h-display`, `clamp(28px, 3vw, 40px)`) + masonry of photos (CSS columns, ~260px min, 16px gaps). Photos keep their own shape and fill their tile edge to edge: no glow, no padding, 14px radius, 1px `--line` border. Click opens the shared Lightbox. Items can also be short clips (`video: /videos/<folder>/<file>.mp4` plus `aspect`): same 14px radius and border, muted, looping and autoplaying like a GIF (paused with controls under reduced motion), and they don't open in the lightbox. When the gallery is taller than 1.5 screens, a floating **Skip gallery** pill (surface, `--line-strong` border, lime round ↓ icon, bottom centre; turns lime on hover) fades in while you're inside the gallery with more still below, and scrolls to just past it. |
| Lightbox | `src/components/Lightbox.astro` | One per page (in `Base.astro`). Opens over a blurred page (`--overlay-rgb` at .55 + 18px blur) with prev/next, Esc and click-outside to close. Any button with `data-lb="<group>"`, `data-full`, `data-alt` and optional `data-caption` opens it; ← → step only through buttons in the same group. |
| Resume reel | `src/components/Reel.astro` | Optional small photo strip under a Resume role (`reel:` on the role) or under a role's group (`groups[].reel`). Nothing shows when it's empty. Photos keep their own shape at a fixed height (140px, 110px on phones), 12px radius, 1px `--line` border, 10px gaps, sideways scroll with snap and no visible scrollbar. Round 34px `--surface` arrows appear only when it overflows (hidden at each end and on touch screens; lime on hover). Click opens the Lightbox, stepping through that reel only. Images go in `src/assets/resume/` (or reuse an experience page's photos) and are imported in `src/data/resume.ts`. Examples: AstroPulse (role reel) and SOAR (one reel per group). Turn all reels off with `features.resumeReels: false` in `site.config.ts`; remove one by deleting its `reel:`. |
| Documents | `src/components/Documents.astro` | Optional section after the Gallery on experience, sub-page and blog pages, set by a `documents:` list in frontmatter (`title`, `file`, optional `description`). Same title style as Gallery. Each document is a full-width link row between 1px `--line` rules: small uppercase label with the type and size (worked out at build time, e.g. `PDF · 6.1 MB`), then a large title (`clamp(24px, 3.4vw, 44px)`, weight 500) with a lime `↗`, like the "Next" link. Hover turns the title `--accent-ink` and nudges the arrow. PDFs open in a new tab; other types (e.g. `.pptx`) download. Files live in `public/documents/<page>/`; compress big PDFs first (aim for under ~15 MB). |
| Resume PDF button | `src/pages/resume.astro` | 64px circle (52px on phones) beside the name, `--line-strong` border, document-with-down-arrow icon over a small `PDF` label. Hover fills lime with `--on-accent` icon. Downloads `public/resume/shivam-desai-resume.pdf` as `Shivam-Desai-Resume.pdf`; replace that file to update it. |
| Embedded C++ pages | `CppIndex.astro`, `CppTopic.astro`, `ArticleBody.astro` | Hub at `/cpp`: label, display title, intro in the experience-summary style, "Jump to topics ↓", then the overview with the sticky "On this page" list (`ArticleBody`, same as blog posts), then a **Topics** list. Topic rows use the Documents row style with a lime two-digit number (`01`, `02`…) in a left column, a large title with lime `↗` and a muted one-line description. Topic pages use the blog-post header (back link to the hub, `Topic 02 of 06 · N min read` label, title, description, tags), the same reading layout, and a Previous/Next pager that falls back to the hub at either end. |
| Design item | `src/content/design/*.md` → `DesignGallery.astro` | Masonry like the Gallery, but filled **row-first** by a small script: items go left to right into the shortest column, so the page reads in order (CSS `columns: 3 300px` is the no-JS fallback). Order: optional `order:` number (1 first), then newest `date`. Size: optional `aspect:` (e.g. `1/1`, `4/3`) fixes the tile's shape to shrink a very tall or wide piece; with `fit: contain` the whole image still shows inside it. each piece keeps its own shape in a 14px-radius tile with a `--line` border (`fit: contain` adds 20px padding on `--surface` for transparent renders) + `Kind · Tools` label + title + links. Don't name a class `grid` here: Tailwind's `grid` utility would override the columns. Optional `video` (a short MP4 in `public/videos/`) plays as a muted loop in the tile, with `image` as its still frame (also used on the home page). Optional `post` (blog folder name) adds "Read the write-up ↗"; `href` makes the tile open a file such as a PDF. Design isn't on the home page (like C++); it's reached from the top bar. |
| Inspiration list | `DesignGallery.astro` + `src/data/inspiration.ts` | Bottom of the Design page: section title "Inspiration" + one-line intro, then compact link rows between 1px `--line` rules (18px padding): small label with the site's domain or "LinkedIn", name at `clamp(20px, 1.8vw, 24px)` weight 500 with lime `↗`, optional muted one-line note. Smaller than Documents rows so the list stays light. Opens in a new tab. |
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
- In articles, 2–3 images on one Markdown line render as a row of equal 3:4 tiles (`figure.media.row`, 12px gap, one shared caption). Use it for portrait phone photos, which are too tall on their own at full column width.
- Strip location data from phone photos (re-save without EXIF) and crop out anything personal that isn't the subject.
- All images go through `astro:assets` (`<Image>` or Markdown images) for resizing; give every image real `alt` text.
- Don't use third-party/copyrighted figures (textbook charts, other people's photos) without permission and a credit.

## Scrollbar

Thin (6px) square-edged lime scrollbar (no rounded corners) on a transparent track (`--accent` thumb, `--accent-ink` on hover), no arrow buttons, set globally in `global.css`. Keep `scrollbar-width`/`scrollbar-color` inside the Firefox-only `@supports not selector(::-webkit-scrollbar)` block: in Chrome/Edge they override the `::-webkit-scrollbar` rules and bring back square thumbs and arrows.

## 7. Motion

- Subtle only: 0.2–0.25s ease transitions on colour/border; cards lift `translateY(-3px)`; images scale to `1.02–1.03` on hover; arrow icons nudge 1–2px.
- No scroll-jacking, parallax or auto-playing animation. One exception: GIF-style clips in articles (Markdown video with `#loop`) are short, muted and looping; they pause and show controls under `prefers-reduced-motion` (script in `Base.astro`).
- Everything respects `prefers-reduced-motion` (handled globally in `global.css`).

## 8. Writing style in the UI

- Section names (headings, nav links, labels) say **"Experience"**, never "Projects" (enforced by `npm run check`). The word is fine in body text.
- **Headings are plain titles.** Home sections and section pages are headed by their name only ("Experience", "Design", "Blog", "Contact"). No numbering (`01 / …`), no small label repeating the name above the title, and no catchphrase or tagline in place of the name (not "Where I've done my best work", "Notes from the bench", "Let's build something."). Explain the section in the intro paragraph instead. Small labels are only for real information: dates, roles, reading time, file type and size.
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
