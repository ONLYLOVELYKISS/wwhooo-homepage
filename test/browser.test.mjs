// Real-browser tests.
//
// Everything else in test/ inspects strings or a synthetic DOM. This file drives
// Chromium, which is the only way to catch the class of bug that actually took
// the site down before: the entry gate's unlock control sitting outside a
// landscape viewport, invisible and unreachable with no way to scroll to it.
// Strings cannot express that, and neither can linkedom — it has no layout.
//
// It also runs axe-core in that browser, where the colour-contrast rules work,
// and re-checks the no-JavaScript contract by genuinely disabling scripting.

import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import test, { after, before } from 'node:test';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

import { startStaticServer } from './helpers/static-server.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const axePath = join(root, 'node_modules', 'axe-core', 'axe.min.js');

let site;
let browser;

before(async () => {
  try {
    await access(join(dist, 'index.html'));
  } catch {
    throw new Error('test/browser: dist/index.html is missing — run `npm run build` first');
  }
  site = await startStaticServer(dist);
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await site?.close();
});

/**
 * Open a page with console/page errors collected.
 * `javaScriptEnabled: false` is the faithful way to test the no-script path —
 * unlike blocking the bundle, it also stops the inline handshake from running.
 */
async function open(path, { viewport = { width: 1280, height: 800 }, javaScriptEnabled = true } = {}) {
  const context = await browser.newContext({ viewport, javaScriptEnabled });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(String(error)));
  await page.goto(`${site.url}${path}`, { waitUntil: 'load' });
  return { context, page, errors };
}

// ---------------------------------------------------------------------------
// Viewport: the regression that motivated all of this
// ---------------------------------------------------------------------------

test('the unlock control stays inside a landscape phone viewport', async () => {
  // 844x390 is a typical phone in landscape, and 844x330 a short laptop window.
  // Both used to strand the visitor: the gate was pinned taller than the screen
  // by `min-height: 580px` and clipped by `overflow: hidden`, so the button was
  // painted below the fold with no scrolling available.
  for (const viewport of [
    { width: 844, height: 390 },
    { width: 844, height: 330 },
    { width: 1280, height: 800 },
  ]) {
    const { context, page } = await open('/', { viewport });
    const button = page.locator('#enter-button');
    assert.ok(await button.isVisible(), `unlock control hidden at ${viewport.width}x${viewport.height}`);

    const box = await button.boundingBox();
    assert.ok(box, `no bounding box at ${viewport.width}x${viewport.height}`);
    assert.ok(box.y >= 0, `unlock control starts above the viewport (y=${box.y})`);
    assert.ok(
      box.y + box.height <= viewport.height,
      `unlock control ends at ${Math.round(box.y + box.height)}px, past the ${viewport.height}px viewport`,
    );
    assert.ok(box.x >= 0 && box.x + box.width <= viewport.width, 'unlock control is horizontally clipped');
    await context.close();
  }
});

// ---------------------------------------------------------------------------
// The gate itself
// ---------------------------------------------------------------------------

test('a click enters, and a keyboard user can enter too', async () => {
  const { context, page } = await open('/');

  assert.ok(await page.locator('#home-content').evaluate((el) => el.hasAttribute('inert')), 'content starts inert');

  // Keyboard first: the control is a real <button>, so Enter must work without
  // any pointer gesture. The previous implementation was an
  // `input[type=range]` needing ~85 arrow presses.
  await page.locator('#enter-button').focus();
  await page.keyboard.press('Enter');
  await page.waitForSelector('.engine-home.is-unlocked');
  assert.equal(await page.locator('#gate-hidden-check').count(), 0);
  assert.ok(await page.locator('#home-content').evaluate((el) => !el.hasAttribute('inert')));
  assert.equal(await page.evaluate(() => document.body.classList.contains('is-locked')), false);
  assert.equal(await page.evaluate(() => sessionStorage.getItem('wwhooo-entered')), '1');

  // Focus must land somewhere meaningful: the gate is inert now, so leaving it
  // on the button would strand keyboard users.
  assert.equal(
    await page.evaluate(() => document.activeElement?.id),
    'top',
    'focus should move into the revealed content',
  );

  await context.close();
});

test('the gate is a working pointer target, not just a click handler', async () => {
  const { context, page } = await open('/');
  const box = await page.locator('#enter-button').boundingBox();

  // Drag the capsule upwards — the gesture the design is built around. The
  // router needs 0.8 x 130px ≈ 104px of travel, so 150px with margin.
  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX, startY - 150, { steps: 10 });
  await page.mouse.up();

  await page.waitForSelector('.engine-home.is-unlocked');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('wwhooo-entered')), '1');
  await context.close();
});

