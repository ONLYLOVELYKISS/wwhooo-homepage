// Sakura entry gate interaction.
//
// There is no visible button any more: the whole screen is one gesture surface.
// Swipe up anywhere (touch / pen / mouse drag), scroll the wheel on desktop,
// click anywhere, or focus the gate and press Enter — any of them enters. The
// gate stays keyboard-accessible because it is itself a focusable, labelled
// element, not a dead region with a hidden button.

import { clearEntered, hasEntered, markEntered } from './session.js';

/** Fraction of the drag travel that triggers the entrance. */
const THRESHOLD = 0.8;
/** Upward pointer travel, in px, that maps to a full swipe. */
const TRAVEL = 130;
/** Accumulated wheel delta, in px, that maps to a full swipe. */
const WHEEL_TRAVEL = 280;

export function initGate() {
  const gate = document.querySelector('#entry-gate');
  const home = document.querySelector('#engine-home');
  const content = document.querySelector('#home-content');
  const lockButton = document.querySelector('#lock-entry');
  if (!gate || !home) return;

  // Everything that sits behind the opaque overlay. The gate covers the page
  // visually, but without this the header, footer and skip link stay in the tab
  // order — a keyboard user tabs into links they cannot see. Measured with
  // Playwright: Tab used to walk skip-link → brand → every nav item → language.
  const behindGate = [
    document.querySelector('.skip-link'),
    document.querySelector('.site-header'),
    document.querySelector('footer'),
  ];

  let entered = hasEntered();
  let ratio = 0;
  let pointerId = null;
  let startY = 0;
  let wheelAcc = 0;
  let wheelTimer = 0;
  let suppressClickUntil = 0;

  const paint = () => {
    gate.style.setProperty('--swipe-ratio', String(ratio));
  };

  const applyLockedState = () => {
    // Use the content attribute explicitly rather than the reflected `inert`
    // property: the attribute is what the HTML ships with, and toggling it by
    // hand keeps the DOM state readable in devtools.
    const setInert = (el, on) => {
      if (!el) return;
      if (on) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    };
    setInert(gate, entered);
    gate.classList.toggle('gate-complete', entered);
    home.classList.toggle('is-unlocked', entered);
    home.classList.toggle('is-locked', !entered);
    setInert(content, !entered);
    if (content) content.setAttribute('aria-hidden', String(!entered));
    for (const el of behindGate) setInert(el, !entered);
    document.body.classList.toggle('is-locked', !entered);
    // Keeps the pre-paint stylesheet rule in index.html in sync: `entered`
    // hides the gate so a reload never flashes it, and must be removed again
    // when the visitor chooses to re-enter.
    document.documentElement.classList.toggle('entered', entered);
  };

  const unlock = () => {
    if (entered) return;
    entered = true;
    ratio = 1;
    paint();
    markEntered();
    applyLockedState();
    // Hand focus to the revealed content: the gate is inert now, so leaving
    // focus on the former gate target would strand keyboard and screen reader users.
    requestAnimationFrame(() => {
      document.querySelector('#top')?.focus({ preventScroll: true });
    });
  };

  const reset = () => {
    ratio = 0;
    wheelAcc = 0;
    paint();
  };

  const setRatio = (value) => {
    ratio = Math.max(0, Math.min(1, value));
    paint();
    if (ratio >= THRESHOLD) unlock();
  };

  const lock = () => {
    entered = false;
    clearEntered();
    reset();
    applyLockedState();
    requestAnimationFrame(() => gate.focus({ preventScroll: true }));
  };

  // ------------------------------------------------------- pointer dragging
  const beginDrag = (event) => {
    if (entered || pointerId !== null || event.target.closest?.('a')) return;
    pointerId = event.pointerId;
    startY = event.clientY;
    suppressClickUntil = 0;
    event.currentTarget.setPointerCapture?.(pointerId);
  };

  const moveDrag = (event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    if (Math.abs(event.clientY - startY) > 6) suppressClickUntil = Date.now() + 400;
    setRatio((startY - event.clientY) / TRAVEL);
  };

  const endDrag = (event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    pointerId = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (ratio < THRESHOLD) reset();
  };

  // The whole gate is one gesture surface: touch, pen and mouse may all start a
  // swipe from any point.
  gate.addEventListener('pointerdown', beginDrag);
  gate.addEventListener('pointermove', moveDrag);
  gate.addEventListener('pointerup', endDrag);
  gate.addEventListener('pointercancel', endDrag);

  // Click anywhere enters — the whole screen is the target, no capsule needed.
  // Suppressed right after a real drag so releasing a half-finished swipe does
  // not also unlock, and it defers to the language link when that is the target.
  gate.addEventListener('click', (event) => {
    if (entered || Date.now() < suppressClickUntil) return;
    if (event.target.closest?.('a')) return;
    unlock();
  });

  // Keyboard: focus the gate (the first stop in the locked tab order) and press
  // Enter or Space. The guard keeps the language link's own Enter from entering.
  gate.addEventListener('keydown', (event) => {
    if (entered || event.target !== gate) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      unlock();
    }
  });

  // ------------------------------------------------------------ wheel assist
  // On the desktop the mouse wheel is the primary gesture: accumulate its delta
  // into the same ratio the drags use, so scrolling down fills the progress bar
  // and enters. The gate never scrolls (overflow: hidden), so there is no
  // ambiguity between "scroll the page" and "enter the engine".
  gate.addEventListener(
    'wheel',
    (event) => {
      if (entered) return;
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : 0;
      if (!delta) return;
      wheelAcc = Math.max(0, wheelAcc + delta);
      setRatio(wheelAcc / WHEEL_TRAVEL);
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        if (ratio < THRESHOLD) reset();
      }, 360);
    },
    { passive: true },
  );

  lockButton?.addEventListener('click', lock);

  applyLockedState();
  paint();
}
