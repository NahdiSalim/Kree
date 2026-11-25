import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const HOUSE_CATEGORIES = [
  "Appartement",
  "Villa",
  "Maison",
  "Studio",
  "Duplex",
  "Résidence meublée",
] as const;

const VEHICLE_CATEGORIES = [
  "Voiture",
  "SUV",
  "Utilitaire",
  "Moto",
  "Scooter",
  "Camion",
] as const;

const CITIES = [
  { city: "Tunis", governorate: "Tunis", area: "Lac 2" },
  { city: "La Marsa", governorate: "Tunis", area: "Corniche" },
  { city: "Hammamet", governorate: "Nabeul", area: "Yasmine" },
  { city: "Sousse", governorate: "Sousse", area: "Port El Kantaoui" },
  { city: "Sfax", governorate: "Sfax", area: "Route de l'Aéroport" },
  { city: "Monastir", governorate: "Monastir", area: "Centre-ville" },
  { city: "Nabeul", governorate: "Nabeul", area: "Médina" },
  { city: "Bizerte", governorate: "Bizerte", area: "Corniche" },
  { city: "Djerba", governorate: "Médenine", area: "Houmt Souk" },
  { city: "Aïn Draham", governorate: "Jendouba", area: "Forêt" },
] as const;

const HOUSE_IMAGES = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
];

const VEHICLE_IMAGES = [
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1601584115197-04ecc1beb1d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517940310602-265638da7b66?auto=format&fit=crop&w=1200&q=80",
];

const AMENITIES = [
  "Wi-Fi",
  "Climatisation",
  "Cuisine équipée",
  "Lave-linge",
  "TV",
  "Chauffage",
  "Balcon",
  "Ascenseur",
];

const FEATURES = [
  "GPS",
  "Bluetooth",
  "Caméra de recul",
  "Régulateur",
  "USB",
  "Sièges chauffants",
];

const HOUSE_TITLES: Record<(typeof HOUSE_CATEGORIES)[number], string[]> = {
  Appartement: [
    "Appartement lumineux vue lac",
    "F3 moderne proche centre",
    "Appartement cosy avec balcon",
    "Standing spacieux parking",
    "Appartement neuf meublé",
  ],
  Villa: [
    "Villa avec piscine privée",
    "Villa jardin & terrasse",
    "Villa familiale vue mer",
    "Villa contemporaine calme",
    "Villa luxe avec BBQ",
  ],
  Maison: [
    "Maison traditionnelle rénovée",
    "Maison familiale avec patio",
    "Maison de ville charmante",
    "Maison verdoyante 4 chambres",
    "Maison calme proche plage",
  ],
  Studio: [
    "Studio étudiant bien situé",
    "Studio meublé tout inclus",
    "Studio cosy centre-ville",
    "Studio moderne climatisée",
    "Studio indépendant calme",
  ],
  Duplex: [
    "Duplex design 2 niveaux",
    "Duplex terrasse panoramique",
    "Duplex familial spacieux",
    "Duplex neuf standing",
    "Duplex avec parking privé",
  ],
  "Résidence meublée": [
    "Résidence meublée premium",
    "Suite résidence services",
    "Résidence longue durée",
    "Appart-hôtel meublé",
    "Résidence sécurisée Wi-Fi",
  ],
};

const VEHICLE_DATA: Record<
  (typeof VEHICLE_CATEGORIES)[number],
  { brand: string; model: string; seats: number; doors: number; title: string }[]
