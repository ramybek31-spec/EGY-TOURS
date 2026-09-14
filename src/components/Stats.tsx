import React from 'react';
import { Award, Users, Calendar, Star } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface StatsProps {
  currentLang: SupportedLanguage;
}

export const Stats: React.FC<StatsProps> = ({ currentLang }) => {
  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  const stats = [
    {
      value: '21+',
      label: t('stats_trips'),
      icon: Award,
      sub: 'Excursions & Safaris'
    },
    {
      value: '5,000+',
      label: t('stats_guests'),
      icon: Users,
      sub: 'Across 40+ Countries'
    },
    {
      value: '10+',
      label: t('stats_experience'),
      icon: Calendar,
      sub: 'In Red Sea Tourism'
    },
    {
      value: '5.0★',
      label: t('stats_rating'),
      icon: Star,
      sub: 'Top Rated on TripAdvisor'
    }
  ];

  return (
    <section id="stats" className="py-12 bg-[#0e0e0e] border-y border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-3 sm:p-4 rounded-xl bg-[#141414]/60 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col items-center justify-center group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-2 sm:mb-2.5 text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFD700] tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-[0.7rem] sm:text-xs md:text-sm font-semibold text-[#E8E8E8] uppercase tracking-wider mb-0.5 line-clamp-1">
                  {stat.label}
                </div>
                <div className="text-[0.65rem] sm:text-[0.72rem] text-zinc-500 line-clamp-1">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
