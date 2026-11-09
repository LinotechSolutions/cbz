# Handoff

The frontend is complete and static. Nothing on the public site needs a server to render. The items below need either a backend, a vendor, or a decision from the business before launch.

## Server-side work (typed interfaces with mocks in place)

| Interface | File | Mock behaviour | Backend to provide |
|---|---|---|---|
| `submitForm(unit, formId, data)` | `src/lib/submitForm.ts` | Resolves after 700ms with a reference; `?mockfail=1` makes it fail | POST endpoint that validates with the same Zod schemas (`src/lib/forms.ts`), routes by `unit` to that unit's mailbox, adds CAPTCHA, returns a reference |
| `draftStore` | `src/lib/draftStore.ts` | sessionStorage | Redis-backed drafts keyed by form and session; never store ID or account numbers (`NEVER_STORE`) |
| `track(event, props)` | `src/lib/analytics.ts` | Console in dev, queued until consent | Analytics vendor tag, wired through `setSink()`; only after consent |
| Chatbot | `src/islands/ChatLauncher.tsx` | Offers WhatsApp, phone and email | Load the chatbot module only when the panel opens |
| Property listings | `src/content/properties/*.json` | 12 draft listings with placeholder photos and no prices | Real listings, prices and photography, or a feed into the collection |
| Deals (track record) | `src/content/deals/` | Empty, band hidden | Datvest and CBZ Capital transactions |
| Campaigns | `src/content/campaigns/` | Empty, band hidden | Marketing artwork and copy per unit |
| Rate tables | `src/data/calculators.ts` | `rates: null`, calculators say "Indicative rates coming soon" | CBZ Insurance and CBZ Life rate bands |

## Site map actions and the systems behind them

Every solid box on the site map is a page or a form; every grey box is an off-site link that stays hidden until its URL is set in `src/data/links.ts` or the unit's `actions`. The forms post through `submitForm` and will need routing to these systems:

| Unit | Forms | System |
|---|---|---|
| CBZ Insurance | Request quote, Insure now (premium by direct debit or mobile money), Submit claim, Policy changes, Call me back | SSP Pure, ICECASH, Flex Cube |
| CBZ Life | Get a quote, Take cover, Submit claim, Talk to an agent; Pay online explains CBZ Touch, internet banking and USSD and takes no payment on the site | Life Central |
| Red Sphere | Enquire about financing; Apply for a loan goes to rs.cbz.co.zw; Zeex invoice discounting link pending | Red Sphere portal |
| Agro-Yield | Apply for farming finance, Enquire now; Register as a farmer and Explore ATDC links pending | Farmer onboarding portal |
| Others | Call me back per unit, Insurance audit and Get a quote (Risk Advisory), Schedule viewing and Call back (Properties) | Unit mailboxes |

## Decisions and assets still outstanding

- Official App Store and Google Play badge artwork (`src/components/StoreBadges.astro` uses neutral buttons).
- New personal internet banking URL, ZSE link, CBZ Properties managed-client sign-in. (App Store and Google Play links for CBZ Touch, Red Sphere and ZikiCash are in; property cards go to the CBZ Properties listings on Propertybook.)
- Final photography. Every image slot has a fixed ratio, so swapping needs no layout change. Put final images in `src/assets/` and pass the import to `<ResponsiveImage>` to get AVIF and WebP.
- Unit mailboxes for form routing, from the marketing managers.
- IPEC, SECZIM and broker registration lines (`regulator` in each unit JSON).
- CBZ Custodial Services has no page; it appears on the Banking cluster page and About.

## Performance headroom

Gzipped JavaScript is about 66KB on the home page and 68KB on unit pages against the 70KB budget. React's runtime is 57KB of that. If more interactivity is added, or the budget needs margin, switching the islands to Preact through `@astrojs/preact` with `compat` keeps the same component code and removes roughly 50KB.

Form pages carry the Zod validator as well (about 78KB); they are outside the home and content-page budget but worth knowing.

## Seasonal banner

`AGRO_SEASONS` in `src/data/calculators.ts` holds placeholder windows (summer: August to January, winter: February to July). Agro-Yield to confirm dates and copy.

<!-- handoff:start -->
_Generated 2026-11-09 by `npm run handoff`. Do not edit between the markers._

### Content in place

- units: 10
- products: 136
- properties: 12
- deals: 0
- campaigns: 0
- notices: 7

### Items the business must confirm

