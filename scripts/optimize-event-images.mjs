/**
 * Compress event art into public/img/events/<slug>.avif + .webp (Claude.md §8: AVIF/WebP,
 * ~150 KB each). Drop the source into shikar-management-fest-guidelines/ named after the
 * event, with or without the leading "the" (visionary.jpg, the-visionary.png, The Voice.jpg),
 * then run:  npm run images:events
 */
import { mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const SRC_DIR = 'shikar-management-fest-guidelines';
const OUT_DIR = 'public/img/events';
const WIDTH = 640; // largest card is 236 CSS px wide; 640 covers ~2.7x DPR
const EXTS = ['jpg', 'jpeg', 'png', 'webp'];

const events = JSON.parse(readFileSync('src/data/events.json', 'utf8'));
mkdirSync(OUT_DIR, { recursive: true });

const kb = (path) => `${Math.round(statSync(path).size / 1024)} KB`;
// "The Voice.jpg", "the_voice.png", "voice.jpg" all normalise to match slug "the-voice"
const normalise = (name) => name.toLowerCase().trim().replace(/[\s_]+/g, '-');
const sources = readdirSync(SRC_DIR)
  .filter((f) => EXTS.includes(extname(f).slice(1).toLowerCase()))
  .map((f) => ({ path: join(SRC_DIR, f), key: normalise(f.slice(0, -extname(f).length)) }));
let done = 0;

for (const { slug } of events) {
  const names = [slug, slug.replace(/^the-/, '')];
  const src = sources.find((s) => names.includes(s.key))?.path;
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
