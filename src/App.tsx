import React, { useState, useEffect } from 'react';
import { CurrencyCode } from './types';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { TrustBadges } from './components/TrustBadges';
import { AboutSection } from './components/AboutSection';
import { BentoGallery } from './components/BentoGallery';
import { TripsSection } from './components/TripsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ExplorerMap } from './components/ExplorerMap';
import { InfoHub } from './components/InfoHub';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FloatingWidgets } from './components/FloatingWidgets';
import { BackgroundMusic } from './components/BackgroundMusic';
import { CinematicIntro } from './components/CinematicIntro';
import { detectVisitorLanguage } from './utils/whatsapp';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => detectVisitorLanguage());
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('EUR');
  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(false);

  const handleCloseIntro = () => {
    setIsIntroOpen(false);
    try {
      sessionStorage.setItem('egy_tours_intro_seen', 'true');
    } catch {
      // Storage unavailable
    }
  };

  const handleOpenIntro = () => {
    setIsIntroOpen(true);
  };

  // Currency exchange rates relative to 1 EUR
  const currencyRates: Record<CurrencyCode, { symbol: string; rate: number }> = {
    EUR: { symbol: '€', rate: 1.0 },
    USD: { symbol: '$', rate: 1.08 },
    GBP: { symbol: '£', rate: 0.85 },
    EGP: { symbol: 'EGP ', rate: 54.2 }
  };

  const convertPrice = (eurAmount: number) => {
    const meta = currencyRates[currentCurrency] || currencyRates.EUR;
    const converted = Math.round(eurAmount * meta.rate);
    const formatted = currentCurrency === 'EGP'
      ? `${converted.toLocaleString()} EGP`
      : `${meta.symbol}${converted.toLocaleString()}`;
    return {
      formatted,
      amount: converted,
      symbol: meta.symbol
    };
  };

  // Sync RTL / LTR document direction, page title, and persist preference when language changes
  useEffect(() => {
    document.title = 'EGY TOUR - Travel & Adventure Egypt';
    const langMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang);
    const dir = langMeta?.dir || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
    try {
      localStorage.setItem('egy_tours_lang', currentLang);
    } catch {
      // Storage unavailable
    }
  }, [currentLang]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#E8E8E8] selection:bg-[#D4AF37] selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenIntro={handleOpenIntro}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero currentLang={currentLang} onOpenIntro={handleOpenIntro} />

        {/* Stats Strip */}
        <Stats currentLang={currentLang} />

        {/* Trust Badges Strip */}
        <TrustBadges currentLang={currentLang} />

        {/* Why Choose Us */}
        <AboutSection currentLang={currentLang} />

        {/* Bento Gallery */}
        <BentoGallery currentLang={currentLang} />

        {/* Tour Packages & Excursions with Filters & Modal */}
        <TripsSection
          currentLang={currentLang}
          currency={currentCurrency}
          convertPrice={convertPrice}
        />

        {/* Guest Reviews & Trust Platforms */}
        <ReviewsSection currentLang={currentLang} />

        {/* Red Sea Explorer Interactive Map */}
        <ExplorerMap currentLang={currentLang} />

        {/* Essential Information Hub (Weather, Sea, Currency Converter) */}
        <InfoHub
          currentLang={currentLang}
          currentCurrency={currentCurrency}
          onCurrencyChange={setCurrentCurrency}
        />

        {/* Frequently Asked Questions */}
        <FaqSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Floating Action Buttons & Background Music */}
      <FloatingWhatsApp currentLang={currentLang} />
      <FloatingWidgets />
      <BackgroundMusic isIntroOpen={isIntroOpen} />

      {/* 4K Cinematic Intro Experience */}
      <CinematicIntro isOpen={isIntroOpen} onClose={handleCloseIntro} />
    </div>
  );
}
