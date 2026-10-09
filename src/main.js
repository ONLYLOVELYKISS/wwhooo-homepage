// Application bootstrap. Rendering lives in ./router.js and ./views.js;
// interaction wiring lives in ./gate.js and initRail() below.
//
// There is no language handler here any more: the language control is a plain
// link to the counterpart URL (`/engine/` <-> `/en/engine/`), so it is handled
// by the router like any other internal link — and it works without JavaScript.

import './style.css';
import { initGate } from './gate.js';
import { initLinks, mount, onAfterRender } from './router.js';

const THEME_STORAGE_KEY = 'wwhooo-theme';
const VALID_THEMES = new Set(['system', 'light', 'dark']);
const LIGHT_THEME_COLOR = '#e1e9e4';
const DARK_THEME_COLOR = '#101513';
const searchReady = { click: false, keydown: false };
let themeReady = false;

function syncThemeColor(theme) {
  const light = document.querySelector('meta[data-theme-color="light"]');
  const dark = document.querySelector('meta[data-theme-color="dark"]');
  if (!light || !dark) return;
  light.content = LIGHT_THEME_COLOR;
  dark.content = DARK_THEME_COLOR;
  if (theme === 'light') {
    light.media = '';
    dark.media = 'not all';
  } else if (theme === 'dark') {
    light.media = 'not all';
    dark.media = '';
  } else {
    light.media = '(prefers-color-scheme: light)';
    dark.media = '(prefers-color-scheme: dark)';
  }
}

function applyTheme(theme) {
  const selected = VALID_THEMES.has(theme) ? theme : 'system';
  document.documentElement.dataset.theme = selected;
  syncThemeColor(selected);
  document.querySelectorAll('[data-theme-control]').forEach((control) => {
    try {
      control.value = selected;
    } catch {
      // A non-browser test double may expose a read-only value property.
    }
  });
  return selected;
}

function initTheme() {
  let stored = document.documentElement.dataset.theme ?? 'system';
  try {
    stored = localStorage.getItem(THEME_STORAGE_KEY) ?? stored;
  } catch {
    // Storage may be blocked; theme and other interactions must still work.
  }
  applyTheme(stored);
  if (themeReady) return;
  themeReady = true;
  document.addEventListener('change', (event) => {
    const control = event.target.closest?.('[data-theme-control]');
    if (!control) return;
    const selected = applyTheme(control.value);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, selected);
    } catch {
      // Keep the choice for this document even when it cannot be persisted.
    }
  });
}

function initEngineFilter() {
  const input = document.querySelector('[data-tool-filter]');
  const entries = [...document.querySelectorAll('[data-tool-entry]')];
  if (!input || !entries.length || input.dataset.ready) return;
  input.dataset.ready = 'true';
  const empty = document.querySelector('[data-tool-filter-empty]');
  const count = document.querySelector('[data-tool-filter-count]');
  const update = () => {
    const query = input.value.trim().toLowerCase();
    let visible = 0;
    entries.forEach((entry) => {
      const match = !query || entry.dataset.toolSearch?.includes(query);
      entry.hidden = !match;
      if (match) visible += 1;
    });
    document.querySelectorAll('[data-tool-group]').forEach((group) => {
      group.hidden = !group.querySelector('[data-tool-entry]:not([hidden])');
    });
    if (empty) empty.hidden = visible > 0;
    if (count) count.textContent = query ? `${visible}/${entries.length}` : '';
  };
  input.addEventListener('input', update);
  update();
}

function initSearchRoutes() {
  const form = document.querySelector('[data-search-form]');
  const input = form?.querySelector('input[name="q"]');
  if (!form || !input) return;
  document.querySelectorAll('[data-search-route]').forEach((button) => {
    if (button.dataset.ready) return;
    button.dataset.ready = 'true';
    button.addEventListener('click', () => {
      const value = input.value.trim();
      if (!value) {
        input.focus();
        return;
      }
      const route = button.dataset.searchRoute;
      const param = button.dataset.searchParam ?? 'q';
      const url = new URL(route);
      url.searchParams.set(param, value);
      window.open(url, '_blank', 'noopener');
    });
  });
}

function initSearch() {
  const form = document.querySelector('[data-search-form]');
  const input = form?.querySelector('input[name="q"]');
  const providers = form?.querySelectorAll('[data-search-provider]');
  if (!form || !input || !providers?.length || form.dataset.ready) return;
  form.dataset.ready = 'true';
  providers.forEach((provider) => {
    provider.disabled = false;
  });
  const submit = form.querySelector('[data-search-submit]');
  const syncProvider = (provider) => {
    form.action = provider.value;
    providers.forEach((option) => option.closest('label')?.classList.toggle('is-selected', option === provider));
    if (submit)
      submit.firstChild.textContent = `${document.documentElement.lang === 'en' ? 'Search with' : '使用'} ${provider.closest('label')?.querySelector('span')?.textContent ?? 'Google'}`;
  };
  providers.forEach((provider) => provider.addEventListener('change', () => syncProvider(provider)));
  syncProvider(form.querySelector('[data-search-provider]:checked') ?? providers[0]);
  if (!searchReady.click) {
    document.addEventListener('click', (event) => {
      const button = event.target.closest?.('[data-query-template]');
      if (!button) return;
      const currentInput = document.querySelector('[data-search-form] input[name="q"]');
      if (!currentInput) return;
      const template = button.getAttribute('data-query-template') ?? '';
      currentInput.value = `${template} `;
      currentInput.focus();
      currentInput.setSelectionRange(currentInput.value.length, currentInput.value.length);
    });
    searchReady.click = true;
  }
  if (!searchReady.keydown) {
    document.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      const editing =
        target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if (event.key === '/' && !editing) {
        const currentInput = document.querySelector('[data-search-form] input[name="q"]');
        if (!currentInput) return;
        event.preventDefault();
        currentInput.focus();
      } else if (event.key === 'Escape' && target.matches?.('[data-search-form] input[name="q"]')) {
        target.value = '';
      }
    });
    searchReady.keydown = true;
  }
  form.addEventListener('submit', (event) => {
    if (input.value.trim()) return;
    event.preventDefault();
    input.focus();
  });
}

/**
 * Let the library rail borrow the vertical wheel, but only while it can still
 * move that way. Previously the handler swallowed every wheel event over the
 * rail, so the page appeared frozen whenever the cursor rested on a card.
 */
function initRail() {
  const rail = document.querySelector('.library-rail');
  if (!rail || rail.dataset.ready) return;
  rail.dataset.ready = 'true';
  rail.addEventListener(
    'wheel',
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return; // native horizontal scroll
      const max = rail.scrollWidth - rail.clientWidth;
      if (max <= 0) return;
      const atStart = rail.scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = rail.scrollLeft >= max - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      rail.scrollLeft += event.deltaY;
    },
    { passive: false },
  );
}

function initInteractions() {
  initTheme();
  initGate();
  initRail();
  initSearch();
  initEngineFilter();
  initSearchRoutes();
}

onAfterRender(initInteractions);
initLinks();
mount();
