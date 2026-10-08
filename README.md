# wwhooo-homepage

`wwhooo.com` 的个人主页源码。Vite 构建静态站点，GitHub Actions 发布到 `deploy` 分支，**Debian 服务器拉取该分支后由 Nginx 直接托管**（前面是 Cloudflare Tunnel）。

## 目录结构

```
index.html                     Vite 入口与首屏占位（构建后成为 dist/index.html）
src/
  main.js                      启动：注册渲染后钩子、链接拦截、语言切换
  router.js                    路由表、按路由同步 <head>、站内链接拦截
  views.js                     所有页面模板（唯一输出 HTML 的地方）
  gate.js                      门禁交互（按钮 + 指针滑动 + 滚轮）
  i18n.js                      中英文案字典与语言状态
  meta.js                      每路由的 title/description/canonical（构建脚本也读它）
  data.js                      工具、项目、子站、摄影数据
  session.js                   本次会话是否已通过门禁
  style.css                    响应式视觉系统
scripts/
  build-routes.mjs             构建后生成每路由真实 HTML 与 sitemap.xml
test/
  views.test.mjs               渲染层测试（直接断言生成的 HTML）
  build.test.mjs               构建产物测试（体积预算、canonical、路由文件）
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

开发服务器直接用 Vite 的 HTML fallback，`/engine/`、`/works/` 等路径由客户端路由渲染 —— 这与生产环境不同（生产是每路由一个真实文件），但页面内容一致。

## 构建与测试

```bash
npm test
```

`npm test` 依次执行：

1. `vite build` —— 打包 JS/CSS 与 `index.html`
2. `node scripts/build-routes.mjs` —— 为 `/engine/` 等 5 个路由生成真实 HTML，并由 `src/meta.js` 生成 `sitemap.xml`
3. `node --test` —— 自动发现 `test/` 下的渲染层 + 构建产物测试

> 注意用 `node --test`（默认发现），不要写成 `node --test test`：把目录当位置参数传入时 Node 会把它当成模块路径，报 `MODULE_NOT_FOUND`。

测试覆盖的内容（都在 `test/` 里，可直接阅读）：

- 每个路由都能渲染，且 `src/meta.js` 与实际渲染器一一对应
- 门禁是可聚焦的 `<button>`，不再使用 `input[type=range]`
- 「重新进入」按钮始终渲染（回归测试：旧版它在 `state.entered ? … : ''` 之后，永远不会出现）
- 每路由的 canonical / og:url / title 互不相同
- `/toy/`、`/notes/` 是 `noindex` 且不在 sitemap 里
- 英文模式下不出现任何未翻译的中文（只放行 `桜` 水印与语言按钮）
- `zh` / `en` 字典键完全一致；`data.js` 里每个 `{zh, en}` 对都非空且英文不含中文
- 外部链接都带 `rel="noopener noreferrer"`
- `dist/images` 总重 < 400 KB，最大单张 < 120 KB
- 构建产物里不再出现 `jsdelivr`

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

构建会为每个路由产出真实文件（`dist/engine/index.html`、`dist/profile/index.html` …），所以 `/engine/` 由常规 `index` 查找命中，未知路径可以返回**真正的 404 状态码**而不是 200 软 404。

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

**双语是运行时的，不是两套 URL**。语言存在 `localStorage`，切换语言就地重渲染（旧版 `location.reload()` 会把已经进入的访客重新拦在门禁外）。代价是搜索引擎只会看到默认的 `zh-CN` 内容；如果需要两种语言各自可索引，需要引入 `/en/` 路径与 `hreflang`，这是目前**有意不做**的部分。

**`/toy/` 与 `/notes/` 是占位子站**，内容还薄，因此标记为 `noindex` 且不进 sitemap。补上真实内容后，把 `src/meta.js` 里对应的 `noindex: true` 去掉即可，sitemap 会在下次构建自动包含它们。

**图片**。主视觉母版 1.75 MB（4095×1713）。构建不处理图片，`public/images/` 下的派生图（800/1600/2400 的 WebP + 1600 的 JPEG 回退 + 700 的卡片图）由 `design/source/optimize_assets.py` 生成后会提交进仓库。替换图片时重跑该脚本。现在页面用 `<picture>` + `srcset`，浏览器只下载所需尺寸（实测首屏约 46 KB 而非 1.75 MB）。

## 尚未覆盖的部分

- 没有 lint / format / 类型检查（`main.js` 已拆分，但未引入 ESLint 与 Prettier）
- 测试是**渲染输出的字符串断言**，没有真实 DOM（jsdom/linkedom）与浏览器端到端测试；门禁的指针手势、滚轮与焦点转移目前靠人工验证
- 没有 `hreflang`，英文内容对搜索引擎不可见（见上）
- `design/source/optimize_assets.py` 需要本机有 Pillow，未接入 CI
