import './style.css';
import { engineGroups, links, photo, profile, projects, subsites } from './data.js';

const app = document.querySelector('#app');
const route = location.pathname.replace(/\/$/, '') || '/';
const readStorage = (key, fallback = '') => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
const state = { lang: readStorage('wwhooo-lang', 'zh') === 'en' ? 'en' : 'zh', unlocked: readStorage('wwhooo-entry') === 'open' };
document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';

const copy = {
  zh: { nav:['首页','工具','档案','作品'], eyebrow:'Linn / Personal engine', title:'把值得留下的，\n放在这里。', intro:'一个持续更新的个人入口：记录项目、工具、观察和正在形成的东西。', explore:'探索我的空间', status:'现在进行中', statusText:'维护个人网站，整理 TOY 实验场', index:'目录', indexText:'从正在使用的东西开始，逐步了解这个空间。', tools:'工具箱', profile:'关于我', works:'作品与记录', selected:'精选项目', photo:'一张照片', contact:'联系我', language:'EN', top:'回到顶部', lock:'重新锁定', unlock:'滑动进入', unlockHint:'向右滑动 Sakura，解锁个人引擎', unlocked:'入口已打开', subsite:'子站初稿', open:'进入', back:'返回主站' },
  en: { nav:['Home','Tools','Profile','Works'], eyebrow:'Linn / Personal engine', title:'Things worth\nkeeping, here.', intro:'A living personal entry point for projects, tools, observations, and things taking shape.', explore:'Explore the space', status:'Currently', statusText:'Maintaining this site and the TOY lab', index:'Index', indexText:'Start with the things in use and take a closer look around.', tools:'Toolbox', profile:'About me', works:'Works & notes', selected:'Selected projects', photo:'A photograph', contact:'Find me', language:'中', top:'Back to top', lock:'Lock again', unlock:'Slide to enter', unlockHint:'Slide Sakura to the right to unlock the personal engine', unlocked:'Entrance open', subsite:'Subsite drafts', open:'Open', back:'Back home' }
};
const t = () => copy[state.lang];
const text = (zh, en) => state.lang === 'zh' ? zh : en;
const saveEntry = (value) => { state.unlocked = value; try { localStorage.setItem('wwhooo-entry', value ? 'open' : 'locked'); } catch {} };

function header(active = '') {
  const items = [['/', t().nav[0]], ['/engine/', t().nav[1]], ['/profile/', t().nav[2]], ['/works/', t().nav[3]]];
  return `<header class="site-header"><a class="brand" href="/" aria-label="Linn home"><span>WW</span><b>LINN</b></a><nav>${items.map(([href,label]) => `<a class="${active === href ? 'active' : ''}" href="${href}">${label}</a>`).join('')}</nav><button class="language" id="language" type="button">${t().language}</button></header>`;
}
function footer() { return `<footer><span>© 2026 LINN</span><span>WW / PERSONAL ENGINE</span><a href="#top">${t().top} ↑</a></footer>`; }
function page(content, active) { return `${header(active)}<main id="top">${content}</main>${footer()}`; }

function entryGate() {
  return `<section class="entry-gate" id="entry-gate" aria-label="${t().unlock}"><div class="gate-image"><img src="/IMG_Sakura.JPG" alt="${photo.title}"><div class="gate-vignette"></div></div><div class="gate-copy"><span class="kicker">WW / SAKURA GATE</span><p class="gate-status">${t().unlocked}</p><h1>${text('进入一个人的<br><i>个人引擎。</i>', 'Enter a<br><i>personal engine.</i>')}</h1><p class="gate-hint">${t().unlockHint}</p><div class="slider-wrap"><label class="sr-only" for="entry-slider">${t().unlock}</label><input id="entry-slider" type="range" min="0" max="100" value="0" aria-valuetext="${t().unlock}"><span class="slider-track"></span><span class="slider-label">${t().unlock} <b>→</b></span></div><p class="gate-foot">${text('这里没有密码，只有一次主动进入。', 'No password, just a deliberate entrance.')}</p></div><b class="gate-mark">桜</b></section>`;
}

