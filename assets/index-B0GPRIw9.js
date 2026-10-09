(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const z="wwhooo-entered",T=()=>{try{return sessionStorage.getItem(z)==="1"}catch{return!1}},le=()=>{try{sessionStorage.setItem(z,"1")}catch{}},de=()=>{try{sessionStorage.removeItem(z)}catch{}},H=.8,he=130,pe=280;function ue(){const e=document.querySelector("#entry-gate"),t=document.querySelector("#engine-home"),a=document.querySelector("#home-content"),s=document.querySelector("#lock-entry");if(!e||!t)return;const r=[document.querySelector(".skip-link"),document.querySelector(".site-header"),document.querySelector("footer")];let o=T(),c=0,u=null,I=0,k=0,K=0,A=0;const w=()=>{e.style.setProperty("--swipe-ratio",String(c))},N=()=>{const i=(f,ce)=>{f&&(ce?f.setAttribute("inert",""):f.removeAttribute("inert"))};i(e,o),e.classList.toggle("gate-complete",o),t.classList.toggle("is-unlocked",o),t.classList.toggle("is-locked",!o),i(a,!o),a&&a.setAttribute("aria-hidden",String(!o));for(const f of r)i(f,!o);document.body.classList.toggle("is-locked",!o),document.documentElement.classList.toggle("entered",o)},O=()=>{o||(o=!0,c=1,w(),le(),N(),requestAnimationFrame(()=>{document.querySelector("#top")?.focus({preventScroll:!0})}))},P=()=>{c=0,k=0,w()},G=i=>{c=Math.max(0,Math.min(1,i)),w(),c>=H&&O()},oe=()=>{o=!1,de(),P(),N(),requestAnimationFrame(()=>e.focus({preventScroll:!0}))},se=i=>{o||u!==null||i.target.closest?.("a")||(u=i.pointerId,I=i.clientY,A=0,i.currentTarget.setPointerCapture?.(u))},ie=i=>{u===null||i.pointerId!==u||(Math.abs(i.clientY-I)>6&&(A=Date.now()+400),G((I-i.clientY)/he))},W=i=>{u===null||i.pointerId!==u||(u=null,i.currentTarget.releasePointerCapture?.(i.pointerId),c<H&&P())};e.addEventListener("pointerdown",se),e.addEventListener("pointermove",ie),e.addEventListener("pointerup",W),e.addEventListener("pointercancel",W),e.addEventListener("click",i=>{o||Date.now()<A||i.target.closest?.("a")||O()}),e.addEventListener("keydown",i=>{o||i.target!==e||(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),O())}),e.addEventListener("wheel",i=>{if(o)return;const f=Math.abs(i.deltaY)>=Math.abs(i.deltaX)?i.deltaY:0;f&&(k=Math.max(0,k+f),G(k/pe),clearTimeout(K),K=setTimeout(()=>{c<H&&P()},360))},{passive:!0}),s?.addEventListener("click",oe),N(),w()}const l=(e,t)=>({zh:e,en:t}),q={author:"Linn",email:"wwhooo@icloud.com",github:"https://github.com/ONLYLOVELYKISS"},R={statement:l("技术是我靠近问题的方式，不是我介绍自己的全部。","Technology is how I get closer to problems, not the whole story of who I am."),bio:l("我在网站、自动化工具与跨技术栈实验之间移动。这里是一个持续生长的个人入口。","I move between websites, automation, and experiments across stacks. This is a personal entry point that keeps growing."),focus:l("来自中国西安，关注个人网站、自动化、实用工具，以及从小念头开始、最后变成可使用的东西。","Based in Xi’an, China. I care about personal websites, automation, useful tools, and small ideas that become usable things.")},ge=[{title:"Search",items:[{name:"Google",note:l("通用搜索","General search"),url:"https://www.google.com/"},{name:"Bing",note:l("搜索与图像","Search and images"),url:"https://www.bing.com/"},{name:"GitHub",note:l("代码与开源","Code and open source"),url:"https://github.com/"}]},{title:"Build",items:[{name:"MDN",note:l("Web 文档","Web documentation"),url:"https://developer.mozilla.org/"},{name:"Can I Use",note:l("兼容性查询","Browser compatibility"),url:"https://caniuse.com/"},{name:"Vite",note:l("前端构建","Frontend build tool"),url:"https://vite.dev/"}]},{title:"AI / Tools",items:[{name:"ChatGPT",note:l("AI 工具","AI tools"),url:"https://chatgpt.com/"},{name:"Regex101",note:l("正则调试","Regular expression tester"),url:"https://regex101.com/"},{name:"JSON Crack",note:l("数据可视化","Data visualization"),url:"https://jsoncrack.com/"}]}],me=[{name:"wwhooo.com",stack:"PERSONAL HOMEPAGE",period:"2026",desc:l("以摄影、项目和个人档案为入口，重新组织一个人的公开空间。","A personal space organized around photography, projects, and profile."),url:"https://github.com/ONLYLOVELYKISS/wwhooo-homepage"},{name:"TOY",stack:"PYTHON / AI + INTERNET",period:"2025—",desc:l("阶段性生长的实验场：把好奇心拆成小工具，把小工具变成可运行的东西。","A growing lab for turning curiosity into small, runnable tools."),url:"https://github.com/ONLYLOVELYKISS/TOY"}],B=[{name:"chaoxing-sign-cli",stack:"TYPESCRIPT / AUTOMATION",period:"ARCHIVE",desc:l("围绕具体使用场景构建的自动化工具，探索监测、签到和消息推送。","An automation tool exploring monitoring, sign-ins, and notifications."),url:"https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli"}],Y=[{id:"toy",name:"TOY LAB",tone:"lab",title:l("TOY 实验场","TOY Lab"),desc:l("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run.")},{id:"notes",name:"NIGHT NOTES",tone:"notes",title:l("夜间札记","Night Notes"),desc:l("把观察、片段和还没有结论的想法放在这里。","Observations, fragments, and thoughts without conclusions yet.")}],m={title:l("Sakura / 夜间花卉","Sakura / Night Bloom"),note:l("在暗处保留一点温度。","Keeping a little warmth in the dark."),alt:l("夜色中盛开的樱花特写","A close-up of sakura blossoms against a dark night"),widths:[800,1600,2400],fallback:"/images/sakura-1600.jpg",width:2400,height:1004},fe=(e=m.widths)=>e.map(t=>`/images/sakura-${t}.webp ${t}w`).join(", "),be=[{name:"GitHub",url:q.github,rel:"me"},{name:"Email",url:`mailto:${q.email}`}],d=(e,t)=>({zh:e,en:t}),L="https://wwhooo.com",F=["zh","en"],y={zh:"zh-CN",en:"en"},ye={zh:"zh_CN",en:"en_US"},S=e=>e==="zh"?"en":"zh",b=e=>e==="/"?"/en/":`/en${e}`,x=[{id:"home",path:{zh:"/",en:b("/")},title:d("Linn — 值得留下的东西","Linn — Things worth keeping"),description:d("Linn 的个人主页：摄影、软件项目、个人档案与常用工具。","Linn’s personal homepage: photography, software projects, profile, and everyday tools.")},{id:"engine",path:{zh:"/engine/",en:b("/engine/")},title:d("工具 — Linn","Tools — Linn"),description:d("常用工具入口：搜索、构建、AI 与调试。","Everyday tools: search, build, AI, and debugging.")},{id:"profile",path:{zh:"/profile/",en:b("/profile/")},title:d("档案 — Linn","Profile — Linn"),description:d("关于 Linn：个人网站、自动化工具与跨技术栈实验。","About Linn: personal websites, automation, and experiments across stacks.")},{id:"works",path:{zh:"/works/",en:b("/works/")},title:d("作品与记录 — Linn","Works & notes — Linn"),description:d("软件项目与摄影作品。","Software projects and photographs.")},{id:"search",path:{zh:"/search/",en:b("/search/")},title:d("搜索 — Linn","Search — Linn"),description:d("在常用搜索引擎之间切换，快速开始搜索。","Switch search engines and start searching quickly.")},{id:"toy",path:{zh:"/toy/",en:b("/toy/")},title:d("TOY 实验场 — Linn","TOY Lab — Linn"),description:d("阶段性实验、脚本和可以运行的小想法。","Experiments, scripts, and small ideas that actually run."),noindex:!0},{id:"notes",path:{zh:"/notes/",en:b("/notes/")},title:d("夜间札记 — Linn","Night Notes — Linn"),description:d("观察、片段和还没有结论的想法。","Observations, fragments, and thoughts without conclusions yet."),noindex:!0}],$e={title:d("页面不存在 — Linn","Page not found — Linn"),description:d("这个地址没有对应的内容。","This address has no matching content."),noindex:!0},C=new Map(x.map(e=>[e.id,e])),Q=new Map;for(const e of x)for(const t of F)Q.set(e.path[t],{id:e.id,lang:t});x.flatMap(e=>F.map(t=>e.path[t]));x.filter(e=>!e.noindex).flatMap(e=>F.map(t=>e.path[t]));const ve=e=>C.get(e)??null,g=(e,t)=>C.get(e)?.path[t==="en"?"en":"zh"]??null,Z=e=>Q.get(e)??null,ke=e=>e==="/en/"||e.startsWith("/en/")?"en":"zh";function ee(e){const t=e.replace(/\/index\.html$/,"/").replace(/\/+$/,"");return t===""?"/":`${t}/`}function we(e){const t=C.get(e);return t?[{hreflang:y.zh,href:`${L}${t.path.zh}`},{hreflang:y.en,href:`${L}${t.path.en}`},{hreflang:"x-default",href:`${L}${t.path.zh}`}]:[]}let E="zh",te=null;const p=()=>E,ne=()=>te;function Le(e,t){return E=e==="en"?"en":"zh",te=t??null,typeof document<"u"&&(document.documentElement.lang=y[E]),E}const Se={zh:{skip:"跳到主要内容",navLabel:"主导航",nav:["首页","工具","档案","作品","搜索"],theme:"主题",themeSystem:"跟随系统",themeLight:"浅色",themeDark:"深色",themeLabel:"选择主题模式",eyebrow:"Linn / Personal engine",title:"把值得留下的，<br>放在这里。",intro:"一个持续更新的个人入口：记录项目、工具、观察和正在形成的东西。",explore:"探索我的空间",status:"现在进行中",statusText:"维护个人网站，整理 TOY 实验场",index:"目录",indexText:"从正在使用的东西开始，逐步了解这个空间。",tools:"工具箱",profile:"关于我",works:"作品与记录",search:"搜索",searchHeading:"找到需要的<br><i>东西。</i>",searchIntro:"在常用搜索入口之间切换，输入问题后直接前往结果页。",searchPlaceholder:"输入要搜索的内容",searchSubmit:"开始搜索",searchProvider:"使用入口",searchProviderHint:"选择结果打开的位置",searchShortcut:"按 / 聚焦搜索，Esc 清空",searchPrivacy:"搜索内容会直接发送给所选搜索服务；本站不会保存查询。",searchOperators:"让搜索更精确",searchOperatorIntro:"在关键词前后加入语法，缩小结果范围。",searchSiteLabel:"限定网站",searchPhraseLabel:"精确短语",searchExcludeLabel:"排除词",searchFileLabel:"限定文件类型",selected:"精选项目",archive:"归档",archiveNote:"较早的实验与工具，保留记录。",photo:"一张照片",contact:"联系我",language:"EN",languageLabel:"切换到英文",otherLanguageName:"English",top:"回到顶部",lock:"重新进入",unlock:"向上滑动进入",unlockHint:"在屏幕任意位置向上滑动，进入个人引擎",gateKeyboardHint:"键盘用户可按 Enter 或空格进入。",unlocked:"准备进入",gateTitle:"向上滑动<br><i>进入引擎。</i>",gateFoot:"没有登录，只有一次主动进入。",library:"个人库",libraryText:"项目、子站、工具和视觉记录，放在同一条可探索的轨道上。",dragExplore:"左右滑动浏览",open:"进入",back:"返回主站",subsiteWip:"这是一个可访问的子站初稿。",notFoundTitle:"页面不存在",notFoundHeading:"这个地址<br><i>没有内容。</i>",notFoundBody:"也许链接已经改变，或者它从来没有存在过。",notFoundCta:"回到首页",engineHeading:"我会反复打开的<br><i>一些入口。</i>",engineIntro:"保持简单，保持可用。把常用的东西放在顺手的位置。",profileHeading:"持续进行中。",worksHeading:"做过，<br><i>看过。</i>",worksIntro:"软件项目和摄影作品。一个人如何工作，也如何看待周围的世界。"},en:{skip:"Skip to main content",navLabel:"Main navigation",nav:["Home","Tools","Profile","Works","Search"],theme:"Theme",themeSystem:"System",themeLight:"Light",themeDark:"Dark",themeLabel:"Choose theme mode",eyebrow:"Linn / Personal engine",title:"Things worth<br>keeping, here.",intro:"A living personal entry point for projects, tools, observations, and things taking shape.",explore:"Explore the space",status:"Currently",statusText:"Maintaining this site and the TOY lab",index:"Index",indexText:"Start with the things in use and take a closer look around.",tools:"Toolbox",profile:"About me",works:"Works & notes",search:"Search",searchHeading:"Find what you<br><i>need.</i>",searchIntro:"Switch between familiar search engines and go straight to the results.",searchPlaceholder:"What are you looking for?",searchSubmit:"Search",searchProvider:"Search with",searchProviderHint:"Choose where results open",searchShortcut:"Press / to focus search, Esc to clear",searchPrivacy:"Queries are sent directly to the selected search provider; this site does not store them.",searchOperators:"Search with precision",searchOperatorIntro:"Add an operator to narrow your results.",searchSiteLabel:"Limit to a site",searchPhraseLabel:"Exact phrase",searchExcludeLabel:"Exclude a term",searchFileLabel:"Limit by file type",selected:"Selected projects",archive:"Archive",archiveNote:"Earlier experiments and tools, kept for the record.",photo:"A photograph",contact:"Find me",language:"中",languageLabel:"Switch to Chinese",otherLanguageName:"中文",top:"Back to top",lock:"Enter again",unlock:"Swipe up to enter",unlockHint:"Swipe up anywhere to enter the personal engine",gateKeyboardHint:"Keyboard users can press Enter or Space to enter.",unlocked:"Ready to enter",gateTitle:"Swipe up into<br><i>personal engine.</i>",gateFoot:"No login, just a deliberate entrance.",library:"Personal library",libraryText:"Projects, subsites, tools, and visual notes arranged on one open rail.",dragExplore:"Swipe left/right to explore",open:"Open",back:"Back home",subsiteWip:"This is an accessible first draft of the subsite.",notFoundTitle:"Page not found",notFoundHeading:"This address<br><i>has nothing.</i>",notFoundBody:"The link may have changed, or it never existed at all.",notFoundCta:"Back home",engineHeading:"A few places I<br><i>return to.</i>",engineIntro:"Simple, useful, and close at hand.",profileHeading:"in progress.",worksHeading:"Made,<br><i>observed.</i>",worksIntro:"Software projects and photographs. How I work, and how I look at the world."}},n=()=>Se[p()],h=e=>e?e[p()]:"",Ee=[["home",0],["engine",1],["profile",2],["works",3],["search",4]];function M({sizes:e,priority:t=!1}){const a=t?'fetchpriority="high"':'loading="lazy"';return`<picture>
        <source type="image/webp" srcset="${fe()}" sizes="${e}">
        <img src="${m.fallback}" width="${m.width}" height="${m.height}" alt="${h(m.alt)}" ${a} decoding="async">
      </picture>`}function Te(e=""){const t=p(),a=Ee.map(([s,r])=>{const o=e===s?' aria-current="page"':"";return`<a href="${g(s,t)}"${o}>${n().nav[r]}</a>`}).join("");return`<header class="site-header">
      <a class="brand" href="${g("home",t)}"><span>WW</span><b>LINN</b></a>
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
    </label>`}function Ie(){const e=S(p());return`<a class="language" href="${g(ne()??"home",e)}" hreflang="${y[e]}" lang="${y[e]}">${n().language}<span class="sr-only"> — ${n().languageLabel}</span></a>`}function Ae(){return`<footer>
      <span>© ${new Date().getFullYear()} ${q.author.toUpperCase()}</span>
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
        <p class="gate-alt"><a href="${g(ne()??"home",S(p()))}" hreflang="${y[S(p())]}" lang="${y[S(p())]}">${n().otherLanguageName}</a></p>
      </div>
      <span class="gate-progress" aria-hidden="true"></span>
      <b class="gate-mark" aria-hidden="true">桜</b>
    </section>`}function Oe(){return`<section class="landing">
        <div class="landing-image">
          ${M({sizes:"(max-width: 768px) 100vw, 55vw"})}
          <div class="image-caption">${h(m.title)}<span>${h(m.note)}</span></div>
        </div>
        <div class="landing-copy">
          <p class="kicker">${n().eyebrow}</p>
          <h2>${n().title}</h2>
          <p class="lead">${n().intro}</p>
          <a class="primary-link" href="#library">${n().explore}<span aria-hidden="true">↓</span></a>
          <div class="now"><span>${n().status}</span><strong>${n().statusText}</strong></div>
        </div>
      </section>`}function Pe(e){return`<a class="library-card ${e.tone}" href="${g(e.id,p())}">
          <small>${e.name}</small>
          <strong>${h(e.title)}</strong>
          <span>${n().open} ↗</span>
        </a>`}function He(){const e=`<a class="library-card sakura-card" href="${g("works",p())}">
          <small>SAKURA / IMAGE</small>
          <strong>${h(m.title)}</strong>
          <span>${n().open} ↗</span>
        </a>
        <a class="library-card engine-card" href="${g("engine",p())}">
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
          ${Y.map(Pe).join("")}${e}
        </div>
      </section>`}function qe(){const e=[["engine","01",n().tools,"ENGINE"],["profile","02",n().profile,"PROFILE"],["works","03",n().works,"WORKS"]].map(([t,a,s,r])=>`<a href="${g(t,p())}">
            <span>${a}</span>
            <div><small>${s}</small><h3>${r}</h3></div>
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
        <a href="${g("profile",p())}">${n().profile} ↗</a>
      </section>`}function Ye(){const t=T()?"is-unlocked":"is-locked";return $(`<div class="engine-home ${t}" id="engine-home">
      ${Ne()}
      <div class="home-content" id="home-content">
        ${Oe()}
        ${He()}
        ${qe()}
        ${Re()}
      </div>
      <button class="lock-button" id="lock-entry" type="button">${n().lock} ×</button>
    </div>`,"home")}function ze(){const e=ge.map(t=>`<section>
          <h2>${t.title}</h2>
          ${t.items.map(a=>`<a class="tool-row" href="${a.url}" target="_blank" rel="noopener noreferrer">
              <strong>${a.name}</strong>
              <span>${h(a.note)}</span>
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
        <fieldset class="search-provider-control">
          <legend class="search-provider-label">${n().searchProvider}</legend>
          <p class="search-provider-hint">${n().searchProviderHint}</p>
          <div class="search-provider-options">
            <label class="search-provider-option is-selected">
              <input type="radio" name="search-provider" value="https://www.google.com/search" data-search-provider checked />
              <span>Google</span>
            </label>
            <label class="search-provider-option">
              <input type="radio" name="search-provider" value="https://www.bing.com/search" data-search-provider />
              <span>Bing</span>
            </label>
            <label class="search-provider-option">
              <input type="radio" name="search-provider" value="https://duckduckgo.com/" data-search-provider />
              <span>DuckDuckGo</span>
            </label>
            <label class="search-provider-option">
              <input type="radio" name="search-provider" value="https://github.com/search" data-search-provider />
              <span>GitHub</span>
            </label>
          </div>
        </fieldset>
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
          ${e.map(([t,a,s])=>`<li>
                <button type="button" data-query-template="${t.trimEnd().replace(/&/g,"&amp;").replace(/"/g,"&quot;")}">
                  <code>${s}</code><span>${a}</span><b aria-hidden="true">+</b>
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
        <blockquote>${h(R.bio)}</blockquote>
        <div class="profile-copy">
          <p>${h(R.focus)}</p>
          <div class="contact"><span>${n().contact}</span>${e}</div>
        </div>
      </div>
    </section>`,"profile")}function Me(){if(B.length===0)return"";const e=B.map(t=>`<li>
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
      </section>`}function De(){const e=me.map((t,a)=>`<a class="project-row" href="${t.url}" target="_blank" rel="noopener noreferrer">
            <span>0${a+1}</span>
            <div>
              <small>${t.stack} / ${t.period}</small>
              <h2>${t.name}</h2>
              <p>${h(t.desc)}</p>
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
          <figcaption><strong>${h(m.title)}</strong><span>${h(m.note)}</span></figcaption>
        </figure>
      </section>
    </section>`,"works")}function _(e){return $(`<section class="subsite-page ${e.tone}">
      <a class="back-link" href="${g("home",p())}">← ${n().back}</a>
      <span class="kicker">SUBSITE / ${e.name}</span>
      <h1>${h(e.title)}</h1>
      <p>${h(e.desc)}</p>
      <div class="subsite-placeholder">
        <span>WIP / ${new Date().getFullYear()}</span>
        <strong>${n().subsiteWip}</strong>
        <a href="${g("engine",p())}">${n().tools} ↗</a>
      </div>
    </section>`,"")}function Ke(){return $(`<section class="inner-page not-found">
      <div class="page-intro">
        <span class="kicker">404 / NOT FOUND</span>
        <h1>${n().notFoundHeading}</h1>
        <p>${n().notFoundBody}</p>
      </div>
      <p class="not-found-cta"><a class="primary-link" href="${g("home",p())}">${n().notFoundCta}<span aria-hidden="true">↗</span></a></p>
    </section>`,"")}const Ge={home:Ye,engine:ze,profile:Ce,works:De,search:Fe,toy:()=>_(Y[0]),notes:()=>_(Y[1])},ae=()=>ee(location.pathname);function v(e,t,a){let s=document.head.querySelector(`meta[${e}="${t}"]`);s||(s=document.createElement("meta"),s.setAttribute(e,t),document.head.append(s)),s.setAttribute("content",a)}function We(e,t){document.head.querySelector(`meta[${e}="${t}"]`)?.remove()}function Be(e,t){let a=document.head.querySelector(`link[rel="${e}"]:not([hreflang])`);a||(a=document.createElement("link"),a.setAttribute("rel",e),document.head.append(a)),a.setAttribute("href",t)}function _e(e){document.head.querySelector(`link[rel="${e}"]:not([hreflang])`)?.remove()}function je(e,t){let a=document.head.querySelector(`link[rel="alternate"][hreflang="${e}"]`);a||(a=document.createElement("link"),a.setAttribute("rel","alternate"),a.setAttribute("hreflang",e),document.head.append(a)),a.setAttribute("href",t)}function Ue(){document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(e=>e.remove())}function Ve(e,t){const a=e??$e;if(document.title=a.title[t],v("name","description",a.description[t]),v("property","og:title",a.title[t]),v("property","og:description",a.description[t]),v("property","og:locale",ye[t]),v("name","robots",a.noindex?"noindex, follow":"index, follow"),!e){We("property","og:url"),_e("canonical"),Ue();return}const s=`${L}${e.path[t]}`;v("property","og:url",s),Be("canonical",s);for(const r of we(e.id))je(r.hreflang,r.href)}const Xe=()=>document.querySelector("#app");let re=()=>{};const Je=e=>{re=e};let j=!1;function D(e=ae()){const t=Z(e),a=t?t.lang:ke(e),s=t?t.id:null,r=s?ve(s):null,o=Xe();Le(a,s);const c=`${s??"notfound"}:${a}`;return!j&&o.dataset.prerendered===c||(o.innerHTML=(s?Ge[s]:Ke)()),j=!0,Ve(r,a),document.body.classList.toggle("is-locked",s==="home"&&!T()),re(),s}function Qe(e,{hash:t="",replace:a=!1}={}){const s=`${e}${t}`;if(a?history.replaceState({path:e},"",s):history.pushState({path:e},"",s),D(e),t){document.querySelector(t)?.scrollIntoView();return}window.scrollTo(0,0),document.querySelector("#top")?.focus({preventScroll:!0})}function Ze(){document.addEventListener("click",e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.target.closest?.("a");if(!t||t.target==="_blank"||t.hasAttribute("download"))return;const a=new URL(t.getAttribute("href")??"",location.href);if(a.origin!==location.origin)return;const s=ee(a.pathname);if(Z(s)&&!(a.pathname===location.pathname&&a.hash)){if(e.preventDefault(),a.pathname===location.pathname){window.scrollTo(0,0);return}Qe(s,{hash:a.hash})}}),window.addEventListener("popstate",()=>{D(ae())})}const U="wwhooo-theme",et=new Set(["system","light","dark"]);let V=!1;function X(e){const t=et.has(e)?e:"system";return document.documentElement.dataset.theme=t,document.querySelectorAll("[data-theme-control]").forEach(a=>{try{a.value=t}catch{}}),t}function tt(){const e=localStorage.getItem(U)??"system";X(e),!V&&(V=!0,document.addEventListener("change",t=>{const a=t.target.closest?.("[data-theme-control]");if(!a)return;const s=X(a.value);localStorage.setItem(U,s)}))}let J=!1;function nt(){const e=document.querySelector("[data-search-form]"),t=e?.querySelector('input[name="q"]'),a=e?.querySelectorAll("[data-search-provider]");if(!e||!t||!a?.length||e.dataset.ready)return;e.dataset.ready="true";const s=r=>{e.action=r.value,a.forEach(o=>o.closest("label")?.classList.toggle("is-selected",o===r))};a.forEach(r=>r.addEventListener("change",()=>s(r))),s(e.querySelector("[data-search-provider]:checked")??a[0]),document.addEventListener("click",r=>{const o=r.target.closest?.("[data-query-template]");if(!o)return;const c=document.querySelector('[data-search-form] input[name="q"]');if(!c)return;const u=o.getAttribute("data-query-template")??"";c.value=`${u} `,c.focus(),c.setSelectionRange(c.value.length,c.value.length)}),J||(document.addEventListener("keydown",r=>{if(r.altKey||r.ctrlKey||r.metaKey)return;const o=r.target,c=o instanceof HTMLElement&&(o.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(o.tagName));if(r.key==="/"&&!c){const u=document.querySelector('[data-search-form] input[name="q"]');if(!u)return;r.preventDefault(),u.focus()}else r.key==="Escape"&&o.matches?.('[data-search-form] input[name="q"]')&&(o.value="")}),J=!0),e.addEventListener("submit",r=>{t.value.trim()||(r.preventDefault(),t.focus())})}function at(){const e=document.querySelector(".library-rail");!e||e.dataset.ready||(e.dataset.ready="true",e.addEventListener("wheel",t=>{if(Math.abs(t.deltaY)<=Math.abs(t.deltaX))return;const a=e.scrollWidth-e.clientWidth;if(a<=0)return;const s=e.scrollLeft<=0&&t.deltaY<0,r=e.scrollLeft>=a-1&&t.deltaY>0;s||r||(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1}))}function rt(){tt(),ue(),at(),nt()}Je(rt);Ze();D();
