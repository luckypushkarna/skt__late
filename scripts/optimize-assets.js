const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SRC_DIR = path.join(__dirname, '..', 'src');
const QUALITY = 85;
const MAX_WIDTH = 1920;

// Resolve modules
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error("Error: 'sharp' module is not installed. Please run `npm install sharp` first.");
  process.exit(1);
}

let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch (e) {
  console.error("Error: 'ffmpeg-static' module is not installed. Please run `npm install ffmpeg-static` first.");
  process.exit(1);
}

// 1. Recursive helper to find files in a directory
function getFiles(dir, filterRegex) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath, filterRegex));
    } else if (filterRegex.test(file)) {
      results.push(filePath);
    }
  });
  return results;
}

// 2. Optimize Images
async function optimizeImages() {
  console.log('\n--- Optimizing Images ---');
  const imageRegex = /\.(png|jpg|jpeg)$/i;
  const imageFiles = getFiles(PUBLIC_DIR, imageRegex);

  console.log(`Found ${imageFiles.length} images to optimize.`);
  
  const replacements = {};

  for (const filePath of imageFiles) {
    const ext = path.extname(filePath);
    const relativePath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');
    const newRelativePath = relativePath.replace(new RegExp(`${ext}$`), '.webp');
    const newFilePath = filePath.replace(new RegExp(`${ext}$`), '.webp');

    console.log(`Processing image: ${relativePath}`);

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width && metadata.width > MAX_WIDTH) {
        console.log(`  Resizing from ${metadata.width}px to ${MAX_WIDTH}px width`);
        pipeline = pipeline.resize(MAX_WIDTH);
      }

      // Convert to webp with quality and remove metadata
      await pipeline
        .webp({ quality: QUALITY })
        .toFile(newFilePath);

      const oldSize = fs.statSync(filePath).size;
      const newSize = fs.statSync(newFilePath).size;
      const savings = ((oldSize - newSize) / oldSize * 100).toFixed(1);
      
      console.log(`  Optimized: ${(oldSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB (${savings}% smaller)`);
      
      // Delete original image
      fs.unlinkSync(filePath);
      console.log(`  Deleted original: ${relativePath}`);

      // Track replacement for code replacement step
      replacements[relativePath] = newRelativePath;
    } catch (err) {
      console.error(`  Error processing ${relativePath}:`, err.message);
    }
  }

  return replacements;
}

// 3. Optimize Videos
function optimizeVideos() {
  console.log('\n--- Optimizing Videos ---');
  const videosDir = path.join(PUBLIC_DIR, 'videos');
  if (!fs.existsSync(videosDir)) {
    console.log('No public/videos folder found.');
    return {};
  }

  const videoRegex = /\.mp4$/i;
  const videoFiles = getFiles(videosDir, videoRegex);
  
  // Filter out already optimized videos (if they end with -optimized.mp4)
  const targetVideos = videoFiles.filter(file => !file.endsWith('-optimized.mp4'));

  console.log(`Found ${targetVideos.length} original videos to optimize.`);
  
  const replacements = {};

  for (const filePath of targetVideos) {
    const relativePath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');
    const ext = path.extname(filePath);
    const newRelativePath = relativePath.replace(new RegExp(`${ext}$`), '-optimized.mp4');
    const newFilePath = filePath.replace(new RegExp(`${ext}$`), '-optimized.mp4');

    console.log(`Processing video: ${relativePath}`);
    console.log(`  Running FFmpeg compression... (CRF 23, slow, max 1080p, no audio)`);

    try {
      const args = [
        '-y', // Overwrite output files without asking
        '-i', filePath,
        '-vcodec', 'libx264',
        '-crf', '23',
        '-preset', 'slow',
        '-movflags', '+faststart',
        '-pix_fmt', 'yuv420p',
        '-vf', "scale='min(1920,iw)':-2",
        '-an', // remove audio
        newFilePath
      ];

      const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });

      if (result.status === 0) {
        const oldSize = fs.statSync(filePath).size;
        const newSize = fs.statSync(newFilePath).size;
        const savings = ((oldSize - newSize) / oldSize * 100).toFixed(1);
        console.log(`  Optimized video successfully!`);
        console.log(`  Size: ${(oldSize / (1024 * 1024)).toFixed(2)} MB -> ${(newSize / (1024 * 1024)).toFixed(2)} MB (${savings}% smaller)`);
        
        // Delete original video
        fs.unlinkSync(filePath);
        console.log(`  Deleted original video: ${relativePath}`);

        replacements[relativePath] = newRelativePath;
      } else {
        console.error(`  FFmpeg failed with exit code ${result.status}`);
        if (result.error) console.error(result.error);
      }
    } catch (err) {
      console.error(`  Error processing video ${relativePath}:`, err.message);
    }
  }

  return replacements;
}

// 4. Update Codebase References
function updateCodebaseReferences(imageReplacements, videoReplacements) {
  console.log('\n--- Updating Codebase References ---');
  
  // Also add manual mapping for FF Hero Video.mp4 which was broken in the codebase
  const allReplacements = {
    ...imageReplacements,
    ...videoReplacements,
    'videos/FF Hero Video.mp4': 'videos/hero-background-optimized.mp4'
  };

  const codeFiles = getFiles(SRC_DIR, /\.(tsx|ts|js|jsx|css|json)$/i);
  console.log(`Scanning ${codeFiles.length} files in src/ for references...`);

  let filesUpdated = 0;
  let totalReplacements = 0;

  for (const filePath of codeFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Search and replace each path
    for (const [oldRel, newRel] of Object.entries(allReplacements)) {
      // Create searches for different styles (absolute with leading slash, raw name, etc.)
      const searchTerms = [
        `/${oldRel}`,
        `/${oldRel.replace(/ /g, '%20')}`,
        oldRel,
        oldRel.replace(/ /g, '%20')
      ];

      for (const term of searchTerms) {
        const escapedTerm = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(escapedTerm, 'g');

        if (regex.test(content)) {
          // Determine the replacement term style
          let rep = term.startsWith('/') ? `/${newRel}` : newRel;
          // URL-encode spaces if old was URL-encoded
          if (term.includes('%20')) {
            rep = rep.replace(/ /g, '%20');
          }
          
          content = content.replace(regex, rep);
          modified = true;
          totalReplacements++;
          console.log(`  [Reference Update] In ${path.relative(SRC_DIR, filePath)}: "${term}" -> "${rep}"`);
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesUpdated++;
    }
  }

  console.log(`Completed references update! ${filesUpdated} files modified, ${totalReplacements} references updated.`);
}

// Main Execution Flow
async function main() {
  const start = Date.now();
  console.log('=== STARTING FULL ASSET OPTIMIZATION WORKFLOW ===');
  
  try {
    const imageReplacements = await optimizeImages();
    const videoReplacements = optimizeVideos();
    
    updateCodebaseReferences(imageReplacements, videoReplacements);

    console.log(`\n=== WORKFLOW COMPLETE (Elapsed: ${((Date.now() - start) / 1000).toFixed(1)}s) ===`);
  } catch (err) {
    console.error('Workflow failed:', err);
    process.exit(1);
  }
}

main();
