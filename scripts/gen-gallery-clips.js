// Generates 3 gallery clips from the hero video
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ff = require('ffmpeg-static');

const src = path.join(__dirname, '..', 'public', 'videos', 'hero-background-optimized.mp4');
const out = path.join(__dirname, '..', 'public', 'videos');

const clips = [
  { name: 'gallery-clip-1.mp4', ss: '0', t: '6',  vf: "scale='min(1280,iw)':-2" },
  { name: 'gallery-clip-2.mp4', ss: '2', t: '8',  vf: "scale='min(1280,iw)':-2,eq=brightness=0.05:contrast=1.1" },
  { name: 'gallery-clip-3.mp4', ss: '0', t: '11', vf: "scale='min(1280,iw)':-2,eq=brightness=-0.03:contrast=1.05" },
];

for (const clip of clips) {
  const dest = path.join(out, clip.name);
  console.log(`Encoding ${clip.name}...`);
  const r = spawnSync(ff, [
    '-y', '-ss', clip.ss, '-t', clip.t, '-i', src,
    '-vcodec', 'libx264', '-crf', '28', '-preset', 'fast',
    '-movflags', '+faststart', '-pix_fmt', 'yuv420p',
    '-vf', clip.vf,
    '-an', dest
  ], { stdio: 'inherit' });

  if (r.status === 0) {
    const mb = (fs.statSync(dest).size / (1024 * 1024)).toFixed(2);
    console.log(`Done: ${clip.name} → ${mb} MB`);
  } else {
    console.error(`Failed: ${clip.name}`);
  }
}
console.log('All clips generated.');
