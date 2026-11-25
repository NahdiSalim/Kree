import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

const HOUSE_CATEGORIES = [
  { label: "Appartements", category: "Appartement", desc: "Studios & F2–F4" },
  { label: "Villas", category: "Villa", desc: "Avec jardin & piscine" },
  { label: "Maisons", category: "Maison", desc: "Familiales & traditionnelles" },
  { label: "Studios", category: "Studio", desc: "Idéal étudiants" },
  { label: "Duplex", category: "Duplex", desc: "Espaces sur 2 niveaux" },
  {
    label: "Résidences meublées",
    category: "Résidence meublée",
    desc: "Prêt à vivre",
  },
] as const;

const VEHICLE_CATEGORIES = [
  { label: "Voitures", category: "Voiture", desc: "Citadines & berlines" },
  { label: "SUV & 4x4", category: "SUV", desc: "Confort & routes longues" },
  { label: "Utilitaires", category: "Utilitaire", desc: "Camionnettes & fourgons" },
  { label: "Motos", category: "Moto", desc: "Urbaines & sportives" },
  { label: "Scooters", category: "Scooter", desc: "Mobilité quotidienne" },
  { label: "Camions", category: "Camion", desc: "Déménagement & pro" },
] as const;

function houseMeta(row: {
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnished: boolean;
}) {
  if (row.bedrooms <= 0) return `Studio · ${row.area} m²`;
  return `${row.bedrooms} ch. · ${row.bathrooms} SDB · ${row.area} m²`;
}

function vehicleMeta(row: {
  fuel: string;
  seats: number;
  transmission: string;
  brand: string;
  model: string;
}) {
  return `${row.fuel} · ${row.seats} places · ${row.transmission}`;
}

function toMegaPreview(
  row: {
    id: string;
    title: string;
    city: string;
    price: number;
    unit: string;
    images: string[];
    rating: number;
  },
  meta: string,
) {
  return {
    id: row.id,
    title: row.title,
    city: row.city,
    price: row.price,
    unit: row.unit,
    image: row.images[0] || "",
    meta,
    rating: row.rating,
  };
}

router.get("/", async (_req, res) => {
  const [houses, vehicles, housesCount, vehiclesCount] = await Promise.all([
    prisma.houseListing.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 80,
    }),
    prisma.vehicleListing.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 80,
    }),
    prisma.houseListing.count(),
    prisma.vehicleListing.count(),
  ]);

  const houseMega = HOUSE_CATEGORIES.map((cat) => ({
    label: cat.label,
    href: `/maisons?category=${encodeURIComponent(cat.category)}`,
    desc: cat.desc,
    items: houses
      .filter((h) => h.category === cat.category)
      .slice(0, 5)
      .map((h) => toMegaPreview(h, houseMeta(h))),
  }));

  const vehicleMega = VEHICLE_CATEGORIES.map((cat) => ({
    label: cat.label,
    href: `/vehicules?category=${encodeURIComponent(cat.category)}`,
    desc: cat.desc,
    items: vehicles
      .filter((v) => v.category === cat.category)
      .slice(0, 5)
      .map((v) => toMegaPreview(v, vehicleMeta(v))),
  }));

  const heroCandidates = [
    ...houses.slice(0, 4).map((h) => ({
      id: h.id,
      category: "Maison" as const,
      title: h.title,
      subtitle: `${h.city} · ${houseMeta(h)}`,
      image: h.images[0] || "",
      accent: `${h.price} TND / ${h.unit}`,
      href: `/maisons/${h.id}`,
    })),
    ...vehicles.slice(0, 3).map((v) => ({
      id: v.id,
      category: "Véhicule" as const,
      title: v.title,
      subtitle: `${v.city} · ${vehicleMeta(v)}`,
      image: v.images[0] || "",
      accent: `${v.price} TND / ${v.unit}`,
      href: `/vehicules/${v.id}`,
    })),
  ].filter((s) => s.image);

  const hero =
    heroCandidates.length > 0
      ? heroCandidates.slice(0, 5)
      : [
          {
            id: "fallback",
            category: "Offre" as const,
            title: "Louez maisons & véhicules en Tunisie",
            subtitle: "Des annonces vérifiées partout dans le pays",
            image:
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
            accent: "Publiez ou réservez sur Kree",
            href: "/maisons",
          },
        ];

  const featured = [
    ...houses
      .filter((h) => h.featured)
      .slice(0, 4)
      .map((h) => ({
        id: h.id,
        type: "maison" as const,
        title: h.title,
        city: h.city,
        price: h.price,
        unit: h.unit,
        image: h.images[0] || "",
        tag: "Maison",
        href: `/maisons/${h.id}`,
        meta: houseMeta(h),
      })),
    ...vehicles
      .filter((v) => v.featured)
      .slice(0, 4)
      .map((v) => ({
        id: v.id,
        type: "vehicule" as const,
        title: v.title,
        city: v.city,
        price: v.price,
        unit: v.unit,
        image: v.images[0] || "",
        tag: "Véhicule",
        href: `/vehicules/${v.id}`,
        meta: vehicleMeta(v),
      })),
  ].slice(0, 6);

  const offers =
    featured.length > 0
      ? featured
      : [
          ...houses.slice(0, 3).map((h) => ({
            id: h.id,
            type: "maison" as const,
            title: h.title,
            city: h.city,
            price: h.price,
            unit: h.unit,
            image: h.images[0] || "",
            tag: "Maison",
            href: `/maisons/${h.id}`,
            meta: houseMeta(h),
          })),
          ...vehicles.slice(0, 3).map((v) => ({
            id: v.id,
            type: "vehicule" as const,
            title: v.title,
            city: v.city,
            price: v.price,
            unit: v.unit,
            image: v.images[0] || "",
            tag: "Véhicule",
            href: `/vehicules/${v.id}`,
            meta: vehicleMeta(v),
          })),
        ].slice(0, 6);

  const latest = [
    ...houses.slice(0, 8).map((h) => ({
      id: h.id,
      type: "maison" as const,
      title: h.title,
      city: h.city,
      price: h.price,
      unit: h.unit,
      image: h.images[0] || "",
      badge: h.featured ? "À la une" : undefined,
      meta: houseMeta(h),
      rating: h.rating,
      href: `/maisons/${h.id}`,
    })),
    ...vehicles.slice(0, 8).map((v) => ({
      id: v.id,
      type: "vehicule" as const,
      title: v.title,
      city: v.city,
      price: v.price,
      unit: v.unit,
      image: v.images[0] || "",
      badge: v.featured ? "À la une" : undefined,
      meta: vehicleMeta(v),
      rating: v.rating,
      href: `/vehicules/${v.id}`,
    })),
  ]
    .sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)))
    .slice(0, 10);

  res.json({
    mega: {
      maisons: houseMega,
      vehicules: vehicleMega,
    },
    hero,
    latest,
    offers,
    counts: {
      houses: housesCount,
      vehicles: vehiclesCount,
    },
  });
});

export default router;
