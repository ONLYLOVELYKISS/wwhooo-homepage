// Build-artifact tests. Run after `vite build && node scripts/build-routes.mjs`.
//
// The old suite asserted that src/data.js *contained* the jsDelivr URL, which
// locked a bad practice in place. These tests instead check what actually ships.

import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const read = (relative) => readFile(join(dist, relative), 'utf8');
const readJson = async (relative) => JSON.parse(await read(relative));

const { INDEXABLE_PATHS, ROUTE_META, ROUTE_PATHS, SITE_URL } = await import('../src/meta.js');

test('the build produced a shell and one HTML file per route', async () => {
  await stat(join(dist, 'index.html'));
  for (const path of ROUTE_PATHS) {
    if (path === '/') continue;
    const file = join(dist, path.replace(/^\/|\/$/g, ''), 'index.html');
    const info = await stat(file);
    assert.ok(info.size > 0, `${file} is empty`);
  }
});

test('each route advertises its own canonical, title and description', async () => {
  // Regression: one shared index.html meant every route declared
  // `canonical: https://wwhooo.com/` — the sitemap and the canonical tag were
  // telling search engines opposite things.
  const canonicals = new Set();
  for (const path of ROUTE_PATHS) {
    const html = path === '/' ? await read('index.html') : await read(`${path.replace(/^\/|\/$/g, '')}/index.html`);
    const expected = `${SITE_URL}${path}`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${expected.replace(/\./g, '\\.')}"`), `${path} canonical`);
    assert.match(html, new RegExp(`<meta property="og:url" content="${expected.replace(/\./g, '\\.')}"`), `${path} og:url`);
    canonicals.add(expected);

    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    assert.ok(title && title.length > 0, `${path} has no title`);
    if (path !== '/') {
      assert.notEqual(title, 'Linn — Things worth keeping', `${path} still uses the homepage title`);
    }
  }
  assert.equal(canonicals.size, ROUTE_PATHS.length, 'canonical URLs must be unique per route');
});

test('placeholder subsites are noindex and absent from the sitemap', async () => {
  for (const path of ['/toy/', '/notes/']) {
    const html = await read(`${path.replace(/^\/|\/$/g, '')}/index.html`);
    assert.match(html, /<meta name="robots" content="noindex, follow"/, `${path} must be noindex`);
  }
  const sitemap = await read('sitemap.xml');
  for (const path of ['/toy/', '/notes/']) {
    assert.doesNotMatch(sitemap, new RegExp(path.replace(/\//g, '\\/')), `${path} must not be in the sitemap`);
  }
  for (const path of INDEXABLE_PATHS) {
    assert.match(sitemap, new RegExp(`<loc>${SITE_URL.replace(/\./g, '\\.')}${path.replace(/\//g, '\\/')}</loc>`));
  }
});

test('the GitHub Pages 404 redirect is gone', async () => {
  // The site is served by Nginx with real per-route files, so the
  // `/?/engine/` round trip was pure overhead and an extra flash.
  const html = await read('index.html');
  assert.doesNotMatch(html, /pathSegmentsToKeep/);
  assert.doesNotMatch(html, /~and~/);
  assert.doesNotMatch(html, /rafgraph/);
  const notFound = await read('404.html');
  assert.doesNotMatch(notFound, /pathSegmentsToKeep/);
  assert.match(notFound, /404/);
});

test('the Sakura image is preloaded on the homepage only', async () => {
  const home = await read('index.html');
  assert.match(home, /rel="preload"[\s\S]*?sakura-1600\.webp/);
  const engine = await read('engine/index.html');
  assert.doesNotMatch(engine, /rel="preload"[\s\S]*?sakura/, 'inner routes do not show the gate image');
});

test('no artifact reaches for the CDN', async () => {
  const files = ['index.html', '404.html', 'engine/index.html', 'works/index.html'];
  for (const file of files) {
    assert.doesNotMatch(await read(file), /jsdelivr/i, `${file} references jsDelivr`);
  }
  const css = (await readdir(join(dist, 'assets'))).filter((name) => name.endsWith('.css'));
  assert.equal(css.length, 1);
  assert.doesNotMatch(await read(`assets/${css[0]}`), /jsdelivr/i, 'the stylesheet still loads the image from the CDN');
});

test('the icons, manifest and robots file ship', async () => {
  const manifest = await readJson('manifest.webmanifest');
  assert.equal(manifest.start_url, '/');
  assert.ok(manifest.icons.some((icon) => icon.sizes === '512x512'), 'a 512px icon is required to be installable');
  for (const file of ['icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'robots.txt']) {
    const info = await stat(join(dist, file));
    assert.ok(info.size > 0, `${file} is missing from dist`);
  }
  const html = await read('index.html');
  assert.match(html, /<link rel="icon"[^>]*href="\/icon\.svg"/, 'the page must reference a favicon');
  assert.match(html, /<link rel="manifest" href="\/manifest\.webmanifest"/, 'the manifest must be linked');
});

test('shipped image weight stays inside budget', async () => {
  const files = await readdir(join(dist, 'images'));
  let total = 0;
  for (const file of files) {
    total += (await stat(join(dist, 'images', file))).size;
  }
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
  // Nginx resolves /engine/ to engine/index.html without any rewrite, which is
  // what lets the config stay `try_files $uri $uri/ =404`.
  for (const path of ROUTE_PATHS) {
    if (path === '/') continue;
    const segments = path.replace(/^\/|\/$/g, '');
    assert.equal(segments, path.slice(1, -1), `unexpected segment for ${path}`);
    await stat(join(dist, segments, 'index.html'));
  }
});

test('route HTML keeps absolute asset paths', async () => {
  const html = await read('engine/index.html');
  assert.match(html, /src="\/assets\/index-[^"]+\.js"/);
  assert.match(html, /href="\/assets\/index-[^"]+\.css"/);
  assert.doesNotMatch(html, /(src|href)="\.\.?\//);
});
