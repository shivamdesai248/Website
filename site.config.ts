/**
 * Site-wide settings. Edit this file to switch features on or off.
 *
 * Flags can also be overridden at build time with environment variables
 * (used by `npm run check:flags`): SITE_BLOG, SITE_DESIGN, SITE_THEME_TOGGLE,
 * SITE_DRAFTS = "true" | "false".
 */

const env: Record<string, string | undefined> =
  (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};

function flag(name: string, fallback: boolean): boolean {
  const v = env[name];
  if (v === 'true') return true;
  if (v === 'false') return false;
  return fallback;
}

/** Sections the home page can show (see `homeSections` below). */
export type HomeSection = 'about' | 'experience' | 'design' | 'blog' | 'contact';
/** Links the top bar can show (see `navExtra` below). */
export type NavItem = HomeSection | 'cpp';

export const site = {
  name: 'Shivam Desai',
  role: 'Embedded | Mechanical | Avionics Integration',
  description:
    'Shivam Desai — embedded software engineer working across firmware, electronics and mechanical design. Garmin, SOAR hybrid rockets, and a Hall effect thruster.',
  email: 'shivamdesai2404@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shivam-desai-0458a5231/',
  github: 'https://github.com/shivamdesai04',

  /**
   * Public URL of the site, and the sub-path it is served from.
   * The site lives at the root ("/"). On GitHub the deploy workflow passes the
   * real Pages address in SITE_URL / SITE_BASE, so the build always matches
   * wherever GitHub serves it (e.g. "/Website" until the repo is renamed to
   * shivamdesai248.github.io, or "/" with a custom domain).
   */
  url: env.SITE_URL || 'https://shivamdesai248.github.io',
  base: env.SITE_BASE || '/',

  features: {
    /** Blog pages, nav link and "Latest writing" section. */
    blog: flag('SITE_BLOG', true),
    /** Design gallery page and nav link (and its home section, if listed in homeSections). */
    design: flag('SITE_DESIGN', true),
    /** Embedded C++ notes: /cpp hub, topic pages and nav link. */
    cpp: flag('SITE_CPP', false),
    /** Light/dark toggle. When false the site is the default mode only. */
    themeToggle: flag('SITE_THEME_TOGGLE', true),
    /** Include posts/items marked `draft: true` (for previewing only — keep false). */
    showDrafts: flag('SITE_DRAFTS', false),
    /** Photo reels under roles on the Resume page (set per role with `reel:` in src/data/resume.ts). */
    resumeReels: flag('SITE_RESUME_REELS', true),
  },

  /**
   * Home page sections, top to bottom. Reorder to move them; delete a name to hide it.
   * Available: 'about', 'experience', 'design', 'blog', 'contact'.
   * 'design' and 'blog' also need their feature above to be on.
   */
  homeSections: ['about', 'experience', 'blog', 'design', 'contact'] as HomeSection[],

  /**
   * Top bar order: first every section in `homeSections` above, in the same order
   * (except 'contact'), then these, in this order. Anything already shown is skipped.
   * Available: 'about', 'experience', 'design', 'blog', 'cpp', 'contact'.
   * Pages only appear when their feature is on.
   */
  navExtra: ['cpp'] as NavItem[],
} as const;

export type Site = typeof site;
  