| Item | Owner | Note |
|---|---|---|
| Branch hours (Mon to Fri 08:00 to 15:00, Sat 08:00 to 13:00) | Retail Banking |  |
| "46 years" and "Over 60 branches" claims | Marketing | Hidden until confirmed. |
| Mortgage term limits (2 to 10 years used in the calculator) | CBZ Bank |  |
| Car finance term limits (1 to 5 years used in the calculator) | CBZ Bank |  |
| Unit mailboxes for form routing | Marketing managers |  |
| Final photography for heroes and tiles | Marketing |  |
| Campaign artwork and copy | Marketing |  |
| Leadership profiles per unit | Each unit |  |
| Objectives and customer segmentation per unit | Marketing |  |
| Property listings, prices and photography | CBZ Properties |  |
| FAQ answers on the Bank, Insurance, Properties, Datvest and Capital pages | Each business unit | Drafted from the product data and form copy; each unit to confirm or replace the five questions. |
| Datvest and CBZ Capital track record (deals) | Datvest, CBZ Capital |  |
| Car insurance and life policy rate tables | CBZ Insurance, CBZ Life |  |
| Chatbot provider and endpoint | Digital |  |
| Analytics vendor and tag | Digital |  |
| Notices content (the six ported notices are sample content) | Corporate Communications |  |
| CBZ Bank calls to action (site map says "to be confirmed"; Open an account, Apply for a loan and Call me back are in place) | CBZ Bank |  |
| Board of directors: names, roles and photos | Corporate Affairs |  |
| Sustainability: Grievance Procedure PDF, Grievance Resolution Form PDF, grievance mailbox, and the reports to publish | Sustainability | src/data/sustainability.ts; links are hidden until set. |
| Off-site link: property management sign-in | Digital, CBZ Properties |  |
| Zeex invoice-discounting wording and customer journey on the Red Sphere page | Red Sphere Finance and Zeex | Both parties to approve. Link to zeex.co.zw is live. |
| ATDC button placement on the Agro-Yield page (Supply chain, commodity trading or a Group businesses area) | CBZ Agro-Yield | Placed in Choose your service and in its own Explore ATDC section, linking to africatdc.com. Confirm or move. |
| Integrations behind the forms: SSP Pure, ICECASH and Flex Cube (Insurance), Life Central (Life) | Digital | Recorded on each unit JSON under "systems"; nothing is wired yet. |

### Values still null in data modules

- `facts.GROUP.yearsOfService`
- `facts.GROUP.branchCount`
- `facts.CONTACT.dpoEmail`
- `facts.CONTACT.tipOffs.hotline`
- `facts.CONTACT.tipOffs.email`
- `facts.CONTACT.tipOffs.web`
- `facts.CONTACT.foundationEmail`
- `links.internetBanking.newPersonal`
- `links.zse`
- `links.propertiesSite`
- `calculators.mortgage.price.default`
- `calculators.mortgage.deposit.default`
- `calculators.mortgage.ratePct.default`
- `calculators.carFinance.price.default`
- `calculators.carFinance.deposit.default`
- `calculators.carFinance.ratePct.default`
- `calculators.loan.price.default`
- `calculators.loan.deposit`
- `calculators.loan.ratePct.default`
- `calculators.carInsurance.value.default`
- `calculators.carInsurance.rates`
- `calculators.policyQuote.value.default`
- `calculators.policyQuote.rates`
- `sustainability.grievance.documents[0].href`
- `sustainability.grievance.documents[1].href`
- `sustainability.grievance.email`

### Values still null in content

- products/agro-yield: 28 null fields across its product files (pricing, details, images)
- products/bank: 191 null fields across its product files (pricing, details, images)
- products/capital: 60 null fields across its product files (pricing, details, images)
- products/cbz-life: 42 null fields across its product files (pricing, details, images)
- products/datvest: 162 null fields across its product files (pricing, details, images)
- products/insurance: 162 null fields across its product files (pricing, details, images)
- products/properties: 162 null fields across its product files (pricing, details, images)
- products/red-sphere: 48 null fields across its product files (pricing, details, images)
- products/risk-advisory: 60 null fields across its product files (pricing, details, images)
- `properties/bloomingdale-master-luxury-clusters.json`: price, tourUrl
- `properties/cbz-centre-and-suburban-office-parks.json`: price, tourUrl
- `properties/commercial-land-subdivisions-and-light-industrial.json`: price, tourUrl
- `properties/diaspora-turnkey-home-build-scheme.json`: price, tourUrl
- `properties/eco-friendly-sustainable-green-enclaves.json`: price, tourUrl
- `properties/flexible-business-incubators-and-shared-workspaces.json`: price, tourUrl
- `properties/fully-serviced-residential-stands.json`: price, tourUrl
- `properties/middle-income-suburban-housing-developments.json`: price, tourUrl
- `properties/modern-medical-chambers-and-specialist-clinics.json`: price, tourUrl
- `properties/neighborhood-retail-convenience-hubs.json`: price, tourUrl
- `properties/pomona-industrial-logistics-and-warehouse-park.json`: price, tourUrl
- `properties/pomona-north-private-residential-estate.json`: price, tourUrl
- `units/cbz-foundation.json`: secondaryCta, productsNote

<!-- handoff:end -->
