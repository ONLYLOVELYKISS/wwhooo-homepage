# wwhooo-homepage 代码评审与迭代建议

> **状态：本文档是迭代前的评审快照，其中 P0–P5 的主要项已在本轮迭代中实施完成。**
> 实施结果、验证证据与仍未覆盖的部分见项目内的 [`README.md`](../README.md)。
> 本轮完成情况：门禁矮视口不可达、`#lock-entry` 死代码、canonical/路由元信息、显式 404 视图、
> 图片自托管与压缩、移除 GitHub Pages 404 hack 改为 Nginx `try_files`、无障碍与动效降级、
> favicon/manifest、`src/` 模块化拆分、测试与文档重写。构建与测试已实测通过
> （17 项渲染测试 + 12 项产物测试 + 32 项 DOM 交互检查）。

评审对象：`20261007/wwhooo-homepage`（main @ `270c810`）
评审范围：全部源码、构建产物、部署配置、测试脚本与文档
验证方式：通读 `index.html` / `src/*` / `public/*` / `scripts/test-site.mjs` / `.github/workflows/build.yml` / README；核对 git 历史与 `origin/deploy` 分支内容；`node scripts/test-site.mjs` 实测通过。

---

## 0. 总体判断

这是一个**视觉完成度很高、工程完成度偏低**的单页站点：排版、字体、玻璃拟态和门禁交互的设计语言统一且有品味，但底层存在若干会真实影响用户的缺陷（横屏下无法进入站点、死代码、SEO 自相矛盾），以及一处明显的架构摇摆（GitHub Pages 的 404 hack 与 Nginx 部署并存）。

核心问题可以概括为三句话：

1. **站点被"单页"和"多路由"两套模型同时拉扯**，导致 canonical、sitemap、404、路由、Nginx 配置互相矛盾。
2. **门禁（Sakura Entry Gate）是体验的核心，但它在矮视口下会把用户彻底挡在门外**，且键盘/无障碍路径基本不可用。
3. **资源与数据来源混乱**：1.75MB 主视觉图在仓库里存了 3 份，代码却仍从第三方 CDN 加载。

建议的迭代顺序：**先修 P0 的正确性缺陷 → 再定架构（去掉 404 hack，补 Nginx try_files）→ 再补无障碍与性能 → 最后做工程化收口**。

---

## 1. 缺陷清单（按优先级）

| 级别 | 问题                                                                               | 位置                                        |
| ---- | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| P0   | 横屏/矮视口下门禁溢出且不可滚动，用户无法进入站点                                  | `src/style.css:182-195,970`                 |
| P0   | 「重新进入」按钮永远不会渲染，相关监听器与样式均为死代码                           | `src/main.js:50,56,132`                     |
| P0   | canonical 恒为首页，6 条 sitemap 路由全部声明"我是首页"，子页会被搜索引擎合并/丢弃 | `index.html:8`                              |
| P0   | 未匹配路由静默回退首页（HTTP 200 软 404），无真正的 404 视图                       | `src/main.js:56`                            |
| P1   | 主视觉图依赖第三方 CDN，仓库内却存了 3 份完全相同的 1.75MB 副本                    | `src/data.js:5`、`src/style.css:582`        |
| P1   | `public/IMG_Sakura.JPG` 已随构建发布，但没有任何代码引用它                         | `public/IMG_Sakura.JPG`                     |
| P1   | 部署模型自相矛盾：README 说 Nginx 托管，代码却依赖 GitHub Pages 的 404 行为        | `README.md:37-46`、`public/404.html`        |
| P1   | 无 favicon；manifest 未被任何页面引用、无图标、配色与页面不符                      | `index.html`、`public/manifest.webmanifest` |
| P2   | 键盘用户几乎无法通过门禁（需按 85 次方向键）；点击胶囊右端即"解锁"                 | `src/main.js:35,76-85`                      |
| P2   | 多处文字对比度不达 WCAG AA（最低 2.5:1）                                           | `src/style.css:11,655-658`                  |
| P2   | 无 `prefers-reduced-motion`，无限脉冲/弹跳动画无法关闭                             | `src/style.css:305,309,320-327`             |
| P2   | 切换语言用 `location.reload()`，已进入的用户被重新拦在门禁外                       | `src/main.js:57`                            |
| P2   | 图库横向轨道劫持垂直滚轮，鼠标悬停其上无法滚动页面                                 | `src/main.js:134`                           |
| P2   | 胶囊进度反馈被 `overflow:hidden` 裁掉，上滑动画基本不可见                          | `src/style.css:284,303`                     |
| P3   | 中英混排：门禁标题、landing 图注、`alt` 在英文模式下仍是中文                       | `src/main.js:25,31,50`                      |
| P3   | 子站页描述仅中文；英文模式下把"描述句"当大标题渲染                                 | `src/main.js:48,55`、`src/data.js:4`        |
| P3   | 档案页引言与紧随其后的正文首句完全重复；`profile.statement` 是死数据               | `src/main.js:53`、`src/data.js:1`           |
| P3   | 启动占位页与 404 页的配色/字体与实际站点不一致，首屏有色差闪烁                     | `index.html:30`、`public/404.html:9`        |
| P3   | `theme-color` / manifest `theme_color` / `background_color` 三处三种颜色           | `index.html:7`、manifest                    |
| P4   | Google Fonts 用 CSS `@import` 加载（阻塞链）；Space Grotesk 白载                   | `src/style.css:1,22`                        |
| P4   | 主视觉 1.75MB，无 `srcset`/WebP/宽高属性；hero 反而用了 `loading="lazy"`           | `src/main.js:25,50`                         |
| P5   | 测试全是字符串断言，测不到任何真实缺陷；README 对测试能力的描述不实                | `scripts/test-site.mjs`、`README.md:29-35`  |
| P5   | 无 lint / format / 类型检查；`main.js` 单行超 2000 字符                            | `src/main.js:50`                            |
| P5   | CI 无并发控制、无体积预算、无回滚产物；`origin/deploy` 落后 main 8 个提交          | `.github/workflows/build.yml`               |
| P5   | 仓库根目录 `404.html`、`IMG_Sakura.JPG` 是历史残留，Vite 完全不会用到              | 仓库根                                      |

