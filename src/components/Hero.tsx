import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Compass,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Film,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  MapPin,
  Flame,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { HERO_SLIDES, HeroSlide } from '../data/heroSlides';
import { buildWhatsAppUrl, getTourInquiryMessage } from '../utils/whatsapp';

interface HeroProps {
  currentLang: SupportedLanguage;
  onOpenIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenIntro }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, number>>({});

  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;
  const currentSlide: HeroSlide = HERO_SLIDES[currentIndex];
  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Go to next slide
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  // Go to previous slide
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  // Select slide directly
  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Slideshow auto-advance timer with progress bar
  useEffect(() => {
    if (!isPlaying || isPausedByHover) return;

    const intervalStep = 50; // update progress every 50ms
    const stepIncrement = (intervalStep / SLIDE_DURATION) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(interval);
  }, [isPlaying, isPausedByHover, handleNext]);

  // Luxury golden & aqua particle animation
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

    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.35 ? '#D4AF37' : '#5ce1e6'
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

  // Determine image source with fallbacks for uploaded files
  const getImageSrc = (slide: HeroSlide) => {
    const attempts = imgErrorMap[slide.id] || 0;
    if (attempts === 0) {
      // Try direct filename at root or in public
      return `/${slide.fileName}`;
    } else if (attempts === 1) {
      // Try nested hero assets path
      return `/assets/images/hero/${slide.fileName}`;
    } else {
      // Graceful high-res CDN fallback matching the exact scene
      return slide.fallbackUrl;
    }
  };

  const handleImageError = (slideId: string) => {
    setImgErrorMap((prev) => ({
      ...prev,
      [slideId]: (prev[slideId] || 0) + 1
    }));
  };

  const whatsappBookingUrl = buildWhatsAppUrl(
    getTourInquiryMessage(currentLang, currentSlide.title)
  );

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#070707] text-center pt-24 pb-16 px-4 select-none"
      onMouseEnter={() => setIsPausedByHover(true)}
      onMouseLeave={() => setIsPausedByHover(false)}
    >
      {/* Background Slideshow Layer with Ken Burns Zoom and Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
            transition={{ duration: 7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={getImageSrc(currentSlide)}
              alt={currentSlide.title}
              onError={() => handleImageError(currentSlide.id)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.62] contrast-[1.08]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layered Luxury Vignettes for perfect text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/65 to-[#070707]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-[#070707]/80" />
        <div
          className="absolute inset-0 transition-opacity duration-1000 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${currentSlide.accentColor} 0%, transparent 65%)`
          }}
        />
        {/* Subtle Luxury Film Grain Scanlines */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035]" />
      </div>

      {/* Interactive Golden Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-1 pointer-events-none" />

      {/* Main Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full px-2 sm:px-4">
        {/* Top Badges: Category & Live Slide Counter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-5">
          {/* Slide Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/60 bg-black/60 backdrop-blur-md text-[#FFD700] text-[0.68rem] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{currentSlide.category}</span>
          </div>

          {/* Location Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-black/50 backdrop-blur-md text-zinc-300 text-[0.68rem] font-medium">
            <MapPin className="w-3 h-3 text-[#5ce1e6]" />
            <span>{currentSlide.location}</span>
          </div>

          {/* Slide Counter (01/11) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#0a0a0a]/70 text-[#D4AF37] text-[0.7rem] font-mono font-bold">
            <Layers className="w-3 h-3" />
            <span>
              {String(currentIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Dynamic Animated Slide Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <h1 className="font-heading text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.12] mb-3 sm:mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              {currentSlide.title.split(' ')[0]}{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#FFF4C2] bg-clip-text text-transparent italic drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                {currentSlide.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-200 max-w-2xl mx-auto font-normal leading-relaxed mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {currentSlide.subtitle}
            </p>

            {/* Featured Highlight Card */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-black/80 via-[#18150c]/90 to-black/80 border border-[#D4AF37]/50 shadow-[0_4px_20px_rgba(212,175,55,0.18)] mb-6 sm:mb-8 max-w-xl text-left">
              <div className="p-1.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex-shrink-0">
                <Flame className="w-4 h-4 text-[#FFD700]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.68rem] uppercase font-bold tracking-wider text-[#D4AF37]">
                  {currentSlide.badge} Highlight
                </span>
                <span className="text-xs sm:text-sm text-white font-medium">
                  {currentSlide.highlight}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Book this slide experience on WhatsApp */}
          <a
            href={whatsappBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full sm:w-auto shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(255,215,0,0.5)]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Book This Experience</span>
          </a>

          {/* Explore all trips */}
          <a
            href="#trips"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-full border border-white/25 bg-black/60 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all duration-300 backdrop-blur-md w-full sm:w-auto hover:border-white/50"
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('explore_trips')}</span>
          </a>

          {/* Watch Cinematic Intro */}
          {onOpenIntro && (
            <button
              type="button"
              onClick={onOpenIntro}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-full border border-[#D4AF37]/60 bg-black/60 hover:bg-[#D4AF37]/15 hover:border-[#FFD700] text-[#FFD700] hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] w-full sm:w-auto cursor-pointer group"
            >
              <Film className="w-4 h-4 text-[#FFD700] transition-transform group-hover:scale-110" />
              <span>Watch Intro</span>
            </button>
          )}
        </div>

        {/* Guarantees Ribbon */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[0.7rem] sm:text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
            <span>Best Price Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
            <span>Free Hotel Pickup Included</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
            <span>0% Advance Deposit Required</span>
          </div>
        </div>
      </div>

      {/* Interactive Slideshow Controls (Prev / Next Buttons) */}
      <div className="absolute inset-y-0 left-2 sm:left-4 z-20 flex items-center">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#D4AF37]/25 text-white/80 hover:text-[#FFD700] border border-white/20 hover:border-[#D4AF37] backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-2 sm:right-4 z-20 flex items-center">
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Slide"
          className="p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#D4AF37]/25 text-white/80 hover:text-[#FFD700] border border-white/20 hover:border-[#D4AF37] backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Slideshow Navigation Strip: Thumbnails, Progress & Play/Pause */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 flex flex-col items-center gap-2">
        {/* Progress Bar */}
        <div className="w-48 sm:w-64 h-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] transition-all duration-100 ease-linear shadow-[0_0_8px_#FFD700]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Thumbnail Dots & Play/Pause Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-xl overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="p-1 rounded-full text-[#D4AF37] hover:text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <div className="h-3 w-[1px] bg-white/20 mx-0.5" />

          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSelectSlide(idx)}
                aria-label={`Slide ${idx + 1}: ${slide.title}`}
                className={`relative transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'w-7 sm:w-8 h-4 sm:h-5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-extrabold text-[0.62rem] shadow-[0_0_10px_rgba(212,175,55,0.8)]'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/70'
                }`}
              >
                {isActive && <span>{idx + 1}</span>}
              </button>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <a
          href="#trips"
          className="hidden sm:flex items-center gap-1 text-[0.68rem] text-zinc-400 hover:text-[#D4AF37] transition-colors mt-0.5"
        >
          <span>Scroll down for packages</span>
          <ChevronDown className="w-3 h-3 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
