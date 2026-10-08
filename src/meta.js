// Per-route document metadata.
//
// Kept free of DOM and browser APIs so it can be imported by both the client
// router and the static route generator (scripts/build-routes.mjs).

const l = (zh, en) => ({ zh, en });

export const HOME_META = {
  title: l('Linn — 值得留下的东西', 'Linn — Things worth keeping'),
  description: l(
    'Linn 的个人主页：摄影、软件项目、个人档案与常用工具。',
    'Linn’s personal homepage: photography, software projects, profile, and everyday tools.',
  ),
};

export const FALLBACK_META = {
  title: l('页面不存在 — Linn', 'Page not found — Linn'),
  description: l('这个地址没有对应的内容。', 'This address has no matching content.'),
  noindex: true,
};

export const ROUTE_META = {
  '/': HOME_META,
  '/engine/': {
    title: l('工具 — Linn', 'Tools — Linn'),
    description: l('常用工具入口：搜索、构建、AI 与调试。', 'Everyday tools: search, build, AI, and debugging.'),
  },
  '/profile/': {
    title: l('档案 — Linn', 'Profile — Linn'),
    description: l(
      '关于 Linn：个人网站、自动化工具与跨技术栈实验。',
      'About Linn: personal websites, automation, and experiments across stacks.',
    ),
  },
  '/works/': {
    title: l('作品与记录 — Linn', 'Works & notes — Linn'),
    description: l('软件项目与摄影作品。', 'Software projects and photographs.'),
  },
  // Placeholder subsites: thin content, kept out of the index until they hold
  // something real. They are also excluded from sitemap.xml.
  '/toy/': {
    title: l('TOY 实验场 — Linn', 'TOY Lab — Linn'),
    description: l(
      '阶段性实验、脚本和可以运行的小想法。',
      'Experiments, scripts, and small ideas that actually run.',
    ),
    noindex: true,
  },
  '/notes/': {
    title: l('夜间札记 — Linn', 'Night Notes — Linn'),
    description: l(
      '观察、片段和还没有结论的想法。',
      'Observations, fragments, and thoughts without conclusions yet.',
    ),
    noindex: true,
  },
};

/** Paths that exist as real static files after a build. */
export const ROUTE_PATHS = Object.keys(ROUTE_META);

/** Paths advertised to crawlers in sitemap.xml. */
export const INDEXABLE_PATHS = ROUTE_PATHS.filter((path) => !ROUTE_META[path].noindex);

export const SITE_URL = 'https://wwhooo.com';
