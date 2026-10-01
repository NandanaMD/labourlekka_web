import { useEffect, useMemo, useState } from 'react';
import {
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

type LibraryItem = {
  title: string;
  description: string;
  category: string;
  icon: typeof Sprout;
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

const featuredCrops = [
  { name: 'Rice', detail: 'Paddy · cereals' },
  { name: 'Tomato', detail: 'Vegetable · fruiting' },
  { name: 'Cotton', detail: 'Fibre · field crop' },
  { name: 'Coconut', detail: 'Plantation · perennial' },
  { name: 'Chilli', detail: 'Spice · vegetable' },
  { name: 'Maize', detail: 'Cereal · field crop' },
];

const categories = ['All topics', 'Crops', 'Fertilizers', 'Crop protection', 'Planning'];

export default function InformationCornerApp() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All topics');

  useEffect(() => {
    document.title = 'Information Corner | Labour Lekka';
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

  return (
    <div className="min-h-screen bg-[#FCF3E3] text-[#2B3E34] selection:bg-[#708C69]/20">
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
          <a href="/" className="text-sm font-semibold text-[#5E7757] transition-colors hover:text-[#2B3E34]">
            Labour Lekka <span className="ml-1">↗</span>
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl pb-14 pt-16 text-center sm:pb-20 sm:pt-24">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[#ced8b2] bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#5E7757]">
            <Leaf className="h-3.5 w-3.5 text-[#708C69]" />
            Practical agriculture knowledge
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#2B3E34] sm:text-6xl">
            Better decisions start with <span className="text-[#708C69]">better information.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5E7757] sm:text-lg">
            A growing, easy-to-use library for crops, farm care, fertilizers, and crop protection across India.
          </p>

          <div className="mx-auto mt-9 flex max-w-2xl items-center rounded-2xl border border-[#ced8b2] bg-white p-2 shadow-[0_12px_35px_-18px_rgba(43,62,52,0.35)] focus-within:border-[#708C69] focus-within:ring-4 focus-within:ring-[#708C69]/10">
            <Search className="ml-3 h-5 w-5 shrink-0 text-[#708C69]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search crops, pests, fertilizers..."
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[#2B3E34] outline-none placeholder:text-[#8A9A83] sm:text-base"
              aria-label="Search the information library"
            />
            <button className="hidden rounded-xl bg-[#2B3E34] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3c5548] sm:block">
              Search
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
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4" aria-label="Information categories">
          {filteredLibrary.map(({ title, description, category, icon: Icon }) => (
            <a
              href={`#${category.toLowerCase().replace(' ', '-')}`}
              key={title}
              className="group rounded-2xl border border-[#ced8b2] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#708C69] hover:shadow-lg"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#ced8b2]/70 bg-[#FCF3E3] text-[#2B3E34]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#708C69]">{category}</p>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5E7757]">{description}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#2B3E34]">
                Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </section>

        <section className="mt-20 border-t border-[#ced8b2]/70 pt-12 sm:mt-28 sm:pt-16">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#708C69]">Start exploring</p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Browse by crop</h2>
            </div>
            <a href="#all-crops" className="inline-flex items-center gap-1 text-sm font-bold text-[#5E7757] hover:text-[#2B3E34]">
              View all crops <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {featuredCrops.map((crop) => (
              <a href={`#crop-${crop.name.toLowerCase()}`} key={crop.name} className="rounded-2xl border border-[#ced8b2] bg-white p-4 transition-colors hover:border-[#708C69]">
                <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-full bg-[#FCF3E3] text-[#708C69]">
                  <Sprout className="h-4 w-4" />
                </div>
                <h3 className="font-bold">{crop.name}</h3>
                <p className="mt-1 text-xs text-[#5E7757]">{crop.detail}</p>
              </a>
            ))}
          </div>
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
