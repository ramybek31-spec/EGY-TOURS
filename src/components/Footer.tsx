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
    <footer id="footer" className="bg-[#050505] border-t border-[#D4AF37]/25 pt-16 pb-8 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
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
            <span
              className="text-[#D4AF37] font-bold cursor-pointer hover:text-white transition-colors"
              title="Phone: +201224278490 | +201107871007"
            >
              ROMERO'S STUDIOS
            </span>{' '}
            *
          </div>
        </div>
      </div>
    </footer>
  );
};
