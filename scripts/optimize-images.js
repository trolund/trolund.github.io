const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const supportedExtensions = ['.jpg', '.jpeg', '.png'];
const publicDir = path.join(__dirname, '../public');

// Define sizes to generate
const sizes = [
  { name: 'small', width: 400 },
  { name: 'medium', width: 800 },
  { name: 'large', width: 1200 },
];

/**
 * Recursively process directories to find and optimize images.
 */
function walkAndOptimize(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkAndOptimize(fullPath);
    } else if (
      entry.isFile() &&
      supportedExtensions.includes(path.extname(entry.name).toLowerCase())
    ) {
      optimizeImage(fullPath);
    }
  }
}

/**
 * Optimize a single image into multiple sizes and save in 'optimized' subfolder.
 */
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
      .toFormat('webp', { quality: 80 })
      .toFile(outputPath)
      .then(() => console.log(`✅ Optimized: ${filePath} → ${outputPath}`))
      .catch((err) => console.error(`❌ Failed: ${filePath}`, err));
  });
}

// Start the optimization process
walkAndOptimize(publicDir);
