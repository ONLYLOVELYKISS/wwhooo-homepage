// Post-build step: turn the single Vite entry into real per-route, per-language
// HTML files, and generate sitemap.xml from the same metadata the client router
// uses.
//
// Why: with one shared index.html every route advertised `canonical: /` and the
// homepage <title>, so sub-pages were telling search engines they were
// duplicates. Real files also let Nginx serve them directly (a plain
// `try_files $uri $uri/ =404`), which is what removed the GitHub Pages 404
// redirect. With two language trees it additionally makes the English content
// indexable, which a localStorage-only language switch never could.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  HTML_LANG,
  LANGS,
  OG_LOCALE,
  ROUTE_DEFS,
  SITE_URL,
  alternatesFor,
} from '../src/meta.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Replace exactly once, or fail loudly — a silently skipped head tag is worse. */
function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`build-routes: could not find ${label} in dist/index.html`);
  }
  return html.replace(pattern, replacement);
}

const setHtmlLang = (html, tag) => replaceOnce(html, /(<html lang=")[^"]*(")/, `$1${tag}$2`, 'html lang');

const setTitle = (html, title) =>
  replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`, 'title');

const setMeta = (html, attr, key, content) =>
  replaceOnce(
    html,
    new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`),
    `$1${escapeHtml(content)}$2`,
    `meta ${attr}="${key}"`,
  );

const setLink = (html, rel, href) =>
  replaceOnce(
    html,
    new RegExp(`(<link\\s+rel="${rel}"\\s+href=")[^"]*(")`),
    `$1${escapeHtml(href)}$2`,
    `link rel="${rel}"`,
  );

const setAlternate = (html, hreflang, href) =>
  replaceOnce(
    html,
    new RegExp(`(<link\\s+rel="alternate"\\s+hreflang="${hreflang}"\\s+href=")[^"]*(")`),
    `$1${escapeHtml(href)}$2`,
    `alternate hreflang="${hreflang}"`,
  );

/** The gate image only appears on the homepage; do not preload it elsewhere. */
const removePreload = (html) =>
  html.replace(/\s*<link\s+rel="preload"[\s\S]*?>\s*(?=<!--|<script|<title)/, '\n    ');

const shell = await readFile(join(dist, 'index.html'), 'utf8');
const written = [];

for (const def of ROUTE_DEFS) {
  for (const lang of LANGS) {
    const path = def.path[lang];
    // The Vite build already emits the Chinese homepage as dist/index.html.
    if (path === '/') continue;

    let html = shell;
    html = setHtmlLang(html, HTML_LANG[lang]);
    html = setTitle(html, def.title[lang]);
    html = setMeta(html, 'name', 'description', def.description[lang]);
    html = setMeta(html, 'property', 'og:title', def.title[lang]);
    html = setMeta(html, 'property', 'og:description', def.description[lang]);
    html = setMeta(html, 'property', 'og:locale', OG_LOCALE[lang]);
    html = setMeta(html, 'property', 'og:url', `${SITE_URL}${path}`);
    html = setMeta(html, 'name', 'robots', def.noindex ? 'noindex, follow' : 'index, follow');
    html = setLink(html, 'canonical', `${SITE_URL}${path}`);
    for (const alt of alternatesFor(def.id)) html = setAlternate(html, alt.hreflang, alt.href);
    if (def.id !== 'home') html = removePreload(html);
    // Relative asset references would resolve one level too deep from
    // /en/engine/index.html. Vite emits absolute paths already; this is a guard.
    html = html.replace(/(src|href)="\.\//g, '$1="/');

    const target = join(dist, path.replace(/^\/|\/$/g, ''), 'index.html');
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
    written.push(target.slice(dist.length + 1).replace(/\\/g, '/'));
  }
}

const entries = [];
for (const def of ROUTE_DEFS) {
  if (def.noindex) continue;
  const alternates = alternatesFor(def.id)
    .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`)
    .join('\n');
  for (const lang of LANGS) {
    entries.push(`  <url>\n    <loc>${SITE_URL}${def.path[lang]}</loc>\n${alternates}\n  </url>`);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');

console.log(`build-routes: wrote ${written.length} route files + sitemap.xml (${entries.length} urls with hreflang alternates)`);
for (const file of written) console.log(`  dist/${file}`);
