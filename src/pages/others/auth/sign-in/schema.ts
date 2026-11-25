import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L’e-mail est requis")
    .email("Veuillez entrer une adresse e-mail valide"),
  password: z.string().min(1, "Le mot de passe est requis"),
  keepLoggedIn: z.boolean().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
