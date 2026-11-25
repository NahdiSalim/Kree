import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router";
import MarketingLayout from "../../layout";
import { vehicleCategories } from "../data";
import { VehicleCard } from "../components/listing-card";
import {
  defaultVehicleFilters,
  VehicleFilters,
  type VehicleFiltersState,
} from "../components/filters";
import Pagination, { LIST_PAGE_SIZE } from "../components/pagination";
import { usePublicVehicles } from "@/lib/owner-listings";
import { ListingGridSkeleton } from "@/pages/marketing/components/skeletons";

function filtersFromParams(params: URLSearchParams): VehicleFiltersState {
  return {
    ...defaultVehicleFilters,
    city: params.get("city") || "",
    category: params.get("category") || "",
    priceMax: params.get("priceMax") || "",
    q: params.get("q") || "",
  };
}

export default function VehiclesListPage() {
  const { items: allVehicles, loading } = usePublicVehicles();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<VehicleFiltersState>(() =>
    filtersFromParams(searchParams),
  );
  const [mobileFilters, setMobileFilters] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFilters(filtersFromParams(searchParams));
  }, [searchParams]);

  const results = useMemo(() => {
    let list = [...allVehicles];

    if (filters.q.trim()) {
      const q = filters.q.toLowerCase();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.specs.brand.toLowerCase().includes(q) ||
          v.specs.model.toLowerCase().includes(q),
      );
    }
    if (filters.city) list = list.filter((v) => v.city === filters.city);
    if (filters.category) list = list.filter((v) => v.category === filters.category);
    if (filters.transmission)
      list = list.filter((v) => v.specs.transmission === filters.transmission);
    if (filters.fuel) list = list.filter((v) => v.specs.fuel === filters.fuel);
    if (filters.priceMax) {
      const max = Number(filters.priceMax);
      if (!Number.isNaN(max)) list = list.filter((v) => v.price <= max);
    }
    if (filters.seats) {
      const min = Number(filters.seats);
      list = list.filter((v) => v.specs.seats >= min);
    }

    if (filters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (filters.sort === "relevant") {
      list.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    }

    return list;
  }, [filters, allVehicles]);

  const totalPages = Math.max(1, Math.ceil(results.length / LIST_PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = (page - 1) * LIST_PAGE_SIZE;
    return results.slice(start, start + LIST_PAGE_SIZE);
  }, [results, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <MarketingLayout>
      <Helmet>
        <title>Véhicules à louer en Tunisie | Kree</title>
      </Helmet>

      <section className="relative overflow-hidden border-b border-[var(--kree-blue)]/8 bg-[linear-gradient(135deg,#e8f4f8_0%,#ffffff_55%,#fff6e8_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
            Catalogue · Véhicules
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-5xl">
            Partez où vous voulez
          </h1>
          <p className="mt-3 max-w-2xl text-[var(--kree-muted)]">
            Voitures, SUV, utilitaires et deux-roues — filtrez par ville, carburant, boîte et budget.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
          <p className="text-sm font-semibold text-[var(--kree-ink)]">
            {results.length} véhicule{results.length > 1 ? "s" : ""}
          </p>
          <button
            type="button"
            onClick={() => setMobileFilters(true)}
            className="rounded-full bg-[var(--kree-blue)] px-4 py-2 text-sm font-semibold text-white"
          >
            Filtres
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <VehicleFilters
                value={filters}
                onChange={(next) => {
                  setFilters(next);
                  setPage(1);
                }}
                categories={vehicleCategories}
                resultCount={results.length}
                onReset={() => {
                  setFilters(defaultVehicleFilters);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div>
            {loading ? (
              <ListingGridSkeleton />
            ) : results.length === 0 ? (
              <div className="rounded-[1.6rem] bg-[var(--kree-blue-soft)] px-6 py-16 text-center">
                <p className="font-display text-xl font-bold text-[var(--kree-ink)]">
                  Aucun résultat
                </p>
                <p className="mt-2 text-[var(--kree-muted)]">
                  Essayez d’élargir vos filtres ou une autre ville.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilters(defaultVehicleFilters);
                    setPage(1);
                  }}
                  className="mt-5 rounded-full bg-[var(--kree-blue)] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Réinitialiser
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 hidden text-sm text-[var(--kree-muted)] lg:block">
                  Affichage {(page - 1) * LIST_PAGE_SIZE + 1}–
                  {Math.min(page * LIST_PAGE_SIZE, results.length)} sur {results.length}
                </p>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {pageItems.map((listing) => (
                    <VehicleCard key={listing.id} listing={listing} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={(p) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Fermer"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[1.6rem] bg-white p-4 shadow-2xl">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="rounded-full bg-[var(--kree-blue-soft)] px-4 py-2 text-sm font-semibold text-[var(--kree-blue)]"
              >
                Fermer
              </button>
            </div>
            <VehicleFilters
              value={filters}
              onChange={setFilters}
              categories={vehicleCategories}
              resultCount={results.length}
              onReset={() => setFilters(defaultVehicleFilters)}
            />
          </div>
        </div>
      )}
    </MarketingLayout>
  );
}