---

## 2. P0：必须修

### 2.1 横屏/矮视口下用户会被永久挡在门外 ⚠️ 最高优先级

```css
/* src/style.css:182 */
.entry-gate {
  position: fixed;
  inset: 0;
  height: 100svh;
  min-height: 560px;
  overflow: hidden;
}
/* src/style.css:970 —— 移动端更糟 */
.entry-gate {
  display: block;
  height: 100svh;
  min-height: 580px;
}
```

推演（iPhone 横屏，视口 667×375）：

- `height: 100svh` = 375px，但 `min-height: 580px` 胜出 → 元素实际高 580px，且 `position: fixed` 钉在顶部。
- 底部 205px 落在视口之外；`overflow: hidden` 使门禁自身无法滚动。
- 门禁解锁前 `.home-content` 是 `display:none`，页面总高只有 `100svh`，**body 也没有可滚动余量**。
- 上滑胶囊位于 `gate-copy` 内容下部，正好落在被裁掉的区域。

结论：横屏手机、矮窗口浏览器、分屏场景下，用户**看不到也点不到解锁控件，且无法滚动到它**——只能改回竖屏。这是唯一一个会让站点完全不可用的缺陷。

修复方向（任选，建议组合）：

```css
.entry-gate {
  position: fixed;
  inset: 0;
  height: 100svh;
  min-height: 0; /* 去掉固定最小高度 */
  overflow-y: auto; /* 允许门禁内部滚动 */
  overscroll-behavior: contain;
}
.gate-copy {
  padding-block: clamp(24px, 8vh, 130px) clamp(24px, 6vh, 70px);
}
/* 矮视口降级：横屏时改为左右分栏 + 紧凑排版 */
@media (max-height: 520px) and (orientation: landscape) {
  .entry-gate {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .gate-image {
    height: 100%;
  }
  .gate-copy {
    min-height: 0;
    padding: 24px;
  }
  .gate-copy h1 {
    font-size: clamp(2rem, 6vh, 3rem);
    margin: 8px 0;
  }
  .gate-foot,
  .gate-status {
    display: none;
  }
}
```

同时给门禁加一个**兜底入口**（键盘可聚焦的"进入"按钮），确保任何视口下都存在可达路径。

### 2.2 「重新进入」按钮永远不会出现

```js
// src/main.js:50 —— 初始渲染时 state.entered 恒为 false
${state.entered ? `<button class="lock-button" id="lock-entry" …>` : ''}
// src/main.js:56 —— homeContent() 只在首屏调用一次
// src/main.js:132 —— 监听器挂在永远不存在的元素上
document.querySelector('#lock-entry')?.addEventListener('click', () => { location.reload(); });
```

`triggerUnlock()`（`src/main.js:59-68`）只改 class 和 `aria-hidden`，从不重新渲染，因此 `#lock-entry` 永远不会进入 DOM。连带失效：`copy.*.lock`（"重新进入"/"Enter again"）文案、`.lock-button` 全套 CSS（`src/style.css:352-377`）都是死代码。

修复：把按钮直接写进 `homeContent()` 的静态模板，用 `.engine-home.is-locked .lock-button { display:none }` 控制显隐——CSS 已经写好了这条规则，说明原本就是这个意图，只是模板条件写错了。

