import './style.css';
import { fragments, links, profile, projects } from './data.js';

const app = document.querySelector('#app');
const savedTheme = localStorage.getItem('wwhooo-theme-v3');

app.innerHTML = `
  <a class="skip-link" href="#content">跳到主要内容</a>
  <header class="site-header"><a class="wordmark" href="#top" aria-label="回到首页">L / Linn</a><nav aria-label="主导航"><a href="#works">造物</a><a href="#fragments">片段</a><a href="#about">关于</a></nav><button class="theme-toggle" id="theme-toggle" type="button" aria-label="切换颜色主题" aria-pressed="false">◐</button></header>
  <main id="content">
    <section class="opening" id="top"><div class="opening-meta"><span>WW / 2026</span><span>${profile.location}</span></div><div class="opening-stage"><p class="kicker">${profile.status}</p><h1>${profile.title.replace('\n', '<br>')}</h1><p class="opening-intro">${profile.intro}</p><a class="scroll-cue" href="#now"><span>继续向下</span><b>↓</b></a><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="opening-glyph" aria-hidden="true">W</div></div><div class="opening-footer"><span>个人主页 / 项目档案 / 随手记录</span><span>向下探索</span></div></section>
    <section class="now section-wrap" id="now"><div class="section-aside"><span>00</span><p>此刻</p></div><div class="now-content"><p class="small-title">现在，我在尝试把一个网站做得更像一个人，而不是一张名片。</p><div class="now-grid"><div><span class="label">正在处理</span><h2>把零散的<br><em>东西放在一起。</em></h2></div><p>项目、代码、想法、技术栈，它们本来就不应该被分成互不相干的栏目。它们共同构成一个人的工作轨迹。</p></div></div></section>
    <section class="works section-wrap" id="works"><div class="section-aside"><span>01</span><p>造物</p></div><div class="works-content"><div class="section-heading"><span class="label">SELECTED WORKS</span><h2>正在发生的<br><em>一些项目。</em></h2></div><div class="project-list">${projects.map((project) => `<a class="project" href="${project.url}" target="_blank" rel="noreferrer"><span class="project-no">${project.number}</span><div class="project-main"><div class="project-top"><span>${project.type}</span><span>${project.year}</span></div><h3>${project.title}</h3><p>${project.description}</p><div class="project-bottom"><span>${project.state}</span><b>↗</b></div></div><i class="project-dot ${project.accent}"></i></a>`).join('')}</div></div></section>
    <section class="fragments section-wrap" id="fragments"><div class="section-aside"><span>02</span><p>片段</p></div><div class="fragments-content"><div class="section-heading"><span class="label">FIELD NOTES</span><h2>一些没有<br><em>急着完成的事。</em></h2></div><div class="fragment-list">${fragments.map((fragment) => `<article class="fragment"><time>${fragment.date}</time><div><h3>${fragment.title}</h3><p>${fragment.text}</p></div><span>↘</span></article>`).join('')}</div></div></section>
    <section class="about section-wrap" id="about"><div class="section-aside"><span>03</span><p>此身</p></div><div class="about-content"><div class="about-quote">“<br><span>技术是我靠近问题的方式，<br>不是我介绍自己的全部。</span>”</div><div class="about-columns"><p>我叫 Linn，来自中国西安。会在 HTML、Python、TypeScript、JavaScript 和 C# 之间切换，通常是因为手上有一个具体的问题。</p><p>我喜欢个人网站、自动化、实用工具，以及那些从一个很小的念头开始，最后变成可以被使用的东西。</p></div><div class="contact-row"><span>如果你想找到我</span>${links.map((link) => `<a href="${link.url}" target="${link.url.startsWith('mailto:') ? '_self' : '_blank'}" rel="noreferrer">${link.label} ↗</a>`).join('')}</div></div></section>
  </main>
  <footer class="site-footer"><span>© ${new Date().getFullYear()} Linn</span><span>made slowly, kept honestly</span><a href="#top">回到顶部 ↑</a></footer>
`;

const themeToggle = document.querySelector('#theme-toggle');
function applyTheme() { const light = document.body.classList.contains('light'); themeToggle.textContent = light ? '☼' : '◐'; themeToggle.setAttribute('aria-pressed', String(light)); }
if (savedTheme === 'light') document.body.classList.add('light');
themeToggle.addEventListener('click', () => { document.body.classList.toggle('light'); localStorage.setItem('wwhooo-theme-v3', document.body.classList.contains('light') ? 'light' : 'dark'); applyTheme(); });
applyTheme();
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('reduced-motion');
