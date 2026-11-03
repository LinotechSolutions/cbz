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
};
