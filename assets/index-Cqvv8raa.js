(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function o(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=o(i);fetch(i.href,a)}})();const N="wwhooo-entered",y=()=>{try{return sessionStorage.getItem(N)==="1"}catch{return!1}},_=()=>{try{sessionStorage.setItem(N,"1")}catch{}},X=()=>{try{sessionStorage.removeItem(N)}catch{}},x=.8,J=130,Q=320;function Z(){const e=document.querySelector("#entry-gate"),t=document.querySelector("#enter-button"),o=document.querySelector("#engine-home"),s=document.querySelector("#home-content"),i=document.querySelector("#lock-entry");if(!e||!t||!o)return;let a=y(),p=0,h=null,L=0,$=0,R=0,S=0;const k=()=>{t.style.setProperty("--swipe-ratio",String(p))},E=()=>{const r=(u,V)=>{u&&(V?u.setAttribute("inert",""):u.removeAttribute("inert"))};r(e,a),e.classList.toggle("gate-complete",a),o.classList.toggle("is-unlocked",a),o.classList.toggle("is-locked",!a),r(s,!a),s&&s.setAttribute("aria-hidden",String(!a)),document.body.classList.toggle("is-locked",!a)},F=()=>{a||(a=!0,p=1,k(),_(),E(),requestAnimationFrame(()=>{document.querySelector("#top")?.focus({preventScroll:!0})}))},T=()=>{p=0,$=0,k()},M=r=>{p=Math.max(0,Math.min(1,r)),k(),p>=x&&F()},G=()=>{a=!1,X(),T(),E(),requestAnimationFrame(()=>t.focus({preventScroll:!0}))},D=r=>{a||h!==null||(h=r.pointerId,L=r.clientY,S=0,r.currentTarget.setPointerCapture?.(h),t.classList.add("is-dragging"))},U=r=>{h===null||r.pointerId!==h||(Math.abs(r.clientY-L)>6&&(S=Date.now()+400),M((L-r.clientY)/J))},W=r=>{h===null||r.pointerId!==h||(h=null,t.classList.remove("is-dragging"),r.currentTarget.releasePointerCapture?.(r.pointerId),p<x&&T())};for(const r of[t,e])r.addEventListener("pointerdown",u=>{u.pointerType==="mouse"&&u.currentTarget===e||u.currentTarget===e&&u.target.closest?.(".swipe-capsule")||D(u)}),r.addEventListener("pointermove",U),r.addEventListener("pointerup",W),r.addEventListener("pointercancel",W);t.addEventListener("click",()=>{a||Date.now()<S||F()}),e.addEventListener("wheel",r=>{if(a||e.scrollHeight>e.clientHeight+4)return;const u=Math.abs(r.deltaY)>=Math.abs(r.deltaX)?r.deltaY:0;u&&($=Math.max(0,$+u),M($/Q),clearTimeout(R),R=setTimeout(()=>{p<x&&T()},360))},{passive:!0}),i?.addEventListener("click",G),E(),k()}const z="wwhooo-lang",ee={zh:{skip:"跳到主要内容",navLabel:"主导航",nav:["首页","工具","档案","作品"],eyebrow:"Linn / Personal engine",title:"把值得留下的，<br>放在这里。",intro:"一个持续更新的个人入口：记录项目、工具、观察和正在形成的东西。",explore:"探索我的空间",status:"现在进行中",statusText:"维护个人网站，整理 TOY 实验场",index:"目录",indexText:"从正在使用的东西开始，逐步了解这个空间。",tools:"工具箱",profile:"关于我",works:"作品与记录",selected:"精选项目",photo:"一张照片",contact:"联系我",language:"EN",languageLabel:"切换到英文",top:"回到顶部",lock:"重新进入",unlock:"向上滑动进入",unlockHint:"向上滑动 Sakura，进入个人引擎",unlocked:"准备进入",gateTitle:"向上滑动<br><i>进入引擎。</i>",gateFoot:"没有登录，只有一次主动进入。",library:"个人库",libraryText:"项目、子站、工具和视觉记录，放在同一条可探索的轨道上。",dragExplore:"左右滑动浏览",open:"进入",back:"返回主站",subsiteWip:"这是一个可访问的子站初稿。",notFoundTitle:"页面不存在",notFoundHeading:"这个地址<br><i>没有内容。</i>",notFoundBody:"也许链接已经改变，或者它从来没有存在过。",notFoundCta:"回到首页",engineHeading:"我会反复打开的<br><i>一些入口。</i>",engineIntro:"保持简单，保持可用。把常用的东西放在顺手的位置。",profileHeading:"持续进行中。",worksHeading:"做过，<br><i>看过。</i>",worksIntro:"软件项目和摄影作品。一个人如何工作，也如何看待周围的世界。"},en:{skip:"Skip to main content",navLabel:"Main navigation",nav:["Home","Tools","Profile","Works"],eyebrow:"Linn / Personal engine",title:"Things worth<br>keeping, here.",intro:"A living personal entry point for projects, tools, observations, and things taking shape.",explore:"Explore the space",status:"Currently",statusText:"Maintaining this site and the TOY lab",index:"Index",indexText:"Start with the things in use and take a closer look around.",tools:"Toolbox",profile:"About me",works:"Works & notes",selected:"Selected projects",photo:"A photograph",contact:"Find me",language:"中",languageLabel:"Switch to Chinese",top:"Back to top",lock:"Enter again",unlock:"Swipe up to enter",unlockHint:"Swipe up on Sakura to enter the personal engine",unlocked:"Ready to enter",gateTitle:"Swipe up into<br><i>personal engine.</i>",gateFoot:"No login, just a deliberate entrance.",library:"Personal library",libraryText:"Projects, subsites, tools, and visual notes arranged on one open rail.",dragExplore:"Swipe left/right to explore",open:"Open",back:"Back home",subsiteWip:"This is an accessible first draft of the subsite.",notFoundTitle:"Page not found",notFoundHeading:"This address<br><i>has nothing.</i>",notFoundBody:"The link may have changed, or it never existed at all.",notFoundCta:"Back home",engineHeading:"A few places I<br><i>return to.</i>",engineIntro:"Simple, useful, and close at hand.",profileHeading:"in progress.",worksHeading:"Made,<br><i>observed.</i>",worksIntro:"Software projects and photographs. How I work, and how I look at the world."}},te=()=>{try{return localStorage.getItem(z)==="en"?"en":"zh"}catch{return"zh"}};let m=te();const K=()=>{typeof document>"u"||(document.documentElement.lang=m==="zh"?"zh-CN":"en")};K();const ne=()=>m;function oe(e){m=e==="en"?"en":"zh";try{localStorage.setItem(z,m)}catch{}return K(),m}const ae=()=>oe(m==="zh"?"en":"zh"),n=()=>ee[m],c=e=>e?e[m]:"",l=(e,t)=>({zh:e,en:t}),w={author:"Linn",email:"hello@wwhooo.com",github:"https://github.com/ONLYLOVELYKISS"},I={statement:l("技术是我靠近问题的方式，不是我介绍自己的全部。","Technology is how I get closer to problems, not the whole story of who I am."),bio:l("我在网站、自动化工具与跨技术栈实验之间移动。这里是一个持续生长的个人入口。","I move between websites, automation, and experiments across stacks. This is a personal entry point that keeps growing."),focus:l("来自中国西安，关注个人网站、自动化、实用工具，以及从小念头开始、最后变成可使用的东西。","Based in Xi’an, China. I care about personal websites, automation, useful tools, and small ideas that become usable things.")},se=[{title:"Search",items:[{name:"Google",note:l("通用搜索","General search"),url:"https://www.google.com/"},{name:"Bing",note:l("搜索与图像","Search and images"),url:"https://www.bing.com/"},{name:"GitHub",note:l("代码与开源","Code and open source"),url:"https://github.com/"}]},{title:"Build",items:[{name:"MDN",note:l("Web 文档","Web documentation"),url:"https://developer.mozilla.org/"},{name:"Can I Use",note:l("兼容性查询","Browser compatibility"),url:"https://caniuse.com/"},{name:"Vite",note:l("前端构建","Frontend build tool"),url:"https://vite.dev/"}]},{title:"AI / Tools",items:[{name:"ChatGPT",note:l("AI 工具","AI tools"),url:"https://chatgpt.com/"},{name:"Regex101",note:l("正则调试","Regular expression tester"),url:"https://regex101.com/"},{name:"JSON Crack",note:l("数据可视化","Data visualization"),url:"https://jsoncrack.com/"}]}],ie=[{name:"wwhooo.com",stack:"PERSONAL HOMEPAGE",period:"2026",desc:l("以摄影、项目和个人档案为入口，重新组织一个人的公开空间。","A personal space organized around photography, projects, and profile."),url:"https://github.com/ONLYLOVELYKISS/wwhooo-homepage"},{name:"TOY",stack:"PYTHON / AI + INTERNET",period:"2025—",desc:l("阶段性生长的实验场：把好奇心拆成小工具，把小工具变成可运行的东西。","A growing lab for turning curiosity into small, runnable tools."),url:"https://github.com/ONLYLOVELYKISS/TOY"},{name:"chaoxing-sign-cli",stack:"TYPESCRIPT / AUTOMATION",period:"ARCHIVE",desc:l("围绕具体使用场景构建的自动化工具，探索监测、签到和消息推送。","An automation tool exploring monitoring, sign-ins, and notifications."),url:"https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli"}],A=[{path:"/toy/",name:"TOY LAB",tone:"lab",title:l("TOY 实验场","TOY Lab"),desc:l("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run.")},{path:"/notes/",name:"NIGHT NOTES",tone:"notes",title:l("夜间札记","Night Notes"),desc:l("把观察、片段和还没有结论的想法放在这里。","Observations, fragments, and thoughts without conclusions yet.")}],g={title:l("Sakura / 夜间花卉","Sakura / Night Bloom"),note:l("在暗处保留一点温度。","Keeping a little warmth in the dark."),alt:l("夜色中盛开的樱花特写","A close-up of sakura blossoms against a dark night"),widths:[800,1600,2400],fallback:"/images/sakura-1600.jpg",width:2400,height:1004},re=(e=g.widths)=>e.map(t=>`/images/sakura-${t}.webp ${t}w`).join(", "),le=[{name:"GitHub",url:w.github,rel:"me"},{name:"Email",url:`mailto:${w.email}`}],d=(e,t)=>({zh:e,en:t}),ce={title:d("Linn — 值得留下的东西","Linn — Things worth keeping"),description:d("Linn 的个人主页：摄影、软件项目、个人档案与常用工具。","Linn’s personal homepage: photography, software projects, profile, and everyday tools.")},de={title:d("页面不存在 — Linn","Page not found — Linn"),description:d("这个地址没有对应的内容。","This address has no matching content."),noindex:!0},Y={"/":ce,"/engine/":{title:d("工具 — Linn","Tools — Linn"),description:d("常用工具入口：搜索、构建、AI 与调试。","Everyday tools: search, build, AI, and debugging.")},"/profile/":{title:d("档案 — Linn","Profile — Linn"),description:d("关于 Linn：个人网站、自动化工具与跨技术栈实验。","About Linn: personal websites, automation, and experiments across stacks.")},"/works/":{title:d("作品与记录 — Linn","Works & notes — Linn"),description:d("软件项目与摄影作品。","Software projects and photographs.")},"/toy/":{title:d("TOY 实验场 — Linn","TOY Lab — Linn"),description:d("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run."),noindex:!0},"/notes/":{title:d("夜间札记 — Linn","Night Notes — Linn"),description:d("观察、片段和还没有结论的想法。","Observations, fragments, and thoughts without conclusions yet."),noindex:!0}},ue=Object.keys(Y);ue.filter(e=>!Y[e].noindex);const j="https://wwhooo.com",pe=[["/",0],["/engine/",1],["/profile/",2],["/works/",3]];function H({sizes:e,priority:t=!1}){const o=t?'fetchpriority="high"':'loading="lazy"';return`<picture>
        <source type="image/webp" srcset="${re()}" sizes="${e}">
        <img src="${g.fallback}" width="${g.width}" height="${g.height}" alt="${c(g.alt)}" ${o} decoding="async">
      </picture>`}function ge(e=""){const t=pe.map(([o,s])=>`<a href="${o}"${e===o?' aria-current="page"':""}>${n().nav[s]}</a>`).join("");return`<header class="site-header">
      <a class="brand" href="/" aria-label="${w.author} — home"><span aria-hidden="true">WW</span><b>LINN</b></a>
      <nav aria-label="${n().navLabel}">${t}</nav>
      <button class="language" id="language" type="button" aria-label="${n().languageLabel}">${n().language}</button>
    </header>`}function he(){return`<footer>
      <span>© ${new Date().getFullYear()} ${w.author.toUpperCase()}</span>
      <span>WW / PERSONAL ENGINE</span>
      <a href="#top">${n().top} ↑</a>
    </footer>`}function f(e,t=""){return`<a class="skip-link" href="#top">${n().skip}</a>${ge(t)}<main id="top" tabindex="-1">${e}</main>${he()}`}function me(){return`<section class="entry-gate${y()?" gate-complete":""}" id="entry-gate" aria-label="${n().unlock}">
      <div class="gate-image">
        ${H({sizes:"(max-width: 768px) 100vw, 60vw",priority:!0})}
        <div class="gate-vignette"></div>
      </div>
      <div class="gate-copy">
        <span class="kicker">WW / SAKURA ENTRY</span>
        <p class="gate-status">${n().unlocked}</p>
        <h1>${n().gateTitle}</h1>
        <p class="gate-hint">${n().unlockHint}</p>
        <button class="swipe-capsule" id="enter-button" type="button">
          <span class="swipe-thumb" aria-hidden="true"><span class="chevron">↑</span></span>
          <span class="swipe-text">${n().unlock}</span>
        </button>
        <p class="gate-foot">${n().gateFoot}</p>
      </div>
      <b class="gate-mark" aria-hidden="true">桜</b>
    </section>`}function fe(){return`<section class="landing">
        <div class="landing-image">
          ${H({sizes:"(max-width: 768px) 100vw, 55vw"})}
          <div class="image-caption">${c(g.title)}<span>${c(g.note)}</span></div>
        </div>
        <div class="landing-copy">
          <p class="kicker">${n().eyebrow}</p>
          <h2>${n().title}</h2>
          <p class="lead">${n().intro}</p>
          <a class="primary-link" href="#library">${n().explore}<span aria-hidden="true">↓</span></a>
          <div class="now"><span>${n().status}</span><strong>${n().statusText}</strong></div>
        </div>
      </section>`}function be(e){return`<a class="library-card ${e.tone}" href="${e.path}">
          <small>${e.name}</small>
          <strong>${c(e.title)}</strong>
          <span>${n().open} ↗</span>
        </a>`}function $e(){const e=`<a class="library-card sakura-card" href="/works/">
          <small>SAKURA / IMAGE</small>
          <strong>${c(g.title)}</strong>
          <span>${n().open} ↗</span>
        </a>
        <a class="library-card engine-card" href="/engine/">
          <small>ENGINE / LINKS</small>
          <strong>${c({zh:"常用入口",en:"Everyday links"})}</strong>
          <span>${n().open} ↗</span>
        </a>`;return`<section class="library-section" id="library">
        <div class="library-head">
          <div class="section-label">
            <span>01</span>
            <h2>${n().library}</h2>
            <p>${n().libraryText}</p>
          </div>
          <span class="library-tip">${n().dragExplore} ↔</span>
        </div>
        <div class="library-rail" tabindex="0" role="group" aria-label="${n().library}">
          ${A.map(be).join("")}${e}
        </div>
      </section>`}function ke(){const e=[["/engine/","01",n().tools,"ENGINE"],["/profile/","02",n().profile,"PROFILE"],["/works/","03",n().works,"WORKS"]].map(([t,o,s,i])=>`<a href="${t}">
            <span>${o}</span>
            <div><small>${s}</small><h3>${i}</h3></div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return`<section class="index-section">
        <div class="section-label">
          <span>02</span>
          <h2>${n().index}</h2>
          <p>${n().indexText}</p>
        </div>
        <div class="index-links">${e}</div>
      </section>`}function we(){return`<section class="statement-band">
        <p>“${c(I.statement)}”</p>
        <a href="/profile/">${n().profile} ↗</a>
      </section>`}function ye(){const e=y(),t=e?"is-unlocked":"is-locked",o=e?"":' inert aria-hidden="true"';return f(`<div class="engine-home ${t}" id="engine-home">
      ${me()}
      <div class="home-content" id="home-content"${o}>
        ${fe()}
        ${$e()}
        ${ke()}
        ${we()}
      </div>
      <button class="lock-button" id="lock-entry" type="button">${n().lock} ×</button>
    </div>`,"/")}function ve(){const e=se.map(t=>`<section>
          <h2>${t.title}</h2>
          ${t.items.map(o=>`<a class="tool-row" href="${o.url}" target="_blank" rel="noopener noreferrer">
              <strong>${o.name}</strong>
              <span>${c(o.note)}</span>
              <b aria-hidden="true">↗</b>
            </a>`).join("")}
        </section>`).join("");return f(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">02 / ENGINE</span>
        <h1>${n().engineHeading}</h1>
        <p>${n().engineIntro}</p>
      </div>
      <div class="tool-groups">${e}</div>
    </section>`,"/engine/")}function Le(){const e=le.map(t=>`<a href="${t.url}"${t.rel?` rel="${t.rel}"`:""}>${t.name} ↗</a>`).join("");return f(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">03 / PROFILE</span>
        <h1>Linn,<br><i>${n().profileHeading}</i></h1>
      </div>
      <div class="profile-layout">
        <blockquote>${c(I.bio)}</blockquote>
        <div class="profile-copy">
          <p>${c(I.focus)}</p>
          <div class="contact"><span>${n().contact}</span>${e}</div>
        </div>
      </div>
    </section>`,"/profile/")}function Se(){const e=ie.map((t,o)=>`<a class="project-row" href="${t.url}" target="_blank" rel="noopener noreferrer">
            <span>0${o+1}</span>
            <div>
              <small>${t.stack} / ${t.period}</small>
              <h2>${t.name}</h2>
              <p>${c(t.desc)}</p>
            </div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return f(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">04 / WORKS</span>
        <h1>${n().worksHeading}</h1>
        <p>${n().worksIntro}</p>
      </div>
      <section class="works-list">
        <div class="section-label"><span>01</span><h2>${n().selected}</h2></div>
        <div>${e}</div>
      </section>
      <section class="photo-section">
        <div class="section-label"><span>02</span><h2>${n().photo}</h2></div>
        <figure>
          ${H({sizes:"(max-width: 768px) 100vw, 70vw"})}
          <figcaption><strong>${c(g.title)}</strong><span>${c(g.note)}</span></figcaption>
        </figure>
      </section>
    </section>`,"/works/")}function C(e){return f(`<section class="subsite-page ${e.tone}">
      <a class="back-link" href="/">← ${n().back}</a>
      <span class="kicker">SUBSITE / ${e.name}</span>
      <h1>${c(e.title)}</h1>
      <p>${c(e.desc)}</p>
      <div class="subsite-placeholder">
        <span>WIP / ${new Date().getFullYear()}</span>
        <strong>${n().subsiteWip}</strong>
        <a href="/engine/">${n().tools} ↗</a>
      </div>
    </section>`,"")}function Ee(){return f(`<section class="inner-page not-found">
      <div class="page-intro">
        <span class="kicker">404 / NOT FOUND</span>
        <h1>${n().notFoundHeading}</h1>
        <p>${n().notFoundBody}</p>
      </div>
      <p class="not-found-cta"><a class="primary-link" href="/">${n().notFoundCta}<span aria-hidden="true">↗</span></a></p>
    </section>`,"")}const O={"/":ye,"/engine/":ve,"/profile/":Le,"/works/":Se,"/toy/":()=>C(A[0]),"/notes/":()=>C(A[1])};function q(e){const t=e.replace(/\/+$/,"");return t===""||t==="/index.html"?"/":`${t}/`}const P=()=>q(location.pathname);function b(e,t,o){let s=document.head.querySelector(`meta[${e}="${t}"]`);s||(s=document.createElement("meta"),s.setAttribute(e,t),document.head.append(s)),s.setAttribute("content",o)}function Te(e,t){let o=document.head.querySelector(`link[rel="${e}"]`);o||(o=document.createElement("link"),o.setAttribute("rel",e),document.head.append(o)),o.setAttribute("href",t)}function xe(e,t){const o=ne(),s=t.title[o],i=t.description[o],a=e?`${j}${e}`:`${j}/`;document.title=s,b("name","description",i),b("property","og:title",s),b("property","og:description",i),b("property","og:url",a),b("name","robots",t.noindex?"noindex, follow":"index, follow"),Te("canonical",a)}const Ie=()=>document.querySelector("#app");let B=()=>{};const Ae=e=>{B=e};function v(e=P()){const t=Object.hasOwn(O,e),o=t?O[e]:Ee;return Ie().innerHTML=o(),xe(t?e:null,t?Y[e]:de),document.body.classList.toggle("is-locked",e==="/"&&!y()),B(),t}function Oe(e,{hash:t="",replace:o=!1}={}){const s=`${e}${t}`;if(o?history.replaceState({path:e},"",s):history.pushState({path:e},"",s),v(e),t){document.querySelector(t)?.scrollIntoView();return}window.scrollTo(0,0),document.querySelector("#top")?.focus({preventScroll:!0})}function Ne(){document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.target.closest?.("a");if(!t||t.target==="_blank"||t.hasAttribute("download"))return;const o=new URL(t.href,location.href);if(o.origin!==location.origin)return;const s=q(o.pathname);if(Object.hasOwn(O,s)&&!(o.pathname===location.pathname&&o.hash)){if(e.preventDefault(),o.pathname===location.pathname){window.scrollTo(0,0);return}Oe(s,{hash:o.hash})}}),window.addEventListener("popstate",()=>{v(P())})}function Ye(){const e=document.querySelector(".library-rail");e&&e.addEventListener("wheel",t=>{if(Math.abs(t.deltaY)<=Math.abs(t.deltaX))return;const o=e.scrollWidth-e.clientWidth;if(o<=0)return;const s=e.scrollLeft<=0&&t.deltaY<0,i=e.scrollLeft>=o-1&&t.deltaY>0;s||i||(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1})}function He(){Z(),Ye()}Ae(He);Ne();v();document.addEventListener("click",e=>{e.target.closest?.("#language")&&(ae(),v(P()))});
