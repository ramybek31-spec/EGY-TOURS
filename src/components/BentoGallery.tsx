import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ZoomIn,
  Compass,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { buildWhatsAppUrl, getWhatsAppAutoUrl, getTourInquiryMessage } from '../utils/whatsapp';

interface BentoGalleryProps {
  currentLang: SupportedLanguage;
}

type GalleryCategory = 'all' | 'sea' | 'adventure' | 'heritage';

interface GalleryItem {
  id: string;
  tag: string;
  category: 'sea' | 'adventure' | 'heritage';
  title: string;
  location: string;
  description: string;
  src: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    tag: 'Red Sea',
    category: 'sea',
    title: 'Nefertari Glass Submarine',
    location: 'Hurghada Marina',
    description: 'Immerse into deep coral kingdoms and vibrant marine life through panoramic underwater viewing windows.',
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '2',
    tag: 'Sun & Sea',
    category: 'sea',
    title: 'Orange Bay Beach Lagoon',
    location: 'Giftun Island',
    description: 'Bask on powdery white sands, wade into crystal-clear turquoise shallows, and unwind in wooden swing bars.',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '3',
    tag: 'Pharaonic Heritage',
    category: 'heritage',
    title: 'Great Pyramids of Giza & Sphinx',
    location: 'Giza, Cairo',
    description: 'Stand in awe before 4,500-year-old architectural marvels of the Pharaohs on a seamless private day trip.',
    src: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '4',
    tag: 'Desert Trek',
    category: 'adventure',
    title: 'Saharan Camel Trek & Bedouin Camp',
    location: 'Eastern Desert',
    description: 'Ride across shifting golden sand dunes and savor authentic Bedouin herbal tea around twilight campfires.',
    src: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '5',
    tag: 'Coral Diving',
    category: 'sea',
    title: 'The Deep Blue Coral Diving',
    location: 'Hurghada Outer Reefs',
    description: 'Explore world-renowned pinnacles and coral walls accompanied by certified PADI dive masters.',
    src: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '6',
    tag: 'Marine Wildlife',
    category: 'sea',
    title: 'Dolphin House Wild Pods',
    location: 'Shaab El Erg Reef',
    description: 'Swim alongside playful wild spinner dolphins in their protected natural crystal lagoon habitat.',
    src: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '7',
    tag: 'Ancient Thebes',
    category: 'heritage',
    title: 'Karnak Temple Pillars & Kings Valley',
    location: 'Luxor, Upper Egypt',
    description: 'Walk through monumental hypostyle halls with royal hieroglyphs and centuries of royal pharaonic legacy.',
    src: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '8',
    tag: 'Quad Safari',
    category: 'adventure',
    title: 'Super Safari Quad Desert Trek',
    location: 'Hurghada Desert Valley',
    description: 'Conquer the rugged desert trails on high-powered ATVs, spider buggies, and watch the desert sunset.',
    src: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '9',
    tag: 'Coastal Sunset',
    category: 'adventure',
    title: 'Sunset Beach & Desert Horse Riding',
    location: 'Makadi Bay Coast',
    description: 'Gallop along the gentle tide line as the Red Sea sunset paints the sky in shades of amber and rose.',
    src: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '10',
    tag: 'Sun & Sands',
    category: 'sea',
    title: 'Paradise Island Sands & Sunbeds',
    location: 'Giftun Island Marine Reserve',
    description: 'Exclusive beachside sun loungers, open-air dining, and serene reef snorkeling right off the shore.',
    src: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '11',
    tag: 'Sea Life',
    category: 'sea',
    title: 'Red Sea Marine Life & Green Turtles',
    location: 'Abu Dabbab Lagoon',
    description: 'Encounter gentle giant green sea turtles and sea cows gliding serenely through warm seagrass meadows.',
    src: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '12',
    tag: 'Mountain Vista',
    category: 'adventure',
    title: 'Golden Hour Desert Vista & Stargazing',
    location: 'Red Sea Mountain Range',
    description: 'Stargaze under crisp desert constellations after an awe-inspiring sunset panoramic overlook.',
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80'
  }
];

