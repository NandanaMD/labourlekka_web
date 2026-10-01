export type CropProfile = {
  slug: string;
  name: string;
  localNames: string;
  category: string;
  summary: string;
  status: 'In review' | 'Published';
  keywords: string[];
  overview: string;
  seasons: string;
  soil: string;
  stages: { name: string; guidance: string }[];
  care: string[];
  problems: { name: string; signs: string; firstSteps: string }[];
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
    overview: 'Rice is grown across India in irrigated, rainfed, and lowland systems. The right variety, planting window, water plan, and local advisory depend on the region.',
    seasons: 'Usually Kharif, with Rabi and summer rice in suitable irrigated areas.',
    soil: 'Well-prepared soil with reliable water management. Soil testing should guide nutrient decisions.',
    stages: [
      { name: 'Nursery or direct sowing', guidance: 'Use healthy seed and a method suited to the local water and labour situation.' },
      { name: 'Establishment', guidance: 'Maintain an even stand and monitor early weeds, water, and seedling stress.' },
      { name: 'Tillering to panicle formation', guidance: 'Keep the field observed for nutrient stress, weeds, and pest or disease build-up.' },
      { name: 'Flowering to grain filling', guidance: 'Protect the crop from avoidable moisture stress and monitor grain and panicle health.' },
      { name: 'Maturity and harvest', guidance: 'Plan harvest when the crop reaches the locally recommended maturity signs and dry grain safely.' },
    ],
    care: ['Begin with a soil test and a locally recommended variety.', 'Use field observation and integrated pest management before considering a spray.', 'Keep irrigation and drainage decisions aligned with soil type and crop stage.', 'Store harvested grain only after it has been dried to a safe level.'],
    problems: [
      { name: 'Weeds', signs: 'Unwanted plants compete during crop establishment and tillering.', firstSteps: 'Identify the weed type, record the crop stage, and use the local integrated weed-management recommendation.' },
      { name: 'Leaf or panicle damage', signs: 'Spots, lesions, dead tissue, or damaged panicles can have several causes.', firstSteps: 'Photograph the pattern, inspect nearby plants, and confirm the cause before choosing any treatment.' },
      { name: 'Insect build-up', signs: 'Hoppers, caterpillars, or other insects may appear unevenly across the field.', firstSteps: 'Scout multiple locations and use an economic-threshold or local advisory approach rather than spraying on sight.' },
    ],
  },
  {
    slug: 'tomato',
    name: 'Tomato',
    localNames: 'Tamatar · Solanum lycopersicum',
    category: 'Vegetables',
    summary: 'A practical reference for tomato establishment, plant care, fruiting, and common pest and disease symptoms.',
    status: 'In review',
    keywords: ['tamatar', 'vegetable', 'fruiting', 'nursery'],
    overview: 'Tomato needs careful nursery establishment, steady moisture, balanced nutrition, and regular scouting through flowering and fruit development.',
    seasons: 'Grown in several seasons; planting windows vary by state, elevation, irrigation, and protected or open cultivation.',
    soil: 'Prefer well-drained soil with good organic matter. Avoid repeated tomato-family cropping where possible.',
    stages: [
      { name: 'Nursery', guidance: 'Start with healthy seed or planting material and protect young plants from damping-off and stress.' },
      { name: 'Transplant establishment', guidance: 'Transplant carefully, maintain even moisture, and watch for early pest pressure.' },
      { name: 'Vegetative growth', guidance: 'Support the crop, manage weeds, and maintain airflow through the canopy.' },
      { name: 'Flowering and fruit set', guidance: 'Avoid irregular water and nutrient stress; scout flowers, leaves, and growing points.' },
      { name: 'Fruit development and harvest', guidance: 'Harvest at the market-appropriate maturity and handle fruit gently to reduce losses.' },
    ],
    care: ['Use a healthy nursery and a variety suited to the local season.', 'Irrigate consistently without prolonged waterlogging or repeated severe drying.', 'Remove severely affected plant material responsibly and clean tools between areas.', 'Use crop rotation and sanitation to reduce carry-over of pests and diseases.'],
    problems: [
      { name: 'Leaf spots or blight-like symptoms', signs: 'Brown, dark, or spreading lesions can occur on leaves, stems, or fruit.', firstSteps: 'Check whether symptoms are spreading after wet weather and get the diagnosis confirmed before treatment.' },
      { name: 'Curling or distorted leaves', signs: 'New growth may curl, remain small, or show uneven colour.', firstSteps: 'Inspect for insects, herbicide drift, nutrient stress, and viral symptoms; remove severely affected plants only after diagnosis.' },
      { name: 'Fruit damage', signs: 'Holes, rotting patches, cracking, or blossom-end symptoms have different causes.', firstSteps: 'Check fruit, flowers, irrigation history, and nearby plants rather than assuming a single pest.' },
    ],
  },
  {
    slug: 'cotton',
    name: 'Cotton',
    localNames: 'Kapas · Kapda fasal',
    category: 'Field crops',
    summary: 'A crop guide covering cotton growth stages, field care, nutrition, and responsible crop protection.',
    status: 'In review',
    keywords: ['kapas', 'fibre', 'fiber', 'kharif', 'field crop'],
    overview: 'Cotton is a long-duration field crop whose pest pressure and crop protection needs vary by cotton-growing zone, season, and crop stage.',
    seasons: 'Primarily Kharif; sowing and harvesting windows vary considerably across cotton zones.',
    soil: 'Choose a field with suitable drainage and use local soil-test recommendations for fertility planning.',
    stages: [
      { name: 'Sowing and emergence', guidance: 'Use approved seed and establish a uniform plant stand at the locally recommended spacing.' },
      { name: 'Vegetative growth', guidance: 'Manage weeds early and monitor plant growth, soil moisture, and nutrient balance.' },
      { name: 'Squaring and flowering', guidance: 'Scout regularly for sucking pests and bollworm-related damage using local thresholds.' },
      { name: 'Boll development', guidance: 'Protect the crop from moisture stress and continue structured scouting rather than calendar spraying.' },
      { name: 'Boll opening and picking', guidance: 'Pick clean, dry kapas at suitable intervals and keep harvested cotton free from contamination.' },
    ],
    care: ['Follow the current zone-specific cotton advisory and approved seed guidance.', 'Scout the crop at regular intervals and record pest counts before intervention.', 'Use refuge, resistance-management, and pesticide-safety instructions where applicable.', 'Keep picking, storage, and transport areas clean and dry.'],
    problems: [
      { name: 'Sucking pests', signs: 'Leaf curling, sticky deposits, yellowing, or reduced vigour may occur.', firstSteps: 'Inspect the underside of leaves and growing points, record counts, and follow the local threshold-based advisory.' },
      { name: 'Bollworm damage', signs: 'Holes, frass, shedding squares, or damaged bolls may be visible.', firstSteps: 'Inspect squares and bolls across the field and confirm the pest before selecting a registered option.' },
      { name: 'Moisture or nutrient stress', signs: 'Uneven growth, leaf colour changes, shedding, or poor boll development.', firstSteps: 'Review rainfall, irrigation, roots, soil test results, and crop stage together.' },
    ],
  },
  {
    slug: 'coconut',
    name: 'Coconut',
    localNames: 'Nariyal · Thenga',
    category: 'Plantation',
    summary: 'A long-term reference for coconut orchard care, soil and water management, pests, and harvesting.',
    status: 'In review',
    keywords: ['nariyal', 'thenga', 'plantation', 'orchard', 'perennial'],
    overview: 'Coconut is a perennial plantation crop. Good planting material, drainage, moisture management, nutrition, and regular crown observation support long-term productivity.',
    seasons: 'Planting is usually planned around reliable moisture; local rainfall, irrigation, and soil conditions are decisive.',
    soil: 'Deep, well-drained soil is preferred. Avoid water stagnation and select planting sites suitable for long-term palm growth.',
    stages: [
      { name: 'Site and planting material', guidance: 'Select healthy seedlings and a site appropriate for drainage, sunlight, spacing, and water access.' },
      { name: 'Young palm establishment', guidance: 'Protect the basin, maintain moisture without stagnation, and prevent animal or mechanical damage.' },
      { name: 'Vegetative growth', guidance: 'Maintain the root zone, manage weeds and intercrops, and monitor nutrient and water status.' },
      { name: 'Flowering and nut development', guidance: 'Inspect the crown and inflorescences regularly for pest, disease, and moisture stress signs.' },
      { name: 'Harvest', guidance: 'Use a safe, planned harvest method and avoid damage to the palm or developing bunches.' },
    ],
    care: ['Use healthy, true-to-type planting material from a reliable source.', 'Keep drainage channels functional, especially during heavy rainfall.', 'Use soil and leaf analysis where available to guide long-term nutrition.', 'Remove and dispose of severely diseased material according to local plantation guidance.'],
    problems: [
      { name: 'Crown or leaf damage', signs: 'Chewed fronds, holes, wilting, or damaged unopened leaves can indicate different pests.', firstSteps: 'Inspect the crown safely and identify the damage pattern before treatment.' },
      { name: 'Basal stem or root-zone symptoms', signs: 'Trunk lesions, poor vigour, yellowing, or decline may have multiple causes.', firstSteps: 'Check drainage, roots, trunk, nearby palms, and obtain local diagnosis promptly.' },
      { name: 'Nut fall or poor set', signs: 'Premature nut shedding or low set can follow stress, nutrition issues, or pest and disease pressure.', firstSteps: 'Review weather, irrigation, nutrition, pollination, and crown health together.' },
    ],
  },
  {
    slug: 'chilli',
    name: 'Chilli',
    localNames: 'Mirchi · Menasinakayi',
    category: 'Spices',
    summary: 'A practical reference for chilli nursery care, crop stages, nutrition, and common crop protection concerns.',
    status: 'In review',
    keywords: ['mirchi', 'menasinakayi', 'spice', 'vegetable', 'fruiting'],
    overview: 'Chilli is a high-value spice and vegetable crop. Nursery quality, field sanitation, steady moisture, and frequent scouting are central to crop care.',
    seasons: 'Planting windows differ by state and production system, including irrigated, rainfed, and protected cultivation.',
    soil: 'Use well-drained soil and avoid repeated chilli or related-crop cultivation in the same field where disease pressure is high.',
    stages: [
      { name: 'Nursery', guidance: 'Use healthy seed, clean nursery practices, and protection from early damping-off and insect pressure.' },
      { name: 'Transplant establishment', guidance: 'Transplant healthy seedlings and maintain even moisture while roots establish.' },
      { name: 'Branching and flowering', guidance: 'Manage weeds, observe growing points, and avoid severe moisture or nutrient swings.' },
      { name: 'Fruit development', guidance: 'Scout leaves, flowers, and fruits frequently because symptoms can spread quickly.' },
      { name: 'Harvest and drying', guidance: 'Harvest at the intended colour and maturity, then dry and store to prevent quality loss.' },
    ],
    care: ['Choose a variety suited to the local market and season.', 'Use clean planting material and remove volunteer or severely diseased plants.', 'Keep irrigation regular and avoid prolonged wet foliage where possible.', 'Use integrated pest management and verify any product against its current label.'],
    problems: [
      { name: 'Thrips or mite-like damage', signs: 'Silvery patches, curling, bronzing, or distorted young growth may appear.', firstSteps: 'Inspect young leaves and flowers with a hand lens and confirm the pest before treatment.' },
      { name: 'Leaf curl or mosaic symptoms', signs: 'Curling, small leaves, mottling, and stunting may be associated with pests or viruses.', firstSteps: 'Check for vectors, isolate the pattern in the field, and seek local diagnosis; do not assume a nutrient deficiency.' },
      { name: 'Fruit rot or fruit damage', signs: 'Dark lesions, soft rot, holes, or dropped fruit can have different causes.', firstSteps: 'Remove affected material carefully, improve sanitation, and identify the causal problem before spraying.' },
    ],
  },
];

export const sourcePrinciples = [
  'Every published guide will include its source and last-reviewed date.',
  'Fertilizer and crop-protection guidance will be region- and crop-stage specific.',
  'Product labels and local agricultural advisories take priority over generic advice.',
];
