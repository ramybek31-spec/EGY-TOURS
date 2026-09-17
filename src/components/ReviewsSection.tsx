import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp } from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviews';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface ReviewsSectionProps {
  currentLang: SupportedLanguage;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<'All' | 'TripAdvisor' | 'Google' | 'GetYourGuide'>('All');
  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  const filteredReviews = activePlatformFilter === 'All'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.platform === activePlatformFilter);

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#070707] border-t border-[#D4AF37]/15 relative overflow-hidden scroll-mt-16">
      <div id="reviews-section" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="section-title">{t('reviews_title')}</h2>
          <span className="gold-line" />
          <p className="section-subtitle">{t('reviews_sub')}</p>

          {/* Platform Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-[#121212] border border-white/10 shadow-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center font-bold text-red-500 text-xs flex-shrink-0">
                G
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Google Reviews</div>
                <div className="text-[0.65rem] sm:text-[0.7rem] text-[#FFD700] font-semibold">4.9 ★★★★★ (1,250+)</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-[#121212] border border-[#D4AF37]/30 shadow-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00aa6c] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                TA
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">TripAdvisor</div>
                <div className="text-[0.65rem] sm:text-[0.7rem] text-[#FFD700] font-semibold">4.9 ★ Travellers' Choice</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-[#121212] border border-white/10 shadow-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ff5533] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                GYG
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">GetYourGuide</div>
                <div className="text-[0.65rem] sm:text-[0.7rem] text-[#FFD700] font-semibold">5.0 ★ Top Rated Partner</div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex flex-wrap justify-center rounded-2xl sm:rounded-full bg-[#141414] p-1 border border-white/10 max-w-full gap-1">
            {(['All', 'TripAdvisor', 'Google', 'GetYourGuide'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setActivePlatformFilter(p)}
                className={`px-3 sm:px-3.5 py-1 text-[0.7rem] sm:text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  activePlatformFilter === p
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#121212] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/40 hover:-translate-y-1"
            >
              <div>
                {/* Header: Stars & Platform */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[0.65rem] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 uppercase font-semibold">
                    {rev.platform}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-zinc-200 italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Country */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9a761e] to-[#FFD700] text-black font-extrabold flex items-center justify-center text-xs shadow-md">
                    {rev.avatarText || rev.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{rev.author}</h3>
                    <p className="text-[0.7rem] text-zinc-400 flex items-center gap-1">
                      <span>{rev.flag}</span>
                      <span>{rev.country}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[0.68rem] text-zinc-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
