'use client';

import { motion } from 'framer-motion';

interface DishEntry {
  name: string;
  desc?: string;
  price?: string;
}

interface MenuCategory {
  kategorie: string;
  note?: string;
  eintraege: (DishEntry | string)[];
}

interface MenuSectionProps {
  categories: MenuCategory[];
}

// Normalise — handle both old string[] and new object[] formats
function normaliseDish(raw: DishEntry | string): DishEntry {
  return typeof raw === 'string' ? { name: raw } : raw;
}

// Split categories into food and drinks for layout
function isFoodCat(k: string) {
  return !k.toLowerCase().startsWith('drinks');
}

// ── Individual dish row ───────────────────────────────────────────────────────
function DishRow({ dish }: { dish: DishEntry }) {
  return (
    <motion.li
      className="py-[0.9rem]"
      style={{ borderBottom: '1px solid rgba(242,239,233,0.06)' }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Main row: name — dotted leader — price */}
      <div className="flex items-baseline gap-0">
        <span
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '0.95rem',
            fontWeight: 400,
            color: '#F2EFE9',
            lineHeight: 1.4,
            whiteSpace: 'nowrap',
          }}
        >
          {dish.name}
        </span>

        {/* Dotted leader */}
        <span
          className="flex-grow mx-3"
          style={{
            borderBottom: '1px dotted rgba(242,239,233,0.18)',
            marginBottom: '5px',
            minWidth: '1rem',
          }}
        />

        {/* Price */}
        <span
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.72rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: dish.price && dish.price !== '—'
              ? 'rgba(242,239,233,0.55)'
              : 'rgba(242,239,233,0.22)',
            whiteSpace: 'nowrap',
          }}
        >
          {dish.price ?? ''}
        </span>
      </div>

      {/* Description — italic, small, below */}
      {dish.desc && (
        <span
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.68rem',
            fontWeight: 300,
            letterSpacing: '0.03em',
            color: 'rgba(242,239,233,0.35)',
            fontStyle: 'italic',
            display: 'block',
            marginTop: '0.25rem',
            lineHeight: 1.6,
          }}
        >
          {dish.desc}
        </span>
      )}
    </motion.li>
  );
}

// ── Category block ────────────────────────────────────────────────────────────
function CategoryBlock({ cat }: { cat: MenuCategory }) {
  // Strip prefixes for cleaner display
  const title = cat.kategorie
    .replace(/^Le Pizze — |^Pizza in Teglia — |^Drinks — /, '');

  return (
    <div>
      <motion.div
        className="mb-7"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            lineHeight: 1.05,
            color: '#F2EFE9',
          }}
        >
          {title}
        </h3>
        {cat.note && (
          <p
            style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(242,239,233,0.3)',
              marginTop: '0.35rem',
            }}
          >
            {cat.note}
          </p>
        )}
      </motion.div>

      <ul>
        {cat.eintraege.map((raw, j) => (
          <DishRow key={j} dish={normaliseDish(raw)} />
        ))}
      </ul>
    </div>
  );
}

export default function MenuSection({ categories }: MenuSectionProps) {
  const foodCats  = categories.filter((c) => isFoodCat(c.kategorie));
  const drinkCats = categories.filter((c) => !isFoodCat(c.kategorie));

  return (
    <section
      id="menu"
      style={{ background: '#080808' }}
      className="py-28 px-6 md:px-14 lg:px-24"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-end gap-10">
            <span
              style={{
                fontFamily: 'var(--font-jost)',
                fontSize: '0.55rem',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: 'rgba(242,239,233,0.28)',
                lineHeight: 1,
                paddingBottom: '0.5rem',
              }}
            >
              La Nostra Cucina
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                lineHeight: 0.92,
                color: '#F2EFE9',
              }}
            >
              Speisekarte
            </h2>
          </div>
        </motion.div>

        {/* ── Food categories — alternating 2-col asymmetric grid ─────────── */}
        <div className="space-y-24">
          {/* First 3 categories — full width stacked for drama */}
          {foodCats.slice(0, 3).map((cat) => (
            <div key={cat.kategorie}>
              <CategoryBlock cat={cat} />
            </div>
          ))}

          {/* Remaining — two columns, alternating width */}
          {foodCats.slice(3).reduce<MenuCategory[][]>((pairs, cat, i) => {
            if (i % 2 === 0) pairs.push([cat]);
            else pairs[pairs.length - 1].push(cat);
            return pairs;
          }, []).map((pair, pIdx) => (
            <div
              key={pIdx}
              className={`grid gap-16 md:gap-24 ${
                pair.length === 2
                  ? pIdx % 2 === 0
                    ? 'md:grid-cols-[5fr_4fr]'
                    : 'md:grid-cols-[4fr_5fr]'
                  : 'md:grid-cols-1 max-w-2xl'
              }`}
            >
              {pair.map((cat) => <CategoryBlock key={cat.kategorie} cat={cat} />)}
            </div>
          ))}
        </div>

        {/* ── Dot divider ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 my-24">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ width: 4, height: 4, background: 'rgba(242,239,233,0.15)', display: 'block' }}
            />
          ))}
        </div>

        {/* ── Drinks — three-column aperitif callout grid ──────────────────── */}
        {drinkCats.length > 0 && (
          <div>
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  lineHeight: 0.92,
                  color: '#F2EFE9',
                }}
              >
                Drinks
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-16">
              {drinkCats.map((cat) => (
                <CategoryBlock key={cat.kategorie} cat={cat} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
