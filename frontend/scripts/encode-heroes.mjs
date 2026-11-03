/**
 * One-off: encode the three circle-crop hero photographs supplied by the
 * design team into public/images. Usage: node scripts/encode-heroes.mjs <dir>
 */
import sharp from 'sharp';
const src = process.argv[2];
const map = { '23.png': 'hero-digital', '24.png': 'hero-advice', '25.png': 'hero-home' };
for (const [file, name] of Object.entries(map)) {
  const meta = await sharp(`${src}/${file}`).metadata();
  const buf = await sharp(`${src}/${file}`).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 72, effort: 5 }).toBuffer();
  await sharp(buf).toFile(`public/images/${name}.webp`);
  console.log(name, meta.width, 'x', meta.height, '->', Math.round(buf.length / 1024), 'KB');
}
