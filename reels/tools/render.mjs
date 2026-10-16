#!/usr/bin/env node
// Rend les reels Beeclou en MP4 (H.264, 1080×1920, 30 fps).
//
// Usage :
//   node tools/render.mjs --reel 1,8        # certains reels
//   node tools/render.mjs --all             # les 61 reels
//   node tools/render.mjs --reel 8 --placeholders   # aperçu avec images manquantes remplacées
//   Options : --music chemin  --no-music  --out dossier
//
// Un reel dont des images manquent n'est PAS rendu (sauf --placeholders, qui produit
// out/reel-NN-apercu.mp4, jamais out/reel-NN.mp4).
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'assets');
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const reels = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/reels.json'), 'utf8'));
const overridesFile = path.join(ROOT, 'data/overrides.json');
const overrides = fs.existsSync(overridesFile) ? JSON.parse(fs.readFileSync(overridesFile, 'utf8')) : {};
const outDir = path.resolve(ROOT, value('out') ?? 'out');
fs.mkdirSync(outDir, {recursive: true});

let wanted;
if (flag('all')) wanted = reels.map((r) => r.n);
else if (value('reel')) wanted = value('reel').split(',').map((x) => parseInt(x, 10));
else {
  console.error('Précisez --reel 1,8 ou --all (voir l’en-tête de tools/render.mjs).');
  process.exit(1);
}

const EXTS = ['png', 'jpg', 'jpeg', 'webp'];
function findImage(n, k) {
  for (const ext of EXTS) {
    const rel = `reel-${String(n).padStart(2, '0')}/plan-${k}.${ext}`;
    if (fs.existsSync(path.join(ASSETS, rel))) return `assets/${rel}`;
  }
  return null;
}
function pick(dir, exts) {
  const d = path.join(ASSETS, dir);
  if (!fs.existsSync(d)) return null;
  const f = fs.readdirSync(d).sort().find((x) => exts.includes(path.extname(x).slice(1).toLowerCase()));
  return f ? `${dir}/${f}` : null;
}
const logo = fs.existsSync(path.join(ASSETS, 'brand/logo.png'))
  ? 'brand/logo.png'
  : pick('brand', ['webp', 'png']) && fs.existsSync(path.join(ASSETS, 'brand/logo-ink.webp'))
    ? 'brand/logo-ink.webp'
    : null;
const music = flag('no-music') ? null : value('music') ?? pick('music', ['mp3', 'wav', 'm4a', 'aac']);
if (!music) console.log('ℹ️  Pas de musique (déposez un fichier libre de droits dans assets/music/).');

console.log('Préparation du bundle Remotion…');
const serveUrl = await bundle({entryPoint: path.join(ROOT, 'src/index.ts'), publicDir: ASSETS});
const browserExecutable = process.env.BROWSER_EXECUTABLE || undefined;

let rendered = 0;
let skipped = 0;
for (const n of wanted) {
  const base = reels.find((r) => r.n === n);
  if (!base) {
    console.error(`Reel ${n} inconnu.`);
    process.exit(1);
  }
  const nn = String(n).padStart(2, '0');
  const ov = overrides[String(n)] ?? {};
  const reel = structuredClone(base);
  reel.plans.forEach((p, i) => {
    const found = findImage(n, i + 1);
    if (found) p.image = found;
    const o = ov.plans?.[String(i + 1)];
    if (o) p.overlay = o;
  });
  if (ov.hook) reel.hook = ov.hook;
  const present = reel.plans.map((p) => fs.existsSync(path.join(ROOT, p.image)));
  const missing = reel.plans.map((p, i) => (present[i] ? null : p.image)).filter(Boolean);

  if (reel.note) console.log(`⚠️  Reel ${nn} : ${reel.note}`);
  if (missing.length && !flag('placeholders')) {
    console.log(`⏭️  Reel ${nn} ignoré, images manquantes : ${missing.join(', ')}`);
    skipped++;
    continue;
  }
  const file = path.join(outDir, missing.length ? `reel-${nn}-apercu.mp4` : `reel-${nn}.mp4`);
  const inputProps = {reel, present, logo, music};
  let lastPct = -1;
  const composition = await selectComposition({serveUrl, id: 'Reel', inputProps, browserExecutable});
  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    outputLocation: file,
    inputProps,
    browserExecutable,
    crf: 18,
    pixelFormat: 'yuv420p',
    onProgress: ({progress}) => {
      const pct = Math.floor(progress * 10) * 10;
      if (pct > lastPct) {
        lastPct = pct;
        process.stdout.write(`  reel ${nn} : ${pct} %\n`);
      }
    },
  });
  if (ov.legende) {
    fs.writeFileSync(path.join(outDir, `reel-${nn}-legende.txt`), ov.legende.trim() + '\n');
  }
  console.log(`✅ ${path.relative(ROOT, file)}${missing.length ? ' (aperçu : images manquantes)' : ''}`);
  rendered++;
}
console.log(`\n${rendered} rendu(s), ${skipped} ignoré(s).`);
