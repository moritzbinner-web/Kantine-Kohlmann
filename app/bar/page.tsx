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

// Shared inline style tokens (dark palette)
const NAV_STYLE = {
  background: 'rgba(8,8,8,0.82)',
  backdropFilter: 'blur(18px)',
  borderBottom: '1px solid rgba(242,239,233,0.05)',
} as const;

const ACCENT = '#B8A98A'; // warm taupe

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
    // Dark base + barely-there forest gradient at very bottom
    <div
      className="min-h-screen"
      style={{
        background: 'radial-gradient(ellipse 120% 30% at 50% 100%, #021207 0%, #080808 45%)',
      }}
    >
      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 py-5 px-8 md:px-14 flex items-center justify-between" style={NAV_STYLE}>
        <Link href="/" className="transition-opacity hover:opacity-60"
          style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(242,239,233,0.45)' }}>
          ← Back
        </Link>
        <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem', color: '#F2EFE9', letterSpacing: '0.04em' }}>
          Kantine Kohlmann
        </span>
        <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(242,239,233,0.22)' }}>
          Bar
        </span>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[100dvh] overflow-hidden">
        <video autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover">
          <source src={hero.videoPlaceholder} type="video/mp4" />
        </video>
        <div className="absolute inset-0">
          <Image src={hero.imageSrc} alt="Kantine Kohlmann Bar" fill priority sizes="100vw"
            className="object-cover opacity-0" placeholder="blur" blurDataURL={heroBlur} />
        </div>

        <div className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: '65%', background: 'linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.5) 45%, transparent 100%)' }} />
        <div className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ height: '25%', background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 100%)' }} />

        {/* Text — absolute bottom-left */}
        <div className="absolute bottom-12 left-12 right-12 md:right-auto md:max-w-xl z-10">
          <span className="block mb-4"
            style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.55em', textTransform: 'uppercase', color: `${ACCENT}99` }}>
            Bar · Cocktails · Naturwein
          </span>
          <h1 className="text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(3.5rem, 7vw, 7rem)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            {hero.headline}
          </h1>
          <p className="mb-10"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: 'rgba(242,239,233,0.5)', letterSpacing: '0.06em', lineHeight: 1.75, fontStyle: 'italic' }}>
            {hero.subline}
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton href="#drinks" variant="bar">Getränkekarte</MagneticButton>
            <MagneticButton href="#gallery" variant="outline">Galerie</MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-8 right-12 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-10 bg-gradient-to-b from-white/35 to-transparent" />
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.5rem', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* ── Parallax about ────────────────────────────────────────────────── */}
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
      <section id="gallery" className="py-24 px-4 md:px-8" style={{ background: '#0d0d0d' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 grid grid-cols-3 gap-6">
            <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(242,239,233,0.28)' }}>
              La Galleria
            </span>
            <h2 className="col-span-2"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: '#F2EFE9', letterSpacing: '-0.01em' }}>
              Die Bar
            </h2>
          </div>
          <GalleryGrid items={galleryWithBlur} theme="bar" />
        </div>
      </section>

      {/* ── Drinks Highlights ────────────────────────────────────────────── */}
      <section id="drinks" className="py-24 px-8 md:px-14 lg:px-24" style={{ background: '#080808' }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <span className="block mb-4"
              style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(242,239,233,0.28)' }}>
              Signature Cocktails
            </span>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, color: '#F2EFE9', letterSpacing: '-0.01em', fontStyle: 'italic' }}>
              Il Aperitivo
            </h2>
          </div>
          <div>
            {barData.drink_highlights.map((drink) => (
              <div key={drink.name}
                className="flex items-center py-5"
                style={{ borderBottom: '1px solid rgba(242,239,233,0.07)' }}>
                {/* Dotted leader layout */}
                <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.05rem', color: '#F2EFE9' }}>
                  {drink.name}
                </span>
                <span className="flex-grow mx-4"
                  style={{ borderBottom: '1px dotted rgba(242,239,233,0.18)', marginBottom: '4px' }} />
                <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(242,239,233,0.4)', textTransform: 'uppercase' }}>
                  {drink.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events teaser ────────────────────────────────────────────────── */}
      {barData.events && (
        <section className="py-24 px-8 text-center" style={{ background: '#0d0d0d' }}>
          <div className="max-w-2xl mx-auto">
            <span className="block mb-4"
              style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(242,239,233,0.28)' }}>
              Private Hire
            </span>
            <h2 className="mb-6"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: '#F2EFE9' }}>
              {barData.events.label}
            </h2>
            <p className="mb-10"
              style={{ fontFamily: 'var(--font-jost)', fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.03em', color: 'rgba(242,239,233,0.45)', lineHeight: 1.8 }}>
              {barData.events.teaser}
            </p>
            <MagneticButton href={barData.events.url} variant="outline">Mehr erfahren</MagneticButton>
          </div>
        </section>
      )}

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-16 px-8 text-center"
        style={{ background: '#080808', borderTop: '1px solid rgba(242,239,233,0.06)' }}>
        <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem', color: '#F2EFE9', display: 'block', marginBottom: '0.5rem' }}>
          Kantine Kohlmann Bar
        </span>
        <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(242,239,233,0.28)', marginBottom: '2rem' }}>
          {barData.contact.address}
        </p>
        <Link href="/" className="hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(242,239,233,0.38)' }}>
          ← Zur Startseite
        </Link>
      </footer>
    </div>
  );
}
