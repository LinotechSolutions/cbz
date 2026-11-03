# Editing content

Everything a visitor reads lives in two places. You do not need to touch any component to change words, numbers or links.

- `src/content/` holds the collections: one file per business unit, product, property, deal, campaign and notice.
- `src/data/` holds group facts, contact details, links, navigation and calculator settings.

A rule that applies everywhere: **if you do not know a value, set it to `null`.** The site hides anything that is `null`, and the build writes every `null` into `HANDOFF.md` so it can be chased. Never type "TBC" or a guess into a field; "TBC" is hidden too, but it will not appear in the report.

After editing, run `npm run build`. If a file is malformed or a required field is missing, the build stops and tells you which file and which field.

## Business units: `src/content/units/<slug>.json`

| Field | What it does |
|---|---|
| `hero.title`, `hero.lede` | The headline (max 60 characters) and the line under it (max 160) |
| `hero.image` | Path and alt text for the hero photo |
| `primaryCta`, `secondaryCta` | The hero buttons. The primary one also sits in the mobile bar |
| `segments` | The audience chips under the hero, from the site map. Each links to a branch (`#branch-id`) or a product tab |
| `branches` | **The page.** One entry per branch of the site map, in order: `id`, `title`, `line` and `items`. Each item has a `kind`: `form` or `page` (a link card to a page here), `external` (an off-site card, hidden while `href` is `null`), `app` (store badges for `cbz-touch`, `red-sphere` or `ziki-cash`), `products` (the product list for `categories` and/or `productIds`), `calculator` (`mortgage`, `carFinance`, `carInsurance`, `policyQuote` or `loan`), `listings` (the property grid) or `note` (a dashed information card) |
| `categories` | The product groups the `products` items can draw on. The `id` must match the `category` on the unit's products |
| `productsNote` | Small print under a product list |
| `systems` | Names of the systems the unit's forms will integrate with (for the backend handoff only; never shown) |
| `heldEntities` | Companies held beneath this unit, used by the cluster and Group pages |
| `seo` | Page title (max 70) and description (max 160) |

To add a section to a business page, add a branch. To remove one, delete it. The page shows nothing that is not in `branches`.

## Products: `src/content/products/<unit>/<id>.json`

These files are **generated** from the old site's data by `npm run port`, which runs before every build. Edit the source in `src/content/_import/data/` if you want a change to stick, or delete the import and the port step once the business owns the JSON. Each product has a `summary` (max 320 characters), `benefits`, `eligibility`, `audience`, `pricing` and `details`. Insurance, Datvest and Properties are marked `"verified": false` and carry no figures.

## Properties: `src/content/properties/<id>.json`

Title, type (`residential`, `commercial` or `land`), location, status (`for-sale`, `to-let`, `sold`), `price` (text or `null`), summary, a list of `{ label, value }` details, at least one image, and `tourUrl` (a 360° or 3D tour link, or `null`).

## Deals: `src/content/deals/<id>.json`

`unit` (`capital` or `datvest`), `client`, `sector`, `type`, `size` (text or `null`), `year`. The "What we've done" band appears as soon as one deal exists.

## Campaigns: `src/content/campaigns/<id>.json`

`title` (max 80), `body` (max 160), `unit` (a unit slug, or `null` for the home page), `offer` (the big figure, or `null`), `image`, `cta`, `starts` and `ends` as `YYYY-MM-DD`. A campaign shows only between its dates. Up to three show at once.

## Notices: `src/content/notices/<slug>.md`

Front matter: `title`, `date`, `category` (`shareholder`, `customer`, `regulatory`, `operational`), `summary`, `reference`, `urgent`, `document` (a link to the PDF, or `null`). The body is Markdown.

## Facts and links: `src/data/`

- `facts.ts`: group facts, phone numbers, WhatsApp, USSD, email, address, hours, social handles, awards and milestones. `UNCONFIRMED` is the list that prints in the handoff.
- `links.ts`: every link off the site. `null` hides the link.
- `nav.ts`: the header menus and the footer columns.
- `calculators.ts`: limits and defaults for the calculators, the rate tables, and the Agro-Yield season windows.
- `redirects.mjs`: old URLs and where they go now.

## Images

Put final photography in `src/assets/` and reference it from the page that uses it; Astro then produces AVIF and WebP at several sizes. Images referenced by path under `public/` are served as they are. Every image slot has a fixed shape (hero 16:9 on desktop and 4:5 on phones, tiles 4:3, property photos 3:2), so swapping an image never moves the layout.

## Logos

Never recreate a logo in text. Use `<Logo brand="bank" on="light" />`. Use `on="dark"` on navy backgrounds. Ziki Mall has no white version, so it may only sit on a light background.
