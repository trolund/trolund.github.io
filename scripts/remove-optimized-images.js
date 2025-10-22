import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helpers to replicate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Start deletion
deleteOptimizedFolders(baseDir);
console.log('✅ All optimized image folders have been removed.');
