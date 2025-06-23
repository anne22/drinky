#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function listFiles(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath);
    if (entry.isDirectory()) {
      console.log(relPath + '/');
      listFiles(fullPath, baseDir);
    } else {
      const stats = fs.statSync(fullPath);
      console.log(`${relPath} (${stats.size} bytes)`);
    }
  }
}

listFiles(process.cwd()); 