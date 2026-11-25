import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { mapReservation } from "../lib/listing-mappers.js";
import { requireOwner, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

router.use(requireOwner);

router.get("/stats", async (req: AuthedRequest, res, next) => {
  try {
    const ownerId = req.owner!.id;

    const [housesCount, vehiclesCount, reservations] = await Promise.all([
      prisma.houseListing.count({ where: { ownerId } }),
      prisma.vehicleListing.count({ where: { ownerId } }),
      prisma.reservationRequest.findMany({
        where: {
          OR: [{ house: { ownerId } }, { vehicle: { ownerId } }],
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const pending = reservations.filter((r) => r.status === "pending");

    res.json({
      stats: {
        houses: housesCount,
        vehicles: vehiclesCount,
        pending: pending.length,
        totalReservations: reservations.length,
      },
      pendingReservations: pending.slice(0, 4).map(mapReservation),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
