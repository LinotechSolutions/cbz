# CBZ Holdings website: navigation flow

Every page, every section, every button and where it goes. Taken from the
built site on 9 November 2026 (`main` at `471276a`).

Conventions

- `↗` opens in a new tab (off-site).
- `#anchor` scrolls to a section on the same page.
- "Hidden" means the link's URL is still null in `src/data/links.ts` or the
  unit content, so the item does not render until the URL is supplied.
- **Forms do not send anywhere yet.** Every form saves a draft in the browser,
  validates, shows a success screen with a locally generated reference such as
  `BANK-K3M2Q1`, and clears the draft. No email or API is wired up. Adding
  `?mockfail=1` to a form URL shows the error state.

---

## 1. Elements on every page

### Audience strip (white strip above the header)

Four tabs; the strip sticks to the top of the window with the navy bar under it. The navy tab is the chosen audience. Before the visitor chooses, it is the audience the page serves (Personal on the home, Bank, Insurance, Life, Properties and Datvest pages; Business & SME on Red Sphere and Agro-Yield; Corporate & Investment on Capital and Risk Advisory; Diaspora on `/diaspora`); Group pages light none. Once chosen, the choice is remembered in the browser and the same tab stays navy on every page until it is changed.

**On a page with product cards** (Bank, Red Sphere, Insurance, Life, Datvest, Capital, Risk Advisory, Agro-Yield) a tab filters every product carousel on the page to that audience, scrolls the first carousel into view, and writes `?for=personal|business|corporate|diaspora` to the address so the view can be shared. Category pills with nothing for that audience disappear. A carousel with nothing for the chosen audience shows "Nothing here for <audience> yet" and a button per audience it does serve (for example Personal on CBZ Risk Advisory offers Business & SME and Corporate & Investment). Which products belong to which audience is listed in `src/data/audiences.ts` and summarised per unit in section 4.

**On any other page** (and without JavaScript) a tab goes to:

| Tab | Goes to |
| --- | --- |
| Personal | `/` |
| Business & SME | `/journeys#business` |
| Corporate & Investment | `/journeys#corporate` |
| Diaspora | `/diaspora` |

### Header (navy bar)

Logo, a thin divider, the five cluster menus, then Find a branch, Log in and the red Sign up button. Between 900px and 1100px Find a branch is its pin icon alone.

