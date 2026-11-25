import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { invalidateHomeCache } from "@/lib/home-api";
import { getToken } from "@/lib/owner-auth";
import type {
  HouseListing,
  VehicleListing,
} from "@/pages/marketing/listings/data";

type CreateHouseInput = {
  title: string;
  description: string;
  city: string;
  governorate: string;
  addressArea: string;
  category: string;
  price: number;
  unit: "nuit" | "mois";
  images: string[];
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
  availableFrom: string;
};

type CreateVehicleInput = {
  title: string;
  description: string;
  city: string;
  governorate: string;
  category: string;
  price: number;
  unit: "jour" | "semaine";
  images: string[];
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
  availableFrom: string;
};

function authToken() {
  const token = getToken();
  if (!token) throw new Error("Non authentifié");
  return token;
}

export async function fetchOwnerHouses(): Promise<HouseListing[]> {
  const data = await apiFetch<{ houses: HouseListing[] }>("/api/owner/houses", {
    token: authToken(),
  });
  return data.houses;
}

export async function fetchOwnerVehicles(): Promise<VehicleListing[]> {
  const data = await apiFetch<{ vehicles: VehicleListing[] }>(
    "/api/owner/vehicles",
    { token: authToken() },
  );
  return data.vehicles;
}

export async function fetchPublicHouses(): Promise<HouseListing[]> {
  const data = await apiFetch<{ houses: HouseListing[] }>("/api/listings/houses");
  return data.houses;
}

export async function fetchPublicVehicles(): Promise<VehicleListing[]> {
  const data = await apiFetch<{ vehicles: VehicleListing[] }>(
    "/api/listings/vehicles",
  );
  return data.vehicles;
}

export async function fetchHouseById(id: string): Promise<HouseListing | null> {
  try {
    const data = await apiFetch<{ house: HouseListing }>(
      `/api/listings/houses/${id}`,
    );
    return data.house;
  } catch {
    return null;
  }
}

export async function fetchVehicleById(
  id: string,
): Promise<VehicleListing | null> {
  try {
    const data = await apiFetch<{ vehicle: VehicleListing }>(
      `/api/listings/vehicles/${id}`,
    );
    return data.vehicle;
  } catch {
    return null;
  }
}

export async function addOwnerHouse(
  input: CreateHouseInput,
): Promise<HouseListing> {
  const data = await apiFetch<{ house: HouseListing }>("/api/owner/houses", {
    method: "POST",
    token: authToken(),
    body: JSON.stringify({
      title: input.title,
      description: input.description,
      city: input.city,
      governorate: input.governorate,
      addressArea: input.addressArea,
      category: input.category,
      price: input.price,
      unit: input.unit,
      images: input.images,
      amenities: input.amenities,
      bedrooms: input.specs.bedrooms,
      bathrooms: input.specs.bathrooms,
      area: input.specs.area,
      furnished: input.specs.furnished,
      floor: input.specs.floor ?? null,
      parking: input.specs.parking,
      petsAllowed: input.specs.petsAllowed,
      availableFrom: input.availableFrom,
    }),
  });
  invalidateHomeCache();
  window.dispatchEvent(new Event("kree-owner-listings-updated"));
  return data.house;
}

export async function addOwnerVehicle(
  input: CreateVehicleInput,
): Promise<VehicleListing> {
  const data = await apiFetch<{ vehicle: VehicleListing }>(
    "/api/owner/vehicles",
    {
      method: "POST",
      token: authToken(),
      body: JSON.stringify({
        title: input.title,
        description: input.description,
        city: input.city,
        governorate: input.governorate,
        category: input.category,
        price: input.price,
        unit: input.unit,
        images: input.images,
        features: input.features,
        brand: input.specs.brand,
        model: input.specs.model,
        year: input.specs.year,
        transmission: input.specs.transmission,
        fuel: input.specs.fuel,
        seats: input.specs.seats,
        doors: input.specs.doors,
        mileage: input.specs.mileage,
        airConditioning: input.specs.airConditioning,
        availableFrom: input.availableFrom,
      }),
    },
  );
  invalidateHomeCache();
  window.dispatchEvent(new Event("kree-owner-listings-updated"));
  return data.vehicle;
}

export async function deleteOwnerHouse(id: string): Promise<void> {
  await apiFetch(`/api/owner/houses/${id}`, {
    method: "DELETE",
    token: authToken(),
  });
  invalidateHomeCache();
  window.dispatchEvent(new Event("kree-owner-listings-updated"));
}

export async function deleteOwnerVehicle(id: string): Promise<void> {
  await apiFetch(`/api/owner/vehicles/${id}`, {
    method: "DELETE",
    token: authToken(),
  });
  invalidateHomeCache();
  window.dispatchEvent(new Event("kree-owner-listings-updated"));
}

export function useOwnerHouses() {
  const [items, setItems] = useState<HouseListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setError("");
      const houses = await fetchOwnerHouses();
      setItems(houses);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
    const onUpdate = () => void reload();
    window.addEventListener("kree-owner-listings-updated", onUpdate);
    return () => window.removeEventListener("kree-owner-listings-updated", onUpdate);
  }, [reload]);

  return { items, loading, error, reload };
}

export function useOwnerVehicles() {
  const [items, setItems] = useState<VehicleListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setError("");
      const vehicles = await fetchOwnerVehicles();
      setItems(vehicles);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
    const onUpdate = () => void reload();
    window.addEventListener("kree-owner-listings-updated", onUpdate);
    return () => window.removeEventListener("kree-owner-listings-updated", onUpdate);
  }, [reload]);

  return { items, loading, error, reload };
}

export function usePublicHouses() {
  const [items, setItems] = useState<HouseListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const houses = await fetchPublicHouses();
        if (!cancelled) setItems(houses);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}

export function usePublicVehicles() {
  const [items, setItems] = useState<VehicleListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const vehicles = await fetchPublicVehicles();
        if (!cancelled) setItems(vehicles);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}
