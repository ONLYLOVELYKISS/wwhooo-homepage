import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';

const read = (file) => readFile(file, 'utf8');
const main = await read('src/main.js');
const data = await read('src/data.js');
const index = await read('index.html');
const manifest = JSON.parse(await read('public/manifest.webmanifest'));
const sitemap = await read('public/sitemap.xml');
const routes = ['/', '/engine/', '/profile/', '/works/'];

assert.match(main, /localStorage\.getItem\('wwhooo-lang'\)/);
assert.match(main, /setItem\('wwhooo-lang'/);
assert.match(main, /path=='\/engine'/);
assert.match(main, /path=='\/profile'/);
assert.match(main, /path=='\/works'/);
assert.match(main, /p\[5\]/, 'project links must use the URL field');
assert.doesNotMatch(main, /href="\$\{p\[4\]\}"/, 'English description must not be used as URL');
assert.match(main, /rel="noopener noreferrer"/);
assert.match(data, /sakura\.jpg/);
assert.match(index, /src="\/src\/main\.js"/);
assert.match(index, /boot-fallback/);
assert.equal(manifest.start_url, '/');
assert.equal(manifest.theme_color, '#090909');
await access('public/images/photography/sakura.jpg', constants.R_OK);
await access('public/404.html', constants.R_OK);
for (const route of routes) {
  assert.match(sitemap, new RegExp(`<loc>https://wwhooo\\.com${route.replace('/', '\\/')}</loc>`));
}

const dist = await read('dist/index.html');
assert.match(dist, /assets\/index-.*\.js/);
assert.match(dist, /boot-fallback/);
await access('dist/404.html', constants.R_OK);
await access('dist/images/photography/sakura.jpg', constants.R_OK);
console.log(`site checks passed: ${routes.length} routes, fallback, dist assets, bilingual switch, project links`);
