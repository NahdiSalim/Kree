import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { verifyOwnerToken } from "../lib/jwt.js";
import { prisma } from "../lib/prisma.js";

export type AuthedRequest = Request & {
  owner?: {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    city: string | null;
    company: string | null;
    bio: string | null;
    avatarUrl: string | null;
    createdAt: Date;
  };
};

function isDbUnreachable(err: unknown): boolean {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return err.code === "P1001" || err.code === "P1017";
  }
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }
  const msg = err instanceof Error ? err.message : String(err);
  return /Can't reach database server|ECONNREFUSED|ETIMEDOUT|P1001/i.test(msg);
}

export async function requireOwner(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Non authentifié" });
    }
    const token = header.slice(7);
    let payload: ReturnType<typeof verifyOwnerToken>;
    try {
      payload = verifyOwnerToken(token);
    } catch {
      return res.status(401).json({ error: "Session invalide ou expirée" });
    }

    const owner = await prisma.owner.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        city: true,
        company: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
    if (!owner) {
      return res.status(401).json({ error: "Compte introuvable" });
    }
    req.owner = owner;
    next();
  } catch (err) {
    if (isDbUnreachable(err)) {
      console.error("[auth] database unreachable", err);
      return res.status(503).json({ error: "Base de données indisponible" });
    }
    console.error("[auth] unexpected error", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
