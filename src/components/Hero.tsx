import React, { useEffect, useRef } from 'react';
import { Compass, MessageCircle, ChevronDown, Sparkles, Film } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface HeroProps {
  currentLang: SupportedLanguage;
  onOpenIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenIntro }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  // Subtle luxury golden & aqua particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.3 ? '#D4AF37' : '#5ce1e6'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070707] text-center pt-24 pb-16 px-4">
      {/* Background Image Layer with Luxury Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85"
          alt="Red Sea Hurghada Coral Reef & Turquoise Waters"
          className="w-full h-full object-cover opacity-25 scale-105 transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Interactive Golden Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-1 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/60 bg-[#161616]/80 text-[#FFD700] text-xs font-bold tracking-[0.22em] uppercase mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{t('hero_badge')}</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
          Experience the{' '}
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E8E8E8] bg-clip-text text-transparent italic">
            Magic
          </span>{' '}
          of the Red Sea
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-[#C0C0C0] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          {t('hero_sub')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <a
            href="#trips"
            className="btn-gold w-full sm:w-auto"
          >
            <Compass className="w-5 h-5" />
            <span>{t('explore_trips')}</span>
          </a>

          {onOpenIntro && (
            <button
              type="button"
              onClick={onOpenIntro}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-[#D4AF37]/60 bg-black/60 hover:bg-[#D4AF37]/15 hover:border-[#FFD700] text-[#FFD700] hover:text-white font-semibold text-sm transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] w-full sm:w-auto cursor-pointer group"
            >
              <Film className="w-4 h-4 text-[#FFD700] transition-transform group-hover:scale-110" />
              <span>Watch Cinematic Intro</span>
            </button>
          )}

          <a
            href="https://wa.me/201107871007?text=Hello%20EGY%20TOURS!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20tour."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
            <span>{t('book_whatsapp')}</span>
          </a>
        </div>

        {/* Highlight Guarantees */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>Best Price Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>Free Hotel Pickup Included</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>No Deposit Required</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Mouse Indicator */}
      <a
        href="#stats"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#D4AF37]/80 hover:text-[#FFD700] transition-colors"
        aria-label="Scroll to content"
      >
        <div className="w-5 h-8 rounded-full border border-[#D4AF37]/50 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
        </div>
        <ChevronDown className="w-4 h-4 animate-pulse" />
      </a>
    </section>
  );
};
