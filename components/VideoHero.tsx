'use client';

import { useRef } from 'react';

interface VideoHeroProps {
  src: string;
  fallbackSrc?: string;
  poster?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function VideoHero({
  src,
  fallbackSrc,
  poster,
  children,
  className = '',
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use fallback if local file path starts with /videos/ (might not exist yet)
  const videoSrc = src.startsWith('/videos/') && fallbackSrc ? fallbackSrc : src;

  return (
    <div className={`video-hero ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="video-overlay" />
      {children}
    </div>
  );
}
