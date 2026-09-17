import React from 'react';
import { Check, ShieldCheck, HeartHandshake, Sparkles, MessageCircle } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface AboutSectionProps {
  currentLang: SupportedLanguage;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  const features = [
    { title: 'Licensed & Certified Guides', desc: 'PADI divemasters, marine naturalists, and certified Egyptologists.' },
    { title: '5-Star Fleet & Safety Standards', desc: 'Modern twin-engine motor yachts equipped with top-tier safety, first aid & GPS.' },
    { title: 'Free Hotel Pickup & Drop-Off', desc: 'Comfortable air-conditioned vans direct from any hotel lobby in Hurghada.' },
    { title: 'Direct Operator Prices', desc: 'Save up to 40% compared to hotel lobby desk rates and middleman brokers.' },
    { title: 'Free 24h Cancellation', desc: 'Change or cancel your booking with zero penalty up to 24 hours prior.' },
    { title: 'Instant WhatsApp Booking', desc: 'Fast, friendly multilingual confirmation with zero upfront payment.' }
  ];

  return (
    <section id="about-strip" className="py-14 sm:py-20 bg-gradient-to-b from-[#0a0a0a] via-[#101010] to-[#0a0a0a] border-b border-[#D4AF37]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Text & Features */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hurghada's #1 Rated Operator</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Why Choose <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">EGY TOURS</span>?
            </h2>

            <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded mb-5" />

            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
              {t('why_choose_desc')}
            </p>

            {/* Features 2-column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#141414] border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#FFD700] flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">{feat.title}</h4>
                    <p className="text-xs text-zinc-400 leading-normal">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4">
              <a
                href="#trips"
                className="btn-gold text-xs justify-center"
              >
                <span>Browse All Tours</span>
                <span>→</span>
              </a>

              <a
                href="https://wa.me/201025221269?text=Hello%20EGY%20TOURS!%20I%20have%20a%20question%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-zinc-300 hover:text-white hover:border-[#25D366] text-xs font-semibold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat With Our Team</span>
              </a>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl shadow-black/80 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury yacht cruising the turquoise waters of Hurghada"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[0.65rem] sm:text-xs text-[#FFD700] uppercase font-bold tracking-wider truncate">Red Sea Perfection</div>
                  <div className="text-xs sm:text-sm font-semibold text-white truncate">Daily VIP Departures from Hurghada Marina</div>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#FFD700] flex-shrink-0">
                  <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-2xl pointer-events-none -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-2xl pointer-events-none -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
