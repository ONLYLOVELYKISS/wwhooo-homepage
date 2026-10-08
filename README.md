# wwhooo-homepage

`wwhooo.com` 的个人主页源码。Vite 构建静态站点，GitHub Actions 发布到 `deploy` 分支，**Debian 服务器拉取该分支后由 Nginx 直接托管**（前面是 Cloudflare Tunnel）。

## 目录结构

```
index.html                     Vite 入口与首屏占位（构建后成为 dist/index.html，即中文首页）
src/
  main.js                      启动：注册渲染后钩子、链接拦截
  router.js                    路由解析（含语言树）、按路由同步 <head>、站内链接拦截
  views.js                     所有页面模板（唯一输出 HTML 的地方）
  gate.js                      门禁交互（按钮 + 指针滑动 + 滚轮）
  i18n.js                      中英文案字典（纯查表，语言来自 URL）
  context.js                   当前渲染语言与路由 id，由 router 设置
  meta.js                      路由定义表：双语路径、title/description、hreflang
  data.js                      工具、项目、归档、子站、摄影数据
  session.js                   本次会话是否已通过门禁
  style.css                    响应式视觉系统
scripts/
  build-routes.mjs             构建后为双语共 12 个页面预渲染正文 + 生成 sitemap.xml
test/
  views.test.mjs               渲染层测试（直接断言视图生成的 HTML）
  build.test.mjs               构建产物测试（双语路由、canonical/hreflang、体积预算）
  interaction.test.mjs         用 linkedom 驱动构建产物：门禁、语言链接、客户端路由
eslint.config.js               ESLint flat config（src 用浏览器全局，scripts/test 用 Node 全局）
.prettierrc.json               代码风格，endOfLine 固定为 lf
design/source/
  sakura-original.jpg          主视觉母版（不发布）
  optimize_assets.py           从母版生成 webp/jpg 派生图与品牌图标
deploy/nginx/
  wwhooo.com.conf              容器（nginx:alpine）用的 conf.d 片段 —— 生产实际使用
  bare-metal.conf              宿主机直装 nginx 用的 sites-available 版本
public/                        原样复制到 dist 的静态文件
```

## 本地开发

```bash
npm install
npm run dev
```

开发服务器直接用 Vite 的 HTML fallback，`/engine/`、`/en/engine/` 等路径由客户端路由渲染 —— 这与生产环境不同（生产是每个路由每个语言一个真实文件），但页面内容一致。

## 构建、检查与测试

```bash
npm run check     # lint + format:check + test，CI 跑的就是这一条
npm test          # 只跑构建与测试
npm run lint      # ESLint
npm run format    # Prettier 就地改写
```

`npm test` 依次执行：

1. `vite build` —— 打包 JS/CSS 与 `index.html`
2. `node scripts/build-routes.mjs` —— 为双语共 12 个页面预渲染正文，并由 `src/meta.js` 生成 `sitemap.xml`
3. `node --test` —— 自动发现 `test/` 下的全部测试

> 注意用 `node --test`（默认发现），不要写成 `node --test test`：把目录当位置参数传入时 Node 会把它当成模块路径，报 `MODULE_NOT_FOUND`。

三个测试文件：

- `test/views.test.mjs` —— 纯渲染层，直接断言视图生成的 HTML
- `test/build.test.mjs` —— 构建产物：双语路由文件、canonical/hreflang、sitemap、体积预算
- `test/interaction.test.mjs` —— 用 `linkedom` 把**构建产物**装进真实 DOM，驱动门禁、语言链接与客户端路由（测试套件唯一的运行时依赖）

测试覆盖的关键契约：

- 每个路由两种语言都能渲染，且 `src/meta.js` 与实际渲染器一一对应
- 门禁是可聚焦的 `<button>`，不是 `input[type=range]`
- 「重新进入」按钮始终渲染（回归：旧版它在 `state.entered ? … : ''` 之后，永远不会出现）
- 每路由每语言有独立的 canonical / og:url / title，共 12 条互不相同
- 每页三条 hreflang（`zh-CN` / `en` / `x-default`）互指，sitemap 带 `<xhtml:link>` 交替链接
- 英文页不链回中文树，反之亦然；英文渲染里不出现任何未翻译的中文（只放行 `桜` 水印与语言按钮）
- `/toy/`、`/notes/` 两种语言都 `noindex` 且不在 sitemap
- 每页 HTML 里都有**预渲染正文**、没有占位符；`<html class="no-js">` 与握手脚本齐备
- 门禁后的内容在静态标记里**不带** `inert`（否则无 JS 访客能读不能点）
- 首次 `mount()` **复用**预渲染节点而不是重建（断言 DOM 节点引用同一性）
- `inert`、`body.is-locked`、`sessionStorage` 在进入／重新锁定后状态正确
- 未知路径渲染 404 视图并移除 canonical 与 hreflang
- 外部链接都带 `rel="noopener noreferrer"`；`dist/images` 总重 < 400 KB、单张最大 < 120 KB
- 构建产物里不再出现 `jsdelivr`

