import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Helpers to replicate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const publicDir = path.join(__dirname, '../public');

const sizes = [
  { name: 'xxsmall', width: 100 },
  { name: 'xsmall', width: 200 },
  { name: 'small', width: 320 },
  { name: 'medium', width: 640 },
  { name: 'large', width: 1200 },
  { name: 'xlarge', width: 1800 },
];

const qualityByVariant = {
  xxsmall: 72,
  xsmall: 72,
  small: 70,
  medium: 68,
  large: 74,
  xlarge: 78,
};

function walkAndOptimize(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip 'optimized' folders
    if (entry.isDirectory()) {
      if (entry.name.toLowerCase() === 'optimized') continue;
      walkAndOptimize(fullPath);
    } else if (
      entry.isFile() &&
      supportedExtensions.includes(path.extname(entry.name).toLowerCase())
    ) {
      optimizeImage(fullPath);
    }
  }
}

function optimizeImage(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);

  const outputDir = path.join(dir, 'optimized');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  sizes.forEach(({ name, width }) => {
    const outputPath = path.join(outputDir, `${baseName}-${name}.webp`);
    const quality = qualityByVariant[name] ?? 75;

    sharp(filePath)
      .resize({ width })
      .webp({ quality })
      .toFile(outputPath)
      .then(() => console.log(`✅ Optimized: ${filePath} → ${outputPath}`))
      .catch((err) => console.error(`❌ Failed: ${filePath}`, err));
  });
}

// Start the process
walkAndOptimize(publicDir);
console.log('Image optimization complete.');
