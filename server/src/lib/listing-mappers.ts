import type {
  HouseListing as DbHouse,
  Owner,
  ReservationRequest as DbReservation,
  VehicleListing as DbVehicle,
} from "@prisma/client";

type OwnerHost = Pick<
  Owner,
  "name" | "avatarUrl" | "phone"
>;

function hostFromOwner(owner: OwnerHost) {
  const phoneDigits = (owner.phone || "+21620000000").replace(/\D/g, "") || "21620000000";
  return {
    name: owner.name,
    avatar:
      owner.avatarUrl ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    responseTime: "< 1 h",
    verified: true,
    phone: phoneDigits.startsWith("216") ? phoneDigits : `216${phoneDigits}`,
  };
}

export function mapHouse(
  row: DbHouse,
  owner: OwnerHost,
) {
  return {
    id: row.id,
    type: "maison" as const,
    title: row.title,
    description: row.description,
    city: row.city,
    governorate: row.governorate,
    addressArea: row.addressArea,
    category: row.category,
    price: row.price,
    unit: row.unit as "nuit" | "mois",
    rating: row.rating,
    reviewsCount: row.reviewsCount,
    images: row.images,
    featured: row.featured,
    tour3dUrl: row.tour3dUrl || undefined,
    amenities: row.amenities,
    specs: {
      bedrooms: row.bedrooms,
      bathrooms: row.bathrooms,
      area: row.area,
      furnished: row.furnished,
      floor: row.floor ?? undefined,
      parking: row.parking,
      petsAllowed: row.petsAllowed,
    },
    host: hostFromOwner(owner),
    availableFrom: row.availableFrom.toISOString().slice(0, 10),
  };
}

export function mapVehicle(
  row: DbVehicle,
  owner: OwnerHost,
) {
  return {
    id: row.id,
    type: "vehicule" as const,
    title: row.title,
    description: row.description,
    city: row.city,
    governorate: row.governorate,
    category: row.category,
    price: row.price,
    unit: row.unit as "jour" | "semaine",
    rating: row.rating,
    reviewsCount: row.reviewsCount,
    images: row.images,
    featured: row.featured,
    tour3dUrl: row.tour3dUrl || undefined,
    features: row.features,
    specs: {
      brand: row.brand,
      model: row.model,
      year: row.year,
      transmission: row.transmission as "Manuelle" | "Automatique",
      fuel: row.fuel as "Essence" | "Diesel" | "Hybride" | "Électrique",
      seats: row.seats,
      doors: row.doors,
      mileage: row.mileage,
      airConditioning: row.airConditioning,
    },
    host: hostFromOwner(owner),
    availableFrom: row.availableFrom.toISOString().slice(0, 10),
  };
}

export function mapReservation(row: DbReservation) {
  return {
    id: row.id,
    listingId: row.houseId || row.vehicleId || "",
    listingType: row.listingType === "maison" ? ("maison" as const) : ("vehicule" as const),
    listingTitle: row.listingTitle,
    listingCity: row.listingCity,
    listingImage: row.listingImage,
    ownerName: row.ownerName,
    clientName: row.clientName,
    clientPhone: row.clientPhone,
    clientEmail: row.clientEmail || "",
    startDate: row.startDate.toISOString().slice(0, 10),
    endDate: row.endDate.toISOString().slice(0, 10),
    message: row.message,
    status: row.status as "pending" | "accepted" | "rejected",
    createdAt: row.createdAt.toISOString(),
  };
}
