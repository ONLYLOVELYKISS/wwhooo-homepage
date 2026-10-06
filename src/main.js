import './style.css';
import { categories, categoryLabels, focus, intents, links, projects, timeline } from './data.js';

const STORAGE_KEY = 'wwhooo-workspace-v2';
const defaults = { version: 2, favorites: [], pinned: [], recent: [], theme: 'dark' };
const app = document.querySelector('#app');
const storage = (() => { try { const key = '__wwhooo__'; localStorage.setItem(key, '1'); localStorage.removeItem(key); return localStorage; } catch { return null; } })();
let state = { ...defaults, ...(JSON.parse(storage?.getItem(STORAGE_KEY) || '{}')) };
let activeCategory = 'all';
let query = '';
let showFavorites = false;

function save() { storage?.setItem(STORAGE_KEY, JSON.stringify(state)); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
function openExternal(link) {
  state.recent = [link.id, ...state.recent.filter((id) => id !== link.id)].slice(0, 8);
  save();
  window.open(link.url, '_blank', 'noopener,noreferrer');
}

app.innerHTML = `
  <a class="skip-link" href="#main">跳转到主要内容</a>
  <header class="topbar shell"><a class="brand" href="#top" aria-label="回到首页"><span>W</span><b>wwhooo</b></a><nav aria-label="主导航"><a href="#workbench">工作台</a><a href="#projects">项目</a><a href="#about">关于</a></nav><div class="top-actions"><button class="icon-button" id="theme-toggle" type="button" aria-label="切换主题" aria-pressed="false">◐</button><button class="menu-button" id="help-toggle" type="button" aria-label="打开快捷键说明">?</button></div></header>
  <main id="main">
    <section class="hero shell" id="top"><div class="hero-copy"><p class="eyebrow">LINN / PERSONAL WORKSPACE / 2026</p><h1>把想法做成<br><i>可以使用的东西。</i></h1><p class="hero-lead">你好，我是 Linn。这里是我的个人项目档案，也是一个只为日常工作保留的轻量导航台。</p><div class="hero-actions"><a class="button primary" href="#workbench">进入工作台 <span>↘</span></a><a class="text-link" href="https://github.com/ONLYLOVELYKISS" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></div><div class="hero-visual" aria-label="抽象的渐变球体装饰"><div class="visual-grid"></div><div class="visual-orb"></div><div class="visual-note">BUILD<br>WITH<br>INTENT</div><div class="visual-index">西安 · 中国<br>34°16'N / 108°56'E</div></div></section>
    <div class="marquee" aria-hidden="true"><div>SMALL TOOLS, REAL USE <b>✦</b> KEEP EXPLORING <b>✦</b> MAKE IT CLEAR <b>✦</b> SMALL TOOLS, REAL USE <b>✦</b> KEEP EXPLORING <b>✦</b></div></div>
    <section class="focus-section shell"><div class="section-label"><span>01</span><p>CURRENT FOCUS</p></div><div class="focus-list">${focus.map((item) => `<article class="focus-item"><span class="focus-index">${item.index}</span><div><h2>${item.title}</h2><p>${item.text}</p></div><small>${item.meta}</small></article>`).join('')}</div></section>
    <section class="workbench shell" id="workbench"><div class="workbench-heading"><div class="section-label"><span>02</span><p>PRIVATE NAVIGATION</p></div><div><h2>我的导航<span>台。</span></h2><p>常用入口、项目资源和灵感收藏。数据只保留在当前浏览器。</p></div></div><div class="workbench-bar"><label class="search-field"><span>⌕</span><input id="search" type="search" placeholder="搜索标题、描述、标签或域名…" aria-label="搜索导航" autocomplete="off"><kbd>/</kbd></label><button class="outline-button" id="favorite-filter" type="button" aria-pressed="false">☆ 收藏</button><button class="outline-button" id="export-state" type="button">导出设置</button><label class="import-button outline-button">导入设置<input id="import-state" type="file" accept="application/json" hidden></label></div><div class="intent-row"><span class="row-label">我想要…</span>${intents.map((item) => `<button class="intent" type="button" data-intent="${item.query}">${item.label} <span>→</span></button>`).join('')}</div><div class="category-row" role="tablist" aria-label="导航分类">${categories.map((item) => `<button class="category-tab${item.id === 'all' ? ' active' : ''}" type="button" role="tab" data-category="${item.id}" aria-selected="${item.id === 'all'}">${item.label}<small>${item.note}</small></button>`).join('')}</div><div class="recent-row" id="recent-row"></div><div class="link-grid" id="link-grid" aria-live="polite"></div><p class="empty-state" id="empty-state" hidden>没有找到匹配入口。试试更短的关键词，或清除当前筛选。</p></section>
    <section class="projects-section shell" id="projects"><div class="section-label"><span>03</span><p>SELECTED WORK</p></div><div><h2>正在<span>发生。</span></h2><p class="section-intro">不只列出技术名词，也记录项目状态、时间和做过的事情。</p><div class="project-list">${projects.map((project) => `<article class="project-card"><div class="project-number">${project.number}</div><div class="project-body"><div class="project-title"><div><small>${project.eyebrow}</small><h3>${project.title}</h3></div><span class="status">${project.status}</span></div><p>${project.description}</p><div class="project-meta"><span>${project.year}</span><span>${project.proof}</span><div>${project.tags.map((tag) => `<i>${tag}</i>`).join('')}</div><div class="project-links"><a href="${project.live || project.source}" target="_blank" rel="noreferrer">${project.live ? 'Live ↗' : 'Source ↗'}</a>${project.live ? `<a href="${project.source}" target="_blank" rel="noreferrer">Source ↗</a>` : ''}</div></div></div></article>`).join('')}</div></div></section>
    <section class="timeline-section shell"><div class="section-label"><span>04</span><p>SMALL TIMELINE</p></div><div class="timeline">${timeline.map((item) => `<div class="timeline-item"><strong>${item.year}</strong><p>${item.text}</p></div>`).join('')}</div></section>
    <section class="about-section shell" id="about"><div><div class="section-label"><span>05</span><p>ABOUT LINN</p></div><h2>跨技术栈，<br><span>但不被技术定义。</span></h2></div><div class="about-copy"><p>我关注个人网站、自动化工具和那些能直接解决具体问题的软件。HTML、Python、TypeScript、JavaScript 和 C# 都只是手边的工具。</p><p>这个入口没有账号、没有后台，也不追踪你的浏览记录。它只是让正在做的事更清楚，让常用的东西更近一点。</p><a class="text-link" href="mailto:hello@wwhooo.com">联系我 <span>↗</span></a></div></section>
  </main><footer class="footer shell"><span>© ${new Date().getFullYear()} Linn / wwhooo.com</span><span>静态部署 · 本地状态 · 保持简单</span><a href="#top">回到顶部 ↑</a></footer>
  <dialog class="help-dialog" id="help-dialog"><button class="dialog-close" id="help-close" type="button" aria-label="关闭">×</button><p class="eyebrow">SHORTCUTS</p><h2>快速一点。</h2><div><p><kbd>/</kbd> 聚焦搜索</p><p><kbd>Esc</kbd> 清空搜索 / 关闭面板</p><p><kbd>⌘ / Ctrl</kbd> + <kbd>K</kbd> 打开工作台</p></div></dialog>`;

const grid = document.querySelector('#link-grid');
const emptyState = document.querySelector('#empty-state');
const search = document.querySelector('#search');
const favoriteFilter = document.querySelector('#favorite-filter');
const recentRow = document.querySelector('#recent-row');

function renderRecent() {
  const recent = state.recent.map((id) => links.find((link) => link.id === id)).filter(Boolean);
  recentRow.innerHTML = recent.length ? `<span class="row-label">最近使用</span>${recent.map((link) => `<button type="button" data-recent="${link.id}">${escapeHtml(link.title)} <span>↗</span></button>`).join('')}<button class="clear-recent" id="clear-recent" type="button">清除</button>` : '';
  recentRow.querySelectorAll('[data-recent]').forEach((button) => button.addEventListener('click', () => openExternal(links.find((link) => link.id === button.dataset.recent))));
  recentRow.querySelector('#clear-recent')?.addEventListener('click', () => { state.recent = []; save(); renderRecent(); });
}
function renderLinks() {
  const needle = query.trim().toLowerCase();
  const visible = links.filter((link) => {
    const haystack = [link.title, link.description, link.url, categoryLabels[link.category], ...link.tags].join(' ').toLowerCase();
    return (activeCategory === 'all' || link.category === activeCategory) && (!showFavorites || state.favorites.includes(link.id)) && (!needle || haystack.includes(needle));
  });
  grid.innerHTML = visible.map((link, index) => { const favorite = state.favorites.includes(link.id); const pinned = state.pinned.includes(link.id); return `<article class="link-card${pinned ? ' pinned' : ''}"><button class="pin-button${pinned ? ' active' : ''}" type="button" data-pin="${link.id}" aria-label="${pinned ? '取消固定' : '固定'} ${escapeHtml(link.title)}">${pinned ? '●' : '＋'}</button><button class="star-button${favorite ? ' active' : ''}" type="button" data-favorite="${link.id}" aria-label="${favorite ? '取消收藏' : '收藏'} ${escapeHtml(link.title)}" aria-pressed="${favorite}">${favorite ? '★' : '☆'}</button><a href="${link.url}" target="_blank" rel="noreferrer" data-link="${link.id}"><span class="link-index">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(link.title)} <span>↗</span></strong><small>${escapeHtml(link.description)}</small><span class="link-tags">${link.tags.map((tag) => `<i>${escapeHtml(tag)}</i>`).join('')}</span></a></article>`; }).join('');
  emptyState.hidden = visible.length > 0;
  grid.querySelectorAll('[data-favorite]').forEach((button) => button.addEventListener('click', (event) => { event.preventDefault(); const id = button.dataset.favorite; state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites, id]; save(); renderLinks(); }));
  grid.querySelectorAll('[data-pin]').forEach((button) => button.addEventListener('click', (event) => { event.preventDefault(); const id = button.dataset.pin; state.pinned = state.pinned.includes(id) ? state.pinned.filter((item) => item !== id) : [...state.pinned, id].slice(-8); save(); renderLinks(); }));
  grid.querySelectorAll('[data-link]').forEach((anchor) => anchor.addEventListener('click', () => { const link = links.find((item) => item.id === anchor.dataset.link); state.recent = [link.id, ...state.recent.filter((id) => id !== link.id)].slice(0, 8); save(); setTimeout(renderRecent, 0); }));
}

