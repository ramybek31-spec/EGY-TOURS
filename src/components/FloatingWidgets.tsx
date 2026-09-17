import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const FloatingWidgets: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showBackToTop) return null;

  return (
    <button
      type="button"
      id="back-to-top-button"
      onClick={scrollToTop}
      className="fixed bottom-6 sm:bottom-8 right-20 sm:right-28 [dir='rtl']:right-auto [dir='rtl']:left-20 sm:[dir='rtl']:left-28 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141414]/90 border border-[#D4AF37]/40 text-[#FFD700] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xl hover:scale-105"
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
};