### 2.3 canonical 与 sitemap 互相打脸（SEO 硬伤）

```html
<!-- index.html:8 —— 所有路由共用这一份 HTML，canonical 永远是首页 -->
<link rel="canonical" href="https://wwhooo.com/" />
```

站点有 6 条路由进入 sitemap，但 `/engine/`、`/profile/`、`/works/`、`/toy/`、`/notes/` 返回的 HTML 里 canonical 全部指向首页，`<title>`、`<meta name="description">`、`og:url` 也全部是首页内容。这等于主动告诉搜索引擎"这 5 个页面都是首页的副本"，sitemap 的提交基本被抵消。

修复（按投入从低到高）：

1. **最低成本**：路由渲染后同步更新 head——canonical、`og:url`、`<title>`、`description`，并补 `hreflang`。
2. **推荐**：改为 Vite 多入口构建，为每个路由产出真实 HTML（`/engine/index.html` 等），标题/描述/canonical 静态化。这同时解决 404、首屏白屏、无 JS 时不可用、以及下面的 2.4。
3. 若坚持 SPA：接入预渲染（如 `vite-plugin-prerender`）产出各路由静态快照。

另外 `/toy/`、`/notes/` 目前只是 "WIP" 占位页（`src/main.js:55`），属于薄内容，建议在补上真实内容前加 `noindex` 或从 sitemap 移除。

### 2.4 未知路由静默返回首页

```js
// src/main.js:56 —— 最后一个 else 兜底为首页
app.innerHTML = route === '/engine' ? … : `${header('/')}${homeContent()}${footer()}`;
```

`/whatever` 会渲染出完整首页并返回 HTTP 200，形成软 404（搜索引擎会记为重复内容），用户也得不到"路径错了"的反馈。建议加显式 404 视图（可复用 `public/404.html` 的视觉），并在 head 里设 `noindex`。

顺带：这条巨型三元表达式已难维护，建议改为路由表：

```js
const routes = {
  '/': () => `${header('/')}${homeContent()}${footer()}`,
  '/engine': engine,
  '/profile': profilePage,
  '/works': works,
  '/toy': () => subsite(subsites[0]),
  '/notes': () => subsite(subsites[1]),
};
const render = routes[route] ?? notFound;
```

---

## 3. P1：架构与部署

### 3.1 主视觉图的"三份副本 + 一个外链"

实测三个文件 SHA256 完全相同（`781A388A…3B15`，各 1,751,121 字节）：

| 文件                                   | 是否被引用                                     |
| -------------------------------------- | ---------------------------------------------- |
| `IMG_Sakura.JPG`（仓库根）             | ❌ 无                                          |
| `public/IMG_Sakura.JPG`                | ❌ 无（但会被复制进 `dist/` 并发布）           |
| `public/images/photography/sakura.jpg` | ❌ 无（README 称"保留用于旧引用"，实际无引用） |

而唯一被使用的地址是第三方 CDN：

```js
// src/data.js:5
image: 'https://cdn.jsdelivr.net/gh/ONLYLOVELYKISS/wwhooo-homepage@main/IMG_Sakura.JPG';
```

```css
/* src/style.css:582 —— 同一个 1.75MB 原图又当卡片背景加载一次 */
url('https://cdn.jsdelivr.net/gh/ONLYLOVELYKISS/wwhooo-homepage@main/IMG_Sakura.JPG')
```

问题：

- 仓库里躺着 5.25MB 重复二进制（git 历史里永久留存），线上却走外网。
- 仓库若转为 private，jsdelivr 立刻 403，整站视觉崩掉。
- `@main` 是浮动引用：每次 push 都会改变 CDN 缓存键，冷启动回源；也无法做长期缓存。
- 卡片背景用原图是纯浪费（卡片宽约 360px）。
- 该图片在门禁、landing、卡片背景、works 页共出现 4 次。

建议：

1. 只保留一份 `public/images/sakura.jpg`，删除根目录与 `public/IMG_Sakura.JPG`（注意 `scripts/test-site.mjs:31,39` 与 `data.js:5` 需同步改）。
2. 改为自托管相对路径 `/images/sakura.jpg`，彻底去掉 CDN 依赖。
3. 用 `sharp`/`squoosh` 产出 `sakura-800.webp` / `sakura-1600.webp` / `sakura-2400.webp` + JPEG 回退，配合 `srcset`/`sizes`；卡片背景用 800px 版本。目标：单张 ≤ 250KB。
4. 若确实想用 CDN，改为 `@<commit-sha>` 或 `@v1` 固定引用，并把 CDN 地址集中到 `data.js` 一处（CSS 里那份改为 CSS 变量注入）。

