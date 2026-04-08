'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxSectionProps {
  imageSrc: string;
  imageAlt: string;
  blurDataURL?: string;
  headline: string;
  body: string;
  theme?: 'restaurant' | 'bar';
  reverse?: boolean;
}

export default function ParallaxSection({
  imageSrc,
  imageAlt,
  blurDataURL,
  headline,
  body,
  theme = 'restaurant',
  reverse = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  const bgColor = theme === 'restaurant' ? 'bg-[#0F1B42]' : 'bg-[#1A3320]';
  const accentColor = theme === 'restaurant' ? 'text-[#C8A84B]' : 'text-[#C4A47C]';
  const textColor = theme === 'restaurant' ? 'text-[#F5F0E8]' : 'text-[#F2EDE4]';

  return (
    <section ref={ref} className={`relative overflow-hidden ${bgColor}`}>
      <div
        className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[70vh]`}
      >
        {/* Image side */}
        <div className="relative w-full md:w-1/2 overflow-hidden min-h-[50vh] md:min-h-0">
          <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              placeholder={blurDataURL ? 'blur' : 'empty'}
              blurDataURL={blurDataURL}
            />
          </motion.div>
        </div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full md:w-1/2 flex items-center justify-center p-12 md:p-20"
        >
          <div className="max-w-sm">
            {theme === 'restaurant' && (
              <div className="border-ornament-rest mb-8" />
            )}
            {theme === 'bar' && (
              <div className="border-b border-[#C4A47C]/40 mb-8 pb-0" />
            )}
            <span className={`label-luxury ${accentColor} block mb-4`}>
              {theme === 'restaurant' ? 'Il Nostro Ristorante' : 'La Nostra Bar'}
            </span>
            <h2
              className={`heading-display text-4xl md:text-5xl ${textColor} mb-6`}
            >
              {headline}
            </h2>
            <p
              className={`heading-serif text-lg leading-relaxed ${textColor}/80`}
            >
              {body}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
