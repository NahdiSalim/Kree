import { useState } from "react";

export default function ListingGallery({
  images,
  title,
  onOpenTour,
  hasTour,
}: {
  images: string[];
  title: string;
  onOpenTour?: () => void;
  hasTour?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative aspect-[16/11] overflow-hidden rounded-[1.6rem] lg:aspect-auto lg:min-h-[420px]"
        >
          <img
            src={images[active] ?? images[0]}
            alt={title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute right-4 bottom-4 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            Voir les {images.length} photos
          </span>
        </button>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 lg:grid-rows-2">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => {
                setActive(i);
                if (i === 3 && images.length > 4) setLightbox(true);
              }}
              className={`relative aspect-[4/3] overflow-hidden rounded-[1.2rem] ring-2 transition ${
                active === i ? "ring-[var(--kree-orange)]" : "ring-transparent"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
              {i === 3 && images.length > 4 && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-bold text-white">
                  +{images.length - 4}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {hasTour && onOpenTour && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onOpenTour}
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--kree-ink)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--kree-blue)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4l2.5 1.5" />
            </svg>
            Entrer en visite 3D
          </button>
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-black/95">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <p className="text-sm text-white/70">
              {active + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
            >
              Fermer
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
            <button
              type="button"
              className="absolute left-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              aria-label="Précédent"
            >
              ‹
            </button>
            <img
              src={images[active]}
              alt={title}
              className="max-h-[75vh] max-w-full rounded-2xl object-contain"
            />
            <button
              type="button"
              className="absolute right-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
              onClick={() => setActive((a) => (a + 1) % images.length)}
              aria-label="Suivant"
            >
              ›
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 pb-5 sm:justify-center">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                className={`size-16 shrink-0 overflow-hidden rounded-xl ring-2 ${
                  active === i ? "ring-[var(--kree-orange)]" : "ring-transparent opacity-60"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
