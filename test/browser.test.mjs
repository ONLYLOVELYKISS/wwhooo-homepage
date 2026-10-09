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
async function open(
  path,
  { viewport = { width: 1280, height: 800 }, javaScriptEnabled = true, hasTouch = false, colorScheme } = {},
) {
  const contextOptions = { viewport, javaScriptEnabled, hasTouch };
  if (colorScheme) contextOptions.colorScheme = colorScheme;
  const context = await browser.newContext(contextOptions);
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

test('the full-screen gate remains usable in short viewports', async () => {
  // 844x390 is a typical phone in landscape, and 844x330 a short laptop window.
  for (const viewport of [
    { width: 844, height: 390 },
    { width: 844, height: 330 },
    { width: 390, height: 844 },
    { width: 375, height: 667 },
    { width: 320, height: 568 },
    { width: 1280, height: 800 },
  ]) {
    const { context, page } = await open('/', { viewport });
    const gate = page.locator('#entry-gate');
    assert.ok(await gate.isVisible(), `gate hidden at ${viewport.width}x${viewport.height}`);
    assert.equal(await gate.getAttribute('tabindex'), '0');
    const box = await gate.boundingBox();
    assert.ok(box, `no gate bounding box at ${viewport.width}x${viewport.height}`);
    assert.equal(Math.round(box.x), 0);
    assert.equal(Math.round(box.y), 0);
    assert.equal(Math.round(box.width), viewport.width);
    assert.equal(Math.round(box.height), viewport.height);
    const progress = await page.locator('.gate-progress').boundingBox();
    assert.ok(progress, 'progress indicator must be present');
    assert.ok(progress.y + progress.height <= viewport.height, 'progress indicator is clipped');
    const languageLink = await page.locator('.gate-alt a').boundingBox();
    assert.ok(languageLink, 'gate language link must be present');
    assert.ok(
      languageLink.y + languageLink.height <= viewport.height,
      `gate language link is clipped at ${viewport.width}x${viewport.height}`,
    );
    if (viewport.width < 768) {
      assert.equal(await gate.evaluate((el) => getComputedStyle(el).touchAction), 'pinch-zoom');
    }
    await context.close();
  }
});

test('the page tracks light and dark system preference live', async () => {
  const { context, page } = await open('/', { colorScheme: 'light' });
  const snapshot = () =>
    page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const activeThemeColor = [...document.querySelectorAll('meta[name="theme-color"]')].find(
        (meta) => matchMedia(meta.getAttribute('media')).matches,
      );
      return {
        scheme: root.colorScheme,
        paper: root.getPropertyValue('--paper').trim(),
        body: getComputedStyle(document.body).backgroundColor,
        themeColor: activeThemeColor?.content,
      };
    });

  const light = await snapshot();
  assert.equal(light.scheme, 'light');
  assert.equal(light.paper, '#e1e9e4');
  assert.equal(light.themeColor, '#e1e9e4');

  await page.emulateMedia({ colorScheme: 'dark' });
  const dark = await snapshot();
  assert.equal(dark.scheme, 'dark');
  assert.equal(dark.paper, '#101513');
  assert.equal(dark.body, 'rgb(16, 21, 19)');
  assert.equal(dark.themeColor, '#101513');
  assert.notEqual(light.paper, dark.paper, 'the actual page palette must switch');

  await page.emulateMedia({ colorScheme: 'light' });
  assert.equal((await snapshot()).paper, light.paper, 'switching back to light must restore the light palette');
  await context.close();
});

test('manual theme modes override the system and persist', async () => {
  const { context, page } = await open('/', { colorScheme: 'dark' });
  await page.locator('[data-theme-control]').selectOption('light');
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()),
    '#e1e9e4',
  );
  assert.equal(await page.evaluate(() => localStorage.getItem('wwhooo-theme')), 'light');
  await page.reload();
  assert.equal(await page.locator('[data-theme-control]').inputValue(), 'light');
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()),
    '#e1e9e4',
  );
  await page.locator('[data-theme-control]').selectOption('dark');
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()),
    '#101513',
  );
  await page.locator('[data-theme-control]').selectOption('system');
  assert.equal(await page.evaluate(() => localStorage.getItem('wwhooo-theme')), 'system');
  await context.close();
});

