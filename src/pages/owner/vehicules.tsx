import { Link } from "react-router";
import { PageMeta } from "@/components/shared/page-meta";
import { useOwnerVehicles } from "@/lib/owner-listings";
import { OwnerListingsSkeleton } from "./components/skeletons";

export default function OwnerVehiculesPage() {
  const { items: listings, loading } = useOwnerVehicles();

  if (loading) {
    return (
      <>
        <PageMeta title="Mes véhicules | Kree Propriétaire" />
        <OwnerListingsSkeleton />
      </>
    );
  }

  return (
    <>
      <PageMeta title="Mes véhicules | Kree Propriétaire" />
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
              Véhicules
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-[var(--kree-ink)]">
              Mes annonces auto
            </h1>
            <p className="mt-1 text-sm text-[var(--kree-muted)]">
              {listings.length} publié{listings.length > 1 ? "s" : ""} par vous
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/vehicules"
              className="inline-flex rounded-2xl bg-orange-50 px-4 py-2.5 text-sm font-semibold text-[var(--kree-orange-deep)]"
            >
              Catalogue public
            </Link>
            <Link
              to="/dashboard/vehicules/ajouter"
              className="inline-flex rounded-2xl bg-[var(--kree-orange)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-orange)]/25"
            >
              + Ajouter un véhicule
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-[1.6rem] bg-white px-6 py-16 text-center shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10">
            <p className="font-display text-xl font-bold text-[var(--kree-ink)]">
              Aucun véhicule publié
            </p>
            <p className="mt-2 text-sm text-[var(--kree-muted)]">
              Publiez votre premier véhicule pour le voir apparaître ici.
            </p>
            <Link
              to="/dashboard/vehicules/ajouter"
              className="mt-5 inline-flex rounded-2xl bg-[var(--kree-orange)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              + Ajouter un véhicule
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((v) => (
              <Link
                key={v.id}
                to={`/vehicules/${v.id}`}
                className="group overflow-hidden rounded-[1.4rem] bg-white shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(12,110,154,0.14)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={v.images[0]}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[var(--kree-orange)] px-2.5 py-1 text-[11px] font-bold text-white">
                    {v.category}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-[var(--kree-blue)] uppercase">
                    {v.city}
                  </p>
                  <h3 className="mt-1 line-clamp-1 font-display text-lg font-bold text-[var(--kree-ink)]">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--kree-muted)]">
                    {v.specs.brand} {v.specs.model} · {v.specs.year} ·{" "}
                    {v.specs.transmission}
                  </p>
                  <p className="mt-3 text-[var(--kree-blue)]">
                    <span className="font-display text-xl font-bold">
                      {v.price}
                    </span>
                    <span className="text-sm font-medium"> TND / {v.unit}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
