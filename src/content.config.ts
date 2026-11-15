import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

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
      gallery: z
        .array(z.object({ image: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      /**
       * Optional wide photo shown first on the page (e.g. a team photo). Used by
       * experience pages that are split into tracks (see the `tracks` collection).
       */
      heroPhoto: image().optional(),
      heroAlt: z.string().optional(),
      /** CSS object-position for the hero photo crop, e.g. "50% 80%" to keep people in view. */
      heroPosition: z.string().default('50% 50%'),
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
      stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      gallery: z
        .array(z.object({ image: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
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
      kind: z.enum(['Render', 'Poster', 'Presentation', 'Diagram']),
      tools: z.array(z.string()).default([]),
      image: image(),
      alt: z.string(),
      /** Transparent renders are shown on a panel instead of cropped. */
      fit: z.enum(['cover', 'contain']).default('cover'),
      date: z.coerce.date(),
      experience: z.enum(experienceSlugs).optional(),
      /** Optional link, e.g. to a PDF of a deck in public/. */
      href: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { experience, tracks, blog, design };
