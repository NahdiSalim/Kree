import { useEffect, useRef, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../home/components/footer";
import Navbar from "../home/components/navbar";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80";

const ABOUT_HERO_SLIDES = [
  {
    id: "h1",
    category: "Maison",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "v1",
    category: "Véhicule",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "h2",
    category: "Maison",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "v2",
    category: "Véhicule",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "h3",
    category: "Maison",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "v3",
    category: "Véhicule",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=80",
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Publiez en quelques minutes",
    text: "Maisons ou véhicules : photos, tarif, disponibilité. Votre annonce est en ligne immédiatement.",
  },
  {
    n: "02",
    title: "Recevez des demandes réelles",
    text: "Les clients contactent sans créer de compte. Vous voyez chaque demande dans votre tableau de bord.",
  },
  {
    n: "03",
    title: "Échangez sur WhatsApp",
    text: "Acceptez, précisez les détails, et finalisez la location directement avec le client.",
  },
] as const;

const PILLARS = [
  {
    title: "Confiance locale",
    text: "Une équipe tunisienne, des annonces claires, et un parcours pensé pour Hammamet comme pour Tozeur.",
  },
  {
    title: "Simple pour tous",
    text: "Pas de compte client obligatoire. Le propriétaire garde le contrôle ; le locataire avance vite.",
  },
  {
    title: "Deux mondes, un endroit",
    text: "Logements et véhicules côte à côte — pour un week-end, un déménagement, ou une saison entière.",
  },
] as const;

const CITIES = [
  "Tunis",
  "Sousse",
  "Hammamet",
  "Sfax",
  "Djerba",
  "Nabeul",
  "Monastir",
  "Bizerte",
] as const;

export default function AboutPage() {
  return (
    <div className="kree-home kree-about flex min-h-screen flex-col bg-white text-[var(--kree-ink)]">
      <Helmet>
        <html lang="fr" />
        <title>À propos | Kree</title>
        <meta
          name="description"
          content="Kree, la plateforme tunisienne pour louer maisons et véhicules — simplement, localement, en confiance."
        />
      </Helmet>

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Mission />
        <Story />
        <HowItWorks />
        <Pillars />
        <CitiesBand />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[min(92vh,900px)] min-h-[560px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1100}
        autoplay={{ delay: 4200, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".kree-about-hero-pagination" }}
        className="kree-hero-swiper absolute inset-0 z-0 h-full w-full"
      >
        {ABOUT_HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="!h-full">
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-105 animate-[kreeKenBurns_14s_ease-in-out_infinite_alternate]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,45,70,0.88)_0%,rgba(12,110,154,0.52)_45%,rgba(8,45,70,0.32)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,179,71,0.26),transparent_42%)]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end">
        <div className="pointer-events-auto mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
          <p className="kree-reveal mb-4 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Kree
          </p>
          <h1 className="kree-reveal kree-reveal-delay-1 max-w-3xl font-display text-3xl leading-[1.08] font-bold text-white sm:text-4xl lg:text-5xl">
            Louer en Tunisie, sans friction.
          </h1>
          <p className="kree-reveal kree-reveal-delay-2 mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Nous connectons propriétaires et locataires — maisons et véhicules —
            avec un parcours clair, local, et pensé pour la vie réelle.
          </p>
          <div className="kree-reveal kree-reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <Link
              to="/maisons"
              className="inline-flex items-center rounded-2xl bg-[var(--kree-orange)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-orange)]/30 transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Explorer les annonces
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center rounded-2xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Devenir propriétaire
            </Link>
          </div>
        </div>
      </div>

      <div className="kree-about-hero-pagination pointer-events-auto absolute right-6 bottom-28 z-20 !flex flex-col gap-2 sm:right-10 sm:bottom-32" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function Mission() {
  return (
    <RevealSection className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
              Notre mission
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Rendre la location aussi fluide qu’un message WhatsApp.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-[var(--kree-muted)] lg:justify-self-end">
            Kree est née d’un constat simple : entre les groupes Facebook,
            les appels sans suite et les annonces floues, louer reste trop
            long. Nous simplifions le trajet — du premier regard à la
            conversation avec le propriétaire.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-[var(--kree-blue)]/10 sm:grid-cols-3">
          {[
            { value: "2", label: "univers", hint: "Maisons & véhicules" },
            { value: "24/7", label: "visibilité", hint: "Annonces toujours en ligne" },
            { value: "TN", label: "ancrage", hint: "Pensé pour la Tunisie" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="kree-reveal bg-white px-6 py-10 text-center sm:px-8"
              style={{ animationDelay: `${0.12 + i * 0.08}s` }}
            >
              <p className="font-display text-4xl font-bold text-[var(--kree-blue)] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-bold tracking-wide text-[var(--kree-ink)] uppercase">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-[var(--kree-muted)]">{stat.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function Story() {
  return (
    <RevealSection className="relative bg-[var(--kree-blue-soft)]/40 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-[linear-gradient(135deg,rgba(12,110,154,0.25),rgba(255,179,71,0.2))] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(12,110,154,0.2)]">
            <img
              src={STORY_IMAGE}
              alt="Côte tunisienne"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--kree-blue-deep)]/50 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-display text-2xl font-bold text-white">
              De la médina aux routes du Sud.
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
            Pourquoi Kree
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl">
            Une plateforme, deux besoins du quotidien.
          </h2>
          <div className="mt-8 space-y-6 text-[var(--kree-muted)] leading-relaxed">
            <p>
              Que vous cherchiez un appartement meublé à Lac 2, une villa pour
              le week-end à Hammamet, ou une voiture pour traverser le Sahel —
              le parcours doit rester le même : transparent, rapide, humain.
            </p>
            <p>
              Les propriétaires gèrent tout depuis un tableau de bord unique.
              Les clients envoient une demande sans inscription, puis
              poursuivent sur WhatsApp quand le contact est établi.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[var(--kree-blue)] transition hover:gap-3"
          >
            Parler à l’équipe
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}

function HowItWorks() {
  return (
    <RevealSection className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
            Comment ça marche
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl">
            Trois étapes, zéro complication.
          </h2>
        </div>

        <ol className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="kree-reveal relative border-t-2 border-[var(--kree-blue)]/15 pt-8"
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <span className="font-display text-5xl font-bold text-[var(--kree-blue)]/15">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-[var(--kree-ink)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--kree-muted)]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </RevealSection>
  );
}

function Pillars() {
  return (
    <RevealSection className="relative overflow-hidden bg-[var(--kree-ink)] py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(12,110,154,0.45),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(255,179,71,0.18),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
          Ce qui nous guide
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
          Des principes simples, tenus sérieusement.
        </h2>

        <div className="mt-14 divide-y divide-white/10">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className="kree-reveal grid gap-4 py-10 sm:grid-cols-[minmax(0,0.9fr)_1.2fr] sm:items-start sm:gap-12"
              style={{ animationDelay: `${0.08 + i * 0.1}s` }}
            >
              <h3 className="font-display text-2xl font-bold text-[var(--kree-orange)] sm:text-3xl">
                {pillar.title}
              </h3>
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function CitiesBand() {
  return (
    <RevealSection className="overflow-hidden border-y border-[var(--kree-blue)]/8 bg-white py-14">
      <p className="mb-8 text-center text-xs font-bold tracking-[0.16em] text-[var(--kree-muted)] uppercase">
        Présents partout en Tunisie
      </p>
      <div className="kree-marquee relative flex overflow-hidden">
        <div className="flex min-w-full shrink-0 animate-[kreeMarquee_28s_linear_infinite] items-center gap-10 px-6 sm:gap-14">
          {[...CITIES, ...CITIES].map((city, i) => (
            <span
              key={`${city}-${i}`}
              className="font-display text-2xl font-bold whitespace-nowrap text-[var(--kree-blue)]/80 sm:text-3xl"
            >
              {city}
              <span className="ms-10 text-[var(--kree-orange)] sm:ms-14">·</span>
            </span>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function ClosingCta() {
  return (
    <RevealSection className="relative overflow-hidden bg-[linear-gradient(135deg,#0c6e9a_0%,#084d6b_55%,#123041_100%)] py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-[var(--kree-orange)]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 size-56 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="font-display text-5xl font-bold text-white sm:text-6xl">
          Kree
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
          Prêt à louer autrement ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/75">
          Parcourez les annonces, ou publiez la vôtre et recevez vos premières
          demandes dès aujourd’hui.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/maisons"
            className="inline-flex rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[var(--kree-blue)] transition hover:-translate-y-0.5"
          >
            Voir les maisons
          </Link>
          <Link
            to="/vehicules"
            className="inline-flex rounded-2xl bg-[var(--kree-orange)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Voir les véhicules
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}

function RevealSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${className} ${visible ? "kree-about-visible" : "kree-about-pending"}`}
    >
      {children}
    </section>
  );
}
