const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const supportedExtensions = ['.jpg', '.jpeg', '.png'];
const publicDir = path.join(__dirname, '../public');

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
 * Optimize a single image file and save it as WebP in an 'optimized' subfolder.
 */
function optimizeImage(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);

  const outputDir = path.join(dir, 'optimized');
  const outputPath = path.join(outputDir, `${baseName}.webp`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  sharp(filePath)
    .resize({ width: 1000 }) // Optional: scale down large images
    .toFormat('webp', { quality: 80 })
    .toFile(outputPath)
    .then(() => console.log(`✅ Optimized: ${filePath} → ${outputPath}`))
    .catch((err) => console.error(`❌ Failed: ${filePath}`, err));
}

// Start the optimization process
walkAndOptimize(publicDir);
