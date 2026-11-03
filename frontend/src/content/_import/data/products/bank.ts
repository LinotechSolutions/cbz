import { ProductItem } from '../../types';

/**
 * CBZ Bank retail catalogue, transcribed from the Retail Banking Product Manual.
 *
 * Source of truth for anything shown on the CBZ Bank pages. Only state figures the
 * manual states: it quotes no interest rates for accounts or loans, so `pricing`
 * carries a factual line (a stated minimum, a stated multiple) rather than an
 * indicative rate. Earlier copy on this site advertised rates such as
 * "Up to 14.5% p.a." that appear in no product document; do not reintroduce them.
 *
 * Loan sizes are expressed as multiples of net salary exactly as the manual does.
 */

export const BANK_PRODUCT_CATEGORIES = [
  { id: 'accounts', label: 'Accounts' },
  { id: 'savings', label: 'Savings & Investments' },
  { id: 'loans', label: 'Loans' },
  { id: 'cards', label: 'Cards' },
  { id: 'channels', label: 'Digital & Merchant' },
] as const;

export type BankProductCategory = (typeof BANK_PRODUCT_CATEGORIES)[number]['id'];

const INDIVIDUAL_KYC = [
  '2 passport size photos',
  'Proof of residence (latest utility bill)',
  'Latest payslip',
  'Valid ID',
];

const CORPORATE_KYC = [
  'Copy of memorandum and articles of association',
  'Certificate of incorporation',
  'CR6',
  'CR2 (where applicable)',
  'Tax clearance',
  "Directors' valid ID",
  "Directors' proof of residence (latest utility bill)",
];

