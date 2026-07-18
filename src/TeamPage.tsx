import { useState, useEffect, useRef } from 'react';
import { Home, FileText, ArrowLeft } from 'lucide-react';

interface Contributor {
  name: string;
  role: string;
  description: string;
  image: string;
  initials: string;
}

const contributors: Contributor[] = [
  {
    name: 'Suryanarayan Hegde',
    role: 'Vision Behind Labour Lekka',
    description: 'The idea for Labour Lekka began with his real-world requirement and persistent belief that wage tracking could be simpler and more transparent. His practical thinking and continuous guidance laid the foundation for what the platform stands for today.',
    image: '/team/suryanarayan.jpeg',
    initials: 'SH'
  },
  {
    name: 'Nandana M D',
    role: 'Development & Engineering',
    description: 'Turned an idea into a working product. From architecture to deployment, he built Labour Lekka with a focus on reliability, simplicity, and an offline-first experience that genuinely serves its users.',
    image: '/team/nandana.jpg',
    initials: 'NM'
  },
  {
    name: 'Sunidhi Hegde',
    role: 'UI & Design Direction',
    description: 'Shaped the visual identity and overall user experience of Labour Lekka. Her attention to clarity and detail ensures the platform feels intuitive, approachable, and thoughtfully designed.',
    image: '/team/sunidhi.jpeg',
    initials: 'SH'
  },
  {
    name: 'Sumanth S H',
    role: 'Marketing & Outreach',
    description: 'Helps carry the vision forward by connecting the platform with the people it was built for. Through outreach and awareness efforts, he works to build trust and visibility around Labour Lekka.',
    image: '/team/sumanth.jpeg',
    initials: 'SS'
  },
  {
    name: 'Siddanth M S',
    role: 'Marketing Strategy & Audience Insights',
    description: 'Provided valuable marketing insights and strategic guidance on how to connect with the core audience. His understanding of user needs and market positioning helps Labour Lekka reach the right people effectively.',
    image: '/team/siddanth.jpeg',
    initials: 'SM'
  },
  {
    name: 'Vinay G Hegade',
    role: 'Marketing & Community Outreach',
    description: 'Drives awareness and adoption by building relationships with households, workers, and local communities. He helps communicate Labour Lekka\'s value clearly, gathers on-ground feedback, and supports outreach initiatives.',
    image: '/team/vinay.jpeg',
    initials: 'VH'
  },
  {
    name: 'Sanath Udupa',
    role: 'Product Feedback & Testing',
    description: 'Played a vital role in refining the product through honest feedback and thorough testing. His suggestions and attention to detail continue to strengthen the platform\'s stability and usability.',
    image: '/team/sanath.jpeg',
    initials: 'SU'
  }
];

function ContributorCard({ contributor, index }: { contributor: Contributor; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, index * 80); // Stagger animation
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`bg-white border border-[#ced8b2] hover:border-[#708C69] rounded-2xl transition-all duration-500 p-8 shadow-sm hover:shadow-lg flex flex-col items-center text-center ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Profile Photo */}
      <div className="w-32 h-32 rounded-full mb-6 overflow-hidden bg-[#FCF3E3] border-2 border-[#ced8b2] flex items-center justify-center shadow-inner">
        {!imageError ? (
          <img
            src={contributor.image}
            alt={contributor.name}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-3xl font-bold text-[#708C69]">
            {contributor.initials}
          </span>
        )}
      </div>

      {/* Profile Details */}
      <h3 className="text-xl font-bold text-[#2B3E34] mb-1">
        {contributor.name}
      </h3>
      <p className="text-xs font-semibold text-[#708C69] mb-4 uppercase tracking-wider">
        {contributor.role}
      </p>
      <p className="text-sm text-[#5E7757] leading-relaxed">
        {contributor.description}
      </p>
    </div>
  );
}

export default function TeamPage() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 50);
  }, []);

  return (
    <div className="min-h-screen bg-[#FCF3E3] text-[#2B3E34] relative selection:bg-[#708C69]/20 selection:text-[#2B3E34]">
      {/* Background Grid Pattern (Olive/Sage lines on warm cream) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ced8b2_1px,transparent_1px),linear-gradient(to_bottom,#ced8b2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Header */}
      <header className="w-full border-b border-[#ced8b2]/60 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="logo.png" alt="Labour Lekka logo" className="h-10 w-10 object-contain rounded-xl border border-[#ced8b2] shadow-sm" />
            <span className="font-bold text-xl tracking-tight text-[#2B3E34]">Labour Lekka</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#home" className="text-sm font-semibold text-[#5E7757] hover:text-[#2B3E34] hover:underline transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" />
              Home
            </a>
            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#5E7757] hover:text-[#2B3E34] hover:underline transition-colors flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Privacy
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        
        {/* Navigation Back */}
        <div className="mb-10">
          <a 
            href="#home" 
            className="inline-flex items-center gap-2 text-[#5E7757] hover:text-[#2B3E34] transition-colors text-sm font-semibold group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </a>
        </div>

        {/* Page Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2B3E34] mb-4 tracking-tight">
            The People Behind Labour Lekka
          </h1>
          <p className="text-lg text-[#5E7757] max-w-2xl mx-auto">
            A small, dedicated team solving real-world challenges for households and businesses.
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {contributors.map((contributor, index) => (
            <ContributorCard key={contributor.name} contributor={contributor} index={index} />
          ))}
        </div>

        {/* Closing Note */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#2B3E34] text-[#FCF3E3] border border-[#2B3E34] rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#708C69]/10 rounded-full blur-2xl pointer-events-none" />
            <p className="text-[#FCF3E3]/90 leading-relaxed relative z-10 text-base">
              Labour Lekka is built by a small group working to solve daily attendance and wage settlement tracking. Our focus is simple: design lightweight, secure, and offline-first tools that respect user needs.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-[#FCF3E3]/60 bg-[#2B3E34] border-t border-[#1f2e26] relative z-10">
        <p>&copy; {new Date().getFullYear()} Labour Lekka. Built with care.</p>
      </footer>
    </div>
  );
}
