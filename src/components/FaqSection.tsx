import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface FaqSectionProps {
  currentLang: SupportedLanguage;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ '1': true });
  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-[#0a0a0a] border-t border-[#D4AF37]/15 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="section-title">{t('faq_title')}</h2>
          <span className="gold-line" />
          <p className="section-subtitle">{t('faq_sub')}</p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS_DATA.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-[#141414] border-[#D4AF37]/40 shadow-lg' : 'bg-[#101010] border-white/5 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`text-xs sm:text-base font-bold transition-colors ${isOpen ? 'text-[#FFD700]' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#141414] via-[#1a170c] to-[#141414] border border-[#D4AF37]/30 text-center">
          <h4 className="text-xs sm:text-sm font-bold text-white mb-1">Have a specific question or custom request?</h4>
          <p className="text-xs text-zinc-400 mb-4">Our multilingual operations team is online 24/7 on WhatsApp to help with bookings, group discounts, and custom private charters.</p>
          <a
            href="https://wa.me/201025221269?text=Hello%20EGY%20TOURS!%20I%20have%20a%20question%20about%20your%20excursions."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-xs py-2 px-6 inline-flex"
          >
            Chat with Tour Manager
          </a>
        </div>
      </div>
    </section>
  );
};
