import { getBlurDataURL } from '@/lib/blur';
import HomeClient from './HomeClient';
import { getSiteModel } from '@/lib/site-model';
import type { PanelData } from '@/components/TriSplitHero';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { meta } = (await getSiteModel()).index;
  return { title: meta.title, description: meta.description };
}

export default async function Home() {
  const indexData = (await getSiteModel()).index;
  // Generate blur placeholders server-side for each panel image
  const panels: PanelData[] = await Promise.all(
    indexData.panels.map(async (p) => ({
      id:        p.id,
      href:      p.href,
      image:     p.image,
      blurData:  await getBlurDataURL(p.image),
      badge:     p.badge,
      titleA:    p.titleA,
      titleB:    p.titleB,
      cta1Label: p.cta1Label,
      cta1Href:  p.cta1Href,
      cta2Label: p.cta2Label,
      cta2Href:  p.cta2Href,
    }))
  );

  return <HomeClient panels={panels} />;
}
