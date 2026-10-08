// Application bootstrap. Rendering lives in ./router.js and ./views.js;
// interaction wiring lives in ./gate.js and initRail() below.
//
// There is no language handler here any more: the language control is a plain
// link to the counterpart URL (`/engine/` <-> `/en/engine/`), so it is handled
// by the router like any other internal link — and it works without JavaScript.

import './style.css';
import { initGate } from './gate.js';
import { initLinks, mount, onAfterRender } from './router.js';

/**
 * Let the library rail borrow the vertical wheel, but only while it can still
 * move that way. Previously the handler swallowed every wheel event over the
 * rail, so the page appeared frozen whenever the cursor rested on a card.
 */
function initRail() {
  const rail = document.querySelector('.library-rail');
  if (!rail) return;
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
  initGate();
  initRail();
}

onAfterRender(initInteractions);
initLinks();
mount();
