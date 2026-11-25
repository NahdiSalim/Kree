import { tunisianCities } from "../home/data";

export { tunisianCities };

export type HouseCategory =
  | "Appartement"
  | "Villa"
  | "Maison"
  | "Studio"
  | "Duplex"
  | "Résidence meublée";

export type VehicleCategory =
  | "Voiture"
  | "SUV"
  | "Utilitaire"
  | "Moto"
  | "Scooter"
  | "Camion";

export interface HostInfo {
  name: string;
  avatar: string;
  rating: number;
  responseTime: string;
  verified: boolean;
  /** WhatsApp / mobile in international format without + (TN: 216XXXXXXXX) */
  phone: string;
}

export interface HouseListing {
  id: string;
  type: "maison";
  title: string;
  description: string;
  city: string;
  governorate: string;
  addressArea: string;
  category: HouseCategory;
  price: number;
  unit: "nuit" | "mois";
  rating: number;
  reviewsCount: number;
  images: string[];
  badge?: string;
  featured?: boolean;
  tour3dUrl?: string;
  amenities: string[];
  specs: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    furnished: boolean;
    floor?: number;
    parking: boolean;
    petsAllowed: boolean;
  };
  host: HostInfo;
  availableFrom: string;
}

export interface VehicleListing {
  id: string;
  type: "vehicule";
  title: string;
  description: string;
  city: string;
  governorate: string;
  category: VehicleCategory;
  price: number;
  unit: "jour" | "semaine";
  rating: number;
  reviewsCount: number;
  images: string[];
  badge?: string;
  featured?: boolean;
  tour3dUrl?: string;
  features: string[];
  specs: {
    brand: string;
    model: string;
    year: number;
    transmission: "Manuelle" | "Automatique";
    fuel: "Essence" | "Diesel" | "Hybride" | "Électrique";
    seats: number;
    doors: number;
    mileage: number;
    airConditioning: boolean;
  };
  host: HostInfo;
  availableFrom: string;
}

export type AnyListing = HouseListing | VehicleListing;

export const houseCategories: HouseCategory[] = [
  "Appartement",
  "Villa",
  "Maison",
  "Studio",
  "Duplex",
  "Résidence meublée",
];

export const vehicleCategories: VehicleCategory[] = [
  "Voiture",
  "SUV",
  "Utilitaire",
  "Moto",
  "Scooter",
  "Camion",
];