> = {
  Voiture: [
    { brand: "Peugeot", model: "208", seats: 5, doors: 5, title: "Peugeot 208 citadine" },
    { brand: "Renault", model: "Clio", seats: 5, doors: 5, title: "Renault Clio automatique" },
    { brand: "Volkswagen", model: "Golf", seats: 5, doors: 5, title: "VW Golf confort" },
    { brand: "Toyota", model: "Corolla", seats: 5, doors: 4, title: "Toyota Corolla hybride" },
    { brand: "Hyundai", model: "i20", seats: 5, doors: 5, title: "Hyundai i20 économique" },
  ],
  SUV: [
    { brand: "Dacia", model: "Duster", seats: 5, doors: 5, title: "Dacia Duster 4x4" },
    { brand: "Hyundai", model: "Tucson", seats: 5, doors: 5, title: "Hyundai Tucson SUV" },
    { brand: "Toyota", model: "RAV4", seats: 5, doors: 5, title: "Toyota RAV4 familiale" },
    { brand: "Kia", model: "Sportage", seats: 5, doors: 5, title: "Kia Sportage automatique" },
    { brand: "Nissan", model: "Qashqai", seats: 5, doors: 5, title: "Nissan Qashqai confort" },
  ],
  Utilitaire: [
    { brand: "Renault", model: "Kangoo", seats: 2, doors: 3, title: "Renault Kangoo utilitaire" },
    { brand: "Peugeot", model: "Partner", seats: 2, doors: 3, title: "Peugeot Partner fourgon" },
    { brand: "Citroën", model: "Berlingo", seats: 2, doors: 3, title: "Citroën Berlingo cargo" },
    { brand: "Fiat", model: "Doblo", seats: 2, doors: 3, title: "Fiat Doblo volume" },
    { brand: "Ford", model: "Transit Connect", seats: 2, doors: 4, title: "Ford Transit Connect" },
  ],
  Moto: [
    { brand: "Yamaha", model: "MT-07", seats: 2, doors: 0, title: "Yamaha MT-07 sportive" },
    { brand: "Honda", model: "CB500F", seats: 2, doors: 0, title: "Honda CB500F urbaine" },
    { brand: "Kawasaki", model: "Z650", seats: 2, doors: 0, title: "Kawasaki Z650 roadster" },
    { brand: "BMW", model: "G 310 R", seats: 2, doors: 0, title: "BMW G 310 R légère" },
    { brand: "Suzuki", model: "SV650", seats: 2, doors: 0, title: "Suzuki SV650 duo" },
  ],
  Scooter: [
    { brand: "Yamaha", model: "NMAX 125", seats: 2, doors: 0, title: "Yamaha NMAX 125" },
    { brand: "Honda", model: "PCX 125", seats: 2, doors: 0, title: "Honda PCX 125" },
    { brand: "Piaggio", model: "Medley", seats: 2, doors: 0, title: "Piaggio Medley urbain" },
    { brand: "Kymco", model: "Agility", seats: 2, doors: 0, title: "Kymco Agility pratique" },
    { brand: "Peugeot", model: "Django", seats: 2, doors: 0, title: "Peugeot Django style" },
  ],
  Camion: [
    { brand: "Iveco", model: "Daily", seats: 3, doors: 2, title: "Iveco Daily déménagement" },
    { brand: "Mercedes", model: "Sprinter", seats: 3, doors: 2, title: "Mercedes Sprinter volume" },
    { brand: "Renault", model: "Master", seats: 3, doors: 2, title: "Renault Master plateau" },
    { brand: "Ford", model: "Transit", seats: 3, doors: 2, title: "Ford Transit grand volume" },
    { brand: "Fiat", model: "Ducato", seats: 3, doors: 2, title: "Fiat Ducato utilitaire" },
  ],
};

function pick<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length]!;
}

function houseSpecs(category: (typeof HOUSE_CATEGORIES)[number], i: number) {
  switch (category) {
    case "Studio":
      return { bedrooms: 0, bathrooms: 1, area: 28 + i * 4, unit: "mois" as const, price: 450 + i * 40 };
    case "Appartement":
      return { bedrooms: 2 + (i % 2), bathrooms: 1 + (i % 2), area: 75 + i * 10, unit: "nuit" as const, price: 120 + i * 25 };
    case "Villa":
      return { bedrooms: 3 + (i % 3), bathrooms: 2 + (i % 2), area: 180 + i * 25, unit: "nuit" as const, price: 350 + i * 50 };
    case "Maison":
      return { bedrooms: 3 + (i % 2), bathrooms: 2, area: 140 + i * 15, unit: "nuit" as const, price: 220 + i * 30 };
    case "Duplex":
      return { bedrooms: 3, bathrooms: 2, area: 120 + i * 12, unit: "nuit" as const, price: 200 + i * 35 };
    case "Résidence meublée":
      return { bedrooms: 1 + (i % 2), bathrooms: 1, area: 45 + i * 8, unit: "mois" as const, price: 800 + i * 80 };
  }
}

function vehiclePrice(category: (typeof VEHICLE_CATEGORIES)[number], i: number) {
  switch (category) {
    case "Voiture":
      return { price: 90 + i * 15, unit: "jour" as const };
    case "SUV":
      return { price: 160 + i * 20, unit: "jour" as const };
    case "Utilitaire":
      return { price: 110 + i * 15, unit: "jour" as const };
    case "Moto":
      return { price: 70 + i * 10, unit: "jour" as const };
    case "Scooter":
      return { price: 35 + i * 5, unit: "jour" as const };
    case "Camion":
      return { price: 220 + i * 25, unit: "jour" as const };
  }
}

