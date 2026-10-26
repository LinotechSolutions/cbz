import { ScreenType } from '../types';
import { CONTACT, EXTERNAL_LINKS, tbc } from './facts';

/**
 * Group information and regulatory pages: General Business Conditions, the
 * Privacy Policy, Tip-offs Anonymous and the CBZ Foundation.
 *
 * The structure is final; much of the text is not. The public site at
 * cbz.co.zw refuses automated requests, so its wording could not be carried
 * across, and legal and regulatory text must be reproduced exactly, never
 * paraphrased from memory. Every passage awaiting the official wording is
 * wrapped in tbc() so it is visible in review, and a page with any tbc()
 * content shows a notice at the top. Paste the approved text over the
 * placeholders and the notices disappear on their own.
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
  /** Contact or reporting channels, rendered as cards. */
  channels?: InfoChannel[];
  /** A document to download, e.g. the signed PDF of the conditions. */
  download?: { label: string; href: string };
}

const hasTbc = (s: string) => s.includes('[TBC:');

/** True when any text on the page is still a placeholder. */
export const isPending = (page: InfoPageDef) =>
  [page.intro, ...page.sections.flatMap((s) => [s.heading, ...s.body]), ...(page.channels ?? []).map((c) => c.value), page.download?.href ?? '']
    .some(hasTbc);

export const INFO_PAGES: Record<InfoPageId, InfoPageDef> = {
  'business-conditions': {
    id: 'business-conditions',
    eyebrow: 'Regulatory disclosure',
    title: 'General Business Conditions',
    intro:
      'These conditions govern the relationship between CBZ Bank Limited and its customers for all accounts, products and services, unless a specific product agreement says otherwise.',
    owner: 'Legal and Compliance',
    meta: [
      { label: 'Applies to', value: 'CBZ Bank Limited' },
      { label: 'Version', value: tbc('version number') },
      { label: 'Effective from', value: tbc('effective date') },
    ],
    sections: [
      { heading: '1. Scope and definitions', body: [tbc('scope and definitions, verbatim from the approved conditions')] },
      { heading: '2. Opening and operating accounts', body: [tbc('account opening, mandates, identification and operation')] },
      { heading: '3. Payments and instructions', body: [tbc('instructions, cut-off times, authentication and recall')] },
      { heading: '4. Fees, charges and interest', body: [tbc('tariff reference, how charges are applied and notified')] },
      { heading: '5. Statements and records', body: [tbc('statements, errors and the period to raise a dispute')] },
      { heading: '6. Liability and indemnity', body: [tbc('limits of liability, customer obligations, force majeure')] },
      { heading: '7. Set-off and security', body: [tbc('right of set-off and combination of accounts')] },
      { heading: '8. Confidentiality and data', body: [tbc('banker confidentiality and cross-reference to the Privacy Policy')] },
      { heading: '9. Dormancy, closure and termination', body: [tbc('dormant accounts, closure by either party, notice periods')] },
      { heading: '10. Complaints', body: [tbc('internal complaints procedure and escalation to the regulator')] },
      { heading: '11. Amendments', body: [tbc('how changes are made and notified')] },
      { heading: '12. Governing law', body: [tbc('governing law and jurisdiction')] },
    ],
    download: { label: 'Download the General Business Conditions (PDF)', href: tbc('PDF link') },
  },

  'privacy-policy': {
    id: 'privacy-policy',
    eyebrow: 'Your information',
    title: 'Privacy Policy',
    intro:
      'How CBZ Holdings Limited and its subsidiaries collect, use, share and protect personal information, and the choices and rights you have.',
    owner: 'Data Protection Officer',
    meta: [
      { label: 'Applies to', value: 'CBZ Holdings Limited and its subsidiaries' },
      { label: 'Last updated', value: tbc('date') },
    ],
    sections: [
      { heading: 'Who we are', body: [tbc('controller identity and data protection registration details')] },
      { heading: 'What we collect', body: [tbc('categories of personal information collected')] },
      { heading: 'How we use it', body: [tbc('purposes and lawful bases')] },
      { heading: 'Who we share it with', body: [tbc('subsidiaries, service providers, regulators, credit bureaux')] },
      { heading: 'How long we keep it', body: [tbc('retention periods')] },
      { heading: 'How we protect it', body: [tbc('security measures')] },
      { heading: 'Your rights', body: [tbc('access, correction, objection, deletion and how to exercise them')] },
      { heading: 'Cookies', body: [tbc('cookie use on this website')] },
      { heading: 'Changes to this policy', body: [tbc('how changes are notified')] },
    ],
    channels: [
      { label: 'Data Protection Officer', value: tbc('DPO email'), href: undefined },
      { label: 'Write to us', value: CONTACT.address },
    ],
  },

  'tip-offs': {
    id: 'tip-offs',
    eyebrow: 'Speak up, safely',
    title: 'Tip-offs Anonymous',
    intro:
      'If you see fraud, corruption, theft or unethical conduct involving CBZ, you can report it anonymously and in confidence through an independent channel. You do not have to give your name.',
    owner: 'Group Compliance',
    sections: [
      {
        heading: 'What you can report',
        body: [
          '- Fraud, theft or misuse of CBZ or customer funds',
          '- Bribery, corruption or conflicts of interest',
          '- Misconduct by staff, agents or suppliers',
          '- Breaches of law, regulation or CBZ policy',
          '- Victimisation of anyone who has spoken up',
        ],
      },
      {
        heading: 'How it works',
        body: [
          tbc('name of the independent provider that runs the service'),
          'Your report goes to the independent service, not to CBZ staff. The service passes the substance of the report to CBZ for investigation without revealing who you are. You can call back with your reference number to add information or hear the outcome.',
        ],
      },
      {
        heading: 'Your protection',
        body: [
          'Reports are confidential and can be fully anonymous. CBZ does not tolerate retaliation against anyone who reports in good faith.',
        ],
      },
    ],
    channels: [
      { label: 'Toll-free hotline', value: tbc('tip-offs hotline number') },
      { label: 'Email', value: tbc('tip-offs email address') },
      { label: 'Online', value: EXTERNAL_LINKS.tipOffsWeb || tbc('tip-offs web address'), href: EXTERNAL_LINKS.tipOffsWeb || undefined },
      { label: 'SMS / WhatsApp', value: tbc('tip-offs SMS or WhatsApp number') },
    ],
  },

  foundation: {
    id: 'foundation',
    eyebrow: 'Philanthropy',
    title: 'CBZ Foundation',
    intro:
      'The CBZ Foundation is the philanthropic arm of CBZ Holdings, held directly by the Group alongside its four business clusters. It carries the Group’s investment in the communities it serves.',
    owner: 'CBZ Foundation',
    sections: [
      { heading: 'Our purpose', body: [tbc('Foundation purpose statement, as on the current website')] },
      { heading: 'Focus areas', body: [tbc('focus areas, e.g. education, health, enterprise, environment')] },
      { heading: 'Programmes and partners', body: [tbc('current programmes, beneficiaries and partners')] },
      { heading: 'Impact', body: [tbc('headline figures and stories')] },
      { heading: 'Work with us', body: [tbc('how organisations apply for support or partner with the Foundation')] },
    ],
    channels: [
      { label: 'Email', value: tbc('Foundation email address') },
      { label: 'Telephone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
      { label: 'Address', value: CONTACT.address },
    ],
  },
};
