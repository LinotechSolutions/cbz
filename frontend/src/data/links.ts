/**
 * Every destination outside this site. `null` means not yet supplied, and the
 * link is hidden rather than guessed.
 */
export const LINKS = {
  internetBanking: {
    personal: 'https://obdx.cbz.co.zw/index.html?module=login',
    corporate: 'https://obdx.cbz.co.zw/',
    selfService: 'https://selfservice.cbz.co.zw/',
    newCorporate: 'https://cbzonline.cbz.co.zw/mfmbs/cbz-corp/',
    newPersonal: null as string | null,
    forgotPassword: 'https://obdx.cbz.co.zw/index.html?module=login',
  },
  touch: {
    appStore: 'https://apps.apple.com/zw/app/cbz-touch/id1099147682',
    playStore: 'https://play.google.com/store/apps/details?id=zw.co.cbz.touch',
  },
  redSphere: {
    portal: 'https://rs.cbz.co.zw/',
    playStore: 'https://play.google.com/store/apps/details?id=zw.co.cbz.redsphere&hl=en',
    appStore: 'https://apps.apple.com/zw/app/redsphere/id6775831304' as string | null,
  },
  zikiCash: {
    site: 'https://zikicash.com/' as string | null,
    appStore: 'https://apps.apple.com/app/zikicash/id6444567196' as string | null,
    playStore: 'https://play.google.com/store/apps/details?id=com.kuva.zikicash' as string | null,
  },
  zikiMall: 'https://zikimall.com/',
  popVerification: 'https://www.cbz.co.zw/pop-verification',
  investorRelations: 'https://www.cbz.co.zw/investor-relations',
  zse: null as string | null,
  /** Managed-property client sign-in. Not the listings site. */
  propertiesSite: null as string | null,
  /** CBZ Properties listings on Propertybook; every property card goes here. */
  propertyListings: 'https://www.propertybook.co.zw/listed-agencies/cbz-properties/for-sale',
  /** Zeex invoice discounting platform. Red Sphere Finance is the financier. */
  zeex: 'https://zeex.co.zw/' as string | null,
  /** Agro-Yield farmer onboarding portal. */
  farmerOnboarding: null as string | null,
  /** ATDC Zimbabwe, the Agro-Yield associate. */
  atdc: null as string | null,
  documents: {
    businessConditions: 'https://www.cbz.co.zw/ddownload_category/business-conditions/',
    personalAccountTerms: 'https://www.cbz.co.zw/terms-conditions/terms-and-conditions-personal-account/',
    websiteTerms: 'https://www.cbz.co.zw/terms-conditions/',
    privacyPolicy: 'https://www.cbz.co.zw/privacy-policy/',
    privacyNotice: 'https://www.cbz.co.zw/privacy-notice/',
    policiesAndRegulations:
      'https://www.cbz.co.zw/about-cbz-holdings/policies-regulations/policies-and-regulations/',
    phishingNotice: 'https://www.cbz.co.zw/notice-to-all-our-customers-beware-of-web-phishing/',
    philanthropy: 'https://www.cbz.co.zw/philanthropic-initiatives/',
    communityNews: 'https://www.cbz.co.zw/news/community-involvement/',
  },
} as const;

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}
