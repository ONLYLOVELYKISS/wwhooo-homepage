// Every renderable view. All markup is generated from ./data.js and ./i18n.js,
// so no user-visible string is hard-coded in a template.
//
// Links point at real per-language URLs (`pathFor(id, lang)`) rather than at a
// language toggle, which is what makes both trees crawlable.

import { archive, engineGroups, links, photo, photoSrcset, profile, projects, site, subsites } from './data.js';
import { t, text } from './i18n.js';
import { getLang, getRouteId } from './context.js';
import { HTML_LANG, otherLang, pathFor } from './meta.js';
import { hasEntered } from './session.js';

const NAV = [
  ['home', 0],
  ['engine', 1],
  ['profile', 2],
  ['works', 3],
];

/** Responsive <picture> for the Sakura photograph. */
function photoPicture({ sizes, priority = false }) {
  const loading = priority ? 'fetchpriority="high"' : 'loading="lazy"';
  return `<picture>
        <source type="image/webp" srcset="${photoSrcset()}" sizes="${sizes}">
        <img src="${photo.fallback}" width="${photo.width}" height="${photo.height}" alt="${text(photo.alt)}" ${loading} decoding="async">
      </picture>`;
}

export function header(activeId = '') {
  const lang = getLang();
  const items = NAV.map(([id, index]) => {
    const current = activeId === id ? ' aria-current="page"' : '';
    return `<a href="${pathFor(id, lang)}"${current}>${t().nav[index]}</a>`;
  }).join('');

  return `<header class="site-header">
      <a class="brand" href="${pathFor('home', lang)}"><span>WW</span><b>LINN</b></a>
      <nav aria-label="${t().navLabel}">${items}</nav>
      ${languageLink()}
    </header>`;
}

/**
 * The language control is a real link to the counterpart URL: crawlable,
 * shareable, middle-clickable, and it works with JavaScript disabled.
 *
 * The switch label is a visually-hidden suffix rather than an `aria-label`,
 * because axe's label-content-name-mismatch rule requires the accessible name to
 * contain the visible text — "EN" plus an aria-label of "切换到英文" fails it.
 */
function languageLink() {
  const other = otherLang(getLang());
  const target = pathFor(getRouteId() ?? 'home', other);
  return `<a class="language" href="${target}" hreflang="${HTML_LANG[other]}" lang="${HTML_LANG[other]}">${t().language}<span class="sr-only"> — ${t().languageLabel}</span></a>`;
}

export function footer() {
  return `<footer>
      <span>© ${new Date().getFullYear()} ${site.author.toUpperCase()}</span>
      <span>WW / PERSONAL ENGINE</span>
      <a href="#top">${t().top} ↑</a>
    </footer>`;
}

export function page(content, activeId = '') {
  return `<a class="skip-link" href="#top">${t().skip}</a>${header(activeId)}<main id="top" tabindex="-1">${content}</main>${footer()}`;
}

// --------------------------------------------------------------------- gate

function entryGate() {
  // Render the completed state up front for returning visitors: adding the
  // class after paint would replay the slide-up animation on every load.
  const done = hasEntered() ? ' gate-complete' : '';
  return `<section class="entry-gate${done}" id="entry-gate" aria-label="${t().unlock}">
      <div class="gate-image">
        ${photoPicture({ sizes: '(max-width: 768px) 100vw, 60vw', priority: true })}
        <div class="gate-vignette"></div>
      </div>
      <div class="gate-copy">
        <span class="kicker">WW / SAKURA ENTRY</span>
        <p class="gate-status">${t().unlocked}</p>
        <h1>${t().gateTitle}</h1>
        <p class="gate-hint">${t().unlockHint}</p>
        <button class="swipe-capsule" id="enter-button" type="button">
          <span class="swipe-thumb" aria-hidden="true"><span class="chevron">↑</span></span>
          <span class="swipe-text">${t().unlock}</span>
        </button>
        <p class="gate-foot">${t().gateFoot}</p>
        <p class="gate-alt"><a href="${pathFor(getRouteId() ?? 'home', otherLang(getLang()))}" hreflang="${HTML_LANG[otherLang(getLang())]}" lang="${HTML_LANG[otherLang(getLang())]}">${t().otherLanguageName}</a></p>
      </div>
      <b class="gate-mark" aria-hidden="true">桜</b>
    </section>`;
}

