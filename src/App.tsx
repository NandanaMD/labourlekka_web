
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [showPolicy, setShowPolicy] = useState(false);
  const [policyText, setPolicyText] = useState<string | null>(null);

  useEffect(() => {
    if (!showPolicy) return;
    // fetch the markdown file from public root
    fetch('/PRIVACY_POLICY.md')
      .then((r) => r.ok ? r.text() : Promise.reject('Failed to load'))
      .then((txt) => setPolicyText(txt))
      .catch(() => setPolicyText('# Privacy Policy\n\nUnable to load policy.'))
    ;
  }, [showPolicy]);

  // We use `react-markdown` to render the policy Markdown safely and with GFM support.

  return (
    <div className="min-h-screen bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(3,7,18,0.65), rgba(3,7,18,0.28)), url('bg-placeholder.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <header className="w-full py-6">
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="logo_lale.jpeg" alt="Labour Lekka logo" className="h-10 w-10 object-contain rounded-md" />
            <span className="font-semibold text-lg text-white">Labour Lekka</span>
          </div>
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowPolicy(true); }} className="text-sm text-white/90 hover:underline">Privacy Policy</a>
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

      {showPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" role="dialog" aria-modal="true">
          <div className="max-w-3xl w-full mx-4 rounded-lg shadow-2xl overflow-auto max-h-[85vh]">
            {/* translucent glass panel */}
            <div className="bg-white/75 backdrop-blur-md border border-white/30 rounded-lg overflow-hidden">
              <div className="p-4 md:p-6 flex items-start justify-between border-b border-white/30">
                <div>
                  <h2 className="text-xl font-semibold">Privacy Policy</h2>
                  <div className="text-xs text-slate-700 mt-1">Effective: December 30, 2025 · Last updated: December 30, 2025</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={async () => {
                    const el = document.getElementById('policy-content');
                    if (!el) return;
                    // Temporarily ensure white background for clean capture
                    const prevBg = el.style.background;
                    el.style.background = '#ffffff';
                    try {
                      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
                      const imgData = canvas.toDataURL('image/png');
                      const pdf = new jsPDF('p', 'pt', 'a4');
                      const pageWidth = pdf.internal.pageSize.getWidth();
                      const pageHeight = pdf.internal.pageSize.getHeight();
                      const imgWidth = pageWidth;
                      const imgHeight = (canvas.height * imgWidth) / canvas.width;

                      let remainingHeight = imgHeight;
                      let position = 0;

                      // Add first page
                      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                      remainingHeight -= pageHeight;

                      // Add additional pages if needed by shifting the image upwards
                      while (remainingHeight > 0) {
                        position -= pageHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        remainingHeight -= pageHeight;
                      }

                      pdf.save('Labour-Lekka-Privacy-Policy.pdf');
                    } catch (err) {
                      console.error('Export to PDF failed', err);
                      alert('Failed to export PDF. Please try again.');
                    } finally {
                      el.style.background = prevBg;
                    }
                  }} className="px-3 py-1.5 bg-slate-700 text-white rounded text-sm hover:brightness-95">Export PDF</button>
                  <button onClick={() => setShowPolicy(false)} aria-label="Close privacy policy" className="px-3 py-1.5 bg-transparent text-slate-700 hover:text-slate-900 rounded">✕</button>
                </div>
              </div>

              <div className="p-6 text-sm text-slate-800">
                {policyText == null ? (
                  <p>Loading...</p>
                ) : (
                  <div className="policy-markdown" id="policy-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{policyText}</ReactMarkdown>
                  </div>
                )}

                <div className="mt-6 text-right">
                  <button onClick={() => setShowPolicy(false)} className="px-4 py-2 bg-slate-900 text-white rounded">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
