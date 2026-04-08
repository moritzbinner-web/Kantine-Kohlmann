import Image from 'next/image';
import Link from 'next/link';
import { getBlurDataURL } from '@/lib/blur';
import GalleryGrid from '@/components/GalleryGrid';
import ParallaxSection from '@/components/ParallaxSection';
import MagneticButton from '@/components/MagneticButton';
import barData from '@/data/bar.json';

export const metadata = {
  title: 'Kantine Kohlmann Bar – Cocktails & Wein Berlin Kreuzberg',
  description:
    'Gemütliche Atmosphäre, exzellente Weine und perfekt gemixte Cocktails in Berlin Kreuzberg.',
};

export default async function BarPage() {
  const heroBlur = await getBlurDataURL(barData.hero.imageSrc);

  const galleryWithBlur = await Promise.all(
    barData.gallery.map(async (item) => ({
      ...item,
      blurDataURL: await getBlurDataURL(item.src),
    }))
  );

  const { hero, about } = barData;

  return (
    <div className="bg-[#1A3320] min-h-screen">
      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 glass-bar py-4 px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="label-luxury text-[#C4A47C] text-[0.65rem] tracking-[0.3em] hover:text-[#E8D9C0] transition-colors"
        >
          ← Zurück
        </Link>
        <span className="heading-display text-[#F2EDE4] text-lg">
          Kantine Kohlmann
        </span>
        <span className="label-luxury text-[#C4A47C]/60 text-[0.65rem] tracking-[0.3em]">
          Bar
        </span>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[100dvh] overflow-hidden">
        {/* Hero video (falls back to placeholder if local file missing) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={hero.videoPlaceholder} type="video/mp4" />
        </video>

        {/* Fallback image with blur-up */}
        <div className="absolute inset-0">
          <Image
            src={hero.imageSrc}
            alt="Kantine Kohlmann Bar"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-0"
            placeholder="blur"
            blurDataURL={heroBlur}
          />
        </div>

        <div className="video-overlay" />

        {/* Hero content */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C4A47C] to-transparent mx-auto mb-8" />
            <span className="label-luxury text-[#C4A47C] block mb-4 tracking-[0.5em]">
              Bar · Cocktails · Naturwein
            </span>
            <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-[#F2EDE4] mb-4">
              {hero.headline}
            </h1>
            <p className="heading-serif text-xl text-[#F2EDE4]/70 mb-10 italic">
              {hero.subline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="#drinks" variant="bar">
                Getränkekarte
              </MagneticButton>
              <MagneticButton href="#gallery" variant="outline">
                Galerie ansehen
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="label-luxury text-white/40 text-[0.6rem]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── About / Parallax Section ─────────────────────────────────────── */}
      <ParallaxSection
        imageSrc={barData.gallery[0].src}
        imageAlt="Kantine Kohlmann Bar Atmosphäre"
        blurDataURL={galleryWithBlur[0]?.blurDataURL}
        headline={about.headline}
        body={about.text}
        theme="bar"
        reverse
      />

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      <section id="gallery" className="bg-[#1A3320] py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C4A47C] to-transparent mx-auto mb-6" />
            <span className="label-luxury text-[#C4A47C] block mb-3">La Galleria</span>
            <h2 className="heading-display text-4xl md:text-5xl text-[#F2EDE4]">
              Die Bar
            </h2>
          </div>
          <GalleryGrid items={galleryWithBlur} theme="bar" />
        </div>
      </section>

      {/* ── Drinks Highlights ────────────────────────────────────────────── */}
      <section id="drinks" className="bg-[#142A1A] py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C4A47C] to-transparent mx-auto mb-6" />
          <span className="label-luxury text-[#C4A47C] block mb-4">Signature Cocktails</span>
          <h2 className="heading-display text-4xl md:text-5xl text-[#F2EDE4] mb-16">
            Il Aperitivo
          </h2>
          <div className="grid gap-6">
            {barData.drink_highlights.map((drink) => (
              <div
                key={drink.name}
                className="flex items-center justify-between border-b border-[#C4A47C]/20 pb-6"
              >
                <span className="heading-serif text-2xl text-[#F2EDE4]">{drink.name}</span>
                <span className="label-luxury text-[#C4A47C]/70 text-[0.65rem]">
                  {drink.category}
                </span>
              </div>
            ))}
          </div>
          <p className="heading-serif text-[#F2EDE4]/50 mt-12 italic text-sm">
            Weitere Drinks auf Anfrage oder per QR-Code
          </p>
        </div>
      </section>

      {/* ── Events teaser ────────────────────────────────────────────────── */}
      {barData.events && (
        <section className="bg-[#1A3320] py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C4A47C] to-transparent mx-auto mb-8" />
            <span className="label-luxury text-[#C4A47C] block mb-4">Private Hire</span>
            <h2 className="heading-display text-3xl md:text-4xl text-[#F2EDE4] mb-6">
              {barData.events.label}
            </h2>
            <p className="heading-serif text-[#F2EDE4]/70 text-lg mb-10">
              {barData.events.teaser}
            </p>
            <MagneticButton href={barData.events.url} variant="bar">
              Mehr erfahren
            </MagneticButton>
          </div>
        </section>
      )}

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#142A1A] border-t border-[#C4A47C]/20 py-16 px-6 text-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C4A47C] to-transparent mx-auto mb-8" />
        <span className="heading-display text-2xl text-[#F2EDE4] block mb-2">
          Kantine Kohlmann Bar
        </span>
        <p className="label-luxury text-[#C4A47C]/60 text-[0.65rem] tracking-[0.3em] mb-6">
          {barData.contact.address}
        </p>
        <Link
          href="/"
          className="label-luxury text-[#C4A47C] text-[0.65rem] tracking-[0.3em] hover:text-[#E8D9C0] transition-colors"
        >
          ← Zur Startseite
        </Link>
      </footer>
    </div>
  );
}