### 3.2 部署模型二选一（当前是两套叠加）

README 说：

> 服务器只需要拉取 `deploy` 分支…现有 Nginx 和 Cloudflare Tunnel 无需修改。

但代码实现的是 **GitHub Pages 的 SPA 404 重定向方案**（`index.html:15-28` 解码 + `public/404.html:25-44` 重定向到 `/?/engine/`）。这两者不能同时成立：

- 在 Nginx 上，`/engine/` 是否命中 `404.html` 取决于 `error_page` 配置——而这恰恰是"无需修改 Nginx"所否认的。
- 即使命中，用户要经历 **`/engine/` → 404 → JS 重定向 → `/?/engine/` → JS 解码 → `/engine/`** 的往返，多一次请求 + 一次闪烁，且中间 URL 会短暂暴露为 `/?/engine/`。
- 更糟的是，如果 Nginx 没有配置 `error_page 404`，`/engine/` 会直接返回默认 404 页面，站点深链全部失效。

建议：

**方案 A（推荐，纯 Nginx）**——删掉两个内联 hack 脚本，Nginx 加：

```nginx
root /opt/static-site/site;
location / {
  try_files $uri $uri/ /index.html;
  error_page 404 /404.html;
}
location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; }
location = /index.html { add_header Cache-Control "no-cache"; }
location ~* \.(jpg|jpeg|png|webp|avif|svg|woff2)$ { expires 30d; add_header Cache-Control "public"; }
gzip on; gzip_types text/css application/javascript application/json image/svg+xml;
```

`/engine/` 直接返回 `index.html` 且 URL 不变，`main.js` 读 `location.pathname` 正常渲染，零额外请求。

**方案 B（若确实用 GitHub Pages）**——去掉 README 里的 Nginx 部署章节，并在 `public/` 补 `CNAME`。注意当前 `origin/deploy` 分支里**没有 CNAME**，而 CI 用 `force_orphan: true` 每次重写分支；如果自定义域名是靠 GitHub Pages 设置维持的，orphan 部署缺 CNAME 会导致域名配置反复失效。

无论选哪个，README 都应补上真实的 Nginx 配置片段、缓存策略、健康检查与回滚步骤（当前只有 4 行 rsync 命令，且 `--delete` 无任何保护）。

### 3.3 无 favicon、manifest 形同虚设

- 全站没有任何 `<link rel="icon">`，浏览器每次访问都会请求 `/favicon.ico` 得到 404。
- `public/manifest.webmanifest` **没有被任何页面引用**（`index.html` 中无 `rel="manifest"`），等于没接。
- 该 manifest 没有任何 `icons` 字段 → 即使挂上也不满足 PWA 可安装条件。
- `theme_color`/`background_color` 是 `#090909`，页面实际背景是 `#e1e9e4`，`index.html:7` 的 `theme-color` 又是 `#f3f0e8`——三处三种颜色。
- `display: standalone` 意味着 PWA 每次启动都要重新过门禁。

建议：加 SVG favicon（+ `apple-touch-icon`），把 manifest 接入 `<head>`，补齐 192/512 图标，颜色统一到真实主题色；若暂时不做 PWA，直接删除 manifest 以免误导。

### 3.4 首页首屏有可感知的色差闪烁

`index.html:30` 的启动占位页与 `public/404.html:9` 用的是**上一版设计系统的值**：

| 项目     | 占位页/404                | 实际站点            |
| -------- | ------------------------- | ------------------- |
| 背景     | `#f3f0e8`                 | `#e1e9e4`           |
| 强调色   | `#c65f32`                 | `#bf5945`           |
| 正文字体 | `ui-monospace, monospace` | `Plus Jakarta Sans` |
| 标题字体 | `Georgia, serif`          | `Instrument Serif`  |

JS 加载完成后会整体换色换字，产生明显的 FOUC 抖动。建议把这两处的内联样式改为引用与 `src/style.css` 一致的 CSS 变量（或构建时用同一份 token 注入），并把 `theme-color` 同步为 `#e1e9e4`。

---

## 4. P2：交互与无障碍

### 4.1 键盘用户进不去

```html
<!-- src/main.js:35 -->
<input id="entry-slider" type="range" orient="vertical" min="0" max="100" value="0" />
```

```js
// src/main.js:76 —— 需要 >= 85 才解锁
if (value >= 85) triggerUnlock();
```

