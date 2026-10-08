// Build-artifact tests. Run after `vite build && node scripts/build-routes.mjs`.
//
// The original suite asserted that src/data.js *contained* the jsDelivr URL,
// which locked a bad practice in place. These tests instead check what ships —
// including that both language trees are real, crawlable files.

import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const fileFor = (routePath) => join(dist, routePath.replace(/^\/|\/$/g, ''), 'index.html');
const read = (relative) => readFile(join(dist, relative), 'utf8');
const readRoute = (routePath) => readFile(fileFor(routePath), 'utf8');

const { ALL_PATHS, HTML_LANG, INDEXABLE_PATHS, OG_LOCALE, ROUTE_DEFS, SITE_URL, alternatesFor } =
  await import('../src/meta.js');

const escapeRe = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('the build produced one HTML file per route, per language', async () => {
  await stat(join(dist, 'index.html'));
  for (const routePath of ALL_PATHS) {
    const info = await stat(fileFor(routePath));
    assert.ok(info.size > 0, `${routePath} is empty`);
  }
  const englishEntries = await readdir(join(dist, 'en'), { withFileTypes: true });
  const englishDirs = englishEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert.deepEqual(englishDirs, ['engine', 'notes', 'profile', 'toy', 'works']);
  assert.ok(
    englishEntries.some((entry) => entry.isFile() && entry.name === 'index.html'),
    'the English homepage must sit at dist/en/index.html',
  );
});

test('each page declares its own language, canonical and title', async () => {
  const canonicals = new Set();
  const titles = new Set();

  for (const def of ROUTE_DEFS) {
    for (const lang of ['zh', 'en']) {
      const routePath = def.path[lang];
      const html = await readRoute(routePath);

      assert.match(
        html,
        new RegExp(`<html lang="${escapeRe(HTML_LANG[lang])}"`),
        `${routePath} <html lang>`,
      );
      const canonical = `${SITE_URL}${routePath}`;
      assert.match(html, new RegExp(`<link rel="canonical" href="${escapeRe(canonical)}"`), `${routePath} canonical`);
      assert.match(html, new RegExp(`<meta property="og:url" content="${escapeRe(canonical)}"`), `${routePath} og:url`);
      assert.match(
        html,
        new RegExp(`<meta property="og:locale" content="${OG_LOCALE[lang]}"`),
        `${routePath} og:locale`,
      );

      canonicals.add(canonical);
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
      assert.ok(title, `${routePath} has no title`);
      titles.add(`${routePath}\u0000${title}`);
    }
  }
  assert.equal(canonicals.size, ALL_PATHS.length, 'every route needs a distinct canonical');
  assert.equal(titles.size, ALL_PATHS.length, 'every route needs a distinct title');
});

test('the Chinese and English page for a route are genuinely different documents', async () => {
  const zh = await readRoute('/works/');
  const en = await readRoute('/en/works/');
  const zhTitle = zh.match(/<title>([^<]*)<\/title>/)[1];
  const enTitle = en.match(/<title>([^<]*)<\/title>/)[1];
  assert.notEqual(zhTitle, enTitle);
  assert.match(zhTitle, /作品与记录/);
  // `&` is correctly escaped as &amp; in the emitted HTML.
  assert.match(enTitle, /Works &amp; notes/);
  assert.match(zh, /class="boot-zh"/);
});

test('every page advertises reciprocal hreflang alternates', async () => {
  for (const def of ROUTE_DEFS) {
    const expected = alternatesFor(def.id);
    for (const lang of ['zh', 'en']) {
      const html = await readRoute(def.path[lang]);
      for (const alt of expected) {
        assert.match(
          html,
          new RegExp(`<link rel="alternate" hreflang="${escapeRe(alt.hreflang)}" href="${escapeRe(alt.href)}"`),
          `${def.path[lang]} is missing the ${alt.hreflang} alternate`,
        );
      }
    }
  }
});

