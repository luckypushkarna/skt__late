/**
 * optimize-gallery-extreme.js
 *
 * This script extremely optimizes the gallery assets by doing two things for each video:
 * 1. Extracting a beautiful WebP thumbnail frame at 1.0s (scaled to 640px max width).
 * 2. Compressing and downscaling the video to create an ultra-lightweight 480p/540p loop preview
 *    (using CRF 32, 24 fps, no audio, preset slow) specifically for the bento grid cards.
 *
 * This reduces the initial page weight from ~20MB of auto-playing videos to just a few hundred KB
 * of thumbnails and extremely small preview clips, while retaining the high-res versions for the lightbox.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch (e) {
  console.error("❌ 'ffmpeg-static' module is not installed. Run: npm install ffmpeg-static");
  process.exit(1);
}

const VIDEOS_DIR = path.join(__dirname, '..', 'public', 'videos');

const VIDEOS = [
  {
    name: 'gallery-mining-optimized.mp4',
    previewName: 'gallery-mining-preview.mp4',
    thumbName: 'gallery-mining-thumb.webp',
    width: 640,
    crf: '32',
    ss: '1.0'
  },
  {
    name: 'gallery-hero-optimized.mp4',
    previewName: 'gallery-hero-preview.mp4',
    thumbName: 'gallery-hero-thumb.webp',
    width: 640,
    crf: '32',
    ss: '2.0'
  },
  {
    name: 'gallery-sustainability-optimized.mp4',
    previewName: 'gallery-sustainability-preview.mp4',
    thumbName: 'gallery-sustainability-thumb.webp',
    width: 640,
    crf: '32',
    ss: '1.0'
  },
  {
    name: 'gallery-sustainability2-optimized.mp4',
    previewName: 'gallery-sustainability2-preview.mp4',
    thumbName: 'gallery-sustainability2-thumb.webp',
    width: 640,
    crf: '32',
    ss: '1.0'
  }
];

console.log('=== STARTING EXTREME GALLERY OPTIMIZATION ===\n');

let totalOriginalSize = 0;
let totalPreviewSize = 0;
let totalThumbSize = 0;

for (const video of VIDEOS) {
  const fullPath = path.join(VIDEOS_DIR, video.name);
  const previewPath = path.join(VIDEOS_DIR, video.previewName);
  const thumbPath = path.join(VIDEOS_DIR, video.thumbName);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ Source video not found, skipping: ${video.name}`);
    continue;
  }

  const originalSize = fs.statSync(fullPath).size;
  totalOriginalSize += originalSize;
  console.log(`🎬 Processing: ${video.name} (${(originalSize / (1024 * 1024)).toFixed(2)} MB)`);

  // --- Step 1: Extract WebP Thumbnail ---
  console.log(`  📸 Extracting WebP thumbnail at ${video.ss}s...`);
  const thumbArgs = [
    '-y',
    '-ss', video.ss,
    '-i', fullPath,
    '-vframes', '1',
    '-vf', `scale=${video.width}:-1`,
    '-q:v', '80', // High quality webp conversion
    thumbPath
  ];

  const thumbResult = spawnSync(ffmpegPath, thumbArgs);
  if (thumbResult.status === 0) {
    const thumbSize = fs.statSync(thumbPath).size;
    totalThumbSize += thumbSize;
    console.log(`  ✅ Thumbnail generated: ${video.thumbName} (${(thumbSize / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`  ❌ Failed to generate thumbnail:`, thumbResult.stderr ? thumbResult.stderr.toString() : 'Unknown error');
  }

  // --- Step 2: Generate Web-optimized loop preview ---
  console.log(`  ⚡ Generating ultra-lightweight preview clip (${video.width}px, CRF ${video.crf})...`);
  const previewArgs = [
    '-y',
    '-i', fullPath,
    '-vcodec', 'libx264',
    '-crf', video.crf,
    '-preset', 'slow',
    '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p',
    '-r', '24', // limit frame rate to 24fps
    '-vf', `scale=${video.width}:-2`,
    '-an', // strip audio
    previewPath
  ];

  const previewResult = spawnSync(ffmpegPath, previewArgs);
  if (previewResult.status === 0) {
    const previewSize = fs.statSync(previewPath).size;
    totalPreviewSize += previewSize;
    const savings = ((originalSize - previewSize) / originalSize * 100).toFixed(1);
    console.log(`  ✅ Preview generated: ${video.previewName} (${(previewSize / (1024 * 1024)).toFixed(2)} MB) - ${savings}% smaller!\n`);
  } else {
    console.error(`  ❌ Failed to generate preview clip:`, previewResult.stderr ? previewResult.stderr.toString() : 'Unknown error');
  }
}

console.log('=== SUMMARY OF EXTREME OPTIMIZATION ===');
console.log(`Total original videos size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Total preview loop videos:  ${(totalPreviewSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Total WebP thumbnails:     ${(totalThumbSize / 1024).toFixed(1)} KB`);
const totalSavedBytes = totalOriginalSize - totalPreviewSize;
console.log(`Initial page loading footprint reduced by: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB (${((totalSavedBytes / totalOriginalSize) * 100).toFixed(1)}% savings!)\n`);
