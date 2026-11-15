/** Prefix an internal path with the site base (e.g. "/" locally). Always use this for internal links. */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
}

/** True when `current` is `path` or inside it (for nav highlighting). */
export function isActive(current: string, path: string): boolean {
  const c = current.replace(/\/$/, '');
  const p = url(path).replace(/\/$/, '');
  return c === p || c.startsWith(p + '/');
}
