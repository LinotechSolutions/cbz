/**
 * Official CBZ logo registry. Files are byte-for-byte copies of the master
 * artwork, cropped to the artwork's bounding box, served from /brand/logos/.
 * Logos are never rebuilt in HTML or CSS and never recoloured.
 */
export type LogoKey =
  | 'holdings'
  | 'bank'
  | 'insurance'
  | 'life'
  | 'datvest'
  | 'capital'
  | 'properties'
  | 'agro-yield'
  | 'risk-advisory'
  | 'red-sphere'
  | 'cbz-touch'
  | 'ziki-cash'
  | 'ziki-mall'
  | 'cbz-way';

/** Brands that have a white (reversed) file and may sit on a dark background. */
export type DarkSafeLogoKey = Exclude<LogoKey, 'ziki-mall'>;

export interface LogoArt {
  src: string;
  /** width / height of the cropped artwork */
  aspect: number;
}

export interface LogoEntry {
  name: string;
  full: LogoArt;
  white?: LogoArt;
  roundel?: LogoArt;
}

const svg = (file: string, aspect: number): LogoArt => ({ src: `/brand/logos/${file}.svg`, aspect });
const CBZ_ROUNDEL = svg('holdings-roundel', 1.0388);

export const LOGOS: Record<LogoKey, LogoEntry> = {
  holdings: { name: 'CBZ Holdings', full: svg('holdings-full', 2.666), white: svg('holdings-white', 2.666), roundel: CBZ_ROUNDEL },
  bank: { name: 'CBZ Bank', full: svg('bank-full', 1.9481), white: svg('bank-white', 1.9481), roundel: CBZ_ROUNDEL },
  insurance: { name: 'CBZ Insurance', full: svg('insurance-full', 2.7588), white: svg('insurance-white', 2.7588), roundel: CBZ_ROUNDEL },
  life: { name: 'CBZ Life', full: svg('life-full', 1.6301), white: svg('life-white', 1.6301), roundel: CBZ_ROUNDEL },
  datvest: { name: 'Datvest Asset Management', full: svg('datvest-full', 2.0178), white: svg('datvest-white', 2.0178), roundel: svg('datvest-roundel', 1) },
  capital: { name: 'CBZ Capital', full: svg('capital-full', 2.3194), white: svg('capital-white', 2.3194), roundel: CBZ_ROUNDEL },
  properties: { name: 'CBZ Properties', full: svg('properties-full', 2.8212), white: svg('properties-white', 2.8212), roundel: CBZ_ROUNDEL },
  'agro-yield': { name: 'CBZ Agro-Yield', full: svg('agro-yield-full', 2.8892), white: svg('agro-yield-white', 2.8892), roundel: CBZ_ROUNDEL },
  'risk-advisory': { name: 'CBZ Risk Advisory Services', full: svg('risk-advisory-full', 3.3631), white: svg('risk-advisory-white', 3.3631), roundel: CBZ_ROUNDEL },
  'red-sphere': { name: 'Red Sphere Finance', full: svg('red-sphere-full', 4.9137), white: svg('red-sphere-white', 4.9137), roundel: svg('red-sphere-roundel', 1) },
  'cbz-touch': { name: 'CBZ Touch', full: svg('cbz-touch-full', 0.9091), white: svg('cbz-touch-white', 0.9091) },
  'ziki-cash': { name: 'ZikiCash', full: svg('ziki-cash-full', 3.6127), white: svg('ziki-cash-white', 3.6127) },
  'ziki-mall': { name: 'Ziki Mall', full: { src: '/brand/logos/ziki-mall-full.png', aspect: 1.5617 } },
  'cbz-way': { name: 'The CBZ Way', full: svg('cbz-way-full', 2.8353), white: svg('cbz-way-white', 2.8353) },
};

/** Brand guideline minimum rendered widths in px. */
export const LOGO_MIN_WIDTH = { lockup: 65, roundel: 45 } as const;

/** Clear space is the height of the counter of the "b" in "cbz": about 16% of lockup height. */
export const CLEAR_SPACE_RATIO = 0.16;
