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
    fetch('/PRIVACY_POLICY.md')
      .then((r) => r.ok ? r.text() : Promise.reject('Failed to load'))
      .then((txt) => setPolicyText(txt))
      .catch(() => setPolicyText('# Privacy Policy\n\nUnable to load policy.'));
  }, []);

  return (
    <div className="min-h-screen bg-[#faf6e9]">
      {/* Header — matches main site nav: white bar, logo left, links right */}
      <header className="bg-white border-b border-[#e7e1cf] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#1c3a2b] hover:text-[#7a9b6f] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-2.5">
            <img src="logo.png" alt="Labour Lekka" className="h-8 w-8 object-contain rounded-md" />
            <span className="font-bold text-[#1c3a2b]">Labour Lekka</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-14">
        {/* Title — plain, no card chrome, matches hero's flat type-first style */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1c3a2b] mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#6b7a63]">
            <span>Effective: December 30, 2025</span>
            <span>Last updated: September 26, 2026</span>
          </div>
        </div>

        {/* Policy body — no card/shadow, just clean readable typography on the cream bg */}
        {policyText == null ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#e7e1cf] border-t-[#1c3a2b] mx-auto mb-4"></div>
              <p className="text-[#6b7a63] text-sm">Loading privacy policy...</p>
            </div>
          </div>
        ) : (
          <article
            id="policy-content"
            className="policy-markdown prose prose-headings:text-[#1c3a2b] prose-headings:font-bold
                       prose-p:text-[#3a3a30] prose-p:leading-relaxed
                       prose-a:text-[#4d7a44] prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-[#1c3a2b]
                       prose-li:text-[#3a3a30]
                       prose-hr:border-[#e7e1cf]
                       max-w-none"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{policyText}</ReactMarkdown>
          </article>
        )}

        {/* Footer action — pill button matching hero CTA style */}
        <div className="mt-14 pt-8 border-t border-[#e7e1cf]">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1c3a2b] text-white rounded-full font-semibold
                       hover:bg-[#2a4d3a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}

export default PrivacyPolicy;