代码风格由 Prettier 统一（`.prettierrc.json`，`endOfLine: lf`），静态检查由 ESLint flat config 负责（`eslint.config.js`，`src/` 用浏览器全局，`scripts/`、`test/` 用 Node 全局）。

## 部署（Debian + Docker + Cloudflare Tunnel）

生产环境的实际拓扑：

```
cloudflared 容器  ──►  127.0.0.1:8080
                        └─ static-site 容器（nginx:alpine）
                             /etc/nginx/conf.d/default.conf  ◄── bind ro ── /opt/static-site/nginx.conf
                             /usr/share/nginx/html           ◄── bind ro ── /opt/static-site/site
```

`nginx.conf` 是 `site/` 的兄弟路径而不是子目录，所以下面那条带 `--delete` 的 rsync 不会碰到它。

### 发布站点

```bash
cd /opt/static-site-deploy
git fetch origin deploy
git reset --hard origin/deploy
rsync -a --delete --exclude='.git' ./ /opt/static-site/site/
```

这台机器上的 `/opt/static-site-deploy` 检出的是 **deploy 分支**（只有站点产物，没有 `deploy/` 目录），所以**不要**在这里 `cp deploy/nginx/...`。要用配置文件时从 main 分支取：

```bash
cd /opt/static-site-deploy
git fetch origin main
git show origin/main:deploy/nginx/wwhooo.com.conf | sudo tee /opt/static-site/nginx.conf > /dev/null
sudo docker exec static-site nginx -t && sudo docker exec static-site nginx -s reload
```

改配置**不需要**重启容器，`nginx -s reload` 会重新读取那个只读挂载。

### 为什么不需要 SPA fallback

```nginx
location / {
    try_files $uri $uri/ =404;
}
error_page 404 /404.html;
```

构建会为每个路由的每种语言产出真实文件（`dist/engine/index.html`、`dist/en/engine/index.html` …），所以 `/engine/` 和 `/en/engine/` 都由常规 `index` 查找命中，未知路径可以返回**真正的 404 状态码**而不是 200 软 404。**新增 `/en/` 语言树不需要改 nginx**，同一条 `try_files` 就够。

注意：这条 `try_files` 一直在生产配置里，但**在这次改动之前 `/engine/` 仍然返回 404** —— 因为当时没有任何真实路由文件，也没有 `error_page`，`=404` 只能落到 nginx 默认错误页。那套 GitHub Pages 的 `/?/engine/` 重定向 hack 在 nginx 上从未生效过。修好它靠的是生成真实路由文件，不是改 nginx。

### Cloudflare 侧的两项设置

- **Always Use HTTPS**：在面板开启。**不要**在 nginx 里写 `http → https` 跳转，会和它打架甚至成环。
- **Browser Cache TTL** 必须改成 **Respect Existing Headers**。Free 计划默认是 4 小时，会**覆盖**源站的 `Cache-Control` —— 这就是为什么配置修好之前，带内容哈希的 `assets/*.js` 只拿到 `max-age=14400`。源站现在发 `max-age=31536000, immutable`，但只有把这项改成尊重源站头才会真正生效。

### 裸机（nginx 直接用 apt 装在宿主机）

用 `deploy/nginx/bare-metal.conf`，它是完整的 `sites-available` server 块，和容器版**不通用**（容器版是 `conf.d` 片段，依赖镜像自带 `nginx.conf` 提供 `http {}`、mime types 和 `gzip on`）。

### 回滚

`deploy` 分支保留历史（不再使用 `force_orphan`），所以任意一次发布都可以回退：

```bash
cd /opt/static-site-deploy
git log --oneline -5 origin/deploy          # 找到上一个 deploy: <sha> 提交
git reset --hard <上一个提交>
rsync -a --delete --exclude='.git' ./ /opt/static-site/site/
```

## 设计说明与取舍

**门禁（Sakura Entry Gate）**。首页是一层覆盖式门禁，需要一次主动动作才能进入；本次会话已进入过则直接跳过（`sessionStorage`）。门禁是**真实按钮**：点击 / Enter / Space 一步进入，指针拖动、触摸上滑、滚轮累积都是渐进增强。此前用 `input[type=range]` 实现，键盘用户要按 85 次方向键才够阈值，`orient="vertical"` 又只有 Firefox 认。

