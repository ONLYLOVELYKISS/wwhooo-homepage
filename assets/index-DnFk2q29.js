(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(s){if(s.ep)return;s.ep=!0;const c=n(s);fetch(s.href,c)}})();const F="wwhooo-entered",x=()=>{try{return sessionStorage.getItem(F)==="1"}catch{return!1}},re=()=>{try{sessionStorage.setItem(F,"1")}catch{}},ie=()=>{try{sessionStorage.removeItem(F)}catch{}},P=.8,le=130,ce=280;function de(){const e=document.querySelector("#entry-gate"),t=document.querySelector("#enter-button"),n=document.querySelector("#engine-home"),a=document.querySelector("#home-content"),s=document.querySelector("#lock-entry");if(!e||!t||!n)return;const c=[document.querySelector(".skip-link"),document.querySelector(".site-header"),document.querySelector("footer")];let l=x(),m=0,b=null,I=0,w=0,G=0,N=0;const L=()=>{t.style.setProperty("--swipe-ratio",String(m))},O=()=>{const r=(h,se)=>{h&&(se?h.setAttribute("inert",""):h.removeAttribute("inert"))};r(e,l),e.classList.toggle("gate-complete",l),n.classList.toggle("is-unlocked",l),n.classList.toggle("is-locked",!l),r(a,!l),a&&a.setAttribute("aria-hidden",String(!l));for(const h of c)r(h,!l);document.body.classList.toggle("is-locked",!l),document.documentElement.classList.toggle("entered",l)},B=()=>{l||(l=!0,m=1,L(),re(),O(),requestAnimationFrame(()=>{document.querySelector("#top")?.focus({preventScroll:!0})}))},Y=()=>{m=0,w=0,L()},j=r=>{m=Math.max(0,Math.min(1,r)),L(),m>=P&&B()},ne=()=>{l=!1,ie(),Y(),O(),requestAnimationFrame(()=>t.focus({preventScroll:!0}))},oe=r=>{l||b!==null||(b=r.pointerId,I=r.clientY,N=0,r.currentTarget.setPointerCapture?.(b),t.classList.add("is-dragging"))},ae=r=>{b===null||r.pointerId!==b||(Math.abs(r.clientY-I)>6&&(N=Date.now()+400),j((I-r.clientY)/le))},D=r=>{b===null||r.pointerId!==b||(b=null,t.classList.remove("is-dragging"),r.currentTarget.releasePointerCapture?.(r.pointerId),m<P&&Y())};for(const r of[t,e])r.addEventListener("pointerdown",h=>{h.currentTarget===e&&h.target.closest?.(".swipe-capsule")||oe(h)}),r.addEventListener("pointermove",ae),r.addEventListener("pointerup",D),r.addEventListener("pointercancel",D);t.addEventListener("click",()=>{l||Date.now()<N||B()}),e.addEventListener("wheel",r=>{if(l)return;const h=Math.abs(r.deltaY)>=Math.abs(r.deltaX)?r.deltaY:0;h&&(w=Math.max(0,w+h),j(w/ce),clearTimeout(G),G=setTimeout(()=>{m<P&&Y()},360))},{passive:!0}),s?.addEventListener("click",ne),O(),L()}const i=(e,t)=>({zh:e,en:t}),R={author:"Linn",email:"wwhooo@icloud.com",github:"https://github.com/ONLYLOVELYKISS"},z={statement:i("技术是我靠近问题的方式，不是我介绍自己的全部。","Technology is how I get closer to problems, not the whole story of who I am."),bio:i("我在网站、自动化工具与跨技术栈实验之间移动。这里是一个持续生长的个人入口。","I move between websites, automation, and experiments across stacks. This is a personal entry point that keeps growing."),focus:i("来自中国西安，关注个人网站、自动化、实用工具，以及从小念头开始、最后变成可使用的东西。","Based in Xi’an, China. I care about personal websites, automation, useful tools, and small ideas that become usable things.")},pe=[{title:"Search",items:[{name:"Google",note:i("通用搜索","General search"),url:"https://www.google.com/"},{name:"Bing",note:i("搜索与图像","Search and images"),url:"https://www.bing.com/"},{name:"GitHub",note:i("代码与开源","Code and open source"),url:"https://github.com/"}]},{title:"Build",items:[{name:"MDN",note:i("Web 文档","Web documentation"),url:"https://developer.mozilla.org/"},{name:"Can I Use",note:i("兼容性查询","Browser compatibility"),url:"https://caniuse.com/"},{name:"Vite",note:i("前端构建","Frontend build tool"),url:"https://vite.dev/"}]},{title:"AI / Tools",items:[{name:"ChatGPT",note:i("AI 工具","AI tools"),url:"https://chatgpt.com/"},{name:"Regex101",note:i("正则调试","Regular expression tester"),url:"https://regex101.com/"},{name:"JSON Crack",note:i("数据可视化","Data visualization"),url:"https://jsoncrack.com/"}]}],ue=[{name:"wwhooo.com",stack:"PERSONAL HOMEPAGE",period:"2026",desc:i("以摄影、项目和个人档案为入口，重新组织一个人的公开空间。","A personal space organized around photography, projects, and profile."),url:"https://github.com/ONLYLOVELYKISS/wwhooo-homepage"},{name:"TOY",stack:"PYTHON / AI + INTERNET",period:"2025—",desc:i("阶段性生长的实验场：把好奇心拆成小工具，把小工具变成可运行的东西。","A growing lab for turning curiosity into small, runnable tools."),url:"https://github.com/ONLYLOVELYKISS/TOY"}],K=[{name:"chaoxing-sign-cli",stack:"TYPESCRIPT / AUTOMATION",period:"ARCHIVE",desc:i("围绕具体使用场景构建的自动化工具，探索监测、签到和消息推送。","An automation tool exploring monitoring, sign-ins, and notifications."),url:"https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli"}],H=[{id:"toy",name:"TOY LAB",tone:"lab",title:i("TOY 实验场","TOY Lab"),desc:i("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run.")},{id:"notes",name:"NIGHT NOTES",tone:"notes",title:i("夜间札记","Night Notes"),desc:i("把观察、片段和还没有结论的想法放在这里。","Observations, fragments, and thoughts without conclusions yet.")}],f={title:i("Sakura / 夜间花卉","Sakura / Night Bloom"),note:i("在暗处保留一点温度。","Keeping a little warmth in the dark."),alt:i("夜色中盛开的樱花特写","A close-up of sakura blossoms against a dark night"),widths:[800,1600,2400],fallback:"/images/sakura-1600.jpg",width:2400,height:1004},he=(e=f.widths)=>e.map(t=>`/images/sakura-${t}.webp ${t}w`).join(", "),ge=[{name:"GitHub",url:R.github,rel:"me"},{name:"Email",url:`mailto:${R.email}`}],u=(e,t)=>({zh:e,en:t}),S="https://wwhooo.com",M=["zh","en"],$={zh:"zh-CN",en:"en"},fe={zh:"zh_CN",en:"en_US"},E=e=>e==="zh"?"en":"zh",k=e=>e==="/"?"/en/":`/en${e}`,A=[{id:"home",path:{zh:"/",en:k("/")},title:u("Linn — 值得留下的东西","Linn — Things worth keeping"),description:u("Linn 的个人主页：摄影、软件项目、个人档案与常用工具。","Linn’s personal homepage: photography, software projects, profile, and everyday tools.")},{id:"engine",path:{zh:"/engine/",en:k("/engine/")},title:u("工具 — Linn","Tools — Linn"),description:u("常用工具入口：搜索、构建、AI 与调试。","Everyday tools: search, build, AI, and debugging.")},{id:"profile",path:{zh:"/profile/",en:k("/profile/")},title:u("档案 — Linn","Profile — Linn"),description:u("关于 Linn：个人网站、自动化工具与跨技术栈实验。","About Linn: personal websites, automation, and experiments across stacks.")},{id:"works",path:{zh:"/works/",en:k("/works/")},title:u("作品与记录 — Linn","Works & notes — Linn"),description:u("软件项目与摄影作品。","Software projects and photographs.")},{id:"toy",path:{zh:"/toy/",en:k("/toy/")},title:u("TOY 实验场 — Linn","TOY Lab — Linn"),description:u("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run."),noindex:!0},{id:"notes",path:{zh:"/notes/",en:k("/notes/")},title:u("夜间札记 — Linn","Night Notes — Linn"),description:u("观察、片段和还没有结论的想法。","Observations, fragments, and thoughts without conclusions yet."),noindex:!0}],me={title:u("页面不存在 — Linn","Page not found — Linn"),description:u("这个地址没有对应的内容。","This address has no matching content."),noindex:!0},q=new Map(A.map(e=>[e.id,e])),V=new Map;for(const e of A)for(const t of M)V.set(e.path[t],{id:e.id,lang:t});A.flatMap(e=>M.map(t=>e.path[t]));A.filter(e=>!e.noindex).flatMap(e=>M.map(t=>e.path[t]));const be=e=>q.get(e)??null,g=(e,t)=>q.get(e)?.path[t==="en"?"en":"zh"]??null,X=e=>V.get(e)??null,$e=e=>e==="/en/"||e.startsWith("/en/")?"en":"zh";function J(e){const t=e.replace(/\/index\.html$/,"/").replace(/\/+$/,"");return t===""?"/":`${t}/`}function ke(e){const t=q.get(e);return t?[{hreflang:$.zh,href:`${S}${t.path.zh}`},{hreflang:$.en,href:`${S}${t.path.en}`},{hreflang:"x-default",href:`${S}${t.path.zh}`}]:[]}let T="zh",Q=null;const p=()=>T,Z=()=>Q;function ye(e,t){return T=e==="en"?"en":"zh",Q=t??null,typeof document<"u"&&(document.documentElement.lang=$[T]),T}const ve={zh:{skip:"跳到主要内容",navLabel:"主导航",nav:["首页","工具","档案","作品"],eyebrow:"Linn / Personal engine",title:"把值得留下的，<br>放在这里。",intro:"一个持续更新的个人入口：记录项目、工具、观察和正在形成的东西。",explore:"探索我的空间",status:"现在进行中",statusText:"维护个人网站，整理 TOY 实验场",index:"目录",indexText:"从正在使用的东西开始，逐步了解这个空间。",tools:"工具箱",profile:"关于我",works:"作品与记录",selected:"精选项目",archive:"归档",archiveNote:"较早的实验与工具，保留记录。",photo:"一张照片",contact:"联系我",language:"EN",languageLabel:"切换到英文",otherLanguageName:"English",top:"回到顶部",lock:"重新进入",unlock:"向上滑动进入",unlockHint:"在屏幕任意位置向上滑动，进入个人引擎",unlocked:"准备进入",gateTitle:"向上滑动<br><i>进入引擎。</i>",gateFoot:"没有登录，只有一次主动进入。",library:"个人库",libraryText:"项目、子站、工具和视觉记录，放在同一条可探索的轨道上。",dragExplore:"左右滑动浏览",open:"进入",back:"返回主站",subsiteWip:"这是一个可访问的子站初稿。",notFoundTitle:"页面不存在",notFoundHeading:"这个地址<br><i>没有内容。</i>",notFoundBody:"也许链接已经改变，或者它从来没有存在过。",notFoundCta:"回到首页",engineHeading:"我会反复打开的<br><i>一些入口。</i>",engineIntro:"保持简单，保持可用。把常用的东西放在顺手的位置。",profileHeading:"持续进行中。",worksHeading:"做过，<br><i>看过。</i>",worksIntro:"软件项目和摄影作品。一个人如何工作，也如何看待周围的世界。"},en:{skip:"Skip to main content",navLabel:"Main navigation",nav:["Home","Tools","Profile","Works"],eyebrow:"Linn / Personal engine",title:"Things worth<br>keeping, here.",intro:"A living personal entry point for projects, tools, observations, and things taking shape.",explore:"Explore the space",status:"Currently",statusText:"Maintaining this site and the TOY lab",index:"Index",indexText:"Start with the things in use and take a closer look around.",tools:"Toolbox",profile:"About me",works:"Works & notes",selected:"Selected projects",archive:"Archive",archiveNote:"Earlier experiments and tools, kept for the record.",photo:"A photograph",contact:"Find me",language:"中",languageLabel:"Switch to Chinese",otherLanguageName:"中文",top:"Back to top",lock:"Enter again",unlock:"Swipe up to enter",unlockHint:"Swipe up anywhere to enter the personal engine",unlocked:"Ready to enter",gateTitle:"Swipe up into<br><i>personal engine.</i>",gateFoot:"No login, just a deliberate entrance.",library:"Personal library",libraryText:"Projects, subsites, tools, and visual notes arranged on one open rail.",dragExplore:"Swipe left/right to explore",open:"Open",back:"Back home",subsiteWip:"This is an accessible first draft of the subsite.",notFoundTitle:"Page not found",notFoundHeading:"This address<br><i>has nothing.</i>",notFoundBody:"The link may have changed, or it never existed at all.",notFoundCta:"Back home",engineHeading:"A few places I<br><i>return to.</i>",engineIntro:"Simple, useful, and close at hand.",profileHeading:"in progress.",worksHeading:"Made,<br><i>observed.</i>",worksIntro:"Software projects and photographs. How I work, and how I look at the world."}},o=()=>ve[p()],d=e=>e?e[p()]:"",we=[["home",0],["engine",1],["profile",2],["works",3]];function C({sizes:e,priority:t=!1}){const n=t?'fetchpriority="high"':'loading="lazy"';return`<picture>
        <source type="image/webp" srcset="${he()}" sizes="${e}">
        <img src="${f.fallback}" width="${f.width}" height="${f.height}" alt="${d(f.alt)}" ${n} decoding="async">
      </picture>`}function Le(e=""){const t=p(),n=we.map(([a,s])=>{const c=e===a?' aria-current="page"':"";return`<a href="${g(a,t)}"${c}>${o().nav[s]}</a>`}).join("");return`<header class="site-header">
      <a class="brand" href="${g("home",t)}"><span>WW</span><b>LINN</b></a>
      <nav aria-label="${o().navLabel}">${n}</nav>
      ${Se()}
    </header>`}function Se(){const e=E(p());return`<a class="language" href="${g(Z()??"home",e)}" hreflang="${$[e]}" lang="${$[e]}">${o().language}<span class="sr-only"> — ${o().languageLabel}</span></a>`}function Ee(){return`<footer>
      <span>© ${new Date().getFullYear()} ${R.author.toUpperCase()}</span>
      <span>WW / PERSONAL ENGINE</span>
      <a href="#top">${o().top} ↑</a>
    </footer>`}function v(e,t=""){return`<a class="skip-link" href="#top">${o().skip}</a>${Le(t)}<main id="top" tabindex="-1">${e}</main>${Ee()}`}function Te(){return`<section class="entry-gate${x()?" gate-complete":""}" id="entry-gate" aria-label="${o().unlock}">
      <div class="gate-image">
        ${C({sizes:"(max-width: 768px) 100vw, 60vw",priority:!0})}
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
        <p class="gate-alt"><a href="${g(Z()??"home",E(p()))}" hreflang="${$[E(p())]}" lang="${$[E(p())]}">${o().otherLanguageName}</a></p>
      </div>
      <b class="gate-mark" aria-hidden="true">桜</b>
    </section>`}function xe(){return`<section class="landing">
        <div class="landing-image">
          ${C({sizes:"(max-width: 768px) 100vw, 55vw"})}
          <div class="image-caption">${d(f.title)}<span>${d(f.note)}</span></div>
        </div>
        <div class="landing-copy">
          <p class="kicker">${o().eyebrow}</p>
          <h2>${o().title}</h2>
          <p class="lead">${o().intro}</p>
          <a class="primary-link" href="#library">${o().explore}<span aria-hidden="true">↓</span></a>
          <div class="now"><span>${o().status}</span><strong>${o().statusText}</strong></div>
        </div>
      </section>`}function Ae(e){return`<a class="library-card ${e.tone}" href="${g(e.id,p())}">
          <small>${e.name}</small>
          <strong>${d(e.title)}</strong>
          <span>${o().open} ↗</span>
        </a>`}function Ie(){const e=`<a class="library-card sakura-card" href="${g("works",p())}">
          <small>SAKURA / IMAGE</small>
          <strong>${d(f.title)}</strong>
          <span>${o().open} ↗</span>
        </a>
        <a class="library-card engine-card" href="${g("engine",p())}">
          <small>ENGINE / LINKS</small>
          <strong>${d({zh:"常用入口",en:"Everyday links"})}</strong>
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
          ${H.map(Ae).join("")}${e}
        </div>
      </section>`}function Ne(){const e=[["engine","01",o().tools,"ENGINE"],["profile","02",o().profile,"PROFILE"],["works","03",o().works,"WORKS"]].map(([t,n,a,s])=>`<a href="${g(t,p())}">
            <span>${n}</span>
            <div><small>${a}</small><h3>${s}</h3></div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return`<section class="index-section">
        <div class="section-label">
          <span>02</span>
          <h2>${o().index}</h2>
          <p>${o().indexText}</p>
        </div>
        <div class="index-links">${e}</div>
      </section>`}function Oe(){return`<section class="statement-band">
        <p>“${d(z.statement)}”</p>
        <a href="${g("profile",p())}">${o().profile} ↗</a>
      </section>`}function Ye(){const t=x()?"is-unlocked":"is-locked";return v(`<div class="engine-home ${t}" id="engine-home">
      ${Te()}
      <div class="home-content" id="home-content">
        ${xe()}
        ${Ie()}
        ${Ne()}
        ${Oe()}
      </div>
      <button class="lock-button" id="lock-entry" type="button">${o().lock} ×</button>
    </div>`,"home")}function Pe(){const e=pe.map(t=>`<section>
          <h2>${t.title}</h2>
          ${t.items.map(n=>`<a class="tool-row" href="${n.url}" target="_blank" rel="noopener noreferrer">
              <strong>${n.name}</strong>
              <span>${d(n.note)}</span>
              <b aria-hidden="true">↗</b>
            </a>`).join("")}
        </section>`).join("");return v(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">02 / ENGINE</span>
        <h1>${o().engineHeading}</h1>
        <p>${o().engineIntro}</p>
      </div>
      <div class="tool-groups">${e}</div>
    </section>`,"engine")}function Re(){const e=ge.map(t=>`<a href="${t.url}"${t.rel?` rel="${t.rel}"`:""}>${t.name} ↗</a>`).join("");return v(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">03 / PROFILE</span>
        <h1>Linn,<br><i>${o().profileHeading}</i></h1>
      </div>
      <div class="profile-layout">
        <blockquote>${d(z.bio)}</blockquote>
        <div class="profile-copy">
          <p>${d(z.focus)}</p>
          <div class="contact"><span>${o().contact}</span>${e}</div>
        </div>
      </div>
    </section>`,"profile")}function ze(){if(K.length===0)return"";const e=K.map(t=>`<li>
            <a href="${t.url}" target="_blank" rel="noopener noreferrer">
              <div>
                <span class="archive-name">${t.name}</span>
                <small>${t.stack} / ${t.period}</small>
                <p>${d(t.desc)}</p>
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
      </section>`}function He(){const e=ue.map((t,n)=>`<a class="project-row" href="${t.url}" target="_blank" rel="noopener noreferrer">
            <span>0${n+1}</span>
            <div>
              <small>${t.stack} / ${t.period}</small>
              <h2>${t.name}</h2>
              <p>${d(t.desc)}</p>
            </div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return v(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">04 / WORKS</span>
        <h1>${o().worksHeading}</h1>
        <p>${o().worksIntro}</p>
      </div>
      <section class="works-list">
        <div class="section-label"><span>01</span><h2>${o().selected}</h2></div>
        <div>${e}</div>
      </section>
      ${ze()}
      <section class="photo-section">
        <div class="section-label"><span>03</span><h2>${o().photo}</h2></div>
        <figure>
          ${C({sizes:"(max-width: 768px) 100vw, 70vw"})}
          <figcaption><strong>${d(f.title)}</strong><span>${d(f.note)}</span></figcaption>
        </figure>
      </section>
    </section>`,"works")}function _(e){return v(`<section class="subsite-page ${e.tone}">
      <a class="back-link" href="${g("home",p())}">← ${o().back}</a>
      <span class="kicker">SUBSITE / ${e.name}</span>
      <h1>${d(e.title)}</h1>
      <p>${d(e.desc)}</p>
      <div class="subsite-placeholder">
        <span>WIP / ${new Date().getFullYear()}</span>
        <strong>${o().subsiteWip}</strong>
        <a href="${g("engine",p())}">${o().tools} ↗</a>
      </div>
    </section>`,"")}function Fe(){return v(`<section class="inner-page not-found">
      <div class="page-intro">
        <span class="kicker">404 / NOT FOUND</span>
        <h1>${o().notFoundHeading}</h1>
        <p>${o().notFoundBody}</p>
      </div>
      <p class="not-found-cta"><a class="primary-link" href="${g("home",p())}">${o().notFoundCta}<span aria-hidden="true">↗</span></a></p>
    </section>`,"")}const Me={home:Ye,engine:Pe,profile:Re,works:He,toy:()=>_(H[0]),notes:()=>_(H[1])},ee=()=>J(location.pathname);function y(e,t,n){let a=document.head.querySelector(`meta[${e}="${t}"]`);a||(a=document.createElement("meta"),a.setAttribute(e,t),document.head.append(a)),a.setAttribute("content",n)}function qe(e,t){document.head.querySelector(`meta[${e}="${t}"]`)?.remove()}function Ce(e,t){let n=document.head.querySelector(`link[rel="${e}"]:not([hreflang])`);n||(n=document.createElement("link"),n.setAttribute("rel",e),document.head.append(n)),n.setAttribute("href",t)}function We(e){document.head.querySelector(`link[rel="${e}"]:not([hreflang])`)?.remove()}function Ge(e,t){let n=document.head.querySelector(`link[rel="alternate"][hreflang="${e}"]`);n||(n=document.createElement("link"),n.setAttribute("rel","alternate"),n.setAttribute("hreflang",e),document.head.append(n)),n.setAttribute("href",t)}function Be(){document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(e=>e.remove())}function je(e,t){const n=e??me;if(document.title=n.title[t],y("name","description",n.description[t]),y("property","og:title",n.title[t]),y("property","og:description",n.description[t]),y("property","og:locale",fe[t]),y("name","robots",n.noindex?"noindex, follow":"index, follow"),!e){qe("property","og:url"),We("canonical"),Be();return}const a=`${S}${e.path[t]}`;y("property","og:url",a),Ce("canonical",a);for(const s of ke(e.id))Ge(s.hreflang,s.href)}const De=()=>document.querySelector("#app");let te=()=>{};const Ke=e=>{te=e};let U=!1;function W(e=ee()){const t=X(e),n=t?t.lang:$e(e),a=t?t.id:null,s=a?be(a):null,c=De();ye(n,a);const l=`${a??"notfound"}:${n}`;return!U&&c.dataset.prerendered===l||(c.innerHTML=(a?Me[a]:Fe)()),U=!0,je(s,n),document.body.classList.toggle("is-locked",a==="home"&&!x()),te(),a}function _e(e,{hash:t="",replace:n=!1}={}){const a=`${e}${t}`;if(n?history.replaceState({path:e},"",a):history.pushState({path:e},"",a),W(e),t){document.querySelector(t)?.scrollIntoView();return}window.scrollTo(0,0),document.querySelector("#top")?.focus({preventScroll:!0})}function Ue(){document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.target.closest?.("a");if(!t||t.target==="_blank"||t.hasAttribute("download"))return;const n=new URL(t.getAttribute("href")??"",location.href);if(n.origin!==location.origin)return;const a=J(n.pathname);if(X(a)&&!(n.pathname===location.pathname&&n.hash)){if(e.preventDefault(),n.pathname===location.pathname){window.scrollTo(0,0);return}_e(a,{hash:n.hash})}}),window.addEventListener("popstate",()=>{W(ee())})}function Ve(){const e=document.querySelector(".library-rail");e&&e.addEventListener("wheel",t=>{if(Math.abs(t.deltaY)<=Math.abs(t.deltaX))return;const n=e.scrollWidth-e.clientWidth;if(n<=0)return;const a=e.scrollLeft<=0&&t.deltaY<0,s=e.scrollLeft>=n-1&&t.deltaY>0;a||s||(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1})}function Xe(){de(),Ve()}Ke(Xe);Ue();W();