document.querySelectorAll('.category-tab').forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.category; document.querySelectorAll('.category-tab').forEach((tab) => { const active = tab === button; tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); }); renderLinks(); }));
document.querySelectorAll('[data-intent]').forEach((button) => button.addEventListener('click', () => { search.value = button.dataset.intent; query = button.dataset.intent; activeCategory = 'all'; document.querySelector('[data-category="all"]').click(); renderLinks(); search.focus(); }));
search.addEventListener('input', (event) => { query = event.target.value; renderLinks(); });
favoriteFilter.addEventListener('click', () => { showFavorites = !showFavorites; favoriteFilter.classList.toggle('active', showFavorites); favoriteFilter.setAttribute('aria-pressed', String(showFavorites)); renderLinks(); });
document.querySelector('#export-state').addEventListener('click', () => { const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'wwhooo-workspace.json'; link.click(); URL.revokeObjectURL(link.href); });
document.querySelector('#import-state').addEventListener('change', async (event) => { try { const imported = JSON.parse(await event.target.files[0].text()); state = { ...defaults, ...imported, version: 2 }; save(); renderLinks(); renderRecent(); } catch { alert('设置文件无法读取。'); } event.target.value = ''; });
const themeToggle = document.querySelector('#theme-toggle');
function updateTheme() { document.body.classList.toggle('light', state.theme === 'light'); themeToggle.setAttribute('aria-pressed', String(state.theme === 'light')); themeToggle.textContent = state.theme === 'light' ? '☼' : '◐'; }
themeToggle.addEventListener('click', () => { state.theme = state.theme === 'light' ? 'dark' : 'light'; save(); updateTheme(); });
const dialog = document.querySelector('#help-dialog');
document.querySelector('#help-toggle').addEventListener('click', () => dialog.showModal());
document.querySelector('#help-close').addEventListener('click', () => dialog.close());
document.addEventListener('keydown', (event) => { if (event.key === '/' && document.activeElement !== search) { event.preventDefault(); search.focus(); } if (event.key === 'Escape' && document.activeElement === search) { search.value = ''; query = ''; renderLinks(); search.blur(); } if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.querySelector('#workbench').scrollIntoView({ behavior: 'smooth' }); search.focus(); } });
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('reduced-motion');
updateTheme(); renderRecent(); renderLinks();
