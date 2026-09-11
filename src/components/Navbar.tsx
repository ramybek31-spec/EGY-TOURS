import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, DollarSign, MessageCircle, Film } from 'lucide-react';
import { CurrencyCode } from '../types';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import egytoursLogo from '../assets/images/egytours_logo_1789090112855.jpg';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  onOpenIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  onOpenIntro
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currDropdownOpen, setCurrDropdownOpen] = useState(false);

  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies: CurrencyCode[] = ['EUR', 'USD', 'GBP', 'EGP'];

  const navLinks = [
    { label: t('nav_home'), href: '#hero' },
    { label: t('nav_trips'), href: '#trips' },
    { label: t('nav_gallery'), href: '#gallery' },
    { label: t('nav_reviews'), href: '#reviews' },
    { label: t('nav_map'), href: '#map-section' },
    { label: t('nav_info'), href: '#info-section' },
    { label: t('nav_faq'), href: '#faq' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#080808]/95 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-xl shadow-black/60'
            : 'py-4 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-[#D4AF37]/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group text-decoration-none">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] p-0.5 bg-[#141414] shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:border-[#FFD700]">
              <img
                src={egytoursLogo}
                alt="EGY TOURS Logo"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E8E8E8] bg-clip-text text-transparent tracking-wider leading-tight">
                EGY TOURS
              </span>
              <span className="text-[0.6rem] text-[#C0C0C0] tracking-[0.18em] uppercase font-semibold">
                TRAVEL & ADVENTURE • EGYPT
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#E8E8E8] hover:text-[#FFD700] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Currency, Language, WhatsApp CTA, Mobile Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrDropdownOpen(!currDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#161616] border border-[#D4AF37]/30 text-xs font-semibold text-[#FFD700] hover:border-[#D4AF37] transition-all cursor-pointer"
                title="Select Currency"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currentCurrency}</span>
              </button>

              {currDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#111111] border border-[#D4AF37]/40 rounded-xl shadow-2xl py-1.5 z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => {
                        onCurrencyChange(curr);
                        setCurrDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#D4AF37]/15 transition-colors ${
                        currentCurrency === curr ? 'text-[#FFD700] font-bold bg-[#D4AF37]/10' : 'text-[#E8E8E8]'
                      }`}
                    >
                      <span>{curr}</span>
                      {currentCurrency === curr && <span className="text-[#FFD700]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#161616] border border-[#D4AF37]/30 text-xs font-medium text-[#E8E8E8] hover:border-[#D4AF37] transition-all cursor-pointer"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="uppercase">{currentLang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#111111] border border-[#D4AF37]/40 rounded-xl shadow-2xl py-1.5 z-50 max-h-60 overflow-y-auto">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#D4AF37]/15 transition-colors ${
                        currentLang === lang.code ? 'text-[#FFD700] font-bold bg-[#D4AF37]/10' : 'text-[#E8E8E8]'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cinematic Intro Button */}
            {onOpenIntro && (
              <button
                type="button"
                onClick={onOpenIntro}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161616] border border-[#D4AF37]/50 text-xs font-semibold text-[#FFD700] hover:bg-[#D4AF37]/15 hover:border-[#FFD700] transition-all cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                title="Experience 4K Cinematic Intro"
              >
                <Film className="w-3.5 h-3.5 text-[#FFD700]" />
                <span className="hidden md:inline">Cinematic</span>
                <span>Intro</span>
              </button>
            )}

            {/* WhatsApp CTA (Desktop) */}
            <a
              href="https://wa.me/201107871007?text=Hello%20EGY%20TOURS!%20I%20would%20like%20to%20inquire%20about%20your%20trips."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2ae06f] hover:to-[#179e8e] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-emerald-950/40 transition-transform duration-200 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#161616] border border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37] transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-16 left-0 right-0 bg-[#0c0c0c]/98 border-b-2 border-[#D4AF37] backdrop-blur-2xl z-40 lg:hidden transition-all duration-300 transform ${
          mobileMenuOpen ? 'translate-y-0 opacity-100 shadow-2xl' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-md mx-auto p-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-base font-semibold text-[#E8E8E8] hover:text-[#FFD700] hover:bg-[#D4AF37]/10 transition-all border-b border-white/5"
            >
              {link.label}
            </a>
          ))}

          {/* Quick Contact & WhatsApp Callout */}
          <div className="mt-4 pt-4 border-t border-[#D4AF37]/25 flex flex-col gap-3">
            {onOpenIntro && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenIntro();
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#FFD700]/15 to-transparent border border-[#D4AF37]/50 text-[#FFD700] text-sm font-bold shadow-md hover:bg-[#D4AF37]/25 transition-all"
              >
                <Film className="w-4 h-4 text-[#FFD700]" />
                <span>Watch 4K Cinematic Intro</span>
              </button>
            )}

            <a
              href="https://wa.me/201107871007?text=Hello%20EGY%20TOURS!%20I%20would%20like%20to%20inquire%20about%20your%20trips."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-teal-900/40 border border-[#25D366]/50 shadow-lg text-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Chat on WhatsApp</span>
                    <span className="text-[0.65rem] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider">
                      Online
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400">+20 1107871007 (Instant Reply)</div>
                </div>
              </div>
              <span className="text-emerald-400 font-bold text-lg">→</span>
            </a>

            <a
              href="tel:+201107871007"
              className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Direct Call: +20 1107871007</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