// --------------------------------------------------------------------- home

function landing() {
  return `<section class="landing">
        <div class="landing-image">
          ${photoPicture({ sizes: '(max-width: 768px) 100vw, 55vw' })}
          <div class="image-caption">${text(photo.title)}<span>${text(photo.note)}</span></div>
        </div>
        <div class="landing-copy">
          <p class="kicker">${t().eyebrow}</p>
          <h2>${t().title}</h2>
          <p class="lead">${t().intro}</p>
          <a class="primary-link" href="#library">${t().explore}<span aria-hidden="true">↓</span></a>
          <div class="now"><span>${t().status}</span><strong>${t().statusText}</strong></div>
        </div>
      </section>`;
}

function libraryCard(item) {
  return `<a class="library-card ${item.tone}" href="${pathFor(item.id, getLang())}">
          <small>${item.name}</small>
          <strong>${text(item.title)}</strong>
          <span>${t().open} ↗</span>
        </a>`;
}

function librarySection() {
  const extra = `<a class="library-card sakura-card" href="${pathFor('works', getLang())}">
          <small>SAKURA / IMAGE</small>
          <strong>${text(photo.title)}</strong>
          <span>${t().open} ↗</span>
        </a>
        <a class="library-card engine-card" href="${pathFor('engine', getLang())}">
          <small>ENGINE / LINKS</small>
          <strong>${text({ zh: '常用入口', en: 'Everyday links' })}</strong>
          <span>${t().open} ↗</span>
        </a>`;
  return `<section class="library-section" id="library">
        <div class="library-head">
          <div class="section-label">
            <span>01</span>
            <h2>${t().library}</h2>
            <p>${t().libraryText}</p>
          </div>
          <span class="library-tip">${t().dragExplore} ↔</span>
        </div>
        <div class="library-rail" tabindex="0" role="group" aria-label="${t().library}">
          ${subsites.map(libraryCard).join('')}${extra}
        </div>
      </section>`;
}

function indexSection() {
  const rows = [
    ['engine', '01', t().tools, 'ENGINE'],
    ['profile', '02', t().profile, 'PROFILE'],
    ['works', '03', t().works, 'WORKS'],
  ]
    .map(
      ([id, num, label, heading]) => `<a href="${pathFor(id, getLang())}">
            <span>${num}</span>
            <div><small>${label}</small><h3>${heading}</h3></div>
            <b aria-hidden="true">↗</b>
          </a>`,
    )
    .join('');
  return `<section class="index-section">
        <div class="section-label">
          <span>02</span>
          <h2>${t().index}</h2>
          <p>${t().indexText}</p>
        </div>
        <div class="index-links">${rows}</div>
      </section>`;
}

function statementBand() {
  return `<section class="statement-band">
        <p>“${text(profile.statement)}”</p>
        <a href="${pathFor('profile', getLang())}">${t().profile} ↗</a>
      </section>`;
}

export function home() {
  const entered = hasEntered();
  const lockState = entered ? 'is-unlocked' : 'is-locked';
  // The gate is an overlay, not a replacement, and the page content is emitted
  // unconditionally — including into the prerendered static HTML.
  //
  // `inert` is deliberately NOT part of this markup: it is applied by the
  // inline handshake in index.html (before first paint) and by gate.js on every
  // subsequent render. If it lived here, a visitor without JavaScript would be
  // left with a fully readable homepage that they are forbidden to interact
  // with, behind a gate they cannot open.
  return page(
    `<div class="engine-home ${lockState}" id="engine-home">
      ${entryGate()}
      <div class="home-content" id="home-content">
        ${landing()}
        ${librarySection()}
        ${indexSection()}
        ${statementBand()}
      </div>
      <button class="lock-button" id="lock-entry" type="button">${t().lock} ×</button>
    </div>`,
    'home',
  );
}

// ------------------------------------------------------------- inner pages

