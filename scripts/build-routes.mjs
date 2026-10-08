// Post-build step: turn the single Vite entry into real per-route, per-language
// HTML files, with the page body prerendered, plus sitemap.xml from the same
// metadata the client router uses.
//
// Why prerender the body: the head alone (title, canonical, hreflang) is what
// makes each language tree indexable as a distinct page, but leaving <body> as a
// placeholder meant content still depended on JavaScript. src/views.js and its
// dependencies are deliberately free of DOM and browser APIs, so the build can
// call exactly the renderers the client does. Result: the markup, both language
// trees, no-JS visitors and crawlers all see the same HTML, with no second-wave
// render and no hydration mismatch (the client simply re-renders the same thing).

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { setContext } from '../src/context.js';
import { subsites } from '../src/data.js';
import { HTML_LANG, LANGS, OG_LOCALE, ROUTE_DEFS, SITE_URL, alternatesFor } from '../src/meta.js';
import { engine, home, profilePage, searchPage, subsite, works } from '../src/views.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const RENDERERS = {
  home,
  engine,
  profile: profilePage,
  works,
  search: searchPage,
  toy: () => subsite(subsites[0]),
  notes: () => subsite(subsites[1]),
};

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
const removePreload = (html) => html.replace(/\s*<link\s+rel="preload"[\s\S]*?>\s*(?=<!--|<script|<title)/, '\n    ');

/**
 * Stamp the container with the route/language it was prerendered for, so the
 * client router can reconcile the existing DOM on first load instead of
 * rebuilding identical markup. Left empty in the dev shell.
 */
const setStamp = (html, def, lang) =>
  replaceOnce(html, /(<div id="app" data-prerendered=")[^"]*(")/, `$1${def.id}:${lang}$2`, '#app data-prerendered');

/**
 * The boot placeholder and the prerendered page occupy the same slot. Matched
 * lazily up to the last `</div>` before the first script tag, so nesting inside
 * the placeholder cannot throw the replacement off. The classic handshake script
 * sits between `#app` and the module script, hence anchoring on `<script` rather
 * than on `<script type="module"`.
 */
const APP_BLOCK = /(<div id="app"[^>]*>)([\s\S]*?)(<\/div>\s*<script)/;

function prerenderApp(html, def, lang) {
  setContext(lang, def.id);
  const body = RENDERERS[def.id]();

  if (!APP_BLOCK.test(html)) {
    throw new Error('build-routes: could not locate the #app block in dist/index.html');
  }
  // Function replacement: the rendered body may contain `$`, which would
  // otherwise be interpreted as a capture-group reference.
  return html.replace(APP_BLOCK, (_match, open, inner, close) => {
    if (!inner.includes('boot-fallback')) {
      throw new Error('build-routes: #app block no longer contains the boot placeholder');
    }
    return `${open}\n${body}\n    ${close}`;
  });
}

const shell = await readFile(join(dist, 'index.html'), 'utf8');

// The rendered output is inserted into the shell verbatim, so a placeholder that
// never gets replaced would ship to production. Fail the build instead.
const written = [];
let prerendered = 0;

for (const def of ROUTE_DEFS) {
  for (const lang of LANGS) {
    const path = def.path[lang];
    let html = shell;

    // The Vite build already emits the Chinese homepage with a correct head;
    // it only needs its body prerendered.
    if (path !== '/') {
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
    }

    html = prerenderApp(html, def, lang);
    html = setStamp(html, def, lang);
    prerendered += 1;

    const target = path === '/' ? join(dist, 'index.html') : join(dist, path.replace(/^\/|\/$/g, ''), 'index.html');
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
    written.push(path === '/' ? 'index.html' : `${path.replace(/^\/|\/$/g, '')}/index.html`);
  }
}

// Note: public/404.html is a self-contained static document (its own styling,
// bilingual copy, no #app container), so it needs no prerendering and is simply
// copied through by Vite.

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

console.log(
  `build-routes: prerendered ${prerendered} pages + sitemap.xml (${entries.length} urls with hreflang alternates)`,
);
for (const file of written) console.log(`  dist/${file}`);
