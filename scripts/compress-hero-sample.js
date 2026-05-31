/**
 * compress-hero-sample.js
 *
 * Compresses the heavy FF Hero Video sample.mp4 (~48MB)
 * into a highly optimized, high-fidelity web video (~5-7MB) using ffmpeg-static.
 *
 * Settings:
 * - H.264 Video Codec
 * - CRF 24 (Perfect medium-high quality sweet spot for web background videos)
 * - preset fast (High compression efficiency with standard render times)
 * - movflags +faststart (Allows the video to start playing immediately in the browser without lagging or waiting to download the whole file)
 * - scale to 1080p maximum
 * - strip audio (completely removes audio channels, saving additional bandwidth and complying with auto-play policies)
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch (e) {
  console.error("❌  ffmpeg-static not found in node_modules.");
  process.exit(1);
}

const VIDEO_PATH = path.join(__dirname, '..', 'public', 'videos', 'FF Hero Video sample.mp4');
const OUT_PATH = path.join(__dirname, '..', 'public', 'videos', 'FF Hero Video sample-optimized.mp4');

if (!fs.existsSync(VIDEO_PATH)) {
  console.error(`❌  Source video not found: ${VIDEO_PATH}`);
  process.exit(1);
}

const initialSize = fs.statSync(VIDEO_PATH).size;
const initialMB = (initialSize / (1024 * 1024)).toFixed(2);
console.log(`📹  Compressing: FF Hero Video sample.mp4 (${initialMB} MB)`);
console.log(`⚡  Optimizing parameters: H.264, CRF 24, faststart, scale=1080p, silent...`);

const args = [
  '-y',
  '-i', VIDEO_PATH,
  '-vcodec', 'libx264',
  '-preset', 'fast',
  '-crf', '24',
  '-movflags', '+faststart',
  '-pix_fmt', 'yuv420p',
  '-vf', "scale='min(1920,iw)':-2",
  '-an',
  OUT_PATH
];

const start = Date.now();
const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
const elapsed = ((Date.now() - start) / 1000).toFixed(1);

if (result.status === 0) {
  const finalSize = fs.statSync(OUT_PATH).size;
  const finalMB = (finalSize / (1024 * 1024)).toFixed(2);
  const spaceSaved = ((initialSize - finalSize) / initialSize * 100).toFixed(1);
  console.log(`\n✅  Compression Successful! (Time: ${elapsed}s)`);
  console.log(`📈  Old Size: ${initialMB} MB`);
  console.log(`📉  New Size: ${finalMB} MB`);
  console.log(`🎉  Space Saved: ${spaceSaved}% smaller`);
  console.log(`💡  Optimized version stored at: public/videos/FF Hero Video sample-optimized.mp4`);

  // Optionally overwrite or replace the original to avoid confusion
  try {
    fs.renameSync(OUT_PATH, VIDEO_PATH);
    console.log(`🔄  Overwrote original 'FF Hero Video sample.mp4' with the optimized version.`);
  } catch (err) {
    console.error("⚠️   Could not overwrite original file, optimized file is still available.");
  }
} else {
  console.error(`❌  FFmpeg failed with exit code ${result.status}`);
}
