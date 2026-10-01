import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Leaf,
  Search,
  ShieldCheck,
  Sprout,
  Wheat,
} from 'lucide-react';
import { cropProfiles } from './content';
import { sourceRecords } from './sources';
import { detailedCropContent } from './detailedContent';

type LibraryItem = {
  title: string;
  description: string;
  category: string;
  icon: typeof Sprout;
};

type TopicCard = {
  title: string;
  label: string;
  description: string;
  sections: string[];
};

type Language = 'en' | 'kn';

const uiText = {
  informationCorner: ['Information Corner', 'ಮಾಹಿತಿ ಕಾರ್ನರ್'],
  cropGuide: ['Crop guide', 'ಬೆಳೆ ಮಾರ್ಗದರ್ಶಿ'],
  informationLibrary: ['Information library', 'ಮಾಹಿತಿ ಗ್ರಂಥಾಲಯ'],
  chooseCrop: ['Choose a crop to explore', 'ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ'],
  exploreTopics: ['Explore topics', 'ವಿಷಯಗಳನ್ನು ನೋಡಿ'],
  cropDescription: ['Select a crop to open its complete guide, with stages, care, field problems, and sources.', 'ಬೆಳೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿದರೆ ಅದರ ಹಂತಗಳು, ಆರೈಕೆ, ಹೊಲದ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಮೂಲಗಳ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ ತೆರೆದುಕೊಳ್ಳುತ್ತದೆ.'],
  topicDescription: ['Select a topic to read the practical guidance available in this section.', 'ಈ ವಿಭಾಗದಲ್ಲಿರುವ ಸರಳ ಮತ್ತು ಉಪಯುಕ್ತ ಮಾಹಿತಿಯನ್ನು ನೋಡಲು ಒಂದು ವಿಷಯ ಆಯ್ಕೆ ಮಾಡಿ.'],
  searchCrops: ['Search crops...', 'ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ...'],
  searchTopics: ['Search topics...', 'ವಿಷಯಗಳನ್ನು ಹುಡುಕಿ...'],
  openGuide: ['Open guide', 'ಮಾರ್ಗದರ್ಶಿ ತೆರೆಯಿರಿ'],
  explore: ['Explore', 'ನೋಡಿ'],
  allTopics: ['All topics', 'ಎಲ್ಲಾ ವಿಷಯಗಳು'],
  crops: ['Crops', 'ಬೆಳೆಗಳು'],
  fertilizers: ['Fertilizers', 'ರಸಗೊಬ್ಬರಗಳು'],
  cropProtection: ['Crop protection', 'ಬೆಳೆ ರಕ್ಷಣೆ'],
  planning: ['Planning', 'ಯೋಜನೆ'],
  browseByCrop: ['Browse by crop', 'ಬೆಳೆಯ ಪ್ರಕಾರ ನೋಡಿ'],
  viewAllCrops: ['View all crops', 'ಎಲ್ಲಾ ಬೆಳೆಗಳನ್ನು ನೋಡಿ'],
  season: ['Season', 'ಹಂಗಾಮು'],
  soil: ['Soil and site', 'ಮಣ್ಣು ಮತ್ತು ಸ್ಥಳ'],
  cropJourney: ['Crop journey', 'ಬೆಳೆಯ ಹಂತಗಳು'],
  stages: ['What to watch at each stage', 'ಪ್ರತಿ ಹಂತದಲ್ಲಿ ಗಮನಿಸಬೇಕಾದದ್ದು'],
  goodPractice: ['Good practice', 'ಉತ್ತಮ ಆರೈಕೆ'],
  careChecklist: ['Care checklist', 'ಆರೈಕೆ ಪಟ್ಟಿ'],
  fieldProblems: ['Field problems', 'ಹೊಲದ ಸಮಸ್ಯೆಗಳು'],
  startObservation: ['Start with observation', 'ಮೊದಲು ಗಮನಿಸಿ, ನಂತರ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ'],
  signs: ['Signs:', 'ಲಕ್ಷಣಗಳು:'],
  firstSteps: ['First steps:', 'ಮೊದಲ ಹೆಜ್ಜೆಗಳು:'],
  sources: ['Sources for this guide', 'ಈ ಮಾರ್ಗದರ್ಶಿಯ ಮೂಲಗಳು'],
  sourceTitle: ['Read the references behind the page', 'ಈ ಮಾಹಿತಿಯ ಹಿಂದಿರುವ ಮೂಲಗಳನ್ನು ನೋಡಿ'],
  inReview: ['In review', 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ'],
  english: ['English', 'ಇಂಗ್ಲಿಷ್'],
  kannada: ['ಕನ್ನಡ', 'ಕನ್ನಡ'],
} as const;

const cropKannada: Record<string, { name: string; localNames: string; category: string; summary: string; overview: string; seasons: string; soil: string; stages: [string, string][]; care: string[]; problems: [string, string, string][] }> = {
  rice: {
    name: 'ಭತ್ತ', localNames: 'ಅಕ್ಕಿ · ಭತ್ತ', category: 'ಧಾನ್ಯ ಬೆಳೆ',
    summary: 'ಭತ್ತದ ನಾಟಿ, ಆರೈಕೆ, ನೀರು, ಪೋಷಕಾಂಶ ಮತ್ತು ಹೊಲದಲ್ಲಿ ಕಾಣುವ ಸಾಮಾನ್ಯ ಸಮಸ್ಯೆಗಳ ಸರಳ ಮಾರ್ಗದರ್ಶಿ.',
    overview: 'ಭಾರತದ ಹಲವು ಭಾಗಗಳಲ್ಲಿ ಭತ್ತವನ್ನು ನೀರಾವರಿ, ಮಳೆ ಆಧಾರಿತ ಮತ್ತು ತಗ್ಗು ಪ್ರದೇಶಗಳಲ್ಲಿ ಬೆಳೆಯುತ್ತಾರೆ. ತಳಿ, ನಾಟಿ ಸಮಯ ಮತ್ತು ನೀರಿನ ನಿರ್ವಹಣೆ ಸ್ಥಳಕ್ಕೆ ತಕ್ಕಂತೆ ಬದಲಾಗುತ್ತದೆ.',
    seasons: 'ಸಾಮಾನ್ಯವಾಗಿ ಖರೀಫ್ ಹಂಗಾಮು; ನೀರಾವರಿ ಇರುವ ಕಡೆ ರಬಿ ಮತ್ತು ಬೇಸಿಗೆ ಭತ್ತವೂ ಬೆಳೆಯಬಹುದು.',
    soil: 'ಚೆನ್ನಾಗಿ ಸಿದ್ಧಪಡಿಸಿದ ಮಣ್ಣು ಮತ್ತು ಸರಿಯಾದ ನೀರು ನಿರ್ವಹಣೆ ಮುಖ್ಯ. ಗೊಬ್ಬರದ ನಿರ್ಧಾರಕ್ಕೆ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    stages: [['ನರ್ಸರಿ ಅಥವಾ ನೇರ ಬಿತ್ತನೆ', 'ಆರೋಗ್ಯಕರ ಬೀಜ ಬಳಸಿ, ನಿಮ್ಮ ಪ್ರದೇಶದ ನೀರು ಮತ್ತು ಕಾರ್ಮಿಕ ಲಭ್ಯತೆಗೆ ತಕ್ಕ ವಿಧಾನ ಆಯ್ಕೆ ಮಾಡಿ.'], ['ಬೆಳೆ ಸ್ಥಾಪನೆ', 'ಸಮಾನವಾಗಿ ಬೆಳೆ ನಿಲ್ಲುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ; ಆರಂಭದಲ್ಲೇ ಕಳೆ, ನೀರು ಮತ್ತು ಸಸಿಗಳ ಒತ್ತಡ ಗಮನಿಸಿ.'], ['ಕವಲು ಬರುವ ಹಂತದಿಂದ ತೆನೆ ರೂಪಿಸುವ ಹಂತ', 'ಪೋಷಕಾಂಶದ ಕೊರತೆ, ಕಳೆ, ಕೀಟ ಮತ್ತು ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ನೋಡಿ.'], ['ಹೂ ಬಿಡುವಿಕೆಯಿಂದ ಕಾಳು ತುಂಬುವ ಹಂತ', 'ನೀರಿನ ಕೊರತೆ ಆಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ ಮತ್ತು ತೆನೆ ಹಾಗೂ ಕಾಳಿನ ಆರೋಗ್ಯ ಗಮನಿಸಿ.'], ['ಮಾಗುವಿಕೆ ಮತ್ತು ಕೊಯ್ಲು', 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶನದ ಪ್ರಕಾರ ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡಿ; ಕಾಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಒಣಗಿಸಿ.']],
    care: ['ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮಾಡಿ, ಸ್ಥಳೀಯವಾಗಿ ಸೂಕ್ತವಾದ ತಳಿ ಆಯ್ಕೆ ಮಾಡಿ.', 'ಸಿಂಪಡಣೆ ಮಾಡುವ ಮೊದಲು ಹೊಲವನ್ನು ಗಮನಿಸಿ, ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆ ಅನುಸರಿಸಿ.', 'ಮಣ್ಣು ಮತ್ತು ಬೆಳೆಯ ಹಂತಕ್ಕೆ ತಕ್ಕಂತೆ ನೀರು ಮತ್ತು ಒಳಚರಂಡಿ ನಿರ್ವಹಿಸಿ.', 'ಕೊಯ್ಲಿನ ನಂತರ ಕಾಳನ್ನು ಸರಿಯಾಗಿ ಒಣಗಿಸಿ ಸಂಗ್ರಹಿಸಿ.'],
    problems: [['ಕಳೆ', 'ಆರಂಭಿಕ ಹಂತ ಮತ್ತು ಕವಲು ಬರುವ ಸಮಯದಲ್ಲಿ ಕಳೆ ಬೆಳೆ ಜೊತೆ ನೀರು ಮತ್ತು ಪೋಷಕಾಂಶಕ್ಕೆ ಸ್ಪರ್ಧಿಸುತ್ತದೆ.', 'ಕಳೆಯ ಪ್ರಕಾರ ಮತ್ತು ಬೆಳೆಯ ಹಂತ ದಾಖಲಿಸಿ, ಸ್ಥಳೀಯ ಕಳೆ ನಿರ್ವಹಣೆ ಸಲಹೆ ಅನುಸರಿಸಿ.'], ['ಎಲೆ ಅಥವಾ ತೆನೆ ಹಾನಿ', 'ಚುಕ್ಕೆ, ಕಲೆ, ಒಣಗಿದ ಭಾಗ ಅಥವಾ ಹಾನಿಯಾದ ತೆನೆಗೆ ಹಲವು ಕಾರಣಗಳಿರಬಹುದು.', 'ಹಾನಿಯ ಚಿತ್ರ ತೆಗೆದು, ಹತ್ತಿರದ ಗಿಡಗಳನ್ನು ನೋಡಿ, ಕಾರಣ ಖಚಿತವಾದ ನಂತರವೇ ಚಿಕಿತ್ಸೆ ಆಯ್ಕೆ ಮಾಡಿ.'], ['ಕೀಟ ಹೆಚ್ಚಳ', 'ಹೊಲದ ಕೆಲವು ಭಾಗಗಳಲ್ಲಿ ಜಿಗಣೆ, ಕಂಬಳಿಹುಳು ಅಥವಾ ಇತರ ಕೀಟಗಳು ಕಾಣಿಸಬಹುದು.', 'ಹಲವು ಜಾಗಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿ; ಕಂಡ ತಕ್ಷಣ ಸಿಂಪಡಿಸುವ ಬದಲು ಸ್ಥಳೀಯ ಮಿತಿ ಆಧಾರಿತ ಸಲಹೆ ಅನುಸರಿಸಿ.']],
  },
};

