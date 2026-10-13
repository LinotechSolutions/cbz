import { INSURANCE_ASSETS, INSURANCE_COVERS, INSURANCE_ADDONS } from './cbzData';

export type ServiceId =
  | 'account' | 'bank' | 'properties' | 'insurance' | 'life' | 'datvest'
  | 'agroyield' | 'redsphere' | 'riskadvisory' | 'capital';

export type Answers = Record<string, string | string[]>;
export type FieldType = 'text' | 'number' | 'date' | 'textarea' | 'select' | 'cards' | 'multicards';

export interface Option {
  value: string;
  label: string;
  hint?: string;
  badge?: string;
  priceUSD?: number;
  /** Card picture; `imageKey` lets editors replace it from Strapi (Site Image) */
  image?: string;
  imageKey?: string;
}

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  options?: Option[];
  required?: boolean;
  placeholder?: string;
  showIf?: (a: Answers) => boolean;
}

export interface Step { id: string; title: string; intro?: string; fields: Field[] }

export interface NextStep {
  to: ServiceId;
  headline: string;
  body: string;
  cta: string;
  /** Answers the client already gave, carried into the next journey (editable there) */
  seed?: Answers;
}

export interface ServiceDef {
  id: ServiceId;
  name: string;
  entity: string;
  stage: 'Everyday money' | 'Home & assets' | 'Protect' | 'Grow' | 'Business & farm';
  tagline: string;
  refPrefix: string;
  steps: Step[];
  /** Monthly estimate in USD, only where real pricing data exists */
  estimate?: (a: Answers) => number | null;
  next: (a: Answers) => NextStep[];
}

export const num = (v: unknown) => Number(String(v ?? '').replace(/[^0-9.]/g, '')) || 0;
const is = (a: Answers, k: string, v: string) => a[k] === v;
const opt = (value: string, label: string, hint?: string): Option => ({ value, label, hint });

const LIFE_PURPOSES = [
  opt('family', 'Family protection'),
  opt('funeral', 'Funeral cover'),
  opt('education', 'Education plan'),
  opt('savings', 'Savings & retirement'),
  opt('credit', 'Credit life (cover my loan)')
];

/** Personal and organisation accounts offered by CBZ Bank (also used to seed /open-account). */
export const ACCOUNT_TYPES = [
  { id: 'smartcash', name: 'SmartCash Current Account', pricing: 'Zero monthly ledger fees', image: '/images/accounts/current.webp',
    description: 'Paperless account with a ZimSwitch card, USSD *460# and CBZ Touch.',
    requirements: ['National ID or valid passport', 'Proof of residence (utility bill or affidavit)', 'USD 5 card fee'] },
  { id: 'personal', name: 'Personal Current Account', pricing: 'From USD 3 / month', image: '/images/accounts/individual.webp',
    description: 'Cheque book, salary clearing and access to personal loans and overdrafts.',
    requirements: ['National ID or valid passport', 'Proof of residence', 'Latest payslip or proof of income'] },
  { id: 'nostro', name: 'Nostro Foreign Currency Account (FCA)', pricing: 'Zero opening deposit', image: '/images/accounts/diaspora.webp',
    description: 'Hold USD, EUR, GBP or ZAR with an international Visa debit card.',
    requirements: ['National ID or valid passport', 'Proof of residence (within 3 months)', '2 passport-size colour photos'] },
  { id: 'youth', name: 'Youth & Student Account', pricing: 'No maintenance fees', image: '/images/accounts/teen.webp',
    description: 'For ages 16 to 25. No minimum balance, CBZ Touch and a low-cost card.',
    requirements: ['National ID or student ID', 'Parent or guardian consent if under 18', 'Proof of residence'] },
  { id: 'senior', name: 'Senior Citizens Account', pricing: 'Zero ledger fees', image: '/images/accounts/senior.webp',
    description: 'For ages 60+. Free withdrawals, priority service and free bill standing orders.',
    requirements: ['National ID showing age 60+', 'Proof of residence', '2 passport-size photos'] },
  { id: 'fixed', name: 'Fixed Term Deposit', pricing: 'Up to 14.5% p.a.', image: '/images/accounts/savings.webp',
    description: 'Guaranteed returns over 30 to 365 days. Minimum USD 500.',
    requirements: ['Existing CBZ account or national ID', 'Minimum deposit of USD 500 or ZWG equivalent', 'Investment mandate form'] },
  { id: 'business', name: 'SME & Business Account', pricing: 'Tailored business tariff', image: '/images/accounts/partnership.webp',
    description: 'For partnerships and companies: multiple signatories, internet banking and POS.',
    requirements: ['Certificate of incorporation (CR14 / CR6)', 'Directors’ national IDs and proof of residence', 'Tax clearance certificate (ITF263)'] },
  { id: 'church', name: 'ChurchSaver & Community Account', pricing: 'Zero maintenance fees', image: '/images/accounts/churchsaver.webp',
    description: 'For churches, NGOs, burial societies and community trusts.',
    requirements: ['Constitution or trust deed', 'Signatories’ national IDs and proof of residence', 'Committee resolution letter'] }
];

