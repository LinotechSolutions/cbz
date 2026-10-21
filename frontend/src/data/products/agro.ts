import { ProductItem } from '../../types';

/**
 * CBZ Agro-Yield divisions, as supplied by the business.
 *
 * This replaces an earlier invented product set ("Golden Leaf Tobacco Outgrower
 * Line", "Drone & Satellite Precision Farming Kit" and similar) that appeared in
 * no Agro-Yield documentation. Only the four divisions and the offerings named
 * against them are stated here; nothing is added beyond that.
 */

export const AGRO_CATEGORIES = [{ id: 'divisions', label: 'Our divisions' }] as const;

export const AGRO_PRODUCTS: Record<string, ProductItem[]> = {
  divisions: [
    {
      id: 'agro_enterprise',
      icon: 'HeartHandshake',
      name: 'Agro Enterprise',
      description: 'Joint venture schemes with farming enterprises.',
      pricing: 'Joint venture schemes',
      image: '/images/cbz-agriculture.webp',
      features: ['Joint venture schemes'],
    },
    {
      id: 'agro_farming',
      icon: 'Sprout',
      name: 'Agro Farming',
      description: 'Seasonal contract farming.',
      pricing: 'Seasonal contract farming',
      image: '/images/cbz-agriculture.webp',
      features: ['Seasonal contract farming'],
    },
    {
      id: 'agro_commodity_trading',
      icon: 'TrendingUp',
      name: 'Agro Commodity Trading',
      description: 'Market and offtake opportunities for agricultural commodities.',
      pricing: 'Market and offtake opportunities',
      image: '/images/cbz-payments.webp',
      features: ['Market opportunities', 'Offtake opportunities'],
    },
    {
      id: 'agro_supply_chain',
      icon: 'Tractor',
      name: 'Agro Supply Chain',
      description:
        'Farm mechanisation, equipment leasing and sales, borehole drilling and combine harvesters.',
      pricing: 'Mechanisation and equipment',
      image: '/images/cbz-protection.webp',
      features: [
        'Farm mechanisation',
        'Equipment leasing and sales',
        'Borehole drilling',
        'Combine harvesters',
      ],
    },
  ],
};