const cropNamesKannada: Record<string, [string, string, string]> = {
  tomato: ['ಟೊಮೇಟೊ', 'ತರಕಾರಿ ಬೆಳೆ', 'ಟೊಮೇಟೊದ ನರ್ಸರಿ, ಗಿಡದ ಆರೈಕೆ, ಹೂ ಬಿಡುವಿಕೆ ಮತ್ತು ಹಣ್ಣಿನ ಸಮಸ್ಯೆಗಳ ಮಾರ್ಗದರ್ಶಿ.'],
  cotton: ['ಹತ್ತಿ', 'ನಾರಿನ ಬೆಳೆ', 'ಹತ್ತಿಯ ಬೆಳವಣಿಗೆ ಹಂತಗಳು, ಹೊಲದ ಆರೈಕೆ ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ ಬೆಳೆ ರಕ್ಷಣೆಯ ಮಾರ್ಗದರ್ಶಿ.'],
  coconut: ['ತೆಂಗು', 'ತೋಟಗಾರಿಕಾ ಬೆಳೆ', 'ತೆಂಗಿನ ತೋಟದ ದೀರ್ಘಕಾಲದ ಆರೈಕೆ, ಮಣ್ಣು, ನೀರು ಮತ್ತು ಸಾಮಾನ್ಯ ಸಮಸ್ಯೆಗಳ ಮಾರ್ಗದರ್ಶಿ.'],
  chilli: ['ಮೆಣಸಿನಕಾಯಿ', 'ಸಾಂಬಾರ ಬೆಳೆ', 'ಮೆಣಸಿನಕಾಯಿ ನರ್ಸರಿ, ಗಿಡದ ಹಂತಗಳು ಮತ್ತು ಸಾಮಾನ್ಯ ಕೀಟ-ರೋಗ ಸಮಸ್ಯೆಗಳ ಸರಳ ಮಾರ್ಗದರ್ಶಿ.'],
};

