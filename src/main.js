import './style.css';

const projects = [
  {
    title: '个人网站',
    description: '以公开表达为主线，持续整理项目、技术实践与正在思考的事情。',
    tags: ['HTML', 'CSS', 'Cloudflare'],
    link: 'https://github.com/ONLYLOVELYKISS/onlylovelykiss.github.io',
  },
  {
    title: 'TOY',
    description: '来源于 AI 与互联网的 Python 实验场，把想法变成可以运行的小工具。',
    tags: ['Python', 'AI', 'Experiments'],
    link: 'https://github.com/ONLYLOVELYKISS/TOY',
  },
  {
    title: 'chaoxing-sign-cli',
    description: '面向具体使用场景的自动化工具，探索签到、监测与消息推送。',
    tags: ['TypeScript', 'CLI', 'Automation'],
    link: 'https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli',
  },
];

const app = document.querySelector('#app');
app.innerHTML = `
  <header class="nav shell">
    <a class="brand" href="#top" aria-label="返回首页"><span>W</span> wwhooo</a>
    <nav aria-label="主导航">
      <a href="#about">关于</a>
      <a href="#projects">项目</a>
      <a href="#contact">联系</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero shell">
      <div class="hero-copy">
        <p class="eyebrow">PERSONAL WORKSPACE / 2026</p>
        <h1>把想法做成<br /><em>可以使用的东西。</em></h1>
        <p class="lead">你好，我是 Linn。一名关注个人项目、实用工具和跨技术栈实践的开发者。</p>
        <div class="actions">
          <a class="button button-primary" href="#projects">查看项目 <span>↘</span></a>
          <a class="button button-ghost" href="https://github.com/ONLYLOVELYKISS" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="orb orb-large"></div>
        <div class="orb orb-small"></div>
        <div class="art-label">STAY<br />CURIOUS</div>
        <div class="art-line"></div>
      </div>
    </section>

    <section class="ticker" aria-label="关键词">
      <div class="ticker-track">BUILD WITH INTENT <span>✦</span> SMALL TOOLS, REAL USE <span>✦</span> KEEP EXPLORING <span>✦</span> BUILD WITH INTENT <span>✦</span></div>
    </section>

    <section class="section shell about" id="about">
      <div class="section-heading"><p class="eyebrow">01 / ABOUT</p><h2>持续构建，<br /><span>保持好奇。</span></h2></div>
      <div class="about-copy"><p>我喜欢从真实需求出发，做网站、脚本和小型工具。技术栈不是边界，而是解决问题时可以拿起的工具箱。</p><p>这里是我的公开工作台：记录正在做的项目，也记录那些暂时还没有答案的想法。</p></div>
    </section>

    <section class="section shell" id="projects">
      <div class="section-heading projects-heading"><p class="eyebrow">02 / SELECTED WORK</p><h2>一些正在<br /><span>发生的项目。</span></h2></div>
      <div class="project-list">${projects.map((project, index) => `
        <a class="project-card" href="${project.link}" target="_blank" rel="noreferrer">
          <div class="project-number">0${index + 1}</div>
          <div class="project-content"><h3>${project.title} <span>↗</span></h3><p>${project.description}</p><div class="tags">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div>
        </a>`).join('')}</div>
    </section>

    <section class="section shell contact" id="contact">
      <p class="eyebrow">03 / SAY HELLO</p>
      <h2>有想法，<br /><span>就开始做。</span></h2>
      <a class="contact-link" href="mailto:hello@wwhooo.com">hello@wwhooo.com <span>↗</span></a>
    </section>
  </main>

  <footer class="footer shell"><span>© ${new Date().getFullYear()} Linn</span><span>西安 · 中国</span><a href="#top">回到顶部 ↑</a></footer>
`;
