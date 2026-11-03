import { ScreenType } from '../types';
import { CONTACT, EXTERNAL_LINKS, tbc } from './facts';

/**
 * Group information and regulatory pages: General Business Conditions, the
 * Privacy Policy, Tip-offs Anonymous and the CBZ Foundation.
 *
 * Sources. The public site at cbz.co.zw refuses automated requests, so its
 * pages could not be read directly. What is here comes from two kinds of
 * source, and the difference matters:
 *
 *  - Facts the Group has published and the press has reported (the Foundation's
 *    purpose, funding model and named beneficiaries; the five principles of
 *    the privacy policy; the existence and address of each official document).
 *    These are stated in our own words and attributed.
 *  - Legal and regulatory wording (the business conditions, the privacy policy
 *    text itself). This must be reproduced exactly, never paraphrased, so it
 *    is not reproduced here at all: each page links to the official document
 *    on cbz.co.zw and keeps a tbc() for a hosted copy.
 *
 * A page with any tbc() content shows a review notice naming its owner.
 */

export type InfoPageId = Extract<ScreenType, 'business-conditions' | 'privacy-policy' | 'tip-offs' | 'foundation'>;

export interface InfoSection {
  heading: string;
  /** Paragraphs. A string beginning "- " renders as a bullet. */
  body: string[];
}

export interface InfoChannel {
  label: string;
  value: string;
  href?: string;
}

export interface InfoLink {
  label: string;
  href: string;
  /** One line on what the reader will find there. */
  note?: string;
}

export interface InfoPageDef {
  id: InfoPageId;
  eyebrow: string;
  title: string;
  intro: string;
  /** Who owns the content, named in the review notice. */
  owner: string;
  /** Document metadata shown under the title, e.g. version and effective date. */
  meta?: { label: string; value: string }[];
  sections: InfoSection[];
  /** Official documents and pages, rendered as a list of links. */
  links?: InfoLink[];
  /** Contact or reporting channels, rendered as cards. */
  channels?: InfoChannel[];
  /** A document to download, e.g. the signed PDF of the conditions. */
  download?: { label: string; href: string };
}

const OFFICIAL = {
  businessConditions: 'https://www.cbz.co.zw/ddownload_category/business-conditions/',
  personalAccountTerms: 'https://www.cbz.co.zw/terms-conditions/terms-and-conditions-personal-account/',
  termsConditions: 'https://www.cbz.co.zw/terms-conditions/',
  privacyPolicy: 'https://www.cbz.co.zw/privacy-policy/',
  privacyNotice: 'https://www.cbz.co.zw/privacy-notice/',
  policiesRegulations: 'https://www.cbz.co.zw/about-cbz-holdings/policies-regulations/policies-and-regulations/',
  phishingNotice: 'https://www.cbz.co.zw/notice-to-all-our-customers-beware-of-web-phishing/',
  philanthropy: 'https://www.cbz.co.zw/philanthropic-initiatives/',
  communityNews: 'https://www.cbz.co.zw/news/community-involvement/',
} as const;

const hasTbc = (s: string) => s.includes('[TBC:');

/** True when any text on the page is still a placeholder. */
export const isPending = (page: InfoPageDef) =>
  [
    page.intro,
    ...page.sections.flatMap((s) => [s.heading, ...s.body]),
    ...(page.channels ?? []).map((c) => c.value),
    ...(page.links ?? []).map((l) => l.href),
    page.download?.href ?? '',
  ].some(hasTbc);

