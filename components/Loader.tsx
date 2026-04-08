'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

// Timing constants (seconds)
const TEXT_DURATION = 2.6;
const STRIP_START  = 2.0;
const STRIP_DUR    = 0.9;
const STRIP_STAGGER = 0.08;
// Final strip done at: STRIP_START + 2*STRIP_STAGGER + STRIP_DUR
const DONE_AFTER_MS = (STRIP_START + 2 * STRIP_STAGGER + STRIP_DUR + 0.05) * 1000;

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    const t = setTimeout(onComplete, DONE_AFTER_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex pointer-events-none overflow-hidden">
      {/* ── Wordmark ──────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: TEXT_DURATION,
          times: [0, 0.2, 0.65, 1],
          ease: 'easeInOut',
        }}
      >
        <span
          className="block text-[0.6rem] text-white/40 uppercase"
          style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.55em' }}
        >
          Berlin · Kreuzberg
        </span>

        <span
          className="block text-[clamp(2rem,5vw,3.5rem)] text-white font-light italic"
          style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '0.12em' }}
        >
          Kantine Kohlmann
        </span>

        <div className="w-10 h-px bg-white/25" />

        <span
          className="block text-[0.55rem] text-white/25 uppercase"
          style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.5em' }}
        >
          Restaurant · Bar · Events
        </span>
      </motion.div>

      {/* ── 3 vertical strips that slide upward to reveal tri-split ───────── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="flex-1 bg-[#0a0a0a]"
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{
            delay: STRIP_START + i * STRIP_STAGGER,
            duration: STRIP_DUR,
            ease: EASE,
          }}
        />
      ))}
    </div>
  );
}
