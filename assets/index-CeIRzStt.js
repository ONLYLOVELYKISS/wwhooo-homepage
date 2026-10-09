(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const Y="wwhooo-entered",I=()=>{try{return sessionStorage.getItem(Y)==="1"}catch{return!1}},de=()=>{try{sessionStorage.setItem(Y,"1")}catch{}},he=()=>{try{sessionStorage.removeItem(Y)}catch{}},N=.8,ue=130,pe=280;function me(){const e=document.querySelector("#entry-gate"),t=document.querySelector("#engine-home"),a=document.querySelector("#home-content"),o=document.querySelector("#lock-entry");if(!e||!t)return;const s=[document.querySelector(".skip-link"),document.querySelector(".site-header"),document.querySelector("footer")];let r=I(),i=0,l=null,g=0,w=0,G=0,q=0;const L=()=>{e.style.setProperty("--swipe-ratio",String(i))},C=()=>{const c=(b,le)=>{b&&(le?b.setAttribute("inert",""):b.removeAttribute("inert"))};c(e,r),e.classList.toggle("gate-complete",r),t.classList.toggle("is-unlocked",r),t.classList.toggle("is-locked",!r),c(a,!r),a&&a.setAttribute("aria-hidden",String(!r));for(const b of s)c(b,!r);document.body.classList.toggle("is-locked",!r),document.documentElement.classList.toggle("entered",r)},O=()=>{r||(r=!0,i=1,L(),de(),C(),requestAnimationFrame(()=>{document.querySelector("#top")?.focus({preventScroll:!0})}))},P=()=>{i=0,w=0,L()},K=c=>{i=Math.max(0,Math.min(1,c)),L(),i>=N&&O()},se=()=>{r=!1,he(),P(),C(),requestAnimationFrame(()=>e.focus({preventScroll:!0}))},ie=c=>{r||l!==null||c.target.closest?.("a")||(l=c.pointerId,g=c.clientY,q=0,c.currentTarget.setPointerCapture?.(l))},ce=c=>{l===null||c.pointerId!==l||(Math.abs(c.clientY-g)>6&&(q=Date.now()+400),K((g-c.clientY)/ue))},_=c=>{l===null||c.pointerId!==l||(l=null,c.currentTarget.releasePointerCapture?.(c.pointerId),i<N&&P())};e.addEventListener("pointerdown",ie),e.addEventListener("pointermove",ce),e.addEventListener("pointerup",_),e.addEventListener("pointercancel",_),e.addEventListener("click",c=>{r||Date.now()<q||c.target.closest?.("a")||O()}),e.addEventListener("keydown",c=>{r||c.target!==e||(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),O())}),e.addEventListener("wheel",c=>{if(r)return;const b=Math.abs(c.deltaY)>=Math.abs(c.deltaX)?c.deltaY:0;b&&(w=Math.max(0,w+b),K(w/pe),clearTimeout(G),G=setTimeout(()=>{i<N&&P()},360))},{passive:!0}),o?.addEventListener("click",se),C(),L()}const d=(e,t)=>({zh:e,en:t}),H={author:"Linn",email:"wwhooo@icloud.com",github:"https://github.com/ONLYLOVELYKISS"},R={statement:d("技术是我靠近问题的方式，不是我介绍自己的全部。","Technology is how I get closer to problems, not the whole story of who I am."),bio:d("我在网站、自动化工具与跨技术栈实验之间移动。这里是一个持续生长的个人入口。","I move between websites, automation, and experiments across stacks. This is a personal entry point that keeps growing."),focus:d("来自中国西安，关注个人网站、自动化、实用工具，以及从小念头开始、最后变成可使用的东西。","Based in Xi’an, China. I care about personal websites, automation, useful tools, and small ideas that become usable things.")},ge=[{title:"Search",items:[{name:"Google",note:d("通用搜索","General search"),url:"https://www.google.com/"},{name:"Bing",note:d("搜索与图像","Search and images"),url:"https://www.bing.com/"},{name:"GitHub",note:d("代码与开源","Code and open source"),url:"https://github.com/"}]},{title:"Build",items:[{name:"MDN",note:d("Web 文档","Web documentation"),url:"https://developer.mozilla.org/"},{name:"Can I Use",note:d("兼容性查询","Browser compatibility"),url:"https://caniuse.com/"},{name:"Vite",note:d("前端构建","Frontend build tool"),url:"https://vite.dev/"}]},{title:"AI / Tools",items:[{name:"ChatGPT",note:d("AI 工具","AI tools"),url:"https://chatgpt.com/"},{name:"Regex101",note:d("正则调试","Regular expression tester"),url:"https://regex101.com/"},{name:"JSON Crack",note:d("数据可视化","Data visualization"),url:"https://jsoncrack.com/"}]}],fe=[{name:"wwhooo.com",stack:"PERSONAL HOMEPAGE",period:"2026",desc:d("以摄影、项目和个人档案为入口，重新组织一个人的公开空间。","A personal space organized around photography, projects, and profile."),url:"https://github.com/ONLYLOVELYKISS/wwhooo-homepage"},{name:"TOY",stack:"PYTHON / AI + INTERNET",period:"2025—",desc:d("阶段性生长的实验场：把好奇心拆成小工具，把小工具变成可运行的东西。","A growing lab for turning curiosity into small, runnable tools."),url:"https://github.com/ONLYLOVELYKISS/TOY"}],B=[{name:"chaoxing-sign-cli",stack:"TYPESCRIPT / AUTOMATION",period:"ARCHIVE",desc:d("围绕具体使用场景构建的自动化工具，探索监测、签到和消息推送。","An automation tool exploring monitoring, sign-ins, and notifications."),url:"https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli"}],F=[{id:"toy",name:"TOY LAB",tone:"lab",title:d("TOY 实验场","TOY Lab"),desc:d("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run.")},{id:"notes",name:"NIGHT NOTES",tone:"notes",title:d("夜间札记","Night Notes"),desc:d("把观察、片段和还没有结论的想法放在这里。","Observations, fragments, and thoughts without conclusions yet.")}],f={title:d("Sakura / 夜间花卉","Sakura / Night Bloom"),note:d("在暗处保留一点温度。","Keeping a little warmth in the dark."),alt:d("夜色中盛开的樱花特写","A close-up of sakura blossoms against a dark night"),widths:[800,1600,2400],fallback:"/images/sakura-1600.jpg",width:2400,height:1004},be=(e=f.widths)=>e.map(t=>`/images/sakura-${t}.webp ${t}w`).join(", "),ye=[{name:"GitHub",url:H.github,rel:"me"},{name:"Email",url:`mailto:${H.email}`}],u=(e,t)=>({zh:e,en:t}),E="https://wwhooo.com",M=["zh","en"],$={zh:"zh-CN",en:"en"},$e={zh:"zh_CN",en:"en_US"},T=e=>e==="zh"?"en":"zh",y=e=>e==="/"?"/en/":`/en${e}`,A=[{id:"home",path:{zh:"/",en:y("/")},title:u("Linn — 值得留下的东西","Linn — Things worth keeping"),description:u("Linn 的个人主页：摄影、软件项目、个人档案与常用工具。","Linn’s personal homepage: photography, software projects, profile, and everyday tools.")},{id:"engine",path:{zh:"/engine/",en:y("/engine/")},title:u("工具 — Linn","Tools — Linn"),description:u("常用工具入口：搜索、构建、AI 与调试。","Everyday tools: search, build, AI, and debugging.")},{id:"profile",path:{zh:"/profile/",en:y("/profile/")},title:u("档案 — Linn","Profile — Linn"),description:u("关于 Linn：个人网站、自动化工具与跨技术栈实验。","About Linn: personal websites, automation, and experiments across stacks.")},{id:"works",path:{zh:"/works/",en:y("/works/")},title:u("作品与记录 — Linn","Works & notes — Linn"),description:u("软件项目与摄影作品。","Software projects and photographs.")},{id:"search",path:{zh:"/search/",en:y("/search/")},title:u("搜索 — Linn","Search — Linn"),description:u("在常用搜索引擎之间切换，快速开始搜索。","Switch search engines and start searching quickly.")},{id:"toy",path:{zh:"/toy/",en:y("/toy/")},title:u("TOY 实验场 — Linn","TOY Lab — Linn"),description:u("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run."),noindex:!0},{id:"notes",path:{zh:"/notes/",en:y("/notes/")},title:u("夜间札记 — Linn","Night Notes — Linn"),description:u("观察、片段和还没有结论的想法。","Observations, fragments, and thoughts without conclusions yet."),noindex:!0}],ve={title:u("页面不存在 — Linn","Page not found — Linn"),description:u("这个地址没有对应的内容。","This address has no matching content."),noindex:!0},z=new Map(A.map(e=>[e.id,e])),J=new Map;for(const e of A)for(const t of M)J.set(e.path[t],{id:e.id,lang:t});A.flatMap(e=>M.map(t=>e.path[t]));A.filter(e=>!e.noindex).flatMap(e=>M.map(t=>e.path[t]));const ke=e=>z.get(e)??null,m=(e,t)=>z.get(e)?.path[t==="en"?"en":"zh"]??null,Z=e=>J.get(e)??null,we=e=>e==="/en/"||e.startsWith("/en/")?"en":"zh";function ee(e){const t=e.replace(/\/index\.html$/,"/").replace(/\/+$/,"");return t===""?"/":`${t}/`}function Le(e){const t=z.get(e);return t?[{hreflang:$.zh,href:`${E}${t.path.zh}`},{hreflang:$.en,href:`${E}${t.path.en}`},{hreflang:"x-default",href:`${E}${t.path.zh}`}]:[]}let x="zh",te=null;const p=()=>x,ae=()=>te;function Se(e,t){return x=e==="en"?"en":"zh",te=t??null,typeof document<"u"&&(document.documentElement.lang=$[x]),x}const Ee={zh:{skip:"跳到主要内容",navLabel:"主导航",nav:["首页","工具","档案","作品","搜索"],theme:"主题",themeSystem:"跟随系统",themeLight:"浅色",themeDark:"深色",themeLabel:"选择主题模式",eyebrow:"Linn / Personal engine",title:"把值得留下的，<br>放在这里。",intro:"一个持续更新的个人入口：记录项目、工具、观察和正在形成的东西。",explore:"探索我的空间",status:"现在进行中",statusText:"维护个人网站，整理 TOY 实验场",index:"目录",indexText:"从正在使用的东西开始，逐步了解这个空间。",tools:"工具箱",profile:"关于我",works:"作品与记录",search:"搜索",searchHeading:"找到需要的<br><i>东西。</i>",searchIntro:"在常用搜索入口之间切换，输入问题后直接前往结果页。",searchPlaceholder:"输入要搜索的内容",searchProvider:"结果打开于",searchProviderHint:"提交按钮会标明结果打开位置",searchSubmit:"搜索",searchWith:"使用",searchShortcut:"按 / 聚焦搜索，Esc 清空",searchPrivacy:"搜索内容会直接发送给所选搜索服务；本站不会保存查询。",searchOperators:"让搜索更精确",searchOperatorIntro:"在关键词前后加入语法，缩小结果范围。",searchSiteLabel:"限定网站",searchPhraseLabel:"精确短语",searchExcludeLabel:"排除词",searchFileLabel:"限定文件类型",selected:"精选项目",archive:"归档",archiveNote:"较早的实验与工具，保留记录。",photo:"一张照片",contact:"联系我",language:"EN",languageLabel:"切换到英文",otherLanguageName:"English",top:"回到顶部",lock:"重新进入",unlock:"向上滑动进入",unlockHint:"在屏幕任意位置向上滑动，进入个人引擎",gateKeyboardHint:"键盘用户可按 Enter 或空格进入。",unlocked:"准备进入",gateTitle:"向上滑动<br><i>进入引擎。</i>",gateFoot:"没有登录，只有一次主动进入。",library:"个人库",libraryText:"项目、子站、工具和视觉记录，放在同一条可探索的轨道上。",dragExplore:"左右滑动浏览",open:"进入",back:"返回主站",subsiteWip:"这是一个可访问的子站初稿。",notFoundTitle:"页面不存在",notFoundHeading:"这个地址<br><i>没有内容。</i>",notFoundBody:"也许链接已经改变，或者它从来没有存在过。",notFoundCta:"回到首页",engineHeading:"我会反复打开的<br><i>一些入口。</i>",engineIntro:"保持简单，保持可用。把常用的东西放在顺手的位置。",engineFilterLabel:"筛选入口",engineFilterPlaceholder:"搜索工具名称或用途",engineFilterEmpty:"没有匹配的入口。",searchCategories:"快速入口",searchCategoryWeb:"网页",searchCategoryImages:"图片",searchCategoryMaps:"地图",searchCategoryCode:"代码",searchCategoryHint:"直接把查询带到对应入口",profileHeading:"持续进行中。",worksHeading:"做过，<br><i>看过。</i>",worksIntro:"软件项目和摄影作品。一个人如何工作，也如何看待周围的世界。"},en:{skip:"Skip to main content",navLabel:"Main navigation",nav:["Home","Tools","Profile","Works","Search"],theme:"Theme",themeSystem:"System",themeLight:"Light",themeDark:"Dark",themeLabel:"Choose theme mode",eyebrow:"Linn / Personal engine",title:"Things worth<br>keeping, here.",intro:"A living personal entry point for projects, tools, observations, and things taking shape.",explore:"Explore the space",status:"Currently",statusText:"Maintaining this site and the TOY lab",index:"Index",indexText:"Start with the things in use and take a closer look around.",tools:"Toolbox",profile:"About me",works:"Works & notes",search:"Search",searchHeading:"Find what you<br><i>need.</i>",searchIntro:"Switch between familiar search engines and go straight to the results.",searchPlaceholder:"What are you looking for?",searchSubmit:"Search",searchProvider:"Results open in",searchProviderHint:"The submit button shows where results will open",searchWith:"Search with",searchShortcut:"Press / to focus search, Esc to clear",searchPrivacy:"Queries are sent directly to the selected search provider; this site does not store them.",searchOperators:"Search with precision",searchOperatorIntro:"Add an operator to narrow your results.",searchSiteLabel:"Limit to a site",searchPhraseLabel:"Exact phrase",searchExcludeLabel:"Exclude a term",searchFileLabel:"Limit by file type",selected:"Selected projects",archive:"Archive",archiveNote:"Earlier experiments and tools, kept for the record.",photo:"A photograph",contact:"Find me",language:"中",languageLabel:"Switch to Chinese",otherLanguageName:"中文",top:"Back to top",lock:"Enter again",unlock:"Swipe up to enter",unlockHint:"Swipe up anywhere to enter the personal engine",gateKeyboardHint:"Keyboard users can press Enter or Space to enter.",unlocked:"Ready to enter",gateTitle:"Swipe up into<br><i>personal engine.</i>",gateFoot:"No login, just a deliberate entrance.",library:"Personal library",libraryText:"Projects, subsites, tools, and visual notes arranged on one open rail.",dragExplore:"Swipe left/right to explore",open:"Open",back:"Back home",subsiteWip:"This is an accessible first draft of the subsite.",notFoundTitle:"Page not found",notFoundHeading:"This address<br><i>has nothing.</i>",notFoundBody:"The link may have changed, or it never existed at all.",notFoundCta:"Back home",engineHeading:"A few places I<br><i>return to.</i>",engineIntro:"Simple, useful, and close at hand.",engineFilterLabel:"Filter entries",engineFilterPlaceholder:"Search by name or purpose",engineFilterEmpty:"No matching entries.",searchCategories:"Quick routes",searchCategoryWeb:"Web",searchCategoryImages:"Images",searchCategoryMaps:"Maps",searchCategoryCode:"Code",searchCategoryHint:"Send the query straight to a focused route",profileHeading:"in progress.",worksHeading:"Made,<br><i>observed.</i>",worksIntro:"Software projects and photographs. How I work, and how I look at the world."}},n=()=>Ee[p()],h=e=>e?e[p()]:"",Te=[["home",0],["engine",1],["profile",2],["works",3],["search",4]];function W({sizes:e,priority:t=!1}){const a=t?'fetchpriority="high"':'loading="lazy"';return`<picture>
        <source type="image/webp" srcset="${be()}" sizes="${e}">
        <img src="${f.fallback}" width="${f.width}" height="${f.height}" alt="${h(f.alt)}" ${a} decoding="async">
      </picture>`}function xe(e=""){const t=p(),a=Te.map(([o,s])=>{const r=e===o?' aria-current="page"':"";return`<a href="${m(o,t)}"${r}>${n().nav[s]}</a>`}).join("");return`<header class="site-header">
      <a class="brand" href="${m("home",t)}"><span>WW</span><b>LINN</b></a>
      <nav aria-label="${n().navLabel}">${a}</nav>
      ${Ae()}
      ${Ie()}
    </header>`}function Ie(){return`<label class="theme-control" for="theme-select">
      <span class="sr-only">${n().themeLabel}</span>
      <span aria-hidden="true">◐</span>
      <select id="theme-select" name="theme" data-theme-control aria-label="${n().themeLabel}">
        <option value="system">${n().themeSystem}</option>
        <option value="light">${n().themeLight}</option>
        <option value="dark">${n().themeDark}</option>
      </select>
    </label>`}function Ae(){const e=T(p());return`<a class="language" href="${m(ae()??"home",e)}" hreflang="${$[e]}" lang="${$[e]}">${n().language}<span class="sr-only"> — ${n().languageLabel}</span></a>`}function qe(){return`<footer>
      <span>© ${new Date().getFullYear()} ${H.author.toUpperCase()}</span>
      <span>WW / PERSONAL ENGINE</span>
      <a href="#top">${n().top} ↑</a>
    </footer>`}function v(e,t=""){return`<a class="skip-link" href="#top">${n().skip}</a>${xe(t)}<main id="top" tabindex="-1">${e}</main>${qe()}`}function Ce(){return`<section class="entry-gate${I()?" gate-complete":""}" id="entry-gate" role="region" tabindex="0" aria-label="${n().unlock}" aria-describedby="gate-instruction">
      <span class="sr-only" id="gate-instruction">${n().unlockHint} ${n().gateKeyboardHint}</span>
      <div class="gate-image">
        ${W({sizes:"(max-width: 768px) 100vw, 60vw",priority:!0})}
        <div class="gate-vignette"></div>
      </div>
      <div class="gate-copy">
        <span class="kicker">WW / SAKURA ENTRY</span>
        <p class="gate-status">${n().unlocked}</p>
        <h1>${n().gateTitle}</h1>
        <p class="gate-hint"><span class="hint-chevron" aria-hidden="true">↑</span>${n().unlockHint}</p>
        <p class="gate-foot">${n().gateFoot}</p>
        <p class="gate-alt"><a href="${m(ae()??"home",T(p()))}" hreflang="${$[T(p())]}" lang="${$[T(p())]}">${n().otherLanguageName}</a></p>
      </div>
      <span class="gate-progress" aria-hidden="true"></span>
      <b class="gate-mark" aria-hidden="true">桜</b>
    </section>`}function Oe(){return`<section class="landing">
        <div class="landing-image">
          ${W({sizes:"(max-width: 768px) 100vw, 55vw"})}
          <div class="image-caption">${h(f.title)}<span>${h(f.note)}</span></div>
        </div>
        <div class="landing-copy">
          <p class="kicker">${n().eyebrow}</p>
          <h2>${n().title}</h2>
          <p class="lead">${n().intro}</p>
          <a class="primary-link" href="#library">${n().explore}<span aria-hidden="true">↓</span></a>
          <div class="now"><span>${n().status}</span><strong>${n().statusText}</strong></div>
        </div>
      </section>`}function Pe(e){return`<a class="library-card ${e.tone}" href="${m(e.id,p())}">
          <small>${e.name}</small>
          <strong>${h(e.title)}</strong>
          <span>${n().open} ↗</span>
        </a>`}function Ne(){const e=`<a class="library-card sakura-card" href="${m("works",p())}">
          <small>SAKURA / IMAGE</small>
          <strong>${h(f.title)}</strong>
          <span>${n().open} ↗</span>
        </a>
        <a class="library-card engine-card" href="${m("engine",p())}">
          <small>ENGINE / LINKS</small>
          <strong>${h({zh:"常用入口",en:"Everyday links"})}</strong>
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
          ${F.map(Pe).join("")}${e}
        </div>
      </section>`}function He(){const e=[["engine","01",n().tools,"ENGINE"],["profile","02",n().profile,"PROFILE"],["works","03",n().works,"WORKS"]].map(([t,a,o,s])=>`<a href="${m(t,p())}">
            <span>${a}</span>
            <div><small>${o}</small><h3>${s}</h3></div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return`<section class="index-section">
        <div class="section-label">
          <span>02</span>
          <h2>${n().index}</h2>
          <p>${n().indexText}</p>
        </div>
        <div class="index-links">${e}</div>
      </section>`}function Re(){return`<section class="statement-band">
        <p>“${h(R.statement)}”</p>
        <a href="${m("profile",p())}">${n().profile} ↗</a>
      </section>`}function Fe(){const t=I()?"is-unlocked":"is-locked";return v(`<div class="engine-home ${t}" id="engine-home">
      ${Ce()}
      <div class="home-content" id="home-content">
        ${Oe()}
        ${Ne()}
        ${He()}
        ${Re()}
      </div>
      <button class="lock-button" id="lock-entry" type="button">${n().lock} ×</button>
    </div>`,"home")}function Ye(){const e=ge.map(t=>`<section data-tool-group>
          <h2>${t.title}</h2>
          ${t.items.map(a=>`<a class="tool-row" data-tool-entry data-tool-search="${`${t.title} ${a.name} ${h(a.note)}`.toLowerCase()}" href="${a.url}" target="_blank" rel="noopener noreferrer">
              <strong>${a.name}</strong>
              <span>${h(a.note)}</span>
              <b aria-hidden="true">↗</b>
            </a>`).join("")}
        </section>`).join("");return v(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">02 / ENGINE</span>
        <h1>${n().engineHeading}</h1>
        <p>${n().engineIntro}</p>
      </div>
      <div class="tool-filter" role="search">
        <label for="tool-filter-query">${n().engineFilterLabel}</label>
        <input id="tool-filter-query" type="search" data-tool-filter placeholder="${n().engineFilterPlaceholder}" autocomplete="off" />
        <span class="tool-filter-count" data-tool-filter-count aria-live="polite"></span>
      </div>
      <p class="tool-filter-empty" data-tool-filter-empty hidden>${n().engineFilterEmpty}</p>
      <div class="tool-groups">${e}</div>
    </section>`,"engine")}function Me(){const e=[["site:developer.mozilla.org ",n().searchSiteLabel,"site:developer.mozilla.org"],['"flexible box layout" ',n().searchPhraseLabel,'"flexible box layout"'],["-template ",n().searchExcludeLabel,"-template"],["filetype:pdf ",n().searchFileLabel,"filetype:pdf"]];return v(`<section class="inner-page search-page">
      <div class="page-intro">
        <span class="kicker">05 / SEARCH</span>
        <h1>${n().searchHeading}</h1>
        <p>${n().searchIntro}</p>
      </div>
      <form id="search-provider-state" hidden></form>
      <form class="search-panel" role="search" aria-label="${n().search}" data-search-form action="https://www.google.com/search" method="get" target="_blank" rel="noopener">
        <label class="search-query-label" for="search-query">${n().searchPlaceholder}</label>
        <div class="search-row">
          <span class="search-symbol" aria-hidden="true">⌕</span>
          <input id="search-query" name="q" type="search" placeholder="${n().searchPlaceholder}" autocomplete="off" required aria-keyshortcuts="/ Escape" />
          <button type="submit" data-search-submit>${n().searchWith} Google<span aria-hidden="true">↗</span></button>
        </div>
        <div class="search-controls">
        <fieldset class="search-provider-control" aria-describedby="search-provider-hint">
          <legend class="search-provider-label">${n().searchProvider}</legend>
          <p class="search-provider-hint" id="search-provider-hint">${n().searchProviderHint}</p>
          <div class="search-provider-options">
            <label class="search-provider-option is-selected">
              <input type="radio" name="search-provider" form="search-provider-state" value="https://www.google.com/search" data-search-provider checked disabled />
              <span>Google</span>
            </label>
            <label class="search-provider-option">
              <input type="radio" name="search-provider" form="search-provider-state" value="https://www.bing.com/search" data-search-provider disabled />
              <span>Bing</span>
            </label>
            <label class="search-provider-option">
              <input type="radio" name="search-provider" form="search-provider-state" value="https://duckduckgo.com/" data-search-provider disabled />
              <span>DuckDuckGo</span>
            </label>
            <label class="search-provider-option">
              <input type="radio" name="search-provider" form="search-provider-state" value="https://github.com/search" data-search-provider disabled />
              <span>GitHub</span>
            </label>
          </div>
        </fieldset>
          <span class="search-shortcut"><kbd>/</kbd> ${n().searchShortcut}</span>
        </div>
        <p class="search-privacy">${n().searchPrivacy}</p>
      </form>
      <section class="search-quick" aria-labelledby="search-quick-title">
         <div>
           <span class="kicker">SEARCH / ROUTES</span>
           <h2 id="search-quick-title">${n().searchCategories}</h2>
           <p>${n().searchCategoryHint}</p>
         </div>
         <div class="search-quick-grid">
           <button type="button" data-search-route="https://www.google.com/search" data-search-param="q" data-search-label="${n().searchCategoryWeb}"><span>⌕</span><b>${n().searchCategoryWeb}</b><small>!web</small></button>
           <button type="button" data-search-route="https://www.google.com/search?tbm=isch" data-search-param="q" data-search-label="${n().searchCategoryImages}"><span>▧</span><b>${n().searchCategoryImages}</b><small>!images</small></button>
           <button type="button" data-search-route="https://www.google.com/maps/search" data-search-param="query" data-search-label="${n().searchCategoryMaps}"><span>⌖</span><b>${n().searchCategoryMaps}</b><small>!map</small></button>
           <button type="button" data-search-route="https://github.com/search" data-search-param="q" data-search-label="${n().searchCategoryCode}"><span>&lt;/&gt;</span><b>${n().searchCategoryCode}</b><small>!code</small></button>
         </div>
       </section>
       <section class="search-guide" aria-labelledby="search-guide-title">
        <div class="search-guide-heading">
          <span class="kicker">SEARCH / NOTES</span>
          <h2 id="search-guide-title">${n().searchOperators}</h2>
          <p>${n().searchOperatorIntro}</p>
        </div>
        <ul class="search-operators">
          ${e.map(([t,a,o])=>`<li>
                <button type="button" data-query-template="${t.trimEnd().replace(/&/g,"&amp;").replace(/"/g,"&quot;")}">
                  <code>${o}</code><span>${a}</span><b aria-hidden="true">+</b>
                </button>
              </li>`).join("")}
        </ul>
      </section>
    </section>`,"search")}function ze(){const e=ye.map(t=>`<a href="${t.url}"${t.rel?` rel="${t.rel}"`:""}>${t.name} ↗</a>`).join("");return v(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">03 / PROFILE</span>
        <h1>Linn,<br><i>${n().profileHeading}</i></h1>
      </div>
      <div class="profile-layout">
        <blockquote>${h(R.bio)}</blockquote>
        <div class="profile-copy">
          <p>${h(R.focus)}</p>
          <div class="contact"><span>${n().contact}</span>${e}</div>
        </div>
      </div>
    </section>`,"profile")}function We(){if(B.length===0)return"";const e=B.map(t=>`<li>
            <a href="${t.url}" target="_blank" rel="noopener noreferrer">
              <div>
                <span class="archive-name">${t.name}</span>
                <small>${t.stack} / ${t.period}</small>
                <p>${h(t.desc)}</p>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
          </li>`).join("");return`<section class="archive-section">
        <div class="section-label">
          <span>02</span>
          <h2>${n().archive}</h2>
          <p>${n().archiveNote}</p>
        </div>
        <ul class="archive-list">${e}</ul>
      </section>`}function De(){const e=fe.map((t,a)=>`<a class="project-row" href="${t.url}" target="_blank" rel="noopener noreferrer">
            <span>0${a+1}</span>
            <div>
              <small>${t.stack} / ${t.period}</small>
              <h2>${t.name}</h2>
              <p>${h(t.desc)}</p>
            </div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return v(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">04 / WORKS</span>
        <h1>${n().worksHeading}</h1>
        <p>${n().worksIntro}</p>
      </div>
      <section class="works-list">
        <div class="section-label"><span>01</span><h2>${n().selected}</h2></div>
        <div>${e}</div>
      </section>
      ${We()}
      <section class="photo-section">
        <div class="section-label"><span>03</span><h2>${n().photo}</h2></div>
        <figure>
          ${W({sizes:"(max-width: 768px) 100vw, 70vw"})}
          <figcaption><strong>${h(f.title)}</strong><span>${h(f.note)}</span></figcaption>
        </figure>
      </section>
    </section>`,"works")}function j(e){return v(`<section class="subsite-page ${e.tone}">
      <a class="back-link" href="${m("home",p())}">← ${n().back}</a>
      <span class="kicker">SUBSITE / ${e.name}</span>
      <h1>${h(e.title)}</h1>
      <p>${h(e.desc)}</p>
      <div class="subsite-placeholder">
        <span>WIP / ${new Date().getFullYear()}</span>
        <strong>${n().subsiteWip}</strong>
        <a href="${m("engine",p())}">${n().tools} ↗</a>
      </div>
    </section>`,"")}function Ge(){return v(`<section class="inner-page not-found">
      <div class="page-intro">
        <span class="kicker">404 / NOT FOUND</span>
        <h1>${n().notFoundHeading}</h1>
        <p>${n().notFoundBody}</p>
      </div>
      <p class="not-found-cta"><a class="primary-link" href="${m("home",p())}">${n().notFoundCta}<span aria-hidden="true">↗</span></a></p>
    </section>`,"")}const Ke={home:Fe,engine:Ye,profile:ze,works:De,search:Me,toy:()=>j(F[0]),notes:()=>j(F[1])},ne=()=>ee(location.pathname);function k(e,t,a){let o=document.head.querySelector(`meta[${e}="${t}"]`);o||(o=document.createElement("meta"),o.setAttribute(e,t),document.head.append(o)),o.setAttribute("content",a)}function _e(e,t){document.head.querySelector(`meta[${e}="${t}"]`)?.remove()}function Be(e,t){let a=document.head.querySelector(`link[rel="${e}"]:not([hreflang])`);a||(a=document.createElement("link"),a.setAttribute("rel",e),document.head.append(a)),a.setAttribute("href",t)}function je(e){document.head.querySelector(`link[rel="${e}"]:not([hreflang])`)?.remove()}function Ue(e,t){let a=document.head.querySelector(`link[rel="alternate"][hreflang="${e}"]`);a||(a=document.createElement("link"),a.setAttribute("rel","alternate"),a.setAttribute("hreflang",e),document.head.append(a)),a.setAttribute("href",t)}function Ve(){document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(e=>e.remove())}function Xe(e,t){const a=e??ve;if(document.title=a.title[t],k("name","description",a.description[t]),k("property","og:title",a.title[t]),k("property","og:description",a.description[t]),k("property","og:locale",$e[t]),k("name","robots",a.noindex?"noindex, follow":"index, follow"),!e){_e("property","og:url"),je("canonical"),Ve();return}const o=`${E}${e.path[t]}`;k("property","og:url",o),Be("canonical",o);for(const s of Le(e.id))Ue(s.hreflang,s.href)}const Qe=()=>document.querySelector("#app");let re=()=>{};const Je=e=>{re=e};let U=!1;function D(e=ne()){const t=Z(e),a=t?t.lang:we(e),o=t?t.id:null,s=o?ke(o):null,r=Qe();Se(a,o);const i=`${o??"notfound"}:${a}`;return!U&&r.dataset.prerendered===i||(r.innerHTML=(o?Ke[o]:Ge)()),U=!0,Xe(s,a),document.body.classList.toggle("is-locked",o==="home"&&!I()),re(),o}function oe(){window.scrollTo({top:0,left:0,behavior:"instant"}),document.querySelector("#top")?.focus({preventScroll:!0})}function Ze(e,{hash:t="",replace:a=!1}={}){const o=`${e}${t}`;if(a?history.replaceState({path:e},"",o):history.pushState({path:e},"",o),D(e),t){document.querySelector(t)?.scrollIntoView();return}oe()}function et(){history.scrollRestoration="manual",document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.target.closest?.("a");if(!t||t.target==="_blank"||t.hasAttribute("download"))return;const a=new URL(t.getAttribute("href")??"",location.href);if(a.origin!==location.origin)return;const o=ee(a.pathname);if(Z(o)&&!(a.pathname===location.pathname&&a.hash)){if(e.preventDefault(),a.pathname===location.pathname){window.scrollTo(0,0);return}Ze(o,{hash:a.hash})}}),window.addEventListener("popstate",()=>{D(ne()),oe()})}const V="wwhooo-theme",tt=new Set(["system","light","dark"]),at="#e1e9e4",nt="#101513",S={click:!1,keydown:!1};let X=!1;function rt(e){const t=document.querySelector('meta[data-theme-color="light"]'),a=document.querySelector('meta[data-theme-color="dark"]');!t||!a||(t.content=at,a.content=nt,e==="light"?(t.media="",a.media="not all"):e==="dark"?(t.media="not all",a.media=""):(t.media="(prefers-color-scheme: light)",a.media="(prefers-color-scheme: dark)"))}function Q(e){const t=tt.has(e)?e:"system";return document.documentElement.dataset.theme=t,rt(t),document.querySelectorAll("[data-theme-control]").forEach(a=>{try{a.value=t}catch{}}),t}function ot(){let e=document.documentElement.dataset.theme??"system";try{e=localStorage.getItem(V)??e}catch{}Q(e),!X&&(X=!0,document.addEventListener("change",t=>{const a=t.target.closest?.("[data-theme-control]");if(!a)return;const o=Q(a.value);try{localStorage.setItem(V,o)}catch{}}))}function st(){const e=document.querySelector("[data-tool-filter]"),t=[...document.querySelectorAll("[data-tool-entry]")];if(!e||!t.length||e.dataset.ready)return;e.dataset.ready="true";const a=document.querySelector("[data-tool-filter-empty]"),o=document.querySelector("[data-tool-filter-count]"),s=()=>{const r=e.value.trim().toLowerCase();let i=0;t.forEach(l=>{const g=!r||l.dataset.toolSearch?.includes(r);l.hidden=!g,g&&(i+=1)}),document.querySelectorAll("[data-tool-group]").forEach(l=>{l.hidden=!l.querySelector("[data-tool-entry]:not([hidden])")}),a&&(a.hidden=i>0),o&&(o.textContent=r?`${i}/${t.length}`:"")};e.addEventListener("input",s),s()}function it(){const e=document.querySelector("[data-search-form]"),t=e?.querySelector('input[name="q"]');!e||!t||document.querySelectorAll("[data-search-route]").forEach(a=>{a.dataset.ready||(a.dataset.ready="true",a.addEventListener("click",()=>{const o=t.value.trim();if(!o){t.focus();return}const s=a.dataset.searchRoute,r=a.dataset.searchParam??"q",i=new URL(s);i.searchParams.set(r,o),window.open(i,"_blank","noopener")}))})}function ct(){const e=document.querySelector("[data-search-form]"),t=e?.querySelector('input[name="q"]'),a=e?.querySelectorAll("[data-search-provider]");if(!e||!t||!a?.length||e.dataset.ready)return;e.dataset.ready="true",a.forEach(r=>{r.disabled=!1});const o=e.querySelector("[data-search-submit]"),s=r=>{e.action=r.value,a.forEach(i=>i.closest("label")?.classList.toggle("is-selected",i===r)),o&&(o.firstChild.textContent=`${document.documentElement.lang==="en"?"Search with":"使用"} ${r.closest("label")?.querySelector("span")?.textContent??"Google"}`)};a.forEach(r=>r.addEventListener("change",()=>s(r))),s(e.querySelector("[data-search-provider]:checked")??a[0]),S.click||(document.addEventListener("click",r=>{const i=r.target.closest?.("[data-query-template]");if(!i)return;const l=document.querySelector('[data-search-form] input[name="q"]');if(!l)return;const g=i.getAttribute("data-query-template")??"";l.value=`${g} `,l.focus(),l.setSelectionRange(l.value.length,l.value.length)}),S.click=!0),S.keydown||(document.addEventListener("keydown",r=>{if(r.altKey||r.ctrlKey||r.metaKey)return;const i=r.target,l=i instanceof HTMLElement&&(i.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(i.tagName));if(r.key==="/"&&!l){const g=document.querySelector('[data-search-form] input[name="q"]');if(!g)return;r.preventDefault(),g.focus()}else r.key==="Escape"&&i.matches?.('[data-search-form] input[name="q"]')&&(i.value="")}),S.keydown=!0),e.addEventListener("submit",r=>{t.value.trim()||(r.preventDefault(),t.focus())})}function lt(){const e=document.querySelector(".library-rail");!e||e.dataset.ready||(e.dataset.ready="true",e.addEventListener("wheel",t=>{if(Math.abs(t.deltaY)<=Math.abs(t.deltaX))return;const a=e.scrollWidth-e.clientWidth;if(a<=0)return;const o=e.scrollLeft<=0&&t.deltaY<0,s=e.scrollLeft>=a-1&&t.deltaY>0;o||s||(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1}))}function dt(){ot(),me(),lt(),ct(),st(),it()}Je(dt);et();D();