export const INFO_PAGES: Record<InfoPageId, InfoPageDef> = {
  'business-conditions': {
    id: 'business-conditions',
    eyebrow: 'Regulatory disclosure',
    title: 'General Business Conditions',
    intro:
      'The conditions that govern the relationship between CBZ Bank Limited and its customers for accounts, products and services. The official documents are published by the bank; the links below go to them.',
    owner: 'Legal and Compliance',
    meta: [
      { label: 'Applies to', value: 'CBZ Bank Limited' },
      { label: 'Hosted copy', value: tbc('version and effective date, once the PDF is hosted here') },
    ],
    sections: [
      {
        heading: 'What the conditions cover',
        body: [
          'The general business conditions set out how accounts are opened and operated, how instructions and payments are handled, how fees, charges and interest apply, what each party is liable for, how complaints are dealt with, and how the conditions may change.',
          'Separate conditions apply to specific products. The bank publishes these by product in its Business Conditions library, alongside the terms for personal accounts.',
        ],
      },
      {
        heading: 'Which document applies to you',
        body: [
          '- Personal customers: the Terms and Conditions for Personal Accounts, covering current, savings and term accounts, mandates, cheques and dormant accounts.',
          '- Business and corporate customers: the Business Conditions for the relevant product, including corporate banking accounts, money market and foreign exchange products.',
          '- All customers: the website Terms and Conditions, which govern use of this site.',
        ],
      },
      {
        heading: 'Hosted copy',
        body: [tbc('the General Business Conditions text or PDF, to be hosted on this site rather than linked')],
      },
    ],
    links: [
      {
        label: 'Business Conditions library',
        href: OFFICIAL.businessConditions,
        note: 'The bank’s published conditions, by product.',
      },
      {
        label: 'Terms and Conditions – Personal Account',
        href: OFFICIAL.personalAccountTerms,
        note: 'Current, savings and term accounts.',
      },
      { label: 'Website Terms and Conditions', href: OFFICIAL.termsConditions },
    ],
  },

  'privacy-policy': {
    id: 'privacy-policy',
    eyebrow: 'Your information',
    title: 'Privacy Policy',
    intro:
      'How CBZ Holdings Limited and its subsidiaries handle personal information. This page summarises the policy; the policy itself is the published document, linked below.',
    owner: 'Data Protection Officer',
    meta: [
      { label: 'Applies to', value: 'CBZ Holdings Limited and its subsidiaries' },
      { label: 'Full policy', value: 'cbz.co.zw/privacy-policy' },
    ],
    sections: [
      {
        heading: 'The five principles',
        body: [
          'CBZ’s privacy policy is built on five principles:',
          '- Transparency: being open about what personal information is collected and why.',
          '- Accountability: taking responsibility for the personal information CBZ holds.',
          '- Choice: giving you a say in how your information is used.',
          '- Information review and correction: letting you see and correct what CBZ holds about you.',
          '- Information protection: safeguarding your information with physical, administrative and technical measures.',
        ],
      },
      {
        heading: 'Your choices',
        body: [
          'If you believe your personal information is being used improperly, you can ask CBZ to pause its use for a period while the matter is looked into. You can also ask to see the information held about you and to have it corrected.',
        ],
      },
      {
        heading: 'Information gathered through this website',
        body: [
          'Information you provide through this website is not disclosed to third parties without your consent, except where the law requires it.',
        ],
      },
      {
        heading: 'Related notices',
        body: [
          'A separate Privacy Notice covers CBZ’s websites, mobile apps and services, and a separate policy covers data shared through CBZ’s Facebook page, where CBZ and Facebook act as joint controllers.',
        ],
      },
    ],
    links: [
      { label: 'Privacy Policy (full text)', href: OFFICIAL.privacyPolicy },
      { label: 'Privacy Notice – websites and apps', href: OFFICIAL.privacyNotice },
    ],
    channels: [
      { label: 'Data Protection Officer', value: tbc('DPO email address') },
      { label: 'Write to us', value: CONTACT.address },
    ],
  },

  'tip-offs': {
    id: 'tip-offs',
    eyebrow: 'Speak up, safely',
    title: 'Tip-offs Anonymous',
    intro:
      'CBZ has a zero-tolerance policy towards fraud, financial misconduct and unethical behaviour, by staff and by anyone who deals with the Group: applicants, suppliers, contractors and agents. If you see it, you can report it in confidence, and you do not have to give your name.',
    owner: 'Group Compliance',
    sections: [
      {
        heading: 'What you can report',
        body: [
          '- Fraud, theft or misuse of CBZ or customer funds',
          '- Bribery, corruption or conflicts of interest',
          '- Misconduct by staff, agents, suppliers or contractors',
          '- Breaches of law, regulation or CBZ policy',
          '- Victimisation of anyone who has spoken up',
        ],
      },
      {
        heading: 'How it works',
        body: [
          tbc('name of the independent provider that runs the anonymous channel, and the confirmed hotline, email and web address'),
          'Reports go to an independent service, not to the people they concern. The substance is passed to CBZ for investigation without revealing who reported it. You can follow up with your reference number to add information or hear the outcome.',
        ],
      },
      {
        heading: 'Your protection',
        body: [
          'Reports are confidential and can be fully anonymous. CBZ does not tolerate retaliation against anyone who reports in good faith.',
        ],
      },
      {
        heading: 'If you have been targeted by fraud',
        body: [
          'A phishing message or a fraudulent transaction on your own account is a different matter from a tip-off, and faster to deal with directly: call the Contact Centre at once, and see the security guidance on this site on how to spot fake CBZ messages and websites.',
        ],
      },
    ],
    links: [
      { label: 'Policies and regulations', href: OFFICIAL.policiesRegulations, note: 'The Group’s published policies, including zero tolerance to prohibited practices.' },
      { label: 'Notice: beware of web phishing', href: OFFICIAL.phishingNotice },
    ],
    channels: [
      { label: 'Anonymous hotline', value: tbc('tip-offs hotline number') },
      { label: 'Email', value: tbc('tip-offs email address') },
      { label: 'Online', value: EXTERNAL_LINKS.tipOffsWeb || tbc('tip-offs web address'), href: EXTERNAL_LINKS.tipOffsWeb || undefined },
      { label: 'Contact Centre (fraud on your account)', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    ],
  },

  foundation: {
    id: 'foundation',
    eyebrow: 'Philanthropy',
    title: 'CBZ Foundation',
    intro:
      'The CBZ Foundation is the philanthropic arm of CBZ Holdings, held directly by the Group alongside its four business clusters. It funds non-profit organisations working in public health, education and the support of vulnerable communities.',
    owner: 'CBZ Foundation',
    meta: [
      { label: 'Established', value: 'March 2023' },
      { label: 'Funded by', value: 'An endowment of up to 1% of sustainable Group profit' },
    ],
    sections: [
      {
        heading: 'Why the Foundation exists',
        body: [
          'CBZ has supported charitable causes for over forty years. In March 2023 the Group brought that work under one roof by establishing the CBZ Foundation, with a board-approved endowment of up to one percent of sustainable profit, to make grants to non-profit organisations and achieve measurable impact for the people they serve.',
          'An initial grant pool of close to US$1 million was set aside for organisations working in the Foundation’s three priority areas.',
        ],
      },
      {
        heading: 'Three focus areas',
        body: [
          '- Public health: equipment, supplies and support for hospitals and health programmes.',
          '- Education: opportunities for learners from under-served communities, from school fees to learning facilities.',
          '- Vulnerable communities: support for children’s homes, people with disabilities and communities in hardship.',
        ],
      },
      {
        heading: 'The work so far',
        body: [
          'Examples of support given by the Group and the Foundation include:',
          '- School fees, uniforms and textbooks for 27 girls through Tariro Trust, so they could complete secondary school.',
          '- Personal protective equipment worth US$50,000 to major hospitals, and support to Mpilo and Harare Central Hospitals.',
          '- Wheelchairs, hospital beds and pressure mattresses for Ruwa Rehabilitation Hospital.',
          '- Equipment for visually impaired students at the University of Zimbabwe.',
          '- Support for Danai Children’s Home, Matthew Rusike Children’s Home and Danhiko.',
          tbc('current programmes and 2024–2026 grants, from the Foundation'),
        ],
      },
      {
        heading: 'Work with us',
        body: [tbc('how organisations apply for a grant or partner with the Foundation')],
      },
    ],
    links: [
      { label: 'Philanthropic initiatives', href: OFFICIAL.philanthropy, note: 'The Group’s record of community investment.' },
      { label: 'Community involvement news', href: OFFICIAL.communityNews },
    ],
    channels: [
      { label: 'Email', value: tbc('Foundation email address') },
      { label: 'Telephone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
      { label: 'Address', value: CONTACT.address },
    ],
  },
};
