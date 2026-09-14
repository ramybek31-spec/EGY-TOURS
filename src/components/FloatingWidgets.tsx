import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowUp } from 'lucide-react';

export const FloatingWidgets: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isGeneratingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soothing ocean waves sound generator using Web Audio API
  const toggleSound = () => {
    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      setIsPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate pink noise for soft sea waves
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to simulate low ocean rumble
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      whiteNoise.start(0);

      // Low frequency oscillator for wave swells (in & out)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec per wave
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(150, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(0);

      gainNodeRef.current = gainNode;
      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio not allowed without gesture', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Ocean Ambient Sound Toggle Button */}
      <button
        type="button"
        onClick={toggleSound}
        className={`fixed bottom-20 sm:bottom-24 left-4 sm:left-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xl ${
          isPlaying
            ? 'bg-[#1b170c] border-[#FFD700] text-[#FFD700] shadow-[0_0_18px_rgba(212,175,55,0.4)] animate-pulse'
            : 'bg-[#111111]/85 border-[#D4AF37]/30 text-zinc-400 hover:text-white hover:border-[#D4AF37]'
        }`}
        title={isPlaying ? 'Mute Ocean Ambience' : 'Play Gentle Ocean Ambience'}
        aria-label="Toggle ocean sound"
      >
        {isPlaying ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 sm:bottom-8 right-20 sm:right-28 [dir='rtl']:right-auto [dir='rtl']:left-20 sm:[dir='rtl']:left-28 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141414]/90 border border-[#D4AF37]/40 text-[#FFD700] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xl hover:scale-105"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </>
  );
};
