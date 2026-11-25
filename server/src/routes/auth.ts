import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { signOwnerToken } from "../lib/jwt.js";
import { requireOwner, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

const signupSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().toLowerCase(),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v.replace(/\s+/g, "") : ""))
    .refine((v) => !v || /^[0-9]{8}$/.test(v), {
      message: "Téléphone: 8 chiffres",
    }),
  password: z.string().min(8).max(72),
});

const signinSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1),
});

function publicOwner(owner: {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  city: string | null;
  company: string | null;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}) {
  return {
    id: owner.id,
    email: owner.email,
    name: owner.name,
    phone: owner.phone,
    city: owner.city,
    company: owner.company,
    bio: owner.bio,
    avatarUrl: owner.avatarUrl,
    createdAt: owner.createdAt,
  };
}

router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Données invalides",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const { fullName, email, phone, password } = parsed.data;
  const existing = await prisma.owner.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Cet e-mail est déjà utilisé" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const owner = await prisma.owner.create({
    data: {
      name: fullName,
      email,
      passwordHash,
      phone: phone ? `+216${phone}` : null,
    },
  });

  const token = signOwnerToken({ sub: owner.id, email: owner.email });
  return res.status(201).json({
    token,
    owner: publicOwner(owner),
  });
});

router.post("/signin", async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "E-mail ou mot de passe invalide" });
  }

  const { email, password } = parsed.data;
  const owner = await prisma.owner.findUnique({ where: { email } });
  if (!owner) {
    return res.status(401).json({ error: "E-mail ou mot de passe incorrect" });
  }

  const ok = await bcrypt.compare(password, owner.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "E-mail ou mot de passe incorrect" });
  }

  const token = signOwnerToken({ sub: owner.id, email: owner.email });
  return res.json({
    token,
    owner: publicOwner(owner),
  });
});

router.get("/me", requireOwner, async (req: AuthedRequest, res) => {
  return res.json({ owner: req.owner });
});

router.patch("/me", requireOwner, async (req: AuthedRequest, res) => {
  const schema = z.object({
    name: z.string().trim().min(2).max(80).optional(),
    phone: z.string().trim().max(20).optional().nullable(),
    city: z.string().trim().max(80).optional().nullable(),
    company: z.string().trim().max(120).optional().nullable(),
    bio: z.string().trim().max(2000).optional().nullable(),
    avatarUrl: z.string().optional().nullable(),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Données invalides" });
  }

  const owner = await prisma.owner.update({
    where: { id: req.owner!.id },
    data: parsed.data,
  });

  return res.json({ owner: publicOwner(owner) });
});

export default router;
