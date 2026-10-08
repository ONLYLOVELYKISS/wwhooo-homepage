(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const z="wwhooo-entered",T=()=>{try{return sessionStorage.getItem(z)==="1"}catch{return!1}},le=()=>{try{sessionStorage.setItem(z,"1")}catch{}},ce=()=>{try{sessionStorage.removeItem(z)}catch{}},P=.8,de=130,ue=280;function pe(){const e=document.querySelector("#entry-gate"),t=document.querySelector("#engine-home"),n=document.querySelector("#home-content"),a=document.querySelector("#lock-entry");if(!e||!t)return;const i=[document.querySelector(".skip-link"),document.querySelector(".site-header"),document.querySelector("footer")];let r=T(),p=0,m=null,I=0,k=0,G=0,A=0;const w=()=>{e.style.setProperty("--swipe-ratio",String(p))},N=()=>{const s=(f,ie)=>{f&&(ie?f.setAttribute("inert",""):f.removeAttribute("inert"))};s(e,r),e.classList.toggle("gate-complete",r),t.classList.toggle("is-unlocked",r),t.classList.toggle("is-locked",!r),s(n,!r),n&&n.setAttribute("aria-hidden",String(!r));for(const f of i)s(f,!r);document.body.classList.toggle("is-locked",!r),document.documentElement.classList.toggle("entered",r)},O=()=>{r||(r=!0,p=1,w(),le(),N(),requestAnimationFrame(()=>{document.querySelector("#top")?.focus({preventScroll:!0})}))},H=()=>{p=0,k=0,w()},K=s=>{p=Math.max(0,Math.min(1,s)),w(),p>=P&&O()},ae=()=>{r=!1,ce(),H(),N(),requestAnimationFrame(()=>e.focus({preventScroll:!0}))},re=s=>{r||m!==null||s.target.closest?.("a")||(m=s.pointerId,I=s.clientY,A=0,s.currentTarget.setPointerCapture?.(m))},se=s=>{m===null||s.pointerId!==m||(Math.abs(s.clientY-I)>6&&(A=Date.now()+400),K((I-s.clientY)/de))},W=s=>{m===null||s.pointerId!==m||(m=null,s.currentTarget.releasePointerCapture?.(s.pointerId),p<P&&H())};e.addEventListener("pointerdown",re),e.addEventListener("pointermove",se),e.addEventListener("pointerup",W),e.addEventListener("pointercancel",W),e.addEventListener("click",s=>{r||Date.now()<A||s.target.closest?.("a")||O()}),e.addEventListener("keydown",s=>{r||s.target!==e||(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),O())}),e.addEventListener("wheel",s=>{if(r)return;const f=Math.abs(s.deltaY)>=Math.abs(s.deltaX)?s.deltaY:0;f&&(k=Math.max(0,k+f),K(k/ue),clearTimeout(G),G=setTimeout(()=>{p<P&&H()},360))},{passive:!0}),a?.addEventListener("click",ae),N(),w()}const l=(e,t)=>({zh:e,en:t}),Y={author:"Linn",email:"wwhooo@icloud.com",github:"https://github.com/ONLYLOVELYKISS"},R={statement:l("技术是我靠近问题的方式，不是我介绍自己的全部。","Technology is how I get closer to problems, not the whole story of who I am."),bio:l("我在网站、自动化工具与跨技术栈实验之间移动。这里是一个持续生长的个人入口。","I move between websites, automation, and experiments across stacks. This is a personal entry point that keeps growing."),focus:l("来自中国西安，关注个人网站、自动化、实用工具，以及从小念头开始、最后变成可使用的东西。","Based in Xi’an, China. I care about personal websites, automation, useful tools, and small ideas that become usable things.")},he=[{title:"Search",items:[{name:"Google",note:l("通用搜索","General search"),url:"https://www.google.com/"},{name:"Bing",note:l("搜索与图像","Search and images"),url:"https://www.bing.com/"},{name:"GitHub",note:l("代码与开源","Code and open source"),url:"https://github.com/"}]},{title:"Build",items:[{name:"MDN",note:l("Web 文档","Web documentation"),url:"https://developer.mozilla.org/"},{name:"Can I Use",note:l("兼容性查询","Browser compatibility"),url:"https://caniuse.com/"},{name:"Vite",note:l("前端构建","Frontend build tool"),url:"https://vite.dev/"}]},{title:"AI / Tools",items:[{name:"ChatGPT",note:l("AI 工具","AI tools"),url:"https://chatgpt.com/"},{name:"Regex101",note:l("正则调试","Regular expression tester"),url:"https://regex101.com/"},{name:"JSON Crack",note:l("数据可视化","Data visualization"),url:"https://jsoncrack.com/"}]}],ge=[{name:"wwhooo.com",stack:"PERSONAL HOMEPAGE",period:"2026",desc:l("以摄影、项目和个人档案为入口，重新组织一个人的公开空间。","A personal space organized around photography, projects, and profile."),url:"https://github.com/ONLYLOVELYKISS/wwhooo-homepage"},{name:"TOY",stack:"PYTHON / AI + INTERNET",period:"2025—",desc:l("阶段性生长的实验场：把好奇心拆成小工具，把小工具变成可运行的东西。","A growing lab for turning curiosity into small, runnable tools."),url:"https://github.com/ONLYLOVELYKISS/TOY"}],B=[{name:"chaoxing-sign-cli",stack:"TYPESCRIPT / AUTOMATION",period:"ARCHIVE",desc:l("围绕具体使用场景构建的自动化工具，探索监测、签到和消息推送。","An automation tool exploring monitoring, sign-ins, and notifications."),url:"https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli"}],q=[{id:"toy",name:"TOY LAB",tone:"lab",title:l("TOY 实验场","TOY Lab"),desc:l("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run.")},{id:"notes",name:"NIGHT NOTES",tone:"notes",title:l("夜间札记","Night Notes"),desc:l("把观察、片段和还没有结论的想法放在这里。","Observations, fragments, and thoughts without conclusions yet.")}],g={title:l("Sakura / 夜间花卉","Sakura / Night Bloom"),note:l("在暗处保留一点温度。","Keeping a little warmth in the dark."),alt:l("夜色中盛开的樱花特写","A close-up of sakura blossoms against a dark night"),widths:[800,1600,2400],fallback:"/images/sakura-1600.jpg",width:2400,height:1004},me=(e=g.widths)=>e.map(t=>`/images/sakura-${t}.webp ${t}w`).join(", "),fe=[{name:"GitHub",url:Y.github,rel:"me"},{name:"Email",url:`mailto:${Y.email}`}],c=(e,t)=>({zh:e,en:t}),L="https://wwhooo.com",F=["zh","en"],$={zh:"zh-CN",en:"en"},be={zh:"zh_CN",en:"en_US"},S=e=>e==="zh"?"en":"zh",b=e=>e==="/"?"/en/":`/en${e}`,x=[{id:"home",path:{zh:"/",en:b("/")},title:c("Linn — 值得留下的东西","Linn — Things worth keeping"),description:c("Linn 的个人主页：摄影、软件项目、个人档案与常用工具。","Linn’s personal homepage: photography, software projects, profile, and everyday tools.")},{id:"engine",path:{zh:"/engine/",en:b("/engine/")},title:c("工具 — Linn","Tools — Linn"),description:c("常用工具入口：搜索、构建、AI 与调试。","Everyday tools: search, build, AI, and debugging.")},{id:"profile",path:{zh:"/profile/",en:b("/profile/")},title:c("档案 — Linn","Profile — Linn"),description:c("关于 Linn：个人网站、自动化工具与跨技术栈实验。","About Linn: personal websites, automation, and experiments across stacks.")},{id:"works",path:{zh:"/works/",en:b("/works/")},title:c("作品与记录 — Linn","Works & notes — Linn"),description:c("软件项目与摄影作品。","Software projects and photographs.")},{id:"search",path:{zh:"/search/",en:b("/search/")},title:c("搜索 — Linn","Search — Linn"),description:c("在常用搜索引擎之间切换，快速开始搜索。","Switch search engines and start searching quickly.")},{id:"toy",path:{zh:"/toy/",en:b("/toy/")},title:c("TOY 实验场 — Linn","TOY Lab — Linn"),description:c("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run."),noindex:!0},{id:"notes",path:{zh:"/notes/",en:b("/notes/")},title:c("夜间札记 — Linn","Night Notes — Linn"),description:c("观察、片段和还没有结论的想法。","Observations, fragments, and thoughts without conclusions yet."),noindex:!0}],$e={title:c("页面不存在 — Linn","Page not found — Linn"),description:c("这个地址没有对应的内容。","This address has no matching content."),noindex:!0},M=new Map(x.map(e=>[e.id,e])),J=new Map;for(const e of x)for(const t of F)J.set(e.path[t],{id:e.id,lang:t});x.flatMap(e=>F.map(t=>e.path[t]));x.filter(e=>!e.noindex).flatMap(e=>F.map(t=>e.path[t]));const ye=e=>M.get(e)??null,h=(e,t)=>M.get(e)?.path[t==="en"?"en":"zh"]??null,Q=e=>J.get(e)??null,ve=e=>e==="/en/"||e.startsWith("/en/")?"en":"zh";function Z(e){const t=e.replace(/\/index\.html$/,"/").replace(/\/+$/,"");return t===""?"/":`${t}/`}function ke(e){const t=M.get(e);return t?[{hreflang:$.zh,href:`${L}${t.path.zh}`},{hreflang:$.en,href:`${L}${t.path.en}`},{hreflang:"x-default",href:`${L}${t.path.zh}`}]:[]}let E="zh",ee=null;const u=()=>E,te=()=>ee;function we(e,t){return E=e==="en"?"en":"zh",ee=t??null,typeof document<"u"&&(document.documentElement.lang=$[E]),E}const Le={zh:{skip:"跳到主要内容",navLabel:"主导航",nav:["首页","工具","档案","作品","搜索"],theme:"主题",themeSystem:"跟随系统",themeLight:"浅色",themeDark:"深色",themeLabel:"选择主题模式",eyebrow:"Linn / Personal engine",title:"把值得留下的，<br>放在这里。",intro:"一个持续更新的个人入口：记录项目、工具、观察和正在形成的东西。",explore:"探索我的空间",status:"现在进行中",statusText:"维护个人网站，整理 TOY 实验场",index:"目录",indexText:"从正在使用的东西开始，逐步了解这个空间。",tools:"工具箱",profile:"关于我",works:"作品与记录",search:"搜索",searchHeading:"找到需要的<br><i>东西。</i>",searchIntro:"在常用搜索入口之间切换，输入问题后直接前往结果页。",searchPlaceholder:"输入要搜索的内容",searchSubmit:"开始搜索",searchProvider:"搜索引擎",selected:"精选项目",archive:"归档",archiveNote:"较早的实验与工具，保留记录。",photo:"一张照片",contact:"联系我",language:"EN",languageLabel:"切换到英文",otherLanguageName:"English",top:"回到顶部",lock:"重新进入",unlock:"向上滑动进入",unlockHint:"在屏幕任意位置向上滑动，进入个人引擎",gateKeyboardHint:"键盘用户可按 Enter 或空格进入。",unlocked:"准备进入",gateTitle:"向上滑动<br><i>进入引擎。</i>",gateFoot:"没有登录，只有一次主动进入。",library:"个人库",libraryText:"项目、子站、工具和视觉记录，放在同一条可探索的轨道上。",dragExplore:"左右滑动浏览",open:"进入",back:"返回主站",subsiteWip:"这是一个可访问的子站初稿。",notFoundTitle:"页面不存在",notFoundHeading:"这个地址<br><i>没有内容。</i>",notFoundBody:"也许链接已经改变，或者它从来没有存在过。",notFoundCta:"回到首页",engineHeading:"我会反复打开的<br><i>一些入口。</i>",engineIntro:"保持简单，保持可用。把常用的东西放在顺手的位置。",profileHeading:"持续进行中。",worksHeading:"做过，<br><i>看过。</i>",worksIntro:"软件项目和摄影作品。一个人如何工作，也如何看待周围的世界。"},en:{skip:"Skip to main content",navLabel:"Main navigation",nav:["Home","Tools","Profile","Works","Search"],theme:"Theme",themeSystem:"System",themeLight:"Light",themeDark:"Dark",themeLabel:"Choose theme mode",eyebrow:"Linn / Personal engine",title:"Things worth<br>keeping, here.",intro:"A living personal entry point for projects, tools, observations, and things taking shape.",explore:"Explore the space",status:"Currently",statusText:"Maintaining this site and the TOY lab",index:"Index",indexText:"Start with the things in use and take a closer look around.",tools:"Toolbox",profile:"About me",works:"Works & notes",search:"Search",searchHeading:"Find what you<br><i>need.</i>",searchIntro:"Switch between familiar search engines and go straight to the results.",searchPlaceholder:"What are you looking for?",searchSubmit:"Search",searchProvider:"Search engine",selected:"Selected projects",archive:"Archive",archiveNote:"Earlier experiments and tools, kept for the record.",photo:"A photograph",contact:"Find me",language:"中",languageLabel:"Switch to Chinese",otherLanguageName:"中文",top:"Back to top",lock:"Enter again",unlock:"Swipe up to enter",unlockHint:"Swipe up anywhere to enter the personal engine",gateKeyboardHint:"Keyboard users can press Enter or Space to enter.",unlocked:"Ready to enter",gateTitle:"Swipe up into<br><i>personal engine.</i>",gateFoot:"No login, just a deliberate entrance.",library:"Personal library",libraryText:"Projects, subsites, tools, and visual notes arranged on one open rail.",dragExplore:"Swipe left/right to explore",open:"Open",back:"Back home",subsiteWip:"This is an accessible first draft of the subsite.",notFoundTitle:"Page not found",notFoundHeading:"This address<br><i>has nothing.</i>",notFoundBody:"The link may have changed, or it never existed at all.",notFoundCta:"Back home",engineHeading:"A few places I<br><i>return to.</i>",engineIntro:"Simple, useful, and close at hand.",profileHeading:"in progress.",worksHeading:"Made,<br><i>observed.</i>",worksIntro:"Software projects and photographs. How I work, and how I look at the world."}},o=()=>Le[u()],d=e=>e?e[u()]:"",Se=[["home",0],["engine",1],["profile",2],["works",3],["search",4]];function D({sizes:e,priority:t=!1}){const n=t?'fetchpriority="high"':'loading="lazy"';return`<picture>
        <source type="image/webp" srcset="${me()}" sizes="${e}">
        <img src="${g.fallback}" width="${g.width}" height="${g.height}" alt="${d(g.alt)}" ${n} decoding="async">
      </picture>`}function Ee(e=""){const t=u(),n=Se.map(([a,i])=>{const r=e===a?' aria-current="page"':"";return`<a href="${h(a,t)}"${r}>${o().nav[i]}</a>`}).join("");return`<header class="site-header">
      <a class="brand" href="${h("home",t)}"><span>WW</span><b>LINN</b></a>
      <nav aria-label="${o().navLabel}">${n}</nav>
      ${xe()}
      ${Te()}
    </header>`}function Te(){return`<label class="theme-control" for="theme-select">
      <span class="sr-only">${o().themeLabel}</span>
      <span aria-hidden="true">◐</span>
      <select id="theme-select" name="theme" data-theme-control aria-label="${o().themeLabel}">
        <option value="system">${o().themeSystem}</option>
        <option value="light">${o().themeLight}</option>
        <option value="dark">${o().themeDark}</option>
      </select>
    </label>`}function xe(){const e=S(u());return`<a class="language" href="${h(te()??"home",e)}" hreflang="${$[e]}" lang="${$[e]}">${o().language}<span class="sr-only"> — ${o().languageLabel}</span></a>`}function Ie(){return`<footer>
      <span>© ${new Date().getFullYear()} ${Y.author.toUpperCase()}</span>
      <span>WW / PERSONAL ENGINE</span>
      <a href="#top">${o().top} ↑</a>
    </footer>`}function y(e,t=""){return`<a class="skip-link" href="#top">${o().skip}</a>${Ee(t)}<main id="top" tabindex="-1">${e}</main>${Ie()}`}function Ae(){return`<section class="entry-gate${T()?" gate-complete":""}" id="entry-gate" role="region" tabindex="0" aria-label="${o().unlock}" aria-describedby="gate-instruction">
      <span class="sr-only" id="gate-instruction">${o().unlockHint} ${o().gateKeyboardHint}</span>
      <div class="gate-image">
        ${D({sizes:"(max-width: 768px) 100vw, 60vw",priority:!0})}
        <div class="gate-vignette"></div>
      </div>
      <div class="gate-copy">
        <span class="kicker">WW / SAKURA ENTRY</span>
        <p class="gate-status">${o().unlocked}</p>
        <h1>${o().gateTitle}</h1>
        <p class="gate-hint"><span class="hint-chevron" aria-hidden="true">↑</span>${o().unlockHint}</p>
        <p class="gate-foot">${o().gateFoot}</p>
        <p class="gate-alt"><a href="${h(te()??"home",S(u()))}" hreflang="${$[S(u())]}" lang="${$[S(u())]}">${o().otherLanguageName}</a></p>
      </div>
      <span class="gate-progress" aria-hidden="true"></span>
      <b class="gate-mark" aria-hidden="true">桜</b>
    </section>`}function Ne(){return`<section class="landing">
        <div class="landing-image">
          ${D({sizes:"(max-width: 768px) 100vw, 55vw"})}
          <div class="image-caption">${d(g.title)}<span>${d(g.note)}</span></div>
        </div>
        <div class="landing-copy">
          <p class="kicker">${o().eyebrow}</p>
          <h2>${o().title}</h2>
          <p class="lead">${o().intro}</p>
          <a class="primary-link" href="#library">${o().explore}<span aria-hidden="true">↓</span></a>
          <div class="now"><span>${o().status}</span><strong>${o().statusText}</strong></div>
        </div>
      </section>`}function Oe(e){return`<a class="library-card ${e.tone}" href="${h(e.id,u())}">
          <small>${e.name}</small>
          <strong>${d(e.title)}</strong>
          <span>${o().open} ↗</span>
        </a>`}function He(){const e=`<a class="library-card sakura-card" href="${h("works",u())}">
          <small>SAKURA / IMAGE</small>
          <strong>${d(g.title)}</strong>
          <span>${o().open} ↗</span>
        </a>
        <a class="library-card engine-card" href="${h("engine",u())}">
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
          ${q.map(Oe).join("")}${e}
        </div>
      </section>`}function Pe(){const e=[["engine","01",o().tools,"ENGINE"],["profile","02",o().profile,"PROFILE"],["works","03",o().works,"WORKS"]].map(([t,n,a,i])=>`<a href="${h(t,u())}">
            <span>${n}</span>
            <div><small>${a}</small><h3>${i}</h3></div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return`<section class="index-section">
        <div class="section-label">
          <span>02</span>
          <h2>${o().index}</h2>
          <p>${o().indexText}</p>
        </div>
        <div class="index-links">${e}</div>
      </section>`}function Ye(){return`<section class="statement-band">
        <p>“${d(R.statement)}”</p>
        <a href="${h("profile",u())}">${o().profile} ↗</a>
      </section>`}function Re(){const t=T()?"is-unlocked":"is-locked";return y(`<div class="engine-home ${t}" id="engine-home">
      ${Ae()}
      <div class="home-content" id="home-content">
        ${Ne()}
        ${He()}
        ${Pe()}
        ${Ye()}
      </div>
      <button class="lock-button" id="lock-entry" type="button">${o().lock} ×</button>
    </div>`,"home")}function qe(){const e=he.map(t=>`<section>
          <h2>${t.title}</h2>
          ${t.items.map(n=>`<a class="tool-row" href="${n.url}" target="_blank" rel="noopener noreferrer">
              <strong>${n.name}</strong>
              <span>${d(n.note)}</span>
              <b aria-hidden="true">↗</b>
            </a>`).join("")}
        </section>`).join("");return y(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">02 / ENGINE</span>
        <h1>${o().engineHeading}</h1>
        <p>${o().engineIntro}</p>
      </div>
      <div class="tool-groups">${e}</div>
    </section>`,"engine")}function ze(){return y(`<section class="inner-page search-page">
      <div class="page-intro">
        <span class="kicker">05 / SEARCH</span>
        <h1>${o().searchHeading}</h1>
        <p>${o().searchIntro}</p>
      </div>
      <form class="search-panel" data-search-form action="https://www.google.com/search" method="get" target="_blank" rel="noopener">
        <label for="search-query">${o().searchPlaceholder}</label>
        <div class="search-row">
          <input id="search-query" name="q" type="search" placeholder="${o().searchPlaceholder}" autocomplete="off" required />
          <button type="submit">${o().searchSubmit}<span aria-hidden="true">↗</span></button>
        </div>
        <label class="search-provider-label" for="search-provider">${o().searchProvider}</label>
        <select id="search-provider" class="search-provider-select" data-search-provider>
          <option value="https://www.google.com/search">Google</option>
          <option value="https://www.bing.com/search">Bing</option>
          <option value="https://duckduckgo.com/">DuckDuckGo</option>
          <option value="https://github.com/search">GitHub</option>
        </select>
      </form>
    </section>`,"search")}function Fe(){const e=fe.map(t=>`<a href="${t.url}"${t.rel?` rel="${t.rel}"`:""}>${t.name} ↗</a>`).join("");return y(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">03 / PROFILE</span>
        <h1>Linn,<br><i>${o().profileHeading}</i></h1>
      </div>
      <div class="profile-layout">
        <blockquote>${d(R.bio)}</blockquote>
        <div class="profile-copy">
          <p>${d(R.focus)}</p>
          <div class="contact"><span>${o().contact}</span>${e}</div>
        </div>
      </div>
    </section>`,"profile")}function Me(){if(B.length===0)return"";const e=B.map(t=>`<li>
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
      </section>`}function De(){const e=ge.map((t,n)=>`<a class="project-row" href="${t.url}" target="_blank" rel="noopener noreferrer">
            <span>0${n+1}</span>
            <div>
              <small>${t.stack} / ${t.period}</small>
              <h2>${t.name}</h2>
              <p>${d(t.desc)}</p>
            </div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return y(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">04 / WORKS</span>
        <h1>${o().worksHeading}</h1>
        <p>${o().worksIntro}</p>
      </div>
      <section class="works-list">
        <div class="section-label"><span>01</span><h2>${o().selected}</h2></div>
        <div>${e}</div>
      </section>
      ${Me()}
      <section class="photo-section">
        <div class="section-label"><span>03</span><h2>${o().photo}</h2></div>
        <figure>
          ${D({sizes:"(max-width: 768px) 100vw, 70vw"})}
          <figcaption><strong>${d(g.title)}</strong><span>${d(g.note)}</span></figcaption>
        </figure>
      </section>
    </section>`,"works")}function _(e){return y(`<section class="subsite-page ${e.tone}">
      <a class="back-link" href="${h("home",u())}">← ${o().back}</a>
      <span class="kicker">SUBSITE / ${e.name}</span>
      <h1>${d(e.title)}</h1>
      <p>${d(e.desc)}</p>
      <div class="subsite-placeholder">
        <span>WIP / ${new Date().getFullYear()}</span>
        <strong>${o().subsiteWip}</strong>
        <a href="${h("engine",u())}">${o().tools} ↗</a>
      </div>
    </section>`,"")}function Ce(){return y(`<section class="inner-page not-found">
      <div class="page-intro">
        <span class="kicker">404 / NOT FOUND</span>
        <h1>${o().notFoundHeading}</h1>
        <p>${o().notFoundBody}</p>
      </div>
      <p class="not-found-cta"><a class="primary-link" href="${h("home",u())}">${o().notFoundCta}<span aria-hidden="true">↗</span></a></p>
    </section>`,"")}const Ge={home:Re,engine:qe,profile:Fe,works:De,search:ze,toy:()=>_(q[0]),notes:()=>_(q[1])},ne=()=>Z(location.pathname);function v(e,t,n){let a=document.head.querySelector(`meta[${e}="${t}"]`);a||(a=document.createElement("meta"),a.setAttribute(e,t),document.head.append(a)),a.setAttribute("content",n)}function Ke(e,t){document.head.querySelector(`meta[${e}="${t}"]`)?.remove()}function We(e,t){let n=document.head.querySelector(`link[rel="${e}"]:not([hreflang])`);n||(n=document.createElement("link"),n.setAttribute("rel",e),document.head.append(n)),n.setAttribute("href",t)}function Be(e){document.head.querySelector(`link[rel="${e}"]:not([hreflang])`)?.remove()}function _e(e,t){let n=document.head.querySelector(`link[rel="alternate"][hreflang="${e}"]`);n||(n=document.createElement("link"),n.setAttribute("rel","alternate"),n.setAttribute("hreflang",e),document.head.append(n)),n.setAttribute("href",t)}function je(){document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(e=>e.remove())}function Ue(e,t){const n=e??$e;if(document.title=n.title[t],v("name","description",n.description[t]),v("property","og:title",n.title[t]),v("property","og:description",n.description[t]),v("property","og:locale",be[t]),v("name","robots",n.noindex?"noindex, follow":"index, follow"),!e){Ke("property","og:url"),Be("canonical"),je();return}const a=`${L}${e.path[t]}`;v("property","og:url",a),We("canonical",a);for(const i of ke(e.id))_e(i.hreflang,i.href)}const Ve=()=>document.querySelector("#app");let oe=()=>{};const Xe=e=>{oe=e};let j=!1;function C(e=ne()){const t=Q(e),n=t?t.lang:ve(e),a=t?t.id:null,i=a?ye(a):null,r=Ve();we(n,a);const p=`${a??"notfound"}:${n}`;return!j&&r.dataset.prerendered===p||(r.innerHTML=(a?Ge[a]:Ce)()),j=!0,Ue(i,n),document.body.classList.toggle("is-locked",a==="home"&&!T()),oe(),a}function Je(e,{hash:t="",replace:n=!1}={}){const a=`${e}${t}`;if(n?history.replaceState({path:e},"",a):history.pushState({path:e},"",a),C(e),t){document.querySelector(t)?.scrollIntoView();return}window.scrollTo(0,0),document.querySelector("#top")?.focus({preventScroll:!0})}function Qe(){document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.target.closest?.("a");if(!t||t.target==="_blank"||t.hasAttribute("download"))return;const n=new URL(t.getAttribute("href")??"",location.href);if(n.origin!==location.origin)return;const a=Z(n.pathname);if(Q(a)&&!(n.pathname===location.pathname&&n.hash)){if(e.preventDefault(),n.pathname===location.pathname){window.scrollTo(0,0);return}Je(a,{hash:n.hash})}}),window.addEventListener("popstate",()=>{C(ne())})}const U="wwhooo-theme",Ze=new Set(["system","light","dark"]);let V=!1;function X(e){const t=Ze.has(e)?e:"system";return document.documentElement.dataset.theme=t,document.querySelectorAll("[data-theme-control]").forEach(n=>{try{n.value=t}catch{}}),t}function et(){const e=localStorage.getItem(U)??"system";X(e),!V&&(V=!0,document.addEventListener("change",t=>{const n=t.target.closest?.("[data-theme-control]");if(!n)return;const a=X(n.value);localStorage.setItem(U,a)}))}function tt(){const e=document.querySelector("[data-search-form]"),t=e?.querySelector('input[name="q"]'),n=e?.querySelector("[data-search-provider]");!e||!t||!n||e.dataset.ready||(e.dataset.ready="true",n.addEventListener("change",()=>{e.action=n.value}),e.addEventListener("submit",a=>{t.value.trim()||(a.preventDefault(),t.focus())}))}function nt(){const e=document.querySelector(".library-rail");!e||e.dataset.ready||(e.dataset.ready="true",e.addEventListener("wheel",t=>{if(Math.abs(t.deltaY)<=Math.abs(t.deltaX))return;const n=e.scrollWidth-e.clientWidth;if(n<=0)return;const a=e.scrollLeft<=0&&t.deltaY<0,i=e.scrollLeft>=n-1&&t.deltaY>0;a||i||(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1}))}function ot(){et(),pe(),nt(),tt()}Xe(ot);Qe();C();
