import { site } from '../../site.config';
import { url } from './url';

export interface NavLink {
  label: string;
  href: string;
}

/** Top bar links. Optional pages appear only when their feature flag is on. */
export function navLinks(): NavLink[] {
  const links: NavLink[] = [
    { label: 'Experience', href: url('/#experience') },
    { label: 'About', href: url('/#about') },
  ];
  if (site.features.design) links.push({ label: 'Design', href: url('/design') });
  if (site.features.blog) links.push({ label: 'Blog', href: url('/blog') });
  return links;
}
