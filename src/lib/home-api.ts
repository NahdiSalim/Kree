import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export type MegaPreview = {
  id: string;
  title: string;
  city: string;
  price: number;
  unit: string;
  image: string;
  meta: string;
  rating: number;
};

export type MegaCategory = {
  label: string;
  href: string;
  desc: string;
  items: MegaPreview[];
};

export type HomeHeroSlide = {
  id: string;
  category: "Maison" | "Véhicule" | "Offre";
  title: string;
  subtitle: string;
  image: string;
  accent: string;
  href: string;
};

export type HomeCard = {
  id: string;
  type: "maison" | "vehicule";
  title: string;
  city: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
  meta: string;
  rating: number;
  href: string;
};

export type HomeOffer = {
  id: string;
  type: "maison" | "vehicule";
  title: string;
  city: string;
  price: number;
  unit: string;
  image: string;
  tag: string;
  href: string;
  meta: string;
};

export type HomePayload = {
  mega: {
    maisons: MegaCategory[];
    vehicules: MegaCategory[];
  };
  hero: HomeHeroSlide[];
  latest: HomeCard[];
  offers: HomeOffer[];
  counts: { houses: number; vehicles: number };
};

let homeCache: HomePayload | null = null;
let homePromise: Promise<HomePayload> | null = null;

export async function fetchHome(): Promise<HomePayload> {
  if (homeCache) return homeCache;
  if (!homePromise) {
    homePromise = apiFetch<HomePayload>("/api/home")
      .then((data) => {
        homeCache = data;
        return data;
      })
      .finally(() => {
        homePromise = null;
      });
  }
  return homePromise;
}

export function invalidateHomeCache() {
  homeCache = null;
}

export function useHome() {
  const [data, setData] = useState<HomePayload | null>(homeCache);
  const [loading, setLoading] = useState(!homeCache);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const payload = await fetchHome();
        if (!cancelled) {
          setData(payload);
          setError("");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Erreur");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