const localizedCrop = (crop: typeof cropProfiles[number], language: Language) => {
  const translation = language === 'kn' ? cropKannada[crop.slug] : undefined;
  if (!translation) {
    const fallback = language === 'kn' ? cropNamesKannada[crop.slug] : undefined;
    return fallback ? { ...crop, name: fallback[0], category: fallback[1], summary: fallback[2] } : crop;
  }
  return {
    ...crop,
    ...translation,
    stages: translation.stages.map(([name, guidance]) => ({ name, guidance })),
    care: translation.care,
    problems: translation.problems.map(([name, signs, firstSteps]) => ({ name, signs, firstSteps })),
  };
};

const libraryItems: LibraryItem[] = [
  {
    title: 'Crop guides',
    description: 'Planting, care, nutrition, pests, and harvest guidance for crops grown across India.',
    category: 'Crops',
    icon: Sprout,
  },
  {
    title: 'Fertilizer basics',
    description: 'Understand nutrients, soil needs, application timing, and responsible usage.',
    category: 'Fertilizers',
    icon: Wheat,
  },
  {
    title: 'Pests & diseases',
    description: 'Recognise common signs early and explore practical crop protection steps.',
    category: 'Crop protection',
    icon: ShieldCheck,
  },
  {
    title: 'Seasonal planning',
    description: 'Plan work around Kharif, Rabi, Zaid, local weather, and crop stages.',
    category: 'Planning',
    icon: CalendarDays,
  },
];

const categories = ['All topics', 'Crops', 'Fertilizers', 'Crop protection', 'Planning'];

