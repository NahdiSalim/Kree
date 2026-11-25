import { Link } from "react-router";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHome } from "@/lib/home-api";
import { HomeHeroSkeleton } from "@/pages/marketing/components/skeletons";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Hero() {
  const { data, loading } = useHome();
  const slides = data?.hero ?? [];

  if (loading && slides.length === 0) {
    return <HomeHeroSkeleton />;
  }

  return (
    <section className="relative h-[88vh] min-h-[620px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={slides.length > 1}
        speed={1100}
        autoplay={{ delay: 4200, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".kree-hero-pagination" }}
        className="kree-hero-swiper h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="!h-full">
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-105 animate-[kreeKenBurns_14s_ease-in-out_infinite_alternate]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,45,70,0.78)_0%,rgba(12,110,154,0.42)_48%,rgba(8,45,70,0.28)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,179,71,0.22),transparent_40%)]" />

              <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pt-16 pb-36 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                    <span className="size-1.5 rounded-full bg-[var(--kree-orange)]" />
                    {slide.category} · Tunisie
                  </span>
                  <h1 className="font-display text-4xl leading-[1.05] font-bold text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
                    {slide.subtitle}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <p className="inline-flex items-center rounded-2xl bg-[var(--kree-orange)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-orange)]/30">
                      {slide.accent}
                    </p>
                    {slide.href && (
                      <Link
                        to={slide.href}
                        className="inline-flex items-center rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
                      >
                        Voir l’annonce →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="kree-hero-pagination pointer-events-auto absolute right-6 bottom-32 z-20 !flex flex-col gap-2 sm:right-10" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
