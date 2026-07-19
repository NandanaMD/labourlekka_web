import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface PrivacyPolicyProps {
  onClose: () => void;
}

function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  const [policyText, setPolicyText] = useState<string | null>(null);

  useEffect(() => {
    // fetch the markdown file from public root
    fetch('/PRIVACY_POLICY.md')
      .then((r) => r.ok ? r.text() : Promise.reject('Failed to load'))
      .then((txt) => setPolicyText(txt))
      .catch(() => setPolicyText('# Privacy Policy\n\nUnable to load policy.'));
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header with back button */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <img src="logo.png" alt="Labour Lekka" className="h-8 w-8 object-contain rounded-md" />
            <span className="font-semibold text-slate-900">Labour Lekka</span>
          </div>

          {/*<button 
            onClick={handleExportPDF}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Export PDF
          </button>*/}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-10 text-white">
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <div className="text-slate-300 text-sm">
              <span className="inline-block mr-4">📅 Effective: December 30, 2025</span>
              <span className="inline-block">📝 Last updated: July 19, 2026</span>
            </div>
          </div>

          {/* Policy Content */}
          <div className="p-8 md:p-12">
            {policyText == null ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading privacy policy...</p>
                </div>
              </div>
            ) : (
              <div className="policy-markdown" id="policy-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{policyText}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}

export default PrivacyPolicy;
