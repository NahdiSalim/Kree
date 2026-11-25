export type ListingType = "maison" | "vehicule";

export const tunisianCities = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "Manouba",
  "Nabeul",
  "Hammamet",
  "Sousse",
  "Monastir",
  "Mahdia",
  "Sfax",
  "Gabès",
  "Médenine",
  "Djerba",
  "Bizerte",
  "Kairouan",
  "Tozeur",
  "Gafsa",
  "Kasserine",
] as const;

export const whyUs = [
  {
    title: "Annonces vérifiées",
    text: "Chaque logement et véhicule est contrôlé pour plus de confiance.",
    icon: "shield",
  },
  {
    title: "Toute la Tunisie",
    text: "De Tunis à Djerba, trouvez une location près de chez vous.",
    icon: "map",
  },
  {
    title: "Maisons & véhicules",
    text: "Un seul endroit pour habiter, circuler et déménager.",
    icon: "layers",
  },
  {
    title: "Support local",
    text: "Une équipe basée en Tunisie, disponible 7j/7.",
    icon: "support",
  },
] as const;

export const reviews = [
  {
    id: "r1",
    name: "Amira Ben Salah",
    city: "Tunis",
    text: "J’ai trouvé un appartement meublé en 48h. Les photos étaient fidèles et le propriétaire très réactif.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r2",
    name: "Karim Trabelsi",
    city: "Sousse",
    text: "Location de voiture impeccable pour un week-end à Tozeur. Prix clair, véhicule propre.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "r3",
    name: "Sarra Mansouri",
    city: "Sfax",
    text: "La recherche par ville est ultra pratique. J’ai aussi contacté un déménageur via la plateforme.",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
];
