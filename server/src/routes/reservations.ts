import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { mapReservation } from "../lib/listing-mappers.js";
import { requireOwner, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

const createSchema = z.object({
  listingId: z.string().min(1),
  listingType: z.enum(["maison", "vehicule"]),
  clientName: z.string().trim().min(2).max(80),
  clientPhone: z.string().trim().min(8).max(20),
  clientEmail: z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.string().trim().email().optional(),
  ),
  startDate: z.string().min(8),
  endDate: z.string().min(8),
  message: z.string().trim().max(2000).optional().default(""),
});

/** Public: client submits a reservation request (no account). */
router.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Données invalides",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const data = parsed.data;
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return res.status(400).json({ error: "Dates invalides" });
  }

  if (data.listingType === "maison") {
    const house = await prisma.houseListing.findUnique({
      where: { id: data.listingId },
      include: { owner: { select: { name: true } } },
    });
    if (!house) {
      return res.status(404).json({ error: "Annonce introuvable" });
    }
    const row = await prisma.reservationRequest.create({
      data: {
        listingType: "maison",
        houseId: house.id,
        listingTitle: house.title,
        listingCity: house.city,
        listingImage: house.images[0] || "",
        ownerName: house.owner.name,
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        clientEmail: data.clientEmail || null,
        startDate: start,
        endDate: end,
        message: data.message || "",
      },
    });
    return res.status(201).json({ reservation: mapReservation(row) });
  }

  const vehicle = await prisma.vehicleListing.findUnique({
    where: { id: data.listingId },
    include: { owner: { select: { name: true } } },
  });
  if (!vehicle) {
    return res.status(404).json({ error: "Annonce introuvable" });
  }
  const row = await prisma.reservationRequest.create({
    data: {
      listingType: "vehicule",
      vehicleId: vehicle.id,
      listingTitle: vehicle.title,
      listingCity: vehicle.city,
      listingImage: vehicle.images[0] || "",
      ownerName: vehicle.owner.name,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail || null,
      startDate: start,
      endDate: end,
      message: data.message || "",
    },
  });
  return res.status(201).json({ reservation: mapReservation(row) });
});

/** Owner: list reservations for own listings. */
router.get("/mine", requireOwner, async (req: AuthedRequest, res) => {
  const ownerId = req.owner!.id;
  const rows = await prisma.reservationRequest.findMany({
    where: {
      OR: [
        { house: { ownerId } },
        { vehicle: { ownerId } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  res.json({ reservations: rows.map(mapReservation) });
});

const statusSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"]),
});

router.patch("/:id", requireOwner, async (req: AuthedRequest, res) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Statut invalide" });
  }

  const ownerId = req.owner!.id;
  const id = String(req.params.id);
  const existing = await prisma.reservationRequest.findFirst({
    where: {
      id,
      OR: [{ house: { ownerId } }, { vehicle: { ownerId } }],
    },
  });
  if (!existing) {
    return res.status(404).json({ error: "Demande introuvable" });
  }

  const row = await prisma.reservationRequest.update({
    where: { id: existing.id },
    data: { status: parsed.data.status },
  });
  res.json({ reservation: mapReservation(row) });
});

export default router;
