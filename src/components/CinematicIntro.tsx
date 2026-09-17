import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, SkipForward, Play, Pause, Compass, Sparkles } from 'lucide-react';
import egytoursLogo from '../assets/images/egytours_logo_1789090112855.jpg';

interface CinematicIntroProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Chapter {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
  accentColor: string;
  quote: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 0,
    tag: 'ANCIENT WONDER • 5,000 YEARS OF GLORY',
    title: 'THE PYRAMIDS OF GIZA',
    subtitle: 'Where time stands still and eternal pharaohs watch over the golden sands',
    location: 'GIZA PLATEAU • CAIRO, EGYPT',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=2000&q=85',
    accentColor: '#FFD700',
    quote: '“Man fears Time, yet Time fears the Pyramids.”'
  },
  {
    id: 1,
    tag: 'TURQUOISE SANCTUARY • GIFTUN ISLANDS',
    title: 'THE VIBRANT RED SEA',
    subtitle: 'Dive into world-famous coral reefs and swim with wild dolphins in crystal lagoons',
    location: 'HURGHADA & ORANGE BAY • RED SEA',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85',
    accentColor: '#38bdf8',
    quote: '“Beneath the azure surface lies a living paradise of coral and light.”'
  },
  {
    id: 2,
    tag: 'ENDLESS HORIZONS • BEDOUIN NIGHTS',
    title: 'THE GOLDEN SAHARA',
    subtitle: 'High-octane quad desert safaris, traditional fireside tea, and a billion stars',
    location: 'EASTERN DESERT • SAHARA',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85',
    accentColor: '#f59e0b',
    quote: '“In the silence of the desert, the soul finds its rhythm.”'
  },
  {
    id: 3,
    tag: 'EGYPT’S PREMIER TOUR OPERATOR',
    title: 'EGY TOUR',
    subtitle: 'Crafting unforgettable memories across land, sea, and ancient millennia',
    location: 'HURGHADA • CAIRO • LUXOR • MARSA ALAM',
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=2000&q=85',
    accentColor: '#D4AF37',
    quote: '“Your journey into the heart of timeless Egypt starts now.”'
  }
];