async function main() {
  const email = "demo@tunisrent.tn";
  const passwordHash = await bcrypt.hash("Demo1234!", 10);

  const owner = await prisma.owner.upsert({
    where: { email },
    update: {
      name: "Amine Ben Salah",
      phone: "+21698123456",
      city: "Tunis",
      company: "TunisRent Demo",
      bio: "Propriétaire démo — maisons et véhicules partout en Tunisie.",
    },
    create: {
      email,
      passwordHash,
      name: "Amine Ben Salah",
      phone: "+21698123456",
      city: "Tunis",
      company: "TunisRent Demo",
      bio: "Propriétaire démo — maisons et véhicules partout en Tunisie.",
    },
  });

  // Replace previous seed listings for this owner (keep other owners untouched)
  await prisma.reservationRequest.deleteMany({
    where: {
      OR: [{ house: { ownerId: owner.id } }, { vehicle: { ownerId: owner.id } }],
    },
  });
  await prisma.houseListing.deleteMany({ where: { ownerId: owner.id } });
  await prisma.vehicleListing.deleteMany({ where: { ownerId: owner.id } });

  const availableFrom = new Date();
  availableFrom.setDate(availableFrom.getDate() + 3);

  let houseCount = 0;
  for (const category of HOUSE_CATEGORIES) {
    for (let i = 0; i < 5; i++) {
      const place = pick(CITIES, houseCount + i);
      const specs = houseSpecs(category, i);
      const title = HOUSE_TITLES[category][i]!;
      await prisma.houseListing.create({
        data: {
          ownerId: owner.id,
          title: `${title} — ${place.city}`,
          description: `${title} situé à ${place.area}, ${place.city}. Idéal pour un séjour confortable en Tunisie. Cuisine équipée, Wi-Fi fibre, lit confortable et accueil soigné. Disponible immédiatement via TunisRent.`,
          city: place.city,
          governorate: place.governorate,
          addressArea: place.area,
          category,
          price: specs.price,
          unit: specs.unit,
          images: [
            pick(HOUSE_IMAGES, houseCount + i),
            pick(HOUSE_IMAGES, houseCount + i + 3),
          ],
          amenities: AMENITIES.slice(0, 4 + (i % 4)),
          bedrooms: specs.bedrooms,
          bathrooms: specs.bathrooms,
          area: specs.area,
          furnished: true,
          floor: category === "Villa" || category === "Maison" ? null : 1 + (i % 5),
          parking: i % 2 === 0,
          petsAllowed: i % 3 === 0,
          availableFrom,
          rating: 4.4 + (i % 6) * 0.1,
          reviewsCount: 3 + i * 4,
          featured: i < 2,
        },
      });
      houseCount++;
    }
  }

  let vehicleCount = 0;
  for (const category of VEHICLE_CATEGORIES) {
    for (let i = 0; i < 5; i++) {
      const place = pick(CITIES, vehicleCount + i);
      const car = VEHICLE_DATA[category][i]!;
      const pricing = vehiclePrice(category, i);
      const isTwoWheeler = category === "Moto" || category === "Scooter";
      await prisma.vehicleListing.create({
        data: {
          ownerId: owner.id,
          title: `${car.title} — ${place.city}`,
          description: `${car.title} disponible à ${place.city}. Entretien à jour, assurance incluse, remise des clés flexible. Idéal pour vos déplacements en Tunisie via TunisRent.`,
          city: place.city,
          governorate: place.governorate,
          category,
          price: pricing.price,
          unit: pricing.unit,
          images: [
            pick(VEHICLE_IMAGES, vehicleCount + i),
            pick(VEHICLE_IMAGES, vehicleCount + i + 2),
          ],
          features: FEATURES.slice(0, isTwoWheeler ? 3 : 4 + (i % 3)),
          brand: car.brand,
          model: car.model,
          year: 2019 + (i % 6),
          transmission: i % 2 === 0 ? "Automatique" : "Manuelle",
          fuel: category === "Scooter" || category === "Moto"
            ? "Essence"
            : i % 4 === 0
              ? "Hybride"
              : i % 3 === 0
                ? "Diesel"
                : "Essence",
          seats: car.seats,
          doors: car.doors,
          mileage: 15000 + i * 8000 + vehicleCount * 100,
          airConditioning: !isTwoWheeler,
          availableFrom,
          rating: 4.3 + (i % 7) * 0.1,
          reviewsCount: 2 + i * 3,
          featured: i < 2,
        },
      });
      vehicleCount++;
    }
  }

  console.log(
    `Seed OK — owner ${email} / Demo1234! — ${houseCount} maisons, ${vehicleCount} véhicules`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
