# wwhooo-homepage

`wwhooo.com` 的个人主页源码，使用 Vite 构建为静态文件，通过 GitHub Actions 发布到 `deploy` 分支。

## 本地开发

```bash
npm install
npm run dev
```

构建生产文件：

```bash
npm run build
```

## Debian 部署

服务器只需要拉取 `deploy` 分支，将内容同步到 `/opt/static-site/site`。现有 Nginx 和 Cloudflare Tunnel 无需修改。

```bash
cd /opt/static-site-deploy
git fetch origin deploy
git reset --hard origin/deploy
rsync -a --delete --exclude='.git' ./ /opt/static-site/site/
```
