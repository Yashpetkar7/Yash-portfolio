import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { heroContent } from '../data/portfolioData';

const VIDEO_SRC = '/videos/intro.mp4';
const TEXT_SPLASH_DURATION_MS = 1900;
// If the video can't start playing this fast, fall back so first paint is never blocked
const VIDEO_READY_TIMEOUT_MS = 2500;

export default function IntroOverlay({ onDone }) {
  const [mode, setMode] = useState('video');
  const videoRef = useRef(null);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  const fallbackToText = useCallback(() => {
    setMode((current) => (current === 'video' ? 'text' : current));
  }, []);

  // Click or keypress skips the intro (modifier keys alone don't count)
  useEffect(() => {
    const onKeySkip = (e) => {
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;
      finish();
    };
    window.addEventListener('pointerdown', finish);
    window.addEventListener('keydown', onKeySkip);
    return () => {
      window.removeEventListener('pointerdown', finish);
      window.removeEventListener('keydown', onKeySkip);
    };
  }, [finish]);

  // Video lifecycle: keep nudging playback until it actually advances,
  // degrade to the text splash if it never does, and hard-cap the intro
  // so a stuck video can never hold the site hostage.
  useEffect(() => {
    if (mode !== 'video') return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const ensurePlaying = () => {
      if (!cancelled && video.paused) {
        // Rejections (StrictMode aborts, autoplay hiccups) are retried by the nudge loop
        video.play().catch(() => {});
      }
    };

    ensurePlaying();
    const nudgeTimer = setInterval(() => {
      if (cancelled || video.currentTime > 0.1) {
        clearInterval(nudgeTimer);
        return;
      }
      ensurePlaying();
    }, 400);

    // Playback never started (missing codec, blocked autoplay, dead renderer)
    const stallTimer = setTimeout(() => {
      if (!cancelled && video.currentTime < 0.2) fallbackToText();
    }, VIDEO_READY_TIMEOUT_MS);

    // Absolute cap: even if 'ended' never fires, release the visitor
    const capTimer = setTimeout(() => {
      if (!cancelled) finish();
    }, 15000);

    return () => {
      cancelled = true;
      clearInterval(nudgeTimer);
      clearTimeout(stallTimer);
      clearTimeout(capTimer);
    };
  }, [mode, fallbackToText, finish]);

  // Text fallback runs on a fixed timer
  useEffect(() => {
    if (mode !== 'text') return;
    const timer = setTimeout(finish, TEXT_SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [mode, finish]);

  const text = heroContent.fullName.toUpperCase().split('');

  return (
    <motion.div
      key="intro"
      className="fixed inset-0 z-[1000] pointer-events-none flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {mode === 'video' ? (
        <>
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            onEnded={finish}
            onError={fallbackToText}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Vignette keeps the overlaid labels readable on bright footage */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)' }}
          />
          <div className="absolute bottom-8 left-8 flex flex-col gap-1">
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-primary">
              {heroContent.fullName}
            </span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
              {heroContent.role}
            </span>
          </div>
        </>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <div className="flex space-x-[2px] md:space-x-1 mb-4">
            {text.map((char, i) => (
              <motion.span
                key={i}
                className={`font-mono text-sm sm:text-base md:text-xl lg:text-2xl text-primary font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase ${char === ' ' ? 'mr-4' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: 0.35 + (i * 0.04) }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="h-[1px] bg-primary w-[80%] max-w-4xl"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeInOut' }}
            style={{ originX: 0.5 }}
          />
        </div>
      )}

      <span
        className={`absolute font-mono text-[10px] tracking-[0.35em] uppercase text-white/30 animate-pulse-primary ${mode === 'video' ? 'bottom-8 right-8 text-right' : 'bottom-8'}`}
      >
        Click anywhere to skip
      </span>
    </motion.div>
  );
}