- `min=0 max=100`，方向键步进为 1 → 键盘用户需按 **85 次** 方向键（或长按重复）才能进入。这是门禁唯一的原生可聚焦控件。
- `orient="vertical"` 是 **Firefox 私有属性**，Chrome/Safari 会忽略它，滑块保持水平：桌面用户水平拖动 → 数值变化，但视觉上拇指向上移动，**操作方向与反馈方向不一致**。
- 输入框 `opacity: 0`，且没有任何 `:focus-visible` 样式 → 键盘聚焦时**完全无可见焦点**。
- 点击胶囊任意位置都会按点击的横向比例直接赋值：**点右端 = 瞬间解锁**，无需滑动。
- 滚轮阈值 `deltaY > 30`（`src/main.js:126`）过低，鼠标一格滚轮就是 100+，等于"随便滚一下就进"，门禁在桌面端形同虚设，也容易误触。

建议重构为"语义按钮 + 手势增强"：

```html
<button class="swipe-capsule" id="enter-button" type="button">
  <span class="swipe-thumb">↑</span><span class="swipe-text">向上滑动进入</span>
</button>
```

- 按钮原生支持 Enter/Space/点击，键盘与读屏用户一次操作即可进入。
- 指针/触摸滑动作为**增强**（`pointerdown/move/up` 统一处理，兼容鼠标与触摸），不再依赖 `input[type=range]`。
- 滚轮进入改为累积位移阈值（如累计 240px）并驱动胶囊进度，而不是 30px 直接触发。

### 4.2 对比度不达标（WCAG AA）

| 令牌                     | 前景    | 背景    | 实测对比度 | 用途                                                      | 结论                   |
| ------------------------ | ------- | ------- | ---------- | --------------------------------------------------------- | ---------------------- |
| `--muted-light: #879790` | #879790 | #e1e9e4 | **2.47:1** | `.index-links > span`、`.project-row small`（11–12px）    | 严重不达标（需 4.5:1） |
| `--accent: #bf5945`      | #bf5945 | 浅纸底  | **≈3.6:1** | `.kicker`(10px)、`.section-label span`、`.tool-groups h2` | 不达标                 |
| `--muted: #5e6d67`       | #5e6d67 | #e1e9e4 | **4.37:1** | 13–14px 正文                                              | 临界不达标             |

建议：`--muted-light` 至少加深到 `#6b7a74`（≈3.4:1）或直接并入 `--muted`；`--accent` 在浅底小字场景改用 `#a34734`（≈5.0:1）；`--muted` 微调至 `#57655f`。深色门禁上的 `rgba(255,255,255,0.45)`（`.gate-foot`）也建议提到 0.6。

### 4.3 缺少动效降级

