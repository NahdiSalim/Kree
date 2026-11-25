import { useMemo, useState } from "react";
import { PageMeta } from "@/components/shared/page-meta";
import {
  updateReservationStatus,
  useOwnerReservations,
  whatsappUrl,
  type ReservationStatus,
} from "@/lib/reservations";
import { OwnerDemandesSkeleton } from "./components/skeletons";

type Filter = "all" | "pending" | "accepted" | "rejected" | "maison" | "vehicule";

const statusLabel: Record<ReservationStatus, string> = {
  pending: "En attente",
  accepted: "Acceptée",
  rejected: "Refusée",
};

const statusClass: Record<ReservationStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-600",
};

export default function OwnerDemandesPage() {
  const { items, loading, reload } = useOwnerReservations();
  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return items.filter((r) => {
      if (filter === "pending" || filter === "accepted" || filter === "rejected") {
        return r.status === filter;
      }
      if (filter === "maison" || filter === "vehicule") {
        return r.listingType === filter;
      }
      return true;
    });
  }, [items, filter]);

  const setStatus = async (id: string, status: ReservationStatus) => {
    setBusyId(id);
    try {
      await updateReservationStatus(id, status);
      await reload();
    } catch {
      /* keep UI */
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Demandes | Kree Propriétaire" />
        <OwnerDemandesSkeleton />
      </>
    );
  }

  return (
    <>
      <PageMeta title="Demandes | Kree Propriétaire" />
      <div className="space-y-6">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
            Réservations
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[var(--kree-ink)]">
            Demandes reçues
          </h1>
          <p className="mt-1 text-sm text-[var(--kree-muted)]">
            Les clients envoient une demande sans compte. Traitez-les ici.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "Toutes"],
              ["pending", "En attente"],
              ["accepted", "Acceptées"],
              ["rejected", "Refusées"],
              ["maison", "Maisons"],
              ["vehicule", "Véhicules"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                filter === key
                  ? "bg-[var(--kree-blue)] text-white shadow-md shadow-[var(--kree-blue)]/20"
                  : "bg-white text-[var(--kree-muted)] ring-1 ring-[var(--kree-blue)]/12 hover:bg-[var(--kree-blue-soft)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[1.6rem] bg-white px-6 py-16 text-center shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10">
            <p className="font-display text-xl font-bold text-[var(--kree-ink)]">
              Aucune demande
            </p>
            <p className="mt-2 text-sm text-[var(--kree-muted)]">
              Quand un client remplit le formulaire sur une annonce, elle
              apparaîtra ici.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4">
            {filtered.map((r) => (
              <li
                key={r.id}
                className="rounded-[1.6rem] bg-white p-5 shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img
                    src={r.listingImage}
                    alt=""
                    className="h-28 w-full rounded-2xl object-cover sm:h-24 sm:w-32 sm:shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          r.listingType === "maison"
                            ? "bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]"
                            : "bg-orange-50 text-[var(--kree-orange-deep)]"
                        }`}
                      >
                        {r.listingType === "maison" ? "Maison" : "Véhicule"}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusClass[r.status]}`}
                      >
                        {statusLabel[r.status]}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold text-[var(--kree-ink)]">
                      {r.listingTitle}
                    </h3>
                    <p className="text-sm text-[var(--kree-muted)]">
                      {r.listingCity} · {r.startDate} → {r.endDate}
                    </p>
                    <div className="mt-3 grid gap-1 text-sm text-[var(--kree-ink)] sm:grid-cols-2">
                      <p>
                        <span className="font-semibold">Client :</span>{" "}
                        {r.clientName}
                      </p>
                      <p>
                        <span className="font-semibold">Tél :</span>{" "}
                        {r.clientPhone}
                      </p>
                      {r.clientEmail && (
                        <p>
                          <span className="font-semibold">E-mail :</span>{" "}
                          {r.clientEmail}
                        </p>
                      )}
                      <p className="text-xs text-[var(--kree-muted)]">
                        Reçue le {new Date(r.createdAt).toLocaleString("fr-TN")}
                      </p>
                    </div>
                    {r.message && (
                      <p className="mt-3 rounded-xl bg-[var(--kree-blue-soft)] px-3 py-2 text-sm text-[var(--kree-muted)]">
                        « {r.message} »
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--kree-blue)]/10 pt-4">
                  {r.status === "pending" && (
                    <>
                      <button
                        type="button"
                        disabled={busyId === r.id}
                        onClick={() => void setStatus(r.id, "accepted")}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                      >
                        Accepter
                      </button>
                      <button
                        type="button"
                        disabled={busyId === r.id}
                        onClick={() => void setStatus(r.id, "rejected")}
                        className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-red-600 ring-1 ring-red-200 disabled:opacity-60"
                      >
                        Refuser
                      </button>
                    </>
                  )}
                  <a
                    href={whatsappUrl(
                      r.clientPhone,
                      `Bonjour ${r.clientName}, concernant votre demande Kree pour « ${r.listingTitle} »…`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-[var(--kree-orange)] px-4 py-2 text-sm font-semibold text-white"
                  >
                    WhatsApp client
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