export function engine() {
  const groups = engineGroups
    .map(
      (group) => `<section>
          <h2>${group.title}</h2>
          ${group.items
            .map(
              (item) => `<a class="tool-row" href="${item.url}" target="_blank" rel="noopener noreferrer">
              <strong>${item.name}</strong>
              <span>${text(item.note)}</span>
              <b aria-hidden="true">↗</b>
            </a>`,
            )
            .join('')}
        </section>`,
    )
    .join('');
  return page(
    `<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">02 / ENGINE</span>
        <h1>${t().engineHeading}</h1>
        <p>${t().engineIntro}</p>
      </div>
      <div class="tool-groups">${groups}</div>
    </section>`,
    'engine',
  );
}

export function profilePage() {
  const contacts = links
    .map((link) => `<a href="${link.url}"${link.rel ? ` rel="${link.rel}"` : ''}>${link.name} ↗</a>`)
    .join('');
  return page(
    `<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">03 / PROFILE</span>
        <h1>Linn,<br><i>${t().profileHeading}</i></h1>
      </div>
      <div class="profile-layout">
        <blockquote>${text(profile.bio)}</blockquote>
        <div class="profile-copy">
          <p>${text(profile.focus)}</p>
          <div class="contact"><span>${t().contact}</span>${contacts}</div>
        </div>
      </div>
    </section>`,
    'profile',
  );
}

/** Quiet archive list: real information, none of the featured presentation. */
function archiveSection() {
  if (archive.length === 0) return '';
  const items = archive
    .map(
      (item) => `<li>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer">
              <div>
                <span class="archive-name">${item.name}</span>
                <small>${item.stack} / ${item.period}</small>
                <p>${text(item.desc)}</p>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
          </li>`,
    )
    .join('');
  return `<section class="archive-section">
        <div class="section-label">
          <span>02</span>
          <h2>${t().archive}</h2>
          <p>${t().archiveNote}</p>
        </div>
        <ul class="archive-list">${items}</ul>
      </section>`;
}

export function works() {
  const rows = projects
    .map(
      (project, index) => `<a class="project-row" href="${project.url}" target="_blank" rel="noopener noreferrer">
            <span>0${index + 1}</span>
            <div>
              <small>${project.stack} / ${project.period}</small>
              <h2>${project.name}</h2>
              <p>${text(project.desc)}</p>
            </div>
            <b aria-hidden="true">↗</b>
          </a>`,
    )
    .join('');
  return page(
    `<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">04 / WORKS</span>
        <h1>${t().worksHeading}</h1>
        <p>${t().worksIntro}</p>
      </div>
      <section class="works-list">
        <div class="section-label"><span>01</span><h2>${t().selected}</h2></div>
        <div>${rows}</div>
      </section>
      ${archiveSection()}
      <section class="photo-section">
        <div class="section-label"><span>03</span><h2>${t().photo}</h2></div>
        <figure>
          ${photoPicture({ sizes: '(max-width: 768px) 100vw, 70vw' })}
          <figcaption><strong>${text(photo.title)}</strong><span>${text(photo.note)}</span></figcaption>
        </figure>
      </section>
    </section>`,
    'works',
  );
}

export function subsite(item) {
  return page(
    `<section class="subsite-page ${item.tone}">
      <a class="back-link" href="${pathFor('home', getLang())}">← ${t().back}</a>
      <span class="kicker">SUBSITE / ${item.name}</span>
      <h1>${text(item.title)}</h1>
      <p>${text(item.desc)}</p>
      <div class="subsite-placeholder">
        <span>WIP / ${new Date().getFullYear()}</span>
        <strong>${t().subsiteWip}</strong>
        <a href="${pathFor('engine', getLang())}">${t().tools} ↗</a>
      </div>
    </section>`,
    '',
  );
}

export function notFound() {
  return page(
    `<section class="inner-page not-found">
      <div class="page-intro">
        <span class="kicker">404 / NOT FOUND</span>
        <h1>${t().notFoundHeading}</h1>
        <p>${t().notFoundBody}</p>
      </div>
      <p class="not-found-cta"><a class="primary-link" href="${pathFor('home', getLang())}">${t().notFoundCta}<span aria-hidden="true">↗</span></a></p>
    </section>`,
    '',
  );
}
