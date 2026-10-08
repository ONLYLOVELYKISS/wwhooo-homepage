// Post-build step: turn the single Vite entry into real per-route HTML files,
// and generate sitemap.xml from the same metadata the client router uses.
//
// Why: with one shared index.html every route advertised `canonical: /` and the
// homepage <title>, so /engine/ and friends were telling search engines they
// were duplicates of the homepage. Real files also mean Nginx can serve them
// directly, which is what lets us drop the GitHub Pages 404 redirect entirely.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { INDEXABLE_PATHS, ROUTE_META, ROUTE_PATHS, SITE_URL } from '../src/meta.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Replace the content of a meta tag matched by `attr="key"`. */
function setMeta(html, attr, key, content) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`build-routes: meta ${attr}="${key}" not found in dist/index.html`);
  return html.replace(pattern, `$1${escapeHtml(content)}$2`);
}

function setLink(html, rel, href) {
  const pattern = new RegExp(`(<link\\s+rel="${rel}"\\s+href=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`build-routes: link rel="${rel}" not found in dist/index.html`);
  return html.replace(pattern, `$1${escapeHtml(href)}$2`);
}

function removePreload(html) {
  // The Sakura preload only belongs on the route that actually shows the gate.
  return html.replace(/\s*<link\s+rel="preload"[\s\S]*?>\s*(?=<!--|<script|<title)/, '\n    ');
}

const shell = await readFile(join(dist, 'index.html'), 'utf8');
const written = [];

for (const path of ROUTE_PATHS) {
  const meta = ROUTE_META[path];
  if (path === '/') continue;

  const canonical = `${SITE_URL}${path}`;
  let html = shell;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title.zh)}</title>`);
  html = setMeta(html, 'name', 'description', meta.description.zh);
  html = setMeta(html, 'property', 'og:title', meta.title.zh);
  html = setMeta(html, 'property', 'og:description', meta.description.zh);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');
  html = setLink(html, 'canonical', canonical);
  html = removePreload(html);

  // Point relative asset references at the site root: /engine/index.html would
  // otherwise resolve ./assets/... one level too deep. Vite emits absolute
  // paths already, so this is a guard rather than a fix.
  html = html.replace(/(src|href)="\.\//g, '$1="/');

  const target = join(dist, path.replace(/^\/|\/$/g, ''), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  written.push(target.slice(dist.length + 1).replace(/\\/g, '/'));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${INDEXABLE_PATHS.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');

console.log(`build-routes: wrote ${written.length} route files + sitemap.xml (${INDEXABLE_PATHS.length} urls)`);
for (const file of written) console.log(`  dist/${file}`);
