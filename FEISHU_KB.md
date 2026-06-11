# 飞书知识库接入（给我读的）

你要的效果是：我们以对话为主做原型迭代，但我能随时“读取/检索”你飞书知识库里的内容。

在这个 IDE 对话环境里，我没法直接登录你的飞书；最稳的方式是把飞书知识库同步成仓库里的本地文件（Markdown），同步后的文件不需要提交到 GitHub（已默认忽略），但我能在对话里直接读取并引用。

## 1. 飞书侧准备

1) 飞书开放平台创建企业自建应用，拿到：
- `FEISHU_APP_ID`
- `FEISHU_APP_SECRET`

2) 开通权限（至少需要能读 Wiki + 文档内容）：
- Wiki：能列空间/列节点
- Doc / Docx：能读 raw content

3) 把应用加到知识库权限里（否则你会拉不到 space/node）：
- 最简单：在 Wiki 空间设置里，把“包含机器人/应用的群”加为管理员/成员

## 2. 本地同步（一次就通）

在项目根目录执行：

```bash
export FEISHU_APP_ID="xxx"
export FEISHU_APP_SECRET="yyy"
npm run sync:feishu
```

同步产物默认写入：
- `knowledge/feishu/`

这个目录已在 `.gitignore` 里忽略，不会被提交到远端。

## 3. 只同步某一个知识空间（可选）

先用同步脚本跑一次拿到可访问的空间列表（或看 `knowledge/feishu/index.json`），然后指定：

```bash
export FEISHU_SPACE_ID="6946843325487912356"
npm run sync:feishu
```

## 4. 我怎么“读懂”

你同步后，直接在对话里说：
- “根据飞书知识库里《xxx》那篇，帮我把首页信息架构调整一下”
- “用知识库里关于定价/履约的规则，改一下支付页文案”

我会从 `knowledge/feishu/` 里检索相关内容再做实现与迭代。
