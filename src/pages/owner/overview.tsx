import { Link } from "react-router";
import { PageMeta } from "@/components/shared/page-meta";
import { useOwnerSession } from "@/lib/owner-auth";
import { useOwnerDashboard } from "@/lib/reservations";
import { OwnerOverviewSkeleton } from "./components/skeletons";

export default function OwnerOverviewPage() {
  const owner = useOwnerSession();
  const { stats, pendingReservations: pending, loading } = useOwnerDashboard();

  if (loading) {
    return (
      <>
        <PageMeta title="Tableau de bord | Kree Propriétaire" />
        <OwnerOverviewSkeleton />
      </>
    );
  }

  const cards = [
    {
      label: "Maisons",
      value: stats.houses,
      hint: "Annonces logement",
      to: "/dashboard/maisons",
      tone: "blue" as const,
    },
    {
      label: "Véhicules",
      value: stats.vehicles,
      hint: "Annonces auto",
      to: "/dashboard/vehicules",
      tone: "orange" as const,
    },
    {
      label: "En attente",
      value: stats.pending,
      hint: "Demandes à traiter",
      to: "/dashboard/demandes",
      tone: "amber" as const,
    },
    {
      label: "Total",
      value: stats.totalReservations,
      hint: "Réservations reçues",
      to: "/dashboard/demandes",
      tone: "deep" as const,
    },
  ];

  return (
    <>
      <PageMeta title="Tableau de bord | Kree Propriétaire" />
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,#0c6e9a_0%,#084d6b_100%)] px-6 py-8 text-white shadow-[0_24px_50px_rgba(12,110,154,0.28)] sm:px-8">
          <div className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-[var(--kree-orange)]/25 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 size-32 rounded-full bg-white/10 blur-2xl" />
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
            Espace propriétaire
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Bonjour{owner?.name ? `, ${owner.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/75">
            Gérez vos maisons, véhicules et demandes de réservation depuis un
            seul endroit clair et simple.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="group relative overflow-hidden rounded-[1.4rem] bg-white p-5 shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(12,110,154,0.14)]"
            >
              <span
                className={`absolute top-0 right-0 size-24 translate-x-6 -translate-y-6 rounded-full opacity-15 ${
                  s.tone === "orange"
                    ? "bg-[var(--kree-orange)]"
                    : s.tone === "amber"
                      ? "bg-amber-400"
                      : s.tone === "deep"
                        ? "bg-[var(--kree-blue-deep)]"
                        : "bg-[var(--kree-blue)]"
                }`}
              />
              <p className="text-sm font-medium text-[var(--kree-muted)]">
                {s.label}
              </p>
              <p className="mt-2 font-display text-3xl font-bold text-[var(--kree-ink)]">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-[var(--kree-muted)]">{s.hint}</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[1.6rem] bg-white p-5 shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold text-[var(--kree-ink)]">
                Demandes en attente
              </h2>
              <Link
                to="/dashboard/demandes"
                className="text-sm font-semibold text-[var(--kree-blue)] hover:underline"
              >
                Tout voir
              </Link>
            </div>
            {pending.length === 0 ? (
              <p className="rounded-2xl bg-[var(--kree-blue-soft)] px-4 py-10 text-center text-sm text-[var(--kree-muted)]">
                Aucune demande en attente pour le moment.
              </p>
            ) : (
              <ul className="space-y-3">
                {pending.map((r) => (
                  <li
                    key={r.id}
                    className="flex gap-3 rounded-2xl border border-[var(--kree-blue)]/10 p-3"
                  >
                    <img
                      src={r.listingImage}
                      alt=""
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <TypeBadge type={r.listingType} />
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 uppercase">
                          En attente
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm font-semibold text-[var(--kree-ink)]">
                        {r.clientName}
                      </p>
                      <p className="truncate text-xs text-[var(--kree-muted)]">
                        {r.listingTitle} · {r.startDate} → {r.endDate}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-[1.6rem] bg-white p-5 shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10 sm:p-6">
            <h2 className="mb-4 font-display text-lg font-bold text-[var(--kree-ink)]">
              Accès rapide
            </h2>
            <div className="grid gap-3">
              {[
                {
                  to: "/dashboard/maisons",
                  title: "Mes maisons",
                  desc: "Gérer vos annonces logement",
                  accent: "bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]",
                },
                {
                  to: "/dashboard/vehicules",
                  title: "Mes véhicules",
                  desc: "Gérer vos annonces auto",
                  accent: "bg-orange-50 text-[var(--kree-orange-deep)]",
                },
                {
                  to: "/dashboard/demandes",
                  title: "Demandes",
                  desc: "Accepter ou refuser",
                  accent: "bg-amber-50 text-amber-700",
                },
                {
                  to: "/dashboard/profil",
                  title: "Mon profil",
                  desc: "Photo et informations",
                  accent: "bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]",
                },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--kree-blue)]/10 px-4 py-3 transition hover:border-[var(--kree-blue)]/25 hover:bg-[var(--kree-blue-soft)]/40"
                >
                  <span
                    className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold ${item.accent}`}
                  >
                    →
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[var(--kree-ink)]">
                      {item.title}
                    </span>
                    <span className="block text-xs text-[var(--kree-muted)]">
                      {item.desc}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function TypeBadge({ type }: { type: "maison" | "vehicule" }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
        type === "maison"
          ? "bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]"
          : "bg-orange-50 text-[var(--kree-orange-deep)]"
      }`}
    >
      {type === "maison" ? "Maison" : "Véhicule"}
    </span>
  );
}