const CATEGORIES: { id: GalleryCategory; label: Record<SupportedLanguage, string> }[] = [
  {
    id: 'all',
    label: {
      en: 'All Highlights',
      ar: 'جميع اللحظات',
      ru: 'Все фото',
      de: 'Alle Highlights',
      fr: 'Tous les moments',
      pl: 'Wszystkie',
      it: 'Tutti i momenti',
      es: 'Todos los momentos'
    }
  },
  {
    id: 'sea',
    label: {
      en: 'Red Sea & Marine',
      ar: 'البحر الأحمر والشعب',
      ru: 'Красное море',
      de: 'Rotes Meer & Riffe',
      fr: 'Mer Rouge & Récifs',
      pl: 'Morze Czerwone',
      it: 'Mar Rosso e Barriere',
      es: 'Mar Rojo y Arrecifes'
    }
  },
  {
    id: 'adventure',
    label: {
      en: 'Desert & Safari',
      ar: 'الصحراء والسفاري',
      ru: 'Сафари и пустыня',
      de: 'Wüste & Safari',
      fr: 'Désert & Safari',
      pl: 'Pustynia i Safari',
      it: 'Deserto e Safari',
      es: 'Desierto y Safari'
    }
  },
  {
    id: 'heritage',
    label: {
      en: 'Cairo & Luxor Heritage',
      ar: 'آثار القاهرة والأقصر',
      ru: 'Каир и Луксор',
      de: 'Kairo & Luxor',
      fr: 'Le Caire & Louxor',
      pl: 'Kair i Luksor',
      it: 'Il Cairo e Luxor',
      es: 'El Cairo y Lúxor'
    }
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.94,
    filter: 'blur(3px)'
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.45 },
      filter: { duration: 0.25 }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.94,
    filter: 'blur(3px)',
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.3 }
    }
  })
};

const AUTO_PLAY_INTERVAL = 5000;

