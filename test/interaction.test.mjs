// Interaction tests: load the *built* bundle into a real DOM and drive the entry
// gate, the language switch and client-side routing, in both language trees.
//
// This complements the render and artifact suites, which only ever look at
// strings. Everything here needs a DOM and a running bundle, which is why it
// uses linkedom — the one runtime dependency the test suite has.
//
// Requires a build first (`npm test` does that); it reads from dist/.

import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { parseHTML } from 'linkedom';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

// ---------------------------------------------------------------------------
// Build the DOM from the shipped homepage *before* running any script, so the
// prerendered state can be inspected and referenced later.
// ---------------------------------------------------------------------------

let distIndex;
try {
  distIndex = await stat(join(dist, 'index.html'));
} catch {
  throw new Error('test/interaction: dist/index.html is missing — run `npm run build` first');
}
assert.ok(distIndex.size > 0);

const shippedHtml = await readFile(join(dist, 'index.html'), 'utf8');
const { window, document } = parseHTML(shippedHtml);

// Node references captured from the prerendered markup. If the client router
// reconciles rather than rebuilds, these exact objects survive.
const prerendered = {
  home: document.querySelector('#engine-home'),
  gate: document.querySelector('#entry-gate'),
  library: document.querySelector('#library'),
};

// The values below must be read *now*: importing the bundle below mounts the
// app, so anything inspected from inside a test() has already been touched by
// JavaScript and cannot speak for the no-script experience.
const beforeScript = {
  text: document.documentElement.textContent,
  bootFallback: document.querySelector('.boot-fallback') !== null,
  noJs: document.documentElement.classList.contains('no-js'),
  gatedContentInert: document.querySelector('#home-content')?.hasAttribute('inert') ?? null,
};

// ---------------------------------------------------------------------------
// Minimal browser environment
// ---------------------------------------------------------------------------

const makeStore = () => {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key),
  };
};
const sessionStore = makeStore();

const page = { url: new URL('http://localhost/') };
Object.defineProperty(globalThis, 'location', {
  configurable: true,
  get: () => ({
    get pathname() {
      return page.url.pathname;
    },
    get href() {
      return page.url.href;
    },
    get origin() {
      return page.url.origin;
    },
    get hash() {
      return page.url.hash;
    },
  }),
});
globalThis.history = {
  pushState(_state, _title, url) {
    page.url = new URL(url, page.url);
  },
  replaceState(_state, _title, url) {
    page.url = new URL(url, page.url);
  },
};
globalThis.sessionStorage = sessionStore;
globalThis.localStorage = makeStore();
globalThis.requestAnimationFrame = (fn) => setTimeout(fn, 0);
// Vite's modulepreload polyfill constructs a MutationObserver at load time.
globalThis.MutationObserver = class {
  observe() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};
globalThis.fetch = async () => ({ ok: true });
globalThis.window = window;
globalThis.document = document;
window.scrollTo = () => {};
if (!document.documentElement.style) document.documentElement.style = {};
document.querySelectorAll('*').forEach((el) => {
  if (typeof el.focus !== 'function') el.focus = () => {};
});

const assets = await readdir(join(dist, 'assets'));
const bundle = assets.find((name) => name.endsWith('.js'));
assert.ok(bundle, 'no built bundle found in dist/assets');
await import(pathToFileURL(join(dist, 'assets', bundle)).href);
await new Promise((resolve) => setTimeout(resolve, 30));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const q = (selector) => document.querySelector(selector);
const head = (selector) => document.head.querySelector(selector);
const alternates = () =>
  [...document.head.querySelectorAll('link[rel="alternate"][hreflang]')].map(
    (el) => `${el.getAttribute('hreflang')}=${el.getAttribute('href')}`,
  );
const ZH_HOME_ALTERNATES = 'zh-CN=https://wwhooo.com/ en=https://wwhooo.com/en/ x-default=https://wwhooo.com/';

const fire = (el, type) => {
  const event = new window.Event(type, { bubbles: true, cancelable: true });
  // A real click always carries button: 0; a bare Event leaves it undefined,
  // which would trip the router's "primary button only" guard.
  Object.defineProperty(event, 'button', { value: 0 });
  el.dispatchEvent(event);
};

const clickLink = (href) => {
  const link = [...document.querySelectorAll('a')].find((a) => a.getAttribute('href') === href);
  assert.ok(link, `no link with href=${href}`);
  fire(link, 'click');
};

const settle = () => new Promise((resolve) => setTimeout(resolve, 30));

// ---------------------------------------------------------------------------

test('the shipped HTML is complete and usable before any script runs', () => {
  assert.ok(prerendered.home, 'the homepage body must be prerendered');
  assert.ok(prerendered.gate, 'the gate must be prerendered');
  assert.ok(prerendered.library, 'the library section must be prerendered');
  assert.match(beforeScript.text, /把值得留下的/);
  assert.equal(beforeScript.bootFallback, false, 'the placeholder must be gone');
  assert.equal(beforeScript.noJs, true, 'must start in the no-js state');
  assert.ok(/\bclassList\.remove\('no-js'\)/.test(shippedHtml), 'the handshake script must ship');

  // If inert lived in the markup, a visitor without JavaScript would get a
  // readable homepage they are forbidden to interact with.
  assert.equal(beforeScript.gatedContentInert, false);
});

