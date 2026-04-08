'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface GalleryItem {
  src: string;
  alt: string;
  blurDataURL?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  theme?: 'restaurant' | 'bar';
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function GalleryGrid({ items, theme = 'restaurant' }: GalleryGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
    >
      {items.map((item, i) => (
        <motion.div
          key={`${item.src}-${i}`}
          variants={itemVariants}
          className={`gallery-card aspect-[4/3] ${
            i % 5 === 0 ? 'col-span-2 aspect-[16/9]' : ''
          }`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
            placeholder={item.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={item.blurDataURL}
          />
          <div
            className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-4 ${
              theme === 'restaurant'
                ? 'bg-gradient-to-t from-[#0F1B42]/80 to-transparent'
                : 'bg-gradient-to-t from-[#1A3320]/80 to-transparent'
            }`}
          >
            <span
              className="text-white text-xs tracking-[0.2em] uppercase font-[var(--font-jost)]"
            >
              {item.alt}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
