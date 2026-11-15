// Content and consistency checks on a built site.
// Usage: node scripts/check-site.mjs [distDir]
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const errors = [];

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

const pages = walk(dist).filter((f) => f.endsWith('.html'));
if (pages.length === 0) errors.push(`No HTML found in ${dist}. Did the build run?`);

// 1. Banned wording: never "projects" in visible text.
for (const p of pages) {
  const text = visibleText(readFileSync(p, 'utf8'));
  const m = text.match(/.{0,40}\bprojects\b.{0,40}/i);
  if (m) errors.push(`"projects" found in ${relative(dist, p)}: …${m[0].trim()}…`);
}

// 2. Optional pages and their nav links must appear together (flag on) or not at all (flag off).
const home = existsSync(join(dist, 'index.html')) ? readFileSync(join(dist, 'index.html'), 'utf8') : '';
for (const route of ['blog', 'design']) {
  const built = existsSync(join(dist, route, 'index.html'));
  const linked = new RegExp(`href="[^"]*/${route}/?"`).test(home);
  if (built !== linked) errors.push(`/${route}: page ${built ? 'built' : 'not built'} but nav link ${linked ? 'present' : 'missing'}`);
}

// 3. No hard-coded colours outside the token file.
const srcFiles = walk('src').filter((f) => /\.(astro|tsx?|css)$/.test(f) && !f.endsWith('global.css'));
for (const f of srcFiles) {
  // The browser UI colour meta tag is allowed to repeat the dark background.
  const src = readFileSync(f, 'utf8').replace(/.*theme-color.*/g, '');
  const m = src.match(/#[0-9a-fA-F]{3,8}\b(?=[;\s,)'"])/);
  if (m) errors.push(`Hard-coded colour ${m[0]} in ${f} — use a CSS variable from global.css`);
}

if (errors.length) {
  console.error(`\n✗ Site check failed (${dist}):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ Site check passed (${pages.length} pages in ${dist})`);
