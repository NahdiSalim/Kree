import cors from "cors";
import express from "express";
import { env } from "./lib/env.js";
import authRoutes from "./routes/auth.js";
import listingsRoutes from "./routes/listings.js";
import homeRoutes from "./routes/home.js";
import ownerHousesRoutes from "./routes/owner-houses.js";
import ownerVehiclesRoutes from "./routes/owner-vehicles.js";
import ownerDashboardRoutes from "./routes/owner-dashboard.js";
import reservationsRoutes from "./routes/reservations.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(",").map((s) => s.trim()),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "12mb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "kree-api" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/home", homeRoutes);
  app.use("/api/listings", listingsRoutes);
  app.use("/api/owner/houses", ownerHousesRoutes);
  app.use("/api/owner/vehicles", ownerVehiclesRoutes);
  app.use("/api/owner", ownerDashboardRoutes);
  app.use("/api/reservations", reservationsRoutes);

  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error("[api]", err);
      const message =
        err instanceof Error ? err.message : typeof err === "string" ? err : "Erreur serveur";
      const unreachable =
        /Can't reach database server|ECONNREFUSED|ETIMEDOUT|P1001/i.test(message);
      res.status(unreachable ? 503 : 500).json({
        error: unreachable ? "Base de données indisponible" : "Erreur serveur",
        ...(process.env.NODE_ENV !== "production" ? { detail: message } : {}),
      });
    },
  );

  return app;
}
