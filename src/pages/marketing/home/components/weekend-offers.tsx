import { Link } from "react-router";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHome } from "@/lib/home-api";
import { HomeCardsSkeleton } from "@/pages/marketing/components/skeletons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function WeekendOffers() {
  const { data, loading } = useHome();
  const offers = data?.offers ?? [];

  return (
    <section id="offres" className="relative overflow-hidden bg-[var(--kree-ink)] py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,179,71,0.18),transparent_35%),radial-gradient(circle_at_85%_70%,rgba(12,110,154,0.35),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
              Sélection
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Annonces à la une
            </h2>
            <p className="mt-2 max-w-xl text-white/70">
              Maisons et véhicules mis en avant par les propriétaires — prêts à
              réserver.
            </p>
          </div>

          {offers.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="kree-offers-prev flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-[var(--kree-orange)] hover:bg-[var(--kree-orange)]"
                aria-label="Précédent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="kree-offers-next flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-[var(--kree-orange)] hover:bg-[var(--kree-orange)]"
                aria-label="Suivant"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {loading && offers.length === 0 ? (
          <div className="opacity-80 [&_.kree-skel]:bg-white/15">
            <HomeCardsSkeleton count={3} />
          </div>
        ) : offers.length === 0 ? (
          <p className="rounded-[1.6rem] bg-white/5 px-6 py-16 text-center text-sm text-white/70 ring-1 ring-white/10">
            Aucune annonce à la une pour le moment.
          </p>
        ) : (
          <>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              loop={offers.length > 2}
              loopAdditionalSlides={3}
              navigation={{
                prevEl: ".kree-offers-prev",
                nextEl: ".kree-offers-next",
              }}
              pagination={{ clickable: true, el: ".kree-offers-pagination" }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={22}
              slidesPerView={1.08}
              breakpoints={{
                640: { slidesPerView: 1.35 },
                900: { slidesPerView: 2.15 },
                1200: { slidesPerView: 2.55 },
              }}
              className="kree-offers-swiper"
            >
              {offers.map((offer, index) => (
                <SwiperSlide key={offer.id}>
                  <article
                    className={`group relative overflow-hidden rounded-[1.8rem] ring-1 ring-white/10 ${
                      index % 2 === 0 ? "bg-white/[0.07]" : "bg-[var(--kree-blue)]/25"
                    }`}
                  >
                    <div className="grid sm:grid-cols-[1.15fr_0.85fr]">
                      <div className="relative aspect-[5/4] overflow-hidden sm:aspect-auto sm:min-h-[280px]">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--kree-ink)]/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[var(--kree-ink)]/20" />
                        <span className="absolute top-4 left-4 rounded-full bg-[var(--kree-orange)] px-3 py-1.5 text-sm font-bold text-white shadow-lg shadow-[var(--kree-orange)]/30">
                          À la une
                        </span>
                        <span className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          {offer.tag} · {offer.city}
                        </span>
                      </div>

                      <div className="flex flex-col justify-between p-5 sm:p-6">
                        <div>
                          <p className="text-xs font-semibold tracking-wide text-[var(--kree-orange)] uppercase">
                            {offer.meta}
                          </p>
                          <h3 className="mt-2 font-display text-2xl leading-tight font-bold">
                            {offer.title}
                          </h3>
                          <div className="mt-4 flex items-baseline gap-2.5">
                            <span className="font-display text-3xl font-bold text-[var(--kree-orange)]">
                              {offer.price}
                            </span>
                            <span className="text-sm text-white/70">
                              TND / {offer.unit}
                            </span>
                          </div>
                        </div>

                        <Link
                          to={offer.href}
                          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--kree-orange)] py-3.5 text-sm font-semibold text-white transition hover:brightness-110 group-hover:shadow-lg group-hover:shadow-[var(--kree-orange)]/25"
                        >
                          Voir l’annonce
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="kree-offers-pagination mt-8 flex justify-center gap-2" />
          </>
        )}
      </div>
    </section>
  );
}
