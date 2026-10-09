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
let themeReady = false;

function applyTheme(theme) {
  const selected = VALID_THEMES.has(theme) ? theme : 'system';
  document.documentElement.dataset.theme = selected;
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
  const stored = localStorage.getItem(THEME_STORAGE_KEY) ?? 'system';
  applyTheme(stored);
  if (themeReady) return;
  themeReady = true;
  document.addEventListener('change', (event) => {
    const control = event.target.closest?.('[data-theme-control]');
    if (!control) return;
    const selected = applyTheme(control.value);
    localStorage.setItem(THEME_STORAGE_KEY, selected);
  });
}

let searchShortcutReady = false;

function initSearch() {
  const form = document.querySelector('[data-search-form]');
  const input = form?.querySelector('input[name="q"]');
  const providers = form?.querySelectorAll('[data-search-provider]');
  if (!form || !input || !providers?.length || form.dataset.ready) return;
  form.dataset.ready = 'true';
  const submit = form.querySelector('[data-search-submit]');
  const syncProvider = (provider) => {
    form.action = provider.value;
    providers.forEach((option) => option.closest('label')?.classList.toggle('is-selected', option === provider));
    if (submit)
      submit.firstChild.textContent = `${document.documentElement.lang === 'en' ? 'Search with' : '使用'} ${provider.closest('label')?.querySelector('span')?.textContent ?? 'Google'}`;
  };
  providers.forEach((provider) => provider.addEventListener('change', () => syncProvider(provider)));
  syncProvider(form.querySelector('[data-search-provider]:checked') ?? providers[0]);
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
  if (!searchShortcutReady) {
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
    searchShortcutReady = true;
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
}

onAfterRender(initInteractions);
initLinks();
mount();
