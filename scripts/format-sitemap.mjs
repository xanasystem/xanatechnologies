// Post-build step (see "build" in package.json): pretty-print the sitemap files
// that @astrojs/sitemap writes minified on a single line, so each <url> sits on
// its own block when someone opens them in a browser or a text editor. The XML
// is untouched otherwise; crawlers do not care about the whitespace.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirs = ['../dist/client', '../.vercel/output/static']
  .map((d) => fileURLToPath(new URL(d, import.meta.url)))
  .filter((d) => existsSync(d));

function format(xml) {
  // Split at every tag boundary, then indent by nesting depth.
  const tokens = xml.replace(/>\s*</g, '><').split(/(?=<)/);
  let depth = 0;
  const out = [];
  for (const raw of tokens) {
    const tok = raw.trim();
    if (!tok) continue;
    if (tok.startsWith('<?')) { out.push(tok); continue; }
    // Inline element: <loc>…</loc>, <lastmod>…</lastmod>
    if (/^<([\w:]+)[^>]*>[^<]*<\/\1>$/.test(tok)) { out.push('  '.repeat(depth) + tok); continue; }
    if (tok.startsWith('</')) { depth--; out.push('  '.repeat(depth) + tok); continue; }
    out.push('  '.repeat(depth) + tok);
    if (!tok.endsWith('/>')) depth++;
  }
  // Tokens like `<loc>https://…` followed by `</loc>` come split; merge them.
  return out
    .join('\n')
    .replace(/\n\s*(<\/(?:loc|lastmod|changefreq|priority)>)/g, '$1')
    .replace(/(<(loc|lastmod|changefreq|priority)>[^<\n]*)\n\s*/g, '$1') + '\n';
}

let count = 0;
for (const dir of dirs) {
  for (const name of readdirSync(dir)) {
    if (!/^sitemap.*\.xml$/.test(name)) continue;
    const file = join(dir, name);
    writeFileSync(file, format(readFileSync(file, 'utf8')));
    count++;
  }
}
console.log(`[format-sitemap] ${count} sitemap file(s) pretty-printed`);
