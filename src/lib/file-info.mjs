// Build-time helper for the Documents section: size of a file inside public/.
// Plain .mjs (like markdown-plugins.mjs) so it can use Node APIs without extra type packages.
import { statSync } from 'node:fs';
import { join } from 'node:path';

/** @param {string} rel path inside public/ @returns {number} size in bytes */
export function publicFileSize(rel) {
  try {
    return statSync(join(process.cwd(), 'public', rel)).size;
  } catch {
    throw new Error(`Documents: file not found in public/: ${rel}`);
  }
}
