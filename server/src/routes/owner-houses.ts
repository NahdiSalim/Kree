import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { mapHouse } from "../lib/listing-mappers.js";
import { requireOwner, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

const createSchema = z.object({
  title: z.string().trim().min(4).max(120),
  description: z.string().trim().min(20).max(5000),
  city: z.string().trim().min(2).max(80),
  governorate: z.string().trim().min(2).max(80),
  addressArea: z.string().trim().min(2).max(120),
  category: z.string().trim().min(2).max(60),
  price: z.number().int().positive(),
  unit: z.enum(["nuit", "mois"]),
  images: z.array(z.string().min(1)).min(1).max(10),
  amenities: z.array(z.string()).default([]),
  bedrooms: z.number().int().min(0).max(30),
  bathrooms: z.number().int().min(1).max(20),
  area: z.number().int().min(10).max(5000),
  furnished: z.boolean().default(true),
  floor: z.number().int().nullable().optional(),
  parking: z.boolean().default(false),
  petsAllowed: z.boolean().default(false),
  availableFrom: z.string().min(8),
  tour3dUrl: z.string().url().optional().nullable(),
});

router.use(requireOwner);

router.get("/", async (req: AuthedRequest, res) => {
  const rows = await prisma.houseListing.findMany({
    where: { ownerId: req.owner!.id },
    include: {
      owner: { select: { name: true, avatarUrl: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json({ houses: rows.map((r) => mapHouse(r, r.owner)) });
});

router.post("/", async (req: AuthedRequest, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Données invalides",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const data = parsed.data;
  const owner = req.owner!;
  const row = await prisma.houseListing.create({
    data: {
      ownerId: owner.id,
      title: data.title,
      description: data.description,
      city: data.city,
      governorate: data.governorate,
      addressArea: data.addressArea,
      category: data.category,
      price: data.price,
      unit: data.unit,
      images: data.images,
      amenities: data.amenities,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      area: data.area,
      furnished: data.furnished,
      floor: data.floor ?? null,
      parking: data.parking,
      petsAllowed: data.petsAllowed,
      availableFrom: new Date(data.availableFrom),
      tour3dUrl: data.tour3dUrl || null,
    },
    include: {
      owner: { select: { name: true, avatarUrl: true, phone: true } },
    },
  });

  res.status(201).json({ house: mapHouse(row, row.owner) });
});

router.delete("/:id", async (req: AuthedRequest, res) => {
  const id = String(req.params.id);
  const existing = await prisma.houseListing.findFirst({
    where: { id, ownerId: req.owner!.id },
  });
  if (!existing) {
    return res.status(404).json({ error: "Annonce introuvable" });
  }
  await prisma.houseListing.delete({ where: { id: existing.id } });
  res.json({ ok: true });
});

export default router;
