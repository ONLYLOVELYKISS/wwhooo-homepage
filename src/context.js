// Render context: which language and which route the current document is
// rendering. Set by the router before every render and read by the views and
// the copy layer, which keeps both free of routing concerns.
//
// The language comes from the URL, never from localStorage — that is what makes
// the English tree a real, crawlable set of pages instead of a client-side
// preference that search engines never see.

import { HTML_LANG } from './meta.js';

let lang = 'zh';
let routeId = null;

export const getLang = () => lang;
export const getRouteId = () => routeId;

export function setContext(nextLang, nextRouteId) {
  lang = nextLang === 'en' ? 'en' : 'zh';
  routeId = nextRouteId ?? null;

  // Guarded so this module (and everything importing it) can be imported in
  // Node for unit tests and static route generation.
  if (typeof document !== 'undefined') {
    document.documentElement.lang = HTML_LANG[lang];
  }
  return lang;
}
