import { useMemo, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { latestListings, type ListingType } from "../data";
import "swiper/css";
import "swiper/css/navigation";

type Filter = "tous" | ListingType;

export default function LatestListings() {
  const [filter, setFilter] = useState<Filter>("tous");

  const items = useMemo(() => {
    if (filter === "tous") return latestListings.slice(0, 10);
    return latestListings.filter((l) => l.type === filter).slice(0, 10);
  }, [filter]);

  return (
    <section id="derniers" className="bg-white pt-16 pb-8 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
              Nouveautés
            </p>
            <h2 className="font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl">
              Nos 10 dernières locations
            </h2>
            <p className="mt-2 max-w-xl text-[var(--kree-muted)]">
              Les annonces fraîchement publiées partout en Tunisie — maisons et véhicules.
            </p>
          </div>

          <div className="inline-flex rounded-full bg-[var(--kree-blue-soft)] p-1">
            {(
              [
                ["tous", "Tout"],
                ["maison", "Maisons"],
                ["vehicule", "Véhicules"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === key
                    ? "bg-[var(--kree-blue)] text-white shadow-md"
                    : "text-[var(--kree-ink)]/70 hover:text-[var(--kree-blue)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            className="kree-listings-prev absolute top-1/2 -left-2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--kree-blue)]/15 bg-white text-[var(--kree-blue)] shadow-lg transition hover:bg-[var(--kree-blue)] hover:text-white md:flex lg:-left-5"
            aria-label="Précédent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="kree-listings-next absolute top-1/2 -right-2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--kree-blue)]/15 bg-white text-[var(--kree-blue)] shadow-lg transition hover:bg-[var(--kree-blue)] hover:text-white md:flex lg:-right-5"
            aria-label="Suivant"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <Swiper
            key={filter}
            modules={[Navigation]}
            navigation={{
              prevEl: ".kree-listings-prev",
              nextEl: ".kree-listings-next",
            }}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3.1 },
              1280: { slidesPerView: 3.4 },
            }}
          >
            {items.map((listing) => (
              <SwiperSlide key={listing.id}>
                <article className="group overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-[var(--kree-blue)]/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(12,110,154,0.14)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    {listing.badge && (
                      <span className="absolute top-3 left-3 rounded-full bg-[var(--kree-orange)] px-2.5 py-1 text-[11px] font-bold text-white">
                        {listing.badge}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[var(--kree-blue)]">
                      {listing.type === "maison" ? "Maison" : "Véhicule"}
                    </span>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      ★ {listing.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold tracking-wide text-[var(--kree-orange)] uppercase">
                      {listing.city}
                    </p>
                    <h3 className="mt-1 line-clamp-1 font-display text-lg font-bold text-[var(--kree-ink)]">
                      {listing.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--kree-muted)]">{listing.meta}</p>
                    <p className="mt-3 text-[var(--kree-blue)]">
                      <span className="font-display text-xl font-bold">{listing.price}</span>
                      <span className="text-sm font-medium"> TND / {listing.unit}</span>
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
