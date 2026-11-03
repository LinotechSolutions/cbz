/**
 * Writes the generated section of HANDOFF.md: every `null` field in data and
 * content, plus the items the business has not confirmed. Runs after build.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTACT, GROUP, HOURS, UNCONFIRMED } from '../src/data/facts';
import { LINKS } from '../src/data/links';
import { CALCULATORS } from '../src/data/calculators';
import { SUSTAINABILITY } from '../src/data/sustainability';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function walk(value: unknown, path: string, acc: string[]) {
  if (value === null) {
    acc.push(path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${path}[${i}]`, acc));
    return;
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) walk(v, path ? `${path}.${k}` : k, acc);
  }
}

function files(dir: string, ext: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('_')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files(p, ext, acc);
    else if (p.endsWith(ext)) acc.push(p);
  }
  return acc;
}

const dataNulls: string[] = [];
walk({ GROUP, CONTACT, HOURS }, 'facts', dataNulls);
walk(LINKS, 'links', dataNulls);
walk(CALCULATORS, 'calculators', dataNulls);
walk(SUSTAINABILITY, 'sustainability', dataNulls);

const contentNulls: Record<string, string[]> = {};
const contentDir = join(root, 'src', 'content');
for (const f of files(contentDir, '.json')) {
  const rel = relative(contentDir, f).replace(/\\/g, '/');
  const nulls: string[] = [];
  walk(JSON.parse(readFileSync(f, 'utf8')), '', nulls);
  if (nulls.length) contentNulls[rel] = nulls;
}

const counts: Record<string, number> = {};
for (const dir of ['units', 'products', 'properties', 'deals', 'campaigns', 'notices']) {
  const p = join(contentDir, dir);
  try {
    counts[dir] = files(p, '.json').length + files(p, '.md').length;
  } catch {
    counts[dir] = 0;
  }
}

const lines: string[] = [];
lines.push(`_Generated ${new Date().toISOString().slice(0, 10)} by \`npm run handoff\`. Do not edit between the markers._`);
lines.push('');
lines.push('### Content in place');
lines.push('');
for (const [k, v] of Object.entries(counts)) lines.push(`- ${k}: ${v}`);
lines.push('');
lines.push('### Items the business must confirm');
lines.push('');
lines.push('| Item | Owner | Note |');
lines.push('|---|---|---|');
for (const u of UNCONFIRMED) lines.push(`| ${u.item} | ${u.owner} | ${u.note ?? ''} |`);
lines.push('');
lines.push('### Values still null in data modules');
lines.push('');
for (const n of dataNulls) lines.push(`- \`${n}\``);
lines.push('');
lines.push('### Values still null in content');
lines.push('');
const productFiles = Object.keys(contentNulls).filter((k) => k.startsWith('products/'));
const other = Object.keys(contentNulls).filter((k) => !k.startsWith('products/'));
const byUnit: Record<string, number> = {};
for (const f of productFiles) {
  const unit = f.split('/')[1];
  byUnit[unit] = (byUnit[unit] ?? 0) + contentNulls[f].length;
}
for (const [unit, n] of Object.entries(byUnit)) lines.push(`- products/${unit}: ${n} null fields across its product files (pricing, details, images)`);
for (const f of other) lines.push(`- \`${f}\`: ${contentNulls[f].join(', ')}`);
lines.push('');

const START = '<!-- handoff:start -->';
const END = '<!-- handoff:end -->';
const path = join(root, 'HANDOFF.md');
let doc = '';
try {
  doc = readFileSync(path, 'utf8');
} catch {
  doc = `# Handoff\n\n${START}\n${END}\n`;
}
if (!doc.includes(START)) doc += `\n${START}\n${END}\n`;
const before = doc.slice(0, doc.indexOf(START) + START.length);
const after = doc.slice(doc.indexOf(END));
writeFileSync(path, `${before}\n${lines.join('\n')}\n${after}`, 'utf8');
console.log(`HANDOFF.md updated: ${dataNulls.length} data nulls, ${Object.keys(contentNulls).length} content files with nulls.`);
