export type SourceRecord = {
  crop: string;
  title: string;
  organisation: string;
  type: 'Primary official' | 'Supporting';
  url: string;
  supports: string;
  caution: string;
};

export const sourceRecords: SourceRecord[] = [
  {
    crop: 'Rice',
    title: 'Participatory IPM in Rice',
    organisation: 'ICAR–Indian Institute of Rice Research',
    type: 'Primary official',
    url: 'https://icar-iirr.org/SuccessStories/Participatory%20Integrated%20Pest%20Management%20in%20Rice.pdf',
    supports: 'IPM, pest, disease, and weed management',
    caution: 'Validated in particular locations and agro-ecologies.',
  },
  {
    crop: 'Rice',
    title: 'AESA-based IPM Package: Rice',
    organisation: 'National Institute of Plant Health Management',
    type: 'Primary official',
    url: 'https://niphm.gov.in/IPMPackages/Rice.pdf',
    supports: 'Monitoring, crop protection, and pesticide safety',
    caution: 'Confirm current labels, dose, and pre-harvest interval.',
  },
  {
    crop: 'Tomato',
    title: 'Integrated pest management approaches against major pests and diseases of tomato',
    organisation: 'ICAR–NCIPM',
    type: 'Primary official',
    url: 'https://epubs.icar.org.in/index.php/IndHort/article/view/125318',
    supports: 'Tomato IPM and good agricultural practices',
    caution: 'Research synthesis, not a location-specific spray calendar.',
  },
  {
    crop: 'Cotton',
    title: 'AESA-based IPM Package: Cotton',
    organisation: 'National Institute of Plant Health Management',
    type: 'Primary official',
    url: 'https://niphm.gov.in/IPMPackages/Cotton.pdf',
    supports: 'Pest recognition, surveillance, and IPM',
    caution: 'Use current zone-specific and seasonal advisories.',
  },
  {
    crop: 'Coconut',
    title: 'AESA-based IPM Package: Coconut',
    organisation: 'National Institute of Plant Health Management',
    type: 'Primary official',
    url: 'https://niphm.gov.in/IPMPackages/Coconut.pdf',
    supports: 'Pest and disease diagnosis and monitoring',
    caution: 'Suitability varies with palm age, soil, rainfall, and intercropping.',
  },
  {
    crop: 'Chilli',
    title: 'AESA-based IPM Package: Chillies/Capsicum',
    organisation: 'National Institute of Plant Health Management',
    type: 'Primary official',
    url: 'https://niphm.gov.in/IPMPackages/Chillies-Capsicum-R.pdf',
    supports: 'Stage-wise IPM and pesticide safety',
    caution: 'Validate crop and cultivar-specific advice locally.',
  },
  {
    crop: 'Arecanut',
    title: 'Arecanut cultivation practices',
    organisation: 'ICAR–Central Plantation Crops Research Institute',
    type: 'Primary official',
    url: 'https://cpcri.gov.in/filemgr/webfs/publication/arecanut_cultivation_practices(eng).pdf',
    supports: 'Establishment, nursery, planting, nutrition, water, pests, diseases, and harvesting',
    caution: 'Verify spacing, rates, products, and timings against the latest CPCRI or state recommendation.',
  },
  {
    crop: 'Arecanut',
    title: 'Arecanut varieties',
    organisation: 'ICAR–Central Plantation Crops Research Institute',
    type: 'Primary official',
    url: 'https://cpcri.gov.in/filemgr/webfs/publication/arecanut_varieties.pdf',
    supports: 'Released varieties, traits, and planting-material selection',
    caution: 'A variety release is not automatically suitable for every district.',
  },
  {
    crop: 'Arecanut',
    title: 'Arecanut Yellow Leaf Disease bulletin',
    organisation: 'ICAR–Central Plantation Crops Research Institute',
    type: 'Primary official',
    url: 'https://cpcri.gov.in/filemgr/webfs/publication/CP28091.pdf',
    supports: 'Disease recognition and management topics',
    caution: 'Use diagnosis-oriented content until the bulletin is manually reviewed for current recommendations.',
  },
  {
    crop: 'Coffee',
    title: 'Coffee regions in India',
    organisation: 'Coffee Board of India',
    type: 'Primary official',
    url: 'https://coffeeboard.gov.in/coffee-regions-india.html',
    supports: 'Arabica and Robusta conditions, elevation, climate, soils, shade, and regional context',
    caution: 'General suitability ranges are not rigid eligibility thresholds or yield guarantees.',
  },
  {
    crop: 'Coffee',
    title: 'Coffee Cultivation Guide – Coffee Kaipidi',
    organisation: 'Coffee Board of India',
    type: 'Primary official',
    url: 'https://coffeeboard.gov.in/CoffeeBoard/Coffee%20Cultivation%20Guide%20-%20Coffee%20Kaipidi.pdf',
    supports: 'Nursery, soil and water conservation, shade, pruning, irrigation, pests, diseases, harvest, and processing',
    caution: 'Check detailed prescriptions directly in the current guide before publication.',
  },
  {
    crop: 'Coffee',
    title: 'Coffee Board books and bulletins',
    organisation: 'Coffee Board of India',
    type: 'Primary official',
    url: 'https://coffeeboard.gov.in/books-bulletins.html',
    supports: 'Current publication and extension resource discovery',
    caution: 'Use the individual dated publication as evidence for a specific recommendation.',
  },
];