test('mobile bottom actions do not overlap on Xiaomi-sized viewport', async () => {
  const { context, page } = await open('/', { viewport: { width: 393, height: 873 }, hasTouch: true });
  await page.locator('#entry-gate').click({ position: { x: 196, y: 436 } });
  await page.locator('footer a[href="#top"]').scrollIntoViewIfNeeded();
  const lock = await page.locator('.lock-button').boundingBox();
  const top = await page.locator('footer a[href="#top"]').boundingBox();
  assert.ok(lock && top, 'both bottom actions must be rendered');
  assert.ok(
    lock.y + lock.height + 8 <= top.y || top.y + top.height + 8 <= lock.y,
    'bottom actions must have a visible gap',
  );
  await context.close();
});
test('the search site works in both language trees', async () => {
  for (const path of ['/search/', '/en/search/']) {
    const { context, page } = await open(path);
    assert.equal(await page.locator('[data-search-form]').count(), 1);
    assert.equal(await page.locator('[data-search-provider]').count(), 4);
    assert.equal(await page.locator('[data-search-provider]:checked').inputValue(), 'https://www.google.com/search');
    const initialSubmit = await page.locator('[data-search-submit]').textContent();
    assert.equal(initialSubmit?.trim(), path.startsWith('/en/') ? 'Search with Google↗' : '使用 Google↗');
    await page.locator('[data-search-provider][value="https://www.bing.com/search"]').check();
    assert.equal(await page.locator('[data-search-form]').getAttribute('action'), 'https://www.bing.com/search');
    assert.ok(await page.locator('.search-provider-option.is-selected').filter({ hasText: 'Bing' }).count());
    assert.equal(
      (await page.locator('[data-search-submit]').textContent())?.trim(),
      path.startsWith('/en/') ? 'Search with Bing↗' : '使用 Bing↗',
    );
    await page.locator('input[name="q"]').fill('wwhooo');
    assert.equal(await page.locator('input[name="q"]').inputValue(), 'wwhooo');
    await context.close();
  }
});

test('the search page offers operator templates and keyboard shortcuts', async () => {
  const { context, page } = await open('/search/');
  const input = page.locator('#search-query');
  await page.keyboard.press('/');
  await expectFocused(page, '#search-query');
  await page.locator('.search-operators button').first().click();
  assert.equal(await input.inputValue(), 'site:developer.mozilla.org ');
  await page.keyboard.type('accessibility');
  assert.equal(await input.inputValue(), 'site:developer.mozilla.org accessibility');
  await page.keyboard.press('Escape');
  assert.equal(await input.inputValue(), '');
  assert.equal(await page.locator('.search-operators li').count(), 4);
  await context.close();
});

async function expectFocused(page, selector) {
  await page.waitForFunction((expected) => document.activeElement?.matches(expected), selector);
}
test('search controls remain responsive and progressively enhanced', async () => {
  const mobile = await open('/search/', { viewport: { width: 320, height: 568 } });
  const bounds = await mobile.page.locator('.search-panel').boundingBox();
  assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= 320, 'search panel must fit a narrow viewport');
  assert.equal(await mobile.page.locator('[data-search-form]').getAttribute('method'), 'get');
  assert.equal(await mobile.page.locator('[data-search-provider]').count(), 4);
  assert.equal(await mobile.page.locator('[data-search-form]').getAttribute('action'), 'https://www.google.com/search');
  await mobile.context.close();

  const noScript = await open('/search/', { javaScriptEnabled: false });
  assert.equal(await noScript.page.locator('[data-search-form]').getAttribute('method'), 'get');
  assert.equal(
    await noScript.page.locator('[data-search-form]').getAttribute('action'),
    'https://www.google.com/search',
  );
  assert.equal(await noScript.page.locator('[data-search-provider]').count(), 4);
  await noScript.context.close();
});

test('the dark palette is present in no-JS and standalone 404 experiences', async () => {
  const fallback = await open('/', { javaScriptEnabled: false, colorScheme: 'dark' });
  const fallbackColors = await fallback.page.evaluate(() => ({
    background: getComputedStyle(document.body).backgroundColor,
    color: getComputedStyle(document.querySelector('.boot-fallback') ?? document.body).color,
  }));
  assert.equal(fallbackColors.background, 'rgb(16, 21, 19)');
  assert.equal(fallbackColors.color, 'rgb(231, 239, 233)');
  await fallback.context.close();

  const notFound = await open('/404.html', { colorScheme: 'dark' });
  const colors = await notFound.page.evaluate(() => ({
    paper: getComputedStyle(document.documentElement).getPropertyValue('--paper').trim(),
    scheme: getComputedStyle(document.documentElement).colorScheme,
  }));
  assert.deepEqual(colors, { paper: '#101513', scheme: 'dark' });
  await notFound.context.close();
});

