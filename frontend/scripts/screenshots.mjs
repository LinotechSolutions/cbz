/**
 * Captures review screenshots of the built site at phone and desktop widths.
 * Usage: node scripts/screenshots.mjs <outDir> [baseUrl]
 * Expects `astro preview` (or any server) at baseUrl, default http://localhost:4321.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.argv[2] ?? 'screenshots';
const base = process.argv[3] ?? 'http://localhost:4321';
mkdirSync(outDir, { recursive: true });

const pages = [
  ['home', '/'],
  ['bank', '/bank'],
  ['properties', '/properties'],
  ['property', '/properties/pomona-north-private-residential-estate'],
  ['red-sphere', '/red-sphere'],
  ['contact', '/contact'],
  ['open-account', '/bank/open-account'],
];
const widths = [
  ['mobile', 390, 844],
  ['desktop', 1280, 800],
];

const browser = await chromium.launch();
for (const [label, w, h] of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    // Runs in the browser: dismiss the consent banner so it does not cover the page.
    await page.evaluate(() => {
      try {
        // eslint-disable-next-line no-undef
        localStorage.setItem('cbz:consent', 'denied');
      } catch {
        /* storage blocked: the banner simply stays in the shot */
      }
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.screenshot({ path: join(outDir, `${name}-${label}.png`), fullPage: true });
    console.log('captured', name, label);
  }
  await ctx.close();
}
await browser.close();
