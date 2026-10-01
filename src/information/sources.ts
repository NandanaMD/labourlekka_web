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
];
