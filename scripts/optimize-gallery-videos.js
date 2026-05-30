/**
 * optimize-gallery-videos.js
 *
 * Generates 3 short, silent, web-optimized looping video clips from
 * the existing hero background video for use in the bento gallery.
 *
 * Output clips (all H.264, CRF 28, 720p max, no audio, faststart):
 *   public/videos/gallery-clip-1.mp4  (0s  – 8s)
 *   public/videos/gallery-clip-2.mp4  (8s  – 16s)
 *   public/videos/gallery-clip-3.mp4  (16s – 24s)
 *
 * Usage: node scripts/optimize-gallery-videos.js
 */

const fs   = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch (e) {
  console.error("❌  'ffmpeg-static' not found. Run: npm install ffmpeg-static");
  process.exit(1);
}

const VIDEOS_DIR = path.join(__dirname, '..', 'public', 'videos');
const SOURCE     = path.join(VIDEOS_DIR, 'hero-background-optimized.mp4');

// Each clip: [outputName, startSeconds, durationSeconds]
const CLIPS = [
  ['gallery-clip-1.mp4',  0,  8],
  ['gallery-clip-2.mp4',  8,  8],
  ['gallery-clip-3.mp4', 16,  8],
];

// ─── Shared FFmpeg flags ───────────────────────────────────────────────────────
const ENCODE_FLAGS = [
  '-vcodec',  'libx264',
  '-crf',     '28',          // quality: 18 (best) → 51 (worst). 28 is good for loops
  '-preset',  'fast',        // balance encode speed vs compression
  '-movflags','+faststart',  // stream-ready: moov atom at front
  '-pix_fmt', 'yuv420p',    // maximum browser compatibility
  '-vf',      "scale='min(1280,iw)':-2",  // cap at 720p width
  '-an',                     // strip audio — silent autoplay loop
];

// ─── Run ───────────────────────────────────────────────────────────────────────
console.log('=== Gallery Video Clip Generator ===\n');

if (!fs.existsSync(SOURCE)) {
  console.error(`❌  Source video not found:\n    ${SOURCE}`);
  process.exit(1);
}

const sourceSize = (fs.statSync(SOURCE).size / (1024 * 1024)).toFixed(2);
console.log(`📹  Source: hero-background-optimized.mp4  (${sourceSize} MB)\n`);

let totalSaved = 0;

for (const [name, start, duration] of CLIPS) {
  const out = path.join(VIDEOS_DIR, name);

  // Skip if already exists and is non-empty
  if (fs.existsSync(out) && fs.statSync(out).size > 0) {
    console.log(`⏭   Skipping ${name} (already exists)`);
    continue;
  }

  console.log(`🎬  Encoding ${name}  [${start}s → ${start + duration}s] ...`);

  const args = [
    '-y',
    '-ss', String(start),
    '-t',  String(duration),
    '-i',  SOURCE,
    ...ENCODE_FLAGS,
    out,
  ];

  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });

  if (result.status === 0) {
    const newSize = fs.statSync(out).size;
    const mb = (newSize / (1024 * 1024)).toFixed(2);
    totalSaved += newSize;
    console.log(`✅  ${name}  →  ${mb} MB\n`);
  } else {
    console.error(`❌  FFmpeg failed for ${name} (exit code ${result.status})`);
    if (result.error) console.error(result.error);
  }
}

console.log(`\n=== Done! Total gallery video size: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB ===`);
console.log('Clips saved to: public/videos/\n');
