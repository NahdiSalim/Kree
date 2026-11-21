import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
            Comment ça marche
          </p>
          <h2 className="font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl">
            Louez en Tunisie en 3 minutes
          </h2>
          <p className="mt-4 text-[var(--kree-muted)]">
            Une courte vidéo pour découvrir comment publier une maison ou un véhicule, trouver une
            location près de chez vous, et contacter un déménageur si besoin.
          </p>

          <ol className="mt-8 space-y-4">
            {[
              "Choisissez maison ou véhicule, puis votre ville.",
              "Comparez les annonces vérifiées et les photos.",
              "Contactez le propriétaire et réservez en toute confiance.",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--kree-blue)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-1 text-[var(--kree-ink)]/85">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_70px_rgba(12,110,154,0.2)] ring-1 ring-[var(--kree-blue)]/10">
          <div className="aspect-[16/10] bg-[var(--kree-ink)]">
            {playing ? (
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/Scxs7L0vhZ4?autoplay=1&mute=1&rel=0&playsinline=1"
                title="Découvrir Kree — location en Tunisie"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative h-full w-full">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"
                  alt="Aperçu vidéo Kree"
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(12,110,154,0.45),rgba(8,45,70,0.55))]" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-20 items-center justify-center rounded-full bg-white text-[var(--kree-blue)] shadow-2xl">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
