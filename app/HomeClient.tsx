'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import TriSplitHero, { PanelData } from '@/components/TriSplitHero';

interface Props {
  panels: PanelData[];
}

export default function HomeClient({ panels }: Props) {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaderDone && (
          <Loader key="loader" onComplete={() => setLoaderDone(true)} />
        )}
      </AnimatePresence>
      <TriSplitHero panels={panels} loaded={loaderDone} />
    </>
  );
}
