import { z } from 'astro/zod';
import { normalisePhone } from './format';
import type { Unit } from './submitForm';

/**
 * Form definitions and the Zod schemas built from them. The same schemas will
 * validate on the server, so keep everything here data-driven.
 */
export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hint?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  autocomplete?: string;
  /** Marks personal identifiers that must never be stored in a draft. */
  sensitive?: boolean;
  min?: number;
  max?: number;
}

export interface StepDef {
  title: string;
  intro?: string;
  fields: FieldDef[];
}

export interface FormDef {
  unit: Unit;
  formId: string;
  title: string;
  intro: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  steps: StepDef[];
}

export const phoneSchema = z
  .string()
  .min(1, 'Enter your phone number')
  .refine((v) => normalisePhone(v) !== null, 'Enter a valid phone number, for example 077 123 4567 or +263 77 123 4567');

export function fieldSchema(f: FieldDef): z.ZodTypeAny {
  let s: z.ZodTypeAny;
  switch (f.type) {
    case 'email':
      s = z.string().trim().email('Enter a valid email address');
      break;
    case 'tel':
      s = phoneSchema;
      break;
    case 'number': {
      let n = z.coerce.number({ invalid_type_error: 'Enter a number' });
      if (f.min !== undefined) n = n.min(f.min, `Enter at least ${f.min}`);
      if (f.max !== undefined) n = n.max(f.max, `Enter at most ${f.max}`);
      s = n;
      break;
    }
    case 'checkbox':
      s = f.required ? z.literal(true, { errorMap: () => ({ message: 'You need to tick this box to continue' }) }) : z.boolean();
      break;
    case 'select':
      s = z.string().min(1, 'Choose an option');
      break;
    case 'date':
      s = z.string().min(1, 'Enter a date');
      break;
    default:
      s = z.string().trim().min(1, `Enter ${f.label.toLowerCase()}`).max(500, 'Keep this under 500 characters');
  }
  if (!f.required && f.type !== 'checkbox') {
    s = z.union([z.literal(''), s]).optional();
  }
  return s;
}

export function stepSchema(step: StepDef) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of step.fields) shape[f.name] = fieldSchema(f);
  return z.object(shape);
}

export function formSchema(def: FormDef) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const step of def.steps) for (const f of step.fields) shape[f.name] = fieldSchema(f);
  return z.object(shape);
}

/** Zimbabwe-first list, then the diaspora's common countries. */
export const COUNTRIES = [
  'Zimbabwe',
  'South Africa',
  'United Kingdom',
  'United States',
  'Australia',
  'Canada',
  'Botswana',
  'Zambia',
  'Namibia',
  'Other',
].map((c) => ({ value: c, label: c }));

const contactStep = (intro?: string): StepDef => ({
  title: 'Your details',
  intro,
  fields: [
    { name: 'firstName', label: 'First name', type: 'text', required: true, autocomplete: 'given-name' },
    { name: 'surname', label: 'Surname', type: 'text', required: true, autocomplete: 'family-name' },
    { name: 'phone', label: 'Phone number', type: 'tel', required: true, autocomplete: 'tel', hint: 'We will call or WhatsApp this number.' },
    { name: 'email', label: 'Email address', type: 'email', required: true, autocomplete: 'email' },
  ],
});

const consentStep: StepDef = {
  title: 'Before you send',
  fields: [
    {
      name: 'consent',
      label: 'I agree to CBZ contacting me about this request and handling my details under its privacy policy.',
      type: 'checkbox',
      required: true,
    },
  ],
};

