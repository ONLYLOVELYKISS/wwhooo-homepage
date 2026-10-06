import './style.css';
import { categoryLabels, links, navItems } from './data.js';

const projects = [
  { title: '个人网站', description: '以公开表达为主线，持续整理项目、技术实践与正在思考的事情。', tags: ['HTML', 'CSS', 'Cloudflare'], link: 'https://github.com/ONLYLOVELYKISS/onlylovelykiss.github.io' },
  { title: 'TOY', description: '来源于 AI 与互联网的 Python 实验场，把想法变成可以运行的小工具。', tags: ['Python', 'AI', 'Experiments'], link: 'https://github.com/ONLYLOVELYKISS/TOY' },
  { title: 'chaoxing-sign-cli', description: '面向具体使用场景的自动化工具，探索签到、监测与消息推送。', tags: ['TypeScript', 'CLI', 'Automation'], link: 'https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli' },
];

const app = document.querySelector('#app');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const savedTheme = localStorage.getItem('wwhooo-theme');
const savedFavorites = JSON.parse(localStorage.getItem('wwhooo-favorites') || '[]');
let activeCategory = 'all';
let showFavorites = false;
let query = '';

app.innerHTML = `
  <header class="nav shell">
    <a class="brand" href="#top" aria-label="返回首页"><span>W</span> wwhooo</a>
    <button class="theme-toggle" type="button" aria-label="切换颜色主题" aria-pressed="false">☼</button>
    <nav aria-label="主导航"><a href="#workspace">导航</a><a href="#about">关于</a><a href="#projects">项目</a></nav>
  </header>
  <main id="top">
    <section class="hero shell"><div class="hero-copy"><p class="eyebrow">PERSONAL WORKSPACE / 2026</p><h1>把想法做成<br /><em>可以使用的东西。</em></h1><p class="lead">你好，我是 Linn。一名关注个人项目、实用工具和跨技术栈实践的开发者。</p><div class="actions"><a class="button button-primary" href="#workspace">打开导航 <span>↘</span></a><a class="button button-ghost" href="https://github.com/ONLYLOVELYKISS" target="_blank" rel="noreferrer">GitHub ↗</a></div></div><div class="hero-art" aria-hidden="true"><div class="orb orb-large"></div><div class="orb orb-small"></div><div class="art-label">STAY<br />CURIOUS</div><div class="art-line"></div></div></section>
    <section class="ticker" aria-label="关键词"><div class="ticker-track">BUILD WITH INTENT <span>✦</span> SMALL TOOLS, REAL USE <span>✦</span> KEEP EXPLORING <span>✦</span> BUILD WITH INTENT <span>✦</span></div></section>
    <section class="workspace shell" id="workspace">
      <div class="workspace-head"><div><p class="eyebrow">01 / WORKSPACE</p><h2>我的<span>导航台。</span></h2></div><p class="workspace-note">把常用的项目、资料、工具和灵感放在同一个可搜索的入口。</p></div>
      <div class="workspace-tools"><label class="search-box"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="搜索导航..." aria-label="搜索导航" autocomplete="off" /><kbd>/</kbd></label><button class="favorite-filter" id="favorite-filter" type="button" aria-pressed="false">☆ 只看收藏</button></div>
      <div class="category-tabs" role="tablist" aria-label="导航分类">${navItems.map((item) => `<button class="category-tab${item.id === 'all' ? ' is-active' : ''}" type="button" role="tab" data-category="${item.id}" aria-selected="${item.id === 'all'}">${item.label}</button>`).join('')}</div>
      <div class="quick-row"><span class="quick-label">QUICK ACCESS</span><a href="https://github.com/ONLYLOVELYKISS" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://wwhooo.com" target="_blank" rel="noreferrer">wwhooo.com ↗</a><button id="random-link" type="button">随机探索 ✦</button></div>
      <div class="link-grid" id="link-grid" aria-live="polite"></div><p class="empty-state" id="empty-state" hidden>没有匹配的导航。试试其他关键词，或清除收藏筛选。</p>
    </section>
    <section class="section shell about" id="about"><div class="section-heading"><p class="eyebrow">02 / ABOUT</p><h2>持续构建，<br /><span>保持好奇。</span></h2></div><div class="about-copy"><p>我喜欢从真实需求出发，做网站、脚本和小型工具。技术栈不是边界，而是解决问题时可以拿起的工具箱。</p><p>这里是我的公开工作台：记录正在做的项目，也记录那些暂时还没有答案的想法。</p></div></section>
    <section class="section shell" id="projects"><div class="section-heading projects-heading"><p class="eyebrow">03 / SELECTED WORK</p><h2>一些正在<br /><span>发生的项目。</span></h2></div><div class="project-list">${projects.map((project, index) => `<a class="project-card" href="${project.link}" target="_blank" rel="noreferrer"><div class="project-number">0${index + 1}</div><div class="project-content"><h3>${project.title} <span>↗</span></h3><p>${project.description}</p><div class="tags">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div></a>`).join('')}</div></section>
    <section class="section shell contact" id="contact"><p class="eyebrow">04 / SAY HELLO</p><h2>有想法，<br /><span>就开始做。</span></h2><a class="contact-link" href="mailto:hello@wwhooo.com">hello@wwhooo.com <span>↗</span></a></section>
  </main>
  <footer class="footer shell"><span>© ${new Date().getFullYear()} Linn</span><span>西安 · 中国</span><a href="#top">回到顶部 ↑</a></footer>
`;