// ---------------------------------------------------------------------------
// The gate itself
// ---------------------------------------------------------------------------

test('clicking anywhere on the gate enters', async () => {
  const { context, page } = await open('/');
  assert.ok(await page.locator('#home-content').evaluate((el) => el.hasAttribute('inert')), 'content starts inert');
  assert.equal(await page.locator('#enter-button').count(), 0, 'the visible capsule must be removed');

  await page.locator('.gate-image').click();
  await page.waitForSelector('.engine-home.is-unlocked');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('wwhooo-entered')), '1');
  assert.ok(await page.locator('#home-content').evaluate((el) => !el.hasAttribute('inert')));
  assert.equal(await page.evaluate(() => document.body.classList.contains('is-locked')), false);
  await context.close();
});

test('the focused gate enters with Enter or Space', async () => {
  const { context, page } = await open('/');

  const gate = page.locator('#entry-gate');
  await gate.focus();
  await page.keyboard.press('Enter');
  await page.waitForSelector('.engine-home.is-unlocked');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('wwhooo-entered')), '1');
  // The gate is inert now, so focus must move into the revealed content.
  await page.waitForFunction(() => document.activeElement?.id === 'top');
  await context.close();

  const second = await open('/');
  await second.page.locator('#entry-gate').focus();
  await second.page.keyboard.press('Space');
  await second.page.waitForSelector('.engine-home.is-unlocked');
  await second.context.close();
});

test('the gate copy remains a working mouse-drag target', async () => {
  const { context, page } = await open('/');
  const box = await page.locator('.gate-copy').boundingBox();
  assert.ok(box, 'the gate copy must be present');

  const startX = box.x + box.width / 2;
  const startY = box.y + box.height * 0.82;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX, startY - 150, { steps: 10 });
  await page.mouse.up();

  await page.waitForSelector('.engine-home.is-unlocked');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('wwhooo-entered')), '1');
  await context.close();
});

test('a touch swipe anywhere on a mobile gate enters', async () => {
  const { context, page } = await open('/', {
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  const image = await page.locator('.gate-image').boundingBox();
  assert.ok(image, 'the gate image must be present');
  const startX = image.x + image.width / 2;
  const startY = image.y + image.height - 24;
  const cdp = await context.newCDPSession(page);

  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: startX, y: startY, id: 1 }],
  });
  for (let step = 1; step <= 10; step += 1) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: startX, y: startY - (160 * step) / 10, id: 1 }],
    });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });

  await page.waitForSelector('.engine-home.is-unlocked');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('wwhooo-entered')), '1');
  await context.close();
});

test('the whole screen is a swipe surface, not just the photograph', async () => {
  // A mouse drag on the photograph tests the full-bleed pointer target, not just copy.
  const { context, page } = await open('/');
  const image = await page.locator('.gate-image').boundingBox();
  assert.ok(image, 'the gate image must be present');

  const startX = image.x + image.width / 2;
  const startY = image.y + image.height - 40;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX, startY - 160, { steps: 12 });
  await page.mouse.up();

  await page.waitForSelector('.engine-home.is-unlocked');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('wwhooo-entered')), '1');
  await context.close();
});

test('the gate language link navigates without entering', async () => {
  const { context, page } = await open('/');
  await page.locator('.gate-alt a').click();
  await page.waitForURL('**/en/');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('wwhooo-entered')), null);
  assert.ok(await page.locator('#engine-home').evaluate((el) => el.classList.contains('is-locked')));
  await context.close();
});

test('the mouse wheel drives the entrance on desktop', async () => {
  const { context, page } = await open('/');
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 300);
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

test('no axe-core violations on public pages in both color schemes', async () => {
  const failures = [];
  const paths = [
    '/',
    '/en/',
    '/engine/',
    '/en/engine/',
    '/profile/',
    '/en/profile/',
    '/works/',
    '/en/works/',
    '/404.html',
  ];

  for (const colorScheme of ['light', 'dark']) {
    for (const path of paths) {
      const { context, page } = await open(path, { colorScheme });
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
          `${colorScheme} ${path} — [${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.join(' | ')})`,
        );
      }
      await context.close();
    }
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
