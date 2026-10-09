(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const z="wwhooo-entered",T=()=>{try{return sessionStorage.getItem(z)==="1"}catch{return!1}},le=()=>{try{sessionStorage.setItem(z,"1")}catch{}},de=()=>{try{sessionStorage.removeItem(z)}catch{}},q=.8,ue=130,he=280;function pe(){const e=document.querySelector("#entry-gate"),t=document.querySelector("#engine-home"),a=document.querySelector("#home-content"),o=document.querySelector("#lock-entry");if(!e||!t)return;const s=[document.querySelector(".skip-link"),document.querySelector(".site-header"),document.querySelector("footer")];let r=T(),l=0,m=null,I=0,k=0,K=0,A=0;const w=()=>{e.style.setProperty("--swipe-ratio",String(l))},N=()=>{const i=(f,ce)=>{f&&(ce?f.setAttribute("inert",""):f.removeAttribute("inert"))};i(e,r),e.classList.toggle("gate-complete",r),t.classList.toggle("is-unlocked",r),t.classList.toggle("is-locked",!r),i(a,!r),a&&a.setAttribute("aria-hidden",String(!r));for(const f of s)i(f,!r);document.body.classList.toggle("is-locked",!r),document.documentElement.classList.toggle("entered",r)},O=()=>{r||(r=!0,l=1,w(),le(),N(),requestAnimationFrame(()=>{document.querySelector("#top")?.focus({preventScroll:!0})}))},P=()=>{l=0,k=0,w()},G=i=>{l=Math.max(0,Math.min(1,i)),w(),l>=q&&O()},re=()=>{r=!1,de(),P(),N(),requestAnimationFrame(()=>e.focus({preventScroll:!0}))},se=i=>{r||m!==null||i.target.closest?.("a")||(m=i.pointerId,I=i.clientY,A=0,i.currentTarget.setPointerCapture?.(m))},ie=i=>{m===null||i.pointerId!==m||(Math.abs(i.clientY-I)>6&&(A=Date.now()+400),G((I-i.clientY)/ue))},W=i=>{m===null||i.pointerId!==m||(m=null,i.currentTarget.releasePointerCapture?.(i.pointerId),l<q&&P())};e.addEventListener("pointerdown",se),e.addEventListener("pointermove",ie),e.addEventListener("pointerup",W),e.addEventListener("pointercancel",W),e.addEventListener("click",i=>{r||Date.now()<A||i.target.closest?.("a")||O()}),e.addEventListener("keydown",i=>{r||i.target!==e||(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),O())}),e.addEventListener("wheel",i=>{if(r)return;const f=Math.abs(i.deltaY)>=Math.abs(i.deltaX)?i.deltaY:0;f&&(k=Math.max(0,k+f),G(k/he),clearTimeout(K),K=setTimeout(()=>{l<q&&P()},360))},{passive:!0}),o?.addEventListener("click",re),N(),w()}const c=(e,t)=>({zh:e,en:t}),H={author:"Linn",email:"wwhooo@icloud.com",github:"https://github.com/ONLYLOVELYKISS"},R={statement:c("技术是我靠近问题的方式，不是我介绍自己的全部。","Technology is how I get closer to problems, not the whole story of who I am."),bio:c("我在网站、自动化工具与跨技术栈实验之间移动。这里是一个持续生长的个人入口。","I move between websites, automation, and experiments across stacks. This is a personal entry point that keeps growing."),focus:c("来自中国西安，关注个人网站、自动化、实用工具，以及从小念头开始、最后变成可使用的东西。","Based in Xi’an, China. I care about personal websites, automation, useful tools, and small ideas that become usable things.")},ge=[{title:"Search",items:[{name:"Google",note:c("通用搜索","General search"),url:"https://www.google.com/"},{name:"Bing",note:c("搜索与图像","Search and images"),url:"https://www.bing.com/"},{name:"GitHub",note:c("代码与开源","Code and open source"),url:"https://github.com/"}]},{title:"Build",items:[{name:"MDN",note:c("Web 文档","Web documentation"),url:"https://developer.mozilla.org/"},{name:"Can I Use",note:c("兼容性查询","Browser compatibility"),url:"https://caniuse.com/"},{name:"Vite",note:c("前端构建","Frontend build tool"),url:"https://vite.dev/"}]},{title:"AI / Tools",items:[{name:"ChatGPT",note:c("AI 工具","AI tools"),url:"https://chatgpt.com/"},{name:"Regex101",note:c("正则调试","Regular expression tester"),url:"https://regex101.com/"},{name:"JSON Crack",note:c("数据可视化","Data visualization"),url:"https://jsoncrack.com/"}]}],me=[{name:"wwhooo.com",stack:"PERSONAL HOMEPAGE",period:"2026",desc:c("以摄影、项目和个人档案为入口，重新组织一个人的公开空间。","A personal space organized around photography, projects, and profile."),url:"https://github.com/ONLYLOVELYKISS/wwhooo-homepage"},{name:"TOY",stack:"PYTHON / AI + INTERNET",period:"2025—",desc:c("阶段性生长的实验场：把好奇心拆成小工具，把小工具变成可运行的东西。","A growing lab for turning curiosity into small, runnable tools."),url:"https://github.com/ONLYLOVELYKISS/TOY"}],B=[{name:"chaoxing-sign-cli",stack:"TYPESCRIPT / AUTOMATION",period:"ARCHIVE",desc:c("围绕具体使用场景构建的自动化工具，探索监测、签到和消息推送。","An automation tool exploring monitoring, sign-ins, and notifications."),url:"https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli"}],Y=[{id:"toy",name:"TOY LAB",tone:"lab",title:c("TOY 实验场","TOY Lab"),desc:c("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run.")},{id:"notes",name:"NIGHT NOTES",tone:"notes",title:c("夜间札记","Night Notes"),desc:c("把观察、片段和还没有结论的想法放在这里。","Observations, fragments, and thoughts without conclusions yet.")}],g={title:c("Sakura / 夜间花卉","Sakura / Night Bloom"),note:c("在暗处保留一点温度。","Keeping a little warmth in the dark."),alt:c("夜色中盛开的樱花特写","A close-up of sakura blossoms against a dark night"),widths:[800,1600,2400],fallback:"/images/sakura-1600.jpg",width:2400,height:1004},fe=(e=g.widths)=>e.map(t=>`/images/sakura-${t}.webp ${t}w`).join(", "),be=[{name:"GitHub",url:H.github,rel:"me"},{name:"Email",url:`mailto:${H.email}`}],d=(e,t)=>({zh:e,en:t}),L="https://wwhooo.com",F=["zh","en"],y={zh:"zh-CN",en:"en"},ye={zh:"zh_CN",en:"en_US"},S=e=>e==="zh"?"en":"zh",b=e=>e==="/"?"/en/":`/en${e}`,x=[{id:"home",path:{zh:"/",en:b("/")},title:d("Linn — 值得留下的东西","Linn — Things worth keeping"),description:d("Linn 的个人主页：摄影、软件项目、个人档案与常用工具。","Linn’s personal homepage: photography, software projects, profile, and everyday tools.")},{id:"engine",path:{zh:"/engine/",en:b("/engine/")},title:d("工具 — Linn","Tools — Linn"),description:d("常用工具入口：搜索、构建、AI 与调试。","Everyday tools: search, build, AI, and debugging.")},{id:"profile",path:{zh:"/profile/",en:b("/profile/")},title:d("档案 — Linn","Profile — Linn"),description:d("关于 Linn：个人网站、自动化工具与跨技术栈实验。","About Linn: personal websites, automation, and experiments across stacks.")},{id:"works",path:{zh:"/works/",en:b("/works/")},title:d("作品与记录 — Linn","Works & notes — Linn"),description:d("软件项目与摄影作品。","Software projects and photographs.")},{id:"search",path:{zh:"/search/",en:b("/search/")},title:d("搜索 — Linn","Search — Linn"),description:d("在常用搜索引擎之间切换，快速开始搜索。","Switch search engines and start searching quickly.")},{id:"toy",path:{zh:"/toy/",en:b("/toy/")},title:d("TOY 实验场 — Linn","TOY Lab — Linn"),description:d("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run."),noindex:!0},{id:"notes",path:{zh:"/notes/",en:b("/notes/")},title:d("夜间札记 — Linn","Night Notes — Linn"),description:d("观察、片段和还没有结论的想法。","Observations, fragments, and thoughts without conclusions yet."),noindex:!0}],$e={title:d("页面不存在 — Linn","Page not found — Linn"),description:d("这个地址没有对应的内容。","This address has no matching content."),noindex:!0},C=new Map(x.map(e=>[e.id,e])),Q=new Map;for(const e of x)for(const t of F)Q.set(e.path[t],{id:e.id,lang:t});x.flatMap(e=>F.map(t=>e.path[t]));x.filter(e=>!e.noindex).flatMap(e=>F.map(t=>e.path[t]));const ve=e=>C.get(e)??null,p=(e,t)=>C.get(e)?.path[t==="en"?"en":"zh"]??null,Z=e=>Q.get(e)??null,ke=e=>e==="/en/"||e.startsWith("/en/")?"en":"zh";function ee(e){const t=e.replace(/\/index\.html$/,"/").replace(/\/+$/,"");return t===""?"/":`${t}/`}function we(e){const t=C.get(e);return t?[{hreflang:y.zh,href:`${L}${t.path.zh}`},{hreflang:y.en,href:`${L}${t.path.en}`},{hreflang:"x-default",href:`${L}${t.path.zh}`}]:[]}let E="zh",te=null;const h=()=>E,ne=()=>te;function Le(e,t){return E=e==="en"?"en":"zh",te=t??null,typeof document<"u"&&(document.documentElement.lang=y[E]),E}const Se={zh:{skip:"跳到主要内容",navLabel:"主导航",nav:["首页","工具","档案","作品","搜索"],theme:"主题",themeSystem:"跟随系统",themeLight:"浅色",themeDark:"深色",themeLabel:"选择主题模式",eyebrow:"Linn / Personal engine",title:"把值得留下的，<br>放在这里。",intro:"一个持续更新的个人入口：记录项目、工具、观察和正在形成的东西。",explore:"探索我的空间",status:"现在进行中",statusText:"维护个人网站，整理 TOY 实验场",index:"目录",indexText:"从正在使用的东西开始，逐步了解这个空间。",tools:"工具箱",profile:"关于我",works:"作品与记录",search:"搜索",searchHeading:"找到需要的<br><i>东西。</i>",searchIntro:"在常用搜索入口之间切换，输入问题后直接前往结果页。",searchPlaceholder:"输入要搜索的内容",searchSubmit:"开始搜索",searchProvider:"搜索引擎",searchShortcut:"按 / 聚焦搜索，Esc 清空",searchPrivacy:"搜索内容会直接发送给所选搜索服务；本站不会保存查询。",searchOperators:"让搜索更精确",searchOperatorIntro:"在关键词前后加入语法，缩小结果范围。",searchSiteLabel:"限定网站",searchPhraseLabel:"精确短语",searchExcludeLabel:"排除词",searchFileLabel:"限定文件类型",selected:"精选项目",archive:"归档",archiveNote:"较早的实验与工具，保留记录。",photo:"一张照片",contact:"联系我",language:"EN",languageLabel:"切换到英文",otherLanguageName:"English",top:"回到顶部",lock:"重新进入",unlock:"向上滑动进入",unlockHint:"在屏幕任意位置向上滑动，进入个人引擎",gateKeyboardHint:"键盘用户可按 Enter 或空格进入。",unlocked:"准备进入",gateTitle:"向上滑动<br><i>进入引擎。</i>",gateFoot:"没有登录，只有一次主动进入。",library:"个人库",libraryText:"项目、子站、工具和视觉记录，放在同一条可探索的轨道上。",dragExplore:"左右滑动浏览",open:"进入",back:"返回主站",subsiteWip:"这是一个可访问的子站初稿。",notFoundTitle:"页面不存在",notFoundHeading:"这个地址<br><i>没有内容。</i>",notFoundBody:"也许链接已经改变，或者它从来没有存在过。",notFoundCta:"回到首页",engineHeading:"我会反复打开的<br><i>一些入口。</i>",engineIntro:"保持简单，保持可用。把常用的东西放在顺手的位置。",profileHeading:"持续进行中。",worksHeading:"做过，<br><i>看过。</i>",worksIntro:"软件项目和摄影作品。一个人如何工作，也如何看待周围的世界。"},en:{skip:"Skip to main content",navLabel:"Main navigation",nav:["Home","Tools","Profile","Works","Search"],theme:"Theme",themeSystem:"System",themeLight:"Light",themeDark:"Dark",themeLabel:"Choose theme mode",eyebrow:"Linn / Personal engine",title:"Things worth<br>keeping, here.",intro:"A living personal entry point for projects, tools, observations, and things taking shape.",explore:"Explore the space",status:"Currently",statusText:"Maintaining this site and the TOY lab",index:"Index",indexText:"Start with the things in use and take a closer look around.",tools:"Toolbox",profile:"About me",works:"Works & notes",search:"Search",searchHeading:"Find what you<br><i>need.</i>",searchIntro:"Switch between familiar search engines and go straight to the results.",searchPlaceholder:"What are you looking for?",searchSubmit:"Search",searchProvider:"Search engine",searchShortcut:"Press / to focus search, Esc to clear",searchPrivacy:"Queries are sent directly to the selected search provider; this site does not store them.",searchOperators:"Search with precision",searchOperatorIntro:"Add an operator to narrow your results.",searchSiteLabel:"Limit to a site",searchPhraseLabel:"Exact phrase",searchExcludeLabel:"Exclude a term",searchFileLabel:"Limit by file type",selected:"Selected projects",archive:"Archive",archiveNote:"Earlier experiments and tools, kept for the record.",photo:"A photograph",contact:"Find me",language:"中",languageLabel:"Switch to Chinese",otherLanguageName:"中文",top:"Back to top",lock:"Enter again",unlock:"Swipe up to enter",unlockHint:"Swipe up anywhere to enter the personal engine",gateKeyboardHint:"Keyboard users can press Enter or Space to enter.",unlocked:"Ready to enter",gateTitle:"Swipe up into<br><i>personal engine.</i>",gateFoot:"No login, just a deliberate entrance.",library:"Personal library",libraryText:"Projects, subsites, tools, and visual notes arranged on one open rail.",dragExplore:"Swipe left/right to explore",open:"Open",back:"Back home",subsiteWip:"This is an accessible first draft of the subsite.",notFoundTitle:"Page not found",notFoundHeading:"This address<br><i>has nothing.</i>",notFoundBody:"The link may have changed, or it never existed at all.",notFoundCta:"Back home",engineHeading:"A few places I<br><i>return to.</i>",engineIntro:"Simple, useful, and close at hand.",profileHeading:"in progress.",worksHeading:"Made,<br><i>observed.</i>",worksIntro:"Software projects and photographs. How I work, and how I look at the world."}},n=()=>Se[h()],u=e=>e?e[h()]:"",Ee=[["home",0],["engine",1],["profile",2],["works",3],["search",4]];function M({sizes:e,priority:t=!1}){const a=t?'fetchpriority="high"':'loading="lazy"';return`<picture>
        <source type="image/webp" srcset="${fe()}" sizes="${e}">
        <img src="${g.fallback}" width="${g.width}" height="${g.height}" alt="${u(g.alt)}" ${a} decoding="async">
      </picture>`}function Te(e=""){const t=h(),a=Ee.map(([o,s])=>{const r=e===o?' aria-current="page"':"";return`<a href="${p(o,t)}"${r}>${n().nav[s]}</a>`}).join("");return`<header class="site-header">
      <a class="brand" href="${p("home",t)}"><span>WW</span><b>LINN</b></a>
      <nav aria-label="${n().navLabel}">${a}</nav>
      ${Ie()}
      ${xe()}
    </header>`}function xe(){return`<label class="theme-control" for="theme-select">
      <span class="sr-only">${n().themeLabel}</span>
      <span aria-hidden="true">◐</span>
      <select id="theme-select" name="theme" data-theme-control aria-label="${n().themeLabel}">
        <option value="system">${n().themeSystem}</option>
        <option value="light">${n().themeLight}</option>
        <option value="dark">${n().themeDark}</option>
      </select>
    </label>`}function Ie(){const e=S(h());return`<a class="language" href="${p(ne()??"home",e)}" hreflang="${y[e]}" lang="${y[e]}">${n().language}<span class="sr-only"> — ${n().languageLabel}</span></a>`}function Ae(){return`<footer>
      <span>© ${new Date().getFullYear()} ${H.author.toUpperCase()}</span>
      <span>WW / PERSONAL ENGINE</span>
      <a href="#top">${n().top} ↑</a>
    </footer>`}function $(e,t=""){return`<a class="skip-link" href="#top">${n().skip}</a>${Te(t)}<main id="top" tabindex="-1">${e}</main>${Ae()}`}function Ne(){return`<section class="entry-gate${T()?" gate-complete":""}" id="entry-gate" role="region" tabindex="0" aria-label="${n().unlock}" aria-describedby="gate-instruction">
      <span class="sr-only" id="gate-instruction">${n().unlockHint} ${n().gateKeyboardHint}</span>
      <div class="gate-image">
        ${M({sizes:"(max-width: 768px) 100vw, 60vw",priority:!0})}
        <div class="gate-vignette"></div>
      </div>
      <div class="gate-copy">
        <span class="kicker">WW / SAKURA ENTRY</span>
        <p class="gate-status">${n().unlocked}</p>
        <h1>${n().gateTitle}</h1>
        <p class="gate-hint"><span class="hint-chevron" aria-hidden="true">↑</span>${n().unlockHint}</p>
        <p class="gate-foot">${n().gateFoot}</p>
        <p class="gate-alt"><a href="${p(ne()??"home",S(h()))}" hreflang="${y[S(h())]}" lang="${y[S(h())]}">${n().otherLanguageName}</a></p>
      </div>
      <span class="gate-progress" aria-hidden="true"></span>
      <b class="gate-mark" aria-hidden="true">桜</b>
    </section>`}function Oe(){return`<section class="landing">
        <div class="landing-image">
          ${M({sizes:"(max-width: 768px) 100vw, 55vw"})}
          <div class="image-caption">${u(g.title)}<span>${u(g.note)}</span></div>
        </div>
        <div class="landing-copy">
          <p class="kicker">${n().eyebrow}</p>
          <h2>${n().title}</h2>
          <p class="lead">${n().intro}</p>
          <a class="primary-link" href="#library">${n().explore}<span aria-hidden="true">↓</span></a>
          <div class="now"><span>${n().status}</span><strong>${n().statusText}</strong></div>
        </div>
      </section>`}function Pe(e){return`<a class="library-card ${e.tone}" href="${p(e.id,h())}">
          <small>${e.name}</small>
          <strong>${u(e.title)}</strong>
          <span>${n().open} ↗</span>
        </a>`}function qe(){const e=`<a class="library-card sakura-card" href="${p("works",h())}">
          <small>SAKURA / IMAGE</small>
          <strong>${u(g.title)}</strong>
          <span>${n().open} ↗</span>
        </a>
        <a class="library-card engine-card" href="${p("engine",h())}">
          <small>ENGINE / LINKS</small>
          <strong>${u({zh:"常用入口",en:"Everyday links"})}</strong>
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
          ${Y.map(Pe).join("")}${e}
        </div>
      </section>`}function He(){const e=[["engine","01",n().tools,"ENGINE"],["profile","02",n().profile,"PROFILE"],["works","03",n().works,"WORKS"]].map(([t,a,o,s])=>`<a href="${p(t,h())}">
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
        <p>“${u(R.statement)}”</p>
        <a href="${p("profile",h())}">${n().profile} ↗</a>
      </section>`}function Ye(){const t=T()?"is-unlocked":"is-locked";return $(`<div class="engine-home ${t}" id="engine-home">
      ${Ne()}
      <div class="home-content" id="home-content">
        ${Oe()}
        ${qe()}
        ${He()}
        ${Re()}
      </div>
      <button class="lock-button" id="lock-entry" type="button">${n().lock} ×</button>
    </div>`,"home")}function ze(){const e=ge.map(t=>`<section>
          <h2>${t.title}</h2>
          ${t.items.map(a=>`<a class="tool-row" href="${a.url}" target="_blank" rel="noopener noreferrer">
              <strong>${a.name}</strong>
              <span>${u(a.note)}</span>
              <b aria-hidden="true">↗</b>
            </a>`).join("")}
        </section>`).join("");return $(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">02 / ENGINE</span>
        <h1>${n().engineHeading}</h1>
        <p>${n().engineIntro}</p>
      </div>
      <div class="tool-groups">${e}</div>
    </section>`,"engine")}function Fe(){const e=[["site:developer.mozilla.org ",n().searchSiteLabel,"site:developer.mozilla.org"],['"flexible box layout" ',n().searchPhraseLabel,'"flexible box layout"'],["-template ",n().searchExcludeLabel,"-template"],["filetype:pdf ",n().searchFileLabel,"filetype:pdf"]];return $(`<section class="inner-page search-page">
      <div class="page-intro">
        <span class="kicker">05 / SEARCH</span>
        <h1>${n().searchHeading}</h1>
        <p>${n().searchIntro}</p>
      </div>
      <form class="search-panel" role="search" aria-label="${n().search}" data-search-form action="https://www.google.com/search" method="get" target="_blank" rel="noopener">
        <label class="search-query-label" for="search-query">${n().searchPlaceholder}</label>
        <div class="search-row">
          <span class="search-symbol" aria-hidden="true">⌕</span>
          <input id="search-query" name="q" type="search" placeholder="${n().searchPlaceholder}" autocomplete="off" required aria-keyshortcuts="/ Escape" />
          <button type="submit">${n().searchSubmit}<span aria-hidden="true">↗</span></button>
        </div>
        <div class="search-controls">
          <div class="search-provider-control">
            <label class="search-provider-label" for="search-provider">${n().searchProvider}</label>
            <select id="search-provider" class="search-provider-select" data-search-provider>
              <option value="https://www.google.com/search">Google</option>
              <option value="https://www.bing.com/search">Bing</option>
              <option value="https://duckduckgo.com/">DuckDuckGo</option>
              <option value="https://github.com/search">GitHub</option>
            </select>
          </div>
          <span class="search-shortcut"><kbd>/</kbd> ${n().searchShortcut}</span>
        </div>
        <p class="search-privacy">${n().searchPrivacy}</p>
      </form>
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
    </section>`,"search")}function Ce(){const e=be.map(t=>`<a href="${t.url}"${t.rel?` rel="${t.rel}"`:""}>${t.name} ↗</a>`).join("");return $(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">03 / PROFILE</span>
        <h1>Linn,<br><i>${n().profileHeading}</i></h1>
      </div>
      <div class="profile-layout">
        <blockquote>${u(R.bio)}</blockquote>
        <div class="profile-copy">
          <p>${u(R.focus)}</p>
          <div class="contact"><span>${n().contact}</span>${e}</div>
        </div>
      </div>
    </section>`,"profile")}function Me(){if(B.length===0)return"";const e=B.map(t=>`<li>
            <a href="${t.url}" target="_blank" rel="noopener noreferrer">
              <div>
                <span class="archive-name">${t.name}</span>
                <small>${t.stack} / ${t.period}</small>
                <p>${u(t.desc)}</p>
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
      </section>`}function De(){const e=me.map((t,a)=>`<a class="project-row" href="${t.url}" target="_blank" rel="noopener noreferrer">
            <span>0${a+1}</span>
            <div>
              <small>${t.stack} / ${t.period}</small>
              <h2>${t.name}</h2>
              <p>${u(t.desc)}</p>
            </div>
            <b aria-hidden="true">↗</b>
          </a>`).join("");return $(`<section class="inner-page">
      <div class="page-intro">
        <span class="kicker">04 / WORKS</span>
        <h1>${n().worksHeading}</h1>
        <p>${n().worksIntro}</p>
      </div>
      <section class="works-list">
        <div class="section-label"><span>01</span><h2>${n().selected}</h2></div>
        <div>${e}</div>
      </section>
      ${Me()}
      <section class="photo-section">
        <div class="section-label"><span>03</span><h2>${n().photo}</h2></div>
        <figure>
          ${M({sizes:"(max-width: 768px) 100vw, 70vw"})}
          <figcaption><strong>${u(g.title)}</strong><span>${u(g.note)}</span></figcaption>
        </figure>
      </section>
    </section>`,"works")}function _(e){return $(`<section class="subsite-page ${e.tone}">
      <a class="back-link" href="${p("home",h())}">← ${n().back}</a>
      <span class="kicker">SUBSITE / ${e.name}</span>
      <h1>${u(e.title)}</h1>
      <p>${u(e.desc)}</p>
      <div class="subsite-placeholder">
        <span>WIP / ${new Date().getFullYear()}</span>
        <strong>${n().subsiteWip}</strong>
        <a href="${p("engine",h())}">${n().tools} ↗</a>
      </div>
    </section>`,"")}function Ke(){return $(`<section class="inner-page not-found">
      <div class="page-intro">
        <span class="kicker">404 / NOT FOUND</span>
        <h1>${n().notFoundHeading}</h1>
        <p>${n().notFoundBody}</p>
      </div>
      <p class="not-found-cta"><a class="primary-link" href="${p("home",h())}">${n().notFoundCta}<span aria-hidden="true">↗</span></a></p>
    </section>`,"")}const Ge={home:Ye,engine:ze,profile:Ce,works:De,search:Fe,toy:()=>_(Y[0]),notes:()=>_(Y[1])},ae=()=>ee(location.pathname);function v(e,t,a){let o=document.head.querySelector(`meta[${e}="${t}"]`);o||(o=document.createElement("meta"),o.setAttribute(e,t),document.head.append(o)),o.setAttribute("content",a)}function We(e,t){document.head.querySelector(`meta[${e}="${t}"]`)?.remove()}function Be(e,t){let a=document.head.querySelector(`link[rel="${e}"]:not([hreflang])`);a||(a=document.createElement("link"),a.setAttribute("rel",e),document.head.append(a)),a.setAttribute("href",t)}function _e(e){document.head.querySelector(`link[rel="${e}"]:not([hreflang])`)?.remove()}function je(e,t){let a=document.head.querySelector(`link[rel="alternate"][hreflang="${e}"]`);a||(a=document.createElement("link"),a.setAttribute("rel","alternate"),a.setAttribute("hreflang",e),document.head.append(a)),a.setAttribute("href",t)}function Ue(){document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(e=>e.remove())}function Ve(e,t){const a=e??$e;if(document.title=a.title[t],v("name","description",a.description[t]),v("property","og:title",a.title[t]),v("property","og:description",a.description[t]),v("property","og:locale",ye[t]),v("name","robots",a.noindex?"noindex, follow":"index, follow"),!e){We("property","og:url"),_e("canonical"),Ue();return}const o=`${L}${e.path[t]}`;v("property","og:url",o),Be("canonical",o);for(const s of we(e.id))je(s.hreflang,s.href)}const Xe=()=>document.querySelector("#app");let oe=()=>{};const Je=e=>{oe=e};let j=!1;function D(e=ae()){const t=Z(e),a=t?t.lang:ke(e),o=t?t.id:null,s=o?ve(o):null,r=Xe();Le(a,o);const l=`${o??"notfound"}:${a}`;return!j&&r.dataset.prerendered===l||(r.innerHTML=(o?Ge[o]:Ke)()),j=!0,Ve(s,a),document.body.classList.toggle("is-locked",o==="home"&&!T()),oe(),o}function Qe(e,{hash:t="",replace:a=!1}={}){const o=`${e}${t}`;if(a?history.replaceState({path:e},"",o):history.pushState({path:e},"",o),D(e),t){document.querySelector(t)?.scrollIntoView();return}window.scrollTo(0,0),document.querySelector("#top")?.focus({preventScroll:!0})}function Ze(){document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.target.closest?.("a");if(!t||t.target==="_blank"||t.hasAttribute("download"))return;const a=new URL(t.getAttribute("href")??"",location.href);if(a.origin!==location.origin)return;const o=ee(a.pathname);if(Z(o)&&!(a.pathname===location.pathname&&a.hash)){if(e.preventDefault(),a.pathname===location.pathname){window.scrollTo(0,0);return}Qe(o,{hash:a.hash})}}),window.addEventListener("popstate",()=>{D(ae())})}const U="wwhooo-theme",et=new Set(["system","light","dark"]);let V=!1;function X(e){const t=et.has(e)?e:"system";return document.documentElement.dataset.theme=t,document.querySelectorAll("[data-theme-control]").forEach(a=>{try{a.value=t}catch{}}),t}function tt(){const e=localStorage.getItem(U)??"system";X(e),!V&&(V=!0,document.addEventListener("change",t=>{const a=t.target.closest?.("[data-theme-control]");if(!a)return;const o=X(a.value);localStorage.setItem(U,o)}))}let J=!1;function nt(){const e=document.querySelector("[data-search-form]"),t=e?.querySelector('input[name="q"]'),a=e?.querySelector("[data-search-provider]");!e||!t||!a||e.dataset.ready||(e.dataset.ready="true",a.addEventListener("change",()=>{e.action=a.value}),document.addEventListener("click",o=>{const s=o.target.closest?.("[data-query-template]");if(!s)return;const r=document.querySelector('[data-search-form] input[name="q"]');if(!r)return;const l=s.getAttribute("data-query-template")??"";r.value=`${l} `,r.focus(),r.setSelectionRange(r.value.length,r.value.length)}),J||(document.addEventListener("keydown",o=>{if(o.altKey||o.ctrlKey||o.metaKey)return;const s=o.target,r=s instanceof HTMLElement&&(s.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(s.tagName));if(o.key==="/"&&!r){const l=document.querySelector('[data-search-form] input[name="q"]');if(!l)return;o.preventDefault(),l.focus()}else o.key==="Escape"&&s.matches?.('[data-search-form] input[name="q"]')&&(s.value="")}),J=!0),e.addEventListener("submit",o=>{t.value.trim()||(o.preventDefault(),t.focus())}))}function at(){const e=document.querySelector(".library-rail");!e||e.dataset.ready||(e.dataset.ready="true",e.addEventListener("wheel",t=>{if(Math.abs(t.deltaY)<=Math.abs(t.deltaX))return;const a=e.scrollWidth-e.clientWidth;if(a<=0)return;const o=e.scrollLeft<=0&&t.deltaY<0,s=e.scrollLeft>=a-1&&t.deltaY>0;o||s||(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1}))}function ot(){tt(),pe(),at(),nt()}Je(ot);Ze();D();
