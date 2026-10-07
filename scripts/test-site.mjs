import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';

const read = (file) => readFile(file, 'utf8');
const main = await read('src/main.js');
const data = await read('src/data.js');
const index = await read('index.html');
const manifest = JSON.parse(await read('public/manifest.webmanifest'));
const sitemap = await read('public/sitemap.xml');
const routes = ['/', '/engine/', '/profile/', '/works/', '/toy/', '/notes/'];

assert.match(main, /wwhooo-entry/);
assert.match(main, /entry-slider/);
assert.match(main, /type="range"/);
assert.match(main, /route === '\/toy'/);
assert.match(main, /route === '\/notes'/);
assert.match(main, /route === '\/engine'/);
assert.match(main, /route === '\/profile'/);
assert.match(main, /route === '\/works'/);
assert.match(main, /IMG_Sakura\.JPG/);
assert.match(main, /href="\$\{project\[5\]\}"/);
assert.match(main, /rel="noopener noreferrer"/);
assert.match(data, /image:'\/IMG_Sakura\.JPG'/);
assert.match(data, /subsites=/);
assert.match(index, /src="\/src\/main\.js"/);
assert.match(index, /boot-fallback/);
assert.equal(manifest.start_url, '/');
await access('public/IMG_Sakura.JPG', constants.R_OK);
await access('public/404.html', constants.R_OK);
for (const route of routes) assert.match(sitemap, new RegExp(`<loc>https://wwhooo\\.com${route.replace('/', '\\/')}</loc>`));

const dist = await read('dist/index.html');
assert.match(dist, /assets\/index-.*\.js/);
assert.match(dist, /boot-fallback/);
await access('dist/404.html', constants.R_OK);
await access('dist/IMG_Sakura.JPG', constants.R_OK);
console.log(`site checks passed: ${routes.length} routes, Sakura gate, subsites, image, fallback, dist assets`);
