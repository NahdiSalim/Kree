import { Link } from "react-router";
import { PageMeta } from "@/components/shared/page-meta";
import { useOwnerHouses } from "@/lib/owner-listings";
import { OwnerListingsSkeleton } from "./components/skeletons";

export default function OwnerMaisonsPage() {
  const { items: listings, loading } = useOwnerHouses();

  if (loading) {
    return (
      <>
        <PageMeta title="Mes maisons | Kree Propriétaire" />
        <OwnerListingsSkeleton />
      </>
    );
  }

  return (
    <>
      <PageMeta title="Mes maisons | Kree Propriétaire" />
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
              Maisons
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-[var(--kree-ink)]">
              Mes annonces logement
            </h1>
            <p className="mt-1 text-sm text-[var(--kree-muted)]">
              {listings.length} publiée{listings.length > 1 ? "s" : ""} par vous
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/maisons"
              className="inline-flex rounded-2xl bg-[var(--kree-blue-soft)] px-4 py-2.5 text-sm font-semibold text-[var(--kree-blue)]"
            >
              Catalogue public
            </Link>
            <Link
              to="/dashboard/maisons/ajouter"
              className="inline-flex rounded-2xl bg-[var(--kree-blue)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-blue)]/20"
            >
              + Ajouter une maison
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-[1.6rem] bg-white px-6 py-16 text-center shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10">
            <p className="font-display text-xl font-bold text-[var(--kree-ink)]">
              Aucune maison publiée
            </p>
            <p className="mt-2 text-sm text-[var(--kree-muted)]">
              Publiez votre première annonce pour la voir apparaître ici.
            </p>
            <Link
              to="/dashboard/maisons/ajouter"
              className="mt-5 inline-flex rounded-2xl bg-[var(--kree-blue)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              + Ajouter une maison
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((h) => (
              <Link
                key={h.id}
                to={`/maisons/${h.id}`}
                className="group overflow-hidden rounded-[1.4rem] bg-white shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(12,110,154,0.14)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={h.images[0]}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[var(--kree-blue)] px-2.5 py-1 text-[11px] font-bold text-white">
                    {h.category}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-[var(--kree-orange)] uppercase">
                    {h.city}
                  </p>
                  <h3 className="mt-1 line-clamp-1 font-display text-lg font-bold text-[var(--kree-ink)]">
                    {h.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--kree-muted)]">
                    {h.specs.bedrooms || "Studio"} ch. · {h.specs.area} m² · ★{" "}
                    {h.rating.toFixed(1)}
                  </p>
                  <p className="mt-3 text-[var(--kree-blue)]">
                    <span className="font-display text-xl font-bold">
                      {h.price}
                    </span>
                    <span className="text-sm font-medium"> TND / {h.unit}</span>
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
