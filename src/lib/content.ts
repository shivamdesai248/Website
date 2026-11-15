import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../../site.config';

const showDrafts = site.features.showDrafts;

export async function getExperiences() {
  return (await getCollection('experience')).sort((a, b) => a.data.order - b.data.order);
}

/** Tracks (sub-pages) of one experience, in order. Track ids look like "soar/embedded". */
export async function getTracks(experienceId?: string) {
  const all = await getCollection('tracks', (t) => !experienceId || t.id.startsWith(`${experienceId}/`));
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Published blog posts, newest first. Empty when the blog flag is off. */
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  if (!site.features.blog) return [];
  return (await getCollection('blog', (p) => showDrafts || !p.data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

/** Published design items, newest first. Empty when the design flag is off. */
export async function getDesignItems(): Promise<CollectionEntry<'design'>[]> {
  if (!site.features.design) return [];
  return (await getCollection('design', (d) => showDrafts || !d.data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export function readingTime(body = ''): string {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/** Sequential section numbers ("01", "02", …) so hidden sections leave no gap. */
export function sectionCounter() {
  let n = 0;
  return () => String(++n).padStart(2, '0');
}
