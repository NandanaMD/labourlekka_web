import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Calendar,
  Users,
  DollarSign,
  FileSpreadsheet,
  Cloud,
  Smartphone,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export interface GuideVideo {
  id: string;
  youtubeId: string; // Replace with your YouTube Video ID (e.g. 'dQw4w9WgXcQ')
  title: {
    en: string;
    kn: string;
  };
  category: {
    en: string;
    kn: string;
  };
  duration: string;
  icon: typeof Calendar;
}

export const GUIDE_VIDEOS: GuideVideo[] = [
  {
    id: 'attendance',
    youtubeId: 'M7lc1UVf-VE', // Sample placeholder YouTube ID
    title: {
      en: 'How to Mark Daily Attendance (Hajari)',
      kn: 'ದಿನದ ಹಾಜರಾತಿ (ಹಾಜರಿ) ದಾಖಲಿಸುವುದು ಹೇಗೆ?'
    },
    category: {
      en: 'Daily Attendance',
      kn: 'ದೈನಂದಿನ ಹಾಜರಾತಿ'
    },
    duration: '1:45',
    icon: Calendar
  },
  {
    id: 'workers',
    youtubeId: '',
    title: {
      en: 'Adding Workers & Setting Daily Wage Rate',
      kn: 'ಹೊಸ ಕಾರ್ಮಿಕರನ್ನು ಸೇರಿಸುವುದು ಮತ್ತು ದಿನಗೂಲಿ ನಿಗದಿ'
    },
    category: {
      en: 'Worker Management',
      kn: 'ಕಾರ್ಮಿಕರ ನಿರ್ವಹಣೆ'
    },
    duration: '2:10',
    icon: Users
  },
  {
    id: 'advances',
    youtubeId: '',
    title: {
      en: 'Recording Cash Advances & Deductions',
      kn: 'ಮುಂಗಡ ಹಣ (Advance) ಮತ್ತು ಖರ್ಚುಗಳನ್ನು ನಮೂದಿಸುವುದು'
    },
    category: {
      en: 'Advances & Khata',
      kn: 'ಮುಂಗಡ & ಖಾತೆ'
    },
    duration: '1:30',
    icon: DollarSign
  },
  {
    id: 'settlement',
    youtubeId: '',
    title: {
      en: 'Settling Accounts & Sharing PDF Reports on WhatsApp',
      kn: 'ಲೆಕ್ಕ ಚುಕ್ತಾ ಮಾಡುವುದು ಮತ್ತು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ PDF ವರದಿ ಕಳುಹಿಸುವುದು'
    },
    category: {
      en: 'Reports & Payouts',
      kn: 'ವರದಿ & ಲೆಕ್ಕ ಚುಕ್ತಾ'
    },
    duration: '2:15',
    icon: FileSpreadsheet
  },
  {
    id: 'backup',
    youtubeId: '',
    title: {
      en: 'Google Drive Cloud Backup & Safe Restore',
      kn: 'ಗೂಗಲ್ ಡ್ರೈವ್ ಬ್ಯಾಕಪ್ ಮತ್ತು ಹೊಸ ಫೋನ್‌ಗೆ ಬದಲಾವಣೆ'
    },
    category: {
      en: 'Backup & Data Safety',
      kn: 'ಬ್ಯಾಕಪ್ & ಸುರಕ್ಷತೆ'
    },
    duration: '1:50',
    icon: Cloud
  },
  {
    id: 'overview',
    youtubeId: '',
    title: {
      en: 'Labour Lekka App Overview & First Steps',
      kn: 'ಲೇಬರ್ ಲೆಕ್ಕ ಆ್ಯಪ್ ಪರಿಚಯ ಮತ್ತು ಪ್ರಾರಂಭಿಸುವ ವಿಧಾನ'
    },
    category: {
      en: 'Getting Started',
      kn: 'ಪ್ರಾರಂಭಿಕ ಮಾಹಿತಿ'
    },
    duration: '2:40',
    icon: Smartphone
  }
];

