import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Le nom complet est requis")
    .max(80, "Le nom est trop long"),
  email: z
    .string()
    .trim()
    .min(1, "L’e-mail est requis")
    .email("Veuillez entrer une adresse e-mail valide"),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => val === "" || /^[0-9]{8}$/.test(val), {
      message: "Entrez 8 chiffres (ex. 20123456)",
    }),
  password: z
    .string()
    .min(8, "Au moins 8 caractères")
    .max(72, "Mot de passe trop long"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions",
  }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