| Control | Goes to |
| --- | --- |
| CBZ Holdings logo (home, Group pages and every page that is not a business unit's) | `/` |
| Unit logo (a business page and its forms, e.g. CBZ Bank; shown in place of the Holdings logo) | that unit's page |
| Find a branch (pin icon; also the last row of the phone menu sheet) | `/contact#branches` |
| **Bank** (label) | `/clusters/banking` |
| Bank ▸ CBZ Bank | `/bank` |
| Bank ▸ Red Sphere Finance | `/red-sphere` |
| Bank ▸ CBZ Custodial Services | no page yet, shown as plain text |
| Bank ▸ Diaspora banking | `/diaspora` |
| Bank ▸ View all | `/clusters/banking` |
| **Insure** (label) | `/clusters/insurance` |
| Insure ▸ CBZ Insurance | `/insurance` |
| Insure ▸ CBZ Life | `/cbz-life` |
| Insure ▸ CBZ Risk Advisory | `/risk-advisory` |
| Insure ▸ View all | `/clusters/insurance` |
| **Invest** (label) | `/clusters/investments` |
| Invest ▸ Datvest | `/datvest` |
| Invest ▸ CBZ Capital | `/capital` |
| Invest ▸ CBZ Properties | `/properties` |
| Invest ▸ View all | `/clusters/investments` |
| **Agro-business** (label) | `/clusters/agro-business` |
| Agro-business ▸ CBZ Agro-Yield | `/agro-yield` |
| Agro-business ▸ View all | `/clusters/agro-business` |
| **Group** (label) | `/the-group` |
| Group ▸ The Group | `/the-group` |
| Group ▸ Explore our solutions | `/journeys` |
| Group ▸ CBZ Foundation | `/cbz-foundation` |
| Group ▸ Sustainability | `/sustainability` |
| Group ▸ Latest from CBZ | `/notices` |
| Group ▸ Contact us | `/contact` |
| **Log in** ▸ Internet banking, personal | ↗ `https://obdx.cbz.co.zw/index.html?module=login` |
| Log in ▸ Internet banking, corporate (new platform) | ↗ `https://cbzonline.cbz.co.zw/mfmbs/cbz-corp/` |
| Log in ▸ Internet banking, corporate (previous platform, OBDX) | ↗ `https://obdx.cbz.co.zw/` |
| Log in ▸ Self-service portal | ↗ `https://selfservice.cbz.co.zw/` |
| Log in ▸ CBZ Touch | `/login#apps` |
| Log in ▸ Red Sphere portal | ↗ `https://rs.cbz.co.zw/` |
| **Sign up** (red) ▸ Sign up for CBZ Bank | `/bank/open-account` |
| Sign up ▸ Apply with Red Sphere | ↗ Red Sphere on Google Play |
| Sign up ▸ Sign up for Agro-Yield | ↗ `https://agrideck.cbz.co.zw/` (Agrideck) |
| Sign up ▸ Start investing with Datvest | `/datvest/start-investing` |
| Sign up ▸ Get a quote from CBZ Insurance | `/insurance/quote` |
| Sign up ▸ Get a quote from CBZ Life | `/cbz-life/quote` |
| Menu button (phones) | opens the menu sheet with the same items; without JavaScript it goes to `/sitemap` |

### Chat with us (floating pill, bottom right)

| Option | Goes to |
| --- | --- |
| WhatsApp | ↗ `https://wa.me/263774460460?text=…` |
| Call +263 8677 004050 | `tel:+2638677004050` |
| Email us | `mailto:contactcentre@cbz.co.zw` |

### Cookie banner (first visit)

Essential only / Allow analytics; Privacy policy → `/privacy-policy`.

### Footer

| Column | Links |
| --- | --- |
| Contact Us | Phone `tel:+2638677004050`; WhatsApp ↗ `wa.me/263774460460`; Email `mailto:contactcentre@cbz.co.zw` |
| Our Businesses | CBZ Bank `/bank`; CBZ Insurance `/insurance`; CBZ Life `/cbz-life`; CBZ Properties `/properties`; Datvest `/datvest`; CBZ Agro-Yield `/agro-yield`; Red Sphere Finance `/red-sphere`; CBZ Capital `/capital`; CBZ Risk Advisory `/risk-advisory` |
| The Group | The Group `/the-group`; CBZ Foundation `/cbz-foundation`; Sustainability `/sustainability`; Diaspora Banking `/diaspora` |
| Access | Log In `/login`; Find a Branch `/contact#branches`; Security `/security`; Latest from CBZ `/notices` |
| Explore Our Solutions | Open an Account `/bank/open-account`; Insurance Solutions `/insurance/quote`; Life Assurance Solutions `/cbz-life/quote`; Buy a Property `/properties/request-a-viewing`; Investments `/datvest/start-investing`; Agrobusiness Solutions ↗ Agrideck; Capital Raising `/capital/enquiry` |
| Social | Facebook, X, LinkedIn, YouTube, Instagram ↗ |

Note: Business conditions, Privacy policy, Tip-offs, Website terms and
Sitemap were removed from the footer at the client's request and are now
reachable only from `/sitemap`. Worth a decision on the sitemap.

### Sticky bar (phones, business pages)

Shows the unit's primary action (e.g. Open an account → `/bank/open-account`).

---

## 2. Home `/`

Five sections, top to bottom: hero, task cards, journey carousel, digital
banking, learn more rail. Nothing else is on the page apart from the global
header, footer and chat launcher.

### 2.1 Hero (white split banner)

| Element | What it is | Goes to |
| --- | --- | --- |
| Heading | "Bank, Invest, Insure and Grow with **CBZ Holdings.**" (group name in red) | text only |
| Lede | "From everyday banking and protecting what matters to building wealth and growing your business, CBZ Holdings brings together the financial solutions, expertise and support you need to achieve more." | text only |
| **Explore our products** (red button) | opens a dropdown of six choices | see below |
| ▸ Sign up for CBZ Bank | Current, savings and foreign currency accounts | `/bank/open-account` |
| ▸ Apply with Red Sphere | Salary and business loans, through the app | ↗ Red Sphere on Google Play |
| ▸ Sign up for Agro-Yield | Contract farming and seasonal finance, on Agrideck | ↗ `https://agrideck.cbz.co.zw/` |
| ▸ Start investing with Datvest | Unit trusts and managed portfolios | `/datvest/start-investing` |
| ▸ Get a quote from CBZ Insurance | Motor, home and business cover | `/insurance/quote` |
| ▸ Get a quote from CBZ Life | Funeral and education plans | `/cbz-life/quote` |
| Photograph | family under the red and navy arc | not a link |

### 2.2 Task cards `#help` (on-screen title "Explore Our Solutions")

Five white cards, each one whole card is the link. Each has a red outline
icon, a bold name, one line and a red Explore link.

| Card | Line on the card | Goes to |
| --- | --- | --- |
| **Bank** ▸ Explore Banking | Everyday banking, accounts, cards and savings. | `/clusters/banking` (Banking cluster page) |
| **Borrow** ▸ Explore Loans | Salary, business and cash loans from Red Sphere. | `/red-sphere` (Red Sphere page) |
| **Insure** ▸ Explore Insurance | Short-term insurance solutions for your assets and business. | `/clusters/insurance` (Insurance cluster page) |
| **Invest** ▸ Explore Investments | Wealth creation, unit trusts and corporate finance solutions. | `/clusters/investments` (Investment cluster page) |
| **Agrobusiness** ▸ Explore Agrobusiness | Finance, inputs, offtake and sector solutions for the agricultural value chain. | `/clusters/agro-business` (Agro-Business cluster page) |
| View all solutions (top right) | | `/journeys` |

From a cluster page the visitor picks a company card to reach the unit page
(section 3).

### 2.3 Journey carousel `#journeys` (on-screen title "Whatever your next step, we're here to help you move forward.")

Slanted photo cards. Arrows (‹ ›) scroll one card at a time; the dots and
the "1 of 9" counter follow the scroll. Each card shows a tag, a red icon
disc, a question, a promise and a white **Let's go** pill; the whole card is
the link.

| Card | Goes to |
| --- | --- |
| Students: Just got into varsity? | `/bank/open-account` |
| Traders: Running a small business? | `/red-sphere#explore-loan-products` |
| Families: Starting a family? | `/cbz-life/quote` |
| First home: Buying your first home? | `/properties/request-a-viewing` |
| Motorists: Bought a car? | `/insurance/quote` |
| Business: Growing a business? | `/bank/apply` |
| Farmers: Farming this season? | ↗ `https://agrideck.cbz.co.zw/` (Agrideck) |
| Investors: Thinking about tomorrow? | `/datvest/start-investing` |
| Diaspora: Living abroad? | `/diaspora` |
| Explore all solutions | `/journeys` |

### 2.4 Digital banking `#digital` (on-screen title "Bank wherever you are, whenever you need to")

Three white cards.

| Card | Copy | Buttons |
| --- | --- | --- |
| CBZ Touch (logo) | Zero-rated mobile banking: transfers, bills, school fees, cardless withdrawals and card controls. | App Store ↗ `apps.apple.com/zw/app/cbz-touch/id1099147682`; Google Play ↗ `play.google.com/store/apps/details?id=zw.co.cbz.touch` |
| ZikiCash (logo) | Send money home from the United Kingdom to Zimbabwe. | App Store ↗ `apps.apple.com/app/zikicash/id6444567196`; Google Play ↗ `play.google.com/store/apps/details?id=com.kuva.zikicash` |
| Internet banking (globe icon) | Balances, statements, transfers and payments on the personal and corporate platforms. | **Log in** → `/login`; **Learn more** → `/bank#cards-and-digital` |

### 2.5 Learn more rail `#learn` (on-screen title "Learn more")

Article cards with a photograph, title, summary, category and date. The
whole card (and its **Read** link) → `/notices/<slug>`. Security notices are
left out of this rail. **See all** → `/notices`. Arrows scroll the rail.

Current notices: `agm-notice-2026`, `cautionary-statement`,
`digital-card-upgrade`, `fy2025-results`, `monetary-policy-circular`,
`saturday-banking` (and `security-and-online-safety`, which appears only on
`/notices`).

---

## 3. Cluster pages

`/clusters/banking`, `/clusters/insurance`, `/clusters/investments`, `/clusters/agro-business`

- Navy hero: breadcrumb Home (→ `/`) › cluster name; cluster title and summary. No buttons.
- One card per company in the cluster, with the company logo, name, summary and any held entities. **Visit <company>** → the unit page
  (`/bank`, `/red-sphere`, `/insurance`, `/cbz-life`, `/risk-advisory`,
  `/datvest`, `/capital`, `/properties`, `/agro-yield`). CBZ Custodial
  Services shows "Page coming soon" and is not a link. Held entities (CBZ
  Shield, CBZ Secure, Botswana Re, ATDC) are listed as text under their parent.

---

## 4. Business unit pages: how every one works

All nine unit pages share one template, in this order:

1. **Hero** (white split banner). Breadcrumb: Home → `/`, cluster name → the cluster page (Banking `/clusters/banking`, Insurance `/clusters/insurance`, Investments `/clusters/investments`, Agro-Business `/clusters/agro-business`), then the unit name as text. Red-dash eyebrow with the unit name (text). Title and lede (text). **Primary** button (red) and **secondary** button (navy outline), per unit below. On a business page the header shows that unit's logo in place of the CBZ Holdings mark; it links to the unit page.
2. **Who we serve** card (white, overlapping the hero): the label "Who we serve", a short title such as "Banking for everyone.", then one row per audience with an icon chip, a name, one line and a chevron. Each row scrolls to an anchor or opens a page (per unit below). Units without audiences (Red Sphere, Agro-Yield) have no card.
3. **Sections**, one per branch of the site map, in the order given per unit. Each has a heading under a short red rule and an optional line. Section types:
   - **Product carousel**: shows only the cards tagged for the audience chosen in the header strip (see "Audience strip" in section 1; the per-unit split is below). Pill filters (**All** plus one per category, navy when selected) show and hide cards within that and return the row to the start; ‹ › arrows scroll. Each product card shows a photograph (or the unit icon), a floating icon badge, the product name, a short summary, up to two benefits with check marks, the unit's **apply button** (per unit below) and a **Tell me more** link. Tell me more opens a dialog with the product name, a close button and four tabs: **What you get** (benefits), **Who it's for** (audience), **What it costs** (pricing line and any rate, term, fee or limit facts), **How to get it** (requirements and the apply button again). Escape, the close button or a click outside closes it. A URL such as `/bank#product-bank-current` opens that card's dialog on arrival.
   - **Link cards**: icon chip, label, line, then **Get started** → a form or page, or **Visit** ↗ an off-site link. A card with a photograph has a red curved separator and a red Get started button. Note cards (information only) have a dashed border and no link.
   - **Feature cards** (sections with one action, e.g. Take cover): photograph with the red and navy curves and an icon disc, the title, line, a red **Get started** button and up to three benefit points (text). Two to a row when sections follow each other.
   - **Calculator**: red icon and title; a white form (amount, deposit where relevant, a term dropdown and a rate field; Red Sphere also has a product selector that fills the rate); a red **Calculate** button that scrolls to the navy result card; the result card shows the monthly figure, totals, a note and the unit's apply button (per calculator in section 7).
   - **Store badges**: App Store ↗ and Google Play ↗ for the app named.
   - **FAQ** (on-screen title "Frequently Asked Questions"). Left column "Need help? We're here for you.": **Call Us** `tel:+2638677004050` with the toll-free line as text; **Email Us** `mailto:contactcentre@cbz.co.zw`; **Visit Us** ▸ Locate branch → `/contact#branches`; the unit photograph in a circle. Right column: five questions that open and close (first open by default); then the navy "Still have questions?" band with **Start a chat** ↗ WhatsApp and a "contact us" link → the unit's call-back form (per unit below).
4. **About <unit>** `#about` (every unit, after the last section): a photograph with the red curve and the unit's logo on a white plate; a paragraph on the unit, four key facts (text), and the line "Part of **CBZ Holdings**" → `/the-group` with any held companies; **About the Group** → `/the-group`.
   **Products by audience** (a product can sit under more than one tab):

   | Unit | Personal | Business & SME | Corporate & Investment | Diaspora |
   | --- | --- | --- | --- | --- |
   | CBZ Bank | SmartCash Lite, General, Extra and Student; Current Account and Current Account (Joint); Private Banking; Foreign Currency Account (Individual); Savings Account (Individual); CashPlus Individual, Housing, Junior, Teen and Student; Simple Saver; Senior Citizens Savings; Fixed Deposit; all six loans; ATM Card, Student Visa Card, Visa Gold Card; CBZ Touch, Internet Banking | Current Account; Current Account (Corporate); Foreign Currency Account (Corporate); Church Current Account; School Current Account; CashPlus Business; Savings Account (Corporate); Fixed Deposit; Visa Gold Card; SME's Debit Card; CBZ Touch, Internet Banking, E-statements, Local POS, Visa POS, Kleva POS | Current Account (Corporate); Foreign Currency Account (Corporate); Savings Account (Corporate); Fixed Deposit; Internet Banking; E-statements | Foreign Currency Account (Individual); CBZ Touch; Internet Banking |
   | Red Sphere | SSB Loan; Private Payroll Loan; Pensioners Loan; Partner Lockable Device; Agents & Partners Personal and Car Loans; Profeeds | SME Working Capital; SME Tuck-shop Facility; Individual Business Loans; Order Financing & Invoice Discounting; Agency Contract; Partnership; Profeeds | Order Financing & Invoice Discounting | none |
   | CBZ Insurance | Comprehensive Motor; Home & Contents; Health & Personal Accident; Milady; Travel; Diaspora Property | SME Business Shield; All-Risks Business Assets; Commercial Property & Plant; Engineering & Construction; Marine Cargo; Professional & Public Liability; all six agriculture covers | Commercial Property & Plant; Engineering & Construction; Marine Cargo; Professional & Public Liability; Contract Farming Scheme Cover | Diaspora Property; Home & Contents |
   | CBZ Life | Comfortsure Funeral; Sarapavana Education; Annuities; Retirement Savings | Retirement Savings; Group Life; Credit Life | Group Life; Credit Life | none |
   | Datvest | all six unit trusts; all six private wealth products | High-Yield Fixed Income Fund; Money Market Fund; Corporate Treasury Liquidity Placement | Money Market Fund; Philanthropic & Endowment Structuring; all six institutional products | Diaspora Wealth Fund; USD Inflation-Shield Fund; Structured Offshore USD Notes; VFEX USD Equities |
   | CBZ Capital | none | Recapitalisation & Restructuring | all ten products | none |
   | CBZ Risk Advisory | none | Corporate Property & Assets Broking; Commercial Fleet & Marine; Business Continuity; Loss Prevention; Corporate Healthcare & Group Benefits; Claims Advocacy | all ten products | none |
   | CBZ Agro-Yield | none | all four divisions | Agro Commodity Trading; Agro Supply Chain | none |

5. **Meet the team** `#team` (every unit): on-screen title "Meet the Team", the line "The people who lead <unit>.", a sentence on the source, and **Group leadership** → `/the-group#board`; beside it the unit photograph with navy and red curves and the unit logo on a white plate. Then two charts. **Board leadership** (red dot label): the board chairperson's large card on top (red "Chairperson" tag), connector lines to a row of up to five smaller director cards, and a tinted "Also on the board" band holding any further directors with **Group board and executive** → `/the-group#board`. **Executive management** (navy strip, tinted panel): the managing director or principal officer on a large card with a navy tag. Portraits show initials until photographs arrive; names and roles are text only. A unit with no names yet would show a holding panel instead, with **Talk to the team** → its call-back form and **WhatsApp us** ↗.
6. **Sticky bar** (phones only): the primary button.

### 4.1 CBZ Bank `/bank`

| Hero | Open an account → `/bank/open-account`; Apply for a loan → `/bank/apply` |
| --- | --- |
| Who we serve | Individuals → `#panel-bank-accounts` (see gap below); Companies, schools and churches → `#panel-bank-accounts`; Diaspora → `/diaspora` |

Sections

| Section | Contents and buttons |
| --- | --- |
| Open an account `#open-an-account` | Product carousel, filters All / Accounts / Savings and investments. Every card: **Open an account** → `/bank/open-account`. Link card **Account opening form** ▸ Get started → `/bank/open-account`. |
| Apply for a loan `#apply-for-a-loan` | Product carousel (Loans). Every card: **Apply for a loan** → `/bank/apply`. **Mortgage calculator** ▸ Apply for a mortgage → `/bank/apply`. **Car finance calculator** ▸ Apply for car finance → `/bank/apply`. Link card **Loan application form** ▸ Get started → `/bank/apply`. |
| Cards and digital banking `#cards-and-digital` | Product carousel, filters Cards / Digital and merchant. Card buttons differ by product: **CBZ Touch** → App Store ↗ and Google Play ↗; **Internet banking** and **E-statements** → Log in to internet banking → `/login`; **Visa POS, Local POS, Kleva POS** → Speak to an agent → `/bank/call-me-back`; all other cards → Open an account → `/bank/open-account`. Then CBZ Touch store badges (App Store ↗, Google Play ↗) and link card **Log in to internet banking** ▸ Get started → `/login`. |
| FAQ `#faq` | Five questions. "contact us" → `/bank/call-me-back`. |
| About `#about` | Paragraph, four facts and the unit logo on the photograph. **CBZ Holdings** and **About the Group** → `/the-group`. |
| Meet the team `#team` | Profile cards: managing director or principal officer, board chairperson and directors (name and role, text only). |

Gap: the Who we serve anchors `#panel-bank-accounts` do not exist on the
bank page (the filter tabs carry a longer id because the page has several
product lists), so the Individuals and Companies chips do not scroll.

### 4.2 Red Sphere Finance `/red-sphere`

| Hero | Apply online ↗ Red Sphere on Google Play; Loan calculator → `#loan-calculator` |
| --- | --- |
| Who we serve | none |

| Section | Contents and buttons |
| --- | --- |
| Explore loan products `#explore-loan-products` | Four product lists: SME loans, SSB loans, Private individual loans, Cash loans. Every card: **Apply online** ↗ Google Play. |
| Loan calculator `#loan-calculator` | Select product pre-fills the rate. Result button **Apply online** ↗ Google Play. |
| Apply or enquire `#apply-or-enquire` | **Online loan application** ▸ Visit ↗ Google Play; **Explore Invoice Discounting** ▸ Visit ↗ `https://zeex.co.zw/`; **Enquiry form** ▸ Get started → `/red-sphere/enquire`; note card "Red Sphere business development" (no link). |
| Download the app `#download-the-app` | App Store ↗ `apps.apple.com/zw/app/redsphere/id6775831304`; Google Play ↗. |
| Explore invoice discounting `#explore-invoice-discounting` | **Explore Invoice Discounting** ▸ Visit ↗ Zeex; note "How it works". |
| About `#about` | Paragraph, four facts and the unit logo on the photograph. **CBZ Holdings** and **About the Group** → `/the-group`. |
| Meet the team `#team` | Profile cards: managing director or principal officer, board chairperson and directors (name and role, text only). |

### 4.3 CBZ Insurance `/insurance`

| Hero | Request a quote → `/insurance/quote`; Insure now → `/insurance/insure-now` |
| --- | --- |
| Who we serve | Individual → `#panel-insurance-personal`; Corporates → `#panel-insurance-business` |

| Section | Contents and buttons |
| --- | --- |
| Request a quote `#request-quote` | Product carousel, filters All / Personal / Business / Agriculture. Every card: **Get a quote** → `/insurance/quote`. Link card **Quote generation** ▸ Get started → `/insurance/quote`. |
| Insure now `#insure-now` | Photo cards: **Personal lines policy application** ▸ Get started → `/insurance/insure-now`; **Premium payment** (information only, no link). |
| Submit a claim `#submit-claim` | Feature card ▸ Get started → `/insurance/claim`. |
| Policy changes `#policy-changes` | **Policy status** → `/insurance/policy-changes?request=status`; **Cancellation** → `/insurance/policy-changes?request=cancellation`; **Enquiries** → `/insurance/policy-changes?request=premium`. |
| FAQ `#faq` | "contact us" → `/insurance/call-me-back`. |
| About `#about` | Paragraph, four facts and the unit logo on the photograph. **CBZ Holdings** and **About the Group** → `/the-group`. |
| Meet the team `#team` | Profile cards: managing director or principal officer, board chairperson and directors (name and role, text only). |

### 4.4 CBZ Life `/cbz-life`

| Hero | Get a quote → `/cbz-life/quote`; Talk to an agent → `/cbz-life/talk-to-an-agent` |
| --- | --- |
| Who we serve | Individuals, Business, SMEs and informal sector → all `#get-a-quote` |

| Section | Contents and buttons |
| --- | --- |
| Get a quote `#get-a-quote` | Product carousel, filters Individual life / Employee benefits. Every card: **Request a quotation** → `/cbz-life/quote`. Link card **Quote request form** ▸ Get started → `/cbz-life/quote`. |
| Take cover `#take-cover` | Feature card ▸ Get started → `/cbz-life/take-cover`. |
| Submit a claim `#submit-claim` | Feature card ▸ Get started → `/cbz-life/claim`. |
| Pay online `#pay-online` | Feature card ▸ Get started → `/cbz-life/pay`. |
| Talk to an agent `#talk-to-an-agent` | Feature card ▸ Get started → `/cbz-life/talk-to-an-agent`. |
| FAQ `#faq` | "contact us" → `/cbz-life/talk-to-an-agent`. |
| About `#about` | Paragraph, four facts and the unit logo on the photograph. **CBZ Holdings** and **About the Group** → `/the-group`. |
| Meet the team `#team` | Profile cards: managing director or principal officer, board chairperson and directors (name and role, text only). |

The four feature cards sit two to a row in one band.

### 4.5 CBZ Risk Advisory Services `/risk-advisory`

| Hero | Get a quote → `/risk-advisory/quote`; Request an insurance audit → `/risk-advisory/insurance-audit` |
| --- | --- |
| Who we serve | SMEs → `#panel-risk-advisory-broking`; Employee solutions and Individuals → `#panel-risk-advisory-benefits`; Sector-driven → `#panel-risk-advisory-erm` |

| Section | Contents and buttons |
| --- | --- |
| Key products `#key-products` | Product carousel, four filters. Every card: **Request a risk consultation** → `/risk-advisory/consultation`, which redirects to `/risk-advisory/quote`. |
| Request an insurance audit `#request-insurance-audit` | Feature card ▸ Get started → `/risk-advisory/insurance-audit`. |
| Get a quote `#get-a-quote` | Feature card ▸ Get started → `/risk-advisory/quote`. |
| About `#about` | Paragraph, four facts and the unit logo on the photograph. **CBZ Holdings** and **About the Group** → `/the-group`. |
| Meet the team `#team` | Profile cards: managing director or principal officer, board chairperson and directors (name and role, text only). |

No FAQ section yet.

### 4.6 Datvest `/datvest`

| Hero | Call me back → `/datvest/call-me-back`; Start investing → `/datvest/start-investing` |
| --- | --- |
| Who we serve | Retail → `#panel-datvest-unit-trusts`; Institutional and Pension funds → `#panel-datvest-institutional` |

| Section | Contents and buttons |
| --- | --- |
| Learn more `#learn-more` | Product carousel, filters Unit trusts / Institutional / Private wealth. Every card: **Start investing** → `/datvest/start-investing`. Note card "Wealth-creation advisory" (no link). |
| FAQ `#faq` | "contact us" → `/datvest/call-me-back`. |
| About `#about` | Paragraph, four facts and the unit logo on the photograph. **CBZ Holdings** and **About the Group** → `/the-group`. |
| Meet the team `#team` | Profile cards: managing director or principal officer, board chairperson and directors (name and role, text only). |

### 4.7 CBZ Capital `/capital`

| Hero | Call me back → `/capital/call-me-back`; Start a capital enquiry → `/capital/enquiry` |
| --- | --- |
| Who we serve | Corporates → `#learn-more` |

| Section | Contents and buttons |
| --- | --- |
| Learn more `#learn-more` | Two product lists: Investment products (debt, equity) and Corporate finance advisory (advisory, infrastructure). Every card: **Start a capital enquiry** → `/capital/enquiry`. |
| FAQ `#faq` | "contact us" → `/capital/call-me-back`. |
| About `#about` | Paragraph, four facts and the unit logo on the photograph. **CBZ Holdings** and **About the Group** → `/the-group`. |
| Meet the team `#team` | Profile cards: managing director or principal officer, board chairperson and directors (name and role, text only). |

### 4.8 CBZ Properties `/properties`

| Hero | Schedule a viewing → `/properties/request-a-viewing`; See the listings → `#property-listing` |
| --- | --- |
| Who we serve | Individuals, Business → `#property-listing` |

| Section | Contents and buttons |
| --- | --- |
| Find your dream property `#property-listing` | Filters Type / Location / Status (the URL updates, e.g. `?type=commercial`). **View all properties** ↗ Propertybook. Arrows scroll. Each listing card ▸ **View on Propertybook** ↗ `propertybook.co.zw/listed-agencies/cbz-properties/for-sale`. |
| Virtual tours `#virtual-tours` | **Browse listings on Propertybook** ▸ Visit ↗; note "Property virtual tour" (no link yet). |
| Schedule a viewing `#schedule-viewing` | Feature card ▸ Get started → `/properties/request-a-viewing`. |
| FAQ `#faq` | "contact us" → `/properties/call-back`. |
| About `#about` | Paragraph, four facts and the unit logo on the photograph. **CBZ Holdings** and **About the Group** → `/the-group`. |
| Meet the team `#team` | Profile cards: managing director or principal officer, board chairperson and directors (name and role, text only). |

Property detail pages `/properties/<id>` still exist (one per listing):
**View on Propertybook** ↗; **Request a viewing** → `/properties/request-a-viewing?property=<id>`;
Call → tel; WhatsApp ↗; **Finance it** mortgage calculator ▸ Apply for a
mortgage → `/bank/apply`; **More from CBZ Properties** → other `/properties/<id>`.
Listing cards on `/properties` no longer link to these pages.

### 4.9 CBZ Agro-Yield `/agro-yield`

| Hero | Enquire now → `/agro-yield/enquire`; Apply online ↗ `https://agrideck.cbz.co.zw/` (Agrideck) |
| --- | --- |
| Who we serve | none |

| Section | Contents and buttons |
| --- | --- |
| Choose your service `#choose-your-service` | Product cards (Farming, Enterprise, Commodity trading, Supply chain). Every card: **Apply online** ↗ Agrideck. Link card **Visit ATDC** ▸ Visit ↗ `https://africatdc.com/`. |
| Register as a farmer `#register-as-a-farmer` | **Farmer onboarding platform** ▸ Visit ↗ `https://agrideck.cbz.co.zw/` (Agrideck). |
| Enquire now `#enquire-now` | **Lead form** ▸ Get started → `/agro-yield/enquire`; notes "Customer confirmation" and "Agro-Yield business development" (no links). |
| Explore ATDC `#explore-atdc` | **Visit ATDC** ▸ Visit ↗; note "A Group business". |
| About `#about` | Paragraph, four facts and the unit logo on the photograph. **CBZ Holdings** and **About the Group** → `/the-group`. |
| Meet the team `#team` | Profile cards: managing director or principal officer, board chairperson and directors (name and role, text only). |

---

## 5. Diaspora banking `/diaspora`

| Section | Buttons |
| --- | --- |
| Hero | Open a diaspora account → `/bank/open-account`; WhatsApp us ↗ `wa.me/263774460460` |
| What you will need `#documents` | Three document cards (no links). Open a diaspora account → `/bank/open-account`; WhatsApp +263 774 460 460 ↗ |
| Banking `#banking` | Explore all banking services → `/bank`; Foreign currency account → `/bank#product-bank-fca_individual` (opens that card's dialog); CBZ Touch → `/#digital` |
| Property back home `#property` | Explore property services → `/properties`; Browse developments → `/properties`; Mortgage calculator → `/calculators#mortgage`; Diaspora property insurance → `/insurance#product-insurance-diaspora` |
| Investing `#invest` | Explore investment options → `/datvest`; Datvest diaspora fund → `/datvest#product-datvest-datvest-diaspora-wealth-fund`; Start investing → `/datvest/start-investing` |
| CBZ Life for your family `#life` | Explore life insurance → `/cbz-life`; Comfortsure funeral plan → `/cbz-life#product-cbz-life-comfortsure`; Sarapavana education plan → `/cbz-life#product-cbz-life-sarapavana` |
| Sticky bar | Open a diaspora account → `/bank/open-account` |

---

## 6. Explore our solutions `/journeys`

Ten cards in three audience groups (the header's audience tabs land here); the whole card is the link:

| Group | Card | Goes to |
| --- | --- | --- |
| Personal `#personal` | Open an account | `/bank/open-account` |
| Personal | Loans and mortgages | `/bank/apply` |
| Personal | Short-term insurance | `/insurance/quote` |
| Personal | Life assurance | `/cbz-life/quote` |
| Personal | Investments | `/datvest/start-investing` |
| Personal | Buy a property | `/properties/request-a-viewing` |
| Business `#business` | Small business finance | `/red-sphere#explore-loan-products` |
| Business | Farming finance | ↗ `https://agrideck.cbz.co.zw/` (Agrideck) |
| Corporate & Investment `#corporate` | Risk advisory | `/risk-advisory/quote` |
| Corporate & Investment | Capital raising | `/capital/enquiry` |
| (footer line) | Living abroad? See diaspora banking | `/diaspora` |

---

## 7. Calculators `/calculators`

Jump links: Mortgage `#mortgage`, Car finance `#car-finance`, Red Sphere loan `#loan`, Car insurance `#car-insurance`, Life policy `#policy-quote`.

| Calculator | Result button |
| --- | --- |
| Mortgage | Apply for a mortgage → `/bank/apply` |
| Car finance | Apply for car finance → `/bank/apply` |
| Loan (Red Sphere) | Apply online ↗ Google Play |
| Car insurance quote | Get a car insurance quote → `/insurance/quote` (shows "Indicative rates coming soon" until a rate table is supplied) |
| Life policy quote | Request a quotation → `/cbz-life/quote` (same note) |

---

## 8. Log in `/login`

| Section | Links |
| --- | --- |
| Platforms `#portals` | Internet banking, personal ↗ OBDX; Internet banking, corporate (new platform) ↗ cbzonline; Internet banking, corporate (OBDX) ↗; Self-service portal ↗; Red Sphere portal ↗ `rs.cbz.co.zw`. Hidden until URLs exist: Internet banking personal (new platform), Property management. "Forgotten your password? Reset it on internet banking" ↗ OBDX. |
| The apps `#apps` | CBZ Touch, Red Sphere and ZikiCash store badges ↗ (App Store and Google Play each). |
| Stay safe `#safety` | Call → tel; "security guidance" → `/security`. |

---

## 9. Contact us `/contact`

| Section | Links |
| --- | --- |
| Ways to reach us `#channels` | Contact centre `tel:+2638677004050`; Second line `tel:+2632427992349`; Toll-free `tel:460`; WhatsApp ↗ chat link; USSD `tel:*230#`; Email `mailto:contactcentre@cbz.co.zw` |
| Branches and ATMs `#branches` | Map and branch finder; "open in your own maps app" links per branch ↗ |
| Open an account `#open-account` | The six Open an account items (as in the header). Explore all solutions → `/journeys`; Log in to internet banking → `/login` |
| Send us a message `#message` | Form (see section 13) |

---

## 10. The Group and about pages

**The Group `/the-group`**: jump links Structure `#structure`, Awards `#awards`, Milestones `#milestones`, Board `#board`, Executive management `#exco`. Structure: cluster names → cluster pages; company names → unit pages. Awards: Investor relations and annual reports ↗ `cbz.co.zw/investor-relations`. Board leadership: hierarchy chart with the Chairperson on a large card on top (red tag), connector lines to the five other independent non-executive directors on smaller cards, and an "Executive directors" band (Group CEO, Group CFO, Group Chief Legal Counsel ex officio); each card carries name, role, appointment month and one line of background (text only; initials until photographs arrive); then the six board committees as chips (text). Executive management: a tinted panel under a navy strip with the Group CEO on a large card (navy tag), five executives in the connected row and the rest in a "Group functions and clusters" band (name and role; text only).

**CBZ Foundation `/cbz-foundation`**: hero Contact the Foundation → `/contact`. The work so far: Philanthropic initiatives ↗; Community involvement news ↗. Contact: Contact the Foundation → `/contact`; Call +263 8677 004050 → tel.

**Sustainability `/sustainability`**: banner tabs Grievance mechanism `#grievance`, Documents `#documents`, Reports `#reports`. Grievance: Raise a grievance online → `/sustainability/grievance`; Call +263 8677 004050 → tel (becomes Email once a grievance mailbox is supplied); Tip-offs anonymous → `/tip-offs`. Documents: Grievance Procedure and Grievance Resolution Form show "Being published" (become View document ↗ once linked). Reports band: Latest from CBZ → `/notices`. Related: CBZ Foundation `/cbz-foundation`; Tip-offs anonymous `/tip-offs`; The Group `/the-group`.

**Latest from CBZ `/notices`**: filter buttons by category; each card → `/notices/<slug>`. Notice page: Download the full notice ↗ when the notice has a document.

**Security `/security`**: Call → tel; Official notice: beware of web phishing ↗.

**Tip-offs anonymous `/tip-offs`**, **Privacy policy `/privacy-policy`**, **Business conditions `/business-conditions`**: information pages linking to the published documents on cbz.co.zw ↗ where they exist.

**Sitemap `/sitemap`**: every page and anchor, plus the regulatory and off-site links.

**404**: Home → `/`; Sitemap → `/sitemap`.

---

## 11. Forms (what each one is and what happens on submit)

Every form: stepped, validates each step, saves a draft in the browser as you
type, shows a success screen with a reference. **Nothing is sent anywhere
yet**; the mailbox or API for each unit is still to be wired.

| Page | Title | Success message |
| --- | --- | --- |
| `/bank/open-account` | Open an account with CBZ Bank | Your application is on its way. A relationship manager will contact you within two working days. |
| `/bank/apply` | Apply for a loan or mortgage | Your application is on its way. A lending officer will contact you within two working days. |
| `/bank/call-me-back` | Call me back: CBZ Bank | We will call you, usually within one working day. |
| `/insurance/quote` | Get a quote from CBZ Insurance | Your quote request is in. A consultant sends your quotation, usually within one working day. |
| `/insurance/insure-now` | Personal lines policy application | (unit-specific) |
| `/insurance/claim` | Claim submission | (unit-specific) |
| `/insurance/policy-changes?request=status\|cancellation\|premium` | Policy changes, pre-selected by the query | (unit-specific) |
| `/insurance/call-me-back` | Call me back: CBZ Insurance | We will call you. |
| `/cbz-life/quote` | Request a quotation from CBZ Life | Your quotation request is in. |
| `/cbz-life/take-cover` | Policy onboarding | (unit-specific) |
| `/cbz-life/claim` | Claim submission | (unit-specific) |
| `/cbz-life/talk-to-an-agent` | Agent enquiry | (unit-specific) |
| `/cbz-life/pay` | Pay your CBZ Life premium (not a form): Get CBZ Touch → `/login#apps`; Open internet banking ↗ OBDX; USSD `tel:*230#`; Policy administration links | |
| `/datvest/start-investing` | Start investing with Datvest | Your request is in. An adviser will contact you within two working days. |
| `/datvest/call-me-back` | Call me back: Datvest | We will call you. |
| `/properties/request-a-viewing` | Request a viewing | Your viewing request is in. CBZ Properties will confirm a time. |
| `/properties/call-back` | Call me back: CBZ Properties | We will call you. |
| `/capital/enquiry` | Start a capital enquiry | Your enquiry is in. A banker will contact you within two working days. |
| `/capital/call-me-back` | Call me back: CBZ Capital | We will call you. |
| `/risk-advisory/quote` | Request a risk consultation | Your request is in. A consultant will contact you within two working days. |
| `/risk-advisory/insurance-audit` | Audit request | (unit-specific) |
| `/agro-yield/apply` | Apply for farming finance. No longer linked from the site: every apply action goes to Agrideck. Page kept for old links. | Your application is in. Agro-Yield will contact you about the next steps. |
| `/agro-yield/enquire` | Lead form | (unit-specific) |
| `/red-sphere/enquire` | Enquiry form | (unit-specific) |
| `/sustainability/grievance` | Raise a grievance | Your grievance is registered. |
| `/contact#message` | Send us a message | Thanks, we have your message. The right team replies, usually within one working day. |

---

## 12. Redirects from old URLs

| Old | New |
| --- | --- |
| `/about` | `/the-group` |
| `/risk-advisory/consultation` | `/risk-advisory/quote` |
| `/open-account` | `/bank/open-account` |
| `/banking-journey` | `/bank/apply` |
| `/buy-a-home` | `/properties/request-a-viewing` |
| `/car-insurance-quote` | `/insurance/quote` |
| `/invest-journey` | `/datvest/start-investing` |
| `/agro-journey` | ↗ `https://agrideck.cbz.co.zw/` |
| `/capital-journey` | `/capital/enquiry` |
| `/risk-journey` | `/risk-advisory/quote` |
| `/personal-banking`, `/personal-banking/accounts` | `/bank` |
| `/personal-banking/loans` | `/bank/apply` |
| `/short-term-insurance` | `/insurance` |
| `/insurance/motor` | `/insurance/quote` |
| `/asset-management`, `/cbz-asset-management` | `/datvest` |
| `/properties-development` | `/properties` |
| `/red-sphere-finance` | `/red-sphere` |
| `/life-assurance` | `/cbz-life` |
| `/diaspora-banking` | `/diaspora` |

---

## 13. Open items that affect the flow

- Forms submit nowhere yet (section 11).
- Hidden until a URL is supplied: Property management portal (Log in), Internet banking personal new platform (Log in), CBZ Custodial Services page, Grievance documents, Sustainability reports, grievance mailbox, Foundation mailbox.
- Bank Who we serve chips (Individuals, Companies) point at anchors that do not exist on the page.
- Regulatory links (Business conditions, Privacy policy, Tip-offs, Website terms, Sitemap) are reachable only from `/sitemap` and the cookie banner.
- Log in page still lists the Red Sphere portal, while every other Red Sphere entry point goes to Google Play.
- Risk Advisory product cards go through the `/risk-advisory/consultation` redirect to the quote form.
- Property detail pages exist but nothing on the listings section links to them.
