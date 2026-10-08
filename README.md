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
deploy/nginx/wwhooo.com.conf   Nginx 站点配置
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

## 部署（Debian + Nginx）

服务器只需要拉取 `deploy` 分支并同步到站点根目录：

```bash
cd /opt/static-site-deploy
git fetch origin deploy
git reset --hard origin/deploy
rsync -a --delete --exclude='.git' ./ /opt/static-site/site/
```

Nginx 配置见 [`deploy/nginx/wwhooo.com.conf`](deploy/nginx/wwhooo.com.conf)。关键一点：

```nginx
location / {
    try_files $uri $uri/ =404;     # 不需要 SPA fallback
}
error_page 404 /404.html;
```

因为构建会为每个路由产出真实文件（`dist/engine/index.html` …），`/engine/` 由常规 `index` 查找命中，未知路径可以返回**真正的 404 状态码**，而不是 200 的软 404。这也是移除 GitHub Pages `/?/engine/` 重定向 hack 的前提 —— 旧方案每次深链都要多一次跳转和一次闪烁。

TLS 由 Cloudflare 终结，**不要**在 Nginx 里写 `http → https` 跳转，会和 Cloudflare 的 "Always Use HTTPS" 打架并可能成环；请在 Cloudflare 面板开启该选项。若改由 Nginx 终结 TLS，用配置文件末尾注释掉的 `:443` 版本。

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
