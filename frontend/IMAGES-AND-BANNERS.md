# CBZ Holdings website: pictures and banner design

A companion to `NAVIGATION-FLOW.md`. Where that document lists every page and
button, this one lists every photograph, logo and banner: what each picture
shows, where it appears, how the banners are built, and what photography is
still needed. Taken from the built site on 11 November 2026 (`main` at
`1c0e988`).

How to read this document

- Section 1 is the design language: the banner layouts and the recurring
  ways a photograph is framed (red arcs, curved edges, navy and red discs).
- Section 2 is the image library: every file in `public/images` and
  `public/og`, with size, content and every place it is used.
- Section 3 goes page by page: which pictures each page shows and in which
  frame.
- Section 4 covers logos and brand marks.
- Section 5 is the photo brief: the exact sizes and crops to supply.
- Section 6 lists gaps and placeholders.
- Pixel sizes are width × height. "Composed" means the file already contains
  the white space and red arc, so the page places it as-is.

Brand rules that apply to every picture

- Only two brand colours touch photography: CBZ red `#E4002B` and CBZ navy
  `#002554` (dark navy `#001736` for the header and shades). Logo artwork
  keeps its master colours and is never recoloured.
- No portrait of a named real person is generated. Leadership cards show
  initials in a red and navy ring until Corporate Affairs supplies
  photographs.
- Every photograph is `.webp`, served from `public/images`, and most are
  1000 px on the long side; the three split heroes are 1600 × 800 and the
  Personal home hero is 1672 × 941.

---

## 1. Design language

### 1.1 The three banner layouts

| Layout | Where | How it is built |
| --- | --- | --- |
| **Split banner, white left and photograph right** | Personal, Business and School homes (`AudienceHome.astro`); the nine business unit pages (`Hero.astro`, `variant="split"`); Diaspora (`diaspora.astro`). | A two-column grid, copy on the left in a column no wider than half the page, photograph on the right bleeding to the window edge. On desktop the columns are 5 : 7 and the banner is at least 520 px tall (600 px on the homes); on phones the photograph sits under the copy at 4 : 3 (16 : 10 on the homes). The photograph is anchored to its right edge so the subject stays in view as the window narrows. The unit version carries a breadcrumb, a red-dash eyebrow with the unit name, the title, the lede, a red primary and a navy outline secondary button, and three short progress marks. The homes carry the title with the group name in red and one red menu button. |
| **Navy panel** | Cluster pages (Banking, Insurance, Investments, Farm), The Group, CBZ Foundation (`Hero.astro`, default variant). | A rounded dark navy panel inside the page container (full-bleed with rounded bottom corners on phones), the photograph filling it edge to edge, a navy gradient over the photograph (left to right on desktop, bottom to top on phones) so white copy reads on the left, the logo in white above the title, and room for a frosted glass chip on the right that no page uses yet. Minimum height 560 px. The photograph is positioned 70 % across so the subject sits right of centre. |
| **Photograph with discs** | Sustainability. | White banner with the copy and a tab row on the left; on the right a photograph with a large navy disc and a red disc (480 px) breaking out of its corner and a one-line quote over it. |

Pages without a banner photograph (a plain heading on white): Explore our solutions, Calculators, Log in, Contact us, Latest from CBZ, notice pages, Security, Sitemap, Business conditions, Privacy policy, Tip-offs, Raise a grievance, every form page, 404.

### 1.2 The composed hero photograph

The unit split banner expects a **composed** file: a 2 : 1 image whose left half is pure white and whose right half holds the subject inside a circle with a red arc on its left edge and the navy edge of the arc at the bottom right. The page does nothing to the picture apart from anchoring it right; the white half is what lets the copy column and the photograph meet without a seam. The same recipe, with the arc drawn in red and navy over a blurred city, makes the Personal home hero. Three composed files exist today and are shared by all nine units (see 2.1).

### 1.3 Recurring photo treatments