const grid = document.querySelector('#link-grid');
const emptyState = document.querySelector('#empty-state');
const search = document.querySelector('#search');
const favoriteFilter = document.querySelector('#favorite-filter');

function renderLinks() {
  const normalizedQuery = query.trim().toLowerCase();
  const visibleLinks = links.filter((link) => {
    const matchesCategory = activeCategory === 'all' || link.category === activeCategory;
    const matchesFavorite = !showFavorites || savedFavorites.includes(link.id);
    const haystack = [link.title, link.description, categoryLabels[link.category], ...link.tags].join(' ').toLowerCase();
    return matchesCategory && matchesFavorite && (!normalizedQuery || haystack.includes(normalizedQuery));
  });
  grid.innerHTML = visibleLinks.map((link, index) => `<article class="link-card"><a href="${link.url}" target="_blank" rel="noreferrer"><span class="link-index">${String(index + 1).padStart(2, '0')}</span><span class="link-main"><strong>${link.title} <span>↗</span></strong><small>${link.description}</small><span class="link-tags">${link.tags.map((tag) => `<i>${tag}</i>`).join('')}</span></span></a><button class="star-button${savedFavorites.includes(link.id) ? ' is-favorite' : ''}" type="button" data-favorite="${link.id}" aria-label="${savedFavorites.includes(link.id) ? '取消收藏' : '收藏'} ${link.title}" aria-pressed="${savedFavorites.includes(link.id)}">${savedFavorites.includes(link.id) ? '★' : '☆'}</button></article>`).join('');
  emptyState.hidden = visibleLinks.length > 0;
  grid.querySelectorAll('[data-favorite]').forEach((button) => button.addEventListener('click', () => toggleFavorite(button.dataset.favorite)));
}

function toggleFavorite(id) {
  const index = savedFavorites.indexOf(id);
  if (index === -1) savedFavorites.push(id); else savedFavorites.splice(index, 1);
  localStorage.setItem('wwhooo-favorites', JSON.stringify(savedFavorites));
  renderLinks();
}

document.querySelectorAll('.category-tab').forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.category; document.querySelectorAll('.category-tab').forEach((tab) => { const active = tab === button; tab.classList.toggle('is-active', active); tab.setAttribute('aria-selected', String(active)); }); renderLinks(); }));
search.addEventListener('input', (event) => { query = event.target.value; renderLinks(); });
favoriteFilter.addEventListener('click', () => { showFavorites = !showFavorites; favoriteFilter.classList.toggle('is-active', showFavorites); favoriteFilter.setAttribute('aria-pressed', String(showFavorites)); renderLinks(); });
document.querySelector('#random-link').addEventListener('click', () => { const pool = links.filter((link) => activeCategory === 'all' || link.category === activeCategory); const link = pool[Math.floor(Math.random() * pool.length)]; window.open(link.url, '_blank', 'noopener,noreferrer'); });
document.addEventListener('keydown', (event) => { if (event.key === '/' && document.activeElement !== search) { event.preventDefault(); search.focus(); } if (event.key === 'Escape' && document.activeElement === search) { search.value = ''; query = ''; renderLinks(); search.blur(); } });

const themeToggle = document.querySelector('.theme-toggle');
if (savedTheme === 'light') document.body.classList.add('light');
function updateThemeButton() { const isLight = document.body.classList.contains('light'); themeToggle.textContent = isLight ? '☾' : '☼'; themeToggle.setAttribute('aria-pressed', String(isLight)); }
themeToggle.addEventListener('click', () => { document.body.classList.toggle('light'); localStorage.setItem('wwhooo-theme', document.body.classList.contains('light') ? 'light' : 'dark'); updateThemeButton(); });
updateThemeButton();
if (prefersReducedMotion) document.documentElement.classList.add('reduced-motion');
renderLinks();
