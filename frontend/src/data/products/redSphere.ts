import { ProductItem } from '../../types';

/**
 * Red Sphere Finance catalogue, transcribed from the Red Sphere Finance products deck.
 *
 * Rates, tenors and administration fees are stated exactly as the deck gives them.
 * `requirements` carries the deck's "Product documentation" column: what a customer
 * must bring to apply.
 *
 * Red Sphere is a separate subsidiary. Earlier copy listed a single invented
 * "Red Sphere SME Micro-Credit" product inside the CBZ Bank loan book; that was
 * wrong and has been removed.
 */

export const RED_SPHERE_CATEGORIES = [
  { id: 'salary', label: 'Salary-based lending' },
  { id: 'business', label: 'Business lending' },
  { id: 'partners', label: 'Agents & partners' },
  { id: 'agriculture', label: 'Agriculture' },
] as const;

const SALARY_DOCS = [
  'Customer national ID',
  'Pay slip',
  'Proof of employment / residence',
];

const COMPANY_DOCS = [
  'Company KYC documents',
  'Financials for the past year',
  'Management accounts',
  'Shop licence',
  'Bank statement',
  'KYC for all directors',
  'Copy of security to be declared',
];

export const RED_SPHERE_PRODUCTS: Record<string, ProductItem[]> = {
  salary: [
    {
      id: 'ssb_loan',
      icon: 'Banknote',
      name: 'SSB Loan',
      description:
        'Salary-based lending for government employees, with convenient access to finance and a fast turnaround.',
      pricing: '6% interest · up to US$2,400',
      target: 'Government employees',
      tenor: '24 months',
      interestRate: '6%',
      limit: 'US$2,400',
      features: ['Tenor: 24 months', 'Limit: US$2,400', 'Interest rate: 6%'],
      benefits: ['Convenient access to finance', 'Fast turnaround time'],
      requirements: SALARY_DOCS,
    },
    {
      id: 'pensioners',
      icon: 'ShieldCheck',
      name: 'Pensioners Loan',
      description:
        'Financial flexibility and independence for government pensioners, even after retirement.',
      pricing: '6% interest',
      target: 'Government pensioners',
      tenor: '12 months',
      interestRate: '6%',
      features: ['Tenor: 12 months', 'Interest rate: 6%'],
      benefits: ['Access to finance after retirement', 'Financial independence'],
      requirements: SALARY_DOCS,
    },
    {
      id: 'private_payroll',
      icon: 'Briefcase',
      name: 'Private Payroll Loan',
      description:
        'Convenient salary-based finance for employees of participating private employers.',
      pricing: '7.25% interest · 5% admin fee',
      target: 'Salary based individuals',
      tenor: '12 months',
      interestRate: '7.25%',
      adminFee: '5%',
      features: ['Tenor: 12 months', 'Interest rate: 7.25%', 'Admin fee: 5%'],
      benefits: ['Flexible personal financing', 'Employer partnership benefits'],
      requirements: [...SALARY_DOCS, 'Bank statement'],
    },
    {
      id: 'lockable_device',
      icon: 'Smartphone',
      name: 'Partner Lockable Device — Chipset & Avantvest',
      description:
        'Access to productive assets for salaried individuals without direct salary deductions, with built-in asset security.',
      pricing: '5% interest',
      target: 'Salaried individuals without direct deductions',
      tenor: '6 months',
      interestRate: '5%',
      features: ['Tenor: 6 months', 'Interest rate: 5%'],
      benefits: [
        'Built-in asset security',
        'Access to essential equipment for non-SSB clients',
      ],
      requirements: ['KYC including ID', 'Proof of residence and employment', 'Payslip'],
    },
  ],

  business: [
    {
      id: 'sme_working_capital',
      icon: 'Building2',
      name: 'SME Working Capital',
      description:
        'Closes cash-flow gaps for registered enterprises so they can keep trading and fulfil customer orders.',
      pricing: '5% interest · 5.2% admin fee',
      target: 'Registered enterprises',
      tenor: '12 months',
      interestRate: '5%',
      adminFee: '5.2%',
      features: ['Tenor: 12 months', 'Interest: 5%', 'Admin fees: 5.2%'],
      benefits: [
        'Business continuity',
        'Supports business growth',
        'Fulfil customer orders',
      ],
      requirements: [
        'Company KYC documents',
        'Financials for the past year',
        'Management accounts',
        'Shop licence',
        'Tax clearance',
        'KYC for all directors',
        'Bank statement',
        'Copy of security to be declared',
      ],
    },
    {
      id: 'tuckshop',
      icon: 'ShoppingBag',
      name: 'SME Tuck-shop Facility',
      description:
        'Short-term stock finance for tuck-shops: stock more, sell more, grow more.',
      pricing: '5% interest · 5.2% admin fee',
      target: 'Tuck-shops, registered or not registered',
      tenor: '1 month',
      interestRate: '5%',
      adminFee: '5.2%',
      features: ['Tenor: 1 month', 'Interest: 5%', 'Admin fees: 5.2%'],
      benefits: ['Stock replenishment', 'Business growth'],
      requirements: COMPANY_DOCS,
    },
    {
      id: 'individual_business',
      icon: 'Briefcase',
      name: 'Individual Business Loans',
      description:
        'Working capital for unregistered small businesses looking to increase capacity.',
      pricing: '5% interest · 5.2% admin fee',
      target: 'Unregistered small business',
      tenor: '6 months',
      interestRate: '5%',
      adminFee: '5.2%',
      features: ['Tenor: 6 months', 'Interest: 5%', 'Admin fees: 5.2%'],
      benefits: ['Working capital support', 'Business sustainability'],
      requirements: [
        'Shop licence',
        'KYC for the sole proprietor',
        'Copy of collateral to be used',
        'Financials for 6 months',
      ],
    },
    {
      id: 'order_finance',
      icon: 'FileCheck',
      name: 'Order Financing & Invoice Discounting',
      description:
        'Turns outstanding invoices into working capital and improves supplier capacity.',
      pricing: '5% interest · 90 days',
      target: 'Registered companies',
      tenor: '90 days',
      interestRate: '5%',
      features: ['Tenor: 90 days', 'Interest: 5%'],
      benefits: [
        'Maintain operations',
        'Meet supplier obligations',
        'Support business growth',
      ],
      requirements: [
        'Company KYC',
        'Financial and management statements',
        'Bank statement',
        'Letter of undertaking',
        'Invoice or order',
      ],
    },
  ],

  partners: [
    {
      id: 'partner_personal_loan',
      icon: 'HeartHandshake',
      name: 'Agents & Partners Personal Loans',
      description:
        'Personal lending for Red Sphere agents and partners: more than a partnership, a financial advantage.',
      pricing: '5% interest · up to US$2,000',
      target: 'All agents and partners',
      tenor: '12 months',
      interestRate: '5%',
      adminFee: '5.2%',
      limit: 'US$2,000',
      features: [
        'Tenor: 12 months',
        'Interest rate: 5%',
        'Admin fees: 5.2%',
        'Loan amount up to US$2,000',
      ],
      benefits: ['Acts as a lock-in effect for agents and partners'],
      requirements: ['Agent / partner KYC', 'Disbursement history'],
    },
    {
      id: 'partner_car_loan',
      icon: 'Car',
      name: 'Agents & Partners Car Loan',
      description: 'Vehicle finance for Red Sphere agents and partners, on a 30% deposit.',
      pricing: '5% interest · 30% deposit',
      target: 'All agents and partners',
      tenor: '12 months',
      interestRate: '5%',
      adminFee: '5.2%',
      features: ['Tenor: 12 months', 'Interest rate: 5%', 'Admin fees: 5.2%'],
      benefits: ['Acts as a lock-in effect for agents and partners'],
      requirements: [
        'Agent / partner KYC',
        'Disbursement history',
        '30% deposit on the vehicle',
      ],
    },
    {
      id: 'agency_contract',
      icon: 'Users',
      name: 'Agency Contract',
      description:
        "Canvass loan applications for Red Sphere's salary-based SSB civil servant loans, and other business as agreed, and earn commission.",
      pricing: '5% plus a monthly once-off fee',
      target: 'All',
      features: [
        'Commission of a once-off 5% plus $250 once off per month for disbursements up to US$25,000',
        '5% plus $300 once off per month for sales above US$30,000 on USD loans',
      ],
      benefits: ['Earn commission', 'Build a long-term relationship with Red Sphere'],
      requirements: [
        'Curriculum vitae',
        'National ID',
        'Proof of residence',
        'Tax clearance',
        'CBZ account holder',
      ],
    },
    {
      id: 'partnership',
      icon: 'HeartHandshake',
      name: 'Partnership',
      description:
        'An MOU with Red Sphere that lets your retail outlets sell to civil servants and salaried staff of approved companies on credit.',
      pricing: '8% commission',
      target: 'Registered companies',
      features: [
        'Enter into an MOU agreement with Red Sphere Finance',
        'Facilitate access to credit for civil servants or salaried individuals from approved companies, who purchase goods on credit from your retail outlets throughout Zimbabwe',
        'Commission payable of 8%',
      ],
      benefits: ['Boost sales', 'Access to prefund facilities'],
      requirements: [
        'Company KYC',
        "Directors' KYC",
        'Business profile',
        'Company logo',
        'CBZ account holder',
      ],
    },
  ],

  agriculture: [
    {
      id: 'profeeds',
      icon: 'Sprout',
      name: 'Profeeds SSB and Farmers Product',
      description:
        'Stock feed finance supporting different farming needs, for farmers and civil service employees.',
      pricing: '5% farmers · 6% civil service',
      target: 'Farmers and civil service employees',
      tenor: '12 months for farmers, 24 months for civil service employees',
      interestRate: '5% for farmers, 6% for civil service employees',
      features: [
        'Tenor: 12 months for farmers, 24 months for civil service employees',
        'Interest: 5% for farmers and 6% for civil service employees',
      ],
      benefits: ['Improved livestock growth', 'Timely access to feed'],
      requirements: [
        'National ID',
        'Proof of residence',
        'Sales records and collateral for high value farmers',
      ],
    },
  ],
};
