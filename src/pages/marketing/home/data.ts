export type ListingType = "maison" | "vehicule";

export interface Listing {
  id: string;
  type: ListingType;
  title: string;
  city: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
  meta: string;
  rating: number;
}

export interface HeroSlide {
  id: string;
  category: "Maison" | "Véhicule" | "Offre";
  title: string;
  subtitle: string;
  image: string;
  accent: string;
}

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

export interface MegaPreview {
  id: string;
  title: string;
  city: string;
  price: number;
  unit: string;
  image: string;
  meta: string;
  rating: number;
}

export interface MegaCategory {
  label: string;
  href: string;
  desc: string;
  items: MegaPreview[];
}

export const houseTypes: MegaCategory[] = [
  {
    label: "Appartements",
    href: "#",
    desc: "Studios & F2–F4",
    items: [
      {
        id: "ha1",
        title: "Appartement standing Lac 2",
        city: "Tunis",
        price: 1800,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3be61?auto=format&fit=crop&w=900&q=80",
        meta: "3 pièces · Meublé · Ascenseur",
        rating: 4.8,
      },
      {
        id: "ha2",
        title: "F3 lumineux près du centre",
        city: "Sousse",
        price: 1200,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
        meta: "2 chambres · Balcon · Clim",
        rating: 4.6,
      },
      {
        id: "ha3",
        title: "Appartement vue mer",
        city: "Hammamet",
        price: 950,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        meta: "2 pièces · Parking · Wifi",
        rating: 4.9,
      },
      {
        id: "ha4",
        title: "F4 familial Ennasr",
        city: "Ariana",
        price: 2100,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
        meta: "3 chambres · Parking · Fibre",
        rating: 4.7,
      },
      {
        id: "ha5",
        title: "Appartement rénové médina",
        city: "Sfax",
        price: 780,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80",
        meta: "2 pièces · Cuisine équipée",
        rating: 4.5,
      },
    ],
  },
  {
    label: "Villas",
    href: "#",
    desc: "Avec jardin & piscine",
    items: [
      {
        id: "hv1",
        title: "Villa contemporaine avec piscine",
        city: "Hammamet",
        price: 450,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80",
        meta: "4 chambres · 3 SDB · Piscine",
        rating: 4.9,
      },
      {
        id: "hv2",
        title: "Villa vue mer",
        city: "Djerba",
        price: 520,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
        meta: "5 chambres · Terrasse · BBQ",
        rating: 5.0,
      },
      {
        id: "hv3",
        title: "Villa jardin privé",
        city: "Nabeul",
        price: 380,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
        meta: "3 chambres · Jardin · Clim",
        rating: 4.8,
      },
      {
        id: "hv4",
        title: "Villa premium Gammarth",
        city: "Tunis",
        price: 680,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        meta: "6 chambres · Piscine · Sécurité",
        rating: 4.9,
      },
      {
        id: "hv5",
        title: "Villa familiale Skanes",
        city: "Monastir",
        price: 340,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=900&q=80",
        meta: "4 chambres · Proche plage",
        rating: 4.7,
      },
    ],
  },
  {
    label: "Maisons",
    href: "#",
    desc: "Familiales & traditionnelles",
    items: [
      {
        id: "hm1",
        title: "Maison traditionnelle rénovée",
        city: "Sidi Bou Saïd",
        price: 320,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        meta: "2 chambres · Terrasse · Vue",
        rating: 5.0,
      },
      {
        id: "hm2",
        title: "Maison familiale avec patio",
        city: "Kairouan",
        price: 900,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
        meta: "3 chambres · Patio · Calme",
        rating: 4.6,
      },
      {
        id: "hm3",
        title: "Maison moderne La Marsa",
        city: "Tunis",
        price: 2500,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
        meta: "4 chambres · Garage · Jardin",
        rating: 4.8,
      },
      {
        id: "hm4",
        title: "Dar d’hôtes médina",
        city: "Tunis",
        price: 280,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1605276374104-dee2af0dda68?auto=format&fit=crop&w=900&q=80",
        meta: "3 suites · Patio · Petit-déj",
        rating: 4.9,
      },
      {
        id: "hm5",
        title: "Maison près de la plage",
        city: "Mahdia",
        price: 1100,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
        meta: "3 pièces · 200 m plage",
        rating: 4.5,
      },
    ],
  },
  {
    label: "Studios",
    href: "#",
    desc: "Idéal étudiants",
    items: [
      {
        id: "hs1",
        title: "Studio cosy près de la médina",
        city: "Sousse",
        price: 650,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        meta: "1 pièce · Cuisine équipée",
        rating: 4.5,
      },
      {
        id: "hs2",
        title: "Studio meublé El Manar",
        city: "Tunis",
        price: 720,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=900&q=80",
        meta: "Meublé · Wifi · Calme",
        rating: 4.6,
      },
      {
        id: "hs3",
        title: "Studio étudiant campus",
        city: "Manouba",
        price: 480,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
        meta: "Proche fac · Sécurisé",
        rating: 4.3,
      },
      {
        id: "hs4",
        title: "Studio vue jardin",
        city: "Monastir",
        price: 550,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac53ad4b9b00?auto=format&fit=crop&w=900&q=80",
        meta: "Clim · Cuisine · Wifi",
        rating: 4.4,
      },
      {
        id: "hs5",
        title: "Studio design centre-ville",
        city: "Sfax",
        price: 600,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
        meta: "Tout équipé · Ascenseur",
        rating: 4.7,
      },
    ],
  },
  {
    label: "Duplex",
    href: "#",
    desc: "Espaces sur 2 niveaux",
    items: [
      {
        id: "hd1",
        title: "Duplex moderne avec parking",
        city: "Ariana",
        price: 2100,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
        meta: "4 pièces · Parking · Fibre",
        rating: 4.8,
      },
      {
        id: "hd2",
        title: "Duplex terrasse panoramique",
        city: "Tunis",
        price: 2600,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
        meta: "5 pièces · Terrasse · Vue",
        rating: 4.9,
      },
      {
        id: "hd3",
        title: "Duplex familial Sahloul",
        city: "Sousse",
        price: 1900,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
        meta: "4 pièces · Garage · Clim",
        rating: 4.6,
      },
      {
        id: "hd4",
        title: "Duplex bord de mer",
        city: "Bizerte",
        price: 1700,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1600047509358-9dc75590daed?auto=format&fit=crop&w=900&q=80",
        meta: "3 chambres · Vue mer",
        rating: 4.7,
      },
      {
        id: "hd5",
        title: "Duplex standing Menzah",
        city: "Tunis",
        price: 2800,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80",
        meta: "6 pièces · Ascenseur · Cave",
        rating: 4.8,
      },
    ],
  },
  {
    label: "Résidences meublées",
    href: "#",
    desc: "Prêt à vivre",
    items: [
      {
        id: "hr1",
        title: "Résidence meublée Lakes",
        city: "Tunis",
        price: 1600,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&w=900&q=80",
        meta: "2 pièces · Full équipé",
        rating: 4.7,
      },
      {
        id: "hr2",
        title: "Suite meublée business",
        city: "Sfax",
        price: 95,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
        meta: "Studio · Ménage inclus",
        rating: 4.6,
      },
      {
        id: "hr3",
        title: "Résidence Les Jardins",
        city: "Sousse",
        price: 1400,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80",
        meta: "Piscine · Sécurité 24/7",
        rating: 4.8,
      },
      {
        id: "hr4",
        title: "Appart-hôtel meublé",
        city: "Monastir",
        price: 120,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
        meta: "Kitchenette · Wifi · Clim",
        rating: 4.5,
      },
      {
        id: "hr5",
        title: "Résidence premium Berges",
        city: "Tunis",
        price: 2200,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        meta: "3 pièces · Concierge",
        rating: 4.9,
      },
    ],
  },
];