test('placeholder subsites are noindex in both languages and absent from the sitemap', async () => {
  for (const def of ROUTE_DEFS.filter((d) => d.noindex)) {
    for (const lang of ['zh', 'en']) {
      const html = await readRoute(def.path[lang]);
      assert.match(html, /<meta name="robots" content="noindex, follow"/, `${def.path[lang]} must be noindex`);
    }
  }
  const sitemap = await read('sitemap.xml');
  assert.doesNotMatch(sitemap, /\/toy\//);
  assert.doesNotMatch(sitemap, /\/notes\//);
});

test('the sitemap lists both trees with xhtml:link alternates', async () => {
  const sitemap = await read('sitemap.xml');
  assert.match(sitemap, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);

  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(locs.sort(), INDEXABLE_PATHS.map((p) => `${SITE_URL}${p}`).sort());
  assert.equal(locs.length, 8, '4 indexable routes x 2 languages');

  // Every zh page must point at its en counterpart from inside the sitemap.
  assert.match(sitemap, /hreflang="en" href="https:\/\/wwhooo\.com\/en\/works\/"/);
  assert.match(sitemap, /hreflang="zh-CN" href="https:\/\/wwhooo\.com\/works\/"/);
  assert.equal((sitemap.match(/hreflang="x-default"/g) ?? []).length, 8);
});

test('the GitHub Pages 404 redirect is gone', async () => {
  for (const routePath of ALL_PATHS) {
    const html = await readRoute(routePath);
    assert.doesNotMatch(html, /pathSegmentsToKeep/, routePath);
    assert.doesNotMatch(html, /~and~/, routePath);
    assert.doesNotMatch(html, /rafgraph/, routePath);
  }
  const notFound = await read('404.html');
  assert.doesNotMatch(notFound, /pathSegmentsToKeep/);
  assert.match(notFound, /404/);
});

test('the Sakura image is preloaded on the homepages only', async () => {
  for (const home of ['/index.html', 'en/index.html']) {
    assert.match(await read(home), /rel="preload"[\s\S]*?sakura-1600\.webp/, home);
  }
  assert.doesNotMatch(await read('en/engine/index.html'), /rel="preload"[\s\S]*?sakura/);
});

test('no artifact reaches for the CDN', async () => {
  for (const routePath of ALL_PATHS) {
    assert.doesNotMatch(await readRoute(routePath), /jsdelivr/i, `${routePath} references jsDelivr`);
  }
  assert.doesNotMatch(await read('404.html'), /jsdelivr/i);
  const css = (await readdir(join(dist, 'assets'))).filter((name) => name.endsWith('.css'));
  assert.equal(css.length, 1);
  assert.doesNotMatch(await read(`assets/${css[0]}`), /jsdelivr/i, 'the stylesheet still loads from the CDN');
});

test('the icons, manifest and robots file ship', async () => {
  const manifest = JSON.parse(await read('manifest.webmanifest'));
  assert.equal(manifest.start_url, '/');
  assert.ok(manifest.icons.some((icon) => icon.sizes === '512x512'), 'a 512px icon is required to be installable');
  for (const file of ['icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'robots.txt']) {
    const info = await stat(join(dist, file));
    assert.ok(info.size > 0, `${file} is missing from dist`);
  }
  const html = await read('index.html');
  assert.match(html, /<link rel="icon"[^>]*href="\/icon\.svg"/);
  assert.match(html, /<link rel="manifest" href="\/manifest\.webmanifest"/);
});

test('English route files keep absolute asset paths', async () => {
  const html = await read('en/engine/index.html');
  assert.match(html, /src="\/assets\/index-[^"]+\.js"/);
  assert.match(html, /href="\/assets\/index-[^"]+\.css"/);
  assert.doesNotMatch(html, /(src|href)="\.\.?\//);
});

test('shipped image weight stays inside budget', async () => {
  const files = await readdir(join(dist, 'images'));
  let total = 0;
  for (const file of files) total += (await stat(join(dist, 'images', file))).size;
  assert.ok(total < 400 * 1024, `dist/images is ${(total / 1024).toFixed(0)} KB; budget is 400 KB`);
});

test('the largest image is small enough to be an LCP element', async () => {
  const largest = (await stat(join(dist, 'images', 'sakura-1600.webp'))).size;
  assert.ok(largest < 120 * 1024, `sakura-1600.webp is ${(largest / 1024).toFixed(0)} KB; budget is 120 KB`);
});

test('stale duplicate assets are gone', async () => {
  for (const file of ['IMG_Sakura.JPG', 'images/photography/sakura.jpg']) {
    await assert.rejects(stat(join(dist, file)), `${file} should no longer ship`);
  }
});

test('every route is reachable as a static file for try_files', async () => {
  // Nginx resolves /en/engine/ to en/engine/index.html without any rewrite, so
  // the config can stay `try_files $uri $uri/ =404`.
  for (const routePath of ALL_PATHS) {
    if (routePath === '/') continue;
    const segments = routePath.replace(/^\/|\/$/g, '');
    await stat(join(dist, segments, 'index.html'));
  }
});
