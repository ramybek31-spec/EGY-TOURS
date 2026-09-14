import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import egytoursLogo from '../assets/images/egytours_logo_1789090112855.jpg';

interface FooterProps {
  currentLang: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  return (
    <footer id="footer" className="bg-[#050505] border-t border-[#D4AF37]/25 pt-12 sm:pt-16 pb-8 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Col 1: Brand & Bio */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] p-0.5 bg-[#141414] shadow-[0_0_12px_rgba(212,175,55,0.3)] flex items-center justify-center overflow-hidden">
                <img
                  src={egytoursLogo}
                  alt="EGY TOURS Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-heading text-lg font-bold bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-white bg-clip-text text-transparent block">
                  EGY TOURS
                </span>
                <span className="text-[0.55rem] text-[#C0C0C0] tracking-[0.18em] uppercase font-semibold">
                  TRAVEL & ADVENTURE • EGYPT
                </span>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6">
              Egypt's premier tour and adventure operator. High safety standards, certified local guides, and unforgettable excursions across the Red Sea, Giza pyramids, and Sahara desert.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/201107871007"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#161616] border border-white/10 hover:border-[#25D366] hover:text-[#25D366] flex items-center justify-center text-zinc-300 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/egytours.official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#161616] border border-white/10 hover:border-[#D4AF37] hover:text-[#FFD700] flex items-center justify-center text-zinc-300 transition-colors"
                aria-label="Instagram"
              >
                <span className="font-bold text-xs">IG</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61583713821419"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#161616] border border-white/10 hover:border-[#D4AF37] hover:text-[#FFD700] flex items-center justify-center text-zinc-300 transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-xs">FB</span>
              </a>
              <a
                href="https://www.tiktok.com/@egytours.official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#161616] border border-white/10 hover:border-[#D4AF37] hover:text-[#FFD700] flex items-center justify-center text-zinc-300 transition-colors"
                aria-label="TikTok"
              >
                <span className="font-bold text-xs">TT</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-[#FFD700] uppercase tracking-wider mb-4">
              {t('quick_links')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-[#FFD700] transition-colors">
                  {t('nav_home')}
                </a>
              </li>
              <li>
                <a href="#trips" className="hover:text-[#FFD700] transition-colors">
                  {t('nav_trips')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#FFD700] transition-colors">
                  {t('nav_gallery')}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FFD700] transition-colors">
                  {t('nav_reviews')}
                </a>
              </li>
              <li>
                <a href="#map-section" className="hover:text-[#FFD700] transition-colors">
                  {t('nav_map')}
                </a>
              </li>
              <li>
                <a href="#info-section" className="hover:text-[#FFD700] transition-colors">
                  {t('nav_info')}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FFD700] transition-colors">
                  {t('nav_faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Top Trips */}
          <div>
            <h4 className="font-heading text-sm font-bold text-[#FFD700] uppercase tracking-wider mb-4">
              {t('top_trips')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#trips" className="hover:text-[#FFD700] transition-colors">
                  Orange Bay Island Excursion
                </a>
              </li>
              <li>
                <a href="#trips" className="hover:text-[#FFD700] transition-colors">
                  Dolphin House Eco Adventure
                </a>
              </li>
              <li>
                <a href="#trips" className="hover:text-[#FFD700] transition-colors">
                  Super Safari Saharan Quad Trek
                </a>
              </li>
              <li>
                <a href="#trips" className="hover:text-[#FFD700] transition-colors">
                  Paradise Island (Egyptian Maldives)
                </a>
              </li>
              <li>
                <a href="#trips" className="hover:text-[#FFD700] transition-colors">
                  Red Sea Discovery Scuba Dive
                </a>
              </li>
              <li>
                <a href="#trips" className="hover:text-[#FFD700] transition-colors">
                  Luxor Kings & Temples Day Tour
                </a>
              </li>
              <li>
                <a href="#trips" className="hover:text-[#FFD700] transition-colors">
                  Giza Pyramids & Cairo Discovery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="font-heading text-sm font-bold text-[#FFD700] uppercase tracking-wider mb-4">
              {t('contact_us')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[0.68rem] text-zinc-500">24/7 Phone & WhatsApp</div>
                  <a href="tel:+201107871007" className="text-white hover:text-[#FFD700] font-semibold">
                    +20 1107871007
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[0.68rem] text-zinc-500">Official Inquiries</div>
                  <a href="mailto:info@egytours.com" className="text-white hover:text-[#FFD700] block">
                    info@egytours.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[0.68rem] text-zinc-500">Headquarters</div>
                  <span className="text-zinc-300">Hurghada & Cairo, Egypt</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Designer Credit */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-zinc-500 text-[0.75rem]">
            &copy; {new Date().getFullYear()} <span className="text-[#FFD700] font-bold">EGY TOURS</span>. All rights reserved. | Egypt
          </p>

          <div className="text-[0.7rem] text-zinc-400">
            * DESIGNED BY{' '}
            <span className="relative group inline-block">
              <span
                id="romero-studios-credit"
                className="text-[#D4AF37] font-bold cursor-pointer hover:text-white transition-colors underline decoration-[#D4AF37]/40 hover:decoration-white underline-offset-2"
                title="Phone: +201224278490 | +201107871007"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label="ROMERO'S STUDIOS - View contact phone numbers"
              >
                ROMERO'S STUDIOS
              </span>

              {/* Hover Tooltip displaying phone numbers */}
              <div
                id="romero-studios-phone-tooltip"
                role="tooltip"
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-64 p-3 rounded-xl bg-[#0a1814]/98 dark:bg-[#061410]/98 backdrop-blur-xl border border-[#D4AF37] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.3)] text-white text-left opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible translate-y-1.5 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-200 ease-out z-50 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto select-none"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/30">
                  <span className="text-[0.68rem] font-bold tracking-wider uppercase text-[#FFD700]">
                    ROMERO'S STUDIOS
                  </span>
                  <span className="text-[0.62rem] text-zinc-400 font-medium">Direct Contact</span>
                </div>

                <div className="space-y-1.5">
                  <a
                    href="tel:+201224278490"
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-black/50 hover:bg-[#D4AF37]/15 border border-white/10 hover:border-[#D4AF37]/60 text-zinc-200 hover:text-[#FFD700] transition-colors group/item"
                  >
                    <div className="p-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] group-hover/item:text-[#FFD700]">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.62rem] text-zinc-400">Phone & WhatsApp</span>
                      <span className="text-xs font-mono font-bold tracking-wide text-white group-hover/item:text-[#FFD700]">
                        +20 122 427 8490
                      </span>
                    </div>
                  </a>

                  <a
                    href="tel:+201107871007"
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-black/50 hover:bg-[#D4AF37]/15 border border-white/10 hover:border-[#D4AF37]/60 text-zinc-200 hover:text-[#FFD700] transition-colors group/item"
                  >
                    <div className="p-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] group-hover/item:text-[#FFD700]">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.62rem] text-zinc-400">Phone & WhatsApp</span>
                      <span className="text-xs font-mono font-bold tracking-wide text-white group-hover/item:text-[#FFD700]">
                        +20 110 787 1007
                      </span>
                    </div>
                  </a>
                </div>

                {/* Downward pointer arrow */}
                <div
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 w-3 h-3 bg-[#0a1814] dark:bg-[#061410] border-r border-b border-[#D4AF37] transform rotate-45 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </span>{' '}
            *
          </div>
        </div>
      </div>
    </footer>
  );
};
