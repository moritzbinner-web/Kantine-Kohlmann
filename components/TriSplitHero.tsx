'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export interface PanelData {
  id:        string;
  href:      string;
  image:     string;
  blurData:  string;
  badge:     string;       // e.g. "Restaurant"
  titleA:    string;       // first line of big headline
  titleB:    string;       // second line
  cta1Label: string;
  cta1Href:  string;
  cta2Label: string;
  cta2Href:  string;
}

interface Props {
  panels: PanelData[];
  loaded: boolean;
}

// Flex values driven purely by CSS transition (smoother than Framer Motion for flex)
function panelFlex(hovered: number | null, index: number): number {
  if (hovered === null) return 1;
  return hovered === index ? 1.6 : 0.7;
}

const FLEX_TRANSITION = 'flex 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const FILTER_TRANSITION = 'filter 0.6s ease, opacity 0.6s ease';

export default function TriSplitHero({ panels, loaded }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      className="flex flex-row h-[100dvh] w-full overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.01 }} // instant — strips handle the reveal
    >
      {panels.map((panel, i) => {
        const isHov = hovered === i;
        const isDimmed = hovered !== null && !isHov;

        return (
          <Link
            key={panel.id}
            href={panel.href}
            style={{
              flex: panelFlex(hovered, i),
              transition: FLEX_TRANSITION,
              position: 'relative',
              overflow: 'hidden',
              display: 'block',
              minWidth: 0,
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* ── Background image ──────────────────────────────────────── */}
            <div
              className="absolute inset-0"
              style={{
                filter: isDimmed ? 'brightness(0.38) grayscale(0.4)' : 'brightness(1) grayscale(0)',
                transition: FILTER_TRANSITION,
              }}
            >
              <Image
                src={panel.image}
                alt={panel.badge}
                fill
                priority
                sizes="33vw"
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL={panel.blurData}
              />
            </div>

            {/* ── Bottom gradient (covers lower 45%) ────────────────────── */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: '65%',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 40%, transparent 100%)',
              }}
            />

            {/* ── Thin vertical separator ───────────────────────────────── */}
            {i < panels.length - 1 && (
              <div
                className="absolute top-0 right-0 w-px h-full pointer-events-none z-10"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              />
            )}

            {/* ── Text block — absolute bottom ──────────────────────────── */}
            <div className="absolute bottom-12 left-12 right-12 z-10">
              {/* Badge */}
              <motion.span
                className="block mb-4 text-white/50 uppercase"
                style={{
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.45em',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {panel.badge}
              </motion.span>

              {/* Headline — two lines, large serif */}
              <motion.h2
                className="text-white leading-[0.95] mb-7"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 18 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {panel.titleA}
                <br />
                {panel.titleB}
              </motion.h2>

              {/* CTAs */}
              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
                transition={{ delay: 0.35 + i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span
                  className="text-white hover:text-white/70 transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-jost)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    textDecorationColor: 'rgba(255,255,255,0.3)',
                  }}
                >
                  {panel.cta1Label}
                </span>
                <span
                  className="text-white/60 hover:text-white/90 transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-jost)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    textDecorationColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  {panel.cta2Label}
                </span>
              </motion.div>
            </div>
          </Link>
        );
      })}
    </motion.div>
  );
}
