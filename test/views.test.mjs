// Render-level tests.
//
// These assert on the HTML the views actually produce, not on source-code
// strings. That distinction matters: the original suite matched substrings in
// src/main.js, so it happily passed while the "重新进入" button sat behind an
// always-false condition and could never appear in the DOM.

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

const { copy, t, text } = await import('../src/i18n.js');
const { setContext, getLang } = await import('../src/context.js');
const { ROUTE_DEFS, ALL_PATHS, INDEXABLE_PATHS, HTML_LANG, alternatesFor, pathFor, normalizePath, resolveRoute } =
  await import('../src/meta.js');
const data = await import('../src/data.js');
const views = await import('../src/views.js');

const RENDERERS = {
  home: views.home,
  engine: views.engine,
  profile: views.profilePage,
  works: views.works,
  toy: () => views.subsite(data.subsites[0]),
  notes: () => views.subsite(data.subsites[1]),
};

/** Render a route in a language, leaving the global context on that setting. */
const render = (id, lang = 'zh') => {
  setContext(lang, id);
  return RENDERERS[id]();
};

const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

/**
 * Remove the places where a Chinese glyph is deliberate: the 桜 watermark and
 * the language switcher, which labels itself in the language it switches to.
 */
const stripIntentionalGlyphs = (html) =>
  html.replace(/<b class="gate-mark"[^>]*>.*?<\/b>/gs, '').replace(/(<a class="language"[^>]*>).*?(<\/a>)/gs, '$1$2');

test('every route in meta.js has a renderer and vice versa', () => {
  assert.deepEqual(Object.keys(RENDERERS).sort(), ROUTE_DEFS.map((def) => def.id).sort());
});

test('the route table exposes both language trees', () => {
  assert.equal(ALL_PATHS.length, ROUTE_DEFS.length * 2);
  for (const def of ROUTE_DEFS) {
    assert.ok(def.path.zh.startsWith('/'), `${def.id} zh path`);
    assert.ok(def.path.en.startsWith('/en/'), `${def.id} en path must live under /en/`);
    assert.equal(resolveRoute(def.path.zh).lang, 'zh');
    assert.equal(resolveRoute(def.path.en).lang, 'en');
    assert.equal(resolveRoute(def.path.zh).id, def.id);
  }
  // Only the placeholder subsites are kept out of the index.
  assert.equal(INDEXABLE_PATHS.length, 8);
});

test('normalizePath handles both trees and /index.html', () => {
  assert.equal(normalizePath('/'), '/');
  assert.equal(normalizePath('/index.html'), '/');
  assert.equal(normalizePath('/engine'), '/engine/');
  assert.equal(normalizePath('/engine/'), '/engine/');
  assert.equal(normalizePath('/en'), '/en/');
  assert.equal(normalizePath('/en/'), '/en/');
  assert.equal(normalizePath('/en/index.html'), '/en/');
  assert.equal(normalizePath('/en/engine'), '/en/engine/');
});

test('hreflang alternates are reciprocal and include x-default', () => {
  for (const def of ROUTE_DEFS) {
    const alts = alternatesFor(def.id);
    assert.deepEqual(
      alts.map((a) => a.hreflang),
      ['zh-CN', 'en', 'x-default'],
    );
    assert.equal(alts[0].href, `https://wwhooo.com${def.path.zh}`);
    assert.equal(alts[1].href, `https://wwhooo.com${def.path.en}`);
    assert.equal(alts[2].href, `https://wwhooo.com${def.path.zh}`, 'x-default points at the zh tree');
  }
});

test('no view depends on the jsDelivr CDN any more', () => {
  for (const id of Object.keys(RENDERERS)) {
    assert.doesNotMatch(render(id), /jsdelivr/i, `${id} still references jsDelivr`);
  }
});

test('the entry gate is a real button, not a range input', () => {
  const html = render('home');
  assert.match(html, /<button[^>]+id="enter-button"/, 'gate must expose a focusable button');
  assert.doesNotMatch(html, /type="range"/, 'the keyboard-hostile range input must be gone');
  assert.doesNotMatch(html, /orient="vertical"/, 'orient is a Firefox-only attribute');
});

