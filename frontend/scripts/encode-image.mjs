/**
 * One-off: encode one supplied photograph into public/images as WebP.
 * Usage: node scripts/encode-image.mjs <source.png> <name> [width]
 */
import sharp from 'sharp';
const [src, name, width = '1800'] = process.argv.slice(2);
if (!src || !name) {
  console.error('Usage: node scripts/encode-image.mjs <source> <name> [width]');
  process.exit(1);
}
const meta = await sharp(src).metadata();
const buf = await sharp(src).resize({ width: Number(width), withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toBuffer();
await sharp(buf).toFile(`public/images/${name}.webp`);
console.log(name, meta.width, 'x', meta.height, '->', Math.round(buf.length / 1024), 'KB');
