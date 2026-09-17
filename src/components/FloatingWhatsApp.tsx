import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  QrCode,
  Smartphone,
  X,
  CalendarCheck,
  Zap,
  Headphones,
  ChevronDown,
  Share2,
  Facebook,
  Check,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import QRCode from 'qrcode';
import { SupportedLanguage } from '../data/translations';
import { getWhatsAppAutoUrl, WHATSAPP_SHARE_TEXT } from '../utils/whatsapp';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

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

const LOCALIZED_SEQUENCE_META: Record<
  string,
  Record<SupportedLanguage, { label: string; badgeText: string; sublabel: string }>
> = {
  whatsapp: {
    en: { label: 'Chat on WhatsApp', badgeText: 'Need help?', sublabel: 'Online 24/7' },
    ar: { label: 'محادثة عبر واتساب', badgeText: 'تحتاج مساعدة؟', sublabel: 'متواجدون 24/7' },
    ru: { label: 'Чат в WhatsApp', badgeText: 'Нужна помощь?', sublabel: 'Онлайн 24/7' },
    de: { label: 'Auf WhatsApp chatten', badgeText: 'Hilfe nötig?', sublabel: 'Online 24/7' },
    fr: { label: 'Discuter sur WhatsApp', badgeText: "Besoin d'aide ?", sublabel: 'En ligne 24/7' },
    pl: { label: 'Czat na WhatsApp', badgeText: 'Potrzebujesz pomocy?', sublabel: 'Dostępni 24/7' },
    it: { label: 'Chatta su WhatsApp', badgeText: 'Serve aiuto?', sublabel: 'Online 24/7' },
    es: { label: 'Chatear por WhatsApp', badgeText: '¿Necesitas ayuda?', sublabel: 'En línea 24/7' }
  },
  quickbook: {
    en: { label: 'Quick Book Tour', badgeText: 'Quick Book', sublabel: 'Instant Confirmation' },
    ar: { label: 'حجز سريع للرحلات', badgeText: 'حجز سريع', sublabel: 'تأكيد فوري' },
    ru: { label: 'Быстрое бронирование', badgeText: 'Быстрый заказ', sublabel: 'Мгновенно' },
    de: { label: 'Schnellbuchung', badgeText: 'Schnellbuchung', sublabel: 'Sofortige Bestätigung' },
    fr: { label: 'Réservation rapide', badgeText: 'Réservation rapide', sublabel: 'Confirmation immédiate' },
    pl: { label: 'Szybka rezerwacja', badgeText: 'Szybka rezerwacja', sublabel: 'Błyskawiczne potwierdzenie' },
    it: { label: 'Prenotazione Rapida', badgeText: 'Prenota subito', sublabel: 'Conferma immediata' },
    es: { label: 'Reserva Rápida', badgeText: 'Reserva rápida', sublabel: 'Confirmación al instante' }
  },
  instant: {
    en: { label: '1-Min WhatsApp Booking', badgeText: 'Fast Reply', sublabel: '0% Deposit Required' },
    ar: { label: 'حجز خلال دقيقة', badgeText: 'رد فوري', sublabel: '0% دفعة مقدمة' },
    ru: { label: 'Бронь за 1 минуту', badgeText: 'Быстрый ответ', sublabel: 'Без предоплаты' },
    de: { label: '1-Min WhatsApp-Buchung', badgeText: 'Schnelle Antwort', sublabel: '0 % Anzahlung' },
    fr: { label: 'Réservation en 1 min', badgeText: 'Réponse rapide', sublabel: "0% d'acompte requis" },
    pl: { label: 'Rezerwacja w 1 min', badgeText: 'Szybka odpowiedź', sublabel: '0% zaliczki' },
    it: { label: 'Prenota in 1 minuto', badgeText: 'Risposta rapida', sublabel: '0% di anticipo' },
    es: { label: 'Reserva en 1 min', badgeText: 'Respuesta rápida', sublabel: '0% de anticipo' }
  },
  concierge: {
    en: { label: 'Tour Concierge', badgeText: 'Need help?', sublabel: 'Hurghada Red Sea' },
    ar: { label: 'مستشار الرحلات', badgeText: 'تحتاج مساعدة؟', sublabel: 'الغردقة البحر الأحمر' },
    ru: { label: 'Консьерж туров', badgeText: 'Нужна помощь?', sublabel: 'Хургада, Красное море' },
    de: { label: 'Ausflugs-Concierge', badgeText: 'Hilfe nötig?', sublabel: 'Hurghada Rotes Meer' },
    fr: { label: 'Concierge excursions', badgeText: "Besoin d'aide ?", sublabel: 'Hurghada Mer Rouge' },
    pl: { label: 'Konsjerż wycieczek', badgeText: 'Potrzebujesz pomocy?', sublabel: 'Hurghada Morze Czerwone' },
    it: { label: 'Concierge Tour', badgeText: 'Serve aiuto?', sublabel: 'Hurghada Mar Rosso' },
    es: { label: 'Conserje de Tours', badgeText: '¿Necesitas ayuda?', sublabel: 'Hurghada Mar Rojo' }
  }
};

