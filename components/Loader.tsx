'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const COUNT_DURATION_MS = 2500; // 0→100 in 2.5 s
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const controls = useAnimationControls();

  const slideUp = useCallback(async () => {
    await controls.start({
      y: '-100%',
      transition: { duration: 0.85, ease: EASE },
    });
    onComplete();
  }, [controls, onComplete]);

  // Smooth counter: requestAnimationFrame for 60fps fluidity
  useEffect(() => {
    let start: number | null = null;
    let raf: number;

    function step(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / COUNT_DURATION_MS, 1);
      // Ease-out cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(100);
        // Brief pause at 100% then slide up
        setTimeout(slideUp, 300);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [slideUp]);

  return (
    <motion.div
      animate={controls}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Wordmark block ────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-0 select-none">

        {/* Top label */}
        <motion.span
          className="block text-white/30 uppercase mb-8"
          style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.55em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Berlin · Kreuzberg
        </motion.span>

        {/* Primary name */}
        <motion.span
          className="block text-white"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.08em',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Kantine Kohlmann
        </motion.span>

        {/* Separator × */}
        <motion.span
          className="block text-white/20 my-5"
          style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', letterSpacing: '0.4em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          ×
        </motion.span>

        {/* Secondary name */}
        <motion.span
          className="block text-white/80"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
            fontWeight: 400,
            letterSpacing: '0.12em',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Saint Gennaro 081
        </motion.span>

        {/* Counter */}
        <motion.div
          className="mt-14 flex items-baseline gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span
            className="tabular-nums text-white/40"
            style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.72rem',
              fontWeight: 300,
              letterSpacing: '0.1em',
            }}
          >
            {String(count).padStart(3, '\u2007')}
          </span>
          <span
            className="text-white/25"
            style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.1em' }}
          >
            %
          </span>
        </motion.div>

        {/* Progress bar */}
        <div className="mt-4 w-32 h-px bg-white/10 overflow-hidden">
          <div
            className="h-full bg-white/40 transition-none"
            style={{ width: `${count}%`, transition: 'none' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
