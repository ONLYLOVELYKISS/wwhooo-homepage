// Render-level tests.
//
// These assert on the HTML the views actually produce, not on source-code
// strings. That distinction matters: the previous suite matched substrings in
// src/main.js, so it happily passed while the "重新进入" button was rendered
// behind an always-false condition and could never appear in the DOM.

import assert from 'node:assert/strict';
import test from 'node:test';

// Controllable stand-in for sessionStorage so the gate can be rendered in both
// states. views.js calls hasEntered() at render time, so mutating this between
// tests is enough — no module re-import needed.
let enteredValue = null;
globalThis.sessionStorage = {
  getItem: () => enteredValue,
  setItem: (_key, value) => {
    enteredValue = value;
  },
  removeItem: () => {
    enteredValue = null;
  },
};

const { copy, setLang, getLang } = await import('../src/i18n.js');
const { ROUTE_PATHS } = await import('../src/meta.js');
const data = await import('../src/data.js');
const views = await import('../src/views.js');

const RENDERERS = {
  '/': views.home,
  '/engine/': views.engine,
  '/profile/': views.profilePage,
  '/works/': views.works,
  '/toy/': () => views.subsite(data.subsites[0]),
  '/notes/': () => views.subsite(data.subsites[1]),
};

const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

/**
 * Remove the two places where a Chinese glyph is deliberate: the 桜 watermark
 * and the language switcher, which labels itself in the language it switches to.
 */
const stripIntentionalGlyphs = (html) =>
  html
    .replace(/<b class="gate-mark"[^>]*>.*?<\/b>/gs, '')
    .replace(/(<button class="language"[^>]*>).*?(<\/button>)/gs, '$1$2');

test('every route in meta.js has a renderer and vice versa', () => {
  assert.deepEqual(Object.keys(RENDERERS).sort(), [...ROUTE_PATHS].sort());
});

test('no view depends on the jsDelivr CDN any more', () => {
  for (const [path, render] of Object.entries(RENDERERS)) {
    assert.doesNotMatch(render(), /jsdelivr/i, `${path} still references jsDelivr`);
  }
});

test('the entry gate is a real button, not a range input', () => {
  const html = views.home();
  assert.match(html, /<button[^>]+id="enter-button"/, 'gate must expose a focusable button');
  assert.doesNotMatch(html, /type="range"/, 'the keyboard-hostile range input must be gone');
  assert.doesNotMatch(html, /orient="vertical"/, 'orient is a Firefox-only attribute');
});

test('the lock button is always rendered and toggled by CSS', () => {
  // Regression: the button used to sit behind `state.entered ? ... : ''`, and
  // since the home view renders once before anyone enters, it never appeared.
  assert.match(views.home(), /id="lock-entry"/);
  enteredValue = '1';
  assert.match(views.home(), /id="lock-entry"/);
  enteredValue = null;
});

