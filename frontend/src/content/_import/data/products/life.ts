import { ProductItem } from '../../types';

/**
 * CBZ Life catalogue, transcribed from the brief product catalogue.
 *
 * The catalogue is deliberately brief: it gives a description and nothing more for
 * each product. No premiums, rates or cover limits are stated anywhere in it, so
 * none are shown here. `pricing` carries the product category rather than a figure.
 */

export const LIFE_CATEGORIES = [
  { id: 'individual', label: 'Individual life' },
  { id: 'employee', label: 'Employee benefits' },
] as const;

export const LIFE_PRODUCTS: Record<string, ProductItem[]> = {
  individual: [
    {
      id: 'comfortsure',
      icon: 'HeartHandshake',
      name: 'Comfortsure Funeral Cashplan',
      description:
        'A pre-defined funeral benefit paid immediately to the nominated beneficiary on the death of the life insured.',
      pricing: 'Individual life',
      target: 'Individuals and the family members they insure',
      features: [
        'Provides a pre-defined funeral benefit payable immediately to the nominated beneficiary upon the death of the life insured',
        'Covers a member in whom the policyholder has an insurable interest',
      ],
    },
    {
      id: 'sarapavana',
      icon: 'GraduationCap',
      name: 'Sarapavana Education Plan',
      description:
        "A long-term savings plan that builds funds for a child's primary and secondary education, with life cover attached.",
      pricing: 'Individual life',
      target: 'Parents and guardians saving for a child’s education',
      features: [
        'A long-term education savings plan that helps parents and guardians build funds for a child’s primary and secondary school education',
        'Provides life cover, helping to secure the child’s education if the policyholder dies during the policy term',
      ],
    },
  ],

  employee: [
    {
      id: 'group_life',
      icon: 'Users',
      name: 'Group Life Assurance',
      description:
        'Employer-sponsored life cover paying benefits to beneficiaries on the death of an employee.',
      pricing: 'Employee benefits',
      target: 'Employers covering their staff',
      features: [
        'Employer-sponsored life cover that pays benefits to beneficiaries on the death of an employee',
        'May include funeral benefits',
      ],
    },
    {
      id: 'retirement_savings',
      icon: 'PiggyBank',
      name: 'Retirement Savings Products',
      description:
        'Products designed to help individuals and groups accumulate funds for retirement.',
      pricing: 'Employee benefits',
      target: 'Individuals and groups saving for retirement',
      features: [
        'Designed to help individuals and groups accumulate funds for retirement',
      ],
    },
    {
      id: 'annuities',
      icon: 'Coins',
      name: 'Annuities',
      description:
        'Regular income payments to retirees, drawn from accumulated retirement savings.',
      pricing: 'Employee benefits',
      target: 'Retirees',
      features: [
        'Provide regular income payments to retirees from accumulated retirement savings',
      ],
    },
    {
      id: 'credit_life',
      icon: 'ShieldCheck',
      name: 'Credit Life Insurance',
      description:
        'Covers the outstanding balance of a loan in the event of death, so the debt does not pass to the family.',
      pricing: 'Employee benefits',
      target: 'Borrowers and lending partners',
      features: [
        'Provides cover for outstanding loan balances in the event of death',
        'May include retrenchment and disability benefits',
      ],
    },
  ],
};