test('the lock button is always rendered and toggled by CSS', () => {
  // Regression: the button used to sit behind `state.entered ? ... : ''`, and
  // since the home view renders once before anyone enters, it never appeared.
  assert.match(render('home'), /id="lock-entry"/);
  enteredValue = '1';
  assert.match(render('home'), /id="lock-entry"/);
  enteredValue = null;
});

test('the gate starts hidden for returning visitors', () => {
  enteredValue = null;
  const locked = render('home');
  assert.match(locked, /class="entry-gate"/);
  assert.doesNotMatch(locked, /entry-gate gate-complete/);

  enteredValue = '1';
  const unlocked = render('home');
  assert.match(unlocked, /entry-gate gate-complete/);
  assert.doesNotMatch(unlocked, /home-content" id="home-content" inert/);
  enteredValue = null;
});

test('the gated content is never inert in the static markup', () => {
  // The inert state is applied by the handshake script in index.html (before
  // first paint) and by gate.js on later renders. If it were baked into the
  // markup, a visitor without JavaScript would get a readable homepage they are
  // forbidden to interact with, behind a gate they cannot open.
  const locked = render('home');
  assert.match(locked, /<div class="home-content" id="home-content">/);
  assert.doesNotMatch(locked, /id="home-content"[^>]*inert/);
  assert.doesNotMatch(locked, /id="home-content"[^>]*aria-hidden/);
  // The gate itself must still be there for scripted visitors.
  assert.match(locked, /id="entry-gate"/);
  assert.match(locked, /engine-home is-locked/);
});

test('images ship responsive sources with intrinsic dimensions', () => {
  const html = render('home');
  assert.match(html, /<source type="image\/webp" srcset="[^"]*sakura-800\.webp 800w[^"]*"/);
  assert.match(html, /src="\/images\/sakura-1600\.jpg"/, 'JPEG fallback for non-WebP clients');
  assert.match(html, /width="2400"/);
  assert.match(html, /height="1006"|height="1004"/);
  assert.doesNotMatch(html, /cdn\.jsdelivr\.net/);
});

test('the active nav item is exposed to assistive tech', () => {
  assert.match(render('engine'), /href="\/engine\/" aria-current="page"/);
  assert.match(render('home'), /href="\/" aria-current="page"/);
  assert.doesNotMatch(render('works'), /href="\/engine\/" aria-current/);
});

test('internal links stay inside the current language tree', () => {
  const zh = render('engine', 'zh');
  assert.match(zh, /href="\/profile\/"/);
  assert.doesNotMatch(zh, /href="\/en\/profile\/"/);

  const en = render('engine', 'en');
  assert.match(en, /href="\/en\/profile\/"/);
  assert.match(en, /href="\/en\/works\/"/);
  assert.doesNotMatch(en, /href="\/profile\/"/, 'English pages must not link into the Chinese tree');
});

test('the language control is a crawlable link to the counterpart URL', () => {
  const zh = render('engine', 'zh');
  assert.match(zh, /<a class="language" href="\/en\/engine\/" hreflang="en" lang="en"[^>]*>/);
  assert.doesNotMatch(zh, /id="language"/, 'it is no longer a JS-driven button');

  const en = render('engine', 'en');
  assert.match(en, /<a class="language" href="\/engine\/" hreflang="zh-CN" lang="zh-CN"[^>]*>/);
});

test('the language link falls back to the homepage on unknown routes', () => {
  setContext('zh', null);
  const html = views.notFound();
  assert.match(html, /<a class="language" href="\/en\/" /);
});

test('the skip link is present', () => {
  assert.match(render('home'), /class="skip-link" href="#top"/);
});

test('external links are safe', () => {
  for (const id of ['engine', 'works']) {
    const html = render(id);
    const external = html.match(/<a [^>]*href="https?:\/\/[^"]*"[^>]*>/g) ?? [];
    assert.ok(external.length > 0, `expected external links on ${id}`);
    for (const anchor of external) {
      assert.match(anchor, /rel="noopener noreferrer"/);
      assert.match(anchor, /target="_blank"/);
    }
  }
});

test('unknown paths render a 404 view, not the homepage', () => {
  setContext('zh', null);
  const html = views.notFound();
  assert.match(html, /404 \/ NOT FOUND/);
  assert.doesNotMatch(html, /id="entry-gate"/);
});

test('the profile page does not repeat its own opening line', () => {
  const html = render('profile');
  const occurrences = html.split('我在网站、自动化工具与跨技术栈实验之间移动。').length - 1;
  assert.equal(occurrences, 1, 'blockquote and bio must not duplicate the same sentence');
});

test('subsite cards use a short title, not a full sentence', () => {
  const html = render('home');
  assert.match(html, /<strong>TOY 实验场<\/strong>/);
  assert.doesNotMatch(html, /<strong>阶段性实验、脚本和可以运行的小想法。<\/strong>/);
});

test('chaoxing-sign-cli is archived, not featured', () => {
  // Automating a third party's check-in flow is a compliance grey area, so it
  // must not appear in the featured project list.
  assert.equal(
    data.projects.some((p) => p.name === 'chaoxing-sign-cli'),
    false,
  );
  assert.equal(
    data.archive.some((p) => p.name === 'chaoxing-sign-cli'),
    true,
  );

  const works = render('works');
  const featured = works.slice(works.indexOf('works-list'), works.indexOf('archive-section'));
  assert.doesNotMatch(featured, /chaoxing-sign-cli/, 'it must not be inside the featured list');

  const archived = works.slice(works.indexOf('archive-section'));
  assert.match(archived, /class="archive-list"/);
  assert.match(archived, /chaoxing-sign-cli/);
  assert.doesNotMatch(archived, /<h2>chaoxing-sign-cli<\/h2>/, 'archive entries get no headline treatment');
});

test('the profile contact links to the real mailbox', () => {
  assert.equal(data.site.email, 'wwhooo@icloud.com');
  assert.match(render('profile'), /href="mailto:wwhooo@icloud\.com"/);
});

test('English renders contain no untranslated Chinese', () => {
  for (const def of ROUTE_DEFS) {
    const html = stripIntentionalGlyphs(render(def.id, 'en'));
    const match = html.match(CJK);
    assert.equal(
      match,
      null,
      `${def.id} leaks Chinese into the English tree: …${html.slice(Math.max(0, (match?.index ?? 0) - 40), (match?.index ?? 0) + 40)}…`,
    );
  }
  setContext('en', null);
  assert.equal(stripIntentionalGlyphs(views.notFound()).match(CJK), null);
});

test('zh and en dictionaries define exactly the same keys', () => {
  assert.deepEqual(Object.keys(copy.en).sort(), Object.keys(copy.zh).sort());
});

test('the copy layer follows the render context', () => {
  setContext('zh', 'home');
  assert.equal(t().contact, '联系我');
  assert.equal(getLang(), 'zh');
  setContext('en', 'home');
  assert.equal(t().contact, 'Find me');
  assert.equal(getLang(), 'en');
  assert.equal(text({ zh: '甲', en: 'B' }), 'B');
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

  for (const [name, value] of Object.entries(data)) walk(value, name);
  assert.ok(seen.length >= 12, `expected to find bilingual pairs, found ${seen.length}`);
  for (const [path, pair] of seen) {
    assert.equal(typeof pair.zh, 'string', `${path}.zh must be a string`);
    assert.equal(typeof pair.en, 'string', `${path}.en must be a string`);
    assert.ok(pair.zh.trim().length > 0, `${path}.zh is empty`);
    assert.ok(pair.en.trim().length > 0, `${path}.en is empty`);
    assert.doesNotMatch(pair.en, CJK, `${path}.en still contains Chinese`);
  }
});

test('route paths are reachable through pathFor', () => {
  for (const def of ROUTE_DEFS) {
    assert.equal(pathFor(def.id, 'zh'), def.path.zh);
    assert.equal(pathFor(def.id, 'en'), def.path.en);
  }
  assert.equal(HTML_LANG.zh, 'zh-CN');
});

test('the image set is self-hosted and version-free', () => {
  assert.deepEqual(data.photo.widths, [800, 1600, 2400]);
  assert.equal(data.photo.fallback, '/images/sakura-1600.jpg');
  assert.equal(data.photo.card, '/images/sakura-card.webp');
  for (const url of [data.photo.fallback, data.photo.card]) {
    assert.match(url, /^\/images\//, `${url} must be a local path`);
  }
});