const SCENE_DURATION = 4200; // ms per chapter

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ isOpen, onClose }) => {
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasInteractedAudio, setHasInteractedAudio] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Keyboard shortcut: Escape or Space to skip/enter
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Clean Web Audio API Ambient Cinematic Drone (Synthesized in real-time, no external audio files)
  const initAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low atmospheric cinematic chord: C2 (65.4Hz), G2 (98Hz), C3 (130.8Hz), Eb3 (155.6Hz)
      const frequencies = [65.41, 97.99, 130.81, 155.56];
      const oscs: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Lowpass filter for warm cinematic movie drone
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);
        filter.Q.setValueAtTime(2.0, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.15 / (idx + 1), ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;

      // Smooth fade in
      masterGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 1.8);
      setIsMuted(false);
      setHasInteractedAudio(true);
    } catch (err) {
      console.warn('Audio synthesis initialized with restriction:', err);
    }
  }, []);

  const toggleAudio = () => {
    if (!audioCtxRef.current) {
      initAudio();
      return;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (gainNodeRef.current) {
      const now = audioCtxRef.current.currentTime;
      if (isMuted) {
        gainNodeRef.current.gain.cancelScheduledValues(now);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.25, now + 0.5);
        setIsMuted(false);
      } else {
        gainNodeRef.current.gain.cancelScheduledValues(now);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        setIsMuted(true);
      }
    }
  };

  const stopAudio = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      gainNodeRef.current.gain.cancelScheduledValues(now);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.4);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
      }, 500);
    }
  }, []);

  // Handle closing the intro
  const handleClose = useCallback(() => {
    stopAudio();
    onClose();
  }, [stopAudio, onClose]);

  // Scene Progression & Timer
  useEffect(() => {
    if (!isOpen) {
      setCurrentChapter(0);
      setProgress(0);
      return;
    }

    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalStep = 50;
    const increment = (intervalStep / SCENE_DURATION) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentChapter((ch) => {
            if (ch < CHAPTERS.length - 1) {
              return ch + 1;
            } else {
              // Reached end of final chapter, hold or wait for user to enter
              return ch;
            }
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalStep);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isOpen, isPaused, currentChapter]);

  // Golden Sand Particle Animation on Canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.6 + 0.2),
      opacity: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? '#FFD700' : '#D4AF37'
    }));

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const activeChapter = CHAPTERS[currentChapter];

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] bg-[#050505] text-white overflow-hidden flex flex-col justify-between select-none"
        role="dialog"
        aria-label="EGY TOUR Cinematic Experience"
      >
        {/* Anamorphic Widescreen Cinema Letterbox: Top Bar */}
        <motion.div
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-40 w-full h-14 sm:h-20 bg-black/95 border-b border-[#D4AF37]/20 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between"
        >
          {/* Top-Left: Brand Emblem & Tag */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37] p-0.5 bg-[#121212] flex items-center justify-center overflow-hidden shadow-[0_0_12px_rgba(212,175,55,0.4)]">
              <img
                src={egytoursLogo}
                alt="EGY TOUR"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-heading text-sm sm:text-base font-bold tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-white bg-clip-text text-transparent">
                EGY TOUR
              </span>
              <span className="hidden sm:block text-[0.6rem] text-zinc-400 tracking-[0.2em] uppercase font-mono">
                CINEMATIC SHOWCASE • 4K
              </span>
            </div>
          </div>

          {/* Top-Right: Sound Toggle & Skip Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleAudio}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 hover:bg-white/10 hover:border-[#D4AF37] text-xs text-zinc-300 hover:text-white transition-all backdrop-blur-sm"
              title={isMuted ? 'Enable Cinematic Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-zinc-400" />
                  <span className="text-[0.7rem] uppercase tracking-wider hidden sm:inline">Audio Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#FFD700] animate-pulse" />
                  <span className="text-[0.7rem] uppercase tracking-wider text-[#FFD700] hidden sm:inline">Audio On</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/90 to-[#AA7C11] hover:from-[#FFD700] hover:to-[#D4AF37] text-black text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_16px_rgba(212,175,55,0.45)] hover:scale-105"
            >
              <span>Skip Intro</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Dynamic Canvas for floating golden sand particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 pointer-events-none"
        />

        {/* Cinematic Vignette Overlay & Film Grain Simulation */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/80" />

        {/* Main Scenic Content Stage with Ken Burns Panning */}
        <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`chapter-bg-${activeChapter.id}`}
              initial={{ scale: 1.14, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={activeChapter.image}
                alt={activeChapter.title}
                className="w-full h-full object-cover brightness-[0.75] contrast-[1.12]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#000]/40 backdrop-brightness-95" />
            </motion.div>
          </AnimatePresence>

          {/* Foreground Animated Storytelling Content */}
          <div className="relative z-30 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
            <AnimatePresence mode="wait">
              {currentChapter < 3 ? (
                // Chapters 0, 1, 2: The Wonders of Egypt
                <motion.div
                  key={`content-${activeChapter.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Location Eyebrow */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/50 bg-black/60 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span className="text-[0.68rem] sm:text-xs font-semibold tracking-[0.25em] text-[#FFD700] uppercase font-mono">
                      {activeChapter.tag}
                    </span>
                  </div>

                  {/* Monumental Chapter Title */}
                  <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                    {activeChapter.title}
                  </h1>

                  {/* Descriptive Subtitle */}
                  <p className="text-base sm:text-xl md:text-2xl text-zinc-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
                    {activeChapter.subtitle}
                  </p>

                  {/* Poetic Quote & Coordinates */}
                  <div className="pt-2 text-xs sm:text-sm text-[#FFD700]/90 italic font-serif tracking-wide">
                    {activeChapter.quote}
                  </div>

                  <div className="text-[0.7rem] text-zinc-400 font-mono tracking-widest pt-1">
                    {activeChapter.location}
                  </div>
                </motion.div>
              ) : (
                // Chapter 3: Climax Brand Reveal
                <motion.div
                  key="content-climax"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center space-y-5 sm:space-y-6"
                >
                  {/* Glowing Iconic Emblem */}
                  <div className="relative group">
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] opacity-50 blur-xl animate-pulse" />
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#FFD700] p-1 bg-[#141414] shadow-[0_0_40px_rgba(212,175,55,0.7)] flex items-center justify-center overflow-hidden">
                      <img
                        src={egytoursLogo}
                        alt="EGY TOUR Official Emblem"
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Monumental Brand Typography */}
                  <div>
                    <span className="text-[0.7rem] sm:text-xs text-[#FFD700] tracking-[0.3em] uppercase font-bold font-mono block mb-1">
                      WELCOME TO THE ADVENTURE
                    </span>
                    <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-black tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-white bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
                      EGY TOUR
                    </h1>
                  </div>

                  <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
                    Hurghada Red Sea • Cairo Pyramids • Luxor Temples • Sahara Safari
                  </p>

                  {/* Primary Enter Action Button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#AA7C11] text-black font-heading font-black text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:shadow-[0_0_50px_rgba(255,215,0,0.9)] hover:scale-105 active:scale-95"
                    >
                      <Compass className="w-5 h-5 transition-transform group-hover:rotate-45" />
                      <span>Explore Excursions</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentChapter(0);
                        setProgress(0);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[#D4AF37] text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Replay Trailer</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Anamorphic Widescreen Cinema Letterbox: Bottom Bar */}
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-40 w-full h-16 sm:h-24 bg-black/95 border-t border-[#D4AF37]/20 backdrop-blur-md px-4 sm:px-8 flex flex-col justify-center"
        >
          {/* Continuous Gold Hairline Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] transition-all duration-75 shadow-[0_0_8px_rgba(255,215,0,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Play/Pause Control */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#D4AF37] flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Pause className="w-3.5 h-3.5" />
                )}
              </button>
              <span className="text-[0.65rem] text-zinc-400 font-mono hidden sm:inline">
                SCENE {currentChapter + 1} OF {CHAPTERS.length}
              </span>
            </div>

            {/* Chapter Navigation Tabs */}
            <div className="flex items-center gap-2 sm:gap-4">
              {CHAPTERS.map((ch, idx) => {
                const isActive = currentChapter === idx;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      setCurrentChapter(idx);
                      setProgress(0);
                    }}
                    className={`group flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full text-xs transition-all ${
                      isActive
                        ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFD700] font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                        : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                    }`}
                  >
                    <span className="font-mono text-[0.65rem]">0{idx + 1}</span>
                    <span className="hidden md:inline text-[0.7rem] uppercase tracking-wider">
                      {ch.id === 0
                        ? 'Pyramids'
                        : ch.id === 1
                        ? 'Red Sea'
                        : ch.id === 2
                        ? 'Sahara'
                        : 'EGY TOUR'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Enter CTA */}
            <button
              type="button"
              onClick={handleClose}
              className="text-xs font-semibold text-zinc-400 hover:text-[#FFD700] transition-colors flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Enter Site</span>
              <Compass className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
