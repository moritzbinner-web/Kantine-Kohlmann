'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import indexData from '@/data/index.json';

// ─── Video source ─────────────────────────────────────────────────────────────
// Once your file is in /public/videos/, change this constant to:
// const heroVideoSrc = "/videos/dein-video-loop.mp4";
const heroVideoSrc = indexData.hero_section.background_video_placeholder;

export default function Home() {
  const [hovered, setHovered] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { left, right } = indexData.hero_section.split_preview;

  return (
    <main
      ref={containerRef}
      className="relative h-[100dvh] overflow-hidden bg-black select-none"
    >
      {/* ── Full-screen background video ────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideoSrc} type="video/mp4" />
      </video>

      {/* ── Dark base overlay ────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ── Animated center divider ─────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 origin-center z-10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Left panel – Restaurant ──────────────────────────────────────── */}
      <Link
        href={left.link_to}
        className="absolute inset-y-0 left-0 w-1/2 group block"
        onMouseEnter={() => setHovered('left')}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Color tint on hover */}
        <motion.div
          className="absolute inset-0 bg-[#1B2F6B]"
          animate={{ opacity: hovered === 'left' ? 0.45 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Glassmorphism content box */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[min(360px,85%)] glass-rest p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border-ornament-rest" />
          <span className="label-luxury text-[#C8A84B] mb-3 block">Restaurant</span>
          <h2 className="heading-display text-3xl md:text-4xl text-[#F5F0E8] mb-4">
            Saint Gennaro 081
          </h2>
          <p className="heading-serif text-sm text-[#F5F0E8]/75 mb-6 italic">
            {left.hover_text}
          </p>
          <motion.div
            className="flex items-center gap-2 label-luxury text-[#C8A84B] text-[0.7rem]"
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Entdecken <span className="ml-1">→</span>
          </motion.div>
        </motion.div>
      </Link>

      {/* ── Right panel – Bar ────────────────────────────────────────────── */}
      <Link
        href={right.link_to}
        className="absolute inset-y-0 right-0 w-1/2 group block"
        onMouseEnter={() => setHovered('right')}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Color tint on hover */}
        <motion.div
          className="absolute inset-0 bg-[#1A3320]"
          animate={{ opacity: hovered === 'right' ? 0.45 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Glassmorphism content box */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[min(360px,85%)] glass-bar p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#C4A47C] to-transparent mb-6" />
          <span className="label-luxury text-[#C4A47C] mb-3 block">Bar</span>
          <h2 className="heading-display text-3xl md:text-4xl text-[#F2EDE4] mb-4">
            Kantine Kohlmann
          </h2>
          <p className="heading-serif text-sm text-[#F2EDE4]/75 mb-6 italic">
            {right.hover_text}
          </p>
          <motion.div
            className="flex items-center gap-2 label-luxury text-[#C4A47C] text-[0.7rem]"
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Entdecken <span className="ml-1">→</span>
          </motion.div>
        </motion.div>
      </Link>

      {/* ── Central wordmark ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence>
          {hovered === null && (
            <motion.div
              key="wordmark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <span className="label-luxury text-white/60 tracking-[0.5em] text-[0.65rem]">
                Berlin · Kreuzberg
              </span>
              <div className="h-px w-12 bg-white/30 mx-auto my-3" />
              <span className="label-luxury text-white/40 text-[0.6rem] tracking-[0.3em] block">
                Skalitzer Str. 64
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Bottom address ───────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <p className="label-luxury text-white/40 text-[0.6rem] tracking-[0.35em] text-center">
          {indexData.contact.address}
        </p>
      </motion.div>
    </main>
  );
}
