import React from 'react';
import { ShieldCheck, RefreshCw, Car, Zap, CheckCircle2, Star } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface TrustBadgesProps {
  currentLang: SupportedLanguage;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ currentLang }) => {
  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  const badges = [
    { icon: ShieldCheck, text: t('trust_price') },
    { icon: RefreshCw, text: t('trust_cancel') },
    { icon: Car, text: t('trust_pickup') },
    { icon: Zap, text: t('trust_confirm') },
    { icon: CheckCircle2, text: t('trust_safety') },
    { icon: Star, text: t('trust_score') }
  ];

  return (
    <div className="py-6 bg-[#0a0a0a] border-b border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#D4AF37]/25 text-xs text-[#E8E8E8] font-medium hover:border-[#D4AF37] hover:text-[#FFD700] transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>{b.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
