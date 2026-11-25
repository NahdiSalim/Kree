import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/owner-auth";

export type ReservationStatus = "pending" | "accepted" | "rejected";

export interface ReservationRequest {
  id: string;
  listingId: string;
  listingType: "maison" | "vehicule";
  listingTitle: string;
  listingCity: string;
  listingImage: string;
  ownerName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  startDate: string;
  endDate: string;
  message: string;
  status: ReservationStatus;
  createdAt: string;
}

function authToken() {
  const token = getToken();
  if (!token) throw new Error("Non authentifié");
  return token;
}

export async function fetchOwnerReservations(): Promise<ReservationRequest[]> {
  const data = await apiFetch<{ reservations: ReservationRequest[] }>(
    "/api/reservations/mine",
    { token: authToken() },
  );
  return data.reservations;
}

export async function addReservation(input: {
  listingId: string;
  listingType: "maison" | "vehicule";
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  startDate: string;
  endDate: string;
  message?: string;
}): Promise<ReservationRequest> {
  const data = await apiFetch<{ reservation: ReservationRequest }>(
    "/api/reservations",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  window.dispatchEvent(new Event("kree-reservations-updated"));
  return data.reservation;
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
): Promise<ReservationRequest> {
  const data = await apiFetch<{ reservation: ReservationRequest }>(
    `/api/reservations/${id}`,
    {
      method: "PATCH",
      token: authToken(),
      body: JSON.stringify({ status }),
    },
  );
  window.dispatchEvent(new Event("kree-reservations-updated"));
  return data.reservation;
}

export function whatsappUrl(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function useOwnerReservations() {
  const [items, setItems] = useState<ReservationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setError("");
      const reservations = await fetchOwnerReservations();
      setItems(reservations);
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
    window.addEventListener("kree-reservations-updated", onUpdate);
    return () => window.removeEventListener("kree-reservations-updated", onUpdate);
  }, [reload]);

  return { items, loading, error, reload };
}

export function usePendingReservationCount() {
  const { items, loading } = useOwnerReservations();
  const count = items.filter((r) => r.status === "pending").length;
  return loading ? 0 : count;
}

export type DashboardStats = {
  houses: number;
  vehicles: number;
  pending: number;
  totalReservations: number;
};

export async function fetchOwnerDashboard(): Promise<{
  stats: DashboardStats;
  pendingReservations: ReservationRequest[];
}> {
  return apiFetch("/api/owner/stats", { token: authToken() });
}

export function useOwnerDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    houses: 0,
    vehicles: 0,
    pending: 0,
    totalReservations: 0,
  });
  const [pendingReservations, setPending] = useState<ReservationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await fetchOwnerDashboard();
      setStats(data.stats);
      setPending(data.pendingReservations);
    } catch {
      setStats({ houses: 0, vehicles: 0, pending: 0, totalReservations: 0 });
      setPending([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
    const onUpdate = () => void reload();
    window.addEventListener("kree-reservations-updated", onUpdate);
    window.addEventListener("kree-owner-listings-updated", onUpdate);
    return () => {
      window.removeEventListener("kree-reservations-updated", onUpdate);
      window.removeEventListener("kree-owner-listings-updated", onUpdate);
    };
  }, [reload]);

  return { stats, pendingReservations, loading, reload };
}
