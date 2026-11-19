import "server-only";
import { cache } from "react";
import indexData from "@/data/index.json";
import restaurantData from "@/data/restaurant.json";
import barData from "@/data/bar.json";
import { readModel } from "./model-store";
import { getSandboxId } from "./demo";

/**
 * Editierbares Inhaltsmodell (Admin-Panel /admin). Grundzustand = data/*.json;
 * gespeicherte Stände (Vercel Blob bzw. .data/, im Demo pro Sitzung) überlagern ihn.
 */
export type SiteModel = {
  version: 1;
  updatedAt: string;
  index: typeof indexData;
  restaurant: typeof restaurantData;
  bar: typeof barData;
};

export const defaultModel = (): SiteModel =>
  structuredClone({ version: 1 as const, updatedAt: "", index: indexData, restaurant: restaurantData, bar: barData });

export const getSiteModel = cache(async (): Promise<SiteModel> => {
  const saved = await readModel(await getSandboxId());
  const d = defaultModel();
  if (!saved) return d;
  return {
    ...d,
    ...saved,
    index: { ...d.index, ...(saved.index ?? {}) },
    restaurant: { ...d.restaurant, ...(saved.restaurant ?? {}) },
    bar: { ...d.bar, ...(saved.bar ?? {}) },
  };
});