export const vehicleTypes: MegaCategory[] = [
  {
    label: "Voitures",
    href: "#",
    desc: "Citadines & berlines",
    items: [
      {
        id: "vv1",
        title: "Peugeot 208 — automatique",
        city: "Tunis",
        price: 110,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
        meta: "Essence · 5 places · Clim",
        rating: 4.8,
      },
      {
        id: "vv2",
        title: "Renault Clio 5",
        city: "Sousse",
        price: 95,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
        meta: "Économique · Clim · Bluetooth",
        rating: 4.6,
      },
      {
        id: "vv3",
        title: "Mercedes Classe C",
        city: "Monastir",
        price: 280,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
        meta: "Automatique · Cuir · GPS",
        rating: 4.9,
      },
      {
        id: "vv4",
        title: "Volkswagen Golf 8",
        city: "Sfax",
        price: 160,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1616422285623-13ff0162193b?auto=format&fit=crop&w=900&q=80",
        meta: "Diesel · GPS · Clim bizone",
        rating: 4.7,
      },
      {
        id: "vv5",
        title: "Toyota Corolla hybride",
        city: "Tunis",
        price: 150,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=900&q=80",
        meta: "Hybride · Automatique",
        rating: 4.8,
      },
    ],
  },
  {
    label: "SUV & 4x4",
    href: "#",
    desc: "Confort & routes longues",
    items: [
      {
        id: "vs1",
        title: "Toyota RAV4 hybride",
        city: "Sousse",
        price: 220,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
        meta: "SUV · Hybride · GPS",
        rating: 4.9,
      },
      {
        id: "vs2",
        title: "Dacia Duster 4x4",
        city: "Tozeur",
        price: 180,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
        meta: "4x4 · Diesel · Idéal sud",
        rating: 4.7,
      },
      {
        id: "vs3",
        title: "Hyundai Tucson",
        city: "Tunis",
        price: 200,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
        meta: "Automatique · 5 places",
        rating: 4.8,
      },
      {
        id: "vs4",
        title: "Jeep Compass",
        city: "Nabeul",
        price: 240,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
        meta: "SUV · Clim · GPS",
        rating: 4.6,
      },
      {
        id: "vs5",
        title: "Kia Sportage",
        city: "Sfax",
        price: 190,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=900&q=80",
        meta: "Diesel · Caméra · Radar",
        rating: 4.7,
      },
    ],
  },
  {
    label: "Utilitaires",
    href: "#",
    desc: "Camionnettes & fourgons",
    items: [
      {
        id: "vu1",
        title: "Renault Express utilitaire",
        city: "Sfax",
        price: 95,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=900&q=80",
        meta: "Fourgon · Volume XL",
        rating: 4.6,
      },
      {
        id: "vu2",
        title: "Peugeot Partner",
        city: "Tunis",
        price: 85,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80",
        meta: "Compact · Idéal courses",
        rating: 4.5,
      },
      {
        id: "vu3",
        title: "Citroën Jumpy",
        city: "Sousse",
        price: 130,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80",
        meta: "Grand volume · Diesel",
        rating: 4.7,
      },
      {
        id: "vu4",
        title: "Fiat Doblo Cargo",
        city: "Gabès",
        price: 90,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80",
        meta: "Fiable · Économique",
        rating: 4.4,
      },
      {
        id: "vu5",
        title: "Ford Transit Custom",
        city: "Tunis",
        price: 160,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
        meta: "Pro · Capacité max",
        rating: 4.8,
      },
    ],
  },
  {
    label: "Motos",
    href: "#",
    desc: "Urbaines & sportives",
    items: [
      {
        id: "vm1",
        title: "Honda CB500F",
        city: "Tunis",
        price: 70,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
        meta: "500cc · Casque inclus",
        rating: 4.7,
      },
      {
        id: "vm2",
        title: "Yamaha MT-07",
        city: "Sousse",
        price: 85,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80",
        meta: "Roadster · Assurance",
        rating: 4.8,
      },
      {
        id: "vm3",
        title: "Kawasaki Z400",
        city: "Sfax",
        price: 75,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=900&q=80",
        meta: "Légère · Ville & route",
        rating: 4.6,
      },
      {
        id: "vm4",
        title: "BMW G 310 R",
        city: "Nabeul",
        price: 80,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=80",
        meta: "Premium · Casques x2",
        rating: 4.9,
      },
      {
        id: "vm5",
        title: "CFMoto 450NK",
        city: "Monastir",
        price: 65,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=80",
        meta: "Neuve · Garantie",
        rating: 4.5,
      },
    ],
  },
  {
    label: "Scooters",
    href: "#",
    desc: "Mobilité quotidienne",
    items: [
      {
        id: "vsc1",
        title: "Yamaha NMAX 155",
        city: "Nabeul",
        price: 45,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
        meta: "Scooter · Casque inclus",
        rating: 4.7,
      },
      {
        id: "vsc2",
        title: "Honda PCX 125",
        city: "Tunis",
        price: 40,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=80",
        meta: "Économique · Coffre",
        rating: 4.6,
      },
      {
        id: "vsc3",
        title: "Piaggio Medley",
        city: "Sousse",
        price: 38,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1619771914272-e3b4c4c9c5b2?auto=format&fit=crop&w=900&q=80",
        meta: "Léger · Ville",
        rating: 4.4,
      },
      {
        id: "vsc4",
        title: "Vespa Primavera",
        city: "Hammamet",
        price: 55,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=900&q=80",
        meta: "Style · Tourisme",
        rating: 4.8,
      },
      {
        id: "vsc5",
        title: "Sym Jet 14",
        city: "Sfax",
        price: 35,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1622186477895-f2af9a5f4b4a?auto=format&fit=crop&w=900&q=80",
        meta: "Pratique · Casque",
        rating: 4.3,
      },
    ],
  },
  {
    label: "Camions",
    href: "#",
    desc: "Déménagement & pro",
    items: [
      {
        id: "vc1",
        title: "Camion 3.5T déménagement",
        city: "Tunis",
        price: 220,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80",
        meta: "Hayon · Permis B",
        rating: 4.7,
      },
      {
        id: "vc2",
        title: "Camion plateau",
        city: "Sfax",
        price: 180,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1586191582151-f73872dfd183?auto=format&fit=crop&w=900&q=80",
        meta: "Charges lourdes",
        rating: 4.5,
      },
      {
        id: "vc3",
        title: "Fourgon XL 20m³",
        city: "Sousse",
        price: 200,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80",
        meta: "Idéal déménagement",
        rating: 4.8,
      },
      {
        id: "vc4",
        title: "Camion frigorifique",
        city: "Tunis",
        price: 260,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80",
        meta: "Froid · Pro",
        rating: 4.6,
      },
      {
        id: "vc5",
        title: "Petit camion urbain",
        city: "Ariana",
        price: 140,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80",
        meta: "Maniable · Ville",
        rating: 4.4,
      },
    ],
  },
];

