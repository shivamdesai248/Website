import { site, type NavItem } from '../../site.config';
import { url } from './url';

export interface NavLink {
  label: string;
  href: string;
}

/** Every possible top-bar link, and whether it can show right now. */
const ITEMS: Record<NavItem, { label: string; href: () => string; on: () => boolean }> = {
  about: { label: 'About', href: () => url('/#about'), on: () => site.homeSections.includes('about') },
  experience: { label: 'Experience', href: () => url('/#experience'), on: () => site.homeSections.includes('experience') },
  contact: { label: 'Contact', href: () => url('/#contact'), on: () => site.homeSections.includes('contact') },
  blog: { label: 'Blog', href: () => url('/blog'), on: () => site.features.blog },
  design: { label: 'Design', href: () => url('/design'), on: () => site.features.design },
  cpp: { label: 'C++', href: () => url('/cpp'), on: () => site.features.cpp },
};

/**
 * Top bar links: the home sections in `site.homeSections` order (minus Contact),
 * then `site.navExtra`. Duplicates and switched-off pages are skipped.
 */
export function navLinks(): NavLink[] {
  const order: NavItem[] = [...site.homeSections.filter((s) => s !== 'contact'), ...site.navExtra];
  const seen = new Set<NavItem>();
  const links: NavLink[] = [];
  for (const name of order) {
    if (seen.has(name)) continue;
    seen.add(name);
    const item = ITEMS[name];
    if (item.on()) links.push({ label: item.label, href: item.href() });
  }
  return links;
}
