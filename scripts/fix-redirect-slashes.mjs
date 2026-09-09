// Post-build step (see "build" in package.json): make every 301 redirect that
// Astro emitted into the Vercel Build Output config accept an optional trailing
// slash. Astro normalises redirect sources to `^/old-url$`, but the previous
// WordPress site linked everything as `/old-url/`, and those are the URLs
// Google and third parties still hold.
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../.vercel/output/config.json', import.meta.url);
const config = JSON.parse(readFileSync(file, 'utf8'));

let patched = 0;
for (const route of config.routes ?? []) {
  if (route.status !== 301 || typeof route.src !== 'string') continue;
  const m = route.src.match(/^\^(\/[^$?]+?)\/?\$$/);
  if (!m) continue;
  route.src = `^${m[1]}/?$`;
  patched++;
}

writeFileSync(file, JSON.stringify(config, null, 2));
console.log(`[fix-redirect-slashes] ${patched} redirect rule(s) now accept a trailing slash`);