/** A short "call me back" form, one per unit, so submissions route to the right team. */
export function callbackForm(unit: Unit, formId: string, unitName: string, topics: { value: string; label: string }[]): FormDef {
  return {
    unit,
    formId,
    title: `Call me back: ${unitName}`,
    intro: `Leave your number and a ${unitName} consultant will call you, usually within one working day.`,
    submitLabel: 'Request a call',
    successTitle: 'We will call you',
    successBody: `A ${unitName} consultant will call you, usually within one working day.`,
    steps: [
      {
        title: 'What is it about?',
        fields: [
          { name: 'topic', label: 'Topic', type: 'select', required: true, options: topics },
          { name: 'bestTime', label: 'Best time to call', type: 'select', required: false, options: [{ value: 'morning', label: 'Morning' }, { value: 'afternoon', label: 'Afternoon' }, { value: 'any', label: 'Any time' }], hint: 'Optional' },
          { name: 'notes', label: 'Anything we should know first', type: 'textarea', required: false, hint: 'Optional' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  };
}

const POLICY_FIELDS: FieldDef[] = [
  { name: 'policyNumber', label: 'Policy number', type: 'text', required: true, hint: 'On your policy schedule or renewal notice.' },
  { name: 'policyHolder', label: 'Name of the policyholder', type: 'text', required: true },
];

export const FORMS: Record<string, FormDef> = {
  'bank-open-account': {
    unit: 'bank',
    formId: 'bank-open-account',
    title: 'Open an account with CBZ Bank',
    intro: 'Tell us a little about yourself and which account you want. A relationship manager will finish the opening with you.',
    submitLabel: 'Send my application',
    successTitle: 'Your application is on its way',
    successBody: 'A CBZ Bank relationship manager will contact you within two working days to complete your account opening.',
    steps: [
      {
        title: 'Which account?',
        fields: [
          {
            name: 'accountType',
            label: 'Account type',
            type: 'select',
            required: true,
            options: [
              { value: 'current', label: 'Current account' },
              { value: 'savings', label: 'Savings account' },
              { value: 'fca', label: 'Foreign currency account' },
              { value: 'smartcash', label: 'SmartCash account' },
              { value: 'student', label: 'Student account' },
              { value: 'business', label: 'Business or corporate account' },
              { value: 'unsure', label: 'Not sure, help me choose' },
            ],
          },
          {
            name: 'customerType',
            label: 'I am applying as',
            type: 'select',
            required: true,
            options: [
              { value: 'individual', label: 'An individual' },
              { value: 'joint', label: 'A couple, for a joint account' },
              { value: 'business', label: 'A business, school or church' },
            ],
          },
          { name: 'country', label: 'Country you live in', type: 'select', required: true, options: COUNTRIES },
        ],
      },
      contactStep(),
      {
        title: 'Anything else?',
        fields: [
          { name: 'branch', label: 'Preferred branch or town', type: 'text', required: false, hint: 'Optional' },
          { name: 'notes', label: 'Anything you would like us to know', type: 'textarea', required: false, hint: 'Optional' },
        ],
      },
      consentStep,
    ],
  },
  'bank-apply': {
    unit: 'bank',
    formId: 'bank-apply',
    title: 'Apply for a loan or mortgage',
    intro: 'Tell us what you want to finance. We will come back with what you qualify for and the documents we need.',
    submitLabel: 'Send my application',
    successTitle: 'Your application is on its way',
    successBody: 'A CBZ Bank lending officer will contact you within two working days.',
    steps: [
      {
        title: 'What are you financing?',
        fields: [
          {
            name: 'loanType',
            label: 'Type of loan',
            type: 'select',
            required: true,
            options: [
              { value: 'mortgage', label: 'Mortgage' },
              { value: 'car', label: 'Car finance' },
              { value: 'personal', label: 'Personal loan' },
              { value: 'school', label: 'School fees loan' },
              { value: 'civil', label: 'Civil servant loan' },
              { value: 'business', label: 'Business loan' },
            ],
          },
          { name: 'amount', label: 'Amount you need, in US$', type: 'number', required: true, min: 100, max: 5_000_000 },
          { name: 'existingCustomer', label: 'Do you bank with CBZ?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        ],
      },
      contactStep(),
      {
        title: 'Your income',
        fields: [
          {
            name: 'employment',
            label: 'Employment',
            type: 'select',
            required: true,
            options: [
              { value: 'employed', label: 'Employed' },
              { value: 'civil-servant', label: 'Civil servant' },
              { value: 'self-employed', label: 'Self-employed' },
              { value: 'business', label: 'Business owner' },
              { value: 'other', label: 'Other' },
            ],
          },
          { name: 'monthlyIncome', label: 'Monthly income, in US$', type: 'number', required: true, min: 0, max: 1_000_000 },
        ],
      },
      consentStep,
    ],
  },
  'insurance-quote': {
    unit: 'insurance',
    formId: 'insurance-quote',
    title: 'Get a quote from CBZ Insurance',
    intro: 'Tell us what you want covered. We will send a quotation, usually within one working day.',
    submitLabel: 'Request my quote',
    successTitle: 'Your quote request is in',
    successBody: 'A CBZ Insurance consultant will send your quotation, usually within one working day.',
    steps: [
      {
        title: 'What do you want to cover?',
        fields: [
          {
            name: 'cover',
            label: 'Type of cover',
            type: 'select',
            required: true,
            options: [
              { value: 'motor', label: 'Car or vehicle' },
              { value: 'home', label: 'Home and contents' },
              { value: 'travel', label: 'Travel' },
              { value: 'accident', label: 'Personal accident' },
              { value: 'business', label: 'Business or commercial' },
              { value: 'farm', label: 'Crops, livestock or farm machinery' },
            ],
          },
          { name: 'value', label: 'Approximate value to insure, in US$', type: 'number', required: false, min: 0, max: 50_000_000, hint: 'Optional' },
          { name: 'details', label: 'Tell us about it', type: 'textarea', required: false, hint: 'For a vehicle: make, model and year. For a home: location and type. Optional.' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'life-quote': {
    unit: 'cbz-life',
    formId: 'life-quote',
    title: 'Request a quotation from CBZ Life',
    intro: 'Tell us which plan interests you and who it is for.',
    submitLabel: 'Request my quotation',
    successTitle: 'Your quotation request is in',
    successBody: 'A CBZ Life consultant will contact you with a quotation and the policy terms.',
    steps: [
      {
        title: 'Which plan?',
        fields: [
          {
            name: 'plan',
            label: 'Plan',
            type: 'select',
            required: true,
            options: [
              { value: 'comfortsure', label: 'Comfortsure funeral cash plan' },
              { value: 'sarapavana', label: 'Sarapavana education plan' },
              { value: 'group-life', label: 'Group life for my employees' },
              { value: 'retirement', label: 'Retirement savings or annuity' },
              { value: 'credit-life', label: 'Credit life' },
              { value: 'unsure', label: 'Not sure, help me choose' },
            ],
          },
          { name: 'livesCovered', label: 'How many people to cover', type: 'number', required: false, min: 1, max: 10_000, hint: 'Optional' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'datvest-start': {
    unit: 'datvest',
    formId: 'datvest-start',
    title: 'Start investing with Datvest',
    intro: 'Tell us your goal and timeframe. An adviser will set out the options and open your account.',
    submitLabel: 'Send my request',
    successTitle: 'Your request is in',
    successBody: 'A Datvest adviser will contact you within two working days.',
    steps: [
      {
        title: 'Your goal',
        fields: [
          {
            name: 'goal',
            label: 'What are you investing for?',
            type: 'select',
            required: true,
            options: [
              { value: 'save', label: 'Short-term savings' },
              { value: 'grow', label: 'Long-term growth' },
              { value: 'income', label: 'Regular income' },
              { value: 'retirement', label: 'Retirement' },
              { value: 'institution', label: 'An institution or pension fund' },
            ],
          },
          { name: 'horizon', label: 'How many years until you need the money', type: 'number', required: true, min: 0, max: 50 },
          { name: 'initial', label: 'Starting amount, in US$', type: 'number', required: false, min: 0, max: 100_000_000, hint: 'Optional' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'properties-viewing': {
    unit: 'properties',
    formId: 'properties-viewing',
    title: 'Request a viewing',
    intro: 'Tell us which property or development interests you and when suits you.',
    submitLabel: 'Request a viewing',
    successTitle: 'Your viewing request is in',
    successBody: 'CBZ Properties will contact you to confirm a time.',
    steps: [
      {
        title: 'The property',
        fields: [
          { name: 'property', label: 'Property or development', type: 'text', required: true, hint: 'The name from the listing, or describe what you are looking for.' },
          { name: 'interest', label: 'I want to', type: 'select', required: true, options: [{ value: 'buy', label: 'Buy' }, { value: 'rent', label: 'Rent' }, { value: 'invest', label: 'Invest' }] },
          { name: 'needsFinance', label: 'Would you like a CBZ Bank mortgage?', type: 'select', required: false, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'maybe', label: 'Maybe' }] },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'capital-enquiry': {
    unit: 'capital',
    formId: 'capital-enquiry',
    title: 'Start a capital enquiry',
    intro: 'Tell us about the transaction and a senior banker will come back to you.',
    submitLabel: 'Send my enquiry',
    successTitle: 'Your enquiry is in',
    successBody: 'A CBZ Capital banker will contact you within two working days.',
    steps: [
      {
        title: 'The mandate',
        fields: [
          { name: 'company', label: 'Company', type: 'text', required: true, autocomplete: 'organization' },
          {
            name: 'need',
            label: 'What do you need?',
            type: 'select',
            required: true,
            options: [
              { value: 'debt', label: 'Debt raising or syndication' },
              { value: 'equity', label: 'Equity raising or listing' },
              { value: 'ma', label: 'Mergers and acquisitions' },
              { value: 'restructuring', label: 'Restructuring' },
              { value: 'ppp', label: 'Infrastructure or PPP' },
              { value: 'other', label: 'Something else' },
            ],
          },
          { name: 'size', label: 'Approximate size, in US$', type: 'number', required: false, min: 0, max: 10_000_000_000, hint: 'Optional' },
          { name: 'details', label: 'Tell us more', type: 'textarea', required: false, hint: 'Optional' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'risk-consultation': {
    unit: 'risk-advisory',
    formId: 'risk-consultation',
    title: 'Request a risk consultation',
    intro: 'Tell us about your organisation and what you want reviewed.',
    submitLabel: 'Request a consultation',
    successTitle: 'Your request is in',
    successBody: 'A CBZ Risk Advisory consultant will contact you within two working days.',
    steps: [
      {
        title: 'Your organisation',
        fields: [
          { name: 'company', label: 'Organisation', type: 'text', required: true, autocomplete: 'organization' },
          {
            name: 'need',
            label: 'What would you like reviewed?',
            type: 'select',
            required: true,
            options: [
              { value: 'broking', label: 'Insurance portfolio and broking' },
              { value: 'risk', label: 'Enterprise risk audit' },
              { value: 'benefits', label: 'Employee benefits and pensions' },
              { value: 'healthcare', label: 'Healthcare consulting' },
              { value: 'reinsurance', label: 'Reinsurance placement' },
              { value: 'claims', label: 'A claim' },
            ],
          },
          { name: 'details', label: 'Tell us more', type: 'textarea', required: false, hint: 'Optional' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'agro-apply': {
    unit: 'agro-yield',
    formId: 'agro-apply',
    title: 'Apply for farming finance',
    intro: 'Tell us about your farm and the season you are planning for.',
    submitLabel: 'Send my application',
    successTitle: 'Your application is in',
    successBody: 'CBZ Agro-Yield will contact you about the next steps and the documents needed.',
    steps: [
      {
        title: 'Your farm',
        fields: [
          { name: 'location', label: 'Farm location, district or province', type: 'text', required: true },
          { name: 'hectares', label: 'Hectares you plan to plant', type: 'number', required: true, min: 0.1, max: 100_000 },
          {
            name: 'crop',
            label: 'Main crop',
            type: 'select',
            required: true,
            options: [
              { value: 'maize', label: 'Maize' },
              { value: 'soya', label: 'Soya beans' },
              { value: 'wheat', label: 'Wheat' },
              { value: 'tobacco', label: 'Tobacco' },
              { value: 'horticulture', label: 'Horticulture' },
              { value: 'livestock', label: 'Livestock' },
              { value: 'other', label: 'Other' },
            ],
          },
          {
            name: 'need',
            label: 'What do you need?',
            type: 'select',
            required: true,
            options: [
              { value: 'contract', label: 'Contract farming for the season' },
              { value: 'jv', label: 'A joint venture' },
              { value: 'equipment', label: 'Mechanisation or equipment' },
              { value: 'water', label: 'Borehole or irrigation' },
              { value: 'offtake', label: 'A buyer for my produce' },
            ],
          },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'contact-enquiry': {
    unit: 'group',
    formId: 'contact-enquiry',
    title: 'Send us a message',
    intro: 'Tell us how we can help and the right team will reply.',
    submitLabel: 'Send message',
    successTitle: 'Thanks, we have your message',
    successBody: 'The right team will reply to you, usually within one working day.',
    steps: [
      {
        title: 'Your message',
        fields: [
          {
            name: 'topic',
            label: 'Topic',
            type: 'select',
            required: true,
            options: [
              { value: 'bank', label: 'Banking' },
              { value: 'cards', label: 'Cards and digital banking' },
              { value: 'loans', label: 'Loans and mortgages' },
              { value: 'insurance', label: 'Insurance' },
              { value: 'invest', label: 'Investments' },
              { value: 'properties', label: 'Properties' },
              { value: 'agro', label: 'Agro-Yield' },
              { value: 'complaint', label: 'A complaint' },
              { value: 'other', label: 'Something else' },
            ],
          },
          { name: 'message', label: 'Your message', type: 'textarea', required: true },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },

  // Site map actions per unit.
  'bank-call-me-back': callbackForm('bank', 'bank-call-me-back', 'CBZ Bank', [
    { value: 'accounts', label: 'Accounts and cards' },
    { value: 'loans', label: 'Loans and mortgages' },
    { value: 'digital', label: 'CBZ Touch and internet banking' },
    { value: 'business', label: 'Business banking' },
    { value: 'other', label: 'Something else' },
  ]),
  'insurance-insure-now': {
    unit: 'insurance',
    formId: 'insurance-insure-now',
    title: 'Insure now',
    intro: 'Apply for personal cover. You can pay your premium by direct debit or mobile money.',
    submitLabel: 'Send my application',
    successTitle: 'Your application is in',
    successBody: 'CBZ Insurance will confirm your cover and your first premium, usually within one working day.',
    steps: [
      {
        title: 'What are you insuring?',
        fields: [
          {
            name: 'cover',
            label: 'Type of cover',
            type: 'select',
            required: true,
            options: [
              { value: 'motor', label: 'Car or vehicle' },
              { value: 'home', label: 'Home and contents' },
              { value: 'travel', label: 'Travel' },
              { value: 'accident', label: 'Personal accident' },
            ],
          },
          { name: 'details', label: 'Describe what you are insuring', type: 'textarea', required: true, hint: 'For a vehicle: make, model, year and registration. For a home: address and type.' },
          { name: 'value', label: 'Value to insure, in US$', type: 'number', required: true, min: 100, max: 50_000_000 },
          {
            name: 'paymentMethod',
            label: 'How would you like to pay your premium?',
            type: 'select',
            required: true,
            options: [
              { value: 'debit-order', label: 'Direct debit from my CBZ account' },
              { value: 'mobile-money', label: 'Mobile money' },
            ],
          },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'insurance-claim': {
    unit: 'insurance',
    formId: 'insurance-claim',
    title: 'Submit a claim',
    intro: 'Tell us what happened. A claims assessor will contact you about the next steps and any documents needed.',
    submitLabel: 'Submit my claim',
    successTitle: 'Your claim is registered',
    successBody: 'A CBZ Insurance claims assessor will contact you within two working days.',
    steps: [
      {
        title: 'Your policy',
        fields: [
          ...POLICY_FIELDS,
          { name: 'incidentDate', label: 'Date of the incident', type: 'date', required: true },
          { name: 'description', label: 'What happened?', type: 'textarea', required: true },
          { name: 'policeReport', label: 'Police report number', type: 'text', required: false, hint: 'If one was made. Optional.' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'insurance-policy-changes': {
    unit: 'insurance',
    formId: 'insurance-policy-changes',
    title: 'Policy changes and enquiries',
    intro: 'Check a policy status, renew, cancel, request a statement or ask about a premium.',
    submitLabel: 'Send my request',
    successTitle: 'Your request is in',
    successBody: 'CBZ Insurance will come back to you, usually within one working day.',
    steps: [
      {
        title: 'Your request',
        fields: [
          ...POLICY_FIELDS,
          {
            name: 'request',
            label: 'What do you need?',
            type: 'select',
            required: true,
            options: [
              { value: 'status', label: 'Policy status' },
              { value: 'renewal', label: 'Renewal' },
              { value: 'cancellation', label: 'Cancellation' },
              { value: 'statement', label: 'Statement' },
              { value: 'premium', label: 'Premium enquiry' },
              { value: 'other', label: 'Something else' },
            ],
          },
          { name: 'details', label: 'Details', type: 'textarea', required: false, hint: 'Optional' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'insurance-call-me-back': callbackForm('insurance', 'insurance-call-me-back', 'CBZ Insurance', [
    { value: 'quote', label: 'A quote' },
    { value: 'claim', label: 'A claim' },
    { value: 'policy', label: 'An existing policy' },
    { value: 'business', label: 'Business or farm cover' },
  ]),
  'life-take-cover': {
    unit: 'cbz-life',
    formId: 'life-take-cover',
    title: 'Take cover',
    intro: 'Start a Comfortsure or Sarapavana policy. A consultant completes the onboarding with you.',
    submitLabel: 'Send my application',
    successTitle: 'Your application is in',
    successBody: 'A CBZ Life consultant will contact you to complete your policy.',
    steps: [
      {
        title: 'The plan',
        fields: [
          {
            name: 'plan',
            label: 'Plan',
            type: 'select',
            required: true,
            options: [
              { value: 'comfortsure', label: 'Comfortsure funeral cash plan' },
              { value: 'sarapavana', label: 'Sarapavana education plan' },
            ],
          },
          { name: 'livesCovered', label: 'How many people to cover', type: 'number', required: true, min: 1, max: 50 },
          { name: 'dateOfBirth', label: 'Your date of birth', type: 'date', required: true },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'life-claim': {
    unit: 'cbz-life',
    formId: 'life-claim',
    title: 'Submit a claim',
    intro: 'We are sorry for your loss. Tell us about the policy and a claims consultant will guide you through the rest.',
    submitLabel: 'Submit my claim',
    successTitle: 'Your claim is registered',
    successBody: 'A CBZ Life claims consultant will contact you within one working day.',
    steps: [
      {
        title: 'The policy',
        fields: [
          ...POLICY_FIELDS,
          { name: 'eventDate', label: 'Date of the event', type: 'date', required: true },
          { name: 'relationship', label: 'Your relationship to the policyholder', type: 'text', required: true },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'life-talk-to-an-agent': callbackForm('cbz-life', 'life-talk-to-an-agent', 'CBZ Life', [
    { value: 'funeral', label: 'Funeral cover' },
    { value: 'education', label: 'Education plan' },
    { value: 'employer', label: 'Cover for my employees' },
    { value: 'policy', label: 'An existing policy' },
  ]),
  'datvest-call-me-back': callbackForm('datvest', 'datvest-call-me-back', 'Datvest', [
    { value: 'unit-trusts', label: 'Unit trusts' },
    { value: 'institutional', label: 'Pension fund or institutional mandate' },
    { value: 'wealth', label: 'Private wealth' },
  ]),
  'properties-call-back': callbackForm('properties', 'properties-call-back', 'CBZ Properties', [
    { value: 'buy', label: 'Buying a stand or home' },
    { value: 'rent', label: 'Renting commercial space' },
    { value: 'valuation', label: 'A valuation' },
    { value: 'management', label: 'Property management' },
  ]),
  'agro-enquire': callbackForm('agro-yield', 'agro-enquire', 'CBZ Agro-Yield', [
    { value: 'contract', label: 'Contract farming' },
    { value: 'jv', label: 'A joint venture' },
    { value: 'trading', label: 'Commodity trading and offtake' },
    { value: 'supply', label: 'Mechanisation, equipment or water' },
  ]),
  'red-sphere-enquire': callbackForm('red-sphere', 'red-sphere-enquire', 'Red Sphere Finance', [
    { value: 'salary', label: 'A salary-based loan' },
    { value: 'sme', label: 'SME working capital' },
    { value: 'partners', label: 'Agency or partnership' },
    { value: 'invoice', label: 'Invoice discounting' },
  ]),
  'capital-call-me-back': callbackForm('capital', 'capital-call-me-back', 'CBZ Capital', [
    { value: 'debt', label: 'Debt raising or syndication' },
    { value: 'equity', label: 'Equity raising or listing' },
    { value: 'ma', label: 'Mergers and acquisitions' },
    { value: 'ppp', label: 'Infrastructure or PPP' },
  ]),
  'risk-audit': {
    unit: 'risk-advisory',
    formId: 'risk-audit',
    title: 'Request an insurance audit',
    intro: 'A broker reviews every policy your organisation holds for gaps, overlaps and cost.',
    submitLabel: 'Request an audit',
    successTitle: 'Your audit request is in',
    successBody: 'A CBZ Risk Advisory consultant will contact you within two working days.',
    steps: [
      {
        title: 'Your organisation',
        fields: [
          { name: 'company', label: 'Organisation', type: 'text', required: true, autocomplete: 'organization' },
          { name: 'employees', label: 'Number of employees', type: 'number', required: false, min: 1, max: 100_000, hint: 'Optional' },
          { name: 'policies', label: 'Policies you hold today', type: 'textarea', required: false, hint: 'Insurers and cover types, as far as you know them. Optional.' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
  'risk-quote': {
    unit: 'risk-advisory',
    formId: 'risk-quote',
    title: 'Get a quote through CBZ Risk Advisory',
    intro: 'Tell us what you need covered and we will place it across licensed underwriters.',
    submitLabel: 'Request my quote',
    successTitle: 'Your quote request is in',
    successBody: 'A CBZ Risk Advisory broker will come back with options, usually within two working days.',
    steps: [
      {
        title: 'What needs cover?',
        fields: [
          { name: 'company', label: 'Organisation or your name', type: 'text', required: true },
          {
            name: 'need',
            label: 'Cover needed',
            type: 'select',
            required: true,
            options: [
              { value: 'property', label: 'Property and assets' },
              { value: 'fleet', label: 'Fleet or marine cargo' },
              { value: 'liability', label: 'Liability and directors and officers' },
              { value: 'benefits', label: 'Employee benefits or healthcare' },
              { value: 'reinsurance', label: 'Reinsurance' },
              { value: 'personal', label: 'Personal cover' },
            ],
          },
          { name: 'details', label: 'Tell us more', type: 'textarea', required: false, hint: 'Optional' },
        ],
      },
      contactStep(),
      consentStep,
    ],
  },
};
