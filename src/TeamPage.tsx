import { useState, useEffect, useRef } from 'react';

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
            }, index * 100); // Stagger animation by 100ms per card
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
      className={`bg-black/50 backdrop-blur-lg rounded-xl border border-white/30 hover:bg-black/60 transition-all duration-500 p-8 md:p-10 shadow-2xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Photo or Placeholder */}
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full mb-5 md:mb-6 overflow-hidden bg-gradient-to-br from-green-900/30 to-blue-900/30 flex items-center justify-center shadow-md border-2 border-white/20">
          {!imageError ? (
            <img
              src={contributor.image}
              alt={contributor.name}
              className="w-full h-full object-cover object-top scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-4xl md:text-5xl font-semibold text-white">
              {contributor.initials}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
          {contributor.name}
        </h3>

        {/* Role */}
        <p className="text-sm md:text-base font-semibold text-green-400 mb-3 md:mb-4">
          {contributor.role}
        </p>

        {/* Description */}
        <p className="text-sm md:text-base text-white/80 leading-relaxed">
          {contributor.description}
        </p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    // Fade in header after component mounts
    setTimeout(() => setHeaderVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen md:bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(3,7,18,0.85), rgba(3,7,18,0.75)), url('bg-placeholder.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Header */}
      <header className="w-full py-4 md:py-6">
        <nav className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/logo_lale.png" alt="Labour Lekka logo" className="h-8 w-8 md:h-10 md:w-10 object-contain rounded-md" />
            <span className="font-semibold text-base md:text-lg text-white">Labour Lekka</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <a href="#home" className="text-xs md:text-sm text-white/90 hover:text-white hover:underline transition-colors">Home</a>
            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-white/90 hover:text-white hover:underline transition-colors">Privacy</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Page Header */}
        <div
          className={`text-center mb-8 md:mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 px-2 drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            The People Behind Labour Lekka
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto px-4">
            Built by a small team solving real problems for households and businesses
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-16 max-w-5xl mx-auto">
          {contributors.map((contributor, index) => (
            <ContributorCard key={contributor.name} contributor={contributor} index={index} />
          ))}
        </div>

        {/* Closing Note */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 backdrop-blur-md rounded-lg p-6 md:p-8 border border-white/20">
            <p className="text-sm md:text-base text-white/90 leading-relaxed">
              Labour Lekka is built by a small, dedicated group working to solve real-world challenges. 
              Our focus is simple: create tools that work reliably, respect user needs, and make daily 
              work management easier for households, rural areas, and small businesses.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 md:py-8 text-center text-xs md:text-sm text-white/60 border-t border-white/10 mt-8 md:mt-16">
        <p>&copy; 2025 Labour Lekka. Built with care.</p>
      </footer>
    </div>
  );
}