export const moreMenu: MegaCategory[] = [
  {
    label: "Déménageurs",
    href: "#",
    desc: "Transporteurs vérifiés",
    items: [
      {
        id: "md1",
        title: "Express Déménagement Tunis",
        city: "Tunis",
        price: 180,
        unit: "course",
        image:
          "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=900&q=80",
        meta: "Équipe 3 pers. · Assurance",
        rating: 4.8,
      },
      {
        id: "md2",
        title: "Sfax Move Pro",
        city: "Sfax",
        price: 150,
        unit: "course",
        image:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
        meta: "Local & inter-villes",
        rating: 4.6,
      },
      {
        id: "md3",
        title: "Sahel Transport",
        city: "Sousse",
        price: 160,
        unit: "course",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
        meta: "Camion + main d’œuvre",
        rating: 4.7,
      },
      {
        id: "md4",
        title: "Nord Déménage",
        city: "Bizerte",
        price: 140,
        unit: "course",
        image:
          "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=900&q=80",
        meta: "Emballage inclus",
        rating: 4.5,
      },
      {
        id: "md5",
        title: "Cap Bon Logistics",
        city: "Nabeul",
        price: 155,
        unit: "course",
        image:
          "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=900&q=80",
        meta: "Rapide · Devis gratuit",
        rating: 4.9,
      },
    ],
  },
  {
    label: "Parking & garages",
    href: "#",
    desc: "Places sécurisées",
    items: [
      {
        id: "mp1",
        title: "Parking sécurisé Lac",
        city: "Tunis",
        price: 120,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80",
        meta: "Couvert · Caméras",
        rating: 4.6,
      },
      {
        id: "mp2",
        title: "Garage privé centre",
        city: "Sousse",
        price: 90,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1590674899484-d5640e668dfb?auto=format&fit=crop&w=900&q=80",
        meta: "Accès 24/7 · 1 place",
        rating: 4.5,
      },
      {
        id: "mp3",
        title: "Parking aéroport",
        city: "Tunis",
        price: 15,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=900&q=80",
        meta: "Navette · Surveillé",
        rating: 4.7,
      },
      {
        id: "mp4",
        title: "Box garage Sfax",
        city: "Sfax",
        price: 100,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=900&q=80",
        meta: "Fermé · Sécurisé",
        rating: 4.4,
      },
      {
        id: "mp5",
        title: "Parking plage",
        city: "Hammamet",
        price: 8,
        unit: "jour",
        image:
          "https://images.unsplash.com/photo-1470224114660-1df2bdfaf999?auto=format&fit=crop&w=900&q=80",
        meta: "Proche mer · Gardien",
        rating: 4.3,
      },
    ],
  },
  {
    label: "Stockage",
    href: "#",
    desc: "Box & entrepôts",
    items: [
      {
        id: "ms1",
        title: "Box 5m² sécurisé",
        city: "Tunis",
        price: 80,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
        meta: "Accès libre · Caméras",
        rating: 4.6,
      },
      {
        id: "ms2",
        title: "Box 10m² climatisé",
        city: "Sousse",
        price: 140,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
        meta: "Clim · Assurance",
        rating: 4.8,
      },
      {
        id: "ms3",
        title: "Entrepôt partagé",
        city: "Sfax",
        price: 200,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=900&q=80",
        meta: "20m² · Accès pro",
        rating: 4.5,
      },
      {
        id: "ms4",
        title: "Mini-box déménagement",
        city: "Ariana",
        price: 60,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=900&q=80",
        meta: "3m² · Court terme",
        rating: 4.4,
      },
      {
        id: "ms5",
        title: "Stockage meubles",
        city: "Ben Arous",
        price: 110,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=900&q=80",
        meta: "Grand volume · Sec",
        rating: 4.7,
      },
    ],
  },
  {
    label: "Visite virtuelle",
    href: "#",
    desc: "Explorer en 360°",
    items: [
      {
        id: "mv1",
        title: "Villa Hammamet en 360°",
        city: "Hammamet",
        price: 450,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80",
        meta: "Visite immersive · Piscine",
        rating: 4.9,
      },
      {
        id: "mv2",
        title: "Appartement Lac 360°",
        city: "Tunis",
        price: 1800,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3be61?auto=format&fit=crop&w=900&q=80",
        meta: "Tour complet · HD",
        rating: 4.8,
      },
      {
        id: "mv3",
        title: "Maison Sidi Bou 360°",
        city: "Sidi Bou Saïd",
        price: 320,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        meta: "Médina · Terrasse",
        rating: 5.0,
      },
      {
        id: "mv4",
        title: "Duplex Ariana 360°",
        city: "Ariana",
        price: 2100,
        unit: "mois",
        image:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
        meta: "2 niveaux · Parking",
        rating: 4.7,
      },
      {
        id: "mv5",
        title: "Villa Djerba 360°",
        city: "Djerba",
        price: 520,
        unit: "nuit",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
        meta: "Vue mer · Extérieur",
        rating: 4.9,
      },
    ],
  },
];

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    category: "Maison",
    title: "Villa vue mer à Hammamet",
    subtitle: "Séjournez face à la Méditerranée",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80",
    accent: "À partir de 420 TND / nuit",
  },
  {
    id: "2",
    category: "Véhicule",
    title: "SUV premium à Tunis",
    subtitle: "Partez où vous voulez, en toute aisance",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=80",
    accent: "À partir de 180 TND / jour",
  },
  {
    id: "3",
    category: "Offre",
    title: "−25% ce week-end",
    subtitle: "Maisons & véhicules sélectionnés partout en Tunisie",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
    accent: "Offres limitées · Tunisie",
  },
  {
    id: "4",
    category: "Maison",
    title: "Appartement design à Sousse",
    subtitle: "Centre-ville, meublé, prêt à emménager",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1920&q=80",
    accent: "1 250 TND / mois",
  },
  {
    id: "5",
    category: "Véhicule",
    title: "Citadine idéale à Sfax",
    subtitle: "Économique, fiable, disponible immédiatement",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80",
    accent: "95 TND / jour",
  },
];