function homeContent() {
  return `<section class="engine-home ${state.unlocked ? 'is-unlocked' : 'is-locked'}">${entryGate()}<div class="home-content" aria-hidden="${!state.unlocked}"><section class="landing"><div class="landing-image"><img src="/IMG_Sakura.JPG" alt="${photo.title}"><div class="image-caption">${photo.title}<span>${photo.note}</span></div></div><div class="landing-copy"><p class="kicker">${t().eyebrow}</p><h2>${t().title.replace('\n','<br>')}</h2><p class="lead">${t().intro}</p><a class="primary-link" href="#index">${t().explore}<span>↓</span></a><div class="now"><span>${t().status}</span><strong>${t().statusText}</strong></div></div></section><section class="index-section" id="index"><div class="section-label"><span>01</span><h2>${t().index}</h2><p>${t().indexText}</p></div><div class="index-links"><a href="/engine/"><span>01</span><div><small>${t().tools}</small><h3>ENGINE</h3></div><b>↗</b></a><a href="/profile/"><span>02</span><div><small>${t().profile}</small><h3>PROFILE</h3></div><b>↗</b></a><a href="/works/"><span>03</span><div><small>${t().works}</small><h3>WORKS</h3></div><b>↗</b></a></div></section><section class="subsite-strip"><div class="section-label"><span>02</span><h2>${t().subsite}</h2></div><div class="subsite-links">${subsites.map(site => `<a href="${site.path}"><small>${site.name}</small><strong>${text(site.zh, site.en)}</strong><b>↗</b></a>`).join('')}</div></section><section class="statement-band"><p>“${text('技术是我靠近问题的方式，不是我介绍自己的全部。', 'Technology is how I get closer to problems, not the whole story of who I am.')}”</p><a href="/profile/">${t().profile} ↗</a></section></div>${state.unlocked ? `<button class="lock-button" id="lock-entry" type="button">${t().lock} ×</button>` : ''}</section>`;
}
function engine() { return page(`<section class="inner-page"><div class="page-intro"><span class="kicker">02 / ENGINE</span><h1>${text('我会反复打开的<br><i>一些入口。</i>', 'A few places I<br><i>return to.</i>')}</h1><p>${text('保持简单，保持可用。把常用的东西放在顺手的位置。','Simple, useful, and close at hand.')}</p></div><div class="tool-groups">${engineGroups.map(group => `<section><h2>${group.title}</h2>${group.items.map(item => `<a class="tool-row" href="${item[3]}" target="_blank" rel="noopener noreferrer"><strong>${item[0]}</strong><span>${text(item[1],item[2])}</span><b>↗</b></a>`).join('')}</section>`).join('')}</div></section>`, '/engine/'); }
function profilePage() { return page(`<section class="inner-page"><div class="page-intro"><span class="kicker">03 / PROFILE</span><h1>Linn,<br><i>${text('持续进行中。','in progress.')}</i></h1></div><div class="profile-layout"><blockquote>${text('我在网站、自动化工具与跨技术栈实验之间移动。','I move between websites, automation, and experiments across stacks.')}</blockquote><div class="profile-copy"><p>${text(profile.bio,profile.bioEn)}</p><p>${text('来自中国西安，关注个人网站、自动化、实用工具，以及从小念头开始、最后变成可使用的东西。','Based in Xi’an, China. I care about personal websites, automation, useful tools, and small ideas that become usable things.')}</p><div class="contact"><span>${t().contact}</span>${links.map(([name,href]) => `<a href="${href}">${name} ↗</a>`).join('')}</div></div></div></section>`, '/profile/'); }
function works() { return page(`<section class="inner-page"><div class="page-intro"><span class="kicker">04 / WORKS</span><h1>${text('做过，<br><i>看过。</i>','Made,<br><i>observed.</i>')}</h1><p>${text('软件项目和摄影作品。一个人如何工作，也如何看待周围的世界。','Software projects and photographs. How I work, and how I look at the world.')}</p></div><section class="works-list"><div class="section-label"><span>01</span><h2>${t().selected}</h2></div><div>${projects.map((project,index) => `<a class="project-row" href="${project[5]}" target="_blank" rel="noopener noreferrer"><span>0${index+1}</span><div><small>${project[1]} / ${project[2]}</small><h2>${project[0]}</h2><p>${text(project[3],project[4])}</p></div><b>↗</b></a>`).join('')}</div></section><section class="photo-section"><div class="section-label"><span>02</span><h2>${t().photo}</h2></div><figure><img src="/IMG_Sakura.JPG" alt="${photo.title}"><figcaption><strong>${text(photo.title,photo.titleEn)}</strong><span>${text(photo.note,photo.noteEn)}</span></figcaption></figure></section></section>`, '/works/'); }
function subsite(site) { return page(`<section class="subsite-page ${site.tone}"><a class="back-link" href="/">← ${t().back}</a><span class="kicker">SUBSITE / ${site.name}</span><h1>${text(site.zh,site.en)}</h1><p>${site.description}</p><div class="subsite-placeholder"><span>WIP / 2026</span><strong>${text('这是一个可访问的子站初稿。', 'This is an accessible first draft of the subsite.')}</strong><a href="/engine/">${t().tools} ↗</a></div></section>`, ''); }

app.innerHTML = route === '/engine' ? engine() : route === '/profile' ? profilePage() : route === '/works' ? works() : route === '/toy' ? subsite(subsites[0]) : route === '/notes' ? subsite(subsites[1]) : `${header('/')}${homeContent()}${footer()}`;

document.querySelector('#language')?.addEventListener('click', () => { state.lang = state.lang === 'zh' ? 'en' : 'zh'; try { localStorage.setItem('wwhooo-lang', state.lang); } catch {} location.reload(); });
const slider = document.querySelector('#entry-slider');
slider?.addEventListener('input', event => {
  const value = Number(event.target.value);
  event.target.style.setProperty('--slider-progress', `${value}%`);
  event.target.setAttribute('aria-valuetext', `${value}%`);
  if (value >= 96) {
    saveEntry(true);
    document.querySelector('#entry-gate')?.classList.add('gate-complete');
    document.querySelector('.home-content')?.setAttribute('aria-hidden','false');
    setTimeout(() => location.reload(), 500);
  }
});
document.querySelector('#lock-entry')?.addEventListener('click', () => { saveEntry(false); location.reload(); });
