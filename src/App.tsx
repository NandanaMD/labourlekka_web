import { useState, useEffect } from 'react';
import {
  Calendar,
  DollarSign,
  WifiOff,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  FileText,
  CheckCircle,
  HelpCircle,
  Users,
  Sprout,
  Briefcase
} from 'lucide-react';
import TeamPage from './TeamPage';

const images = [
  { src: 'post1.png', alt: 'Labour Lekka App Screen 1' },
  { src: 'post2.png', alt: 'Labour Lekka App Screen 2' },
  { src: 'post3.png', alt: 'Labour Lekka App Screen 3' }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);


  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    handleHashChange(); // Check initial hash
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 260) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch swipe support for mobile flyer slider
  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Render team page if on team route
  if (currentPage === 'team') {
    return <TeamPage />;
  }

  // Otherwise render home page
  return (
    <div className="min-h-screen bg-[#FCF3E3] text-[#2B3E34] relative selection:bg-[#708C69]/20 selection:text-[#2B3E34] pb-16 md:pb-0">
      {/* Background Grid Pattern (Olive/Sage lines on warm cream) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ced8b2_1px,transparent_1px),linear-gradient(to_bottom,#ced8b2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Header */}
      <header className="w-full border-b border-[#ced8b2]/60 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img src="logo.png" alt="Labour Lekka logo" className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-xl border border-[#ced8b2] shadow-sm" />
            <span className="font-bold text-lg sm:text-xl tracking-tight text-[#2B3E34] whitespace-nowrap">Labour Lekka</span>
          </div>
          <div className="flex items-center gap-3.5 sm:gap-6">
            <a href="#team" className="text-xs sm:text-sm font-semibold text-[#5E7757] hover:text-[#2B3E34] hover:underline transition-colors flex items-center gap-1 sm:gap-1.5">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Our Team
            </a>
            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold text-[#5E7757] hover:text-[#2B3E34] hover:underline transition-colors flex items-center gap-1 sm:gap-1.5">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Privacy Policy
            </a>
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-8 md:gap-16 pt-8 pb-12 md:py-24">
          {/* Hero Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2B3E34] mb-4 sm:mb-6 leading-[1.18] sm:leading-[1.15]">
              Track farm labour, <br className="hidden sm:inline" />
              <span className="text-[#708C69]">even offline.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5E7757] mb-6 sm:mb-8 max-w-xl leading-relaxed">
              Labour Lekka helps farmers, agricultural contractors, and estate owners manage worker attendance (<i>Hajari</i>) and wage advances (<i>Hisab-Kitab</i>) reliably—without needing internet access.
            </p>

            {/* Download CTA with Official Google Play Badge */}
            <div className="flex flex-col items-center md:items-start w-full gap-3 pt-1 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#2B3E34] tracking-tight uppercase">
                  Download Labour Lekka
                </span>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=com.nmd.labourlekka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform transform active:scale-95 hover:scale-105 shadow-[0_4px_16px_rgba(43,62,52,0.18)] hover:shadow-[0_6px_22px_rgba(43,62,52,0.25)] rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#708C69]"
                aria-label="Download Labour Lekka on Google Play"
              >
                <img
                  src="google-play-badge.svg"
                  alt="Download Labour Lekka on Google Play"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </a>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-xs text-[#5E7757] font-medium pt-0.5">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#708C69]" /> Free Core Features
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <WifiOff className="w-3.5 h-3.5 text-[#708C69]" /> Works 100% Offline
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-[#2B3E34]">
                  ⭐ 4.8 Play Store
                </span>
              </div>
            </div>
          </div>

          {/* Hero Slider with Square Flyer Frame */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div
              className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square bg-white border border-[#ced8b2] rounded-2xl shadow-[0_15px_40px_-10px_rgba(43,62,52,0.15)] overflow-hidden group touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >

              {/* Ad Post Slider */}
              <div className="w-full h-full relative bg-white select-none">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    draggable={false}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                  />
                ))}
              </div>

              {/* Slider Controls Overlay */}
              <button
                onClick={prevSlide}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#FCF3E3] text-[#2B3E34] p-2 sm:p-2.5 rounded-full border border-[#ced8b2] transition-all opacity-70 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 z-30 shadow-md"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#FCF3E3] text-[#2B3E34] p-2 sm:p-2.5 rounded-full border border-[#ced8b2] transition-all opacity-70 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 z-30 shadow-md"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Dots Overlay */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-white/95 px-3 py-1.5 rounded-full border border-[#ced8b2]/60 shadow-md">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${index === currentSlide ? 'bg-[#708C69] w-4' : 'bg-[#ced8b2] w-2'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 border-t border-[#ced8b2]/50">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B3E34] mb-3 md:mb-4">Key Features</h2>
            <p className="text-[#5E7757] text-base sm:text-lg max-w-2xl mx-auto">Everything you need to track farm workers and cash advances efficiently, offline-first.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-[#ced8b2] hover:border-[#708C69] p-6 md:p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#FCF3E3] text-[#2B3E34] flex items-center justify-center mb-5 md:mb-6 border border-[#ced8b2]/50">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2B3E34] mb-2 md:mb-3">Attendance</h3>
              <p className="text-[#5E7757] leading-relaxed text-sm sm:text-base">Mark daily worker attendance with simple checkmarks, tracking half-days, full-days, or specific shifts easily.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-[#ced8b2] hover:border-[#708C69] p-6 md:p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#FCF3E3] text-[#2B3E34] flex items-center justify-center mb-5 md:mb-6 border border-[#ced8b2]/50">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2B3E34] mb-2 md:mb-3">Track Advances & Wages</h3>
              <p className="text-[#5E7757] leading-relaxed text-sm sm:text-base">Record daily wages, cash advances, and deductions (meals/transport) to auto-calculate the final balance.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-[#ced8b2] hover:border-[#708C69] p-6 md:p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#FCF3E3] text-[#2B3E34] flex items-center justify-center mb-5 md:mb-6 border border-[#ced8b2]/50">
                <WifiOff className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2B3E34] mb-2 md:mb-3">Works 100% Offline</h3>
              <p className="text-[#5E7757] leading-relaxed text-sm sm:text-base">No internet connection required. Keep all worker and payment records securely on your own device.
              </p>
            </div>
          </div>
        </section>

        {/* Target Customers Section */}
        <section className="py-12 md:py-20 border-t border-[#ced8b2]/50">
          <div className="bg-[#2B3E34] text-[#FCF3E3] border border-[#2B3E34] p-6 sm:p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#708C69]/10 rounded-full blur-3xl pointer-events-none z-0" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">Built for Farms, Contractors & Estates</h2>
              <p className="text-[#FCF3E3]/80 text-sm sm:text-lg text-center mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                Labour Lekka replaces the traditional paper diary (<i>Lekka Pustaka</i>) with a secure, digital wage book. Whether you manage a small family farm, a large coffee plantation, or moving harvesting crews, this app is built for you.
              </p>

              <div className="grid md:grid-cols-3 gap-5 md:gap-6 text-center">
                <div className="bg-[#2B3E34]/50 border border-[#708C69]/30 p-5 md:p-6 rounded-2xl hover:border-[#708C69]/60 transition-colors flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#708C69]/20 border border-[#708C69]/40 text-[#708C69] flex items-center justify-center mb-3 md:mb-4">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1">Farms & Plantations</h3>
                  <p className="text-[#FCF3E3]/70 text-xs sm:text-sm">Coffee, Tea, Arecanut, Rubber, Coconut</p>
                </div>
                <div className="bg-[#2B3E34]/50 border border-[#708C69]/30 p-5 md:p-6 rounded-2xl hover:border-[#708C69]/60 transition-colors flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#708C69]/20 border border-[#708C69]/40 text-[#708C69] flex items-center justify-center mb-3 md:mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1">Labour Contractors</h3>
                  <p className="text-[#FCF3E3]/70 text-xs sm:text-sm">Harvesting teams, weeding & pruning crews</p>
                </div>
                <div className="bg-[#2B3E34]/50 border border-[#708C69]/30 p-5 md:p-6 rounded-2xl hover:border-[#708C69]/60 transition-colors flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#708C69]/20 border border-[#708C69]/40 text-[#708C69] flex items-center justify-center mb-3 md:mb-4">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1">Rural Workspaces</h3>
                  <p className="text-[#FCF3E3]/70 text-xs sm:text-sm">Brick kilns, plant nurseries, local construction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-20 border-t border-[#ced8b2]/50">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B3E34] mb-3 md:mb-4">How It Works</h2>
            <p className="text-[#5E7757] text-base sm:text-lg">Three simple steps to manage your crew</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div className="relative bg-white border border-[#ced8b2] hover:border-[#708C69] p-6 md:p-8 rounded-2xl text-center shadow-sm pt-10 md:pt-12 transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#708C69] border-4 border-[#FCF3E3] text-white font-extrabold text-lg flex items-center justify-center">1</div>
              <h3 className="text-xl font-bold text-[#2B3E34] mb-2 md:mb-3">Add Your Crew</h3>
              <p className="text-[#5E7757] leading-relaxed text-sm sm:text-base">Download the app, register your worker names, and set their daily wage rate or task rate in seconds.</p>
            </div>

            <div className="relative bg-white border border-[#ced8b2] hover:border-[#708C69] p-6 md:p-8 rounded-2xl text-center shadow-sm pt-10 md:pt-12 transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#708C69] border-4 border-[#FCF3E3] text-white font-extrabold text-lg flex items-center justify-center">2</div>
              <h3 className="text-xl font-bold text-[#2B3E34] mb-2 md:mb-3">Mark Hajari & Advances</h3>
              <p className="text-[#5E7757] leading-relaxed text-sm sm:text-base">Log daily attendance and record cash advances given for groceries, travel, or medical needs right in the field.</p>
            </div>

            <div className="relative bg-white border border-[#ced8b2] hover:border-[#708C69] p-6 md:p-8 rounded-2xl text-center shadow-sm pt-10 md:pt-12 transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#708C69] border-4 border-[#FCF3E3] text-white font-extrabold text-lg flex items-center justify-center">3</div>
              <h3 className="text-xl font-bold text-[#2B3E34] mb-2 md:mb-3">Settle Accounts</h3>
              <p className="text-[#5E7757] leading-relaxed text-sm sm:text-base">Automatically calculate final dues for error-free payouts. Export PDF or Excel ledger sheets to share with workers.<br /><span className="font-bold">Note: Labour Lekka is a ledger and does not process payments or money transfers.</span></p>
            </div>
          </div>
        </section>

        {/* Pricing / Free Core Section */}
        <section className="py-12 md:py-20 border-t border-[#ced8b2]/50" id="pricing">
          <div className="bg-[#708C69]/10 border-2 border-[#708C69]/20 p-7 sm:p-10 md:p-12 rounded-3xl text-center max-w-2xl mx-auto shadow-sm relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#708C69]/20 border border-[#708C69]/30 text-[#2B3E34] text-xs font-bold mb-4 sm:mb-6">
              <CheckCircle className="w-3.5 h-3.5 text-[#2B3E34]" />
              Free Core Features
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2B3E34] mb-3 md:mb-4">
              Free to Use. Always.
            </h2>
            <p className="text-[#5E7757] text-base sm:text-lg mb-6 leading-relaxed max-w-xl mx-auto">
              Track worker attendance (<i>Hajari</i>), cash advances, and daily wage balances completely free—forever. Need advanced features? Optional Pro plans start at just <strong>₹49/month</strong> or <strong>₹399/year</strong>.
            </p>

            {/* Plan breakdown cards */}
            <div className="grid sm:grid-cols-2 gap-3.5 max-w-lg mx-auto mb-8 text-left">
              <div className="bg-white border border-[#ced8b2] rounded-2xl p-4 shadow-2xs">
                <span className="inline-block px-2 py-0.5 rounded bg-[#708C69]/15 text-[#2B3E34] text-[11px] font-bold uppercase tracking-wider mb-1">
                  Core Plan
                </span>
                <p className="text-xl font-extrabold text-[#2B3E34]">
                  ₹0 <span className="text-xs font-semibold text-[#5E7757]">/ Free Forever</span>
                </p>
                <p className="text-xs text-[#5E7757] mt-1 leading-relaxed">
                  Daily attendance, wage hisab, unlimited workers, 100% offline.
                </p>
              </div>

              <div className="bg-white border border-[#ced8b2] rounded-2xl p-4 shadow-2xs">
                <span className="inline-block px-2 py-0.5 rounded bg-[#2B3E34]/10 text-[#2B3E34] text-[11px] font-bold uppercase tracking-wider mb-1">
                  Optional Pro
                </span>
                <p className="text-xl font-extrabold text-[#2B3E34]">
                  ₹49 <span className="text-xs font-semibold text-[#5E7757]">/mo</span> <span className="text-xs text-[#708C69] font-bold">(or ₹399/yr)</span>
                </p>
                <p className="text-xs text-[#5E7757] mt-1 leading-relaxed">
                  Advanced PDF & Excel ledger exports and more
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.nmd.labourlekka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(43,62,48,0.2)] hover:shadow-lg rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#708C69]"
                aria-label="Download Labour Lekka on Google Play"
              >
                <img
                  src="google-play-badge.svg"
                  alt="Download Labour Lekka on Google Play"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </a>
              <span className="text-xs text-[#5E7757] font-semibold">
                No credit card or payment info needed to get started
              </span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 border-t border-[#ced8b2]/50">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B3E34] mb-3 md:mb-4">Frequently Asked Questions</h2>
            <p className="text-[#5E7757] text-base sm:text-lg">Clear answers to common questions about Labour Lekka</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            {/* FAQ 1 */}
            <details className="bg-white border border-[#ced8b2] hover:border-[#708C69] p-5 sm:p-6 rounded-2xl group [&_summary::-webkit-details-marker]:hidden transition-all shadow-sm">
              <summary className="text-[#2B3E34] font-bold cursor-pointer list-none flex justify-between items-center text-base sm:text-lg">
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <HelpCircle className="w-5 h-5 text-[#708C69] flex-shrink-0" />
                  Does it really work offline in remote areas?
                </span>
                <ChevronDown className="w-5 h-5 text-[#5E7757] group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
              </summary>
              <p className="text-[#5E7757] mt-3 sm:mt-4 leading-relaxed pl-7 sm:pl-8 text-sm sm:text-base">
                Yes! Labour Lekka works 100% offline. You can add workers, mark attendance (Hajari), log advances, and view balances without any internet connection. If you enable Google Drive cloud backup permission, your data will sync securely when you are back online.
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="bg-white border border-[#ced8b2] hover:border-[#708C69] p-5 sm:p-6 rounded-2xl group [&_summary::-webkit-details-marker]:hidden transition-all shadow-sm">
              <summary className="text-[#2B3E34] font-bold cursor-pointer list-none flex justify-between items-center text-base sm:text-lg">
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <HelpCircle className="w-5 h-5 text-[#708C69] flex-shrink-0" />
                  Is there a limit on the number of workers?
                </span>
                <ChevronDown className="w-5 h-5 text-[#5E7757] group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
              </summary>
              <p className="text-[#5E7757] mt-3 sm:mt-4 leading-relaxed pl-7 sm:pl-8 text-sm sm:text-base">
                No limits! Add as many workers as you need. Whether you manage 5 seasonal farm workers or 500 plantation labourers, Labour Lekka handles it all with ease.
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="bg-white border border-[#ced8b2] hover:border-[#708C69] p-5 sm:p-6 rounded-2xl group [&_summary::-webkit-details-marker]:hidden transition-all shadow-sm">
              <summary className="text-[#2B3E34] font-bold cursor-pointer list-none flex justify-between items-center text-base sm:text-lg">
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <HelpCircle className="w-5 h-5 text-[#708C69] flex-shrink-0" />
                  Can I use it on multiple devices?
                </span>
                <ChevronDown className="w-5 h-5 text-[#5E7757] group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
              </summary>
              <p className="text-[#5E7757] mt-3 sm:mt-4 leading-relaxed pl-7 sm:pl-8 text-sm sm:text-base">
                Yes! By connecting your Google Account and enabling Google Drive backup permission, your data will sync seamlessly across multiple devices using your own private storage.
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="bg-white border border-[#ced8b2] hover:border-[#708C69] p-5 sm:p-6 rounded-2xl group [&_summary::-webkit-details-marker]:hidden transition-all shadow-sm">
              <summary className="text-[#2B3E34] font-bold cursor-pointer list-none flex justify-between items-center text-base sm:text-lg">
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <HelpCircle className="w-5 h-5 text-[#708C69] flex-shrink-0" />
                  Is my data secure?
                </span>
                <ChevronDown className="w-5 h-5 text-[#5E7757] group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
              </summary>
              <p className="text-[#5E7757] mt-3 sm:mt-4 leading-relaxed pl-7 sm:pl-8 text-sm sm:text-base">
                Absolutely. Your data is stored locally on your device. If backup is enabled, it is stored securely in your own private Google Drive — not on our servers. We never collect, see, or share your worker information.
              </p>
            </details>

            {/* FAQ 5 */}
            <details className="bg-white border border-[#ced8b2] hover:border-[#708C69] p-5 sm:p-6 rounded-2xl group [&_summary::-webkit-details-marker]:hidden transition-all shadow-sm">
              <summary className="text-[#2B3E34] font-bold cursor-pointer list-none flex justify-between items-center text-base sm:text-lg">
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <HelpCircle className="w-5 h-5 text-[#708C69] flex-shrink-0" />
                  Can I export my records?
                </span>
                <ChevronDown className="w-5 h-5 text-[#5E7757] group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
              </summary>
              <p className="text-[#5E7757] mt-3 sm:mt-4 leading-relaxed pl-7 sm:pl-8 text-sm sm:text-base">
                Yes, you can export attendance sheets and wage settlement summaries as spreadsheets or clean PDF reports directly from the app's settings menu.
              </p>
            </details>
          </div>
        </section>
      </main>

      {/* Sticky Mobile Download Dock for On-the-go Mobile / Instagram Traffic */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#ced8b2] px-4 py-2.5 shadow-[0_-4px_20px_rgba(43,62,52,0.12)] flex items-center justify-between gap-3 transition-transform duration-300 ease-in-out ${showStickyBar ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <img src="logo.png" alt="Labour Lekka" className="w-9 h-9 rounded-lg border border-[#ced8b2] flex-shrink-0 object-contain shadow-xs" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#2B3E34] truncate">Labour Lekka</p>
            <p className="text-[11px] text-[#5E7757] truncate font-medium">Free Offline Farm Ledger</p>
          </div>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.nmd.labourlekka"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center transition-transform active:scale-95 shadow-sm rounded-lg overflow-hidden"
          aria-label="Download Labour Lekka on Google Play"
        >
          <img src="google-play-badge.svg" alt="Google Play" className="h-10 w-auto" />
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-[#2B3E34] text-[#FCF3E3]/85 py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="logo.png" alt="Labour Lekka" className="h-10 w-10 object-contain rounded-xl border border-[#708C69]/30 shadow-md" />
                <span className="font-bold text-xl text-white">Labour Lekka</span>
              </div>
              <p className="text-[#FCF3E3]/70 text-sm leading-relaxed">
                Effortless labour ledger for farmers, contractors, and plantations. Free core features, works 100% offline.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-base tracking-wider uppercase">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#team" className="text-[#FCF3E3]/70 hover:text-white text-sm transition-colors">Our Team</a></li>
                <li><a href="/privacy-policy.html" target="_blank" className="text-[#FCF3E3]/70 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="/data-deletion.html" target="_blank" className="text-[#FCF3E3]/70 hover:text-white text-sm transition-colors">Data Deletion Guide</a></li>
                <li><a href="https://play.google.com/store/apps/details?id=com.nmd.labourlekka" target="_blank" rel="noopener noreferrer" className="text-[#FCF3E3]/70 hover:text-white text-sm transition-colors">Download App</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-base tracking-wider uppercase">Contact Us</h3>
              <a href="mailto:labourlekka@gmail.com" className="text-[#FCF3E3]/70 hover:text-white text-sm transition-colors inline-flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#708C69]" />
                labourlekka@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t border-[#1f2e26] pt-8 text-center">
            <p className="text-[#FCF3E3]/55 text-sm">&copy; {new Date().getFullYear()} Labour Lekka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;