export const latestListings: Listing[] = [
  {
    id: "h1",
    type: "maison",
    title: "Villa contemporaine avec piscine",
    city: "Hammamet",
    price: 450,
    unit: "nuit",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80",
    badge: "Nouveau",
    meta: "4 chambres · 3 SDB · Piscine",
    rating: 4.9,
  },
  {
    id: "v1",
    type: "vehicule",
    title: "Peugeot 208 — automatique",
    city: "Tunis",
    price: 110,
    unit: "jour",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
    badge: "Nouveau",
    meta: "Essence · 5 places · Clim",
    rating: 4.8,
  },
  {
    id: "h2",
    type: "maison",
    title: "Appartement standing Lac 2",
    city: "Tunis",
    price: 1800,
    unit: "mois",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3be61?auto=format&fit=crop&w=900&q=80",
    meta: "3 pièces · Meublé · Ascenseur",
    rating: 4.7,
  },
  {
    id: "v2",
    type: "vehicule",
    title: "Toyota RAV4 hybride",
    city: "Sousse",
    price: 220,
    unit: "jour",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
    badge: "Populaire",
    meta: "SUV · Hybride · GPS",
    rating: 4.9,
  },
  {
    id: "h3",
    type: "maison",
    title: "Maison traditionnelle rénovée",
    city: "Sidi Bou Saïd",
    price: 320,
    unit: "nuit",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    meta: "2 chambres · Terrasse · Vue",
    rating: 5.0,
  },
  {
    id: "v3",
    type: "vehicule",
    title: "Renault Express utilitaire",
    city: "Sfax",
    price: 95,
    unit: "jour",
    image:
      "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=900&q=80",
    meta: "Fourgon · Volume XL",
    rating: 4.6,
  },
  {
    id: "h4",
    type: "maison",
    title: "Studio cosy près de la médina",
    city: "Sousse",
    price: 650,
    unit: "mois",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    badge: "Nouveau",
    meta: "1 pièce · Cuisine équipée",
    rating: 4.5,
  },
  {
    id: "v4",
    type: "vehicule",
    title: "Yamaha NMAX 155",
    city: "Nabeul",
    price: 45,
    unit: "jour",
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
    meta: "Scooter · Casque inclus",
    rating: 4.7,
  },
  {
    id: "h5",
    type: "maison",
    title: "Duplex moderne avec parking",
    city: "Ariana",
    price: 2100,
    unit: "mois",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
    meta: "4 pièces · Parking · Fibre",
    rating: 4.8,
  },
  {
    id: "v5",
    type: "vehicule",
    title: "Mercedes Classe C",
    city: "Monastir",
    price: 280,
    unit: "jour",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
    badge: "Premium",
    meta: "Automatique · Cuir · GPS",
    rating: 4.9,
  },
];

