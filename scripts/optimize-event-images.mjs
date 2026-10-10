/**
 * Compress event art into public/img/events/<slug>.avif + .webp (Claude.md §8: AVIF/WebP,
 * ~150 KB each). Drop the source into shikar-management-fest-guidelines/ named after the
 * event, with or without the leading "the-" (e.g. visionary.jpg or the-visionary.png),
 * then run:  npm run images:events
 */
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC_DIR = 'shikar-management-fest-guidelines';
const OUT_DIR = 'public/img/events';
const WIDTH = 640; // largest card is 236 CSS px wide; 640 covers ~2.7x DPR
const EXTS = ['jpg', 'jpeg', 'png', 'webp'];

const events = JSON.parse(readFileSync('src/data/events.json', 'utf8'));
mkdirSync(OUT_DIR, { recursive: true });

const kb = (path) => `${Math.round(statSync(path).size / 1024)} KB`;
let done = 0;

for (const { slug } of events) {
  const names = [slug, slug.replace(/^the-/, '')];
  const src = names
    .flatMap((n) => EXTS.map((ext) => join(SRC_DIR, `${n}.${ext}`)))
    .find((p) => existsSync(p));
  if (!src) continue;

  const base = sharp(src).resize({ width: WIDTH, withoutEnlargement: true });
  const avif = join(OUT_DIR, `${slug}.avif`);
  const webp = join(OUT_DIR, `${slug}.webp`);
  await base.clone().avif({ quality: 55, effort: 6 }).toFile(avif);
  await base.clone().webp({ quality: 78 }).toFile(webp);
  console.log(`${slug}: ${src} (${kb(src)}) -> avif ${kb(avif)}, webp ${kb(webp)}`);
  done++;
}

console.log(done ? `Optimised ${done} event image(s).` : `No event images found in ${SRC_DIR}/.`);
