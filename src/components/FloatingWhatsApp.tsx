import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  QrCode,
  Smartphone,
  X,
  CalendarCheck,
  Zap,
  Headphones,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import QRCode from 'qrcode';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const WHATSAPP_URL =
  'https://wa.me/201107871007?text=Hello%20EGY%20TOURS!%20I%20would%20like%20to%20inquire%20about%20your%20tours.';

const ICON_SEQUENCE = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'Chat on WhatsApp',
    badgeText: 'Need help?',
    sublabel: 'Online 24/7'
  },
  {
    id: 'quickbook',
    icon: CalendarCheck,
    label: 'Quick Book Tour',
    badgeText: 'Quick Book',
    sublabel: 'Instant Confirmation'
  },
  {
    id: 'instant',
    icon: Zap,
    label: '1-Min WhatsApp Booking',
    badgeText: 'Fast Reply',
    sublabel: '0% Deposit Required'
  },
  {
    id: 'concierge',
    icon: Headphones,
    label: 'Tour Concierge',
    badgeText: 'Need help?',
    sublabel: 'Hurghada Red Sea'
  }
];

export const FloatingWhatsApp: React.FC = () => {
  const [isAutoExpanded, setIsAutoExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const [isQrDismissed, setIsQrDismissed] = useState(false);
  const [isQrEntering, setIsQrEntering] = useState(true);
  const [isNeedHelpReady, setIsNeedHelpReady] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [iconSeqIndex, setIconSeqIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isScrollIndicatorHovered, setIsScrollIndicatorHovered] = useState(false);
  const [isQuickBookTooltipOpen, setIsQuickBookTooltipOpen] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const autoExpandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastSoundTimeRef = useRef<number>(0);
  const hasTriggeredAutoExpandRef = useRef<boolean>(false);
  const scrollListenerCleanupRef = useRef<(() => void) | null>(null);

  const activeSeq = ICON_SEQUENCE[iconSeqIndex];

  // Animate Icon Sequence continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setIconSeqIndex((prev) => (prev + 1) % ICON_SEQUENCE.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Pre-generate high-res QR code data URL once on mount
  useEffect(() => {
    QRCode.toDataURL(WHATSAPP_URL, {
      width: 144,
      margin: 1,
      color: {
        dark: '#032c24', // Deep emerald Egyptian ink
        light: '#ffffff'  // Pure crisp white backdrop
      },
      errorCorrectionLevel: 'M'
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.warn('QR Code generation skipped:', err));
  }, []);

  // Show "Need help?" label after initial button entrance completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNeedHelpReady(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Synthesize a subtle, elegant high-fidelity chime using Web Audio API
  const playHoverSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      // Debounce slightly to prevent audio stuttering on rapid mouse movements
      if (now - lastSoundTimeRef.current < 0.22) return;
      lastSoundTimeRef.current = now;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Gentle warm harmonic chime: E5 (659.25Hz) glides slightly toward A5 (880Hz)
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      // Delicate overtone
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1318.5, now);
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, now);

      // Subtle, non-intrusive volume envelope (peak 0.045 with soft fade-out)
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(0.045, now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.22);
      osc2.stop(now + 0.22);
    } catch {
      // Gracefully silent if audio context is restricted
    }
  };

  useEffect(() => {
    // Check if auto-expand has already triggered in this session
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('egy_wa_auto_expanded')) {
        hasTriggeredAutoExpandRef.current = true;
        return;
      }
    } catch {
      // Gracefully handle restricted storage environments (e.g. strict private mode)
    }

    const triggerAutoExpand = () => {
      if (hasTriggeredAutoExpandRef.current) return;
      hasTriggeredAutoExpandRef.current = true;

      setIsAutoExpanded(true);
      try {
        sessionStorage.setItem('egy_wa_auto_expanded', 'true');
      } catch {
        // ignore
      }

      // Naturally collapse back after 4.5 seconds so it remains non-intrusive
      collapseTimerRef.current = setTimeout(() => {
        setIsAutoExpanded(false);
      }, 4500);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;

      const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0;
      setScrollPercent(Math.round(pct));

      // Only trigger auto-expand when user has scrolled past 25% of the page
      if (!hasTriggeredAutoExpandRef.current && pct >= 25) {
        triggerAutoExpand();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    scrollListenerCleanupRef.current = () => {
      window.removeEventListener('scroll', handleScroll);
    };

    // Check if already scrolled past 25% on mount (e.g. page refreshed or deep linked)
    handleScroll();

    return () => {
      if (scrollListenerCleanupRef.current) {
        scrollListenerCleanupRef.current();
        scrollListenerCleanupRef.current = null;
      }
      if (autoExpandTimerRef.current) clearTimeout(autoExpandTimerRef.current);
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    };
  }, []);

  // Dynamically react to system dark mode toggles in real-time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const handleAutoScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleUserInteraction(false);
    const tripsElement = document.getElementById('trips') || document.getElementById('stats');
    if (tripsElement) {
      tripsElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  const handleUserInteraction = (triggerSound = false) => {
    // If the user manually interacts with the button, cancel pending auto-expand timer and collapse if auto-expanded
    hasTriggeredAutoExpandRef.current = true;
    if (autoExpandTimerRef.current) {
      clearTimeout(autoExpandTimerRef.current);
      autoExpandTimerRef.current = null;
    }
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setIsAutoExpanded(false);
    try {
      sessionStorage.setItem('egy_wa_auto_expanded', 'true');
    } catch {
      // ignore
    }

    if (triggerSound) {
      playHoverSound();
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsHovered(true);
    setIsQrDismissed(false);
    handleUserInteraction(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    // Grace window allows smooth cursor movement into the tooltip
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 280);
  };

  const handleTooltipMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsTooltipHovered(true);
  };

  const handleTooltipMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setIsTooltipHovered(false);
    }, 200);
  };

  const handleClick = () => {
    handleUserInteraction();
    try {
      if (typeof window !== 'undefined') {
        // Standard GA4 recommended event: generate_lead
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            event_category: 'Contact',
            event_label: 'Floating WhatsApp Tour Inquiry',
            method: 'WhatsApp',
            value: 1
          });

          // Custom event for detailed excursion inquiry funnel analysis
          window.gtag('event', 'tour_inquiry', {
            channel: 'whatsapp',
            source: 'floating_widget',
            destination: 'Hurghada Red Sea Operations'
          });
        } else if (Array.isArray(window.dataLayer)) {
          window.dataLayer.push({
            event: 'tour_inquiry',
            event_category: 'Contact',
            event_label: 'Floating WhatsApp Tour Inquiry',
            channel: 'whatsapp'
          });
        }
      }
    } catch (err) {
      // Gracefully prevent any GA tracking error from interfering with user action
      console.warn('Analytics event tracking skipped:', err);
    }
  };

  const isExpanded = isAutoExpanded || isHovered || isFocused || isTooltipHovered;
  const showQrTooltip = isExpanded && !isQrDismissed;
  const showNeedHelp = !isExpanded && isNeedHelpReady;

  // Reset entrance state when tooltip is closed
  useEffect(() => {
    if (!showQrTooltip) {
      setIsQrEntering(true);
    }
  }, [showQrTooltip]);

  return (
    <>
      {/* "Need help?" Text Label above the WhatsApp button when collapsed */}
      <div id="whatsapp-need-help-container">
        <AnimatePresence>
          {showNeedHelp && (
            <motion.a
              id="whatsapp-need-help-label"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              initial={{ opacity: 0, y: 7, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9, transition: { duration: 0.18, ease: 'easeOut' } }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a1814]/92 dark:bg-[#061410]/95 backdrop-blur-md border border-[#D4AF37]/50 hover:border-[#FFD700] shadow-[0_4px_16px_rgba(0,0,0,0.4),0_0_12px_rgba(212,175,55,0.18)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.55),0_0_18px_rgba(255,215,0,0.4)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer pointer-events-auto select-none no-underline"
              aria-label="Need help? Chat with us on WhatsApp"
              title="Need help? Chat with Tour Manager on WhatsApp"
            >
              {/* Online pulse indicator */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] shadow-[0_0_6px_rgba(37,211,102,0.9)] animate-pulse flex-shrink-0" />

              {/* Label text */}
              <span className="text-[0.72rem] font-semibold text-zinc-100 group-hover:text-[#FFD700] tracking-wide whitespace-nowrap transition-colors">
                Need help?
              </span>

              {/* Downward pointing arrow toward the circular WhatsApp button */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a1814] dark:bg-[#061410] border-r border-b border-[#D4AF37]/50 group-hover:border-[#FFD700] transform rotate-45 transition-colors pointer-events-none"
                aria-hidden="true"
              />
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic QR Code Overlay / Tooltip when Expanded */}
      <AnimatePresence>
        {showQrTooltip && (
          <motion.div
            id="whatsapp-qr-tooltip"
            initial={{
              opacity: 0,
              y: -32,
              scale: 0.88,
              filter: 'blur(6px)',
              borderColor: 'rgba(212, 175, 55, 0.55)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.65), 0 0 20px rgba(212,175,55,0.25)'
            }}
            animate={
              isQrEntering
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    borderColor: 'rgba(212, 175, 55, 0.65)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.65), 0 0 20px rgba(212,175,55,0.25)'
                  }
                : {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: [0, -3.5, 0],
                    scale: [1, 1.018, 1],
                    borderColor: [
                      'rgba(212, 175, 55, 0.55)',
                      'rgba(255, 215, 0, 0.88)',
                      'rgba(212, 175, 55, 0.55)'
                    ],
                    boxShadow: [
                      '0 16px 40px rgba(0,0,0,0.65), 0 0 20px rgba(212,175,55,0.25)',
                      '0 22px 52px rgba(0,0,0,0.75), 0 0 34px rgba(212,175,55,0.5)',
                      '0 16px 40px rgba(0,0,0,0.65), 0 0 20px rgba(212,175,55,0.25)'
                    ]
                  }
            }
            transition={
              isQrEntering
                ? {
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1]
                  }
                : {
                    duration: 3.2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut'
                  }
            }
            onAnimationComplete={() => {
              if (isQrEntering) {
                setIsQrEntering(false);
              }
            }}
            exit={{
              opacity: 0,
              y: -18,
              scale: 0.92,
              filter: 'blur(4px)',
              transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] }
            }}
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
            className="w-[240px] p-3.5 rounded-2xl bg-[#0a1814]/95 dark:bg-[#061410]/95 backdrop-blur-xl border text-white select-none pointer-events-auto"
            role="tooltip"
            aria-label="Scan QR code to open WhatsApp on your phone"
          >
            {/* Header with dismiss button */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/25"
            >
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#FFD700]" />
                <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[#FFD700]">
                  Scan on Phone
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsQrDismissed(true);
                }}
                className="p-1 -mr-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Dismiss QR overlay"
                aria-label="Dismiss QR overlay"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* QR Code Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-[148px] h-[148px] p-2 bg-white rounded-xl shadow-inner flex items-center justify-center"
            >
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt="WhatsApp Chat QR Code"
                  className="w-full h-full object-contain rounded-md"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-zinc-400">
                  <QrCode className="w-8 h-8 animate-pulse text-emerald-600" />
                  <span className="text-[0.65rem]">Generating...</span>
                </div>
              )}
              {/* Central WhatsApp Badge in QR center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-6 h-6 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              </div>
            </motion.div>

            {/* Explanatory microcopy */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2.5 text-center"
            >
              <p className="text-[0.74rem] text-zinc-200 font-medium leading-tight">
                Scan with phone camera
              </p>
              <p className="text-[0.68rem] text-[#D4AF37] font-mono tracking-wider mt-0.5 font-semibold">
                +20 110 787 1007
              </p>
            </motion.div>

            {/* Downward Tooltip Pointer Arrow */}
            <motion.div
              animate={
                isQrEntering
                  ? { borderColor: 'rgba(212, 175, 55, 0.65)' }
                  : {
                      borderColor: [
                        'rgba(212, 175, 55, 0.55)',
                        'rgba(255, 215, 0, 0.88)',
                        'rgba(212, 175, 55, 0.55)'
                      ]
                    }
              }
              transition={
                isQrEntering
                  ? { duration: 0.45 }
                  : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
              }
              className="absolute -bottom-2 right-7 [dir='rtl']:right-auto [dir='rtl']:left-7 w-3.5 h-3.5 bg-[#0a1814] dark:bg-[#061410] border-r border-b transform rotate-45 pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        id="whatsapp-float"
        data-theme={isSystemDark ? 'dark' : 'light'}
        className={`animate-whatsapp-entry ${isExpanded ? 'is-expanded' : ''} ${
          isAutoExpanded ? 'auto-expanded' : ''
        } ${isSystemDark ? 'is-dark-mode' : ''}`}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => {
          setIsFocused(true);
          setIsQrDismissed(false);
          handleUserInteraction(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onTouchStart={() => handleUserInteraction(false)}
        aria-label="Chat on WhatsApp with EGY TOURS"
        title="Chat with Tour Manager on WhatsApp"
      >
        <div className="w-[60px] h-[60px] flex items-center justify-center flex-shrink-0 relative">
          <MessageCircle className="w-8 h-8 text-white" />
          <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300 shadow-sm" />
          </span>
        </div>
        <span className="font-bold text-sm text-white flex items-center gap-1.5">
          <span>Chat on WhatsApp</span>
          <span
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/25 border border-white/30 text-[0.68rem] text-[#FFD700] tracking-tight font-medium"
            title="Scan QR code on mobile"
          >
            <QrCode className="w-2.5 h-2.5 text-[#FFD700]" />
            <span>QR</span>
          </span>
        </span>
      </a>
    </>
  );
};

