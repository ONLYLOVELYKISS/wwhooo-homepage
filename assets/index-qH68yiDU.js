(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const R="wwhooo-entered",T=()=>{try{return sessionStorage.getItem(R)==="1"}catch{return!1}},ne=()=>{try{sessionStorage.setItem(R,"1")}catch{}},oe=()=>{try{sessionStorage.removeItem(R)}catch{}},Y=.8,ae=130,ie=320;function re(){const e=document.querySelector("#entry-gate"),t=document.querySelector("#enter-button"),n=document.querySelector("#engine-home"),a=document.querySelector("#home-content"),r=document.querySelector("#lock-entry");if(!e||!t||!n)return;let i=T(),p=0,f=null,A=0,w=0,q=0,I=0;const v=()=>{t.style.setProperty("--swipe-ratio",String(p))},N=()=>{const s=(u,te)=>{u&&(te?u.setAttribute("inert",""):u.removeAttribute("inert"))};s(e,i),e.classList.toggle("gate-complete",i),n.classList.toggle("is-unlocked",i),n.classList.toggle("is-locked",!i),s(a,!i),a&&a.setAttribute("aria-hidden",String(!i)),document.body.classList.toggle("is-locked",!i),document.documentElement.classList.toggle("entered",i)},W=()=>{i||(i=!0,p=1,v(),ne(),N(),requestAnimationFrame(()=>{document.querySelector("#top")?.focus({preventScroll:!0})}))},O=()=>{p=0,w=0,v()},B=s=>{p=Math.max(0,Math.min(1,s)),v(),p>=Y&&W()},Q=()=>{i=!1,oe(),O(),N(),requestAnimationFrame(()=>t.focus({preventScroll:!0}))},Z=s=>{i||f!==null||(f=s.pointerId,A=s.clientY,I=0,s.currentTarget.setPointerCapture?.(f),t.classList.add("is-dragging"))},ee=s=>{f===null||s.pointerId!==f||(Math.abs(s.clientY-A)>6&&(I=Date.now()+400),B((A-s.clientY)/ae))},G=s=>{f===null||s.pointerId!==f||(f=null,t.classList.remove("is-dragging"),s.currentTarget.releasePointerCapture?.(s.pointerId),p<Y&&O())};for(const s of[t,e])s.addEventListener("pointerdown",u=>{u.pointerType==="mouse"&&u.currentTarget===e||u.currentTarget===e&&u.target.closest?.(".swipe-capsule")||Z(u)}),s.addEventListener("pointermove",ee),s.addEventListener("pointerup",G),s.addEventListener("pointercancel",G);t.addEventListener("click",()=>{i||Date.now()<I||W()}),e.addEventListener("wheel",s=>{if(i||e.scrollHeight>e.clientHeight+4)return;const u=Math.abs(s.deltaY)>=Math.abs(s.deltaX)?s.deltaY:0;u&&(w=Math.max(0,w+u),B(w/ie),clearTimeout(q),q=setTimeout(()=>{p<Y&&O()},360))},{passive:!0}),r?.addEventListener("click",Q),N(),v()}const l=(e,t)=>({zh:e,en:t}),E={author:"Linn",email:"wwhooo@icloud.com",github:"https://github.com/ONLYLOVELYKISS"},H={statement:l("技术是我靠近问题的方式，不是我介绍自己的全部。","Technology is how I get closer to problems, not the whole story of who I am."),bio:l("我在网站、自动化工具与跨技术栈实验之间移动。这里是一个持续生长的个人入口。","I move between websites, automation, and experiments across stacks. This is a personal entry point that keeps growing."),focus:l("来自中国西安，关注个人网站、自动化、实用工具，以及从小念头开始、最后变成可使用的东西。","Based in Xi’an, China. I care about personal websites, automation, useful tools, and small ideas that become usable things.")},se=[{title:"Search",items:[{name:"Google",note:l("通用搜索","General search"),url:"https://www.google.com/"},{name:"Bing",note:l("搜索与图像","Search and images"),url:"https://www.bing.com/"},{name:"GitHub",note:l("代码与开源","Code and open source"),url:"https://github.com/"}]},{title:"Build",items:[{name:"MDN",note:l("Web 文档","Web documentation"),url:"https://developer.mozilla.org/"},{name:"Can I Use",note:l("兼容性查询","Browser compatibility"),url:"https://caniuse.com/"},{name:"Vite",note:l("前端构建","Frontend build tool"),url:"https://vite.dev/"}]},{title:"AI / Tools",items:[{name:"ChatGPT",note:l("AI 工具","AI tools"),url:"https://chatgpt.com/"},{name:"Regex101",note:l("正则调试","Regular expression tester"),url:"https://regex101.com/"},{name:"JSON Crack",note:l("数据可视化","Data visualization"),url:"https://jsoncrack.com/"}]}],le=[{name:"wwhooo.com",stack:"PERSONAL HOMEPAGE",period:"2026",desc:l("以摄影、项目和个人档案为入口，重新组织一个人的公开空间。","A personal space organized around photography, projects, and profile."),url:"https://github.com/ONLYLOVELYKISS/wwhooo-homepage"},{name:"TOY",stack:"PYTHON / AI + INTERNET",period:"2025—",desc:l("阶段性生长的实验场：把好奇心拆成小工具，把小工具变成可运行的东西。","A growing lab for turning curiosity into small, runnable tools."),url:"https://github.com/ONLYLOVELYKISS/TOY"}],j=[{name:"chaoxing-sign-cli",stack:"TYPESCRIPT / AUTOMATION",period:"ARCHIVE",desc:l("围绕具体使用场景构建的自动化工具，探索监测、签到和消息推送。","An automation tool exploring monitoring, sign-ins, and notifications."),url:"https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli"}],P=[{id:"toy",name:"TOY LAB",tone:"lab",title:l("TOY 实验场","TOY Lab"),desc:l("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run.")},{id:"notes",name:"NIGHT NOTES",tone:"notes",title:l("夜间札记","Night Notes"),desc:l("把观察、片段和还没有结论的想法放在这里。","Observations, fragments, and thoughts without conclusions yet.")}],m={title:l("Sakura / 夜间花卉","Sakura / Night Bloom"),note:l("在暗处保留一点温度。","Keeping a little warmth in the dark."),alt:l("夜色中盛开的樱花特写","A close-up of sakura blossoms against a dark night"),widths:[800,1600,2400],fallback:"/images/sakura-1600.jpg",width:2400,height:1004},ce=(e=m.widths)=>e.map(t=>`/images/sakura-${t}.webp ${t}w`).join(", "),de=[{name:"GitHub",url:E.github,rel:"me"},{name:"Email",url:`mailto:${E.email}`}],d=(e,t)=>({zh:e,en:t}),L="https://wwhooo.com",z=["zh","en"],y={zh:"zh-CN",en:"en"},pe={zh:"zh_CN",en:"en_US"},ue=e=>e==="zh"?"en":"zh",b=e=>e==="/"?"/en/":`/en${e}`,x=[{id:"home",path:{zh:"/",en:b("/")},title:d("Linn — 值得留下的东西","Linn — Things worth keeping"),description:d("Linn 的个人主页：摄影、软件项目、个人档案与常用工具。","Linn’s personal homepage: photography, software projects, profile, and everyday tools.")},{id:"engine",path:{zh:"/engine/",en:b("/engine/")},title:d("工具 — Linn","Tools — Linn"),description:d("常用工具入口：搜索、构建、AI 与调试。","Everyday tools: search, build, AI, and debugging.")},{id:"profile",path:{zh:"/profile/",en:b("/profile/")},title:d("档案 — Linn","Profile — Linn"),description:d("关于 Linn：个人网站、自动化工具与跨技术栈实验。","About Linn: personal websites, automation, and experiments across stacks.")},{id:"works",path:{zh:"/works/",en:b("/works/")},title:d("作品与记录 — Linn","Works & notes — Linn"),description:d("软件项目与摄影作品。","Software projects and photographs.")},{id:"toy",path:{zh:"/toy/",en:b("/toy/")},title:d("TOY 实验场 — Linn","TOY Lab — Linn"),description:d("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run."),noindex:!0},{id:"notes",path:{zh:"/notes/",en:b("/notes/")},title:d("夜间札记 — Linn","Night Notes — Linn"),description:d("观察、片段和还没有结论的想法。","Observations, fragments, and thoughts without conclusions yet."),noindex:!0}],he={title:d("页面不存在 — Linn","Page not found — Linn"),description:d("这个地址没有对应的内容。","This address has no matching content."),noindex:!0},F=new Map(x.map(e=>[e.id,e])),K=new Map;for(const e of x)for(const t of z)K.set(e.path[t],{id:e.id,lang:t});x.flatMap(e=>z.map(t=>e.path[t]));x.filter(e=>!e.noindex).flatMap(e=>z.map(t=>e.path[t]));const ge=e=>F.get(e)??null,h=(e,t)=>F.get(e)?.path[t==="en"?"en":"zh"]??null,_=e=>K.get(e)??null,fe=e=>e==="/en/"||e.startsWith("/en/")?"en":"zh";function U(e){const t=e.replace(/\/index\.html$/,"/").replace(/\/+$/,"");return t===""?"/":`${t}/`}function me(e){const t=F.get(e);return t?[{hreflang:y.zh,href:`${L}${t.path.zh}`},{hreflang:y.en,href:`${L}${t.path.en}`},{hreflang:"x-default",href:`${L}${t.path.zh}`}]:[]}let S="zh",V=null;const g=()=>S,be=()=>V;function $e(e,t){return S=e==="en"?"en":"zh",V=t??null,typeof document<"u"&&(document.documentElement.lang=y[S]),S}const ke={zh:{skip:"跳到主要内容",navLabel:"主导航",nav:["首页","工具","档案","作品"],eyebrow:"Linn / Personal engine",title:"把值得留下的，<br>放在这里。",intro:"一个持续更新的个人入口：记录项目、工具、观察和正在形成的东西。",explore:"探索我的空间",status:"现在进行中",statusText:"维护个人网站，整理 TOY 实验场",index:"目录",indexText:"从正在使用的东西开始，逐步了解这个空间。",tools:"工具箱",profile:"关于我",works:"作品与记录",selected:"精选项目",archive:"归档",archiveNote:"较早的实验与工具，保留记录。",photo:"一张照片",contact:"联系我",language:"EN",languageLabel:"切换到英文",top:"回到顶部",lock:"重新进入",unlock:"向上滑动进入",unlockHint:"向上滑动 Sakura，进入个人引擎",unlocked:"准备进入",gateTitle:"向上滑动<br><i>进入引擎。</i>",gateFoot:"没有登录，只有一次主动进入。",library:"个人库",libraryText:"项目、子站、工具和视觉记录，放在同一条可探索的轨道上。",dragExplore:"左右滑动浏览",open:"进入",back:"返回主站",subsiteWip:"这是一个可访问的子站初稿。",notFoundTitle:"页面不存在",notFoundHeading:"这个地址<br><i>没有内容。</i>",notFoundBody:"也许链接已经改变，或者它从来没有存在过。",notFoundCta:"回到首页",engineHeading:"我会反复打开的<br><i>一些入口。</i>",engineIntro:"保持简单，保持可用。把常用的东西放在顺手的位置。",profileHeading:"持续进行中。",worksHeading:"做过，<br><i>看过。</i>",worksIntro:"软件项目和摄影作品。一个人如何工作，也如何看待周围的世界。"},en:{skip:"Skip to main content",navLabel:"Main navigation",nav:["Home","Tools","Profile","Works"],eyebrow:"Linn / Personal engine",title:"Things worth<br>keeping, here.",intro:"A living personal entry point for projects, tools, observations, and things taking shape.",explore:"Explore the space",status:"Currently",statusText:"Maintaining this site and the TOY lab",index:"Index",indexText:"Start with the things in use and take a closer look around.",tools:"Toolbox",profile:"About me",works:"Works & notes",selected:"Selected projects",archive:"Archive",archiveNote:"Earlier experiments and tools, kept for the record.",photo:"A photograph",contact:"Find me",language:"中",languageLabel:"Switch to Chinese",top:"Back to top",lock:"Enter again",unlock:"Swipe up to enter",unlockHint:"Swipe up on Sakura to enter the personal engine",unlocked:"Ready to enter",gateTitle:"Swipe up into<br><i>personal engine.</i>",gateFoot:"No login, just a deliberate entrance.",library:"Personal library",libraryText:"Projects, subsites, tools, and visual notes arranged on one open rail.",dragExplore:"Swipe left/right to explore",open:"Open",back:"Back home",subsiteWip:"This is an accessible first draft of the subsite.",notFoundTitle:"Page not found",notFoundHeading:"This address<br><i>has nothing.</i>",notFoundBody:"The link may have changed, or it never existed at all.",notFoundCta:"Back home",engineHeading:"A few places I<br><i>return to.</i>",engineIntro:"Simple, useful, and close at hand.",profileHeading:"in progress.",worksHeading:"Made,<br><i>observed.</i>",worksIntro:"Software projects and photographs. How I work, and how I look at the world."}},o=()=>ke[g()],c=e=>e?e[g()]:"",ye=[["home",0],["engine",1],["profile",2],["works",3]];function M({sizes:e,priority:t=!1}){const n=t?'fetchpriority="high"':'loading="lazy"';return`<picture>
        <source type="image/webp" srcset="${ce()}" sizes="${e}">
        <img src="${m.fallback}" width="${m.width}" height="${m.height}" alt="${c(m.alt)}" ${n} decoding="async">
      </picture>`}function we(e=""){const t=g(),n=ye.map(([i,p])=>{const f=e===i?' aria-current="page"':"";return`<a href="${h(i,t)}"${f}>${o().nav[p]}</a>`}).join(""),a=ue(t),r=h(be()??"home",a);return`<header class="site-header">
      <a class="brand" href="${h("home",t)}" aria-label="${E.author} — home"><span aria-hidden="true">WW</span><b>LINN</b></a>
      <nav aria-label="${o().navLabel}">${n}</nav>
      <a class="language" href="${r}" hreflang="${y[a]}" lang="${y[a]}" aria-label="${o().languageLabel}">${o().language}</a>
    </header>`}function ve(){return`<footer>
      <span>© ${new Date().getFullYear()} ${E.author.toUpperCase()}</span>
      <span>WW / PERSONAL ENGINE</span>
      <a href="#top">${o().top} ↑</a>
    </footer>`}function k(e,t=""){return`<a class="skip-link" href="#top">${o().skip}</a>${we(t)}<main id="top" tabindex="-1">${e}</main>${ve()}`}function Le(){return`<section class="entry-gate${T()?" gate-complete":""}" id="entry-gate" aria-label="${o().unlock}">
      <div class="gate-image">
        ${M({sizes:"(max-width: 768px) 100vw, 60vw",priority:!0})}
        <div class="gate-vignette"></div>
      </div>
      <div class="gate-copy">
        <span class="kicker">WW / SAKURA ENTRY</span>
        <p class="gate-status">${o().unlocked}</p>
        <h1>${o().gateTitle}</h1>
        <p class="gate-hint">${o().unlockHint}</p>
        <button class="swipe-capsule" id="enter-button" type="button">
          <span class="swipe-thumb" aria-hidden="true"><span class="chevron">↑</span></span>
          <span class="swipe-text">${o().unlock}</span>
        </button>
        <p class="gate-foot">${o().gateFoot}</p>
      </div>
      <b class="gate-mark" aria-hidden="true">桜</b>
    </section>`}function Se(){return`<section class="landing">
        <div class="landing-image">
          ${M({sizes:"(max-width: 768px) 100vw, 55vw"})}
          <div class="image-caption">${c(m.title)}<span>${c(m.note)}</span></div>
        </div>
        <div class="landing-copy">
          <p class="kicker">${o().eyebrow}</p>
          <h2>${o().title}</h2>
          <p class="lead">${o().intro}</p>
          <a class="primary-link" href="#library">${o().explore}<span aria-hidden="true">↓</span></a>
          <div class="now"><span>${o().status}</span><strong>${o().statusText}</strong></div>
        </div>
      </section>`}function Ee(e){return`<a class="library-card ${e.tone}" href="${h(e.id,g())}">
          <small>${e.name}</small>
          <strong>${c(e.title)}</strong>
          <span>${o().open} ↗</span>
        </a>`}function Te(){const e=`<a class="library-card sakura-card" href="${h("works",g())}">
          <small>SAKURA / IMAGE</small>
          <strong>${c(m.title)}</strong>
          <span>${o().open} ↗</span>
        </a>
        <a class="library-card engine-card" href="${h("engine",g())}">
          <small>ENGINE / LINKS</small>
          <strong>${c({zh:"常用入口",en:"Everyday links"})}</strong>
          <span>${o().open} ↗</span>
        </a>`;return`<section class="library-section" id="library">
        <div class="library-head">
          <div class="section-label">
            <span>01</span>
            <h2>${o().library}</h2>
            <p>${o().libraryText}</p>
          </div>
          <span class="library-tip">${o().dragExplore} ↔</span>
        </div>
        <div class="library-rail" tabindex="0" role="group" aria-label="${o().library}">
          ${P.map(Ee).join("")}${e}
        </div>
      </section>`}function xe(){const e=[["engine","01",o().tools,"ENGINE"],["profile","02",o().profile,"PROFILE"],["works","03",o().works,"WORKS"]].map(([t,n,a,r])=>`<a href="${h(t,g())}">
            <span>${n}</span>
            <div><small>${a}</small><h3>${r}</h3></div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return`<section class="index-section">
        <div class="section-label">
          <span>02</span>
          <h2>${o().index}</h2>
          <p>${o().indexText}</p>
        </div>
        <div class="index-links">${e}</div>
      </section>`}function Ae(){return`<section class="statement-band">
        <p>“${c(H.statement)}”</p>
        <a href="${h("profile",g())}">${o().profile} ↗</a>
      </section>`}function Ie(){const t=T()?"is-unlocked":"is-locked";return k(`<div class="engine-home ${t}" id="engine-home">
      ${Le()}
      <div class="home-content" id="home-content">
        ${Se()}
        ${Te()}
        ${xe()}
        ${Ae()}
      </div>
      <button class="lock-button" id="lock-entry" type="button">${o().lock} ×</button>
    </div>`,"home")}function Ne(){const e=se.map(t=>`<section>
          <h2>${t.title}</h2>
          ${t.items.map(n=>`<a class="tool-row" href="${n.url}" target="_blank" rel="noopener noreferrer">
              <strong>${n.name}</strong>
              <span>${c(n.note)}</span>
              <b aria-hidden="true">↗</b>
            </a>`).join("")}
        </section>`).join("");return k(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">02 / ENGINE</span>
        <h1>${o().engineHeading}</h1>
        <p>${o().engineIntro}</p>
      </div>
      <div class="tool-groups">${e}</div>
    </section>`,"engine")}function Oe(){const e=de.map(t=>`<a href="${t.url}"${t.rel?` rel="${t.rel}"`:""}>${t.name} ↗</a>`).join("");return k(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">03 / PROFILE</span>
        <h1>Linn,<br><i>${o().profileHeading}</i></h1>
      </div>
      <div class="profile-layout">
        <blockquote>${c(H.bio)}</blockquote>
        <div class="profile-copy">
          <p>${c(H.focus)}</p>
          <div class="contact"><span>${o().contact}</span>${e}</div>
        </div>
      </div>
    </section>`,"profile")}function Ye(){if(j.length===0)return"";const e=j.map(t=>`<li>
            <a href="${t.url}" target="_blank" rel="noopener noreferrer">
              <div>
                <span class="archive-name">${t.name}</span>
                <small>${t.stack} / ${t.period}</small>
                <p>${c(t.desc)}</p>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
          </li>`).join("");return`<section class="archive-section">
        <div class="section-label">
          <span>02</span>
          <h2>${o().archive}</h2>
          <p>${o().archiveNote}</p>
        </div>
        <ul class="archive-list">${e}</ul>
      </section>`}function He(){const e=le.map((t,n)=>`<a class="project-row" href="${t.url}" target="_blank" rel="noopener noreferrer">
            <span>0${n+1}</span>
            <div>
              <small>${t.stack} / ${t.period}</small>
              <h2>${t.name}</h2>
              <p>${c(t.desc)}</p>
            </div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return k(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">04 / WORKS</span>
        <h1>${o().worksHeading}</h1>
        <p>${o().worksIntro}</p>
      </div>
      <section class="works-list">
        <div class="section-label"><span>01</span><h2>${o().selected}</h2></div>
        <div>${e}</div>
      </section>
      ${Ye()}
      <section class="photo-section">
        <div class="section-label"><span>03</span><h2>${o().photo}</h2></div>
        <figure>
          ${M({sizes:"(max-width: 768px) 100vw, 70vw"})}
          <figcaption><strong>${c(m.title)}</strong><span>${c(m.note)}</span></figcaption>
        </figure>
      </section>
    </section>`,"works")}function D(e){return k(`<section class="subsite-page ${e.tone}">
      <a class="back-link" href="${h("home",g())}">← ${o().back}</a>
      <span class="kicker">SUBSITE / ${e.name}</span>
      <h1>${c(e.title)}</h1>
      <p>${c(e.desc)}</p>
      <div class="subsite-placeholder">
        <span>WIP / ${new Date().getFullYear()}</span>
        <strong>${o().subsiteWip}</strong>
        <a href="${h("engine",g())}">${o().tools} ↗</a>
      </div>
    </section>`,"")}function Pe(){return k(`<section class="inner-page not-found">
      <div class="page-intro">
        <span class="kicker">404 / NOT FOUND</span>
        <h1>${o().notFoundHeading}</h1>
        <p>${o().notFoundBody}</p>
      </div>
      <p class="not-found-cta"><a class="primary-link" href="${h("home",g())}">${o().notFoundCta}<span aria-hidden="true">↗</span></a></p>
    </section>`,"")}const Re={home:Ie,engine:Ne,profile:Oe,works:He,toy:()=>D(P[0]),notes:()=>D(P[1])},X=()=>U(location.pathname);function $(e,t,n){let a=document.head.querySelector(`meta[${e}="${t}"]`);a||(a=document.createElement("meta"),a.setAttribute(e,t),document.head.append(a)),a.setAttribute("content",n)}function ze(e,t){document.head.querySelector(`meta[${e}="${t}"]`)?.remove()}function Fe(e,t){let n=document.head.querySelector(`link[rel="${e}"]:not([hreflang])`);n||(n=document.createElement("link"),n.setAttribute("rel",e),document.head.append(n)),n.setAttribute("href",t)}function Me(e){document.head.querySelector(`link[rel="${e}"]:not([hreflang])`)?.remove()}function Ce(e,t){let n=document.head.querySelector(`link[rel="alternate"][hreflang="${e}"]`);n||(n=document.createElement("link"),n.setAttribute("rel","alternate"),n.setAttribute("hreflang",e),document.head.append(n)),n.setAttribute("href",t)}function qe(){document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(e=>e.remove())}function We(e,t){const n=e??he;if(document.title=n.title[t],$("name","description",n.description[t]),$("property","og:title",n.title[t]),$("property","og:description",n.description[t]),$("property","og:locale",pe[t]),$("name","robots",n.noindex?"noindex, follow":"index, follow"),!e){ze("property","og:url"),Me("canonical"),qe();return}const a=`${L}${e.path[t]}`;$("property","og:url",a),Fe("canonical",a);for(const r of me(e.id))Ce(r.hreflang,r.href)}const Be=()=>document.querySelector("#app");let J=()=>{};const Ge=e=>{J=e};function C(e=X()){const t=_(e),n=t?t.lang:fe(e),a=t?t.id:null,r=a?ge(a):null;return $e(n,a),Be().innerHTML=(a?Re[a]:Pe)(),We(r,n),document.body.classList.toggle("is-locked",a==="home"&&!T()),J(),a}function je(e,{hash:t="",replace:n=!1}={}){const a=`${e}${t}`;if(n?history.replaceState({path:e},"",a):history.pushState({path:e},"",a),C(e),t){document.querySelector(t)?.scrollIntoView();return}window.scrollTo(0,0),document.querySelector("#top")?.focus({preventScroll:!0})}function De(){document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.target.closest?.("a");if(!t||t.target==="_blank"||t.hasAttribute("download"))return;const n=new URL(t.getAttribute("href")??"",location.href);if(n.origin!==location.origin)return;const a=U(n.pathname);if(_(a)&&!(n.pathname===location.pathname&&n.hash)){if(e.preventDefault(),n.pathname===location.pathname){window.scrollTo(0,0);return}je(a,{hash:n.hash})}}),window.addEventListener("popstate",()=>{C(X())})}function Ke(){const e=document.querySelector(".library-rail");e&&e.addEventListener("wheel",t=>{if(Math.abs(t.deltaY)<=Math.abs(t.deltaX))return;const n=e.scrollWidth-e.clientWidth;if(n<=0)return;const a=e.scrollLeft<=0&&t.deltaY<0,r=e.scrollLeft>=n-1&&t.deltaY>0;a||r||(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1})}function _e(){re(),Ke()}Ge(_e);De();C();