export const weekendOffers = [
  {
    id: "o1",
    title: "Week-end villa · Hammamet",
    discount: "−30%",
    oldPrice: 900,
    newPrice: 630,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    tag: "Maison",
    city: "Hammamet",
    ends: "Dimanche 23h",
  },
  {
    id: "o2",
    title: "SUV 3 jours · Tunis",
    discount: "−20%",
    oldPrice: 660,
    newPrice: 528,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    tag: "Véhicule",
    city: "Tunis",
    ends: "Lundi 12h",
  },
  {
    id: "o3",
    title: "Appartement vue mer · Djerba",
    discount: "−25%",
    oldPrice: 800,
    newPrice: 600,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=900&q=80",
    tag: "Maison",
    city: "Djerba",
    ends: "Dimanche 20h",
  },
  {
    id: "o4",
    title: "Citadine week-end · Sousse",
    discount: "−35%",
    oldPrice: 280,
    newPrice: 182,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
    tag: "Véhicule",
    city: "Sousse",
    ends: "Dimanche 18h",
  },
  {
    id: "o5",
    title: "Duplex flash · Ariana",
    discount: "−15%",
    oldPrice: 2100,
    newPrice: 1785,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
    tag: "Maison",
    city: "Ariana",
    ends: "Lundi 10h",
  },
  {
    id: "o6",
    title: "Scooter 2 jours · Nabeul",
    discount: "−40%",
    oldPrice: 90,
    newPrice: 54,
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
    tag: "Véhicule",
    city: "Nabeul",
    ends: "Dimanche 22h",
  },
];

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
