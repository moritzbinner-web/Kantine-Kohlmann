import Image from 'next/image';
import HeroVideo from '@/components/HeroVideo';
import Link from 'next/link';
import { getBlurDataURL } from '@/lib/blur';
import GalleryGrid from '@/components/GalleryGrid';
import ParallaxSection from '@/components/ParallaxSection';
import MagneticButton from '@/components/MagneticButton';
import MenuSection from '@/components/MenuSection';
import { getSiteModel } from '@/lib/site-model';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Saint Gennaro 081 – Cucina Napoletana Berlin',
  description:
    'Authentische napoletanische Küche, handgemachte Pizza und Pasta in Berlin Kreuzberg.',
};

export default async function RestaurantPage() {
  const restaurantData = (await getSiteModel()).restaurant;
  const heroBlur = await getBlurDataURL(restaurantData.hero.imageSrc);

  const galleryWithBlur = await Promise.all(
    restaurantData.gallery.map(async (item) => ({
      ...item,
      blurDataURL: await getBlurDataURL(item.src),
    }))
  );

  const { hero, about, menu } = restaurantData;

  return (
    <div
      className="min-h-screen"
      style={{ background: 'radial-gradient(ellipse 120% 30% at 50% 100%, #051024 0%, #080808 45%)' }}
    >

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 py-5 px-8 md:px-14 flex items-center justify-between"
        style={{
          background: 'rgba(10,10,10,0.75)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(240,236,230,0.06)',
        }}
      >
        <Link
          href="/"
          className="transition-opacity hover:opacity-60"
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(240,236,230,0.5)',
          }}
        >
          ← Back
        </Link>
        <span
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: '#f0ece6',
            letterSpacing: '0.04em',
          }}
        >
          Saint Gennaro 081
        </span>
        <span
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(240,236,230,0.25)',
          }}
        >
          Ristorante
        </span>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[100dvh] overflow-hidden">
        <HeroVideo src={hero.videoPlaceholder} />

        {/* Fallback image with blur-up */}
        <div className="absolute inset-0">
          <Image
            src={hero.imageSrc}
            alt="Saint Gennaro 081"
            fill priority
            sizes="100vw"
            className={`object-cover ${hero.videoPlaceholder ? "opacity-0" : ""}`}
            placeholder="blur"
            blurDataURL={heroBlur}
          />
        </div>

        {/* Deep bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.5) 45%, transparent 100%)',
          }}
        />
        {/* Light top gradient for nav legibility */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '25%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
          }}
        />

        {/* Hero text — absolute bottom-left per design brief */}
        <div className="absolute bottom-12 left-12 right-12 md:right-auto md:max-w-xl z-10">
          <span
            className="block mb-4"
            style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.58rem',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Cucina Napoletana · Berlin Kreuzberg
          </span>
          <h1
            className="text-white mb-6"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(3.5rem, 7vw, 7rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            {hero.headline}
          </h1>
          <p
            className="mb-10"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.05em',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            {hero.subline}
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton href="#menu" variant="restaurant">Speisekarte</MagneticButton>
            <MagneticButton href="#gallery" variant="outline">Galerie</MagneticButton>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-12 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-10 bg-gradient-to-b from-white/35 to-transparent" />
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.5rem', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            Scroll
          </span>
        </div>
      </section>

      {/* ── Parallax about section ────────────────────────────────────────── */}
      <ParallaxSection
        imageSrc={restaurantData.gallery[4].src}
        imageAlt="Restaurant Atmosphäre"
        blurDataURL={galleryWithBlur[4]?.blurDataURL}
        headline={about.headline}
        body={about.text}
        theme="restaurant"
      />

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      <section id="gallery" style={{ background: '#0d0d0d' }} className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 grid grid-cols-3 gap-6">
            <div>
              <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(240,236,230,0.3)' }}>
                La Galleria
              </span>
            </div>
            <div className="col-span-2">
              <h2
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 400,
                  color: '#f0ece6',
                  letterSpacing: '-0.01em',
                }}
              >
                Il Nostro Spazio
              </h2>
            </div>
          </div>
          <GalleryGrid items={galleryWithBlur} theme="restaurant" />
        </div>
      </section>

      {/* ── Editorial Menu ────────────────────────────────────────────────── */}
      <MenuSection categories={menu.categories} />

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        style={{ background: '#080808', borderTop: '1px solid rgba(240,236,230,0.06)' }}
        className="py-16 px-8 text-center"
      >
        <span
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '1.6rem',
            fontStyle: 'italic',
            color: '#f0ece6',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          Saint Gennaro 081
        </span>
        <p
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(240,236,230,0.3)',
            marginBottom: '2rem',
          }}
        >
          {restaurantData.contact.address}
        </p>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(240,236,230,0.4)',
          }}
          className="hover:opacity-70 transition-opacity"
        >
          ← Zur Startseite
        </Link>
      </footer>
    </div>
  );
}