test('the first mount reconciles the prerendered DOM instead of rebuilding it', () => {
  // Identity, not equality: an innerHTML write would produce an equal tree made
  // of different nodes, which is exactly what this guards against.
  assert.equal(q('#engine-home'), prerendered.home);
  assert.equal(q('#entry-gate'), prerendered.gate);
  assert.equal(q('#library'), prerendered.library);
});

test('the gate, the language switch and routing all work end to end', async (t) => {
  await t.test('the homepage starts locked for a new visitor', () => {
    assert.equal(document.title, 'Linn — 值得留下的东西');
    assert.equal(document.documentElement.lang, 'zh-CN');
    assert.equal(head('link[rel="canonical"]')?.getAttribute('href'), 'https://wwhooo.com/');
    assert.deepEqual(alternates().join(' '), ZH_HOME_ALTERNATES);
    assert.equal(q('#home-content')?.hasAttribute('inert'), true, 'gate.js must apply inert');
    assert.ok(document.body.classList.contains('is-locked'));
    assert.ok(q('a.language'), 'the language control must be a link');
  });

  await t.test('one click on the gate button enters', async () => {
    fire(q('#enter-button'), 'click');
    await settle();
    assert.ok(q('#entry-gate').classList.contains('gate-complete'));
    assert.ok(q('#engine-home').classList.contains('is-unlocked'));
    assert.equal(document.body.classList.contains('is-locked'), false);
    assert.equal(q('#home-content').hasAttribute('inert'), false);
    assert.equal(sessionStore.getItem('wwhooo-entered'), '1');
  });

  await t.test('re-locking works without a reload', async () => {
    fire(q('#lock-entry'), 'click');
    await settle();
    assert.equal(q('#entry-gate').classList.contains('gate-complete'), false);
    assert.ok(document.body.classList.contains('is-locked'));
    assert.equal(sessionStore.getItem('wwhooo-entered'), null);
    assert.equal(document.documentElement.classList.contains('entered'), false);
    fire(q('#enter-button'), 'click');
    await settle();
    assert.ok(document.documentElement.classList.contains('entered'));
  });

  await t.test('the language control is a crawlable link to the counterpart URL', () => {
    assert.equal(q('a.language').getAttribute('href'), '/en/');
    assert.equal(q('a.language').getAttribute('hreflang'), 'en');
  });

  await t.test('clicking it moves into the English tree', async () => {
    clickLink('/en/');
    await settle();
    assert.equal(location.pathname, '/en/');
    assert.equal(document.documentElement.lang, 'en');
    assert.equal(document.title, 'Linn — Things worth keeping');
    assert.equal(head('link[rel="canonical"]')?.getAttribute('href'), 'https://wwhooo.com/en/');
    assert.equal(head('meta[property="og:locale"]')?.getAttribute('content'), 'en_US');
    assert.deepEqual(alternates().join(' '), ZH_HOME_ALTERNATES);
    assert.equal(document.body.classList.contains('is-locked'), false, 'must not re-gate the visitor');
    assert.equal(q('.site-header nav a').getAttribute('href'), '/en/');
  });

  await t.test('navigation inside the English tree updates head and content', async () => {
    clickLink('/en/engine/');
    await settle();
    assert.equal(location.pathname, '/en/engine/');
    assert.match(q('#app').textContent, /02 \/ ENGINE/);
    assert.equal(q('#entry-gate'), null, 'inner routes carry no gate');
    assert.equal(document.title, 'Tools — Linn');
    assert.equal(head('link[rel="canonical"]')?.getAttribute('href'), 'https://wwhooo.com/en/engine/');
    assert.ok(q('.site-header nav a[aria-current="page"]'));
    for (const anchor of document.querySelectorAll('.site-header nav a')) {
      assert.ok(anchor.getAttribute('href').startsWith('/en/'), 'English pages must not link into the zh tree');
    }
  });

  await t.test('switching back to Chinese keeps the session state', async () => {
    clickLink('/engine/');
    await settle();
    assert.equal(location.pathname, '/engine/');
    assert.equal(document.documentElement.lang, 'zh-CN');
    assert.equal(document.title, '工具 — Linn');
    assert.equal(q('#entry-gate'), null);

    clickLink('/');
    await settle();
    assert.ok(q('#entry-gate'), 'home renders the gate again');
    assert.ok(q('#entry-gate').classList.contains('gate-complete'));
    assert.equal(document.body.classList.contains('is-locked'), false, 'returning visitor stays unlocked');
  });

  await t.test('an unknown path renders the 404 view and drops its metadata', async () => {
    history.pushState({}, '', '/definitely-not-a-route/');
    window.dispatchEvent(new window.Event('popstate'));
    await settle();
    assert.match(q('#app').textContent, /404 \/ NOT FOUND/);
    assert.equal(head('link[rel="canonical"]'), null, 'must not claim to be the homepage');
    assert.deepEqual(alternates(), []);
    assert.match(head('meta[name="robots"]')?.getAttribute('content') ?? '', /noindex/);
  });
});
