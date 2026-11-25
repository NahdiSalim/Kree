import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { mapHouse, mapVehicle } from "../lib/listing-mappers.js";

const router = Router();

const ownerSelect = {
  name: true,
  avatarUrl: true,
  phone: true,
} as const;

router.get("/houses", async (_req, res) => {
  const rows = await prisma.houseListing.findMany({
    include: { owner: { select: ownerSelect } },
    orderBy: { createdAt: "desc" },
  });
  res.json({ houses: rows.map((r) => mapHouse(r, r.owner)) });
});

router.get("/houses/:id", async (req, res) => {
  const row = await prisma.houseListing.findUnique({
    where: { id: String(req.params.id) },
    include: { owner: { select: ownerSelect } },
  });
  if (!row) {
    return res.status(404).json({ error: "Annonce introuvable" });
  }
  res.json({ house: mapHouse(row, row.owner) });
});

router.get("/vehicles", async (_req, res) => {
  const rows = await prisma.vehicleListing.findMany({
    include: { owner: { select: ownerSelect } },
    orderBy: { createdAt: "desc" },
  });
  res.json({ vehicles: rows.map((r) => mapVehicle(r, r.owner)) });
});

router.get("/vehicles/:id", async (req, res) => {
  const row = await prisma.vehicleListing.findUnique({
    where: { id: String(req.params.id) },
    include: { owner: { select: ownerSelect } },
  });
  if (!row) {
    return res.status(404).json({ error: "Annonce introuvable" });
  }
  res.json({ vehicle: mapVehicle(row, row.owner) });
});

export default router;
