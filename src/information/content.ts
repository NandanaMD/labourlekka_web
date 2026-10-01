export type CropProfile = {
  slug: string;
  name: string;
  localNames: string;
  category: string;
  summary: string;
  status: 'In review' | 'Published';
  keywords: string[];
};

export const cropProfiles: CropProfile[] = [
  {
    slug: 'rice',
    name: 'Rice',
    localNames: 'Paddy · Dhan · Chawal',
    category: 'Cereals',
    summary: 'A structured guide to rice cultivation, crop stages, nutrition, water management, and common field problems.',
    status: 'In review',
    keywords: ['paddy', 'dhan', 'chawal', 'cereal', 'kharif'],
  },
  {
    slug: 'tomato',
    name: 'Tomato',
    localNames: 'Tamatar · Solanum lycopersicum',
    category: 'Vegetables',
    summary: 'A practical reference for tomato establishment, plant care, fruiting, and common pest and disease symptoms.',
    status: 'In review',
    keywords: ['tamatar', 'vegetable', 'fruiting', 'nursery'],
  },
  {
    slug: 'cotton',
    name: 'Cotton',
    localNames: 'Kapas · Kapda fasal',
    category: 'Field crops',
    summary: 'A crop guide covering cotton growth stages, field care, nutrition, and responsible crop protection.',
    status: 'In review',
    keywords: ['kapas', 'fibre', 'fiber', 'kharif', 'field crop'],
  },
  {
    slug: 'coconut',
    name: 'Coconut',
    localNames: 'Nariyal · Thenga',
    category: 'Plantation',
    summary: 'A long-term reference for coconut orchard care, soil and water management, pests, and harvesting.',
    status: 'In review',
    keywords: ['nariyal', 'thenga', 'plantation', 'orchard', 'perennial'],
  },
  {
    slug: 'chilli',
    name: 'Chilli',
    localNames: 'Mirchi · Menasinakayi',
    category: 'Spices',
    summary: 'A practical reference for chilli nursery care, crop stages, nutrition, and common crop protection concerns.',
    status: 'In review',
    keywords: ['mirchi', 'menasinakayi', 'spice', 'vegetable', 'fruiting'],
  },
];

export const sourcePrinciples = [
  'Every published guide will include its source and last-reviewed date.',
  'Fertilizer and crop-protection guidance will be region- and crop-stage specific.',
  'Product labels and local agricultural advisories take priority over generic advice.',
];