export const BANK_PRODUCTS: Record<string, ProductItem[]> = {
  accounts: [
    {
      id: 'current',
      icon: 'Landmark',
      name: 'Current Account',
      description:
        'Everyday transactional account with a Visa debit card, access to loans in line with your income, and an overdraft facility.',
      pricing: 'Visa debit card included',
      image: '/images/accounts/current.webp',
      target: 'Individuals (formally employed) and companies',
      requirements: [
        ...INDIVIDUAL_KYC,
        'Can also be opened for directors of a company that banks with CBZ',
      ],
      features: [
        'Visa debit card',
        'Access to loans according to income',
        'Access to an overdraft facility',
        'Access to a Visa prepaid card',
      ],
      benefits: [
        'Convenient, safe payments through CBZ Touch and Internet Banking',
        'ATM access as an alternative way to get cash',
      ],
    },
    {
      id: 'current_joint',
      icon: 'Users',
      name: 'Current Account (Joint)',
      description:
        'A single account for legally married couples, where signatories can sign jointly or individually.',
      pricing: 'For legally married couples',
      image: '/images/accounts/partnership.webp',
      target: 'Individuals (formally employed)',
      requirements: [
        '2 passport size photos',
        'Proof of residence (latest utility bill)',
        'Latest payslip of at least one of the signatories',
        'Valid IDs of both signatories',
        'Opened only for legally married couples',
      ],
      features: [
        'Visa debit cards',
        'Access to loans',
        'Signatories can sign jointly or individually',
        'Access to a Visa prepaid card',
      ],
      benefits: [
        'One account that lets a married couple deposit and access funds through online banking and ATM cards',
      ],
    },
    {
      id: 'current_corporate',
      icon: 'Building2',
      name: 'Current Account (Corporate)',
      description:
        'Transactional account for registered companies, with access to credit facilities, credit cards and overdrafts.',
      pricing: 'For registered corporates',
      image: '/images/cbz-banking.webp',
      target: 'Registered corporates',
      requirements: [
        'Copy of memorandum and articles of association',
        'Certificate of incorporation',
        "Directors' valid ID",
        "Directors' proof of residence (latest utility bill)",
        'CR6',
        'CR2 (where applicable)',
        'Tax clearance',
      ],
      features: [
        'Access to loans',
        'Access to credit cards',
        'Access to an overdraft facility',
        'Debit card for sole signatories',
      ],
      benefits: [
        'Convenient, safe payments through online banking and in branch',
        'Corporate current account holders have access to credit facilities',
      ],
    },
    {
      id: 'fca_individual',
      icon: 'Coins',
      name: 'Foreign Currency Account (Individual)',
      description:
        'Hold and transact in USD, GBP, ZAR, BWP or EUR, with transfers in and out and cash withdrawals.',
      pricing: 'USD, GBP, ZAR, BWP, EUR',
      image: '/images/accounts/diaspora.webp',
      target: 'Individuals',
      requirements: [
        ...INDIVIDUAL_KYC,
        'Can also be opened for directors of a company that banks with CBZ',
      ],
      features: ['Foreign currency account in USD, GBP, ZAR, BWP or EUR'],
      benefits: [
        'Deposit in a range of foreign currencies',
        'Receive and initiate transfers, make payments, or withdraw cash',
      ],
    },
    {
      id: 'fca_corporate',
      icon: 'Coins',
      name: 'Foreign Currency Account (Corporate)',
      description:
        'Foreign currency account for registered companies in GBP, USD, ZAR, BWP or EUR.',
      pricing: 'GBP, USD, ZAR, BWP, EUR',
      image: '/images/accounts/partnership.webp',
      target: 'Corporates',
      requirements: [
        'Copy of memorandum and articles of association',
        'Certificate of incorporation',
        "Directors' valid ID",
        "Directors' proof of residence (latest utility bill)",
      ],
      features: ['Foreign currency account in GBP, USD, ZAR, BWP or EUR'],
      benefits: [
        'Deposit in a range of foreign currencies',
        'Receive and initiate transfers, make payments, or withdraw cash',
      ],
    },
    {
      id: 'smartcash_lite',
      icon: 'Smartphone',
      name: 'SmartCash Lite',
      description:
        'Instant, KYC-lite account for customers new to banking. A copy of your ID is all you need.',
      pricing: 'Opens instantly with your ID',
      image: '/images/accounts/individual.webp',
      target: 'All individual clients, especially the unbanked, students and low income earners',
      requirements: ['Copy of ID'],
      features: [
        'CBZ debit card',
        'Access to CBZ mobile banking (Smart Money)',
        'No minimum balance',
      ],
      benefits: ['Instant account', 'KYC lite'],
    },
    {
      id: 'smartcash_general',
      icon: 'Wallet',
      name: 'SmartCash General',
      description:
        'Everyday account with an instant card and mobile banking, no minimum balance and no monthly service fees.',
      pricing: 'No monthly service fees',
      image: '/images/accounts/current.webp',
      target: 'Individuals',
      requirements: ['Copy of ID', 'Opening deposit'],
      features: [
        'CBZ debit card',
        'Access to CBZ Touch',
        'No minimum balance',
        'No monthly service fees',
      ],
      benefits: ['Instant card and mobile banking services'],
    },
    {
      id: 'smartcash_student',
      icon: 'Sparkles',
      name: 'SmartCash Student',
      description:
        'SmartCash account for students, with an instant card, mobile banking and no monthly service fees.',
      pricing: 'No monthly service fees',
      image: '/images/accounts/teen.webp',
      target: 'Students',
      requirements: ['Copy of ID', 'Opening deposit'],
      features: [
        'CBZ debit card',
        'Access to CBZ Touch',
        'No minimum balance',
        'No monthly service fees',
      ],
      benefits: ['Instant card and mobile banking services'],
    },
    {
      id: 'smartcash_extra',
      icon: 'Wallet',
      name: 'SmartCash Extra',
      description:
        'SmartCash account with no daily limit, no transaction limit and no maximum balance, on full KYC.',
      pricing: 'Initial deposit US$5',
      image: '/images/accounts/savings.webp',
      target: 'Individuals',
      requirements: [
        'Copy of ID and an opening deposit',
        'Valid ID, passport size photo, proof of residence and proof of source of income',
      ],
      features: [
        'CBZ debit card',
        'Access to CBZ Touch',
        'No minimum balance',
        'Initial deposit of US$5',
      ],
      benefits: ['No daily limit', 'No transaction limit', 'No maximum balance'],
    },
    {
      id: 'private_banking',
      icon: 'Award',
      name: 'Private Banking',
      description:
        'A dedicated service outlet for high net worth clients, offering tailor-made wealth creation and management solutions.',
      pricing: 'Minimum balance $1,500 or investment $5,000',
      image: '/images/cbz-wealth.webp',
      target: 'High net worth individuals',
      requirements: [
        'Directors of listed companies, professionals earning a salary of $5,000 and above, or business owners',
        'Minimum balance of $1,500 or an investment of $5,000',
      ],
      features: ['Tailor-made wealth creation solutions'],
      benefits: [
        'A dedicated outlet where high net worth clients open accounts and access services geared towards wealth creation and management',
      ],
    },
    {
      id: 'school_current',
      icon: 'GraduationCap',
      name: 'School Current Account',
      description:
        'Transactional account for schools and School Development Associations, with no monthly charges.',
      pricing: 'No monthly account charges',
      image: '/images/loan-education.webp',
      target: 'Primary, secondary and tertiary institutions',
      requirements: [
        'Constitution of the school or SDA',
        'Copies of national IDs and proof of residence for signatories',
        'Signing mandates',
      ],
      features: ['Cheque book', 'Cash deposit book'],
      benefits: ['No monthly charges on the account'],
    },
    {
      id: 'church_current',
      icon: 'Church',
      name: 'Church Current Account',
      description:
        'Account for churches and church groups, with tiered interest rates and no monthly service fees.',
      pricing: 'Minimum balance $50 · initial deposit $100',
      image: '/images/accounts/churchsaver.webp',
      target: 'Churches and church groups',
      requirements: [
        'Copies of national IDs and proof of residence for signatories',
        'Signing mandates',
        'Church constitution',
      ],
      features: ['Minimum balance $50.00', 'Initial deposit $100.00 on monthly minimum balance'],
      benefits: [
        'Tiered interest rates',
        'No withdrawal fees',
        'No internal transfer fees',
        'No monthly service fees',
      ],
    },
  ],

  savings: [
    {
      id: 'savings_individual',
      icon: 'PiggyBank',
      name: 'Savings Account (Individual)',
      description:
        'ATM card based account that lets you deposit funds, earn interest on savings and access credit facilities.',
      pricing: 'Earns interest on savings',
      image: '/images/accounts/savings.webp',
      target: 'Individuals (formally employed)',
      requirements: INDIVIDUAL_KYC,
      features: ['Visa debit card', 'Access to a Visa prepaid card', 'Access to a loan'],
      benefits: [
        'Deposit funds and earn interest on savings',
        'Access to credit facilities',
      ],
    },
    {
      id: 'savings_corporate',
      icon: 'Building2',
      name: 'Savings Account (Corporate)',
      description: 'Savings account for registered companies that earns interest on balances.',
      pricing: 'Earns interest on savings',
      image: '/images/accounts/partnership.webp',
      target: 'Registered corporates',
      requirements: CORPORATE_KYC,
      features: ['Access to a loan'],
      benefits: ['Earns interest on corporate savings', 'Access to credit facilities'],
    },
    {
      id: 'senior',
      icon: 'ShieldCheck',
      name: 'Senior Citizens Savings Account',
      description:
        'For customers aged 60 and above: no service charges, a free ATM card and priority service in branch.',
      pricing: 'No service charges',
      image: '/images/accounts/senior.webp',
      target: 'Retired customers over 60 years of age',
      requirements: [
        '2 passport size photos',
        'Proof of residence (latest utility bill)',
        'Latest payslip or proof of income',
        'Valid ID',
      ],
      features: [
        'Special service for customers aged 60 and above',
        'No service charges',
        'No queuing: senior citizens go to the priority teller',
        'Free ATM card',
        'Access to loans',
      ],
      benefits: [
        'An account that does not incur service charges',
        'Preferential treatment at service outlets',
        'Funds accessible by ATM card',
      ],
    },
    {
      id: 'simple_saver',
      icon: 'Wallet',
      name: 'Simple Saver',
      description:
        'Straightforward savings account opened with your ID and US$2, with a debit card and mobile banking.',
      pricing: 'US$2 to open · US$5 initial deposit',
      image: '/images/accounts/individual.webp',
      target: 'Individuals',
      requirements: ['ID and US$2 to open the account'],
      features: [
        'CBZ debit card',
        'Access to the CBZ Touch app',
        'No minimum balance',
        'No monthly service fees',
        'Initial deposit of US$5',
        'At most 4 debits every month',
      ],
      benefits: ['Debit card and mobile banking services'],
    },
    {
      id: 'fixed_deposit',
      icon: 'Clock',
      name: 'Fixed Deposit',
      description:
        'Invest a lump sum for a predefined period at a predetermined rate, in a high interest bearing account.',
      pricing: 'Minimum USD100,000 or ZWL1,000,000',
      image: '/images/cbz-wealth.webp',
      target:
        'Pension funds, individuals, private investors, unit trust companies, insurance and assurance companies, asset managers and corporate investors',
      requirements: [
        'Normally opened for existing customers',
        'Minimum investment of ZWL1,000,000.00 or USD100,000.00',
      ],
      features: [
        'Term deposit where the customer invests for a predefined period at a predetermined rate',
      ],
      benefits: ['A high interest bearing investment account'],
    },
    {
      id: 'cashplus_junior',
      icon: 'Sparkles',
      name: 'CashPlus Junior',
      description:
        'Savings plan for children under 12, with competitive interest and no maintenance fees.',
      pricing: 'Interest 4% per annum',
      image: '/images/accounts/teen.webp',
      target: 'Parents or guardians saving for children aged 0-12',
      requirements: ['For parents wanting to save for children under the age of 12'],
      features: [
        'Minimum investment period of 6 months',
        '1 free withdrawal per month from the 7th month',
        'Interest rate 4% per annum',
      ],
      benefits: ['Competitive interest rates', 'No maintenance fees', 'ATM card'],
      interestRate: '4% per annum',
    },
    {
      id: 'cashplus_teen',
      icon: 'Sparkles',
      name: 'CashPlus Teen',
      description:
        'Savings account for teenagers with an ATM debit card, mobile banking and monthly interest.',
      pricing: 'No maintenance fees',
      image: '/images/accounts/teen.webp',
      target: 'Teenagers',
      requirements: ['For parents with teenagers'],
      features: [
        'Minimum balance',
        'No maintenance fees',
        'ATM debit card',
        'Mobile banking',
        'Interest calculated on the minimum monthly balance and paid monthly',
      ],
      benefits: [
        'Competitive interest rates',
        'No maintenance fees',
        '4 free cash withdrawals per month',
        'ATM card',
      ],
    },
    {
      id: 'cashplus_student',
      icon: 'GraduationCap',
      name: 'CashPlus Student',
      description:
        'Savings account for tertiary students, with mobile banking and interest paid monthly.',
      pricing: 'No maintenance fees',
      image: '/images/loan-education.webp',
      target: 'Students',
      requirements: ['Tertiary students'],
      features: [
        'Minimum balance',
        'No maintenance fees',
        'Mobile banking',
        'Interest calculated on the minimum monthly balance and paid monthly',
      ],
      benefits: [
        'Competitive interest rates',
        'No maintenance fees',
        '4 free cash withdrawals per month',
        'ATM card',
      ],
    },
    {
      id: 'cashplus_business',
      icon: 'Briefcase',
      name: 'CashPlus Business',
      description:
        'Six-month investment account with tiered interest rates and no account maintenance fees.',
      pricing: '6 month investment period',
      image: '/images/accounts/partnership.webp',
      target: 'Individuals',
      requirements: ['New and existing account holders'],
      features: [
        'Minimum balance, for individuals only',
        'Tiered interest rates, calculated on the minimum monthly balance and paid monthly',
      ],
      benefits: ['6 months investment period', 'No account maintenance fees'],
    },
    {
      id: 'cashplus_individual',
      icon: 'PiggyBank',
      name: 'CashPlus Individual',
      description:
        'Longer-term savings with tiered interest rates and free cash withdrawals every 90 days.',
      pricing: 'No withdrawals before 12 months',
      image: '/images/accounts/savings.webp',
      target: 'Individuals',
      requirements: ['New and existing account holders'],
      features: [
        'Minimum balance, for individuals only',
        'No withdrawals allowed before 12 months',
        'Tiered interest rates, calculated on the minimum monthly balance and paid monthly',
        'Regular deposits required',
      ],
      benefits: [
        'Free cash withdrawals at the expiry of every 90 days',
        'No account maintenance fees',
      ],
    },
    {
      id: 'cashplus_housing',
      icon: 'Home',
      name: 'CashPlus Housing',
      description:
        'Save towards a home and qualify for a mortgage, with tenures currently ranging from 2 to 10 years.',
      pricing: 'Mortgage tenure 2 to 10 years',
      image: '/images/loan-home.webp',
      target: 'Individuals',
      requirements: ['New and existing account holders'],
      features: [
        'Minimum balance, for individuals only',
        'No withdrawals allowed before 12 months',
        'Tiered interest rates, calculated on the minimum monthly balance and paid monthly',
        'Regular deposits required',
      ],
      benefits: [
        'Competitive interest rate',
        'Free banking',
        "Access to a mortgage period matched to the client's requirements, currently 2 to 10 years",
      ],
    },
  ],

  loans: [
    {
      id: 'civil_servant_loan',
      icon: 'Banknote',
      name: 'Civil Servant Loan',
      description:
        'Personal loan for civil servants of up to 10 times net salary, repaid over 36 months by SSB deduction.',
      pricing: 'Up to 10x net salary',
      image: '/images/loan-education.webp',
      target: 'Civil servants',
      requirements: ['Proof of income', 'Salary to be deducted from SSB'],
      features: [
        'Loan of up to 10 times net salary',
        'Tenure of 36 months',
        'Salary deducted from SSB',
        'Interest rates subject to change',
      ],
      benefits: ['Personal loan to ease financial obligations'],
      tenor: '36 months',
    },
    {
      id: 'direct_debit_loan',
      icon: 'Banknote',
      name: 'Loan — Individual Direct Debit',
      description:
        'Personal loan for private sector employees of up to 12 times net salary, deducted from payroll.',
      pricing: 'Up to 12x net salary',
      image: '/images/accounts/individual.webp',
      target: 'Employees in the private sector',
      requirements: ['New and existing corporates'],
      features: [
        'Loan of a maximum of 12 times net salary',
        'Maximum tenure of 36 months',
        'Salary deducted from payroll',
      ],
      benefits: ['Personal loan to ease financial obligations'],
      tenor: 'Up to 36 months',
    },
    {
      id: 'nostro_loan',
      icon: 'Coins',
      name: 'Nostro Individual Loan',
      description:
        'USD personal loan for nostro account holders, up to twice net salary to a maximum of US$5,000.',
      pricing: 'Up to US$5,000',
      image: '/images/accounts/diaspora.webp',
      target: 'Employees in the private sector and NGOs / IOs',
      requirements: ['New and existing corporates'],
      features: [
        'For nostro account holders with 2 months of USD salary processing',
        'Net salary x 2, up to a maximum loan of US$5,000.00',
        '3 to 12 months',
      ],
      benefits: ['USD personal loan to ease financial obligations'],
      tenor: '3 to 12 months',
      limit: 'US$5,000.00',
    },
    {
      id: 'private_school_fees_loan',
      icon: 'GraduationCap',
      name: 'Private School Fees Loan',
      description:
        'Pays school fees directly into the school account, repayable over 4 months, up to 3 times net salary.',
      pricing: 'Up to 3x net salary',
      image: '/images/loan-education.webp',
      target: 'Parents with children in private school',
      requirements: [
        "Account holder should have at least one month's salary coming through CBZ Bank",
      ],
      features: [
        'Loan of up to 3 times net salary',
        'Loan amount paid directly into the school account',
        'Repayable over 4 months',
        'Applicants can apply for any number of children, provided the total does not exceed 3 times net salary',
      ],
      benefits: ['Facility to ease the school fees burden'],
      tenor: '4 months',
    },
    {
      id: 'student_loan_facility',
      icon: 'GraduationCap',
      name: 'Student Loan Facility',
      description:
        'Pays tertiary fees directly into the institution account, repayable over 4 months.',
      pricing: 'Paid direct to the institution',
      image: '/images/loan-education.webp',
      target: 'Parents with children at any tertiary institution in Zimbabwe',
      requirements: [
        "Account holder should have at least one month's salary coming through CBZ Bank",
      ],
      features: [
        'Loan amount paid directly into the tertiary institution account',
        'Repayable over 4 months',
        'Applicants can apply for any number of children, provided the total does not exceed 3 times net salary',
      ],
      benefits: ['Facility to ease the tertiary fees burden'],
      tenor: '4 months',
    },
    {
      id: 'payday_loan',
      icon: 'Clock',
      name: 'Payday Loan',
      description:
        'Short-term credit for emergencies: 50% of net salary, repayable over 30 days.',
      pricing: '50% of net salary',
      image: '/images/accounts/current.webp',
      target: 'Individuals',
      requirements: ['Existing customers'],
      features: [
        '50% of net salary up to ZWL30,000',
        'Payable over 30 days',
        'Interest rates subject to change',
      ],
      benefits: ['Credit facility to cover emergencies'],
      tenor: '30 days',
    },
  ],

  cards: [
    {
      id: 'visa_gold',
      icon: 'CreditCard',
      name: 'Visa Gold Card',
      description:
        'Internationally recognised card for ATMs and Visa POS terminals, pre-funded for local and international use.',
      pricing: 'Open to non-account holders',
      target: 'Individuals and corporates',
      requirements: [
        'Open to account holders and non-account holders',
        'Open to companies, where cards are funded from an existing corporate account',
      ],
      features: [
        'Currently works as a debit card, pre-funded for use locally or internationally',
      ],
      benefits: [
        'Access funds through ATMs and Visa POS terminals',
        'Safe and secure',
        'Online payments',
        'ATM cash withdrawals',
        'Car rental and hotel bookings',
        'Instant payments with no clearing period',
        'Instant balance top up',
      ],
    },
    {
      id: 'student_visa',
      icon: 'GraduationCap',
      name: 'Student Visa Card',
      description:
        'Pre-funded international card for registered students, including those who do not bank with CBZ.',
      pricing: 'Open to non-account holders',
      target: 'Students',
      requirements: [
        'Open to any student registered with a local or international university, or any academic or professional institution',
        'Students who are not CBZ account holders can also apply',
      ],
      features: ['The card is pre-funded for use locally and internationally'],
      benefits: [
        'Access funds through ATMs and Visa POS terminals',
        'Safe and secure',
        'Online payments',
        'ATM cash withdrawals',
        'Instant payments with no clearing period',
      ],
    },
    {
      id: 'atm_card',
      icon: 'CreditCard',
      name: 'ATM Card',
      description:
        'Debit card giving access to your account through ATMs and point of sale terminals.',
      pricing: 'For existing account holders',
      target: 'Individuals',
      requirements: ['Existing individual account holders'],
      features: ['Access funds in your individual account through ATMs or POS terminals'],
      benefits: ['Debit card access via Automated Teller Machines or Point of Sale terminals'],
    },
    {
      id: 'sme_debit_card',
      icon: 'Briefcase',
      name: "SME's Debit Card",
      description: 'Debit card issued to small companies for ATM and POS access.',
      pricing: 'For existing SME clients',
      target: "SME's",
      requirements: ['For already existing SME clients'],
      features: ['Issued to small companies'],
      benefits: ['Debit card access via Automated Teller Machines or Point of Sale terminals'],
    },
  ],

  channels: [
    {
      id: 'cbz_touch',
      icon: 'Smartphone',
      name: 'CBZ Touch',
      description:
        'Zero-rated mobile banking: transfers, bill payments, school fees, cardless withdrawals and card controls.',
      pricing: 'Zero rated',
      target: 'Individual clients and single signatory SMEs',
      requirements: ['Active CBZ Bank account or wallet'],
      features: [
        'Funds transfer',
        'Balance enquiry',
        'Card blocking and unblocking',
        'Cardless withdrawals',
        'Bill payments',
        'Mini statement requests',
        'School fees payment',
        'Visa on Mobile (CBZ Pay)',
        'Dual currency',
      ],
      benefits: ['Zero rated', 'Access to your bank account or wallet anytime'],
    },
    {
      id: 'internet_banking',
      icon: 'Globe',
      name: 'Internet Banking',
      description:
        'Web banking for balances, statements, internal and RTGS transfers, Visa card transfers and utility payments.',
      pricing: 'For existing account holders',
      target: 'Individuals and corporates',
      requirements: ['Existing account holders'],
      features: ['An internet based system that gives customers access to their accounts'],
      benefits: [
        'Access account information and make payments without visiting the bank',
        'Check balances, view and print statements',
        'Effect internal transfers',
        'Effect external transfers (RTGS)',
        'Effect transfers to a Visa card',
        'Effect payments for utilities',
      ],
    },
    {
      id: 'e_statements',
      icon: 'FileCheck',
      name: 'E-statements',
      description:
        'Password-protected PDF statements delivered automatically to your email address.',
      pricing: 'For existing customers',
      target: 'Corporates',
      requirements: ['Existing customers'],
      features: ['A safe, fast way of delivering statements electronically to an email address'],
      benefits: ['Automated statements sent to email, password protected', 'PDF statements by email'],
    },
    {
      id: 'visa_pos',
      icon: 'QrCode',
      name: 'Visa Point of Sale (POS)',
      description:
        'Visa affiliated POS terminals for merchants in retail and services, accepting Visa Gold Card payments.',
      pricing: 'For existing corporate account holders',
      target: 'Merchants',
      requirements: ['Existing corporate account holders'],
      features: ['Visa affiliated point of sale terminal that accepts payments via Visa Gold Card'],
      benefits: [
        'A safe, fast way for customers to use their Visa card',
        'Suited to corporates in retail or services, such as hotels, restaurants, supermarkets, hospitals and car hire',
      ],
    },
    {
      id: 'local_pos',
      icon: 'QrCode',
      name: 'Local Point of Sale (POS)',
      description:
        'POS terminals accepting ATM card and ZimSwitch payments for retail and service merchants.',
      pricing: 'For existing corporate account holders',
      target: 'Merchants',
      requirements: ['Existing corporate account holders'],
      features: ['Point of sale terminals that allow payments via ATM card and ZimSwitch'],
      benefits: [
        'A safe, fast way for customers to use their ATM card',
        'Suited to corporates in retail or services, such as hotels, restaurants, supermarkets, hospitals and car hire',
      ],
    },
    {
      id: 'kleva_pos',
      icon: 'Zap',
      name: 'Kleva POS',
      description:
        'Portable POS machine for SMEs, sole traders and street vendors, free to any qualifying trader.',
      pricing: 'Free to qualifying traders',
      target: 'SMEs, sole traders and street vendors',
      requirements: ['Existing customers'],
      features: [
        'Sale, sale with cashback, balance enquiry and transaction reports',
      ],
      benefits: [
        'Portable POS machine for SMEs, sole traders and street vendors',
        'Any sole trader or SME in Zimbabwe qualifies for the machine free',
      ],
    },
  ],
};
