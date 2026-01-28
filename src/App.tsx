import { useState, useEffect } from 'react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    { src: '1000156381.png', alt: 'Labour Lekka App Screen 1' },
    { src: '1000156670.png', alt: 'Labour Lekka App Screen 2' },
    { src: 'Ad1.png', alt: 'Labour Lekka App Screen 3' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(3,7,18,0.65), rgba(3,7,18,0.28)), url('bg-placeholder.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <header className="w-full py-6">
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="logo_lale.jpeg" alt="Labour Lekka logo" className="h-10 w-10 object-contain rounded-md" />
            <span className="font-semibold text-lg text-white">Labour Lekka</span>
          </div>
          <div>
            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-sm text-white/90 hover:underline">Privacy Policy</a>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg inline-block max-w-xl">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">Manage labour, even offline</h1>
              <p className="text-base md:text-lg text-white/90 mb-6">Labour Lekka helps small businesses manage workers, attendance and payments reliably — even when you're offline.</p>

              <div className="flex items-center gap-4">
                <a href="https://play.google.com/store/apps/details?id=com.nmd.labourlekka" target="_blank" rel="noopener noreferrer" className="inline-block rounded-md shadow-lg overflow-hidden" aria-label="Download Labour Lekka on Google Play">
                  <img src="google-play-badge.svg" alt="Get it on Google Play" className="h-16 w-auto block" />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md mx-auto">
              {/* Image Slider */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm border border-white/10">
                <div className="relative min-h-[400px] max-h-[650px] flex items-center justify-center p-4">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;