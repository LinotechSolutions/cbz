/**
 * Writes the thin page file for each business unit. Every unit page is the
 * UnitLayout driven by its JSON; nothing else lives in the page file.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const pages = [
  ['bank', 'bank'],
  ['red-sphere', 'red-sphere'],
  ['properties/index', 'properties'],
  ['capital', 'capital'],
  ['datvest', 'datvest'],
  ['cbz-life', 'cbz-life'],
  ['insurance', 'insurance'],
  ['risk-advisory', 'risk-advisory'],
  ['agro-yield', 'agro-yield'],
];

for (const [route, id] of pages) {
  const up = '../'.repeat(route.split('/').length);
  const src = `---
import { getEntry } from 'astro:content';
import UnitLayout from '${up}layouts/UnitLayout.astro';

const unit = (await getEntry('units', '${id}'))!.data;
---

<UnitLayout unit={unit} />
`;
  const file = join('src', 'pages', `${route}.astro`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, src, 'utf8');
  console.log('wrote', file);
}
