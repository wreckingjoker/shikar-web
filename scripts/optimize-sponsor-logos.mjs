/**
 * Prepare sponsor logos for the dark Partners marquee: flood-fill the flat background from
 * the image border to transparent (un-mixing anti-aliased edges so no light halo remains),
 * trim, resize to 2x the 96px tile height and write public/img/sponsors/<name>.webp.
 * Drop sources into shikar-management-fest-guidelines/sponsors-logo/, then run:
 *   npm run images:sponsors
 * Logos that already have a transparent background are only trimmed and resized.
 */
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const SRC_DIR = 'shikar-management-fest-guidelines/sponsors-logo';
const OUT_DIR = 'public/img/sponsors';
const HEIGHT = 192; // tile is up to 96 CSS px tall → 2x DPR
const EXTS = ['jpg', 'jpeg', 'png', 'webp'];
const SOLID = 24; // colour distance from the background still treated as fully background
const EDGE = 90; // distance up to which fill continues as a partially transparent edge

mkdirSync(OUT_DIR, { recursive: true });
const kb = (path) => `${Math.round(statSync(path).size / 1024)} KB`;

function removeBackground(data, w, h) {
  const at = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2], data[i * 4 + 3]];
  if (at(0)[3] < 10) return; // already transparent

  const bg = at(0);
  const dist = (i) =>
    Math.hypot(data[i * 4] - bg[0], data[i * 4 + 1] - bg[1], data[i * 4 + 2] - bg[2]);
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);

  while (stack.length) {
    const i = stack.pop();
    if (seen[i]) continue;
    seen[i] = 1;
    const d = dist(i);
    if (d > EDGE) continue;

    const a = d <= SOLID ? 0 : (d - SOLID) / (EDGE - SOLID);
    for (let c = 0; c < 3; c++) {
      // un-mix the background out of the edge pixel's colour
      const v = a ? (data[i * 4 + c] - (1 - a) * bg[c]) / a : 0;
      data[i * 4 + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
    data[i * 4 + 3] = Math.round(a * 255);
    if (d > SOLID) continue; // edge pixels don't spread the fill further

    const x = i % w;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (i >= w) stack.push(i - w);
    if (i < w * (h - 1)) stack.push(i + w);
  }
}

const sources = readdirSync(SRC_DIR).filter((f) =>
  EXTS.includes(extname(f).slice(1).toLowerCase()),
);

for (const file of sources) {
  const src = join(SRC_DIR, file);
  const name = file.slice(0, -extname(file).length).toLowerCase().replace(/[\s_]+/g, '-');
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  removeBackground(data, info.width, info.height);

  const out = join(OUT_DIR, `${name}.webp`);
  const trimmed = await sharp(data, { raw: info }).trim().png().toBuffer();
  await sharp(trimmed)
    .resize({ height: HEIGHT, withoutEnlargement: true })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(out);
  console.log(`${name}: ${src} (${kb(src)}) -> ${out} (${kb(out)})`);
}

console.log(sources.length ? `Optimised ${sources.length} logo(s).` : `No logos in ${SRC_DIR}/.`);
