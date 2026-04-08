'use client';

import { motion } from 'framer-motion';

interface MenuItem {
  name: string;
  desc?: string;
}

interface MenuCategory {
  kategorie: string;
  eintraege: string[];
}

interface MenuSectionProps {
  categories: MenuCategory[];
}

// Parse a dish entry into a name (and optional italic sub-note)
function parseEntry(raw: string): MenuItem {
  // If entry has parentheses, split them for italic desc
  const match = raw.match(/^(.*?)\s*\(([^)]+)\)\s*(.*)$/);
  if (match) {
    const name = (match[1] + (match[3] ? ' ' + match[3] : '')).trim();
    return { name, desc: match[2] };
  }
  return { name: raw };
}

// Animation for each dish row
const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const categoryVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

// Group categories into pairs for the two-column grid
function pairCategories(cats: MenuCategory[]): [MenuCategory, MenuCategory | null][] {
  const pairs: [MenuCategory, MenuCategory | null][] = [];
  for (let i = 0; i < cats.length; i += 2) {
    pairs.push([cats[i], cats[i + 1] ?? null]);
  }
  return pairs;
}

function CategoryBlock({ cat }: { cat: MenuCategory }) {
  return (
    <motion.div
      variants={categoryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* Category title */}
      <motion.h3
        className="menu-category-title mb-8"
        variants={rowVariants}
      >
        {cat.kategorie.replace(/^Le Pizze – |^Pizza in Teglia – /, '')}
      </motion.h3>

      {/* Dish list */}
      <ul className="space-y-0">
        {cat.eintraege.map((raw, j) => {
          const { name, desc } = parseEntry(raw);
          return (
            <motion.li
              key={`${raw}-${j}`}
              variants={rowVariants}
              className="py-3 border-b"
              style={{ borderColor: 'rgba(240,236,230,0.07)' }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="menu-dish-name">{name}</span>
              </div>
              {desc && (
                <span className="menu-dish-desc block mt-0.5">{desc}</span>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

// Signature "Aperitif Callout" for Drinks categories
function AperitifCallout({ cat }: { cat: MenuCategory }) {
  return (
    <motion.div
      className="menu-surface-inset p-8 md:p-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h3 className="menu-category-title mb-8">
        {cat.kategorie.replace(/^Drinks – /, '')}
      </h3>
      <ul className="space-y-0">
        {cat.eintraege.map((raw, j) => {
          const { name, desc } = parseEntry(raw);
          return (
            <li
              key={`${raw}-${j}`}
              className="py-3 border-b"
              style={{ borderColor: 'rgba(240,236,230,0.07)' }}
            >
              <span className="menu-dish-name">{name}</span>
              {desc && <span className="menu-dish-desc block mt-0.5">{desc}</span>}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default function MenuSection({ categories }: MenuSectionProps) {
  // Split into food categories and drinks categories
  const foodCats  = categories.filter((c) => !c.kategorie.startsWith('Drinks'));
  const drinkCats = categories.filter((c) => c.kategorie.startsWith('Drinks'));
  const foodPairs = pairCategories(foodCats);

  return (
    <section id="menu" className="menu-surface py-28 px-6 md:px-14 lg:px-24">
      <div className="max-w-[1400px] mx-auto">

        {/* ── Section header ───────────────────────────────────────────────── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Asymmetric: category label lives in left third */}
          <div className="grid grid-cols-3 gap-6 items-end">
            <div>
              <span
                className="block text-[0.55rem] uppercase text-white/30"
                style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.5em' }}
              >
                La Nostra Cucina
              </span>
            </div>
            <div className="col-span-2">
              <h2
                className="text-white"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(3rem, 6vw, 6rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 0.95,
                  fontStyle: 'italic',
                }}
              >
                Speise&shy;karte
              </h2>
            </div>
          </div>
        </motion.div>

        {/* ── Food categories — asymmetric two-column grid ─────────────────── */}
        <div className="space-y-20">
          {foodPairs.map(([left, right], pairIdx) => (
            <div key={pairIdx}>
              {/* Wide left column (2/3) + narrow right column (1/3) — alternates */}
              <div
                className={`grid gap-12 md:gap-20 ${
                  right
                    ? pairIdx % 2 === 0
                      ? 'md:grid-cols-[2fr_1fr]'
                      : 'md:grid-cols-[1fr_2fr]'
                    : 'md:grid-cols-1 max-w-2xl'
                }`}
              >
                <CategoryBlock cat={left} />
                {right && <CategoryBlock cat={right} />}
              </div>

              {/* Dot divider between pairs */}
              <div className="menu-dot-divider mt-16">
                <span /><span /><span />
              </div>
            </div>
          ))}
        </div>

        {/* ── Drinks — Aperitif Callout style ──────────────────────────────── */}
        {drinkCats.length > 0 && (
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-16"
            >
              <span
                className="block text-[0.55rem] uppercase text-white/30 mb-4"
                style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.5em' }}
              >
                Da Bere
              </span>
              <h2
                className="text-white"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  lineHeight: 0.95,
                }}
              >
                Drinks
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drinkCats.map((cat) => (
                <AperitifCallout key={cat.kategorie} cat={cat} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