const ORGANISATION_ACCOUNTS = ['business', 'church'];
const isOrg = (a: Answers) => ORGANISATION_ACCOUNTS.includes(String(a.accountType));

export const SERVICES: Record<ServiceId, ServiceDef> = {
  /* -------------------------------------------------------- OPEN ACCOUNT */
  account: {
    id: 'account',
    name: 'Open an Account',
    entity: 'CBZ Bank',
    stage: 'Everyday money',
    tagline: 'Personal, foreign currency, savings and organisation accounts',
    refPrefix: 'AC',
    steps: [
      {
        id: 'accountType',
        title: 'Which account would you like to open?',
        fields: [
          { id: 'accountType', label: 'Account', type: 'cards', required: true,
            options: ACCOUNT_TYPES.map((t) => ({
              value: t.id, label: t.name, hint: t.description, badge: t.pricing, image: t.image, imageKey: `account.${t.id}`
            })) }
        ]
      },
      {
        id: 'about',
        title: 'About the account holder',
        intro: 'We use this to set up your account correctly and meet banking regulations.',
        fields: [
          { id: 'organisationName', label: 'Registered name of the organisation', type: 'text', required: true, showIf: isOrg },
          { id: 'registrationNumber', label: 'Registration number', type: 'text', required: true, showIf: isOrg },
          { id: 'role', label: 'Your role in the organisation', type: 'text', required: true, showIf: isOrg, placeholder: 'e.g. Director, Treasurer' },
          { id: 'employment', label: 'Employment status', type: 'select', required: true, showIf: (a) => !isOrg(a),
            options: [opt('employed', 'Employed'), opt('selfemployed', 'Self-employed'), opt('student', 'Student'), opt('retired', 'Retired'), opt('unemployed', 'Not working')] },
          { id: 'employer', label: 'Employer', type: 'text', required: true, showIf: (a) => !isOrg(a) && is(a, 'employment', 'employed') },
          { id: 'occupation', label: 'Occupation / line of business', type: 'text', required: true,
            showIf: (a) => !isOrg(a) && ['employed', 'selfemployed'].includes(String(a.employment)) },
          { id: 'sourceOfFunds', label: 'Main source of funds', type: 'select', required: true,
            options: [opt('salary', 'Salary'), opt('business', 'Business income'), opt('pension', 'Pension'), opt('remittances', 'Money from family / diaspora'), opt('donations', 'Donations / contributions'), opt('investments', 'Investments'), opt('other', 'Other')] },
          { id: 'monthlyDeposits', label: 'Expected monthly deposits (USD)', type: 'select', required: true,
            options: [opt('lt500', 'Under 500'), opt('500to2000', '500 – 2,000'), opt('2000to10000', '2,000 – 10,000'), opt('gt10000', 'Over 10,000')] }
        ]
      },
      {
        id: 'preferences',
        title: 'How you’ll bank with us',
        fields: [
          { id: 'currency', label: 'Account currency', type: 'select', required: true, showIf: (a) => !is(a, 'accountType', 'nostro'),
            options: [opt('USD', 'USD'), opt('ZWG', 'ZWG')] },
          { id: 'fcaCurrency', label: 'Foreign currency', type: 'select', required: true, showIf: (a) => is(a, 'accountType', 'nostro'),
            options: [opt('USD', 'USD'), opt('EUR', 'EUR'), opt('GBP', 'GBP'), opt('ZAR', 'ZAR')] },
          { id: 'branch', label: 'Preferred branch', type: 'text', required: true, placeholder: 'e.g. Kwame Nkrumah, Harare' },
          { id: 'channels', label: 'Ways to bank', type: 'multicards',
            options: [
              opt('card', 'Debit card', 'ZimSwitch or Visa, depending on the account'),
              opt('touch', 'CBZ Touch app', 'Mobile and internet banking'),
              opt('ussd', 'USSD *460#', 'Bank from any phone, no data needed'),
              opt('alerts', 'SMS & email alerts', 'Know about every transaction')
            ] }
        ]
      },
      {
        id: 'documents',
        title: 'Your documents',
        intro: 'Tick what you already have. You can still apply if something is missing; we’ll tell you what to bring.',
        fields: [
          ...ACCOUNT_TYPES.map<Field>((t) => ({
            id: `documents_${t.id}`, label: `Needed for the ${t.name}`, type: 'multicards',
            showIf: (a: Answers) => is(a, 'accountType', t.id),
            options: t.requirements.map((r, i) => opt(`doc${i + 1}`, r))
          })),
          { id: 'verification', label: 'How would you like to complete verification?', type: 'cards', required: true,
            options: [
              opt('branch', 'Visit my preferred branch', 'Bring your original documents; it takes about 15 minutes'),
              opt('call', 'Have a banker call me', 'A relationship officer will guide you')
            ] }
        ]
      }
    ],
    next: (a) => {
      const out: NextStep[] = [];
      if (isOrg(a))
        out.push({ to: 'riskadvisory', headline: 'Look after your people and assets.', body: 'Employee benefits and business cover through CBZ Risk Advisory.', cta: 'Speak to Risk Advisory' });
      out.push(
        { to: 'insurance', headline: 'Account on the way. What are you protecting?', body: 'Vehicle, home or business cover on one monthly debit.', cta: 'Get a quote' },
        { to: 'datvest', headline: 'Ready to grow your savings?', body: 'Unit trusts, money market and more with Datvest.', cta: 'Explore investing' },
        { to: 'bank', headline: 'Need a loan or mortgage too?', body: 'Apply with CBZ Bank in a few minutes.', cta: 'See loans' }
      );
      return out;
    }
  },

  /* ---------------------------------------------------------------- BANK */
  bank: {
    id: 'bank',
    name: 'Banking & Loans',
    entity: 'CBZ Bank',
    stage: 'Everyday money',
    tagline: 'Loans, mortgages, asset finance and diaspora banking',
    refPrefix: 'BK',
    steps: [
      {
        id: 'product',
        title: 'What do you need from the bank?',
        fields: [
          {
            id: 'product', label: 'I want to', type: 'cards', required: true,
            options: [
              opt('loan', 'Get a loan', 'Personal, education or business'),
              opt('mortgage', 'Get a mortgage', 'Buy, build or improve a home'),
              opt('asset', 'Finance an asset', 'Vehicles and equipment'),
              opt('diaspora', 'Bank from the diaspora', 'Support family, invest or build back home')
            ]
          }
        ]
      },
      {
        id: 'details',
        title: 'Tell us more',
        fields: [
          { id: 'loanAmount', label: 'Amount needed (USD)', type: 'number', required: true, showIf: (a) => is(a, 'product', 'loan') },
          { id: 'loanPurpose', label: 'Purpose', type: 'select', required: true, showIf: (a) => is(a, 'product', 'loan'),
            options: [opt('consumer', 'Personal / consumer'), opt('education', 'Education'), opt('business', 'Business')] },
          { id: 'employment', label: 'Income source', type: 'select', required: true, showIf: (a) => is(a, 'product', 'loan'),
            options: [opt('salaried', 'Salaried'), opt('selfemployed', 'Self-employed'), opt('business', 'Business owner')] },
          { id: 'propertyDescription', label: 'Property (project, stand or address)', type: 'text', required: true, showIf: (a) => is(a, 'product', 'mortgage') },
          { id: 'propertyValue', label: 'Property price (USD)', type: 'number', required: true, showIf: (a) => is(a, 'product', 'mortgage') },
          { id: 'deposit', label: 'Deposit you can pay (USD)', type: 'number', required: true, showIf: (a) => is(a, 'product', 'mortgage') },
          { id: 'termYears', label: 'Repayment period (years)', type: 'number', required: true, showIf: (a) => is(a, 'product', 'mortgage') },
          { id: 'assetDescription', label: 'What are you financing?', type: 'text', required: true, showIf: (a) => is(a, 'product', 'asset') },
          { id: 'assetValue', label: 'Asset value (USD)', type: 'number', required: true, showIf: (a) => is(a, 'product', 'asset') },
          { id: 'countryOfResidence', label: 'Country you live in', type: 'text', required: true, showIf: (a) => is(a, 'product', 'diaspora') },
          { id: 'diasporaGoal', label: 'Main goal', type: 'select', required: true, showIf: (a) => is(a, 'product', 'diaspora'),
            options: [opt('family', 'Support family'), opt('invest', 'Invest'), opt('home', 'Build or buy a home')] }
        ]
      }
    ],
    next: (a) => {
      const p = a.product;
      if (p === 'mortgage')
        return [
          { to: 'insurance', headline: 'New home? Let’s keep it safe.', body: 'Cover your home and contents with CBZ Insurance before you move in.', cta: 'Insure my home',
            seed: { asset: 'home', description: String(a.propertyDescription ?? ''), assetValue: String(a.propertyValue ?? '') } },
          { to: 'life', headline: 'Protect your family’s home loan.', body: 'Credit life clears the balance if the unexpected happens.', cta: 'Add credit life',
            seed: { purpose: 'credit', sumAssured: String(Math.max(num(a.propertyValue) - num(a.deposit), 0) || '') } }
        ];
      if (p === 'loan')
        return [
          { to: 'life', headline: 'Borrowing with peace of mind.', body: 'Credit life covers your loan so your family never carries it.', cta: 'Add credit life',
            seed: { purpose: 'credit', sumAssured: String(a.loanAmount ?? '') } },
          { to: 'datvest', headline: 'Got something to set aside?', body: 'Start building savings alongside your repayments.', cta: 'Explore investing' }
        ];
      if (p === 'asset')
        return [{ to: 'insurance', headline: 'Protect what you’re financing.', body: 'Get cover for your asset from day one.', cta: 'Get cover',
          seed: { description: String(a.assetDescription ?? ''), assetValue: String(a.assetValue ?? '') } }];
      if (p === 'diaspora')
        return [
          { to: 'properties', headline: 'Building back home?', body: 'See stands and homes from CBZ Properties.', cta: 'Explore properties' },
          { to: 'datvest', headline: 'Make your money work.', body: 'Invest locally or offshore with Datvest.', cta: 'Start investing' }
        ];
      return [
        { to: 'insurance', headline: 'What are you protecting?', body: 'Vehicle, home or business cover on one monthly payment.', cta: 'Get a quote' },
        { to: 'life', headline: 'Cover for life.', body: 'We’re here for you and your family.', cta: 'Get life cover' },
        { to: 'datvest', headline: 'Ready to grow your savings?', body: 'Unit trusts, money market and more.', cta: 'Explore investing' }
      ];
    }
  },

  /* ----------------------------------------------------------- PROPERTIES */
  properties: {
    id: 'properties',
    name: 'Property',
    entity: 'CBZ Properties',
    stage: 'Home & assets',
    tagline: 'Stands, homes and property investment',
    refPrefix: 'PR',
    steps: [
      {
        id: 'interest', title: 'What are you looking for?',
        fields: [{ id: 'intent', label: 'I want to', type: 'cards', required: true,
          options: [opt('stand', 'Buy a stand'), opt('house', 'Buy a house'), opt('invest', 'Invest in property'), opt('commercial', 'Commercial property')] }]
      },
      {
        id: 'budget', title: 'Your plan and budget',
        fields: [
          { id: 'project', label: 'Development or area you’re interested in', type: 'text', required: true, placeholder: 'e.g. the project name' },
          { id: 'size', label: 'Preferred size (m²)', type: 'text' },
          { id: 'budget', label: 'Total budget (USD)', type: 'number', required: true },
          { id: 'deposit', label: 'Amount you can pay upfront (USD)', type: 'number', required: true },
          { id: 'timeframe', label: 'When do you want to buy?', type: 'select', required: true,
            options: [opt('now', 'Within 3 months'), opt('soon', '3–12 months'), opt('later', 'More than a year')] }
        ]
      }
    ],
    next: (a) => {
      const gap = Math.max(num(a.budget) - num(a.deposit), 0);
      const out: NextStep[] = [];
      if (gap > 0)
        out.push({ to: 'bank', headline: 'Not enough saved yet? Let’s get you a mortgage.', body: 'CBZ Bank can finance the difference so you can still get the home.', cta: 'Apply for a mortgage',
          seed: { product: 'mortgage', propertyDescription: String(a.project ?? ''), propertyValue: String(a.budget ?? ''), deposit: String(a.deposit ?? '') } });
      out.push({ to: 'insurance', headline: 'New home? Let’s keep it safe.', body: 'Insure your property with CBZ Insurance.', cta: 'Insure my home',
        seed: { asset: 'home', description: String(a.project ?? ''), assetValue: String(a.budget ?? '') } });
      if (a.intent === 'invest') out.push({ to: 'datvest', headline: 'Spreading your investments?', body: 'Balance property with funds from Datvest.', cta: 'Explore investing' });
      return out;
    }
  },

  /* ------------------------------------------------------------ INSURANCE */
  insurance: {
    id: 'insurance',
    name: 'General Insurance',
    entity: 'CBZ Insurance',
    stage: 'Protect',
    tagline: 'Vehicle, home, business and more',
    refPrefix: 'IN',
    steps: [
      { id: 'asset', title: 'What would you like to cover?',
        fields: [{ id: 'asset', label: 'Cover for', type: 'cards', required: true,
          options: INSURANCE_ASSETS.map((x) => ({ value: x.id, label: x.name, hint: x.description, badge: x.entity })) }] },
      { id: 'details', title: 'About what you’re covering',
        fields: [
          { id: 'make', label: 'Make', type: 'text', required: true, showIf: (a) => is(a, 'asset', 'motor') },
          { id: 'model', label: 'Model & trim', type: 'text', required: true, showIf: (a) => is(a, 'asset', 'motor') },
          { id: 'year', label: 'Year of manufacture', type: 'text', required: true, showIf: (a) => is(a, 'asset', 'motor') },
          { id: 'regNumber', label: 'Registration plate', type: 'text', required: true, showIf: (a) => is(a, 'asset', 'motor') },
          { id: 'description', label: 'Describe what you’re covering', type: 'text', required: true, showIf: (a) => !is(a, 'asset', 'motor') },
          { id: 'assetValue', label: 'Estimated value (USD)', type: 'number', required: true }
        ] },
      { id: 'cover', title: 'Choose your level of protection',
        fields: [{ id: 'cover', label: 'Cover level', type: 'cards', required: true,
          options: INSURANCE_COVERS.map((c) => ({ value: c.id, label: c.name, hint: c.tier, priceUSD: c.basePriceUSD })) }] },
      { id: 'addons', title: 'Extras from across the Group',
        intro: 'Optional. Pick any or skip.',
        fields: [{ id: 'addons', label: 'Add-ons', type: 'multicards',
          options: INSURANCE_ADDONS.map((x) => ({ value: x.id, label: x.name, hint: x.description, badge: x.entity, priceUSD: x.priceUSD })) }] }
    ],
    estimate: (a) => {
      const cover = INSURANCE_COVERS.find((c) => c.id === a.cover);
      if (!cover) return null;
      const extras = INSURANCE_ADDONS.filter((x) => (a.addons as string[] | undefined)?.includes(x.id)).reduce((s, x) => s + x.priceUSD, 0);
      return cover.basePriceUSD + extras;
    },
    next: (a) => {
      const out: NextStep[] = [];
      if (!(a.addons as string[] | undefined)?.includes('creditlife'))
        out.push({ to: 'life', headline: 'Also need cover for life? We’re here for you.', body: 'Protect your family’s future with CBZ Life.', cta: 'Get life cover' });
      if (a.asset !== 'home')
        out.push({ to: 'properties', headline: 'Thinking of a home of your own?', body: 'Explore CBZ Properties, then finance it with a CBZ mortgage.', cta: 'Explore properties' });
      out.push({ to: 'datvest', headline: 'Protected. Now grow.', body: 'Put your savings to work with Datvest.', cta: 'Explore investing' });
      return out;
    }
  },

  /* ----------------------------------------------------------------- LIFE */
  life: {
    id: 'life',
    name: 'Life Assurance',
    entity: 'CBZ Life',
    stage: 'Protect',
    tagline: 'Cover for you and the people who depend on you',
    refPrefix: 'LF',
    steps: [{
      id: 'cover', title: 'What do you want to protect?',
      fields: [
        { id: 'purpose', label: 'Purpose', type: 'cards', required: true, options: LIFE_PURPOSES },
        { id: 'sumAssured', label: 'Cover amount you have in mind (USD)', type: 'number', required: true },
        { id: 'dependants', label: 'Number of dependants', type: 'number' },
        { id: 'beneficiaryName', label: 'Beneficiary full name', type: 'text', required: true },
        { id: 'beneficiaryRelationship', label: 'Relationship to beneficiary', type: 'text', required: true }
      ]
    }],
    next: (a) => [
      ...(a.purpose === 'education' || a.purpose === 'savings'
        ? [{ to: 'datvest' as const, headline: 'Build the fund alongside the cover.', body: 'Invest regularly toward your goal.', cta: 'Explore investing' }] : []),
      { to: 'properties', headline: 'Planning a home?', body: 'Explore CBZ Properties.', cta: 'Explore properties' },
      { to: 'insurance', headline: 'Protect what you own, too.', body: 'Vehicle, home and business cover.', cta: 'Get a quote' }
    ]
  },

  /* -------------------------------------------------------------- DATVEST */
  datvest: {
    id: 'datvest',
    name: 'Investments',
    entity: 'Datvest',
    stage: 'Grow',
    tagline: 'Unit trusts, equities, money market and alternatives',
    refPrefix: 'DV',
    steps: [{
      id: 'goal', title: 'What are you investing for?',
      fields: [
        { id: 'goal', label: 'Goal', type: 'cards', required: true,
          options: [opt('preserve', 'Preserve capital'), opt('grow', 'Grow wealth'), opt('income', 'Regular income'), opt('offshore', 'Offshore exposure')] },
        { id: 'amount', label: 'Amount to invest', type: 'number', required: true },
        { id: 'currency', label: 'Currency', type: 'select', required: true, options: [opt('USD', 'USD'), opt('ZWG', 'ZWG')] },
        { id: 'horizon', label: 'Time horizon', type: 'select', required: true, options: [opt('short', 'Under 1 year'), opt('medium', '1–5 years'), opt('long', '5+ years')] },
        { id: 'risk', label: 'Comfort with risk', type: 'select', required: true, options: [opt('low', 'Low'), opt('medium', 'Medium'), opt('high', 'High')] }
      ]
    }],
    next: () => [
      { to: 'properties', headline: 'Invest in bricks and mortar.', body: 'See what CBZ Properties offers.', cta: 'Explore properties' },
      { to: 'life', headline: 'Secure your plan.', body: 'Make sure your family is covered.', cta: 'Get life cover' },
      { to: 'capital', headline: 'Investing for a business?', body: 'Talk to CBZ Capital about raising or deploying capital.', cta: 'Speak to CBZ Capital' }
    ]
  },

  /* ------------------------------------------------------------ AGRO-YIELD */
  agroyield: {
    id: 'agroyield',
    name: 'Farming Finance',
    entity: 'CBZ Agro-Yield',
    stage: 'Business & farm',
    tagline: 'Inputs and finance for the season',
    refPrefix: 'AY',
    steps: [{
      id: 'farm', title: 'Tell us about your farming',
      fields: [
        { id: 'farmerType', label: 'I farm', type: 'cards', required: true,
          options: [opt('individual', 'On my own'), opt('group', 'As part of a group'), opt('commercial', 'Commercially')] },
        { id: 'crop', label: 'Main crop', type: 'select', required: true, options: [opt('maize', 'Maize'), opt('soya', 'Soya bean'), opt('wheat', 'Wheat'), opt('other', 'Other')] },
        { id: 'hectares', label: 'Hectares to plant', type: 'number', required: true },
        { id: 'location', label: 'District / location', type: 'text', required: true },
        { id: 'inputs', label: 'Inputs needed', type: 'multicards',
          options: [opt('seed', 'Seed'), opt('fertiliser', 'Fertiliser'), opt('chemicals', 'Chemicals'), opt('fuel', 'Fuel')] }
      ]
    }],
    next: () => [
      { to: 'insurance', headline: 'Protect your crop and equipment.', body: 'Agro insurance from CBZ Insurance.', cta: 'Get agro cover' },
      { to: 'account', headline: 'Where will the harvest income go?', body: 'Open an account to receive and manage it.', cta: 'Open an account' },
      { to: 'redsphere', headline: 'Need working capital off-season?', body: 'Red Sphere offers microfinance for day-to-day needs.', cta: 'Talk to Red Sphere' },
      { to: 'datvest', headline: 'Good season? Grow the profit.', body: 'Invest your surplus with Datvest.', cta: 'Explore investing' }
    ]
  },

  /* ------------------------------------------------------------ RED SPHERE */
  redsphere: {
    id: 'redsphere',
    name: 'Microfinance',
    entity: 'Red Sphere',
    stage: 'Business & farm',
    tagline: 'Small loans for small businesses and traders',
    refPrefix: 'RS',
    steps: [{
      id: 'loan', title: 'Tell us about your business',
      fields: [
        { id: 'businessType', label: 'What does your business do?', type: 'text', required: true },
        { id: 'tradingYears', label: 'Years trading', type: 'number', required: true },
        { id: 'loanPurpose', label: 'What will the loan be used for?', type: 'select', required: true,
          options: [opt('stock', 'Stock'), opt('workingcapital', 'Working capital'), opt('equipment', 'Equipment'), opt('other', 'Other')] },
        { id: 'amount', label: 'Amount needed (USD)', type: 'number', required: true },
        { id: 'termMonths', label: 'Repayment period (months)', type: 'number', required: true }
      ]
    }],
    next: (a) => [
      { to: 'life', headline: 'Protect your loan and your family.', body: 'Credit life covers repayments if the unexpected happens.', cta: 'Add credit life',
        seed: { purpose: 'credit', sumAssured: String(a.amount ?? '') } },
      { to: 'account', headline: 'Growing? Move to a business account.', body: 'Bank with CBZ and build your track record.', cta: 'Open an account', seed: { accountType: 'business' } },
      { to: 'insurance', headline: 'Cover your stock and equipment.', body: 'Business cover from CBZ Insurance.', cta: 'Get a quote' }
    ]
  },

  /* ------------------------------------------------------- RISK ADVISORY */
  riskadvisory: {
    id: 'riskadvisory',
    name: 'Risk Advisory',
    entity: 'CBZ Risk Advisory',
    stage: 'Business & farm',
    tagline: 'Insurance broking, employee benefits and financial planning',
    refPrefix: 'RA',
    steps: [{
      id: 'need', title: 'What can we advise you on?',
      fields: [
        { id: 'need', label: 'I need', type: 'cards', required: true,
          options: [opt('broking', 'Short-term insurance broking & risk advice'), opt('benefits', 'Employee benefits & pensions'), opt('planning', 'Personal life financial planning')] },
        { id: 'businessName', label: 'Business name', type: 'text', showIf: (a) => a.need !== 'planning' },
        { id: 'employees', label: 'Number of employees', type: 'number', showIf: (a) => is(a, 'need', 'benefits') }
      ]
    }],
    next: () => [
      { to: 'life', headline: 'Cover your people.', body: 'Group and individual life cover.', cta: 'Get life cover' },
      { to: 'insurance', headline: 'Cover your assets.', body: 'Business and property insurance.', cta: 'Get a quote' },
      { to: 'bank', headline: 'Banking for your business.', body: 'Corporate and SME banking with CBZ Bank.', cta: 'Speak to the bank' }
    ]
  },

  /* --------------------------------------------------------------- CAPITAL */
  capital: {
    id: 'capital',
    name: 'Investment Banking',
    entity: 'CBZ Capital',
    stage: 'Business & farm',
    tagline: 'Capital raising and corporate advisory',
    refPrefix: 'CC',
    steps: [{
      id: 'deal', title: 'Tell us about the opportunity',
      fields: [
        { id: 'companyName', label: 'Company name', type: 'text', required: true },
        { id: 'transaction', label: 'Looking for', type: 'cards', required: true,
          options: [opt('raise', 'Raise capital'), opt('advisory', 'Corporate advisory'), opt('mna', 'Mergers & acquisitions'), opt('other', 'Something else')] },
        { id: 'size', label: 'Approximate size (USD)', type: 'text', required: true },
        { id: 'sector', label: 'Sector', type: 'text', required: true }
      ]
    }],
    next: () => [
      { to: 'riskadvisory', headline: 'Protect the business you’re building.', body: 'Risk advisory and employee benefits.', cta: 'Speak to Risk Advisory' },
      { to: 'bank', headline: 'Corporate banking.', body: 'Accounts, trade finance and treasury.', cta: 'Speak to the bank' }
    ]
  }
};

export const SERVICE_LIST = Object.values(SERVICES);
export const STAGES: ServiceDef['stage'][] = ['Everyday money', 'Home & assets', 'Protect', 'Grow', 'Business & farm'];