const topicCards: Record<string, TopicCard[]> = {
  Fertilizers: [
    { title: 'Understanding nutrients', label: 'Basics', description: 'Learn what major and micronutrients do and how deficiency symptoms can appear.', sections: ['Nitrogen, phosphorus, and potassium', 'Secondary and micronutrients', 'Why soil testing matters'] },
    { title: 'Organic manures', label: 'Soil health', description: 'Explore compost, farmyard manure, green manures, and how they support soil structure.', sections: ['Types of organic inputs', 'Compost quality checks', 'Using organic matter responsibly'] },
    { title: 'Fertilizer timing', label: 'Crop stages', description: 'Match nutrient decisions to crop establishment, growth, flowering, and harvest stages.', sections: ['Basal application', 'Split application', 'Avoiding nutrient loss'] },
    { title: 'Reading a fertilizer label', label: 'Safe use', description: 'Understand nutrient analysis, application instructions, storage, and handling information.', sections: ['Nutrient analysis', 'Application instructions', 'Storage and safety'] },
  ],
  'Crop protection': [
    { title: 'Identify the problem', label: 'First steps', description: 'A simple process for checking symptoms, crop stage, field pattern, and likely causes.', sections: ['Observe the whole plant', 'Check field distribution', 'Confirm before treatment'] },
    { title: 'Common insect damage', label: 'Insects', description: 'Recognise feeding patterns and begin with scouting and integrated management.', sections: ['Leaf and shoot damage', 'Flower and fruit damage', 'Threshold-based decisions'] },
    { title: 'Common disease signs', label: 'Diseases', description: 'Understand spots, wilting, rots, and spread patterns without guessing from one symptom.', sections: ['Leaf and stem symptoms', 'Root and wilt symptoms', 'Weather and sanitation'] },
    { title: 'Responsible sprays', label: 'Safety', description: 'Use product labels, protective equipment, and local agricultural advice before spraying.', sections: ['Check crop and pest registration', 'Follow label and PHI', 'Protect people, livestock, and pollinators'] },
  ],
  Planning: [
    { title: 'Kharif season', label: 'Seasonal planning', description: 'Plan rainfed and irrigated crop work around monsoon conditions and local sowing windows.', sections: ['Field preparation', 'Sowing readiness', 'Managing excess rain'] },
    { title: 'Rabi season', label: 'Seasonal planning', description: 'Organise cool-season crop activities, irrigation, and frost or heat considerations.', sections: ['Land and seed planning', 'Irrigation checks', 'Harvest preparation'] },
    { title: 'Zaid season', label: 'Seasonal planning', description: 'Prepare for short-duration summer crops with careful water and heat management.', sections: ['Water availability', 'Heat stress', 'Quick crop cycles'] },
    { title: 'Crop stage planner', label: 'Field work', description: 'Keep important scouting, irrigation, nutrition, and harvest tasks visible by crop stage.', sections: ['Establishment tasks', 'Flowering tasks', 'Harvest tasks'] },
  ],
};

