import fs from "node:fs/promises";
import path from "node:path";

const FEISHU_BASE_URL = process.env.FEISHU_BASE_URL || "https://open.feishu.cn";
const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;
const OUT_DIR = process.env.FEISHU_OUT_DIR || "knowledge/feishu";
const SPACE_ID = process.env.FEISHU_SPACE_ID || null;
const SPACE_NAME = process.env.FEISHU_SPACE_NAME || null;

function requiredEnv(name, value) {
  if (!value) throw new Error(`Missing env ${name}`);
  return value;
}

function normalizeBaseUrl(input) {
  if (!input) return "https://open.feishu.cn";
  return input.replace(/\/+$/, "");
}

function sanitizeFileName(input) {
  return (input || "untitled")
    .replace(/[\/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readJsonIfExists(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeJson(filePath, data) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function httpJson({ method, url, token, body }) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status} ${res.statusText} for ${url}\n${JSON.stringify(json)}`,
    );
  }
  if (typeof json.code === "number" && json.code !== 0) {
    throw new Error(`API error for ${url}\n${JSON.stringify(json)}`);
  }
  return json;
}

async function getTenantAccessToken({ baseUrl, appId, appSecret }) {
  const cachePath = path.resolve(process.cwd(), ".feishu_token_cache.json");
  const cached = await readJsonIfExists(cachePath);
  if (cached?.tenant_access_token && cached?.expire_at_ms) {
    if (Date.now() < cached.expire_at_ms - 5 * 60 * 1000) {
      return cached.tenant_access_token;
    }
  }

  const url = `${baseUrl}/open-apis/auth/v3/tenant_access_token/internal`;
  const json = await httpJson({
    method: "POST",
    url,
    body: { app_id: appId, app_secret: appSecret },
  });
  const token = json.tenant_access_token;
  const expireSeconds = json.expire;
  if (!token || !expireSeconds) throw new Error("Failed to obtain tenant token");
  await writeJson(cachePath, {
    tenant_access_token: token,
    expire_at_ms: Date.now() + expireSeconds * 1000,
  });
  return token;
}

async function listWikiSpaces({ baseUrl, token }) {
  const items = [];
  let pageToken = undefined;
  for (;;) {
    const qs = new URLSearchParams();
    qs.set("page_size", "50");
    if (pageToken) qs.set("page_token", pageToken);
    const url = `${baseUrl}/open-apis/wiki/v2/spaces?${qs.toString()}`;
    const json = await httpJson({ method: "GET", url, token });
    const data = json.data || {};
    if (Array.isArray(data.items)) items.push(...data.items);
    if (!data.has_more) break;
    pageToken = data.page_token;
  }
  return items;
}

async function listWikiNodes({ baseUrl, token, spaceId, parentNodeToken }) {
  const items = [];
  let pageToken = undefined;
  for (;;) {
    const qs = new URLSearchParams();
    qs.set("page_size", "50");
    if (pageToken) qs.set("page_token", pageToken);
    if (parentNodeToken) qs.set("parent_node_token", parentNodeToken);
    const url = `${baseUrl}/open-apis/wiki/v2/spaces/${spaceId}/nodes?${qs.toString()}`;
    const json = await httpJson({ method: "GET", url, token });
    const data = json.data || {};
    if (Array.isArray(data.items)) items.push(...data.items);
    if (!data.has_more) break;
    pageToken = data.page_token;
  }
  return items;
}

async function listAllWikiNodes({ baseUrl, token, spaceId }) {
  const all = [];
  const queue = [{ parentNodeToken: undefined }];
  while (queue.length > 0) {
    const { parentNodeToken } = queue.shift();
    const nodes = await listWikiNodes({ baseUrl, token, spaceId, parentNodeToken });
    for (const node of nodes) {
      all.push(node);
      if (node?.has_child) {
        queue.push({ parentNodeToken: node.node_token });
      }
    }
  }
  return all;
}

async function fetchDocRawContent({ baseUrl, token, docToken }) {
  const url = `${baseUrl}/open-apis/doc/v2/${docToken}/raw_content`;
  const json = await httpJson({ method: "GET", url, token });
  return json?.data?.content || "";
}

async function fetchDocxRawContent({ baseUrl, token, documentId }) {
  const url = `${baseUrl}/open-apis/docx/v1/documents/${documentId}/raw_content`;
  const json = await httpJson({ method: "GET", url, token });
  return json?.data?.content || "";
}

async function writeNodeMarkdown({ outDir, space, node, content }) {
  const spaceName = sanitizeFileName(space.name || space.space_id);
  const title = sanitizeFileName(node.title || node.node_token);
  const dir = path.resolve(process.cwd(), outDir, spaceName);
  await ensureDir(dir);
  const filePath = path.join(dir, `${title}.md`);
  const frontMatter =
    `---\n` +
    `space_id: "${space.space_id}"\n` +
    `node_token: "${node.node_token}"\n` +
    `obj_type: "${node.obj_type}"\n` +
    `obj_token: "${node.obj_token}"\n` +
    `title: "${String(node.title || "").replace(/"/g, '\\"')}"\n` +
    `---\n\n`;
  await fs.writeFile(filePath, frontMatter + content.trim() + "\n", "utf8");
  return filePath;
}

async function main() {
  const baseUrl = normalizeBaseUrl(FEISHU_BASE_URL);
  const appId = requiredEnv("FEISHU_APP_ID", FEISHU_APP_ID);
  const appSecret = requiredEnv("FEISHU_APP_SECRET", FEISHU_APP_SECRET);
  const token = await getTenantAccessToken({ baseUrl, appId, appSecret });

  let targetSpaces;
  if (SPACE_ID) {
    targetSpaces = [{ space_id: SPACE_ID, name: SPACE_NAME || SPACE_ID }];
  } else {
    const spaces = await listWikiSpaces({ baseUrl, token });
    targetSpaces = spaces;
  }

  if (targetSpaces.length === 0) {
    throw new Error(
      [
        "No accessible wiki spaces found.",
        "This usually means the app/bot has NOT been granted access to any Wiki space.",
        "Fix: add the app as a Wiki space member/admin (or add the bot into a group, then add that group into the Wiki space members).",
        "Then re-run: npm run sync:feishu",
      ].join(" "),
    );
  }

  const results = [];
  for (const space of targetSpaces) {
    const nodes = await listAllWikiNodes({
      baseUrl,
      token,
      spaceId: space.space_id,
    });
    for (const node of nodes) {
      if (!node?.obj_token || !node?.obj_type) continue;
      if (node.obj_type !== "doc" && node.obj_type !== "docx") continue;

      let content = "";
      if (node.obj_type === "doc") {
        content = await fetchDocRawContent({ baseUrl, token, docToken: node.obj_token });
      } else {
        content = await fetchDocxRawContent({
          baseUrl,
          token,
          documentId: node.obj_token,
        });
      }
      const filePath = await writeNodeMarkdown({
        outDir: OUT_DIR,
        space,
        node,
        content,
      });
      results.push({ space: space.space_id, node: node.node_token, filePath });
    }
  }

  const indexPath = path.resolve(process.cwd(), OUT_DIR, "index.json");
  await writeJson(indexPath, {
    generated_at: new Date().toISOString(),
    base_url: baseUrl,
    spaces: targetSpaces.map((s) => ({ space_id: s.space_id, name: s.name })),
    files: results,
  });

  process.stdout.write(
    `Synced ${results.length} docs into ${path.resolve(process.cwd(), OUT_DIR)}\n`,
  );
}

await main();