**门禁不会再把人挡在门外**。旧版 `.entry-gate` 用 `position:fixed` + `min-height:580px` + `overflow:hidden`，在横屏或矮窗口下元素比视口高、自身又不可滚动，解锁控件落在视口之外且页面没有滚动余量 —— 访客会被彻底困住。现在高度交给视口、内部可滚动，并在 `max-height:620px` 的横屏下切换为并排紧凑布局、`max-height:400px` 时隐藏图片。

**首页内容始终在 DOM 里**。门禁通过 `inert` + `aria-hidden` 把内容移出交互与无障碍树，而不是 `display:none`，这样爬虫和无 JS 访问者仍能看到真实文案。

**双语是两套真实 URL，不是运行时偏好**。`/engine/` 是中文页，`/en/engine/` 是英文页，`src/meta.js` 的 `ROUTE_DEFS` 同时定义两条路径、各自的 title/description 和三条 hreflang（`zh-CN` / `en` / `x-default`）。**语言由 URL 决定**，`localStorage` 不再参与渲染 —— 这是英文内容能被索引的前提，之前只有一条 URL，英文文案对搜索引擎完全不存在。

语言控件因此是一个**真实链接**（`<a hreflang="en" href="/en/engine/">`）：可抓取、可中键、可分享，禁用 JS 也能用；`router.js` 会像处理其他站内链接一样就地接管它，所以切换依然不用整页刷新，也不会把已经进入的访客重新拦在门禁外（`sessionStorage` 跨语言共享）。

`sitemap.xml` 由 `src/meta.js` 生成，8 条可索引 URL，每条都带 `<xhtml:link>` 交替链接。`/toy/`、`/notes/` 两种语言都标 `noindex` 且不进 sitemap。

**`/toy/` 与 `/notes/` 是占位子站**，内容还薄，因此不进索引。补上真实内容后，把 `src/meta.js` 里对应的 `noindex: true` 去掉即可，sitemap 会在下次构建自动包含它们（两种语言一起）。

**正文是构建时预渲染的，不依赖 JavaScript**。`src/views.js` 及其依赖（`i18n` / `context` / `meta` / `data` / `session`）刻意不含任何 DOM 与浏览器 API，所以 `scripts/build-routes.mjs` 可以直接调用**客户端同一套渲染函数**，把正文写进静态文件。结果是：双语共 12 个页面的 HTML 里都有完整正文，爬虫、禁用 JS 的访客、客户端二次渲染看到的都是同一份标记，不存在 hydration 不一致（客户端只是把同样的内容再渲染一次）。

**禁用 JS 也不会有打不开的门禁**。门禁是覆盖层，没有脚本就点不开，所以静态 HTML 里 `<html>` 带 `class="no-js"`，`<head>` 的内联样式把它隐藏；一段内联握手脚本在首次绘制前移除 `no-js` 并给门禁后的内容加上 `inert`。这样：

- **有 JS**：门禁从首帧就可见，内容在背后不可聚焦（`inert` 由脚本施加，不是写死在标记里）。
- **无 JS**：门禁完全隐藏，访客直接读到并操作预渲染的完整首页。
- 握手脚本还会读 `sessionStorage`，已进入过的访客在 `html` 上加 `entered`，避免刷新时先闪一下深色门禁。

`inert` 刻意**不**写进静态标记 —— 否则禁用 JS 的访客会得到「能读、但不能交互」的内容，还被挡在打不开的门禁后面。

**工具与项目分两层**。`projects` 是精选，渲染成 `/works/` 上的大标题条目；`archive` 是归档，渲染成排版克制的次级列表。`chaoxing-sign-cli` 属于后者 —— 自动化第三方平台的签到流程在合规上属于灰色地带，不适合作为首页门面，但作为记录保留。

**图片**。主视觉母版 1.75 MB（4095×1713）。构建不处理图片，`public/images/` 下的派生图（800/1600/2400 的 WebP + 1600 的 JPEG 回退 + 700 的卡片图）由 `design/source/optimize_assets.py` 生成后会提交进仓库。替换图片时重跑该脚本。现在页面用 `<picture>` + `srcset`，浏览器只下载所需尺寸（实测首屏约 46 KB 而非 1.75 MB）。

## 尚未覆盖的部分

- **无 JS 可用性与像素级渲染**没有进 CI。它们是本地用无头浏览器 + Pillow 验证的：把 `dist` 复制一份移除所有 `<script>` 后截图，确认首页 `accent` 像素为 0（门禁已隐藏）而正文页正常渲染。要进 CI 需要再加浏览器与 Python 依赖，收益不明显。
- 无障碍目前只有静态检查（`aria-current`、`inert` 状态、可见焦点、对比度取值），没有跑过 axe 之类的自动化审计。
- 英文文案是我按中文原文翻译的，你如果有更贴合的表达可以直接改 `src/i18n.js` 与 `src/data.js`，测试会挡住漏翻。
- `design/source/optimize_assets.py` 需要本机有 Pillow，未接入 CI。