export default function InformationCornerApp() {
  const [language, setLanguage] = useState<Language>('en');
  const [route, setRoute] = useState(window.location.pathname);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All topics');
  const [selectedCropSlug, setSelectedCropSlug] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicCard | null>(null);
  const t = (key: keyof typeof uiText) => uiText[key][language === 'kn' ? 1 : 0];
  const languageToggle = (
    <div className="flex items-center rounded-full border border-[#ced8b2] bg-white/70 p-1 text-xs font-bold">
      <button onClick={() => setLanguage('en')} className={`rounded-full px-2.5 py-1.5 transition-colors ${language === 'en' ? 'bg-[#2B3E34] text-white' : 'text-[#5E7757]'}`}>EN</button>
      <button onClick={() => setLanguage('kn')} className={`rounded-full px-2.5 py-1.5 transition-colors ${language === 'kn' ? 'bg-[#2B3E34] text-white' : 'text-[#5E7757]'}`}>ಕನ್ನಡ</button>
    </div>
  );
  const categoryLabel = (category: string) => {
    if (language !== 'kn') return category;
    return { Crops: t('crops'), Fertilizers: t('fertilizers'), 'Crop protection': t('cropProtection'), Planning: t('planning') }[category] ?? category;
  };
  const libraryTitle = (title: string) => language === 'kn' ? ({
    'Crop guides': 'ಬೆಳೆ ಮಾರ್ಗದರ್ಶಿಗಳು',
    'Fertilizer basics': 'ರಸಗೊಬ್ಬರದ ಮೂಲಭಾಗಗಳು',
    'Pests & diseases': 'ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳು',
    'Seasonal planning': 'ಹಂಗಾಮಿನ ಯೋಜನೆ',
  }[title] ?? title) : title;

  useEffect(() => {
    document.title = 'Information Corner | Labour Lekka';
    const handlePopState = () => {
      setRoute(window.location.pathname);
      setSelectedTopic(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const filteredLibrary = useMemo(() => {
    const search = query.trim().toLowerCase();
    return libraryItems.filter((item) => {
      const matchesCategory = activeCategory === 'All topics' || item.category === activeCategory;
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  const filteredCrops = useMemo(() => {
    const search = query.trim().toLowerCase();
    return cropProfiles.filter((crop) => {
      if (!search) return true;
      const localized = localizedCrop(crop, language);
      return [localized.name, localized.localNames, localized.category, localized.summary, ...crop.keywords]
        .join(' ')
        .toLowerCase()
        .includes(search);
    });
  }, [language, query]);

  const routeCropSlug = route.match(/^\/crops\/([^/]+)$/)?.[1];
  const routeSection = route === '/crops' ? 'Crops' : route === '/fertilizers' ? 'Fertilizers' : route === '/crop-protection' ? 'Crop protection' : route === '/planning' ? 'Planning' : null;
  const selectedCropRecord = cropProfiles.find((crop) => crop.slug === (routeCropSlug ?? selectedCropSlug));
  const selectedCrop = selectedCropRecord ? localizedCrop(selectedCropRecord, language) : undefined;
  const selectedCropSources = selectedCrop
    ? sourceRecords.filter((source) => source.crop === selectedCrop.name)
    : [];
  const selectedCropDetails = selectedCrop ? detailedCropContent[selectedCrop.slug] ?? [] : [];

  const openCrop = (slug: string) => {
    setSelectedTopic(null);
    setSelectedCropSlug(slug);
    window.history.pushState(null, '', `/crops/${slug}`);
    setRoute(`/crops/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeCrop = () => {
    setSelectedCropSlug(null);
    window.history.pushState(null, '', '/crops');
    setRoute('/crops');
  };

  const openSection = (section: string) => {
    setSelectedTopic(null);
    const path = section === 'Crops' ? '/crops' : `/${section.toLowerCase().replace(' ', '-')}`;
    window.history.pushState(null, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeSection = () => {
    setSelectedTopic(null);
    window.history.pushState(null, '', '/');
    setRoute('/');
  };

  if (routeSection) {
    const isCropSection = routeSection === 'Crops';
    const sectionTopics = topicCards[routeSection] ?? [];

    return (
      <div lang={language} className={`min-h-screen bg-[#FCF3E3] text-[#2B3E34] selection:bg-[#708C69]/20 ${language === 'kn' ? 'font-kannada' : ''}`}>
        <header className="sticky top-0 z-30 border-b border-[#ced8b2]/70 bg-[#FCF3E3]/90 backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <button onClick={closeSection} className="inline-flex items-center gap-2 text-sm font-bold text-[#5E7757] hover:text-[#2B3E34]">
              <ArrowLeft className="h-4 w-4" /> {t('informationCorner')}
            </button>
            <div className="flex items-center gap-3">{languageToggle}<span className="text-xs font-bold uppercase tracking-[0.12em] text-[#708C69]">{routeSection}</span></div>
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-3xl py-12 text-center sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#708C69]">{t('informationLibrary')}</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {isCropSection ? t('chooseCrop') : `${t('exploreTopics')} · ${routeSection}`}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#5E7757]">
              {isCropSection ? t('cropDescription') : t('topicDescription')}
            </p>
            <div className="mx-auto mt-7 flex max-w-xl items-center rounded-2xl border border-[#ced8b2] bg-white p-2 focus-within:border-[#708C69] focus-within:ring-4 focus-within:ring-[#708C69]/10">
              <Search className="ml-3 h-5 w-5 shrink-0 text-[#708C69]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={isCropSection ? t('searchCrops') : t('searchTopics')}
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[#8A9A83]"
                aria-label={`Search ${routeSection}`}
              />
            </div>
          </section>

          {isCropSection ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCrops.map((crop) => (
                <button key={crop.slug} onClick={() => openCrop(crop.slug)} className="group rounded-2xl border border-[#ced8b2] bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-[#708C69] hover:shadow-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCF3E3] text-[#708C69]"><Sprout className="h-6 w-6" /></div>
                    <span className="rounded-full bg-[#FCF3E3] px-3 py-1 text-xs font-bold text-[#708C69]">{language === 'kn' ? t('inReview') : crop.status}</span>
                  </div>
                  <h2 className="mt-7 text-xl font-bold">{crop.name}</h2>
                  <p className="mt-1 text-sm font-medium text-[#708C69]">{crop.localNames}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#5E7757]">{crop.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold">{t('openGuide')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </button>
              ))}
            </div>
          ) : selectedTopic ? (
            <section className="mx-auto max-w-4xl">
              <button onClick={() => setSelectedTopic(null)} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#5E7757] hover:text-[#2B3E34]"><ArrowLeft className="h-4 w-4" /> {t('informationLibrary')}</button>
              <article className="rounded-3xl border border-[#ced8b2] bg-white p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#708C69]">{selectedTopic.label}</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{selectedTopic.title}</h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#5E7757]">{selectedTopic.description}</p>
                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {selectedTopic.sections.map((item, index) => (
                    <div key={item} className="rounded-2xl bg-[#FCF3E3] p-5">
                      <span className="text-sm font-extrabold text-[#708C69]">0{index + 1}</span>
                      <h3 className="mt-5 font-bold">{item}</h3>
                    </div>
                  ))}
                </div>
                <p className="mt-8 rounded-xl border border-[#ced8b2] bg-[#FCF3E3]/60 p-4 text-sm leading-relaxed text-[#5E7757]">Detailed, crop- and region-specific recommendations will be added here after review. Always follow the current local advisory and product label for inputs and crop protection.</p>
              </article>
            </section>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sectionTopics.map((topic) => (
                <button key={topic.title} onClick={() => setSelectedTopic(topic)} className="group rounded-2xl border border-[#ced8b2] bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-[#708C69] hover:shadow-lg">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCF3E3] text-[#708C69]"><BookOpen className="h-5 w-5" /></div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-[#708C69]">{topic.label}</p>
                  <h2 className="mt-2 text-xl font-bold">{topic.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E7757]">{topic.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold">{t('explore')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  if (selectedCrop) {
    return (
      <div lang={language} className={`min-h-screen bg-[#FCF3E3] text-[#2B3E34] selection:bg-[#708C69]/20 ${language === 'kn' ? 'font-kannada' : ''}`}>
        <header className="sticky top-0 z-30 border-b border-[#ced8b2]/70 bg-[#FCF3E3]/90 backdrop-blur-md">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
            <button onClick={closeCrop} className="inline-flex items-center gap-2 text-sm font-bold text-[#5E7757] hover:text-[#2B3E34]">
              <ArrowLeft className="h-4 w-4" /> {t('informationCorner')}
            </button>
            <div className="flex items-center gap-3">{languageToggle}<span className="hidden text-xs font-bold uppercase tracking-[0.12em] text-[#708C69] sm:block">{t('cropGuide')}</span></div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          <section className="border-b border-[#ced8b2]/70 py-12 sm:py-16">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#708C69]">
              <span>{selectedCrop.category}</span>
              <span className="text-[#ced8b2]">•</span>
              <span>{language === 'kn' ? t('inReview') : selectedCrop.status}</span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">{selectedCrop.name}</h1>
            <p className="mt-3 text-sm font-medium text-[#5E7757]">{selectedCrop.localNames}</p>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#5E7757]">{selectedCrop.overview}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#ced8b2] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#708C69]">{t('season')}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#5E7757]">{selectedCrop.seasons}</p>
              </div>
              <div className="rounded-2xl border border-[#ced8b2] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#708C69]">{t('soil')}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#5E7757]">{selectedCrop.soil}</p>
              </div>
            </div>
          </section>

          <section className="border-b border-[#ced8b2]/70 py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#708C69]">{language === 'kn' ? 'ಬೆಳೆ ಮಾಹಿತಿ' : 'Crop information'}</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{language === 'kn' ? 'ಬೆಳೆಯ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದ ಮುಖ್ಯ ವಿಷಯಗಳು' : 'The information you need in one place'}</h2>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {selectedCropDetails.map((section) => (
                <article key={section.title} className="rounded-2xl border border-[#ced8b2] bg-white p-6">
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E7757]">{section.summary}</p>
                  <ul className="mt-5 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#5E7757]">
                        <span className="mt-1 text-[#708C69]">•</span><span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-12 py-12 lg:grid-cols-[1.35fr_0.65fr] sm:py-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#708C69]">{t('cropJourney')}</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{t('stages')}</h2>
              <div className="mt-7 space-y-3">
                {selectedCrop.stages.map((stage, index) => (
                  <div key={stage.name} className="flex gap-4 rounded-2xl border border-[#ced8b2] bg-white p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FCF3E3] text-sm font-extrabold text-[#708C69]">{index + 1}</span>
                    <div>
                      <h3 className="font-bold">{stage.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#5E7757]">{stage.guidance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <aside>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#708C69]">{t('goodPractice')}</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{t('careChecklist')}</h2>
              <ul className="mt-7 space-y-3">
                {selectedCrop.care.map((item) => (
                  <li key={item} className="rounded-xl border border-[#ced8b2] bg-white p-4 text-sm leading-relaxed text-[#5E7757]">
                    <span className="mr-2 font-bold text-[#708C69]">✓</span>{item}
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section className="border-t border-[#ced8b2]/70 py-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#708C69]">{t('fieldProblems')}</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{t('startObservation')}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5E7757]">{language === 'kn' ? 'ಒಂದೇ ಲಕ್ಷಣಕ್ಕೆ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಕಾರಣಗಳಿರಬಹುದು. ಚಿಕಿತ್ಸೆ ಆಯ್ಕೆ ಮಾಡುವ ಮೊದಲು ಲಕ್ಷಣ, ಬೆಳೆಯ ಹಂತ ಮತ್ತು ಸ್ಥಳೀಯ ಪರಿಸ್ಥಿತಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.' : 'A symptom can have more than one cause. Confirm the pattern, crop stage, and local conditions before choosing a treatment.'}</p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {selectedCrop.problems.map((problem) => (
                <article key={problem.name} className="rounded-2xl border border-[#ced8b2] bg-white p-5">
                  <h3 className="font-bold">{problem.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#5E7757]"><strong className="text-[#2B3E34]">{t('signs')}</strong> {problem.signs}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E7757]"><strong className="text-[#2B3E34]">{t('firstSteps')}</strong> {problem.firstSteps}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[#2B3E34] p-7 text-[#FCF3E3] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#A8C19D]">{language === 'kn' ? 'ಈ ಪುಟದಲ್ಲೇ ಮಾಹಿತಿ' : 'Information on this page'}</p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {language === 'kn' ? 'ಬೆಳೆಯ ಬಗ್ಗೆ ಮುಖ್ಯ ಮಾಹಿತಿಯನ್ನು ಇಲ್ಲಿಯೇ ಓದಿ' : 'Read the crop guidance here'}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#FCF3E3]/70">
              {language === 'kn'
                ? 'ಈ ಮಾರ್ಗದರ್ಶಿಯಲ್ಲಿರುವ ಮಾಹಿತಿ ನಮ್ಮ ಪುಟದಲ್ಲೇ ಓದಲು ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ. ಕೆಳಗಿನ ಮೂಲಗಳು ಹೆಚ್ಚುವರಿ ಪರಿಶೀಲನೆಗಾಗಿ ಮಾತ್ರ.'
                : 'The practical guidance is written for this page. The references below are optional if you want to verify or read the original technical material.'}
            </p>
            <details className="mt-7 rounded-2xl border border-[#708C69]/40 bg-[#203329]">
              <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-white">
                {language === 'kn' ? 'ಮೂಲಗಳನ್ನು ನೋಡಿ' : 'View optional sources'}
              </summary>
              <div className="grid gap-3 border-t border-[#708C69]/30 p-4">
                {selectedCropSources.map((source) => (
                  <a key={source.title} href={source.url} target="_blank" rel="noreferrer" className="rounded-xl border border-[#708C69]/40 p-4 transition-colors hover:border-[#A8C19D]">
                    <p className="text-sm font-bold text-white">{source.title} ↗</p>
                    <p className="mt-1 text-xs text-[#FCF3E3]/65">{source.organisation} · {source.supports}</p>
                  </a>
                ))}
              </div>
            </details>
            <p className="mt-6 text-xs leading-relaxed text-[#FCF3E3]/65">
              {language === 'kn'
                ? `ಈ ಮಾರ್ಗದರ್ಶಿ ${selectedCrop.status === 'In review' ? 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ' : 'ಪ್ರಕಟಿಸಲಾಗಿದೆ'}. ಗೊಬ್ಬರ ಮತ್ತು ಬೆಳೆ ರಕ್ಷಣೆಯ ನಿಖರ ಬಳಕೆಗೆ ಸ್ಥಳೀಯ ಸಲಹೆ ಮತ್ತು ಉತ್ಪನ್ನದ ಲೇಬಲ್ ಪರಿಶೀಲಿಸಿ.`
                : `This guide is ${selectedCrop.status.toLowerCase()}. For exact input and crop-protection use, check the current local advisory and product label.`}
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div lang={language} className={`min-h-screen bg-[#FCF3E3] text-[#2B3E34] selection:bg-[#708C69]/20 ${language === 'kn' ? 'font-kannada' : ''}`}>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#ced8b2_1px,transparent_1px),linear-gradient(to_bottom,#ced8b2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_48%_at_50%_0%,#000_65%,transparent_100%)] opacity-45" />

      <header className="sticky top-0 z-30 border-b border-[#ced8b2]/70 bg-[#FCF3E3]/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Labour Lekka home">
            <img src="/logo.png" alt="" className="h-10 w-10 rounded-xl border border-[#ced8b2] object-contain shadow-sm" />
            <div>
              <p className="text-base font-extrabold tracking-tight sm:text-lg">Information Corner</p>
              <p className="hidden text-xs font-medium text-[#5E7757] sm:block">by Labour Lekka</p>
            </div>
          </a>
          <div className="flex items-center gap-3">{languageToggle}<a href="/" className="text-sm font-semibold text-[#5E7757] transition-colors hover:text-[#2B3E34]">Labour Lekka <span className="ml-1">↗</span></a></div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl pb-14 pt-16 text-center sm:pb-20 sm:pt-24">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[#ced8b2] bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#5E7757]">
            <Leaf className="h-3.5 w-3.5 text-[#708C69]" />
            {language === 'kn' ? 'ರೈತರಿಗೆ ಉಪಯುಕ್ತವಾಗುವ ಮಾಹಿತಿ' : 'Practical agriculture knowledge'}
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#2B3E34] sm:text-6xl">
            {language === 'kn' ? <>ಸರಿಯಾದ ಮಾಹಿತಿಯಿಂದ <span className="text-[#708C69]">ಉತ್ತಮ ನಿರ್ಧಾರಗಳು.</span></> : <>Better decisions start with <span className="text-[#708C69]">better information.</span></>}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5E7757] sm:text-lg">
            {language === 'kn' ? 'ಭಾರತದ ಬೆಳೆಗಳು, ಹೊಲದ ಆರೈಕೆ, ರಸಗೊಬ್ಬರ ಮತ್ತು ಬೆಳೆ ರಕ್ಷಣೆಯ ಸರಳ ಮಾಹಿತಿ ಒಂದೇ ಜಾಗದಲ್ಲಿ.' : 'A growing, easy-to-use library for crops, farm care, fertilizers, and crop protection across India.'}
          </p>

          <div className="mx-auto mt-9 flex max-w-2xl items-center rounded-2xl border border-[#ced8b2] bg-white p-2 shadow-[0_12px_35px_-18px_rgba(43,62,52,0.35)] focus-within:border-[#708C69] focus-within:ring-4 focus-within:ring-[#708C69]/10">
            <Search className="ml-3 h-5 w-5 shrink-0 text-[#708C69]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={language === 'kn' ? 'ಬೆಳೆ, ಕೀಟ, ರಸಗೊಬ್ಬರ ಹುಡುಕಿ...' : 'Search crops, pests, fertilizers...'}
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[#2B3E34] outline-none placeholder:text-[#8A9A83] sm:text-base"
              aria-label="Search the information library"
            />
            <button className="hidden rounded-xl bg-[#2B3E34] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3c5548] sm:block">
            {language === 'kn' ? 'ಹುಡುಕಿ' : 'Search'}
            </button>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Filter information topics">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                  activeCategory === category
                    ? 'border-[#2B3E34] bg-[#2B3E34] text-white'
                    : 'border-[#ced8b2] bg-white/70 text-[#5E7757] hover:border-[#708C69] hover:text-[#2B3E34]'
                }`}
              >
                {category === 'All topics' ? t('allTopics') : categoryLabel(category)}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4" aria-label="Information categories">
          {filteredLibrary.map(({ title, description, category, icon: Icon }) => (
            <button
              onClick={() => openSection(category)}
              key={title}
              className="group rounded-2xl border border-[#ced8b2] bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#708C69] hover:shadow-lg"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#ced8b2]/70 bg-[#FCF3E3] text-[#2B3E34]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#708C69]">{categoryLabel(category)}</p>
              <h2 className="text-xl font-bold">{libraryTitle(title)}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5E7757]">{description}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#2B3E34]">
                {t('explore')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </section>

        <section className="mt-20 border-t border-[#ced8b2]/70 pt-12 sm:mt-28 sm:pt-16">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#708C69]">{language === 'kn' ? 'ಆರಂಭಿಸಿ' : 'Start exploring'}</p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t('browseByCrop')}</h2>
            </div>
            <button onClick={() => openSection('Crops')} className="inline-flex items-center gap-1 text-sm font-bold text-[#5E7757] hover:text-[#2B3E34]">
              {t('viewAllCrops')} <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {filteredCrops.map((crop) => (
              <button onClick={() => openCrop(crop.slug)} key={crop.slug} className="rounded-2xl border border-[#ced8b2] bg-white p-4 text-left transition-colors hover:border-[#708C69]">
                <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-full bg-[#FCF3E3] text-[#708C69]">
                  <Sprout className="h-4 w-4" />
                </div>
                <h3 className="font-bold">{crop.name}</h3>
                <p className="mt-1 text-xs text-[#5E7757]">{crop.category}</p>
              </button>
            ))}
          </div>
          {filteredCrops.length === 0 && (
            <p className="mt-8 rounded-2xl border border-dashed border-[#ced8b2] p-6 text-center text-sm text-[#5E7757]">
              No crops found for “{query}”.
            </p>
          )}
        </section>

        <section className="mt-20 border-t border-[#ced8b2]/70 pt-12 sm:mt-28 sm:pt-16">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#708C69]">How we build it</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Reviewed before it is published.</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5E7757] sm:text-base">
              Our starting references come from Indian agricultural institutions. Advice that depends on state, season, crop stage, or product label stays marked for review.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['01', 'Official sources', 'ICAR, NIPHM, agricultural universities, and government extension resources.'],
              ['02', 'Local context', 'Region, season, variety, and crop stage stay attached to each record.'],
              ['03', 'Clear status', 'Draft and in-review material is not presented as a final recommendation.'],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-2xl border border-[#ced8b2] bg-white p-6">
                <span className="text-sm font-extrabold text-[#708C69]">{number}</span>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5E7757]">{description}</p>
              </div>
            ))}
          </div>
          <details className="mt-8 rounded-2xl border border-[#ced8b2] bg-white">
            <summary className="cursor-pointer list-none px-6 py-5 text-sm font-bold text-[#2B3E34]">
              View our initial source register ({sourceRecords.length} references)
            </summary>
            <div className="grid gap-4 border-t border-[#ced8b2]/60 px-6 py-6 md:grid-cols-2">
              {sourceRecords.map((source) => (
                <div key={`${source.crop}-${source.title}`} className="rounded-xl bg-[#FCF3E3]/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#708C69]">{source.crop} · {source.type}</p>
                  <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 block font-bold text-[#2B3E34] hover:text-[#708C69]">
                    {source.title} ↗
                  </a>
                  <p className="mt-1 text-xs text-[#5E7757]">{source.organisation}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E7757]">{source.supports}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#8A6E4B]">Note: {source.caution}</p>
                </div>
              ))}
            </div>
          </details>
        </section>

        <section className="mt-20 rounded-3xl bg-[#2B3E34] p-7 text-[#FCF3E3] shadow-xl sm:mt-28 sm:p-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <BookOpen className="mb-5 h-7 w-7 text-[#A8C19D]" />
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Built for the work in the field.</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#FCF3E3]/70 sm:text-base">
                Clear, practical guides that are easy to read when you need them.
              </p>
            </div>
            <a href="#guides" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#708C69] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#829e7a]">
              Browse all guides <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#ced8b2]/70 px-4 py-7 text-center text-xs text-[#5E7757] sm:px-6">
        Information Corner · Labour Lekka
      </footer>
    </div>
  );
}
