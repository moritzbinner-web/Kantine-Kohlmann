'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'restaurant' | 'bar' | 'outline';
  className?: string;
}

export default function MagneticButton({
  href,
  onClick,
  children,
  variant = 'outline',
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  }

  function handleLeave() {
    setPosition({ x: 0, y: 0 });
  }

  const variantClass =
    variant === 'restaurant'
      ? 'bg-[#C8A84B] text-[#0F1B42] font-medium'
      : variant === 'bar'
      ? 'border border-[#C4A47C] text-[#E8D9C0] hover:bg-[#C4A47C]/10'
      : 'border border-white/40 text-white hover:bg-white/10';

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`btn-magnetic inline-flex items-center justify-center px-10 py-4 font-[var(--font-jost)] text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${variantClass} ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className="cursor-pointer">
      {content}
    </button>
  );
}
