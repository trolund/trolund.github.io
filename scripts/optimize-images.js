const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const publicDir = path.join(__dirname, '../public');

const sizes = [
  { name: 'xxsmall', width: 100 },
  { name: 'xsmall', width: 200 },
  { name: 'small', width: 400 },
  { name: 'medium', width: 800 },
  { name: 'large', width: 1200 },
  { name: 'xlarge', width: 1800 },
];

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

    sharp(filePath)
      .resize({ width })
      .webp({ quality: 80 }) // Use webp() instead of toFormat() for better support
      .toFile(outputPath)
      .then(() => console.log(`✅ Optimized: ${filePath} → ${outputPath}`))
      .catch((err) => console.error(`❌ Failed: ${filePath}`, err));
  });
}

walkAndOptimize(publicDir);
