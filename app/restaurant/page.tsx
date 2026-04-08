import Image from 'next/image';
import Link from 'next/link';
import { getBlurDataURL } from '@/lib/blur';
import GalleryGrid from '@/components/GalleryGrid';
import ParallaxSection from '@/components/ParallaxSection';
import MagneticButton from '@/components/MagneticButton';
import restaurantData from '@/data/restaurant.json';

export const metadata = {
  title: 'Saint Gennaro 081 – Cucina Napoletana Berlin',
  description:
    'Authentische napoletanische Küche, handgemachte Pizza und Pasta in Berlin Kreuzberg.',
};

export default async function RestaurantPage() {
  // Generate blur placeholders server-side
  const heroBlur = await getBlurDataURL(restaurantData.hero.imageSrc);

  const galleryWithBlur = await Promise.all(
    restaurantData.gallery.map(async (item) => ({
      ...item,
      blurDataURL: await getBlurDataURL(item.src),
    }))
  );

  const { hero, about, menu } = restaurantData;

  return (
    <div className="bg-[#0F1B42] min-h-screen">
      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 glass-rest py-4 px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="label-luxury text-[#C8A84B] text-[0.65rem] tracking-[0.3em] hover:text-[#E2C97E] transition-colors"
        >
          ← Zurück
        </Link>
        <span className="heading-display text-[#F5F0E8] text-lg italic">
          Saint Gennaro 081
        </span>
        <span className="label-luxury text-[#C8A84B]/60 text-[0.65rem] tracking-[0.3em]">
          Ristorante
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
            alt="Saint Gennaro 081 Restaurant"
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
            <div className="border-ornament-rest w-48 mx-auto mb-8" />
            <span className="label-luxury text-[#C8A84B] block mb-4 tracking-[0.5em]">
              Cucina Napoletana · Berlin Kreuzberg
            </span>
            <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-[#F5F0E8] mb-4 italic">
              {hero.headline}
            </h1>
            <p className="heading-serif text-xl text-[#F5F0E8]/70 mb-10">
              {hero.subline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="#menu" variant="restaurant">
                Speisekarte
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
        imageSrc={restaurantData.gallery[4].src}
        imageAlt="Restaurant Atmosphäre"
        blurDataURL={galleryWithBlur[4]?.blurDataURL}
        headline={about.headline}
        body={about.text}
        theme="restaurant"
      />

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      <section id="gallery" className="bg-[#0F1B42] py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="border-ornament-rest w-32 mx-auto mb-6" />
            <span className="label-luxury text-[#C8A84B] block mb-3">La Galleria</span>
            <h2 className="heading-display text-4xl md:text-5xl text-[#F5F0E8]">
              Il Nostro Spazio
            </h2>
          </div>
          <GalleryGrid items={galleryWithBlur} theme="restaurant" />
        </div>
      </section>

      {/* ── Menu ─────────────────────────────────────────────────────────── */}
      <section id="menu" className="bg-[#0A1230] py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="border-ornament-rest w-32 mx-auto mb-6" />
            <span className="label-luxury text-[#C8A84B] block mb-3">La Nostra Cucina</span>
            <h2 className="heading-display text-4xl md:text-5xl text-[#F5F0E8] italic">
              Speisekarte
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {menu.categories.map((category) => (
              <div key={category.kategorie} className="border-b border-[#C8A84B]/20 pb-8">
                <h3 className="label-luxury text-[#C8A84B] text-[0.7rem] mb-4 block">
                  {category.kategorie}
                </h3>
                <ul className="space-y-2">
                  {category.eintraege.map((item) => (
                    <li
                      key={item}
                      className="heading-serif text-[#F5F0E8]/80 text-base flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C8A84B]/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#0F1B42] border-t border-[#C8A84B]/20 py-16 px-6 text-center">
        <div className="border-ornament-rest w-24 mx-auto mb-8" />
        <span className="heading-display text-2xl text-[#F5F0E8] italic block mb-2">
          Saint Gennaro 081
        </span>
        <p className="label-luxury text-[#C8A84B]/60 text-[0.65rem] tracking-[0.3em] mb-6">
          {restaurantData.contact.address}
        </p>
        <Link
          href="/"
          className="label-luxury text-[#C8A84B] text-[0.65rem] tracking-[0.3em] hover:text-[#E2C97E] transition-colors"
        >
          ← Zur Startseite
        </Link>
      </footer>
    </div>
  );
}
