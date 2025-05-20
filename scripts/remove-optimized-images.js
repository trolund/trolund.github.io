const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../public');

function deleteOptimizedFolders(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.toLowerCase() === 'optimized') {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`🗑️ Deleted: ${fullPath}`);
      } else {
        deleteOptimizedFolders(fullPath);
      }
    }
  }
}

deleteOptimizedFolders(baseDir);
