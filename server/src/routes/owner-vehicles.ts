import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { mapVehicle } from "../lib/listing-mappers.js";
import { requireOwner, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

const createSchema = z.object({
  title: z.string().trim().min(4).max(120),
  description: z.string().trim().min(20).max(5000),
  city: z.string().trim().min(2).max(80),
  governorate: z.string().trim().min(2).max(80),
  category: z.string().trim().min(2).max(60),
  price: z.number().int().positive(),
  unit: z.enum(["jour", "semaine"]),
  images: z.array(z.string().min(1)).min(1).max(10),
  features: z.array(z.string()).default([]),
  brand: z.string().trim().min(1).max(60),
  model: z.string().trim().min(1).max(60),
  year: z.number().int().min(1980).max(2100),
  transmission: z.enum(["Manuelle", "Automatique"]),
  fuel: z.enum(["Essence", "Diesel", "Hybride", "Électrique"]),
  seats: z.number().int().min(1).max(50),
  doors: z.number().int().min(2).max(10),
  mileage: z.number().int().min(0),
  airConditioning: z.boolean().default(true),
  availableFrom: z.string().min(8),
  tour3dUrl: z.string().url().optional().nullable(),
});

router.use(requireOwner);

router.get("/", async (req: AuthedRequest, res) => {
  const rows = await prisma.vehicleListing.findMany({
    where: { ownerId: req.owner!.id },
    include: {
      owner: { select: { name: true, avatarUrl: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json({ vehicles: rows.map((r) => mapVehicle(r, r.owner)) });
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
  const row = await prisma.vehicleListing.create({
    data: {
      ownerId: req.owner!.id,
      title: data.title,
      description: data.description,
      city: data.city,
      governorate: data.governorate,
      category: data.category,
      price: data.price,
      unit: data.unit,
      images: data.images,
      features: data.features,
      brand: data.brand,
      model: data.model,
      year: data.year,
      transmission: data.transmission,
      fuel: data.fuel,
      seats: data.seats,
      doors: data.doors,
      mileage: data.mileage,
      airConditioning: data.airConditioning,
      availableFrom: new Date(data.availableFrom),
      tour3dUrl: data.tour3dUrl || null,
    },
    include: {
      owner: { select: { name: true, avatarUrl: true, phone: true } },
    },
  });

  res.status(201).json({ vehicle: mapVehicle(row, row.owner) });
});

router.delete("/:id", async (req: AuthedRequest, res) => {
  const id = String(req.params.id);
  const existing = await prisma.vehicleListing.findFirst({
    where: { id, ownerId: req.owner!.id },
  });
  if (!existing) {
    return res.status(404).json({ error: "Annonce introuvable" });
  }
  await prisma.vehicleListing.delete({ where: { id: existing.id } });
  res.json({ ok: true });
});

export default router;