`src/style.css` 中有无限循环动画（`apple-pulse`、`arrow-bounce`）、大面积 `blur` 滤镜、`scale` 位移与 1.1s 转场，但全文件**没有一处 `prefers-reduced-motion`**。建议：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .entry-gate {
    transition: opacity 0.2s ease;
    transform: none;
  }
  .home-content {
    animation: none;
  }
}
```

### 4.4 其他无障碍缺口

- 解锁后无焦点转移、无 `aria-live` 播报（`triggerUnlock` 只改 class）→ 读屏用户不知道发生了什么。建议解锁后 `focus()` 到 `<main>` 的标题，并加一条 `aria-live="polite"` 状态。
- 导航用 `class="active"` 表示当前页，缺 `aria-current="page"`。
- 语言按钮内容是 "EN"/"中"，无 `aria-label`（读屏只念出两个字母），也无 `hreflang`/`lang` 切换提示。
- 缺 skip link（首页长内容 + 固定头部）。
- `.library-rail` 声明 `cursor: grab` 却**没有实现任何拖拽**（`src/main.js:133-134` 只有滚轮），是误导性 affordance；要么实现 pointer 拖拽，要么去掉该光标。
- `aria-valuetext` 在中文界面也被写成 `${value}%`（`src/main.js:75`），未本地化。

### 4.5 图库轨道劫持页面滚动

```js
// src/main.js:134
rail?.addEventListener(
  'wheel',
  (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      rail.scrollLeft += event.deltaY;
    }
  },
  { passive: false },
);
```

鼠标滚轮几乎总是 `|deltaY| > |deltaX|`，因此**只要光标停在这条轨道上，页面就无法上下滚动**——用户会以为页面卡住。建议仅在轨道确实还能横向滚动、且按住 Shift 或明确横向滚动时才拦截，并配合 `scroll-snap` 已有行为。

### 4.6 胶囊进度反馈被裁切

```css
.swipe-capsule {
  height: 68px;
  overflow: hidden;
  padding: 6px 12px 6px 8px;
} /* :271-284 */
.swipe-thumb {
  width: 54px;
  height: 54px;
  transform: translateY(calc(var(--swipe-progress, 0%) * -0.42));
} /* :292-303 */
```

- 百分比解析基准是**拇指自身高度 54px**（而非胶囊高度），`-42%` ≈ 22.7px 位移。
- 拇指在 6px 内边距的容器里，向上位移超过 ~2px 就会被 `overflow:hidden` 裁掉。

结果：拖到 100% 的过程中，圆形拇指**大部分时间是被切掉顶部的**，进度反馈基本不可见。建议改为"胶囊填充式"反馈：

```css
.swipe-capsule::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, rgba(191, 89, 69, 0.55), rgba(228, 145, 125, 0.35));
  transform: scaleX(var(--swipe-ratio, 0));
  transform-origin: left;
  transition: transform 0.1s linear;
}
```

JS 侧写入 `--swipe-ratio: 0~1` 即可（顺带避免 `calc(百分比 * 数字)` 这种易错写法）。

### 4.7 切语言会重新触发门禁

```js
// src/main.js:57
location.reload();
```

在首页已解锁状态下点语言按钮 → 整页重载 → `state.entered` 重置为 `false` → **用户被重新拦在门禁外**。建议：把 `entered` 存入 `sessionStorage`（同一会话内不再拦截），或改为**不重载**的局部重渲染（`app.innerHTML = render()` 后重新绑定监听）。

---

## 5. P3：文案、国际化与数据一致性

### 5.1 英文模式下仍出现中文

| 位置           | 代码             | 现象                                         |
| -------------- | ---------------- | -------------------------------------------- |
| 门禁大标题     | `src/main.js:31` | ✅ 已用 `text()`，正确                       |
| 门禁图片 `alt` | `src/main.js:25` | ❌ 恒为 `photo.title`（中文）                |
| Landing 图注   | `src/main.js:50` | ❌ `${photo.title}` / `${photo.note}` 恒中文 |
| Works 页 `alt` | `src/main.js:54` | ❌ 恒中文，而同页 `figcaption` 却做了本地化  |
| 子站描述       | `src/main.js:55` | ❌ `${site.description}` 无英文字段          |

修复：`data.js` 的 `photo` 增加 `altZh/altEn`；`subsites` 增加 `descriptionEn`；所有用户可见文本一律走 `text()`。

### 5.2 `subsites` 数据模型把"描述"当"标题"

```js
// src/data.js:4
{ path:'/toy/', name:'TOY LAB', zh:'TOY 实验场', en:'A small lab for AI and internet experiments.', description:'阶段性实验、脚本和可以运行的小想法。', tone:'lab' }
```

```js
// src/main.js:48 —— en 被当作大标题渲染（font: italic clamp(2.2rem,3.8vw,3.8rem)）
<strong>${text(site.zh, site.en)}</strong>
```

英文模式下，卡片大标题会变成一整句 "A small lab for AI and internet experiments."，在 3.8rem 斜体衬线下非常突兀。建议拆成 `titleZh/titleEn` + `descZh/descEn` 四个字段，标题短、描述长。

### 5.3 档案页内容重复 + 死数据

```js
// src/main.js:53
<blockquote>我在网站、自动化工具与跨技术栈实验之间移动。</blockquote>
<p>我在网站、自动化工具与跨技术栈实验之间移动。这里是一个持续生长的个人入口。</p>
```

引言与紧随其后的正文首句**逐字重复**。同时 `src/data.js:1` 的 `profile.statement` / `statementZh` 从未被使用（statement band 的引文是 `src/main.js:50` 内联硬编码的）。建议：把所有长文案收敛到 `data.js` 或独立的 `src/content/*.js`，`main.js` 只负责结构；`statement` 要么用起来，要么删掉。

### 5.4 其他内容层面的待确认项

- `src/data.js:2` 工具分组里的 `['[OI]', 'AI 工具', 'AI tools', 'https://chatgpt.com/']`——`[OI]` 看起来像占位符/脱敏残留，建议改成真实名称（如 "ChatGPT"）。
- `src/data.js:6` 的 `mailto:hello@wwhooo.com` 请确认邮箱真实可用；建议同时给出 `rel="me"` 与更明确的链接文案。
- `projects` 中的 `chaoxing-sign-cli`（签到自动化）放在个人品牌首页显眼位置，涉及第三方平台 ToS 风险，建议评估是否降级展示或调整描述口径。
- `footer` 的 `© 2026`（`src/main.js:20`）硬编码，建议 `new Date().getFullYear()` 或明确接受手动维护。
- 子站页 `WIP / 2026` 也是硬编码年份。

---

## 6. P4：性能

### 6.1 字体加载链

```css
/* src/style.css:1 —— CSS 里的 @import 会串行阻塞：HTML → CSS → @import → 字体 */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:…&family=Instrument+Serif:…&family=Plus+Jakarta+Sans:…&family=Space+Grotesk:…&display=swap');
```

```css
/* src/style.css:22 —— Space Grotesk 只在 Plus Jakarta Sans 失败时才会用到，却加载了 3 个字重 */
--sans: 'Plus Jakarta Sans', 'Space Grotesk', -apple-system, …;
```

建议：

1. 把字体改到 `index.html` 的 `<head>`：`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` + `<link rel="stylesheet" …>`，让浏览器提前发现。
2. 删除 Space Grotesk（或从 `--sans` 里去掉）。
3. 按实际用到的字重裁剪（目前 DM Mono 4 个、Instrument Serif 2 个、Jakarta 4 个，约 10 个字体文件）。
4. 更彻底：自托管 woff2 子集（中文字体不需要，都是拉丁文），可省掉整个第三方往返。

### 6.2 图片

- 1.75MB JPEG 直接作为 LCP 元素（`fetchpriority="high"`，`src/main.js:25`），在移动网络下首屏体验很差。
- 三处 `<img>` 均无 `width`/`height`/`aspect-ratio` → 必然产生 CLS。
- 门禁图在 HTML 里没有 `preload`，发现时机偏晚。
- Landing 的主视觉用了 `loading="lazy"`（`src/main.js:50`），但它是解锁后**立即进入视口**的内容，应该 `eager`。
- 建议：`<link rel="preload" as="image" imagesrcset="…" imagesizes="…">` + 压缩到 ≤250KB + WebP/AVIF + 显式宽高 + `decoding="async"`。

### 6.3 缓存与体积预算

- `assets/index-*.js|css` 带内容哈希，可安全 `immutable` 长缓存——README 的部署文档里没有任何缓存配置，建议补进 Nginx 片段（见 3.2）。
- CI 里建议加一条体积闸门（例如：任一产物 > 300KB 则失败），防止图片再次失控。

---

## 7. P5：工程化与测试

### 7.1 测试测不到真实缺陷

```js
// scripts/test-site.mjs:13-14,23
assert.doesNotMatch(main, /wwhooo-entry/); // 无意义的否定断言
assert.match(main, /entry-slider/); // 断言实现字符串
assert.match(data, /cdn\.jsdelivr\.net\/gh\/ONLYLOVELYKISS/); // 把坏实践锁进测试
```

问题：

- 全是**源码字符串匹配**，重构即碎，且**不可能**发现本文列出的任何一个真实缺陷（例如 2.2 的按钮永不渲染、2.1 的横屏卡死）。
- 第 23 行把"依赖第三方 CDN"写成了必须满足的断言——修 3.1 时会被测试挡住。
- `dist/index.html` 的断言依赖已存在的构建产物，单独运行 `node scripts/test-site.mjs` 在干净克隆上会失败。

建议分层：

1. **单元层**：把视图渲染抽成纯函数 `render(route, lang) → string`，用 `node:test` + `linkedom`/`jsdom` 解析返回值，断言真实 DOM 结构（例如"首页包含 `#lock-entry`"——这条会立刻抓住 2.2）。
2. **集成层**：加 Playwright 冒烟测试——6 条路由均返回 200 且无 console error、门禁可通过键盘与指针解锁、语言切换后页面语言正确、切语言不重新拦截。
3. **质量闸门**：`axe-core` 无障碍扫描、HTML 校验、图片/JS 体积预算、`linkinator` 死链检查（README 声称有链接检查，实际没有）。

