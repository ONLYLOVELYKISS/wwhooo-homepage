# wwhooo-homepage

`wwhooo.com` 的个人主页源码。项目使用 Vite 构建静态站点，并通过 GitHub Actions 发布到 `deploy` 分支。

## 结构

- `src/main.js`：页面路由、双语文案和页面结构
- `src/style.css`：响应式视觉样式
- `src/data.js`：工具、项目、联系方式和摄影数据
- `public/IMG_Sakura.JPG`：首页及作品页使用的主视觉图片
- `public/images/photography/sakura.jpg`：历史兼容路径，保留用于旧引用
- `scripts/test-site.mjs`：构建产物、路由、图片和链接检查

## 本地开发

```bash
npm install
npm run dev
```

开发服务器启动后，打开终端输出的本地地址。

## 构建与测试

```bash
npm test
```

该命令会先执行 `vite build`，再检查：

- 首页、工具、档案、作品四个路由
- 主视觉图片是否存在并进入 `dist`
- 旧版摄影图片路径是否仍然存在
- 双语切换和项目外链
- 404 页面、sitemap 和静态站点 fallback

## Debian 部署

服务器只需要拉取 `deploy` 分支，将内容同步到 `/opt/static-site/site`。现有 Nginx 和 Cloudflare Tunnel 无需修改。

```bash
cd /opt/static-site-deploy
git fetch origin deploy
git reset --hard origin/deploy
rsync -a --delete --exclude='.git' ./ /opt/static-site/site/
```
