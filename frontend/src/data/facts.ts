/**
 * Single source of truth for group facts, contact details and branch hours.
 * Every page must read from here — never hardcode these values in a component.
 *
 * Values marked `confirmed: false` were in conflict across the site and one was
 * chosen (see `note`). Business owners must confirm before release.
 */

/** Visible placeholder for anything awaiting business / compliance confirmation. */
export const tbc = (what: string) => `[TBC: ${what}]`;

export interface Fact {
  value: string;
  confirmed: boolean;
  note?: string;
}

export const GROUP_FACTS = {
  years: {
    value: '46 years',
    confirmed: false,
    note: 'Homepage said "46 Years"; CBZ Bank page said "40+ Yrs". Chose the homepage value.',
  },
  branches: {
    value: 'Over 60 branches',
    confirmed: false,
    note: 'Homepage/contact said "Over 60 branches"; CBZ Bank page said "120+ branches & agencies". Chose the homepage value.',
  },
  zseListed: { value: 'Listed on the Zimbabwe Stock Exchange (ZSE: CBZ)', confirmed: true },
  /**
   * Spelled out in running copy. The count signals scale to investors, but the
   * customer-facing proposition leads with the connected ecosystem, not the
   * number of businesses.
   *
   * Corrected against the CBZ Holdings Pitchbook 2026 structure chart, which
   * shows ten operating companies across four clusters: Banking (CBZ Bank, Red
   * Sphere Finance, CBZ Custodial Services), Investments (CBZ Properties, CBZ
   * Capital, Datvest), Insurance (CBZ Life, CBZ Insurance, CBZ Risk Advisory
   * Services) and Agro-Business (CBZ Agro-Yield). The site previously said
   * "nine", which counted only the companies that have a page here.
   */
  companies: { value: 'ten operating companies', confirmed: true },
  /** The four operating clusters. Philanthropy is held separately, not a cluster. */
  clusters: { value: 'four business clusters', confirmed: true },
  /** Pitchbook milestones slide: "Established in 1980". */
  founded: { value: '1980', confirmed: true },
  /** Companies with a dedicated page on this site, out of the ten operating companies. */
  companiesWithPages: {
    value: 'nine',
    confirmed: true,
    note: 'CBZ Custodial Services has no page yet, so the showcase lists nine of the ten operating companies.',
  },
} satisfies Record<string, Fact>;

export const CONTACT = {
  /** Primary contact phone number */
  phone: '+2638677004050',
  phoneDisplay: '+263 8677 004050',
  phoneHref: 'tel:+2638677004050',
  /** Toll-free short codes, all networks. */
  tollFree: ['460', '461'] as const,
  tollFreeLabel: '+263 8677 004050',
  whatsapp: {
    display: '+263 774 460 460',
    href: 'https://wa.me/263774460460',
  },
  ussd: {
    display: '*460#',
    href: 'tel:*460%23',
  },
  /**
   * Switchboard.
   */
  switchboard: {
    display: '+263 8677 004050',
    href: 'tel:+2638677004050',
    confirmed: true,
  },
  email: 'contactcentre@cbz.co.zw',
  address: '5 Campbell Road, Pomona, Harare',
  /** Branch locator target on the homepage help section. */
  branchLocatorHref: '/#branch-directory',
} as const;

/**
 * Branch hours, 24-hour format "08:00–15:00".
 * Conflict: contact section, contact modal and the March 2026 customer notice said
 * Mon–Fri 08:00–15:00, Sat 08:00–13:00; the hero card said 08:00–16:00, Sat 08:00–12:30.
 * Chose the former (it appears in more places, including an official notice).
 */
export const BRANCH_HOURS = {
  weekdays: { label: 'Mon–Fri', hours: '08:00–15:00' },
  saturday: { label: 'Sat', hours: '08:00–13:00' },
  sunday: { label: 'Sun and public holidays', hours: 'Closed' },
  digital: '24/7',
  confirmed: false,
} as const;

export const branchHoursLine = () =>
  `${BRANCH_HOURS.weekdays.label} ${BRANCH_HOURS.weekdays.hours} · ${BRANCH_HOURS.saturday.label} ${BRANCH_HOURS.saturday.hours}`;

/** Regulatory lines for footers and flow shells. Wording needs compliance sign-off. */
export const REGULATORY = {
  bank: `CBZ Bank Limited is a registered commercial bank supervised by the Reserve Bank of Zimbabwe. ${tbc('licence number and approved wording')}`,
  insurance: `CBZ Insurance and CBZ Life are regulated by the Insurance and Pensions Commission (IPEC). ${tbc('approved wording')}`,
  investments: `Datvest Asset Management is licensed by the Securities and Exchange Commission of Zimbabwe (SECZIM). ${tbc('licence number and approved wording')}`,
  depositProtection: tbc('Deposit Protection Corporation membership mark and wording'),
} as const;

/** External destinations that do not exist in this app. */
export const EXTERNAL_LINKS = {
  // Official internet-banking portal endpoints
  ibPersonal: 'https://obdx.cbz.co.zw/index.html?module=login',
  ibCorporate: 'https://obdx.cbz.co.zw/',
  ibSelfService: 'https://obdx.cbz.co.zw/index.html?module=login',
  touchAppStore: 'https://apps.apple.com/app/cbz-touch/id1200543503',
  touchPlayStore: 'https://play.google.com/store/apps/details?id=zw.co.cbz.touch',
  investorRelations: 'https://www.cbz.co.zw/investor-relations',
  // Verified Red Sphere Finance online loan application portal
  redSphereApply: 'https://rs.cbz.co.zw/',
  redSphereApp: 'https://play.google.com/store/apps/details?id=zw.co.cbz.redsphere&hl=en',
  // Proof of payment verification, surfaced on the homepage task launcher.
  popVerification: 'https://www.cbz.co.zw/pop-verification',
  spotFakeSites: '/security',
  forgotPassword: 'https://obdx.cbz.co.zw/index.html?module=login',
} as const;