### 7.2 README 与实际能力不符

`README.md:29-35` 声称测试会检查"旧版摄影图片路径是否仍然存在"和"双语切换和项目外链"：

- `scripts/test-site.mjs` 中**没有**任何对 `public/images/photography/sakura.jpg` 的断言；
- 也**没有**任何链接可达性检查（只是匹配了 `rel="noopener noreferrer"` 字符串）。

同时 README 完全没有提到：门禁交互、双语机制、主视觉依赖外部 CDN、Nginx 需要 SPA fallback、`deploy` 分支的产物结构。建议重写 README，并明确"站点由 Nginx 还是 GitHub Pages 提供"。

### 7.3 代码组织

- `src/main.js:50` 单行超过 2000 字符（模板字符串全塞一行），无法 review、无法 diff。
- 建议拆分：`src/router.js`、`src/i18n.js`（含 `copy` 与 `text()`）、`src/views/{home,engine,profile,works,subsite,notfound}.js`、`src/interactions/gate.js`、`src/data.js`。
- 引入 ESLint（含 `eslint-plugin-html`/a11y 规则）+ Prettier，并在 CI 加 `format:check`。
- `data.js` 用**位置数组**表达项目（`project[0]`…`project[5]`）非常脆弱，建议改对象字段：

```js
{ name:'wwhooo.com', stack:'PERSONAL HOMEPAGE', period:'2026',
  descZh:'…', descEn:'…', url:'…' }
```

### 7.4 仓库卫生