test('a returning visitor is not re-gated', async () => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(`${site.url}/`);
  await page.evaluate(() => sessionStorage.setItem('wwhooo-entered', '1'));
  await page.reload({ waitUntil: 'load' });

  // The handshake script must hide the gate before first paint, so it is never
  // visible for a visitor who already entered in this session.
  assert.ok(await page.locator('#engine-home').evaluate((el) => el.classList.contains('is-unlocked')));
  assert.equal(await page.locator('#entry-gate').isVisible(), false);
  await context.close();
});

// ---------------------------------------------------------------------------
// Language trees
// ---------------------------------------------------------------------------

test('the language link moves between real URLs', async () => {
  const { context, page } = await open('/engine/');
  assert.equal(await page.evaluate(() => document.documentElement.lang), 'zh-CN');

  await page.locator('a.language').click();
  await page.waitForURL('**/en/engine/');
  assert.equal(await page.evaluate(() => document.documentElement.lang), 'en');
  assert.equal(await page.title(), 'Tools — Linn');
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://wwhooo.com/en/engine/');

  // The English page must not link back into the Chinese tree.
  const hrefs = await page.locator('.site-header nav a').evaluateAll((els) => els.map((el) => el.getAttribute('href')));
  assert.ok(
    hrefs.every((href) => href.startsWith('/en/')),
    `English nav leaked a zh link: ${hrefs.join(', ')}`,
  );

  await context.close();
});

test('every route loads without console errors', async () => {
  for (const path of ['/', '/en/', '/engine/', '/en/engine/', '/profile/', '/en/profile/', '/works/', '/en/works/']) {
    const { context, page, errors } = await open(path);
    assert.deepEqual(errors, [], `${path} logged errors`);
    assert.ok((await page.title()).length > 0, `${path} has no title`);
    await context.close();
  }
});

// ---------------------------------------------------------------------------
// No JavaScript
// ---------------------------------------------------------------------------

test('without JavaScript the site shows its content and hides the gate', async () => {
  const { context, page } = await open('/', { javaScriptEnabled: false });

  // The gate cannot be opened without script, so showing it would trap the
  // visitor. The prerendered homepage has to be readable instead.
  assert.equal(await page.locator('#entry-gate').isVisible(), false, 'the gate must be hidden');
  assert.ok(await page.locator('#library').isVisible(), 'the library section must be visible');
  assert.match(await page.locator('h2').first().textContent(), /把值得留下的/);
  assert.equal(
    await page.locator('#home-content').evaluate((el) => el.hasAttribute('inert')),
    false,
    'content must not be inert without script',
  );
  // Navigation and the language switch are plain links, so they still work.
  await page.locator('a.language').click();
  await page.waitForURL('**/en/');
  assert.match(await page.locator('h2').first().textContent(), /Things worth/);

  await context.close();
});

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

test('no axe-core violations on any indexable page, in either language', async () => {
  const failures = [];

  for (const path of ['/', '/en/', '/engine/', '/en/engine/', '/profile/', '/en/profile/', '/works/', '/en/works/']) {
    const { context, page } = await open(path);
    await page.addScriptTag({ path: axePath });

    const results = await page.evaluate(async () => {
      const result = await window.axe.run(document, { resultTypes: ['violations'] });
      return result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.slice(0, 4).map((node) => node.target.join(' ')),
      }));
    });

    for (const violation of results) {
      failures.push(
        `${path} — [${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.join(' | ')})`,
      );
    }
    await context.close();
  }

  assert.deepEqual(failures, [], `axe reported:\n${failures.join('\n')}`);
});

test('keyboard focus cannot escape behind the gate', async () => {
  // The gate covers the page visually, but the header and footer sit behind it
  // in the stacking order and would otherwise stay focusable — a keyboard user
  // would tab into links they cannot see.
  const { context, page } = await open('/');

  const reached = [];
  for (let i = 0; i < 8; i += 1) {
    await page.keyboard.press('Tab');
    reached.push(
      await page.evaluate(() => {
        const el = document.activeElement;
        return `${el?.tagName?.toLowerCase() ?? '?'}${el?.className ? `.${String(el.className).split(' ')[0]}` : ''}`;
      }),
    );
  }

  const behindGate = reached.filter((entry) => entry.startsWith('a.site-header') || entry.startsWith('a.brand'));
  assert.deepEqual(behindGate, [], `focus reached hidden controls: ${reached.join(' → ')}`);

  await context.close();
});
