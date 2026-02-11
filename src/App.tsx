import { useState, useEffect } from 'react';
import TeamPage from './TeamPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    { src: '1000156381.png', alt: 'Labour Lekka App Screen 1' },
    { src: '1000156670.png', alt: 'Labour Lekka App Screen 2' },
    { src: 'Ad1.png', alt: 'Labour Lekka App Screen 3' }
  ];

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
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Render team page if on team route
  if (currentPage === 'team') {
    return <TeamPage />;
  }

  // Otherwise render home page
  return (
    <div className="min-h-screen md:bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(3,7,18,0.65), rgba(3,7,18,0.28)), url('bg-placeholder.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <header className="w-full py-6">
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="logo_lale.png" alt="Labour Lekka logo" className="h-10 w-10 object-contain rounded-md" />
            <span className="font-semibold text-lg text-white">Labour Lekka</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#team" className="text-sm text-white/90 hover:text-white hover:underline transition-colors">Our Team</a>
            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-sm text-white/90 hover:text-white hover:underline transition-colors">Privacy Policy</a>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg inline-block max-w-xl">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">Manage labour, even offline</h1>
              <p className="text-base md:text-lg text-white/90 mb-6">Labour Lekka helps households, rural areas, and small businesses manage workers, attendance and payments reliably — even when you're offline.</p>

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

        {/* Features Section */}
        <section className="py-20 mt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-white/80 text-lg">Everything you need to manage workers and helpers efficiently</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-3">Track Attendance</h3>
              <p className="text-white/80">Mark worker attendance daily with timestamps and maintain accurate records effortlessly.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-white mb-3">Manage Payments</h3>
              <p className="text-white/80">Record wages, advances, and calculate final payments automatically. Keep complete payment history.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-4xl mb-4">📴</div>
              <h3 className="text-xl font-semibold text-white mb-3">Works Offline</h3>
              <p className="text-white/80">No internet? No problem. All features work perfectly offline, syncing when connected.</p>
            </div>
          </div>
        </section>

        {/* Target Customers Section */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 backdrop-blur-md p-12 rounded-2xl border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Built for Households, Rural Areas & Businesses</h2>
            <p className="text-white/90 text-lg text-center mb-8 max-w-3xl mx-auto">
              Labour Lekka is designed primarily for households and rural communities who need simple, reliable worker management. 
              Whether you're a household managing domestic helpers, a farmer managing laborers, or a small contractor — this app is for you.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🏡</div>
                <p className="text-white font-semibold">Households</p>
                <p className="text-white/70 text-sm mt-1">Domestic helpers, cooks, drivers</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🌾</div>
                <p className="text-white font-semibold">Rural Areas</p>
                <p className="text-white/70 text-sm mt-1">Farm workers, daily wage laborers</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🏗️</div>
                <p className="text-white font-semibold">Small Businesses</p>
                <p className="text-white/70 text-sm mt-1">Contractors, shop owners</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/80 text-lg">Simple steps to get started</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-white mb-3">Download & Setup</h3>
              <p className="text-white/80">Install the app from Play Store and add your workers in minutes.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-white mb-3">Track Daily</h3>
              <p className="text-white/80">Mark attendance, record work hours, and note any advances given.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-white mb-3">Settle Payments</h3>
              <p className="text-white/80">Calculate dues automatically and maintain complete payment records.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="bg-gradient-to-br from-green-600/30 to-blue-600/30 backdrop-blur-md p-12 rounded-2xl border-2 border-green-400/30 text-center max-w-2xl mx-auto">
            <div className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">100% FREE</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Free Forever. Works Offline.</h2>
            <p className="text-white/90 text-lg mb-8">
              No subscriptions. No hidden costs. No internet required. 
              All features completely free for households, rural areas, and businesses.
            </p>
            <a href="https://play.google.com/store/apps/details?id=com.nmd.labourlekka" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg text-lg">
              Get Labour Lekka Now
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>Does it really work offline?</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/80 mt-4">Yes! Labour Lekka works 100% offline. You can mark attendance, manage payments, and view worker history without any internet connection. If you enable Google Drive cloud storage permission, your data will sync to your own Google Drive storage when you're back online.</p>
            </details>
            
            <details className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>Is there a limit on number of workers?</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/80 mt-4">No limits! Add as many workers as you need. Whether you manage 5 workers or 500, Labour Lekka handles it all for free.</p>
            </details>
            
            <details className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>Can I use it on multiple devices?</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/80 mt-4">Yes! If you grant Google Drive cloud storage permission, your data syncs across all your devices using your own Google Drive storage. Log in with the same Google account on any device to access your records.</p>
            </details>
            
            <details className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>Will it always remain free?</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/80 mt-4">Absolutely! Labour Lekka is completely free with no plans to charge in the future. Our mission is to help small businesses manage labour efficiently.</p>
            </details>
            
            <details className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>Is my data secure?</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/80 mt-4">Yes, your data is stored securely on your device. If you enable cloud backup, it's stored in your own Google Drive storage — not on our servers. We never access or share your information with third parties. You have complete control to delete your data anytime. Read our <a href="/privacy-policy.html" target="_blank" className="underline hover:text-white">privacy policy</a> or <a href="/data-deletion.html" target="_blank" className="underline hover:text-white">data deletion guide</a> for more details.</p>
            </details>
            
            <details className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>Do I need to create an account?</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/80 mt-4">You can use Labour Lekka without any account for local storage. However, to enable cloud backup and sync across devices, you'll need to sign in with your Google account and grant Google Drive permission.</p>
            </details>
            
            <details className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>What happens if I lose my phone?</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/80 mt-4">If you've enabled Google Drive cloud backup, all your data is safely stored in your Google Drive. Simply install Labour Lekka on your new device and sign in with the same Google account to restore everything.</p>
            </details>
            
            <details className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>Can I export my data?</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/80 mt-4">Yes! You can export attendance records and payment history as spreadsheets or PDF reports directly from the app for your records.</p>
            </details>
            
            <details className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>Which languages are supported?</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-white/80 mt-4">Labour Lekka currently supports English, Kannada and Hindi. We're working on adding more regional languages.</p>
            </details>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-md border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="logo_lale.png" alt="Labour Lekka" className="h-10 w-10 object-contain rounded-md" />
                <span className="font-semibold text-lg text-white">Labour Lekka</span>
              </div>
              <p className="text-white/70 text-sm">Effortless worker management for households, rural areas, and small businesses. Works offline, completely free.</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#team" className="text-white/70 hover:text-white text-sm transition-colors">Our Team</a></li>
                <li><a href="/privacy-policy.html" target="_blank" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="/data-deletion.html" target="_blank" className="text-white/70 hover:text-white text-sm transition-colors">Data Deletion Guide</a></li>
                <li><a href="https://play.google.com/store/apps/details?id=com.nmd.labourlekka" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-sm transition-colors">Download App</a></li>
                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors">Blog & Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <a href="mailto:labourlekka@gmail.com" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2">
                <span>📧</span>
                <span>labourlekka@gmail.com</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60 text-sm">&copy; {new Date().getFullYear()} Labour Lekka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;