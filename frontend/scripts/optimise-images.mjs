/**
 * One-off: re-encode the placeholder photos under public/images so none is
 * wider than 1600px or heavier than it needs to be. Final photography should
 * go through src/assets and the Astro image pipeline instead.
 * Usage: node scripts/optimise-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const roots = ['public/images', 'public/images/accounts'];
let before = 0;
let after = 0;
for (const dir of roots) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory() || extname(name).toLowerCase() !== '.webp') continue;
    const input = readFileSync(p);
    before += input.length;
    // Heroes render at most ~1000px wide (52% of a 1920px viewport is clipped further by the diagonal).
    const out = await sharp(input).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 60, effort: 5 }).toBuffer();
    if (out.length < input.length) {
      writeFileSync(p, out);
      after += out.length;
    } else {
      after += input.length;
    }
    console.log(`${name}: ${Math.round(input.length / 1024)} KB -> ${Math.round(Math.min(input.length, out.length) / 1024)} KB`);
  }
}
console.log(`Total ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`);