| Treatment | Where it appears | What it looks like |
| --- | --- | --- |
| **Red arc, top left** | Product cards; property listing cards; the About photograph on every unit page. | A thick red ring (16 to 18 px) whose centre sits off the top-left corner so only a quarter arc shows, over the photograph. On the About picture the arc is red on its top and left only. |
| **White curved edge** | Product cards. | A white ellipse rising from the bottom of the photograph so the picture ends in a convex curve, with a floating white icon badge sitting on the join. Cards with no photograph show a pale navy wash instead at 4 : 1. |
| **Slanted journey card** | The journey carousel on the three homes. | A 5 : 6 portrait card clipped to a slanted shape with rounded corners, the photograph behind a navy gradient rising from the bottom, a red arc curling out of the top-left corner, a white tag at the top right, a red icon disc, question, promise and a white pill. |
| **Red curved edge on a link card** | Link cards with a photograph on unit pages (for example Account opening form on Bank). | The photograph fills the left of the card and a white ellipse with a 10 px red left edge cuts it off, so the copy sits on white beside a curved red line. |
| **Navy and red discs** | Feature cards (Take cover, Submit a claim, Pay online, Talk to an agent, Schedule a viewing, Request an insurance audit, Get a quote on Risk Advisory); the Meet the team photograph; the Sustainability banner. | Two overlapping discs, navy behind and red in front, breaking out of the top-left corner of the photograph (260 px on feature cards, 420 px on the team photograph, 480 px on Sustainability). Feature cards add a white icon disc at the top right. |
| **Logo plate** | The About and Meet the team photographs on unit pages. | The unit's full-colour logo on a small white plate with a soft shadow, bottom left on About and top right on Meet the team. The team photograph also has one rounded corner enlarged to 80 px. |
| **Photo in a circle** | The FAQ "Need help?" column on unit pages. | The unit photograph cropped to a circle (up to 300 px) with a ring drawn just outside it. |
| **Photo behind a white panel** | The Learn more rail on the homes and on Latest from CBZ. | A category photograph (4 : 3, 16 : 10 on wide screens) with the article's white text panel over its lower part. |
| **Ring portrait** | Board and executive charts (The Group and every unit's Meet the team). | A circle with a 4 px conic ring, red for three quarters and navy for the rest, holding the portrait or, until photographs arrive, the person's initials on pale navy. Each card also has a small red disc with a navy shadow in its top-left corner. |
| **Red corner disc** | Grievance steps on Sustainability. | A red 80 px disc breaking out of the card's top-left corner. |
| **Store badges** | Digital cards on the homes, Download the app on Red Sphere, Cards and digital on Bank, Log in. | App Store and Google Play badges rendered by `StoreBadges.astro` (no image files). |

---

## 2. Image library

All sizes are the file's pixels; most slots crop the picture (section 5).

### 2.1 Composed hero files (white left, subject in a circle right)

| File | Size | What it shows | Used on |
| --- | --- | --- | --- |
| `/images/hero-family.webp` | 1672 × 941, 58 KB | A family of four in red and navy clothes looking up and ahead against a blurred city, a red and navy arc drawn over them; the left half fades to white. | Personal home hero. |
| `/images/hero-digital.webp` | 1600 × 800, 66 KB | A young woman with red braids in a navy shirt smiling at her phone on a street, inside the circle with the red arc. | Hero on CBZ Bank, Red Sphere, CBZ Life and Datvest. |
| `/images/hero-advice.webp` | 1600 × 800, 40 KB | A man in a navy suit and glasses at a laptop reading a sheet headed "Risk assessment", inside the circle. | Hero on CBZ Insurance, CBZ Risk Advisory, CBZ Capital and CBZ Agro-Yield; also the Request an insurance audit feature card on Risk Advisory. |
| `/images/hero-home.webp` | 1600 × 800, 54 KB | A woman in a camel jacket holding up house keys in front of a modern house, inside the circle. | Hero on CBZ Properties; the "Need office or warehouse space?" journey card on the Business home; the "Building a new block?" card on the School home. |

### 2.2 Square and landscape photographs

| File | Size | What it shows | Used on |
| --- | --- | --- | --- |
| `/images/cbz-banking.webp` | 1000 × 1000, 36 KB | A relationship manager in a navy blazer talking to a client across a desk in a bright branch lobby. | Banking cluster hero; FAQ photo on Bank; Talk to an agent feature card on CBZ Life; Submit a claim feature card on Insurance; "Taking card payments?" card on the Business home; Learn more rail photo for customer notices; product cards Current Account (Corporate) and others. |
| `/images/cbz-banking-branch.webp` | 1000 × 623, 33 KB | A CBZ Bank campaign tile: "More time to get the fees sorted", extended hours, with a photograph of a teller handing cash to a customer at a fees counter, inside a red and navy circle, with the CBZ Bank logo. | About photograph on Bank; default FAQ photo; Learn more rail photo for operational notices; second photograph on every property listing. Because it carries campaign copy and dates (2 to 16 September 2026) it should be replaced before launch. |
| `/images/cbz-payments.webp` | 1000 × 1000, 48 KB | A shop owner in a navy blazer and red print blouse taking a card payment on a handheld terminal at a café counter. | About photograph on Red Sphere; Pay online feature card on CBZ Life; Premium payment card on Insurance; Banking panel on Diaspora; "Running a small business?" card on the Personal and Business homes; "Collecting school fees?" on the School home; Agro Commodity Trading product card. |
| `/images/cbz-protection.webp` | 1000 × 1000, 84 KB | Three generations of a family outside a brick home in the countryside at golden hour. | Insurance cluster hero; About photograph on Insurance; Submit a claim feature card on CBZ Life; Get a quote feature card on Risk Advisory; "Protecting your premises and stock?" card on the Business home; "Insuring the school buildings?" on the School home; Learn more rail photo for security notices; Agro Supply Chain product card. |
| `/images/cbz-wealth.webp` | 1000 × 1000, 25 KB | A man in a navy suit at an office window looking out over a city skyline at dusk. | Investments cluster hero; About photograph and FAQ photo on Datvest; Investing panel on Diaspora; "Thinking about tomorrow?" on the Personal home; "Surplus cash to put to work?" on the Business home; "Investing school funds?" on the School home; Learn more rail photo for shareholder notices; Fixed Deposit and Private Banking product cards. |
| `/images/cbz-agriculture.webp` | 1000 × 1000, 97 KB | A smallholder farmer in a blue shirt standing in a maize field at sunrise holding a handful of soil. | Farm cluster hero; About photograph on Agro-Yield; Sustainability banner; "Farming this season?" on the Personal home; "Farming at scale?" on the Business home; "Running a school farm?" on the School home; Agro Farming and Agro Enterprise product cards. |
| `/images/cbzpicture1.webp` | 1000 × 500, 23 KB | A young man in a denim jacket outside "Mbare Brews & Co." holding up his phone and a bank card. | The Group hero (captioned as the head office, which it is not); CBZ Foundation hero; the philanthropy cluster image; Learn more rail photo for regulatory notices; third photograph on every property listing. |
| `/images/insurance-car.webp` | 1000 × 558, 73 KB | A woman beside a blue SUV in the driveway of a modern house under jacarandas. | "Bought a car?" on the Personal home; Comprehensive Motor product card. |
| `/images/insurance-family.webp` | 1000 × 558, 61 KB | A family of four laughing on a sofa in a bright living room. | About photograph and FAQ photo on CBZ Life; Take cover feature card on CBZ Life; Personal lines policy application card on Insurance; CBZ Life panel on Diaspora; "Starting a family?" on the Personal home; several Life and Insurance product cards. |
| `/images/insurance-health.webp` | 1000 × 558, 38 KB | A mother and daughter with a doctor in a consulting room. | FAQ photo on Insurance; "Looking after your staff?" on the Business home; "Looking after your teachers?" on the School home; Health & Personal Accident product card. |
| `/images/loan-education.webp` | 1000 × 558, 71 KB | A graduate in cap and gown holding her certificate, hugged by her mother outside the University of Zimbabwe. | School home hero; "Just got into varsity?" on the Personal home; "Helping parents pay fees?" on the School home; School Current Account, Student Loan, Private School Fees Loan, CashPlus Student and Civil Servant Loan product cards. |
| `/images/loan-home.webp` | 1000 × 558, 79 KB | A couple holding up a house key in front of their new brick home at sunset. | About photograph and FAQ photo on Properties; Schedule a viewing feature card on Properties; Property panel on Diaspora; "Buying your first home?" on the Personal home; first photograph on every property listing; CashPlus Housing product card. |
| `/images/about-capital.webp` | 1280 × 960, 133 KB | The Harare skyline at sunset with jacarandas in bloom. Generated for the site in Figma (November 2026). | About photograph on CBZ Capital; "Raising capital?" on the Business home. |
| `/images/about-risk-advisory.webp` | 1280 × 960, 55 KB | Three advisers in navy suits reviewing charts at a boardroom table with a city view. Generated for the site in Figma (November 2026). | About photograph on CBZ Risk Advisory. |

### 2.3 Account photographs (`/images/accounts/`)

All 1000 × 747.

| File | Size | What it shows | Used on |
| --- | --- | --- | --- |
| `current.webp` | 32 KB | A woman in a navy suit smiling in a glass-walled office with the city behind her. | "Opening a company account?" on the Business home; "Opening a school account?" on the School home; Current Account, SmartCash General and Payday Loan product cards. |
| `partnership.webp` | 47 KB | Two business partners shaking hands over building plans in a high-rise office. | Business home hero; FAQ photo on CBZ Capital; "Growing a business?" on the Personal home; Current Account (Joint), Foreign Currency Account (Corporate), Savings Account (Corporate) and CashPlus Business product cards. |
| `diaspora.webp` | 31 KB | A woman in a navy suit holding a tablet with a floor plan, a London skyline behind her. | Diaspora hero; "Living abroad?" on the Personal home; Foreign Currency Account (Individual) and Nostro Individual Loan product cards. |
| `individual.webp` | 78 KB | A man in a navy jumper at a wooden table with a laptop and a mug reading "Harare Coffee". | SmartCash Lite, Simple Saver and Loan — Individual Direct Debit product cards. |
| `savings.webp` | 56 KB | An older couple having tea in a flowering garden in front of a thatched brick cottage. | Savings Account (Individual), CashPlus Individual and SmartCash Extra product cards. |
| `senior.webp` | 76 KB | (As above, the same couple, a different frame.) | Senior Citizens Savings Account product card. |
| `teen.webp` | 69 KB | A schoolgirl in a blazer holding textbooks and a "Harare High School" student card under jacarandas. | SmartCash Student, CashPlus Teen and CashPlus Junior product cards. |
| `churchsaver.webp` | 116 KB | A congregation and clergy in blue outside "St Paul's Community Church". | Church Current Account product card. |
| `individual-600.webp` | 600 × 448, 38 KB | A smaller copy of `individual.webp`. | Not used anywhere. |

### 2.4 Share image

| File | Size | What it shows | Used on |
| --- | --- | --- | --- |
| `/og/cbz-holdings.jpg` | 1200 × 630, 66 KB | The woman-with-phone hero crop with the red arc on white. | The Open Graph and Twitter card image for every page (`BaseLayout.astro`); no page sets its own. |

### 2.5 Files in `public/images` that no page uses

| File | What it is | Suggestion |
| --- | --- | --- |
| `cbz-contact-flyer.jpg` (680 × 340) | A CBZ Holdings contact-centre flyer with a headset photograph and the toll-free numbers. | Remove, or redraw its content in the Contact page. |
| `cbz-logo.png`, `current-logo.png` (298 × 187 each) | Raster CBZ Holdings logos. | Remove; the SVG logos in `public/brand/logos` are used instead. |
| `cbz-roundel-red.png` (150 × 150) | Duplicate of the favicon in `public/brand/logos`. | Remove the copy in `images`. |
| `open-box.png`, `composite-box.svg`, `test-box.svg` | A line-drawing of an open box and two SVG tests that embed it. | Remove. |
| `accounts/individual-600.webp` | Smaller copy of an account photograph. | Remove. |

---

## 3. Pictures page by page

### 3.1 Audience homes

| Page | Hero | Journey cards (in order) | Digital cards | Learn more rail |
| --- | --- | --- | --- | --- |
| Personal `/` | `hero-family.webp`, composed split banner. | loan-education (Students), cbz-payments (Traders), insurance-family (Families), loan-home (First home), insurance-car (Motorists), accounts/partnership (Business), cbz-agriculture (Farmers), cbz-wealth (Investors), accounts/diaspora (Diaspora). | CBZ Touch logo, ZikiCash logo, globe icon. | Category photographs: shareholder → cbz-wealth, customer → cbz-banking, regulatory → cbzpicture1, operational → cbz-banking-branch, security → cbz-protection. |
| Business `/business` | `accounts/partnership.webp` (not composed: a plain photograph in the right column). | accounts/current (New company), cbz-payments (Traders), cbz-banking (Payments), cbz-protection (Premises), insurance-health (Your team), hero-home (Space), about-capital (Growth), cbz-agriculture (Farmers), cbz-wealth (Treasury). | CBZ Touch logo, globe icon, store icon. | As Personal. |
| School `/school` | `loan-education.webp` (plain photograph). | accounts/current (Accounts), cbz-payments (Fees), cbz-protection (Buildings), insurance-health (Teachers), loan-education (Parents), hero-home (Building), cbz-wealth (Funds), cbz-agriculture (School farm). | CBZ Touch logo, globe icon, store icon. | As Personal. |
| Diaspora `/diaspora` | `accounts/diaspora.webp` in its own split banner (16 : 10 on phones). | Four panels, each a photograph with mini tiles: Banking → cbz-payments; Property back home → loan-home; Investing → cbz-wealth; CBZ Life for your family → insurance-family. | | |

### 3.2 Cluster pages and the Group

| Page | Banner (navy panel) | Other pictures |
| --- | --- | --- |
| `/clusters/banking` | cbz-banking | Company cards carry logos only. |
| `/clusters/insurance` | cbz-protection | Logos only. |
| `/clusters/investments` | cbz-wealth | Logos only. |
| `/clusters/agro-business` (Farm) | cbz-agriculture | Logos only. |
| `/the-group` | cbzpicture1 with the Holdings logo in white | Structure cards show company logos; board and executive charts show initials in ring portraits. |
| `/cbz-foundation` | cbzpicture1 with the Holdings logo | None. |
| `/sustainability` | cbz-agriculture with navy and red discs and the quote "Building a sustainable future together" | Grievance steps with red corner discs; no photographs. |

### 3.3 Business unit pages

Each unit page uses the same frames: the composed split hero; product cards with the photograph under a red arc and white curve; link and feature cards; the FAQ circle; the About photograph with red arc and logo plate; the Meet the team photograph with navy and red discs and logo plate.

| Unit | Hero (composed) | Feature and link card photographs | FAQ circle | About photograph | Meet the team photograph | Product card photographs |
| --- | --- | --- | --- | --- | --- | --- |
| CBZ Bank | hero-digital | none (link cards use icons) | cbz-banking | cbz-banking-branch | hero-digital (the hero image) | accounts/current, partnership, individual, savings, senior, teen, churchsaver, diaspora; cbz-banking; cbz-wealth; loan-education; loan-home |
| Red Sphere | hero-digital | none | no FAQ | cbz-payments | hero-digital | none (icon badges on a navy wash) |
| CBZ Insurance | hero-advice | Personal lines policy application → insurance-family; Premium payment → cbz-payments; Submit a claim → cbz-banking | insurance-health | cbz-protection | hero-advice | Draft catalogue: no product photographs yet |
| CBZ Life | hero-digital | Take cover → insurance-family; Submit a claim → cbz-protection; Pay online → cbz-payments; Talk to an agent → cbz-banking | insurance-family | insurance-family | hero-digital | none |
| CBZ Risk Advisory | hero-advice | Request an insurance audit → hero-advice; Get a quote → cbz-protection | no FAQ | about-risk-advisory | hero-advice | none |
| Datvest | hero-digital | none | cbz-wealth | cbz-wealth | hero-digital | none |
| CBZ Capital | hero-advice | none | accounts/partnership | about-capital | hero-advice | none |
| CBZ Properties | hero-home | Schedule a viewing → loan-home | loan-home | loan-home | hero-home | Listings (not product cards): every one of the twelve listings shows loan-home, cbz-banking-branch and cbzpicture1 in that order |
| CBZ Agro-Yield | hero-advice | none (Visit ATDC and Farmer onboarding are icon cards) | no FAQ | cbz-agriculture | hero-advice | Agro Farming → cbz-agriculture; Agro Enterprise → cbz-agriculture; Agro Commodity Trading → cbz-payments; Agro Supply Chain → cbz-protection |

The Meet the team photograph is the unit's hero image unless the unit sets `aboutImage`; today every unit uses its hero image there, so the same picture appears twice on each page.

### 3.4 Everything else

| Page | Pictures |
| --- | --- |
| `/journeys`, `/calculators`, `/login`, `/contact`, `/security`, legal pages, forms | None; icons and logos only. Contact shows the branch map (an embedded map, not an image file). |
| `/notices` and `/notices/<slug>` | The Learn more rail category photographs (section 3.1); a notice page has no photograph of its own. |
| `/properties/<id>` | The listing's three photographs in a 16 : 9 gallery. |
| `/404` | None. |

---

## 4. Logos and brand marks

All logos are SVG in `public/brand/logos`, registered in `src/data/logos.ts` with their aspect ratio, and placed by `Logo.astro` (Astro) or the header island. Each brand has a full-colour file for white backgrounds and a white file for navy.

| Brand | Files | Where it appears |
| --- | --- | --- |
| CBZ Holdings | `holdings-full.svg`, `holdings-white.svg`, `holdings-roundel.svg`, `cbz-roundel-red.png` (favicon and home-screen icon) | Header on the homes, Group pages and every page that is not a unit's (white); phone menu sheet (full colour); The Group and Foundation heroes (white); footer; structure cards; the About section's "Part of CBZ Holdings" line. |
| CBZ Bank | `bank-full.svg`, `bank-white.svg` | Header on Bank pages and its forms, and on Diaspora (white); hero eyebrow area, About plate, team plate (full colour); cluster and structure cards; footer. |
| Red Sphere Finance | `red-sphere-full.svg`, `red-sphere-white.svg`, `red-sphere-roundel.svg` | Header on Red Sphere pages; plates; cluster and structure cards. The lockup is wide, so the header shows it a little shorter. |
| CBZ Insurance, CBZ Life, CBZ Risk Advisory, Datvest (plus `datvest-roundel.svg`), CBZ Capital, CBZ Properties, CBZ Agro-Yield | `<brand>-full.svg`, `<brand>-white.svg` | Header on that unit's pages; plates; cluster and structure cards; footer. |
| CBZ Touch | `cbz-touch-full.svg`, `cbz-touch-white.svg` | Digital cards on the three homes; CBZ Touch product card. |
| ZikiCash | `ziki-cash-full.svg`, `ziki-cash-white.svg` | Digital card on the Personal home. |
| CBZ Way | `cbz-way-full.svg`, `cbz-way-white.svg` | Registered; links to The Group; not placed on a page. |
| Ziki Mall | `ziki-mall-full.png` (raster, 1201 × 769) | Registered; not placed on a page. |

Rules: white lockups on navy and on photographs, full-colour lockups on white; the registry's clear-space setting keeps the mark off edges; logos are never recoloured, stretched or placed on red.

---

## 5. Photo brief: what to supply for each slot

Supply `.webp` (or high-quality JPEG to be converted with `scripts/encode-image.mjs`). Sizes below are minimums; the long side can be larger.

| Slot | Size and ratio | Composition | Notes |
| --- | --- | --- | --- |
| Unit hero (composed) | 1600 × 800, 2 : 1 | Left half pure white. Right half: the subject inside a circle whose left edge carries the red arc and whose bottom right carries the navy edge, as in the three current files. Subject's face in the upper right quarter. | One per unit (nine) so the four-way sharing of `hero-advice` and `hero-digital` ends. The circle must fit inside the right 55 % of the frame. |
| Home hero (composed) | 1672 × 941, 16 : 9 | As the unit hero but the arc is drawn over the subject rather than around it; left 45 % fades to white. | One each for Personal, Business and School. Business and School currently show plain photographs. |
| Navy panel hero | 1400 × 900, 14 : 9 | Subject right of centre with quiet space on the left for white copy; mid tones (the gradient darkens the left and bottom). | Clusters, The Group, Foundation. The Group needs a true head-office photograph. |
| Journey card | 1000 × 1200, 5 : 6 portrait | Subject in the upper two thirds; the lower third is covered by the navy gradient and copy. Square files work but crop top and bottom. | Nine on Personal, nine on Business, eight on School. |
| Product card | 1000 × 563, 16 : 9 | Subject centred; the lower 40 px is cut by the white curve and the top-left corner by the red arc. | Bank has 33; Insurance, Life, Datvest, Capital, Risk Advisory and Red Sphere have none yet. |
| About photograph | 1200 × 900, 4 : 3 | Subject centre or right; the top-left corner is covered by the red arc and the bottom left by the logo plate. | One per unit; ideally the unit's own premises or people. |
| Meet the team photograph | 1400 × 520, wide | Subject right of centre; the left 300 px is covered by the navy and red discs, the top right by the logo plate. | One per unit, or reuse the About photograph by setting `aboutImage`. |
| Feature card | 800 × 340, wide | Subject right; the top-left corner is under the discs. | Seven cards across Life, Insurance, Properties and Risk Advisory. |
| Link card with photograph | 600 × 600, square | Subject left of centre; the right 40 % is cut by the white curve. | Optional; most link cards use an icon. |
| FAQ circle | 600 × 600, square | Face or subject centred. | Six units. |
| Property listing | 1200 × 675, 16 : 9 | The property itself; top-left corner under the red arc. | Three per listing, twelve listings. |
| Learn more rail | 1200 × 900, 4 : 3 | Subject upper half; the lower half sits behind the white panel. | One per notice category (five). |
| Leadership portrait | 600 × 600, square | Head and shoulders, plain background, face centred; shown in an 84 px to 128 px circle. | Nine board members, twelve executives, and every unit's board and management (names in `src/data/facts.ts` and each unit's JSON). |
| Share image | 1200 × 630 | Logo or hero crop with the brand arc. | One site-wide today; a per-unit set would let links to unit pages show their own picture. |