test('the gate starts hidden for returning visitors', () => {
  const locked = views.home();
  assert.match(locked, /class="entry-gate"/);
  assert.doesNotMatch(locked, /entry-gate gate-complete/);

  enteredValue = '1';
  const unlocked = views.home();
  assert.match(unlocked, /entry-gate gate-complete/);
  assert.doesNotMatch(unlocked, /home-content" id="home-content" inert/);
  enteredValue = null;
});

test('locked home content is inert rather than display:none', () => {
  // Keeping the real homepage in the DOM means crawlers and no-JS visitors see
  // content instead of an empty shell.
  const locked = views.home();
  assert.match(locked, /id="home-content" inert aria-hidden="true"/);
  assert.match(locked, /<h2>把值得留下的/);
});

test('images ship responsive sources with intrinsic dimensions', () => {
  const html = views.home();
  assert.match(html, /<source type="image\/webp" srcset="[^"]*sakura-800\.webp 800w[^"]*"/);
  assert.match(html, /src="\/images\/sakura-1600\.jpg"/, 'JPEG fallback for non-WebP clients');
  assert.match(html, /width="2400"/);
  assert.match(html, /height="1004"/);
  assert.doesNotMatch(html, /cdn\.jsdelivr\.net/);
});

test('the active nav item is exposed to assistive tech', () => {
  assert.match(views.engine(), /href="\/engine\/" aria-current="page"/);
  assert.match(views.home(), /href="\/" aria-current="page"/);
  assert.doesNotMatch(views.works(), /href="\/engine\/" aria-current/);
});

test('the language button is labelled and the skip link is present', () => {
  const html = views.home();
  assert.match(html, /id="language"[^>]*aria-label="[^"]+"/);
  assert.match(html, /class="skip-link" href="#top"/);
});

test('external links are safe', () => {
  for (const html of [views.engine(), views.works()]) {
    const external = html.match(/<a [^>]*href="https?:\/\/[^"]*"[^>]*>/g) ?? [];
    assert.ok(external.length > 0, 'expected external links');
    for (const anchor of external) {
      assert.match(anchor, /rel="noopener noreferrer"/);
      assert.match(anchor, /target="_blank"/);
    }
  }
});

test('unknown paths render a 404 view, not the homepage', () => {
  const html = views.notFound();
  assert.match(html, /404 \/ NOT FOUND/);
  assert.match(html, /href="\/"/);
  assert.doesNotMatch(html, /id="entry-gate"/);
});

test('the profile page does not repeat its own opening line', () => {
  const html = views.profilePage();
  const sentence = '我在网站、自动化工具与跨技术栈实验之间移动。';
  const occurrences = html.split(sentence).length - 1;
  assert.equal(occurrences, 1, 'blockquote and bio must not duplicate the same sentence');
});

test('subsite cards use a short title, not a full sentence', () => {
  const html = views.home();
  assert.match(html, /<strong>TOY 实验场<\/strong>/);
  assert.doesNotMatch(html, /<strong>阶段性实验、脚本和可以运行的小想法。<\/strong>/);
});

test('English renders contain no untranslated Chinese', () => {
  const original = getLang();
  setLang('en');
  try {
    for (const [path, render] of Object.entries(RENDERERS)) {
      const html = stripIntentionalGlyphs(render());
      const match = html.match(CJK);
      assert.equal(match, null, `${path} leaks Chinese into the English build: …${html.slice(Math.max(0, (match?.index ?? 0) - 40), (match?.index ?? 0) + 40)}…`);
    }
    assert.equal(stripIntentionalGlyphs(views.notFound()).match(CJK), null);
  } finally {
    setLang(original);
  }
});

test('zh and en dictionaries define exactly the same keys', () => {
  const zh = Object.keys(copy.zh).sort();
  const en = Object.keys(copy.en).sort();
  assert.deepEqual(en, zh);
});

test('every bilingual data pair has both languages filled in', () => {
  const seen = [];
  const walk = (value, path) => {
    if (value === null || typeof value !== 'object') return;
    const keys = Object.keys(value);
    if (keys.length === 2 && keys.includes('zh') && keys.includes('en')) {
      seen.push([path, value]);
      return;
    }
    for (const [key, child] of Object.entries(value)) walk(child, `${path}.${key}`);
  };

  for (const [name, value] of Object.entries(data)) {
    walk(value, name);
  }
  assert.ok(seen.length >= 12, `expected to find bilingual pairs, found ${seen.length}`);
  for (const [path, pair] of seen) {
    assert.equal(typeof pair.zh, 'string', `${path}.zh must be a string`);
    assert.equal(typeof pair.en, 'string', `${path}.en must be a string`);
    assert.ok(pair.zh.trim().length > 0, `${path}.zh is empty`);
    assert.ok(pair.en.trim().length > 0, `${path}.en is empty`);
    assert.doesNotMatch(pair.en, CJK, `${path}.en still contains Chinese`);
  }
});

test('the image set is self-hosted and version-free', () => {
  assert.deepEqual(data.photo.widths, [800, 1600, 2400]);
  assert.equal(data.photo.fallback, '/images/sakura-1600.jpg');
  assert.equal(data.photo.card, '/images/sakura-card.webp');
  for (const url of [data.photo.fallback, data.photo.card]) {
    assert.match(url, /^\/images\//, `${url} must be a local path`);
  }
});