interface FloatingWhatsAppProps {
  currentLang?: SupportedLanguage;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentLang = 'en' }) => {
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
  const [isShareCopied, setIsShareCopied] = useState(false);
  const [isSharePending, setIsSharePending] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isSystemDark, setIsSystemDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const autoExpandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastSoundTimeRef = useRef<number>(0);
  const hasTriggeredAutoExpandRef = useRef<boolean>(false);
  const scrollListenerCleanupRef = useRef<(() => void) | null>(null);

  // Inactivity cooldown period (2.5 seconds of user pause after crossing 25% scroll)
  const INACTIVITY_COOLDOWN_MS = 2500;

  const rawSeq = ICON_SEQUENCE[iconSeqIndex];
  const langKey = (currentLang || 'en') as SupportedLanguage;
  const localizedMeta =
    LOCALIZED_SEQUENCE_META[rawSeq.id]?.[langKey] || LOCALIZED_SEQUENCE_META[rawSeq.id]?.en;
  const activeSeq = {
    ...rawSeq,
    label: localizedMeta?.label || rawSeq.label,
    badgeText: localizedMeta?.badgeText || rawSeq.badgeText,
    sublabel: localizedMeta?.sublabel || rawSeq.sublabel
  };

  const whatsappUrl = getWhatsAppAutoUrl(langKey);

  // Animate Icon Sequence continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setIconSeqIndex((prev) => (prev + 1) % ICON_SEQUENCE.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Pre-generate high-res QR code data URL dynamically when language/url changes
  useEffect(() => {
    QRCode.toDataURL(whatsappUrl, {
      width: 144,
      margin: 1,
      color: {
        dark: '#032c24', // Deep emerald Egyptian ink
        light: '#ffffff' // Pure crisp white backdrop
      },
      errorCorrectionLevel: 'M'
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.warn('QR Code generation skipped:', err));
  }, [whatsappUrl]);

  // Show "Need help?" label after initial button entrance completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNeedHelpReady(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Subtle pulse animation duration during initial component load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2800);
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
      if (typeof window !== 'undefined' && sessionStorage.getItem('egy_wa_auto_expanded') === 'true') {
        hasTriggeredAutoExpandRef.current = true;
      }
    } catch {
      // Gracefully handle restricted storage environments (e.g. strict private mode)
    }

    const triggerAutoExpand = () => {
      if (hasTriggeredAutoExpandRef.current) return;
      hasTriggeredAutoExpandRef.current = true;

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }

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

    const resetInactivityCooldownIfEligible = (pct: number) => {
      if (hasTriggeredAutoExpandRef.current) return;

      // When past 25% of page, wait for user inactivity cooldown before expanding
      if (pct >= 25) {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
          triggerAutoExpand();
        }, INACTIVITY_COOLDOWN_MS);
      } else {
        // If user scrolls back up before triggering, clear pending cooldown
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
          inactivityTimerRef.current = null;
        }
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;

      const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0;
      setScrollPercent(Math.round(pct));

      // Reset inactivity cooldown so continuous active scrolling doesn't get interrupted
      resetInactivityCooldownIfEligible(pct);
    };

    // User activity listeners (mouse move, touch) while past 25% also reset inactivity cooldown
    const handleUserActivity = () => {
      if (hasTriggeredAutoExpandRef.current || !inactivityTimerRef.current) return;
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        triggerAutoExpand();
      }, INACTIVITY_COOLDOWN_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleUserActivity, { passive: true });
    window.addEventListener('touchstart', handleUserActivity, { passive: true });

    scrollListenerCleanupRef.current = () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
    };

    // Check on mount (e.g. page refreshed midway down)
    handleScroll();

    return () => {
      if (scrollListenerCleanupRef.current) {
        scrollListenerCleanupRef.current();
        scrollListenerCleanupRef.current = null;
      }
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
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
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
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

  const handleShareBookingLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSharePending(true);
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.egy-tour.com';
    const shareData = {
      title: 'EGY TOUR - VIP Excursions & Travel in Egypt',
      text: 'Book VIP Hurghada & Red Sea excursions with zero advance deposit, instant confirmation, and 24/7 WhatsApp support!',
      url: shareUrl
    };

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err: unknown) {
          if ((err as Error)?.name === 'AbortError') {
            return; // user cancelled native share
          }
        }
      }

      // Fallback: Copy link to clipboard
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setIsShareCopied(true);
        setTimeout(() => setIsShareCopied(false), 2500);
      }
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    } finally {
      setTimeout(() => {
        setIsSharePending(false);
      }, 400);
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

  const ActiveIconComponent = activeSeq.icon;

  return (
    <>
      {/* "Need help? / Quick Book" Text Label above the WhatsApp button when collapsed */}
      <div id="whatsapp-need-help-container">
        <AnimatePresence>
          {showNeedHelp && (
            <div className="relative flex flex-col items-center">
              {/* Quick Book Interactive Tooltip Card (shows on hover/focus) */}
              <AnimatePresence>
                {isQuickBookTooltipOpen && (
                  <motion.div
                    id="whatsapp-quick-book-tooltip"
                    data-copy-pending={isSharePending ? 'true' : undefined}
                    data-initial-load={isInitialLoad ? 'true' : undefined}
                    initial={{ opacity: 0, y: 8, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.92, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl bg-[#0a1814]/96 dark:bg-[#061410]/98 backdrop-blur-xl border border-[#D4AF37] shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_16px_rgba(212,175,55,0.25)] text-white pointer-events-auto z-50 text-center ${
                      isSharePending ? 'is-pending' : ''
                    } ${isInitialLoad ? 'is-initial-load' : ''}`}
                    role="tooltip"
                  >
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#D4AF37]/30">
                      <div className="flex items-center gap-1.5 text-[#FFD700] font-bold text-xs">
                        <Zap className="w-3.5 h-3.5 fill-[#FFD700]" />
                        <span>Quick Book on WhatsApp</span>
                      </div>
                      <span className="text-[0.62rem] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-500/30">
                        Instant
                      </span>
                    </div>
                    <p className="text-[0.7rem] text-zinc-300 leading-snug text-left [dir='rtl']:text-right">
                      ⚡ Reserve any tour in under 2 minutes with zero advance payment. Pay on arrival!
                    </p>
                    <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[0.65rem] text-[#D4AF37]">
                      <span>Avg reply: &lt; 2 mins</span>
                      <span className="underline font-semibold">Click to Chat →</span>
                    </div>

                    {/* Share Booking Link via Mobile Share Sheet or Clipboard */}
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-1.5">
                      <button
                        type="button"
                        onClick={handleShareBookingLink}
                        aria-busy={isSharePending}
                        className={`tooltip-share-btn flex-1 py-1.5 px-2 rounded-lg bg-gradient-to-r from-[#D4AF37]/25 via-[#FFD700]/20 to-[#D4AF37]/25 hover:from-[#D4AF37]/45 hover:to-[#FFD700]/35 border border-[#D4AF37]/80 hover:border-[#FFD700] text-white text-[0.68rem] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.03] ${
                          isSharePending ? 'is-pending' : ''
                        } ${isInitialLoad ? 'initial-pulse' : ''}`}
                        title="Share EGY TOUR booking link via mobile share menu or copy"
                        aria-label="Share EGY TOUR booking link"
                      >
                        {isSharePending ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 text-[#FFD700] animate-spin" />
                            <span className="text-[#FFD700]">Copying...</span>
                          </>
                        ) : isShareCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5 text-[#FFD700]" />
                            <span className="text-[#FFD700]">Share</span>
                          </>
                        )}
                      </button>

                      {/* Direct WhatsApp Share */}
                      <motion.a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          (WHATSAPP_SHARE_TEXT[langKey] || WHATSAPP_SHARE_TEXT.en) +
                            (typeof window !== 'undefined' ? window.location.href : '')
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        animate={{
                          scale: [1, 1.07, 1],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut',
                        }}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        className={`tooltip-share-btn p-1.5 rounded-lg bg-[#25D366]/25 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/70 hover:border-[#FFD700] flex items-center justify-center cursor-pointer ${
                          isSharePending ? 'is-pending' : ''
                        } ${isInitialLoad ? 'initial-pulse' : ''}`}
                        title="Share on WhatsApp"
                        aria-label="Share on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 drop-shadow-sm" />
                      </motion.a>

                      {/* Direct Facebook Share */}
                      <motion.a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          typeof window !== 'undefined' ? window.location.href : ''
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        animate={{
                          scale: [1, 1.07, 1],
                        }}
                        transition={{
                          duration: 2.2,
                          delay: 0.4,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut',
                        }}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        className={`tooltip-share-btn p-1.5 rounded-lg bg-[#1877F2]/25 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/70 hover:border-[#FFD700] flex items-center justify-center cursor-pointer ${
                          isSharePending ? 'is-pending' : ''
                        } ${isInitialLoad ? 'initial-pulse' : ''}`}
                        title="Share on Facebook"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5 drop-shadow-sm" />
                      </motion.a>
                    </div>
                    {/* Downward pointer arrow */}
                    <div
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a1814] dark:bg-[#061410] border-r border-b border-[#D4AF37] transform rotate-45 pointer-events-none"
                      aria-hidden="true"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.a
                id="whatsapp-need-help-label"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                onMouseEnter={() => setIsQuickBookTooltipOpen(true)}
                onMouseLeave={() => setIsQuickBookTooltipOpen(false)}
                onFocus={() => setIsQuickBookTooltipOpen(true)}
                onBlur={() => setIsQuickBookTooltipOpen(false)}
                initial={{ opacity: 0, y: 7, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.9, transition: { duration: 0.18, ease: 'easeOut' } }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a1814]/92 dark:bg-[#061410]/95 backdrop-blur-md border border-[#D4AF37]/50 hover:border-[#FFD700] shadow-[0_4px_16px_rgba(0,0,0,0.4),0_0_12px_rgba(212,175,55,0.18)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.55),0_0_18px_rgba(255,215,0,0.4)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer pointer-events-auto select-none no-underline"
                aria-label="Quick Book or Chat with us on WhatsApp"
                title="Quick Book or Chat with Tour Manager on WhatsApp"
              >
                {/* Online pulse indicator */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] shadow-[0_0_6px_rgba(37,211,102,0.9)] animate-pulse flex-shrink-0" />

                {/* Label text that cycles with active icon sequence */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSeq.id}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="text-[0.72rem] font-semibold text-zinc-100 group-hover:text-[#FFD700] tracking-wide whitespace-nowrap transition-colors flex items-center gap-1"
                  >
                    {activeSeq.badgeText === 'Quick Book' && (
                      <Zap className="w-2.5 h-2.5 text-[#FFD700] fill-[#FFD700]" />
                    )}
                    <span>{activeSeq.badgeText}</span>
                  </motion.span>
                </AnimatePresence>

                {/* Downward pointing arrow toward the circular WhatsApp button */}
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a1814] dark:bg-[#061410] border-r border-b border-[#D4AF37]/50 group-hover:border-[#FFD700] transform rotate-45 transition-colors pointer-events-none"
                  aria-hidden="true"
                />
              </motion.a>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic QR Code Overlay / Tooltip when Expanded */}
      <AnimatePresence>
        {showQrTooltip && (
          <motion.div
            id="whatsapp-qr-tooltip"
            data-theme={isSystemDark ? 'dark' : 'light'}
            initial={{
              opacity: 0,
              y: -32,
              scale: 0.88,
              filter: 'blur(6px)'
            }}
            animate={
              isQrEntering
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)'
                  }
                : {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: [0, -3.5, 0],
                    scale: [1, 1.018, 1]
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
            className={`w-[240px] p-3.5 rounded-2xl bg-[#0a1814]/95 dark:bg-[#061410]/95 backdrop-blur-xl border text-white select-none pointer-events-auto ${
              isSystemDark ? 'is-dark-mode' : ''
            }`}
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

            {/* Quick Book Header Banner */}
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="mb-2 px-2 py-1.5 rounded-lg bg-emerald-950/70 border border-[#D4AF37]/40 flex items-center justify-between text-[0.7rem] shadow-inner"
            >
              <div className="flex items-center gap-1 text-[#FFD700] font-bold">
                <Zap className="w-3 h-3 fill-[#FFD700] flex-shrink-0" />
                <span>Quick Book Excursion</span>
              </div>
              <span className="text-[0.62rem] text-emerald-300 font-semibold">0% Deposit</span>
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
              className="pt-2 text-center"
            >
              <p className="text-[0.74rem] text-zinc-200 font-medium leading-tight">
                Scan with phone camera
              </p>
              <p className="text-[0.68rem] text-[#D4AF37] font-mono tracking-wider mt-0.5 font-semibold">
                +20 102 522 1269
              </p>
            </motion.div>

            {/* Share action bar in QR Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.22 }}
              className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between gap-1.5"
            >
              <button
                type="button"
                onClick={handleShareBookingLink}
                className="flex-1 py-1 px-2 rounded-lg bg-[#D4AF37]/25 hover:bg-[#D4AF37]/40 border border-[#D4AF37]/80 text-white text-[0.66rem] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title="Share booking link via mobile share sheet or copy"
                aria-label="Share booking link via mobile share sheet"
              >
                {isShareCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3 h-3 text-[#FFD700]" />
                    <span className="text-[#FFD700]">Share</span>
                  </>
                )}
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  (WHATSAPP_SHARE_TEXT[langKey] || WHATSAPP_SHARE_TEXT.en) +
                    (typeof window !== 'undefined' ? window.location.href : '')
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-[#25D366]/25 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/70 hover:border-[#D4AF37] hover:shadow-[0_0_12px_rgba(212,175,55,0.65),0_0_6px_rgba(255,215,0,0.4)] hover:drop-shadow-[0_0_4px_rgba(212,175,55,0.7)] transition-all duration-200 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
              >
                <MessageCircle className="w-3 h-3 drop-shadow-sm" />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.href : ''
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-[#1877F2]/25 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/70 hover:border-[#D4AF37] hover:shadow-[0_0_12px_rgba(212,175,55,0.65),0_0_6px_rgba(255,215,0,0.4)] hover:drop-shadow-[0_0_4px_rgba(212,175,55,0.7)] transition-all duration-200 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                title="Share on Facebook"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-3 h-3 drop-shadow-sm" />
              </a>
            </motion.div>

            {/* Downward Tooltip Pointer Arrow */}
            <div
              className="qr-tooltip-arrow absolute -bottom-2 right-7 [dir='rtl']:right-auto [dir='rtl']:left-7 w-3.5 h-3.5 bg-[#0a1814] dark:bg-[#061410] border-r border-b transform rotate-45 pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-Scroll Indicator Progress Ring around the WhatsApp button */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            type="button"
            id="whatsapp-scroll-indicator"
            onClick={handleAutoScroll}
            onMouseEnter={() => setIsScrollIndicatorHovered(true)}
            onMouseLeave={() => setIsScrollIndicatorHovered(false)}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            className="rounded-full select-none cursor-pointer focus:outline-none"
            title={`Scrolled ${scrollPercent}% — Click to auto-scroll down to excursions`}
            aria-label={`Page scroll progress: ${scrollPercent}%. Click to auto-scroll down to excursions.`}
          >
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 70 70">
              <defs>
                <linearGradient id="gold-scroll-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              {/* Background Track */}
              <circle
                cx="35"
                cy="35"
                r="32"
                className="stroke-[#D4AF37]/20 fill-none"
                strokeWidth="2.5"
              />
              {/* Progress Arc */}
              <circle
                cx="35"
                cy="35"
                r="32"
                className="stroke-[url(#gold-scroll-gradient)] fill-none transition-all duration-150 ease-out"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeDasharray={201.06}
                strokeDashoffset={201.06 - (201.06 * scrollPercent) / 100}
              />
              {/* 25% Auto-expand milestone marker */}
              <circle
                cx="67"
                cy="35"
                r={scrollPercent >= 25 ? 3 : 2}
                className={
                  scrollPercent >= 25
                    ? 'fill-[#FFD700] stroke-[#0a1814] stroke-1 drop-shadow-[0_0_6px_rgba(255,215,0,0.9)] animate-pulse'
                    : 'fill-[#D4AF37]/40'
                }
              />
            </svg>

            {/* Hover Tooltip for the Auto-Scroll Indicator */}
            <AnimatePresence>
              {isScrollIndicatorHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -6, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -6, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-full mr-3 [dir='rtl']:right-auto [dir='rtl']:left-full [dir='rtl']:ml-3 px-2.5 py-1 rounded-lg bg-[#0a1814]/95 border border-[#D4AF37]/70 backdrop-blur-md shadow-xl text-[0.68rem] text-zinc-200 whitespace-nowrap pointer-events-none flex items-center gap-1.5"
                >
                  <span className="font-bold text-[#FFD700]">{scrollPercent}%</span>
                  <span>·</span>
                  <span>Auto-Scroll to Trips</span>
                  <ChevronDown className="w-3 h-3 text-[#FFD700] animate-bounce" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      <a
        id="whatsapp-float"
        data-theme={isSystemDark ? 'dark' : 'light'}
        className={`animate-whatsapp-entry ${isExpanded ? 'is-expanded' : ''} ${
          isAutoExpanded ? 'auto-expanded' : ''
        } ${isSystemDark ? 'is-dark-mode' : ''}`}
        href={whatsappUrl}
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
        aria-label="Chat on WhatsApp with EGY TOUR"
        title="Chat with Tour Manager on WhatsApp"
      >
        <div className="w-[60px] h-[60px] flex items-center justify-center flex-shrink-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSeq.id}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <ActiveIconComponent className="w-7 h-7 text-white drop-shadow-sm" />
            </motion.div>
          </AnimatePresence>

          <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300 shadow-sm" />
          </span>
        </div>

        <div className="flex flex-col justify-center text-left [dir='rtl']:text-right overflow-hidden pr-3 [dir='rtl']:pr-0 [dir='rtl']:pl-3">
          <div className="font-bold text-sm text-white flex items-center gap-1.5 leading-tight whitespace-nowrap">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeSeq.id}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {activeSeq.label}
              </motion.span>
            </AnimatePresence>
            <span
              className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/25 border border-white/30 text-[0.65rem] text-[#FFD700] tracking-tight font-medium"
              title="Scan QR code on mobile"
            >
              <QrCode className="w-2.5 h-2.5 text-[#FFD700]" />
              <span>QR</span>
            </span>
          </div>
          <div className="text-[0.68rem] text-emerald-300 font-medium tracking-wide flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse flex-shrink-0" />
            <span className="truncate">{activeSeq.sublabel}</span>
          </div>
        </div>
      </a>
    </>
  );
};

