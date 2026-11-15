// Builds the site with every optional feature ON, then OFF, and checks each result.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const run = (cmd, env) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } });
const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

const variants = [
  { name: 'all-on', out: '.check/on', env: { SITE_BLOG: 'true', SITE_DESIGN: 'true', SITE_CPP: 'true', SITE_THEME_TOGGLE: 'true', SITE_DRAFTS: 'true' } },
  { name: 'all-off', out: '.check/off', env: { SITE_BLOG: 'false', SITE_DESIGN: 'false', SITE_CPP: 'false', SITE_THEME_TOGGLE: 'false', SITE_DRAFTS: 'false' } },
];

for (const v of variants) {
  console.log(`\n── Building with features ${v.name} ──`);
  run(`npx astro build --outDir ${v.out}`, v.env);
  run(`node scripts/check-site.mjs ${v.out}`, v.env);
  const home = readFileSync(`${v.out}/index.html`, 'utf8');
  const on = v.name === 'all-on';
  if (existsSync(`${v.out}/blog/index.html`) !== on) fail(`${v.name}: /blog presence wrong`);
  if (existsSync(`${v.out}/blog/example-post/index.html`) !== on) fail(`${v.name}: example post presence wrong`);
  if (existsSync(`${v.out}/design/index.html`) !== on) fail(`${v.name}: /design presence wrong`);
  if (existsSync(`${v.out}/cpp/index.html`) !== on) fail(`${v.name}: /cpp presence wrong`);
  if (existsSync(`${v.out}/cpp/arm-gcc/index.html`) !== on) fail(`${v.name}: C++ topic presence wrong`);
  if (home.includes('theme-toggle') !== on) fail(`${v.name}: theme toggle presence wrong`);
  if (home.includes("localStorage.getItem('theme')") !== on) fail(`${v.name}: theme script presence wrong`);
  if (!home.includes('data-theme="dark"')) fail(`${v.name}: dark default missing`);
  console.log(`✓ ${v.name} OK`);
}
console.log('\n✓ Flag checks passed');