- 根目录 `404.html`（1041B，内容是启动占位页的旧版）和根目录 `IMG_Sakura.JPG` 都**不会**进入构建（Vite 只处理 `public/`），却仍在 git 中被持续维护（`404.html` 在最近一次提交里还被改过 12 行）——纯无效工作，建议删除。
- `.gitignore` 已正确忽略 `dist`、`node_modules`。
- 建议补：`engines: { "node": ">=22" }`（Vite 7 要求 Node ≥20.19）、`.nvmrc`、`.editorconfig`、`LICENSE`。

### 7.5 CI

`.github/workflows/build.yml` 可改进点：

- 加 `concurrency: { group: deploy, cancel-in-progress: true }`，避免连续 push 时 `force_orphan` 部署互相竞争。
- 用 `actions/checkout`/`setup-node` 的 SHA 固定版本（当前是浮动大版本 tag）。
- 增加质量闸门步骤（体积预算、axe、死链）。
- 失败时 `actions/upload-artifact` 上传 `dist` 便于排查。
- `force_orphan: true` 每次重写 `deploy` 历史 → **无法回滚**。建议改为保留历史，或每次部署打一个 `deploy-<sha>` tag，README 里给出回滚命令。
- **需要核实**：本地 clone 的 `origin/deploy` 停在 `12e2291`（对应 main 的 `b575d30`，2026-10-07 04:12 UTC），而 `origin/main` 已经到 `270c810`，**落后 8 个提交**。本 clone 的最后一次 fetch 时间是 12:38（+0800），之后未再 fetch，因此无法断定线上就是旧的——但这 8 个提交包含整套视觉重构（`src/style.css` +1040 行），**请务必 `git fetch && git log --oneline origin/deploy -3` 确认 CI 是否真的发布成功**。若确实没发布，说明工作流在这几次 push 中失败了（最可能是 `npm test` 里的构建步骤）。

---

## 8. 建议的迭代路线图

**第 1 轮（修缺陷，1–2 小时）**

1. 门禁矮视口/横屏修复（P0-2.1）+ 加键盘可达的兜底入口。
2. 修 `#lock-entry` 渲染条件（P0-2.2）。
3. 未知路由 → 显式 404 视图（P0-2.4）。
4. `git fetch` 核实 `deploy` 分支是否落后，必要时手动触发 workflow（P5-7.5）。

**第 2 轮（定架构，半天）** 5. 决定 Nginx / GitHub Pages 单一路线，删除多余的内联 hack，补 Nginx `try_files` 与缓存配置（P1-3.2）。6. 图片自托管 + 压缩 + `srcset` + 宽高属性，删除 2 份重复副本（P1-3.1、P4-6.2）。7. 每路由 head 元信息（canonical/title/description）或改多入口构建（P0-2.3）。8. favicon + manifest 落地或删除（P1-3.3）。

**第 3 轮（体验与无障碍，半天）** 9. 门禁改为"按钮 + 手势增强"，去掉 `input[type=range]`（P2-4.1）。10. 对比度调优 + `prefers-reduced-motion` + 焦点管理 + `aria-current`（P2-4.2~4.4）。11. 胶囊进度反馈改填充式（P2-4.6）。12. 修 rail 滚轮劫持、语言切换重载、`cursor:grab`（P2-4.5、4.7）。13. 统一启动占位页/404 页的配色与字体（P1-3.4）。

**第 4 轮（工程化收口，1 天）** 14. `main.js` 模块化拆分 + 对象化数据模型（P5-7.3）。15. 测试分层重构（单元 + Playwright + a11y + 体积预算 + 死链）（P5-7.1）。16. 重写 README、清理根目录残留文件、补 engines/editorconfig/LICENSE（P5-7.2、7.4）。17. CI 加并发控制、质量闸门、产物上传、回滚策略（P5-7.5）。

---

## 9. 值得保留的部分

避免只列问题，以下几点做得很好，迭代时不要回退：

- **门禁的概念设计**：把"进入个人空间"具象化为一次主动动作，与"没有登录，只有一次主动进入"的文案高度一致，是整站最有记忆点的设计。
- **`100svh` 的使用**：规避了移动端地址栏高度抖动，比 `100vh` 正确。
- **启动占位页（boot-fallback）**：内联在 HTML 里，首屏不白屏，还带了可用导航，思路正确（只是配色需要与主站对齐）。
- **`rel="noopener noreferrer"`、`fetchpriority`、`scroll-snap`、`overscroll-behavior`** 等细节都已到位。
- **双语架构**（`copy` 字典 + `text()`）方向正确，只是执行不彻底。
- **CSS 设计令牌体系**（`--ink/--paper/--accent/--radius/--shadow` 分层清晰），对比度问题只需调值，不需要重构。
