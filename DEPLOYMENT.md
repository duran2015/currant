# 部署指南

本项目是 Vite + React + TypeScript 的纯前端应用，构建产物在 `dist/`。

## 部署到 Vercel（推荐）

1. 把代码推到 GitHub/GitLab/Bitbucket
2. 在 Vercel 里 Import 项目
3. Build & Output 配置
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 环境变量（可选）
   - 如果你后续接入 Gemini：在 Vercel 项目的 Environment Variables 里配置 `GEMINI_API_KEY`

仓库已提供 [vercel.json](./vercel.json) 来做 SPA 兜底（所有路径回落到 `index.html`）。

## 部署到你自己的服务器（静态托管）

### 1) 构建

```bash
npm install
npm run build
```

构建完成后将生成 `dist/` 目录。

### 2) Nginx 示例配置

将 `dist/` 上传到服务器，例如：`/var/www/currant/dist`，然后使用类似配置：

```nginx
server {
  listen 80;
  server_name your-domain.com;

  root /var/www/currant/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

改完后 reload Nginx：

```bash
sudo nginx -t && sudo nginx -s reload
```

### 3) 只想临时跑起来（不推荐长期生产）

```bash
npm install
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```