---

## 6. Gaps and placeholders

- **The same photographs do many jobs.** `cbz-wealth` appears in ten places, `cbz-payments` and `cbz-protection` in eight each, `cbz-banking` in seven. Each unit page repeats its hero image in Meet the team. New photography should start with the nine unit heroes and the nine About pictures.
- **Four units share one hero** (`hero-advice`: Insurance, Risk Advisory, Capital, Agro-Yield) and four share another (`hero-digital`: Bank, Red Sphere, Life, Datvest).
- **Property listings** show the same three stand-in photographs (a home, the fees campaign tile, the café) on all twelve listings. CBZ Properties to supply real photographs per listing.
- **The fees campaign tile** (`cbz-banking-branch.webp`) carries copy and dates and is used as the Bank About picture, the default FAQ picture and on every listing. Replace with a plain branch photograph.
- **The Group hero** is captioned "CBZ Holdings head office" but shows a man outside a café. A head-office photograph is needed.
- **Several photographs look generated** and carry invented signage: "Harare Financial Advisors", "St Paul's Community Church", "Harare High School", "Mbare Brews & Co.", "St Anne's" clinic, "Harare Coffee". They are placeholders from the previous build. The two About pictures for Capital and Risk Advisory were generated in Figma for this build and are marked as such in `HANDOFF.md`.
- **No product photographs** on Insurance, Life, Datvest, Capital, Risk Advisory or Red Sphere cards; those cards show an icon on a pale navy wash.
- **No leadership portraits**: every board, executive and unit team card shows initials.
- **One share image** for the whole site.
- **Unused files** listed in 2.5 can be deleted.
- Owners: "Final photography for heroes and tiles" and "Property listings, prices and photography" are already on the handoff list for Marketing and CBZ Properties; leadership photographs are with Corporate Affairs and each unit.
