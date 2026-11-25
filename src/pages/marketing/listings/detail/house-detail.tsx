import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import MarketingLayout from "../../layout";
import type { HouseListing } from "../data";
import ListingGallery from "../components/gallery";
import Tour3DModal from "../components/tour-3d";
import ReservationModal from "../components/reservation-modal";
import { whatsappUrl } from "@/lib/reservations";
import { fetchHouseById } from "@/lib/owner-listings";
import { ListingDetailSkeleton } from "@/pages/marketing/components/skeletons";

export default function HouseDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<HouseListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [tourOpen, setTourOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!id) {
      setListing(null);
      setLoading(false);
      return;
    }
    setListing(null);
    setLoading(true);
    void fetchHouseById(id).then((house) => {
      if (!cancelled) {
        setListing(house);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <MarketingLayout>
        <ListingDetailSkeleton />
      </MarketingLayout>
    );
  }

  if (!listing) {
    return (
      <MarketingLayout>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Annonce introuvable</h1>
          <Link to="/maisons" className="mt-6 inline-flex text-[var(--kree-blue)] font-semibold">
            ← Retour aux maisons
          </Link>
        </div>
      </MarketingLayout>
    );
  }

  const waText = `Bonjour ${listing.host.name}, je suis intéressé(e) par « ${listing.title} » sur Kree (${listing.city}).`;

  return (
    <MarketingLayout>
      <Helmet>
        <title>{listing.title} | Kree</title>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Link
          to="/maisons"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--kree-muted)] hover:text-[var(--kree-blue)]"
        >
          ← Retour aux maisons
        </Link>

        <ListingGallery
          images={listing.images}
          title={listing.title}
          hasTour={Boolean(listing.tour3dUrl)}
          onOpenTour={() => setTourOpen(true)}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.75fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
              {listing.category} · {listing.city}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl">
              {listing.title}
            </h1>
            <p className="mt-2 text-[var(--kree-muted)]">
              {listing.addressArea}, {listing.governorate} · ★ {listing.rating.toFixed(1)} (
              {listing.reviewsCount} avis)
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Chambres", listing.specs.bedrooms || "Studio"],
                ["Salles de bain", listing.specs.bathrooms],
                ["Surface", `${listing.specs.area} m²`],
                ["Meublé", listing.specs.furnished ? "Oui" : "Non"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-[var(--kree-blue-soft)] px-4 py-3 ring-1 ring-[var(--kree-blue)]/10"
                >
                  <p className="text-[11px] font-bold tracking-wide text-[var(--kree-muted)] uppercase">
                    {label}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-[var(--kree-ink)]">{val}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-bold">Description</h2>
              <p className="mt-3 leading-relaxed text-[var(--kree-ink)]/80">{listing.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl font-bold">Équipements</h2>
              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {listing.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-[var(--kree-ink)] ring-1 ring-[var(--kree-blue)]/10"
                  >
                    <span className="text-[var(--kree-orange)]">✓</span> {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Spec label="Étage" value={listing.specs.floor != null ? String(listing.specs.floor) : "—"} />
              <Spec label="Parking" value={listing.specs.parking ? "Oui" : "Non"} />
              <Spec label="Animaux" value={listing.specs.petsAllowed ? "Acceptés" : "Non"} />
            </div>
          </div>

          <aside className="h-fit rounded-[1.6rem] bg-white p-6 shadow-[0_20px_50px_rgba(12,110,154,0.1)] ring-1 ring-[var(--kree-blue)]/10 lg:sticky lg:top-24">
            <p className="text-[var(--kree-blue)]">
              <span className="font-display text-3xl font-bold">{listing.price}</span>
              <span className="text-sm font-medium"> TND / {listing.unit}</span>
            </p>
            <p className="mt-1 text-sm text-[var(--kree-muted)]">
              Disponible dès {new Date(listing.availableFrom).toLocaleDateString("fr-TN")}
            </p>

            {listing.tour3dUrl && (
              <button
                type="button"
                onClick={() => setTourOpen(true)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--kree-blue)]/20 bg-[var(--kree-blue-soft)] py-3.5 text-sm font-semibold text-[var(--kree-blue)] transition hover:bg-[var(--kree-blue)] hover:text-white"
              >
                Visite 3D
              </button>
            )}

            <a
              href={whatsappUrl(listing.host.phone, waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--kree-orange)] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-orange)]/25 transition hover:brightness-105"
            >
              Contacter le propriétaire
            </a>
            <button
              type="button"
              onClick={() => setReserveOpen(true)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--kree-blue)] py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Demander une réservation
            </button>

            <div className="mt-6 flex items-center gap-3 border-t border-[var(--kree-blue)]/10 pt-5">
              <img
                src={listing.host.avatar}
                alt={listing.host.name}
                className="size-12 rounded-full object-cover ring-2 ring-white"
              />
              <div>
                <p className="font-semibold text-[var(--kree-ink)]">{listing.host.name}</p>
                <p className="text-xs text-[var(--kree-muted)]">
                  ★ {listing.host.rating} · Répond {listing.host.responseTime}
                  {listing.host.verified ? " · Vérifié" : ""}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Tour3DModal
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        title={listing.title}
        tourUrl={listing.tour3dUrl}
        fallbackImage={listing.images[0]}
      />
      <ReservationModal
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        listing={listing}
      />
    </MarketingLayout>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[var(--kree-blue-soft)] px-4 py-3">
      <p className="text-[11px] font-bold tracking-wide text-[var(--kree-muted)] uppercase">{label}</p>
      <p className="mt-1 font-semibold text-[var(--kree-ink)]">{value}</p>
    </div>
  );
}
