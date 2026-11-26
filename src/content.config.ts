import { defineCollection, type SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Gallery items: a photo (`image: ./file.jpg`) or a short looping clip
 * (`video: /videos/<folder>/<file>.mp4`, from public/; muted, plays on its own like a GIF).
 * `aspect` (e.g. "9/16") reserves the clip's space before it loads.
 */
const gallery = (image: SchemaContext['image']) =>
  z
    .array(
      z.union([
        z.object({ image: image(), alt: z.string(), caption: z.string().optional() }),
        z.object({ video: z.string(), alt: z.string(), caption: z.string().optional(), aspect: z.string().optional() }),
      ]),
    )
    .default([]);

/**
 * Optional Documents section (PDFs, decks). `file` is a path inside public/,
 * e.g. "documents/astropulse/final-design-report.pdf". See docs/DESIGN.md "Documents".
 */
const documents = z
  .array(z.object({ title: z.string(), file: z.string(), description: z.string().optional() }))
  .default([]);

const experienceSlugs = ['astropulse', 'soar', 'garmin'] as const;

/** Experience pages: src/content/experience/<slug>/index.md */
const experience = defineCollection({
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/experience', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      org: z.string(),
      role: z.string(),
      period: z.string(),
      summary: z.string(),
      order: z.number(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Cover images with transparent backgrounds (CAD renders) are shown on a panel. */
      coverFit: z.enum(['cover', 'contain']).default('cover'),
      /** false = use the cover on the home card only (e.g. small source images that blur when shown large). */
      coverOnPage: z.boolean().default(true),
      stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      gallery: gallery(image),
      documents,
      /**
       * Optional wide photo shown first on the page (e.g. a team photo). Used by
       * experience pages that are split into tracks (see the `tracks` collection).
       */
      heroPhoto: image().optional(),
      heroAlt: z.string().optional(),
      /** CSS object-position for the hero photo crop, e.g. "50% 80%" to keep people in view. */
      heroPosition: z.string().default('50% 50%'),
      /**
       * Alternative to heroPhoto for product shots on white: 2–4 images shown side by side
       * on a white panel at the top of the page (e.g. Garmin). The title sits below it.
       */
      heroStrip: z.array(z.object({ image: image(), alt: z.string() })).default([]),
    }),
});

/**
 * Tracks: sub-pages of an experience, e.g. src/content/experience/soar/embedded/index.md
 * → /experience/soar/embedded. When an experience has tracks, its page shows the hero
 * photo, the intro (its Markdown body) and one card per track instead of a full write-up.
 */
const tracks = defineCollection({
  loader: glob({
    pattern: '*/*/index.{md,mdx}',
    base: './src/content/experience',
    generateId: ({ entry }) => entry.split('/').slice(0, 2).join('/'),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverFit: z.enum(['cover', 'contain']).default('cover'),
      /** false = use the cover on the card only, not as a big image at the top of the page. */
      coverOnPage: z.boolean().default(true),
      stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      gallery: gallery(image),
      documents,
    }),
});

/** Blog posts: src/content/blog/<slug>/index.md(x) — see docs/blog-post-template.md */
const blog = defineCollection({
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/blog', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        experience: z.enum(experienceSlugs).optional(),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        documents,
        draft: z.boolean().default(false),
      })
      .refine((d) => !d.cover || !!d.coverAlt, { message: 'coverAlt is required when cover is set', path: ['coverAlt'] }),
});

/** Design gallery items: src/content/design/<slug>.md */
const design = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/design' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kind: z.enum(['Render', 'Poster', 'Presentation', 'Diagram', 'Livery']),
      /** Optional position on the Design page: 1 comes first. Items without one follow, newest date first. */
      order: z.number().optional(),
      /** Optional tile shape, width/height, e.g. "1/1" or "4/3". The whole image still shows (`fit: contain`) or fills it (`cover`). */
      aspect: z
        .string()
        .regex(/^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/, 'aspect must look like "4/3"')
        .optional(),
      tools: z.array(z.string()).default([]),
      image: image(),
      alt: z.string(),
      /** Transparent renders are shown on a panel instead of cropped. */
      fit: z.enum(['cover', 'contain']).default('cover'),
      date: z.coerce.date(),
      experience: z.enum(experienceSlugs).optional(),
      /** Optional link, e.g. to a PDF of a deck in public/. */
      href: z.string().optional(),
      /** Optional looping clip in public/ (e.g. "/videos/aegis/clip.mp4"); `image` is its still frame. */
      video: z.string().optional(),
      /** Optional blog post id (folder name) with the story behind it; adds a "Read the write-up" link. */
      post: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

/** Embedded C++ hub page: src/content/cpp/index.md (intro + overview body). */
const cppHome = defineCollection({
  loader: glob({ pattern: 'index.{md,mdx}', base: './src/content/cpp' }),
  schema: z.object({
    title: z.string(),
    /** Short statement under the title, styled like the experience-page summary. */
    intro: z.string(),
    description: z.string(),
  }),
});

/** Embedded C++ topic pages: src/content/cpp/<topic>/index.md → /cpp/<topic> */
const cpp = defineCollection({
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/cpp', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z
      .object({
      title: z.string(),
      description: z.string(),
      /** Position in the topic list (1 = first). */
      order: z.number(),
      tags: z.array(z.string()).default([]),
      updated: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      documents,
      draft: z.boolean().default(false),
      /** true = also list this topic on the Blog page (and the home Blog section). Needs `date`. */
      blog: z.boolean().default(false),
      /** Date shown on the blog card and used to sort it among posts. */
      date: z.coerce.date().optional(),
    })
    .refine((d) => !d.blog || !!d.date, { message: 'date is required when blog: true', path: ['date'] })
    .refine((d) => !d.cover || !!d.coverAlt, { message: 'coverAlt is required when cover is set', path: ['coverAlt'] }),
});

export const collections = { experience, tracks, blog, design, cppHome, cpp };
