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

export type FeedItem = CollectionEntry<'blog'> | CollectionEntry<'cpp'>;

/**
 * Everything listed on the Blog page: blog posts plus any C++ topics marked `blog: true`
 * (only while the C++ section is on), newest first.
 */
export async function getFeed(): Promise<FeedItem[]> {
  const posts: FeedItem[] = await getPosts();
  if (!site.features.blog) return [];
  const cpp: FeedItem[] = (await getCppTopics()).filter((t) => t.data.blog && t.data.date);
  return [...posts, ...cpp].sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0));
}

/** Published design items, newest first. Empty when the design flag is off. */
export async function getDesignItems(): Promise<CollectionEntry<'design'>[]> {
  if (!site.features.design) return [];
  // `order` first (1, 2, 3…), then anything without one, newest date first.
  return (await getCollection('design', (d) => showDrafts || !d.data.draft)).sort((a, b) => {
    const ao = a.data.order ?? Infinity;
    const bo = b.data.order ?? Infinity;
    if (ao !== bo) return ao - bo;
    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}

/** Embedded C++ topic pages, in reading order. Empty when the C++ flag is off. */
export async function getCppTopics(): Promise<CollectionEntry<'cpp'>[]> {
  if (!site.features.cpp) return [];
  return (await getCollection('cpp', (t) => showDrafts || !t.data.draft)).sort((a, b) => a.data.order - b.data.order);
}

/** The C++ hub page (src/content/cpp/index.md). */
export async function getCppHome() {
  return (await getCollection('cppHome'))[0];
}

export function readingTime(body = ''): string {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
