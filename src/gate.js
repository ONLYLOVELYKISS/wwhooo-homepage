// Sakura entry gate interaction.
//
// Replaces the previous `input[type=range]` hack. That control was keyboard
// hostile (85 arrow presses to reach the unlock threshold), used the
// Firefox-only `orient="vertical"` attribute, and had no visible focus ring.
// Here the gate is a real <button>: click / Enter / Space enters in one step,
// while pointer drag, touch swipe, and wheel remain as progressive enhancement.

import { clearEntered, hasEntered, markEntered } from './session.js';

/** Fraction of the drag travel that triggers the entrance. */
const THRESHOLD = 0.8;
/** Upward pointer travel, in px, that maps to a full swipe. */
const TRAVEL = 130;
/** Accumulated wheel delta, in px, that maps to a full swipe. */
const WHEEL_TRAVEL = 320;

export function initGate() {
  const gate = document.querySelector('#entry-gate');
  const capsule = document.querySelector('#enter-button');
  const home = document.querySelector('#engine-home');
  const content = document.querySelector('#home-content');
  const lockButton = document.querySelector('#lock-entry');
  if (!gate || !capsule || !home) return;

  let entered = hasEntered();
  let ratio = 0;
  let pointerId = null;
  let startY = 0;
  let wheelAcc = 0;
  let wheelTimer = 0;
  let suppressClickUntil = 0;

  const paint = () => {
    capsule.style.setProperty('--swipe-ratio', String(ratio));
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
    document.body.classList.toggle('is-locked', !entered);
  };

  const unlock = () => {
    if (entered) return;
    entered = true;
    ratio = 1;
    paint();
    markEntered();
    applyLockedState();
    // Hand focus to the revealed content: the gate is inert now, so leaving
    // focus on the button would strand keyboard and screen reader users.
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
    requestAnimationFrame(() => capsule.focus({ preventScroll: true }));
  };

  // ------------------------------------------------------- pointer dragging
  const beginDrag = (event) => {
    if (entered || pointerId !== null) return;
    pointerId = event.pointerId;
    startY = event.clientY;
    suppressClickUntil = 0;
    event.currentTarget.setPointerCapture?.(pointerId);
    capsule.classList.add('is-dragging');
  };

  const moveDrag = (event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    if (Math.abs(event.clientY - startY) > 6) suppressClickUntil = Date.now() + 400;
    setRatio((startY - event.clientY) / TRAVEL);
  };

  const endDrag = (event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    pointerId = null;
    capsule.classList.remove('is-dragging');
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (ratio < THRESHOLD) reset();
  };

  for (const target of [capsule, gate]) {
    target.addEventListener('pointerdown', (event) => {
      // Touch and pen may start the swipe anywhere on the gate; the mouse only
      // drags the capsule so text selection elsewhere keeps working.
      if (event.pointerType === 'mouse' && event.currentTarget === gate) return;
      if (event.currentTarget === gate && event.target.closest?.('.swipe-capsule')) return;
      beginDrag(event);
    });
    target.addEventListener('pointermove', moveDrag);
    target.addEventListener('pointerup', endDrag);
    target.addEventListener('pointercancel', endDrag);
  }

  // Click / Enter / Space: the accessible, one-step entrance. Suppressed right
  // after a real drag so releasing a half-finished swipe does not also unlock.
  capsule.addEventListener('click', () => {
    if (entered || Date.now() < suppressClickUntil) return;
    unlock();
  });

  // ------------------------------------------------------------ wheel assist
  gate.addEventListener(
    'wheel',
    (event) => {
      if (entered) return;
      // When the gate has to scroll (short or landscape viewports) the wheel
      // belongs to the reader, not to the entrance gesture.
      if (gate.scrollHeight > gate.clientHeight + 4) return;
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
