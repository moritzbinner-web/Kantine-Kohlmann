import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getBlurDataURL } from '@/lib/blur';
import GalleryGrid from '@/components/GalleryGrid';
import MagneticButton from '@/components/MagneticButton';

export const metadata = {
  title: 'The Basement – Events & Private Hire · Kantine Kohlmann Berlin',
  description:
    'Exklusive Events, Firmenfeiern und Private Hire im Kantine Kohlmann Kreuzberg. The Basement — dein Ort für unvergessliche Nächte.',
};

const heroImage  = '/images/Event/Event5-1.jpg';
const heroImage2 = '/images/Event/Event4-1.jpg';

const eventGallery = [
  { src: '/images/Event/Event4-1.jpg',                    alt: 'Private Event' },
  { src: '/images/Event/Event5-1.jpg',                    alt: 'Abendveranstaltung' },
  { src: '/images/Event/event2-1.jpg',                    alt: 'Club Night' },
  { src: '/images/Event/KK_23072015_0613.jpg',            alt: 'Gala Abend' },
  { src: '/images/Event/KK_23072015_0586.jpg',            alt: 'Live Performance' },
  { src: '/images/Event/kantine_kohlmann_0279.jpg',       alt: 'DJ Set' },
  { src: '/images/Event/kantine_kohlmann_0297.jpg',       alt: 'Firmenfeier' },
  { src: '/images/Event/kantine_kohlmann_0323.jpg',       alt: 'Cocktail Reception' },
];

const formats = [
  {
    title: 'Private Hire',
    desc:  'Exklusiver Zugang zum gesamten Basement. Kapazität bis 120 Personen, vollständig kuratierte Bar, optionale DJ-Buchung und dediziertes Event-Team.',
  },
  {
    title: 'Firmenveranstaltungen',
    desc:  'Von Produktlaunches bis Teamevents — wir schaffen den Rahmen. Catering, Technik und Eventplanung aus einer Hand.',
  },
  {
    title: 'Kulturelle Abende',
    desc:  'Vernissagen, Buchpräsentationen, Live-Musik. Der Basement verwandelt sich in eine Bühne für zeitgenössische Kultur.',
  },
  {
    title: 'Verkostungsabende',
    desc:  'Geführte Wein- und Spirituosenverkostungen in kleiner Runde. Wissen, Genuss und Geselligkeit in einem exklusiven Rahmen.',
  },
];

export default async function EventsPage() {
  const heroBlur  = await getBlurDataURL(heroImage);
  const heroBlur2 = await getBlurDataURL(heroImage2);
  const galleryWithBlur = await Promise.all(
    eventGallery.map(async (g) => ({ ...g, blurDataURL: await getBlurDataURL(g.src) }))
  );

  return (
    <div style={{ background: '#0a0a0a' }} className="min-h-screen">

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
          style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(240,236,230,0.5)' }}
        >
          ← Back
        </Link>
        <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem', color: '#f0ece6', letterSpacing: '0.04em' }}>
          The Basement
        </span>
        <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(240,236,230,0.25)' }}>
          Events
        </span>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[100dvh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="The Basement Events"
            fill priority
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={heroBlur}
          />
        </div>

        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: '65%', background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.5) 45%, transparent 100%)' }}
        />
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ height: '25%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
        />

        {/* Hero text */}
        <div className="absolute bottom-12 left-12 right-12 md:right-auto md:max-w-xl z-10">
          <span
            className="block mb-4"
            style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}
          >
            Kantine Kohlmann · Kreuzberg
          </span>
          <h1
            className="text-white mb-6"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(4rem, 8vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
          >
            The<br />Basement
          </h1>
          <p
            className="mb-10"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', lineHeight: 1.75, fontStyle: 'italic' }}
          >
            Private Hire · Club Nights · Kulturelle Abende
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton href="#formats" variant="outline">Event-Formate</MagneticButton>
            <MagneticButton href="#gallery" variant="outline">Galerie</MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-8 right-12 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-10 bg-gradient-to-b from-white/35 to-transparent" />
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.5rem', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* ── Formats Grid ─────────────────────────────────────────────────── */}
      <section id="formats" style={{ background: '#0d0d0d' }} className="py-28 px-8 md:px-14 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-3 gap-6 mb-16">
            <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(240,236,230,0.3)' }}>
              Unsere Formate
            </span>
            <h2
              className="col-span-2 text-white"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 0.95 }}
            >
              Events &amp;<br />Private Hire
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {formats.map((f, i) => (
              <div
                key={f.title}
                className="p-10 md:p-12"
                style={{
                  background: i % 2 === 0 ? '#111' : '#0e0e0e',
                  borderBottom: '1px solid rgba(240,236,230,0.05)',
                  borderRight: i % 2 === 0 ? '1px solid rgba(240,236,230,0.05)' : 'none',
                }}
              >
                <span
                  className="block mb-3"
                  style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(240,236,230,0.3)' }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="mb-5 text-white"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 400 }}
                >
                  {f.title}
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-jost)', fontSize: '0.82rem', fontWeight: 300, letterSpacing: '0.02em', color: 'rgba(240,236,230,0.45)', lineHeight: 1.8 }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      <section id="gallery" style={{ background: '#0a0a0a' }} className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 grid grid-cols-3 gap-6">
            <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(240,236,230,0.3)' }}>
              Eindrücke
            </span>
            <h2
              className="col-span-2"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: '#f0ece6', letterSpacing: '-0.01em' }}
            >
              Der Raum
            </h2>
          </div>
          <GalleryGrid items={galleryWithBlur} theme="bar" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        id="private"
        style={{ background: '#0d0d0d', borderTop: '1px solid rgba(240,236,230,0.06)' }}
        className="py-28 px-8 text-center"
      >
        <span
          className="block mb-5"
          style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(240,236,230,0.3)' }}
        >
          Anfragen
        </span>
        <h2
          className="text-white mb-6"
          style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.01em' }}
        >
          Dein Event,<br />unser Ort
        </h2>
        <p
          className="mx-auto mb-12 max-w-lg"
          style={{ fontFamily: 'var(--font-jost)', fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.03em', color: 'rgba(240,236,230,0.45)', lineHeight: 1.8 }}
        >
          Wir freuen uns auf deine Anfrage. Schreib uns und wir melden uns innerhalb von 24 Stunden zurück.
        </p>
        <MagneticButton variant="outline" href="mailto:events@kantinekohlmann.de">
          Jetzt anfragen
        </MagneticButton>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        style={{ background: '#080808', borderTop: '1px solid rgba(240,236,230,0.06)' }}
        className="py-16 px-8 text-center"
      >
        <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem', color: '#f0ece6', display: 'block', marginBottom: '0.5rem' }}>
          The Basement
        </span>
        <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(240,236,230,0.3)', marginBottom: '2rem' }}>
          Skalitzer Str. 64, 10997 Berlin
        </p>
        <Link href="/" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(240,236,230,0.4)' }} className="hover:opacity-70 transition-opacity">
          ← Zur Startseite
        </Link>
      </footer>
    </div>
  );
}
