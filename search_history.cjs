const fs = require('fs');
const path = require('path');

const historyDir = path.join(process.env.HOME, 'Library/Application Support/Trae/User/History');
const targetPrefix = 'file:///Users/duranium/currant/currant/';

function searchHistory(targetPath, keyword) {
  const dirs = fs.readdirSync(historyDir);
  const versions = [];

  for (const dir of dirs) {
    if (dir.startsWith('.')) continue;
    const dirPath = path.join(historyDir, dir);
    const entriesPath = path.join(dirPath, 'entries.json');
    if (!fs.existsSync(entriesPath)) continue;

    try {
      const entriesData = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
      const resource = entriesData.resource;
      if (resource && resource.endsWith(targetPath)) {
        for (const entry of entriesData.entries) {
          const contentPath = path.join(dirPath, entry.id);
          if (fs.existsSync(contentPath)) {
            const content = fs.readFileSync(contentPath, 'utf8');
            if (!keyword || content.includes(keyword)) {
              versions.push({
                timestamp: entry.timestamp,
                date: new Date(entry.timestamp).toISOString(),
                id: entry.id,
                dir: dirPath,
                length: content.length
              });
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }

  versions.sort((a, b) => b.timestamp - a.timestamp); // newest first
  console.log(`\nVersions for ${targetPath} containing "${keyword || ''}":`);
  for (const v of versions.slice(0, 10)) {
    console.log(`- ${v.date} (${v.timestamp}) -> ${path.join(v.dir, v.id)} (length: ${v.length})`);
  }
}

searchHistory('AITab.tsx', 'mockCounselors');
searchHistory('AITab.tsx', 'ChevronLeft');
searchHistory('CounselorList.tsx', '');
