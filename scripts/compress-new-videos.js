/**
 * compress-new-videos.js
 *
 * Compresses new source videos from the titanium-narrative folder into the
 * skt_simple_update public/videos directory.
 *
 * Settings: H.264, CRF 26, fast preset, 1080p max, no audio, faststart
 *
 * Usage: node scripts/compress-new-videos.js
 */

const fs   = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch (e) {
  console.error("❌  'ffmpeg-static' not found.");
  process.exit(1);
}

const SRC_DIR = path.join('C:\\', 'Users', 'lucky', 'Desktop', 'New folder (4)', 'titanium-narrative', 'public', 'videos');
const OUT_DIR = path.join(__dirname, '..', 'public', 'videos');

// [sourceFile, outputFile, quality CRF (lower = better)]
const JOBS = [
  { src: 'hero.mp4',              out: 'gallery-hero.mp4',           crf: '26' },
  { src: 'mining-operations.mp4', out: 'gallery-mining.mp4',         crf: '26' },
  { src: 'sustainability-new.mp4',out: 'gallery-sustainability.mp4',  crf: '24' },
  { src: 'sustainability.mp4',    out: 'gallery-sustainability2.mp4', crf: '26' },
];

const COMMON_FLAGS = [
  '-vcodec',  'libx264',
  '-preset',  'fast',
  '-movflags','+faststart',
  '-pix_fmt', 'yuv420p',
  '-vf',      "scale='min(1920,iw)':-2",
  '-an',                      // strip audio → silent loop
];

console.log('=== Compressing New Gallery Videos ===\n');
console.log(`Source : ${SRC_DIR}`);
console.log(`Output : ${OUT_DIR}\n`);

let totalIn  = 0;
let totalOut = 0;

for (const job of JOBS) {
  const srcFile = path.join(SRC_DIR, job.src);
  const outFile = path.join(OUT_DIR, job.out);

  if (!fs.existsSync(srcFile)) {
    console.warn(`⚠️   Source not found, skipping: ${job.src}`);
    continue;
  }

  const srcMB = (fs.statSync(srcFile).size / (1024 * 1024)).toFixed(1);
  console.log(`🎬  ${job.src}  (${srcMB} MB)  →  ${job.out}`);
  console.log(`    CRF ${job.crf}, fast preset, 1080p max, no audio`);

  const args = [
    '-y',
    '-i', srcFile,
    ...COMMON_FLAGS,
    '-crf', job.crf,
    outFile,
  ];

  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });

  if (result.status === 0) {
    const inSize  = fs.statSync(srcFile).size;
    const outSize = fs.statSync(outFile).size;
    const saved   = ((inSize - outSize) / inSize * 100).toFixed(1);
    totalIn  += inSize;
    totalOut += outSize;
    console.log(`✅  Done: ${(inSize / 1048576).toFixed(1)} MB → ${(outSize / 1048576).toFixed(1)} MB  (${saved}% smaller)\n`);
  } else {
    console.error(`❌  FFmpeg failed for ${job.src} (exit ${result.status})\n`);
  }
}

const totalSaved = ((totalIn - totalOut) / totalIn * 100).toFixed(1);
console.log('=== Summary ===');
console.log(`Total input : ${(totalIn  / 1048576).toFixed(1)} MB`);
console.log(`Total output: ${(totalOut / 1048576).toFixed(1)} MB`);
console.log(`Space saved : ${totalSaved}%`);
console.log('\nAll done! Videos saved to public/videos/\n');
