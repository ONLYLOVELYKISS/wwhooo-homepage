(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const F="wwhooo-entered",T=()=>{try{return sessionStorage.getItem(F)==="1"}catch{return!1}},re=()=>{try{sessionStorage.setItem(F,"1")}catch{}},ie=()=>{try{sessionStorage.removeItem(F)}catch{}},H=.8,se=130,le=280;function ce(){const e=document.querySelector("#entry-gate"),t=document.querySelector("#engine-home"),n=document.querySelector("#home-content"),a=document.querySelector("#lock-entry");if(!e||!t)return;const s=[document.querySelector(".skip-link"),document.querySelector(".site-header"),document.querySelector("footer")];let r=T(),u=0,f=null,A=0,v=0,W=0,I=0;const w=()=>{e.style.setProperty("--swipe-ratio",String(u))},N=()=>{const i=(m,ae)=>{m&&(ae?m.setAttribute("inert",""):m.removeAttribute("inert"))};i(e,r),e.classList.toggle("gate-complete",r),t.classList.toggle("is-unlocked",r),t.classList.toggle("is-locked",!r),i(n,!r),n&&n.setAttribute("aria-hidden",String(!r));for(const m of s)i(m,!r);document.body.classList.toggle("is-locked",!r),document.documentElement.classList.toggle("entered",r)},O=()=>{r||(r=!0,u=1,w(),re(),N(),requestAnimationFrame(()=>{document.querySelector("#top")?.focus({preventScroll:!0})}))},Y=()=>{u=0,v=0,w()},G=i=>{u=Math.max(0,Math.min(1,i)),w(),u>=H&&O()},te=()=>{r=!1,ie(),Y(),N(),requestAnimationFrame(()=>e.focus({preventScroll:!0}))},ne=i=>{r||f!==null||i.target.closest?.("a")||(f=i.pointerId,A=i.clientY,I=0,i.currentTarget.setPointerCapture?.(f))},oe=i=>{f===null||i.pointerId!==f||(Math.abs(i.clientY-A)>6&&(I=Date.now()+400),G((A-i.clientY)/se))},B=i=>{f===null||i.pointerId!==f||(f=null,i.currentTarget.releasePointerCapture?.(i.pointerId),u<H&&Y())};e.addEventListener("pointerdown",ne),e.addEventListener("pointermove",oe),e.addEventListener("pointerup",B),e.addEventListener("pointercancel",B),e.addEventListener("click",i=>{r||Date.now()<I||i.target.closest?.("a")||O()}),e.addEventListener("keydown",i=>{r||i.target!==e||(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),O())}),e.addEventListener("wheel",i=>{if(r)return;const m=Math.abs(i.deltaY)>=Math.abs(i.deltaX)?i.deltaY:0;m&&(v=Math.max(0,v+m),G(v/le),clearTimeout(W),W=setTimeout(()=>{u<H&&Y()},360))},{passive:!0}),a?.addEventListener("click",te),N(),w()}const l=(e,t)=>({zh:e,en:t}),P={author:"Linn",email:"wwhooo@icloud.com",github:"https://github.com/ONLYLOVELYKISS"},R={statement:l("技术是我靠近问题的方式，不是我介绍自己的全部。","Technology is how I get closer to problems, not the whole story of who I am."),bio:l("我在网站、自动化工具与跨技术栈实验之间移动。这里是一个持续生长的个人入口。","I move between websites, automation, and experiments across stacks. This is a personal entry point that keeps growing."),focus:l("来自中国西安，关注个人网站、自动化、实用工具，以及从小念头开始、最后变成可使用的东西。","Based in Xi’an, China. I care about personal websites, automation, useful tools, and small ideas that become usable things.")},de=[{title:"Search",items:[{name:"Google",note:l("通用搜索","General search"),url:"https://www.google.com/"},{name:"Bing",note:l("搜索与图像","Search and images"),url:"https://www.bing.com/"},{name:"GitHub",note:l("代码与开源","Code and open source"),url:"https://github.com/"}]},{title:"Build",items:[{name:"MDN",note:l("Web 文档","Web documentation"),url:"https://developer.mozilla.org/"},{name:"Can I Use",note:l("兼容性查询","Browser compatibility"),url:"https://caniuse.com/"},{name:"Vite",note:l("前端构建","Frontend build tool"),url:"https://vite.dev/"}]},{title:"AI / Tools",items:[{name:"ChatGPT",note:l("AI 工具","AI tools"),url:"https://chatgpt.com/"},{name:"Regex101",note:l("正则调试","Regular expression tester"),url:"https://regex101.com/"},{name:"JSON Crack",note:l("数据可视化","Data visualization"),url:"https://jsoncrack.com/"}]}],pe=[{name:"wwhooo.com",stack:"PERSONAL HOMEPAGE",period:"2026",desc:l("以摄影、项目和个人档案为入口，重新组织一个人的公开空间。","A personal space organized around photography, projects, and profile."),url:"https://github.com/ONLYLOVELYKISS/wwhooo-homepage"},{name:"TOY",stack:"PYTHON / AI + INTERNET",period:"2025—",desc:l("阶段性生长的实验场：把好奇心拆成小工具，把小工具变成可运行的东西。","A growing lab for turning curiosity into small, runnable tools."),url:"https://github.com/ONLYLOVELYKISS/TOY"}],D=[{name:"chaoxing-sign-cli",stack:"TYPESCRIPT / AUTOMATION",period:"ARCHIVE",desc:l("围绕具体使用场景构建的自动化工具，探索监测、签到和消息推送。","An automation tool exploring monitoring, sign-ins, and notifications."),url:"https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli"}],z=[{id:"toy",name:"TOY LAB",tone:"lab",title:l("TOY 实验场","TOY Lab"),desc:l("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run.")},{id:"notes",name:"NIGHT NOTES",tone:"notes",title:l("夜间札记","Night Notes"),desc:l("把观察、片段和还没有结论的想法放在这里。","Observations, fragments, and thoughts without conclusions yet.")}],g={title:l("Sakura / 夜间花卉","Sakura / Night Bloom"),note:l("在暗处保留一点温度。","Keeping a little warmth in the dark."),alt:l("夜色中盛开的樱花特写","A close-up of sakura blossoms against a dark night"),widths:[800,1600,2400],fallback:"/images/sakura-1600.jpg",width:2400,height:1004},ue=(e=g.widths)=>e.map(t=>`/images/sakura-${t}.webp ${t}w`).join(", "),he=[{name:"GitHub",url:P.github,rel:"me"},{name:"Email",url:`mailto:${P.email}`}],p=(e,t)=>({zh:e,en:t}),L="https://wwhooo.com",M=["zh","en"],b={zh:"zh-CN",en:"en"},ge={zh:"zh_CN",en:"en_US"},E=e=>e==="zh"?"en":"zh",$=e=>e==="/"?"/en/":`/en${e}`,x=[{id:"home",path:{zh:"/",en:$("/")},title:p("Linn — 值得留下的东西","Linn — Things worth keeping"),description:p("Linn 的个人主页：摄影、软件项目、个人档案与常用工具。","Linn’s personal homepage: photography, software projects, profile, and everyday tools.")},{id:"engine",path:{zh:"/engine/",en:$("/engine/")},title:p("工具 — Linn","Tools — Linn"),description:p("常用工具入口：搜索、构建、AI 与调试。","Everyday tools: search, build, AI, and debugging.")},{id:"profile",path:{zh:"/profile/",en:$("/profile/")},title:p("档案 — Linn","Profile — Linn"),description:p("关于 Linn：个人网站、自动化工具与跨技术栈实验。","About Linn: personal websites, automation, and experiments across stacks.")},{id:"works",path:{zh:"/works/",en:$("/works/")},title:p("作品与记录 — Linn","Works & notes — Linn"),description:p("软件项目与摄影作品。","Software projects and photographs.")},{id:"toy",path:{zh:"/toy/",en:$("/toy/")},title:p("TOY 实验场 — Linn","TOY Lab — Linn"),description:p("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run."),noindex:!0},{id:"notes",path:{zh:"/notes/",en:$("/notes/")},title:p("夜间札记 — Linn","Night Notes — Linn"),description:p("观察、片段和还没有结论的想法。","Observations, fragments, and thoughts without conclusions yet."),noindex:!0}],fe={title:p("页面不存在 — Linn","Page not found — Linn"),description:p("这个地址没有对应的内容。","This address has no matching content."),noindex:!0},q=new Map(x.map(e=>[e.id,e])),U=new Map;for(const e of x)for(const t of M)U.set(e.path[t],{id:e.id,lang:t});x.flatMap(e=>M.map(t=>e.path[t]));x.filter(e=>!e.noindex).flatMap(e=>M.map(t=>e.path[t]));const me=e=>q.get(e)??null,h=(e,t)=>q.get(e)?.path[t==="en"?"en":"zh"]??null,V=e=>U.get(e)??null,be=e=>e==="/en/"||e.startsWith("/en/")?"en":"zh";function X(e){const t=e.replace(/\/index\.html$/,"/").replace(/\/+$/,"");return t===""?"/":`${t}/`}function $e(e){const t=q.get(e);return t?[{hreflang:b.zh,href:`${L}${t.path.zh}`},{hreflang:b.en,href:`${L}${t.path.en}`},{hreflang:"x-default",href:`${L}${t.path.zh}`}]:[]}let S="zh",J=null;const d=()=>S,Q=()=>J;function ye(e,t){return S=e==="en"?"en":"zh",J=t??null,typeof document<"u"&&(document.documentElement.lang=b[S]),S}const ke={zh:{skip:"跳到主要内容",navLabel:"主导航",nav:["首页","工具","档案","作品"],eyebrow:"Linn / Personal engine",title:"把值得留下的，<br>放在这里。",intro:"一个持续更新的个人入口：记录项目、工具、观察和正在形成的东西。",explore:"探索我的空间",status:"现在进行中",statusText:"维护个人网站，整理 TOY 实验场",index:"目录",indexText:"从正在使用的东西开始，逐步了解这个空间。",tools:"工具箱",profile:"关于我",works:"作品与记录",selected:"精选项目",archive:"归档",archiveNote:"较早的实验与工具，保留记录。",photo:"一张照片",contact:"联系我",language:"EN",languageLabel:"切换到英文",otherLanguageName:"English",top:"回到顶部",lock:"重新进入",unlock:"向上滑动进入",unlockHint:"在屏幕任意位置向上滑动，进入个人引擎",gateKeyboardHint:"键盘用户可按 Enter 或空格进入。",unlocked:"准备进入",gateTitle:"向上滑动<br><i>进入引擎。</i>",gateFoot:"没有登录，只有一次主动进入。",library:"个人库",libraryText:"项目、子站、工具和视觉记录，放在同一条可探索的轨道上。",dragExplore:"左右滑动浏览",open:"进入",back:"返回主站",subsiteWip:"这是一个可访问的子站初稿。",notFoundTitle:"页面不存在",notFoundHeading:"这个地址<br><i>没有内容。</i>",notFoundBody:"也许链接已经改变，或者它从来没有存在过。",notFoundCta:"回到首页",engineHeading:"我会反复打开的<br><i>一些入口。</i>",engineIntro:"保持简单，保持可用。把常用的东西放在顺手的位置。",profileHeading:"持续进行中。",worksHeading:"做过，<br><i>看过。</i>",worksIntro:"软件项目和摄影作品。一个人如何工作，也如何看待周围的世界。"},en:{skip:"Skip to main content",navLabel:"Main navigation",nav:["Home","Tools","Profile","Works"],eyebrow:"Linn / Personal engine",title:"Things worth<br>keeping, here.",intro:"A living personal entry point for projects, tools, observations, and things taking shape.",explore:"Explore the space",status:"Currently",statusText:"Maintaining this site and the TOY lab",index:"Index",indexText:"Start with the things in use and take a closer look around.",tools:"Toolbox",profile:"About me",works:"Works & notes",selected:"Selected projects",archive:"Archive",archiveNote:"Earlier experiments and tools, kept for the record.",photo:"A photograph",contact:"Find me",language:"中",languageLabel:"Switch to Chinese",otherLanguageName:"中文",top:"Back to top",lock:"Enter again",unlock:"Swipe up to enter",unlockHint:"Swipe up anywhere to enter the personal engine",gateKeyboardHint:"Keyboard users can press Enter or Space to enter.",unlocked:"Ready to enter",gateTitle:"Swipe up into<br><i>personal engine.</i>",gateFoot:"No login, just a deliberate entrance.",library:"Personal library",libraryText:"Projects, subsites, tools, and visual notes arranged on one open rail.",dragExplore:"Swipe left/right to explore",open:"Open",back:"Back home",subsiteWip:"This is an accessible first draft of the subsite.",notFoundTitle:"Page not found",notFoundHeading:"This address<br><i>has nothing.</i>",notFoundBody:"The link may have changed, or it never existed at all.",notFoundCta:"Back home",engineHeading:"A few places I<br><i>return to.</i>",engineIntro:"Simple, useful, and close at hand.",profileHeading:"in progress.",worksHeading:"Made,<br><i>observed.</i>",worksIntro:"Software projects and photographs. How I work, and how I look at the world."}},o=()=>ke[d()],c=e=>e?e[d()]:"",ve=[["home",0],["engine",1],["profile",2],["works",3]];function C({sizes:e,priority:t=!1}){const n=t?'fetchpriority="high"':'loading="lazy"';return`<picture>
        <source type="image/webp" srcset="${ue()}" sizes="${e}">
        <img src="${g.fallback}" width="${g.width}" height="${g.height}" alt="${c(g.alt)}" ${n} decoding="async">
      </picture>`}function we(e=""){const t=d(),n=ve.map(([a,s])=>{const r=e===a?' aria-current="page"':"";return`<a href="${h(a,t)}"${r}>${o().nav[s]}</a>`}).join("");return`<header class="site-header">
      <a class="brand" href="${h("home",t)}"><span>WW</span><b>LINN</b></a>
      <nav aria-label="${o().navLabel}">${n}</nav>
      ${Le()}
    </header>`}function Le(){const e=E(d());return`<a class="language" href="${h(Q()??"home",e)}" hreflang="${b[e]}" lang="${b[e]}">${o().language}<span class="sr-only"> — ${o().languageLabel}</span></a>`}function Ee(){return`<footer>
      <span>© ${new Date().getFullYear()} ${P.author.toUpperCase()}</span>
      <span>WW / PERSONAL ENGINE</span>
      <a href="#top">${o().top} ↑</a>
    </footer>`}function k(e,t=""){return`<a class="skip-link" href="#top">${o().skip}</a>${we(t)}<main id="top" tabindex="-1">${e}</main>${Ee()}`}function Se(){return`<section class="entry-gate${T()?" gate-complete":""}" id="entry-gate" role="region" tabindex="0" aria-label="${o().unlock}" aria-describedby="gate-instruction">
      <span class="sr-only" id="gate-instruction">${o().unlockHint} ${o().gateKeyboardHint}</span>
      <div class="gate-image">
        ${C({sizes:"(max-width: 768px) 100vw, 60vw",priority:!0})}
        <div class="gate-vignette"></div>
      </div>
      <div class="gate-copy">
        <span class="kicker">WW / SAKURA ENTRY</span>
        <p class="gate-status">${o().unlocked}</p>
        <h1>${o().gateTitle}</h1>
        <p class="gate-hint"><span class="hint-chevron" aria-hidden="true">↑</span>${o().unlockHint}</p>
        <p class="gate-foot">${o().gateFoot}</p>
        <p class="gate-alt"><a href="${h(Q()??"home",E(d()))}" hreflang="${b[E(d())]}" lang="${b[E(d())]}">${o().otherLanguageName}</a></p>
      </div>
      <span class="gate-progress" aria-hidden="true"></span>
      <b class="gate-mark" aria-hidden="true">桜</b>
    </section>`}function Te(){return`<section class="landing">
        <div class="landing-image">
          ${C({sizes:"(max-width: 768px) 100vw, 55vw"})}
          <div class="image-caption">${c(g.title)}<span>${c(g.note)}</span></div>
        </div>
        <div class="landing-copy">
          <p class="kicker">${o().eyebrow}</p>
          <h2>${o().title}</h2>
          <p class="lead">${o().intro}</p>
          <a class="primary-link" href="#library">${o().explore}<span aria-hidden="true">↓</span></a>
          <div class="now"><span>${o().status}</span><strong>${o().statusText}</strong></div>
        </div>
      </section>`}function xe(e){return`<a class="library-card ${e.tone}" href="${h(e.id,d())}">
          <small>${e.name}</small>
          <strong>${c(e.title)}</strong>
          <span>${o().open} ↗</span>
        </a>`}function Ae(){const e=`<a class="library-card sakura-card" href="${h("works",d())}">
          <small>SAKURA / IMAGE</small>
          <strong>${c(g.title)}</strong>
          <span>${o().open} ↗</span>
        </a>
        <a class="library-card engine-card" href="${h("engine",d())}">
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
          ${z.map(xe).join("")}${e}
        </div>
      </section>`}function Ie(){const e=[["engine","01",o().tools,"ENGINE"],["profile","02",o().profile,"PROFILE"],["works","03",o().works,"WORKS"]].map(([t,n,a,s])=>`<a href="${h(t,d())}">
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
      </section>`}function Ne(){return`<section class="statement-band">
        <p>“${c(R.statement)}”</p>
        <a href="${h("profile",d())}">${o().profile} ↗</a>
      </section>`}function Oe(){const t=T()?"is-unlocked":"is-locked";return k(`<div class="engine-home ${t}" id="engine-home">
      ${Se()}
      <div class="home-content" id="home-content">
        ${Te()}
        ${Ae()}
        ${Ie()}
        ${Ne()}
      </div>
      <button class="lock-button" id="lock-entry" type="button">${o().lock} ×</button>
    </div>`,"home")}function Ye(){const e=de.map(t=>`<section>
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
    </section>`,"engine")}function He(){const e=he.map(t=>`<a href="${t.url}"${t.rel?` rel="${t.rel}"`:""}>${t.name} ↗</a>`).join("");return k(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">03 / PROFILE</span>
        <h1>Linn,<br><i>${o().profileHeading}</i></h1>
      </div>
      <div class="profile-layout">
        <blockquote>${c(R.bio)}</blockquote>
        <div class="profile-copy">
          <p>${c(R.focus)}</p>
          <div class="contact"><span>${o().contact}</span>${e}</div>
        </div>
      </div>
    </section>`,"profile")}function Pe(){if(D.length===0)return"";const e=D.map(t=>`<li>
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
      </section>`}function Re(){const e=pe.map((t,n)=>`<a class="project-row" href="${t.url}" target="_blank" rel="noopener noreferrer">
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
      ${Pe()}
      <section class="photo-section">
        <div class="section-label"><span>03</span><h2>${o().photo}</h2></div>
        <figure>
          ${C({sizes:"(max-width: 768px) 100vw, 70vw"})}
          <figcaption><strong>${c(g.title)}</strong><span>${c(g.note)}</span></figcaption>
        </figure>
      </section>
    </section>`,"works")}function j(e){return k(`<section class="subsite-page ${e.tone}">
      <a class="back-link" href="${h("home",d())}">← ${o().back}</a>
      <span class="kicker">SUBSITE / ${e.name}</span>
      <h1>${c(e.title)}</h1>
      <p>${c(e.desc)}</p>
      <div class="subsite-placeholder">
        <span>WIP / ${new Date().getFullYear()}</span>
        <strong>${o().subsiteWip}</strong>
        <a href="${h("engine",d())}">${o().tools} ↗</a>
      </div>
    </section>`,"")}function ze(){return k(`<section class="inner-page not-found">
      <div class="page-intro">
        <span class="kicker">404 / NOT FOUND</span>
        <h1>${o().notFoundHeading}</h1>
        <p>${o().notFoundBody}</p>
      </div>
      <p class="not-found-cta"><a class="primary-link" href="${h("home",d())}">${o().notFoundCta}<span aria-hidden="true">↗</span></a></p>
    </section>`,"")}const Fe={home:Oe,engine:Ye,profile:He,works:Re,toy:()=>j(z[0]),notes:()=>j(z[1])},Z=()=>X(location.pathname);function y(e,t,n){let a=document.head.querySelector(`meta[${e}="${t}"]`);a||(a=document.createElement("meta"),a.setAttribute(e,t),document.head.append(a)),a.setAttribute("content",n)}function Me(e,t){document.head.querySelector(`meta[${e}="${t}"]`)?.remove()}function qe(e,t){let n=document.head.querySelector(`link[rel="${e}"]:not([hreflang])`);n||(n=document.createElement("link"),n.setAttribute("rel",e),document.head.append(n)),n.setAttribute("href",t)}function Ce(e){document.head.querySelector(`link[rel="${e}"]:not([hreflang])`)?.remove()}function Ke(e,t){let n=document.head.querySelector(`link[rel="alternate"][hreflang="${e}"]`);n||(n=document.createElement("link"),n.setAttribute("rel","alternate"),n.setAttribute("hreflang",e),document.head.append(n)),n.setAttribute("href",t)}function We(){document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(e=>e.remove())}function Ge(e,t){const n=e??fe;if(document.title=n.title[t],y("name","description",n.description[t]),y("property","og:title",n.title[t]),y("property","og:description",n.description[t]),y("property","og:locale",ge[t]),y("name","robots",n.noindex?"noindex, follow":"index, follow"),!e){Me("property","og:url"),Ce("canonical"),We();return}const a=`${L}${e.path[t]}`;y("property","og:url",a),qe("canonical",a);for(const s of $e(e.id))Ke(s.hreflang,s.href)}const Be=()=>document.querySelector("#app");let ee=()=>{};const De=e=>{ee=e};let _=!1;function K(e=Z()){const t=V(e),n=t?t.lang:be(e),a=t?t.id:null,s=a?me(a):null,r=Be();ye(n,a);const u=`${a??"notfound"}:${n}`;return!_&&r.dataset.prerendered===u||(r.innerHTML=(a?Fe[a]:ze)()),_=!0,Ge(s,n),document.body.classList.toggle("is-locked",a==="home"&&!T()),ee(),a}function je(e,{hash:t="",replace:n=!1}={}){const a=`${e}${t}`;if(n?history.replaceState({path:e},"",a):history.pushState({path:e},"",a),K(e),t){document.querySelector(t)?.scrollIntoView();return}window.scrollTo(0,0),document.querySelector("#top")?.focus({preventScroll:!0})}function _e(){document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.target.closest?.("a");if(!t||t.target==="_blank"||t.hasAttribute("download"))return;const n=new URL(t.getAttribute("href")??"",location.href);if(n.origin!==location.origin)return;const a=X(n.pathname);if(V(a)&&!(n.pathname===location.pathname&&n.hash)){if(e.preventDefault(),n.pathname===location.pathname){window.scrollTo(0,0);return}je(a,{hash:n.hash})}}),window.addEventListener("popstate",()=>{K(Z())})}function Ue(){const e=document.querySelector(".library-rail");e&&e.addEventListener("wheel",t=>{if(Math.abs(t.deltaY)<=Math.abs(t.deltaX))return;const n=e.scrollWidth-e.clientWidth;if(n<=0)return;const a=e.scrollLeft<=0&&t.deltaY<0,s=e.scrollLeft>=n-1&&t.deltaY>0;a||s||(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1})}function Ve(){ce(),Ue()}De(Ve);_e();K();
