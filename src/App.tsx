
function App() {
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
        {/* Beta Notice Banner */}
        <div className="mb-12 mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-5 text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold text-white">Beta Testing Phase</h3>
            </div>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Labour Lekka is currently in closed beta testing. We're working hard to deliver a stable, reliable experience. 
              <span className="block mt-2 font-medium text-yellow-300">Request access now to become an early tester and help us build the best labour management solution!</span>
            </p>
          </div>
        </div>

        <section className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg inline-block max-w-xl">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">Manage labour, even offline</h1>
              <p className="text-base md:text-lg text-white/90 mb-6">Labour Lekka helps small businesses manage workers, attendance and payments reliably — even when you're offline.</p>

              <div className="flex items-center gap-4">
                <a href="https://play.google.com/store/apps/details?id=com.nmd.labourlekka" target="_blank" rel="noopener noreferrer" className="inline-block rounded-md shadow-lg overflow-hidden" aria-label="Download Labour Lekka on Google Play">
                  <img src="google-play-badge.svg" alt="Get it on Google Play" className="h-16 w-auto block" />
                </a>

                <a href="mailto:thisisnandanmd@gmail.com?subject=Request%20Access%20to%20Labour%20Lekka" className="ml-2 inline-flex items-center px-4 py-3 bg-yellow-400 text-black font-semibold rounded-md shadow hover:brightness-95">Request access</a>
              </div>

              <p className="mt-3 text-xs text-white/80">(Closed test — selected users only)</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img src="logo_lale.jpeg" alt="Labour Lekka decorative preview" className="w-64 h-64 md:w-[380px] md:h-[380px] object-contain rounded-lg shadow-2xl bg-transparent p-6 opacity-90 filter contrast-95" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;