export const BentoGallery: React.FC<BentoGalleryProps> = ({ currentLang }) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryItem | null>(null);

  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  // Filter gallery items by category
  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Safety check to ensure currentIndex is in bounds
  const safeIndex = currentIndex >= filteredItems.length ? 0 : currentIndex;
  const currentItem = filteredItems[safeIndex] || GALLERY_ITEMS[0];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  const handleSelectSlide = (index: number) => {
    setDirection(index > safeIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleCategoryChange = (cat: GalleryCategory) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setDirection(1);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlayEnabled || isHovered || filteredItems.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isAutoPlayEnabled, isHovered, filteredItems.length, handleNext, currentIndex]);

  // Center active thumbnail in filmstrip (container-only, never scrolls the window)
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[safeIndex];
    const container = thumbnailContainerRef.current;
    if (activeThumb && container) {
      const containerWidth = container.clientWidth;
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      const targetScrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      });
    }
  }, [safeIndex]);

  // Keyboard navigation for active carousel and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxImage) {
        if (e.key === 'ArrowRight') {
          const idx = filteredItems.findIndex((it) => it.id === activeLightboxImage.id);
          if (idx !== -1) {
            const nextIdx = (idx + 1) % filteredItems.length;
            setActiveLightboxImage(filteredItems[nextIdx]);
          }
        } else if (e.key === 'ArrowLeft') {
          const idx = filteredItems.findIndex((it) => it.id === activeLightboxImage.id);
          if (idx !== -1) {
            const prevIdx = (idx - 1 + filteredItems.length) % filteredItems.length;
            setActiveLightboxImage(filteredItems[prevIdx]);
          }
        } else if (e.key === 'Escape') {
          setActiveLightboxImage(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxImage, filteredItems]);

  const isRtl = currentLang === 'ar';

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-[#070707] relative scroll-mt-16 overflow-hidden">
      <div id="gallery-section" className="absolute -top-24 pointer-events-none" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/15 via-black to-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#FFD700] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>VIP Photo Showcase</span>
          </div>
          <h2 className="section-title">Capture the Moments</h2>
          <span className="gold-line" />
          <p className="section-subtitle mb-6">
            From glowing coral reefs to dramatic desert horizons, immerse yourself in the beauty of Hurghada.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const label = cat.label[currentLang] || cat.label.en;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  type="button"
                  className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer select-none whitespace-nowrap ${
                    isActive
                      ? 'text-black shadow-lg shadow-[#D4AF37]/20 font-extrabold'
                      : 'text-zinc-300 bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="gallery-active-category"
                      className="absolute inset-0 bg-gradient-to-r from-[#9a761e] via-[#D4AF37] to-[#FFD700] rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Showcase Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Stage Card */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-[#D4AF37]/30 shadow-2xl shadow-black/80">
            {/* Auto-play Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
              <motion.div
                key={`${currentItem.id}-${safeIndex}-${isAutoPlayEnabled && !isHovered}`}
                initial={{ width: '0%' }}
                animate={{ width: isAutoPlayEnabled && !isHovered ? '100%' : '0%' }}
                transition={{
                  duration: isAutoPlayEnabled && !isHovered ? AUTO_PLAY_INTERVAL / 1000 : 0,
                  ease: 'linear'
                }}
                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#f3d874] origin-left"
              />
            </div>

            {/* Slide AnimatePresence with Drag Support */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentItem.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    handleNext();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrev();
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
              >
                {/* Image with subtle Ken-Burns zoom on entry */}
                <motion.img
                  src={currentItem.src}
                  alt={currentItem.title}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 7, ease: 'easeOut' }}
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Dark Vignette Overlay for Crisp Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

                {/* Floating Top Badges */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-auto z-20">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/50 text-[#FFD700] text-xs font-bold uppercase tracking-wider shadow-md">
                      {currentItem.tag}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-zinc-300 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{currentItem.location}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Zoom / Lightbox Trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveLightboxImage(currentItem);
                      }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#FFD700] transition-all flex items-center justify-center cursor-pointer shadow-lg hover:scale-105"
                      aria-label="View Fullscreen"
                      title="View Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Slide Caption & Interaction Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10 pointer-events-auto z-20">
                  <div className="max-w-2xl">
                    <div className="sm:hidden flex items-center gap-1.5 text-zinc-400 text-xs mb-1 font-medium">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{currentItem.location}</span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight drop-shadow-md mb-2">
                      {currentItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-zinc-300 line-clamp-2 sm:line-clamp-3 mb-4 leading-relaxed font-light drop-shadow">
                      {currentItem.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                      <a
                        href={buildWhatsAppUrl(getTourInquiryMessage(currentLang, currentItem.title))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2ae06f] hover:to-[#179e8e] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/40 transition-transform hover:scale-105"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{t('book_whatsapp')}</span>
                      </a>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLightboxImage(currentItem);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur-md transition-all"
                      >
                        <ZoomIn className="w-4 h-4 text-[#FFD700]" />
                        <span>High-Res Photo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left Chevron Navigation */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-5 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#FFD700] flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Chevron Navigation */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-5 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#FFD700] flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Carousel Control Strip (Play/Pause, Counter, Dots) */}
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-3">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={() => setIsAutoPlayEnabled((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 hover:border-[#D4AF37]/50 text-zinc-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                title={isAutoPlayEnabled ? 'Pause auto-play' : 'Resume auto-play'}
              >
                {isAutoPlayEnabled ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span className="hidden sm:inline">Auto-Play</span>
                  </>
                )}
              </button>

              <span className="text-xs text-zinc-400 font-medium">
                {safeIndex + 1} / {filteredItems.length}
              </span>
            </div>

            {/* Progress Dots Indicator */}
            <div className="flex items-center gap-1.5">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === safeIndex
                      ? 'w-6 bg-gradient-to-r from-[#D4AF37] to-[#FFD700]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Filmstrip Thumbnail Track */}
          <div className="mt-5 sm:mt-6">
            <div
              ref={thumbnailContainerRef}
              className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredItems.map((item, index) => {
                const isSelected = index === safeIndex;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      thumbnailRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => handleSelectSlide(index)}
                    className={`relative flex-shrink-0 w-28 sm:w-36 h-18 sm:h-22 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 snap-center select-none ${
                      isSelected
                        ? 'ring-2 ring-[#FFD700] ring-offset-2 ring-offset-black scale-105 shadow-lg shadow-[#D4AF37]/30'
                        : 'opacity-50 hover:opacity-90 border border-white/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2 text-left">
                      <span className="text-[0.65rem] font-bold text-white truncate leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[0.55rem] text-[#FFD700] font-semibold uppercase">
                        {item.tag}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gallery Bottom CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12 w-full sm:w-auto">
          <a href="#trips" className="btn-gold w-full sm:w-auto justify-center">
            <Compass className="w-4 h-4" />
            <span>{t('explore_trips')}</span>
          </a>
          <a
            href={getWhatsAppAutoUrl(currentLang, 'gallery')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('book_whatsapp')}</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#161616] border border-[#D4AF37] text-[#FFD700] hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center cursor-pointer z-50 shadow-xl"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Modal Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] flex flex-col items-center w-full px-2"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl max-h-[75vh]">
                <img
                  src={activeLightboxImage.src}
                  alt={activeLightboxImage.title}
                  className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-2xl"
                />
              </div>

              {/* Lightbox Caption Bar */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl gap-3 text-center sm:text-left px-2">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-black text-[0.7rem] font-bold uppercase">
                      {activeLightboxImage.tag}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      {activeLightboxImage.location}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg sm:text-xl font-bold text-white">
                    {activeLightboxImage.title}
                  </h4>
                </div>

                <a
                  href={buildWhatsAppUrl(getTourInquiryMessage(currentLang, activeLightboxImage.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-md transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire for this Tour</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