export default function VideoGuidesPage() {
  const [lang, setLang] = useState<'kn' | 'en'>('kn');
  const [activeVideoId, setActiveVideoId] = useState<string>(GUIDE_VIDEOS[0].id);

  // Parse deep-link query or hash: e.g. #guides?topic=advances&lang=kn
  useEffect(() => {
    const parseUrlParams = () => {
      const hash = window.location.hash;
      const queryIdx = hash.indexOf('?');
      if (queryIdx !== -1) {
        const queryStr = hash.slice(queryIdx + 1);
        const params = new URLSearchParams(queryStr);

        const topicParam = params.get('topic') || params.get('v');
        if (topicParam) {
          const matched = GUIDE_VIDEOS.find(
            (v) => v.id.toLowerCase() === topicParam.toLowerCase()
          );
          if (matched) {
            setActiveVideoId(matched.id);
          }
        }

        const langParam = params.get('lang');
        if (langParam === 'en' || langParam === 'kn') {
          setLang(langParam);
        }
      }
    };

    parseUrlParams();
    window.addEventListener('hashchange', parseUrlParams);
    return () => window.removeEventListener('hashchange', parseUrlParams);
  }, []);

  const activeVideo =
    GUIDE_VIDEOS.find((v) => v.id === activeVideoId) || GUIDE_VIDEOS[0];

  const handleSelectVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    // Update hash without triggering a full page reload
    window.history.replaceState(
      null,
      '',
      `#guides?topic=${videoId}&lang=${lang}`
    );
    // Smooth scroll to video player on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLang = (newLang: 'kn' | 'en') => {
    setLang(newLang);
    window.history.replaceState(
      null,
      '',
      `#guides?topic=${activeVideo.id}&lang=${newLang}`
    );
  };

  return (
    <div className="min-h-screen bg-[#FCF3E3] text-[#2B3E34] selection:bg-[#708C69]/20 selection:text-[#2B3E34] font-sans antialiased">
      {/* Minimal Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ced8b2]/70 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="#home"
              className="p-1.5 -ml-1 rounded-lg text-[#5E7757] hover:text-[#2B3E34] hover:bg-[#FCF3E3] transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div className="flex items-center gap-2">
              <img
                src="logo.png"
                alt="Labour Lekka"
                className="w-7 h-7 rounded-lg border border-[#ced8b2] object-contain"
              />
              <span className="font-bold text-base sm:text-lg tracking-tight text-[#2B3E34]">
                {lang === 'kn' ? 'ವಿಡಿಯೋ ಮಾರ್ಗದರ್ಶಿ' : 'Video Guides'}
              </span>
            </div>
          </div>

          {/* Simple Language Switcher */}
          <div className="flex items-center bg-[#FCF3E3] p-1 rounded-xl border border-[#ced8b2]">
            <button
              onClick={() => handleToggleLang('kn')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${lang === 'kn'
                  ? 'bg-[#2B3E34] text-white shadow-xs'
                  : 'text-[#5E7757] hover:text-[#2B3E34]'
                }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => handleToggleLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${lang === 'en'
                  ? 'bg-[#2B3E34] text-white shadow-xs'
                  : 'text-[#5E7757] hover:text-[#2B3E34]'
                }`}
            >
              English
            </button>
          </div>
        </div>
      </header>

      {/* Main Focus Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Active Video Player Section (Takes Primary Focus) */}
          <div className="lg:col-span-8 flex flex-col">
            {/* 16:9 Video Player Container */}
            <div className="w-full bg-black rounded-2xl overflow-hidden shadow-md border border-[#ced8b2] relative aspect-video">
              {activeVideo.youtubeId ? (
                <iframe
                  key={activeVideo.youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title[lang]}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                /* Clean Placeholder when YouTube ID is not yet configured */
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#2B3E34] text-[#FCF3E3] p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                    <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-white max-w-md">
                    {activeVideo.title[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#ced8b2] mt-2">
                    {lang === 'kn'
                      ? 'ವಿಡಿಯೋ ಶೀಘ್ರದಲ್ಲೇ ಲಭ್ಯವಾಗಲಿದೆ'
                      : 'Video tutorial coming soon'}
                  </p>
                </div>
              )}
            </div>

            {/* Video Meta Information */}
            <div className="mt-4 bg-white border border-[#ced8b2] rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#5E7757] mb-1.5">
                <span>{activeVideo.category[lang]}</span>
                <span>{activeVideo.duration} mins</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-extrabold text-[#2B3E34] leading-snug">
                {activeVideo.title[lang]}
              </h1>

              {/* Quick Actions Bar */}
              <div className="mt-4 pt-3.5 border-t border-[#ced8b2]/60 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs text-[#5E7757]">
                  {lang === 'kn'
                    ? 'ಲೇಬರ್ ಲೆಕ್ಕ ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶಿ'
                    : 'Labour Lekka Official Guide'}
                </span>

                {activeVideo.youtubeId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2B3E34] hover:text-[#708C69] transition-colors"
                  >
                    <span>
                      {lang === 'kn'
                        ? 'YouTube ನಲ್ಲಿ ನೋಡಿ'
                        : 'Watch on YouTube'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Video Playlist / Topic Selector */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-white border border-[#ced8b2] rounded-2xl p-3 sm:p-4 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#5E7757] px-2 py-1 mb-2">
                {lang === 'kn' ? 'ಎಲ್ಲಾ ವಿಡಿಯೋಗಳು' : 'All Tutorials'}
              </h2>

              <div className="space-y-1.5">
                {GUIDE_VIDEOS.map((video, idx) => {
                  const isActive = video.id === activeVideo.id;
                  const Icon = video.icon;

                  return (
                    <button
                      key={video.id}
                      onClick={() => handleSelectVideo(video.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${isActive
                          ? 'bg-[#2B3E34] text-white border-[#2B3E34] shadow-xs'
                          : 'bg-[#FCF3E3]/50 hover:bg-[#FCF3E3] text-[#2B3E34] border-transparent hover:border-[#ced8b2]'
                        }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-white text-[#5E7757] border border-[#ced8b2]'
                          }`}
                      >
                        {isActive ? (
                          <Play className="w-3.5 h-3.5 fill-white" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs font-semibold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-[#2B3E34]'
                            }`}
                        >
                          {idx + 1}. {video.title[lang]}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px]">
                          <span
                            className={
                              isActive ? 'text-white/70' : 'text-[#5E7757]'
                            }
                          >
                            {video.duration} min
                          </span>
                          {isActive && (
                            <span className="flex items-center gap-1 text-white/90 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-[#ced8b2]" />
                              {lang === 'kn' ? 'ಪ್ಲೇ ಆಗುತ್ತಿದೆ' : 'Playing'}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Need Help WhatsApp Support Link */}
              <div className="mt-4 pt-3 border-t border-[#ced8b2]/60 px-1">
                <a
                  href="https://wa.me/917624813242?text=Hello%20Labour%20Lekka%20Team%2C%20I%20need%20help%20with%20the%20app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-[#FCF3E3] hover:bg-[#ced8b2]/40 text-[#2B3E34] rounded-xl text-xs font-bold border border-[#ced8b2] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#708C69]" />
                  <span>
                    {lang === 'kn'
                      ? 'ಸಹಾಯ ಬೇಕೆ? ವಾಟ್ಸಾಪ್ ಮಾಡಿ'
                      : 'Need help? Chat on WhatsApp'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
