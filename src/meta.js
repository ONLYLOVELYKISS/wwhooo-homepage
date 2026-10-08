// Route definitions: the single source of truth for URLs, languages and
// per-page metadata.
//
// Kept free of DOM and browser APIs so it can be imported by the client router,
// the views, the tests and the static route generator (scripts/build-routes.mjs).
//
// Bilingual SEO model: every route exists as two real URLs. `/engine/` is the
// Chinese page, `/en/engine/` the English one, and both carry reciprocal
// hreflang alternates plus x-default. The URL — not localStorage — decides which
// language renders, which is what makes the English content indexable.

const l = (zh, en) => ({ zh, en });

export const SITE_URL = 'https://wwhooo.com';

export const LANGS = ['zh', 'en'];

/** BCP 47 tags for <html lang> and hreflang. */
export const HTML_LANG = { zh: 'zh-CN', en: 'en' };
export const OG_LOCALE = { zh: 'zh_CN', en: 'en_US' };

export const otherLang = (lang) => (lang === 'zh' ? 'en' : 'zh');

/** Mirror a default-language path into the /en tree. */
const enPath = (base) => (base === '/' ? '/en/' : `/en${base}`);

export const ROUTE_DEFS = [
  {
    id: 'home',
    path: { zh: '/', en: enPath('/') },
    title: l('Linn — 值得留下的东西', 'Linn — Things worth keeping'),
    description: l(
      'Linn 的个人主页：摄影、软件项目、个人档案与常用工具。',
      'Linn’s personal homepage: photography, software projects, profile, and everyday tools.',
    ),
  },
  {
    id: 'engine',
    path: { zh: '/engine/', en: enPath('/engine/') },
    title: l('工具 — Linn', 'Tools — Linn'),
    description: l('常用工具入口：搜索、构建、AI 与调试。', 'Everyday tools: search, build, AI, and debugging.'),
  },
  {
    id: 'profile',
    path: { zh: '/profile/', en: enPath('/profile/') },
    title: l('档案 — Linn', 'Profile — Linn'),
    description: l(
      '关于 Linn：个人网站、自动化工具与跨技术栈实验。',
      'About Linn: personal websites, automation, and experiments across stacks.',
    ),
  },
  {
    id: 'works',
    path: { zh: '/works/', en: enPath('/works/') },
    title: l('作品与记录 — Linn', 'Works & notes — Linn'),
    description: l('软件项目与摄影作品。', 'Software projects and photographs.'),
  },
  {
    id: 'search',
    path: { zh: '/search/', en: enPath('/search/') },
    title: l('搜索 — Linn', 'Search — Linn'),
    description: l('在常用搜索引擎之间切换，快速开始搜索。', 'Switch search engines and start searching quickly.'),
  },
  // Placeholder subsites: thin content, so they are kept out of the index and
  // out of sitemap.xml until they hold something real. Flip `noindex` off and
  // the sitemap picks them up on the next build.
  {
    id: 'toy',
    path: { zh: '/toy/', en: enPath('/toy/') },
    title: l('TOY 实验场 — Linn', 'TOY Lab — Linn'),
    description: l('阶段性实验、脚本和可以运行的小想法。', 'Experiments, scripts, and small ideas that actually run.'),
    noindex: true,
  },
  {
    id: 'notes',
    path: { zh: '/notes/', en: enPath('/notes/') },
    title: l('夜间札记 — Linn', 'Night Notes — Linn'),
    description: l('观察、片段和还没有结论的想法。', 'Observations, fragments, and thoughts without conclusions yet.'),
    noindex: true,
  },
];

export const FALLBACK_META = {
  title: l('页面不存在 — Linn', 'Page not found — Linn'),
  description: l('这个地址没有对应的内容。', 'This address has no matching content.'),
  noindex: true,
};

const BY_ID = new Map(ROUTE_DEFS.map((def) => [def.id, def]));

/** path -> { id, lang }. Includes both language trees. */
export const ROUTE_BY_PATH = new Map();
for (const def of ROUTE_DEFS) {
  for (const lang of LANGS) ROUTE_BY_PATH.set(def.path[lang], { id: def.id, lang });
}

/** Every path that exists as a real static file after a build. */
export const ALL_PATHS = ROUTE_DEFS.flatMap((def) => LANGS.map((lang) => def.path[lang]));

/** Paths advertised to crawlers in sitemap.xml. */
export const INDEXABLE_PATHS = ROUTE_DEFS.filter((def) => !def.noindex).flatMap((def) =>
  LANGS.map((lang) => def.path[lang]),
);

export const getRouteDef = (id) => BY_ID.get(id) ?? null;

/** Path for a route id in a given language. */
export const pathFor = (id, lang) => BY_ID.get(id)?.path[lang === 'en' ? 'en' : 'zh'] ?? null;

export const resolveRoute = (path) => ROUTE_BY_PATH.get(path) ?? null;

/**
 * Which language a pathname belongs to. Used for unknown paths so that a 404
 * under /en/ still renders in English.
 */
export const inferLang = (path) => (path === '/en/' || path.startsWith('/en/') ? 'en' : 'zh');

/**
 * Normalise a pathname to a key usable in ROUTE_BY_PATH: strips a trailing
 * `/index.html` and forces exactly one trailing slash.
 */
export function normalizePath(pathname) {
  const stripped = pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '');
  return stripped === '' ? '/' : `${stripped}/`;
}

/** The three hreflang alternates a page must advertise, for a given route id. */
export function alternatesFor(id) {
  const def = BY_ID.get(id);
  if (!def) return [];
  return [
    { hreflang: HTML_LANG.zh, href: `${SITE_URL}${def.path.zh}` },
    { hreflang: HTML_LANG.en, href: `${SITE_URL}${def.path.en}` },
    { hreflang: 'x-default', href: `${SITE_URL}${def.path.zh}` },
  ];
}
