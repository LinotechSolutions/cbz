/* Dumps the navigation data to JSON for the sitemap document. Temporary; safe to delete. */
import { writeFileSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { AUDIENCES, MEGA, LOGIN_ITEMS, OPEN_ACCOUNT_ITEMS, JOURNEYS, OFFSITE, FOOTER } from '../src/data/nav';
import { HOMES } from '../src/data/homes';
import { CLUSTERS as GROUP_CLUSTERS } from '../src/data/group';

const unitsDir = join(process.cwd(), 'src', 'content', 'units');
const units = readdirSync(unitsDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(unitsDir, f), 'utf8')));

const pagesDir = join(process.cwd(), 'src', 'pages');
const walk = (d: string, base = ''): string[] =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name), `${base}/${e.name}`) : [`${base}/${e.name}`]));
const pages = walk(pagesDir).filter((p) => p.endsWith('.astro')).sort();

writeFileSync(
  process.argv[2] ?? 'sitemap-data.json',
  JSON.stringify({ AUDIENCES: AUDIENCES.map((a) => ({ ...a, match: String(a.match) })), MEGA, LOGIN_ITEMS, OPEN_ACCOUNT_ITEMS, JOURNEYS, OFFSITE, FOOTER, HOMES, GROUP_CLUSTERS, units, pages }, null, 2),
);
console.log('ok', pages.length, 'pages', units.length, 'units');
