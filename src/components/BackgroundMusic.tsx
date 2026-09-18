import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Pause, Play, Music, Disc } from 'lucide-react';

interface BackgroundMusicProps {
  isIntroOpen?: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isIntroOpen = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.35);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef<boolean>(false);
  const fadeIntervalRef = useRef<number | null>(null);

  // Smooth fade-in volume helper
  const fadeInAudio = useCallback((targetVol = 0.35) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    audioRef.current.volume = 0;
    const step = targetVol / 15;
    let current = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) return;
      current = Math.min(targetVol, current + step);
      audioRef.current.volume = current;
      if (current >= targetVol && fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    }, 60);
  }, []);

  // Initialize and handle automatic autoplay with browser interaction fallback
  useEffect(() => {
    const audio = new Audio('/audio/helwa_ya_baladi.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.35;
    audioRef.current = audio;

    audio.onerror = () => {
      if (audio.src.includes('/audio/')) {
        audio.src = '/helwa_ya_baladi.mp3';
        audio.load();
        if (!userPausedRef.current) {
          audio.play().catch(() => {});
        }
      }
    };

    const playAudio = async () => {
      try {
        if (userPausedRef.current) return;
        await audio.play();
        setIsPlaying(true);
        setHasStarted(true);
        fadeInAudio(volume);
        cleanupInteractionListeners();
      } catch {
        // Autoplay policy prevented immediate playback; listeners will activate on first touch/interaction
      }
    };

    const handleInteraction = () => {
      if (!userPausedRef.current) {
        playAudio();
      }
    };

    const interactionEvents: (keyof WindowEventMap)[] = [
      'click',
      'touchstart',
      'touchend',
      'pointerdown',
      'scroll',
      'keydown'
    ];

    const cleanupInteractionListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleInteraction);
      });
    };

    // 1. Try immediate autoplay
    playAudio();

    // 2. Attach one-time listeners for first user interaction if browser blocked immediate autoplay
    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleInteraction, { passive: true, once: true });
    });

    return () => {
      cleanupInteractionListeners();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = '';
    };
  }, [fadeInAudio, volume]);

  // Pause when Cinematic Video Intro is active to avoid audio conflict
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isIntroOpen) {
      if (!audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    } else if (hasStarted && !userPausedRef.current) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [isIntroOpen, hasStarted]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      userPausedRef.current = true;
    } else {
      userPausedRef.current = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
          if (audio.volume === 0) {
            fadeInAudio(volume);
          }
        })
        .catch((err) => console.warn('Audio play request failed:', err));
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
      audio.volume = volume;
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <div
      id="bg-music-player"
      className="fixed bottom-20 sm:bottom-24 left-4 sm:left-6 [dir='rtl']:left-auto [dir='rtl']:right-4 sm:[dir='rtl']:right-6 z-40 select-none"
    >
      <div
        className={`group relative flex items-center gap-2 p-1.5 rounded-full border transition-all duration-500 backdrop-blur-md shadow-xl ${
          isPlaying
            ? 'bg-[#12100a]/90 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
            : 'bg-[#121212]/85 border-zinc-700/60 hover:border-[#D4AF37]/60'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Compact Disc / Play Icon Button */}
        <button
          type="button"
          onClick={togglePlay}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-tr from-[#B38728] via-[#FBF5B7] to-[#DAA520] text-black shadow-[0_0_10px_rgba(255,215,0,0.5)]'
              : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700'
          }`}
          title={isPlaying ? 'Pause Background Music (Dalida)' : 'Play Background Music (Dalida)'}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          {isPlaying ? (
            <Disc className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
          ) : (
            <Play className="w-4 h-4 ml-0.5 text-zinc-300" />
          )}
        </button>

        {/* Music Metadata & Equalizer */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 pr-1.5 sm:pr-2.5 cursor-pointer min-w-0"
        >
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[0.68rem] sm:text-xs font-bold bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-white bg-clip-text text-transparent truncate max-w-[110px] sm:max-w-[150px]">
                Helwa Ya Baladi
              </span>
              <span className="text-[0.55rem] px-1 py-0.2 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFD700] font-mono hidden xs:inline">
                Dalida
              </span>
            </div>
            <span className="text-[0.55rem] sm:text-[0.58rem] text-zinc-400 font-arabic truncate">
              حلوة يا بلدي • Egyptian Classic
            </span>
          </div>

          {/* Animated Gold Audio Equalizer Bars */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-2.5 px-0.5">
              <span className="w-0.5 bg-[#FFD700] rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2.5" />
              <span className="w-0.5 bg-[#D4AF37] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.2s] h-1.5" />
              <span className="w-0.5 bg-[#FFD700] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.4s] h-2" />
              <span className="w-0.5 bg-[#FBF5B7] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.1s] h-1.5" />
            </div>
          )}
        </div>

        {/* Expanded Controls (Volume slider + Mute toggle) */}
        <div
          className={`flex items-center gap-1.5 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-w-[130px] opacity-100 pr-1.5' : 'max-w-0 opacity-0 pr-0'
          }`}
        >
          <button
            type="button"
            onClick={toggleMute}
            className="text-zinc-400 hover:text-[#FFD700] transition-colors p-0.5 cursor-pointer flex-shrink-0"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#FFD700]" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-14 sm:w-16 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
            title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            aria-label="Volume slider"
          />
        </div>
      </div>
    </div>
  );
};
