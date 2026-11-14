/**
 * CBZ Properties listings, from the CBZ Properties "Property Listing" booklet
 * (file 0425 Property Booklet, supplied November 2026). Prices are as printed:
 * before VAT unless the booklet says inclusive. Terms of sale are kept word
 * for word in the details. Sales enquiries: cbzpsales@cbz.co.zw,
 * +263 8677 004050, toll free 460 / 461. scripts/port-content.ts writes one
 * collection file per listing; the photographs are stand-ins until CBZ
 * Properties supplies pictures per listing.
 */
export interface PropertyListing {
  id: string;
  title: string;
  type: 'residential' | 'commercial' | 'land';
  location: string;
  /** The price as the booklet prints it, or null for price on application. */
  price: string | null;
  summary: string;
  details: { label: string; value: string }[];
}

const stand = (size: string, price: string, extra: { label: string; value: string }[] = []) => [
  { label: 'Stand size', value: size },
  { label: 'Price', value: price },
  ...extra,
];

export const PROPERTY_LISTINGS: PropertyListing[] = [
  // ---- Residential stands ----
  {
    id: 'athelney-ruwa',
    title: 'Athelney, Ruwa (Harare East)',
    type: 'land',
    location: 'Ruwa',
    price: 'From US$45/m² before VAT',
    summary: 'Fully serviced residential stands ready for title: tarred roads, storm water drains, sewer and water. Prices depend on the size of the stand, with a 10-year mortgage facility.',
    details: [
      { label: 'Stand sizes', value: '400 to 1,500 m²' },
      { label: 'Price', value: 'US$60.00/m² for stands up to 650 m²; US$55.00/m² for 651 to 1,000 m²; US$45.00/m² above 1,000 m² (before VAT)' },
      { label: 'Terms of sale', value: '10-year mortgage with 12% interest per annum and 10% deposit; or 10% deposit, balance over 36 months at 12% interest per annum' },
      { label: 'Services', value: 'Tarred roads, storm water drains, sewer and water' },
    ],
  },
  {
    id: 'barrington-southview',
    title: 'Barrington, Southview (Harare South)',
    type: 'land',
    location: 'Harare',
    price: 'US$115/m² cash, inclusive of VAT',
    summary: 'A high-density housing development, fully serviced with water, sewer, tarred roads and storm water drains.',
    details: stand('200 m² average', 'US$115/m² cash or US$120/m² on payment terms, inclusive of VAT', [
      { label: 'Terms of sale', value: '30% deposit, with the balance payable by 31 December 2026' },
    ]),
  },
  {
    id: 'hedsor-drive-borrowdale',
    title: '8 Hedsor Drive, Borrowdale (Harare North)',
    type: 'residential',
    location: 'Harare',
    price: 'US$340,000 before VAT',
    summary: 'Modern living in 23 exclusive cluster units on 500 m² stands: 185 m² four-bedroom homes with the main bedroom en suite, stylish fitted kitchens, borehole water and 24-hour security.',
    details: [
      { label: 'Bedrooms', value: '4 bedrooms, main en suite' },
      { label: 'Built area', value: '185 m² on a 500 m² stand' },
      { label: 'Price', value: 'US$340,000 before VAT' },
      { label: 'Security', value: '24-hour security' },
    ],
  },
  {
    id: 'gateway-city-mutare',
    title: 'Gateway City, Mutare',
    type: 'land',
    location: 'Mutare',
    price: 'US$20/m² before VAT',
    summary: 'A new address for a more serene lifestyle: 2,200 m² residential stands strategically located for holiday homes and accommodation near the Beira border. Title deeds available.',
    details: stand('2,200 m² average', 'US$20/m² before VAT', [
      { label: 'Terms of sale', value: 'Mortgage: 10% deposit, 12% interest per annum for up to 10 years; or instalments: 10% deposit, balance over 36 months at 12% interest per annum' },
      { label: 'Title', value: 'Title deeds available' },
    ]),
  },
  {
    id: 'donhodzo-estate-masvingo',
    title: 'Donhodzo Estate, Masvingo',
    type: 'land',
    location: 'Masvingo',
    price: 'US$28/m² cash, inclusive of VAT',
    summary: 'Fully serviced low-density residential stands, now available and ready for title deeds: an opportunity to build your low-density dream home.',
    details: stand('1,094 to 1,800 m²', 'US$28/m² cash; US$28.50/m² over 12 months; US$30/m² over 18 months (inclusive of VAT)', [
      { label: 'Terms of sale', value: '35% deposit, balance payable over 12 or 18 months at 0% interest' },
    ]),
  },
  {
    id: 'dabuka-village-ruwa',
    title: 'Dabuka Village, Ruwa',
    type: 'land',
    location: 'Ruwa',
    price: 'US$75/m² before VAT',
    summary: 'Secure a fully serviced residential stand, ready for title, in a fast-growing and well-planned community.',
    details: stand('510 to 688 m²', 'US$75/m² before VAT', [
      { label: 'Terms of sale', value: 'Mortgage: 25% deposit, balance over 8 years at 17% interest per annum' },
    ]),
  },
  {
    id: 'christopher-mews-harare-west',
    title: 'Christopher Mews (Harare West)',
    type: 'land',
    location: 'Harare',
    price: 'US$85/m² before VAT',
    summary: 'An upcoming gated community approximately 18 km from the Harare CBD, with a choice of five approved modern house plans.',
    details: stand('300 m²', 'US$85/m² before VAT', [
      { label: 'Terms of sale', value: '30% deposit, balance over 18 months at 0% interest' },
      { label: 'House plans', value: 'Five approved modern house plans to choose from' },
    ]),
  },
  {
    id: 'knowe-norton',
    title: 'Knowe, Norton',
    type: 'land',
    location: 'Norton',
    price: 'US$51,000 before VAT',
    summary: 'A piece of land with a three-roomed cottage, connected ZESA power supply and a 10 m deep well. Title deeds available.',
    details: stand('3,299 m²', 'US$51,000 before VAT', [
      { label: 'On the stand', value: 'Three-roomed cottage, ZESA power, 10 m deep well' },
      { label: 'Title', value: 'Title deeds available' },
    ]),
  },
  {
    id: 'mazowe-residential-stand',
    title: 'Residential stand, Mazowe',
    type: 'land',
    location: 'Mazowe',
    price: 'US$30,000 before VAT',
    summary: 'A vacant residential stand in Mazowe.',
    details: stand('1,094 m²', 'US$30,000 before VAT'),
  },
  {
    id: 'arcadia-manor-bindura',
    title: 'Arcadia Manor, Bindura',
    type: 'land',
    location: 'Bindura',
    price: 'US$20/m² before VAT',
    summary: 'Spacious, fully serviced residential stands in a secure gated community with public lighting, 5 km from Bindura town.',
    details: stand('1,250 to 3,500 m²', 'US$20/m² before VAT', [
      { label: 'Terms of sale', value: '25% deposit, balance over 18 months at 0% interest per annum' },
    ]),
  },
  {
    id: 'hogerty-hill-1837',
    title: 'Hogerty Hill, 1,837 m² stand',
    type: 'land',
    location: 'Harare',
    price: 'US$146,960 before VAT',
    summary: 'A spacious residential stand with ample room to design and build your ideal family home, with space for landscaping, outdoor entertainment areas and additional amenities.',
    details: stand('1,837 m²', 'US$146,960.00 before VAT'),
  },
  {
    id: 'hogerty-hill-1384',
    title: 'Hogerty Hill, 1,384 m² stand',
    type: 'land',
    location: 'Harare',
    price: 'US$110,720 before VAT',
    summary: 'A beautiful residential stand with ample space to create a home that suits your lifestyle: room for your dream house, landscaped gardens, entertainment areas and more.',
    details: stand('1,384 m²', 'US$110,720.00 before VAT'),
  },

  // ---- Residential properties ----
  {
    id: 'ridgeway-south-highlands',
    title: 'Ridgeway South, Highlands',
    type: 'residential',
    location: 'Harare',
    price: 'US$350,000 before VAT',
    summary: 'A modern complex of six four-bedroom duplex garden flats. Open-plan lounge and kitchen with hob and oven, two guest bedrooms, a guest toilet and shower downstairs; two bedrooms with a family shower upstairs. Fully walled, electric-fenced, with 24-hour security.',
    details: [
      { label: 'Units', value: 'Six 4-bedroom duplex garden flats' },
      { label: 'Stand size', value: '3,600 m²' },
      { label: 'Price', value: 'US$350,000 before VAT' },
      { label: 'Security', value: 'Fully walled, electric fence, 24-hour security' },
    ],
  },
  {
    id: 'checheche-township-house',
    title: 'Four-bedroom house, Checheche Township',
    type: 'residential',
    location: 'Checheche',
    price: 'US$30,000 before VAT',
    summary: 'A single-storey brick house under asbestos with four bedrooms, living room, kitchen and a bathroom with shower and water closet. Painted ceiling boards and granolithic floors throughout.',
    details: [
      { label: 'Bedrooms', value: '4' },
      { label: 'Floor area', value: 'Main building 99.9 m²; staff quarters 32.51 m²' },
      { label: 'Price', value: 'US$30,000.00 before VAT' },
    ],
  },
  {
    id: 'new-ridgeview-belvedere',
    title: 'New Ridgeview, Belvedere',
    type: 'residential',
    location: 'Harare',
    price: 'US$300,000 before VAT',
    summary: 'A four-bedroom house with lounge, dining room, kitchen, bathroom and toilet, plus borehole, CCTV, solar, durawall and gate. Title deeds available.',
    details: [
      { label: 'Bedrooms', value: '4' },
      { label: 'Stand size', value: '1,083 m²' },
      { label: 'Price', value: 'US$300,000 before VAT' },
      { label: 'Extras', value: 'Borehole, CCTV, solar, durawall, gate, title deeds' },
    ],
  },
  {
    id: 'nehosho-gweru',
    title: 'Five-bedroom home, Nehosho, Gweru',
    type: 'residential',
    location: 'Gweru',
    price: 'US$38,000 before VAT',
    summary: 'A spacious five-bedroom home with two bathrooms with showers, fully plastered interiors and exteriors, and a well-designed kitchen and dining area, ideal for comfortable family living.',
    details: [
      { label: 'Bedrooms', value: '5' },
      { label: 'Size', value: '168 m²' },
      { label: 'Price', value: 'US$38,000.00 before VAT' },
    ],
  },
  {
    id: 'fairview-harare',
    title: 'Four-bedroom unit, Fairview',
    type: 'residential',
    location: 'Harare',
    price: 'US$200,000 before VAT',
    summary: 'A prime-located four-bedroom unit near the New Parliament, with a modern open-plan lounge and kitchen with hob and oven.',
    details: [
      { label: 'Bedrooms', value: '4' },
      { label: 'Stand size', value: '1,125 m²' },
      { label: 'Price', value: 'US$200,000 before VAT' },
    ],
  },
  {
    id: 'inyati-road-chiredzi-house',
    title: 'House on Inyati Road, Chiredzi',
    type: 'residential',
    location: 'Chiredzi',
    price: 'US$50,000 before VAT',
    summary: 'A house in a low-density suburb as you enter Chiredzi town. Title deeds available.',
    details: [
      { label: 'Stand size', value: '4,072 m²' },
      { label: 'Price', value: 'US$50,000 before VAT' },
      { label: 'Title', value: 'Title deeds available' },
    ],
  },
  {
    id: 'gletwyn-township-harare',
    title: 'Gletwyn Township, Harare',
    type: 'residential',
    location: 'Harare',
    price: 'US$300,000 before VAT',
    summary: 'An unfinished double-storey house at wall-plate level with five bedrooms (all en suite), four lock-up garages, a prayer room, office, two lounges, kitchen and pantry.',
    details: [
      { label: 'Bedrooms', value: '5, all en suite' },
      { label: 'Stand size', value: '1,803 m²' },
      { label: 'Price', value: 'US$300,000 before VAT' },
      { label: 'Stage', value: 'Unfinished, at wall-plate level' },
    ],
  },
  {
    id: 'insukamini-lower-gweru',
    title: 'Insukamini, Lower Gweru',
    type: 'residential',
    location: 'Gweru',
    price: 'US$50,000 before VAT',
    summary: 'A stand with a three-bedroom house with lounge and kitchen, and outside toilets. Water is available on the property; electricity is not currently connected.',
    details: [
      { label: 'Bedrooms', value: '3' },
      { label: 'Stand size', value: '4,375 m²' },
      { label: 'Price', value: 'US$50,000.00 before VAT' },
    ],
  },

  // ---- Agro-residential plots ----
  {
    id: 'chegutu-agro-residential-plots',
    title: 'Agro-residential plots, Chegutu',
    type: 'land',
    location: 'Chegutu',
    price: 'US$2.85/m² cash, before VAT',
    summary: 'Two-hectare agro-residential plots just 6 km north-east of the Chegutu CBD, easily accessible from the Chegutu to Chinhoyi road.',
    details: [
      { label: 'Plot size', value: '2 hectares' },
      { label: 'Price', value: 'US$2.85/m² cash or US$3/m² on payment terms, before VAT' },
      { label: 'Terms of sale', value: '30% deposit, balance by 31 December 2026 at a 3% once-off admin fee on the balance; or 30% deposit, balance over 12 months at 12% per annum; or 30% deposit paid over 3 months and the balance over the remaining 9 months at 12% per annum' },
    ],
  },

  // ---- Commercial stands ----
  {
    id: 'inyati-road-chiredzi-commercial-stand',
    title: 'Commercial stand, Inyati Road, Chiredzi',
    type: 'commercial',
    location: 'Chiredzi',
    price: 'US$800,000 before VAT',
    summary: 'A commercial stand situated as you enter the town.',
    details: stand('1,561 m²', 'US$800,000 before VAT'),
  },
  {
    id: 'rusape-commercial-stand',
    title: 'Commercial stand, Rusape',
    type: 'commercial',
    location: 'Rusape',
    price: 'US$300,000 before VAT',
    summary: 'A vacant stand in a built-up area near Rusape Township. Title deeds available.',
    details: stand('6,940 m²', 'US$300,000 before VAT', [{ label: 'Title', value: 'Title deeds available' }]),
  },
  {
    id: 'bindura-commercial-stand',
    title: 'Commercial stand, Bindura',
    type: 'commercial',
    location: 'Bindura',
    price: 'US$250,000 before VAT',
    summary: 'A prime commercial stand available on a cession agreement.',
    details: stand('6,940 m²', 'US$250,000 before VAT', [{ label: 'Tenure', value: 'Cession agreement' }]),
  },

  // ---- Commercial properties ----
  {
    id: 'redcliff-township-kwekwe',
    title: 'Former banking hall, Redcliff Township, Kwekwe',
    type: 'commercial',
    location: 'Kwekwe',
    price: 'US$180,000 before VAT',
    summary: 'A building with a banking hall with cubicles, a strong room, back offices, a kitchen with a single stainless-steel sink, and ladies’ and gents’ toilets.',
    details: [
      { label: 'Floor area', value: '408 m²' },
      { label: 'Price', value: 'US$180,000.00 before VAT' },
    ],
  },
  {
    id: 'inyanga-township',
    title: 'Former banking hall, Inyanga Township',
    type: 'commercial',
    location: 'Nyanga',
    price: 'US$96,000 before VAT',
    summary: 'A single-storey building with rendered brick walls under a monopitch IBR roof: a banking hall with large glass frontage and fitted wood and glass counters, a back office, a small kitchen and a toilet.',
    details: [
      { label: 'Floor area', value: '408 m²' },
      { label: 'Price', value: 'US$96,000.00 before VAT' },
    ],
  },
  {
    id: 'fletcher-road-norton',
    title: 'Fletcher Road, Norton',
    type: 'commercial',
    location: 'Norton',
    price: 'US$300,000 before VAT',
    summary: 'A stand with a built-up area of approximately 1,000 m², previously used as a laboratory warehouse, with a borehole for a reliable water supply. Title deeds available.',
    details: [
      { label: 'Stand size', value: '1,500 m²' },
      { label: 'Built-up area', value: 'Approximately 1,000 m²' },
      { label: 'Price', value: 'US$300,000.00 before VAT' },
      { label: 'Title', value: 'Title deeds available' },
    ],
  },

  // ---- High value properties ----
  {
    id: 'kariba-township-nyamhunga',
    title: 'Commercial land opposite Nyamhunga, Kariba',
    type: 'commercial',
    location: 'Kariba',
    price: 'US$5.6 million before VAT',
    summary: 'Located opposite the Nyamhunga residential area and zoned for commercial use under the 1992 Kariba Local Development Plan: ideal for a tourism hub with a hotel, mall, golf course or recreation. Title deeds available.',
    details: [
      { label: 'Price', value: 'USD 5.6 million before VAT' },
      { label: 'Zoning', value: 'Commercial, 1992 Kariba Local Development Plan' },
      { label: 'Title', value: 'Title deeds available' },
    ],
  },
  {
    id: 'zvishavane-commercial-stand',
    title: 'Commercial stand, Zvishavane',
    type: 'commercial',
    location: 'Zvishavane',
    price: 'US$1.4 million before VAT',
    summary: 'A vacant commercial stand. A hardware business is available on a sale-and-lease-back arrangement with a favourable rental structure.',
    details: stand('6,056 m²', 'US$1.4 million before VAT', [{ label: 'Arrangement', value: 'Sale-and-lease-back available with a favourable rental structure' }]),
  },
  {
    id: 'fernhill-mutare',
    title: 'Fernhill, Mutare',
    type: 'commercial',
    location: 'Mutare',
    price: 'US$1.2 million before VAT',
    summary: 'A high-value property in Fernhill, Mutare, with a single-storey building of rendered brick under a monopitch IBR roof housing a banking hall with glass frontage and fitted counters, a back office, kitchen and toilet.',
    details: [
      { label: 'Size', value: '2,000 to 16,000 m²' },
      { label: 'Price', value: 'USD 1.2 million before VAT' },
    ],
  },
  {
    id: 'barazza-kirkman-road',
    title: 'Barazza, Kirkman Road, Harare',
    type: 'commercial',
    location: 'Harare',
    price: 'US$800,000 before VAT',
    summary: 'Subdivided vacant land along Kirkman Road with title deeds, previously used as a venue for recreational activities and weddings.',
    details: stand('8,563 m²', 'US$800,000 before VAT', [{ label: 'Title', value: 'Title deeds available' }]),
  },
  {
    id: 'kariba-lakeside-commercial-land',
    title: 'Kariba lakeside commercial land, Powerlines Road',
    type: 'commercial',
    location: 'Kariba',
    price: 'US$1.1 million cash, before VAT',
    summary: 'A rare commercial investment opportunity on 8.5 hectares of prime lakeshore land along Powerlines Road, Kariba: an existing workshop with a vehicle inspection pit and four storerooms, a three-bedroom main house with office, lounge and verandah, staff quarters, a borehole and a plunge pool.',
    details: [
      { label: 'Land', value: '8.5 hectares' },
      { label: 'Price', value: 'US$1.1 million cash, before VAT' },
      { label: 'Buildings', value: 'Workshop with inspection pit and four storerooms; three-bedroom main house with office, lounge and verandah; staff quarters' },
      { label: 'Water', value: 'Borehole and plunge swimming pool' },
    ],
  },
];
