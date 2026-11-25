export function ListingDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8" aria-busy="true" aria-live="polite">
      <div className="kree-skel mb-5 h-4 w-36 rounded-full" />

      <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr]">
        <div className="kree-skel aspect-[16/11] rounded-[1.6rem]" />
        <div className="grid grid-cols-2 gap-3">
          <div className="kree-skel aspect-square rounded-[1.2rem]" />
          <div className="kree-skel aspect-square rounded-[1.2rem]" />
          <div className="kree-skel aspect-square rounded-[1.2rem]" />
          <div className="kree-skel aspect-square rounded-[1.2rem]" />
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.75fr]">
        <div className="space-y-5">
          <div className="kree-skel h-3 w-40 rounded-full" />
          <div className="kree-skel h-10 w-[80%] max-w-xl rounded-xl" />
          <div className="kree-skel h-4 w-64 rounded-full" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="kree-skel h-20 rounded-2xl" />
            ))}
          </div>
          <div className="space-y-2 pt-4">
            <div className="kree-skel h-6 w-40 rounded-lg" />
            <div className="kree-skel h-4 w-full rounded-full" />
            <div className="kree-skel h-4 w-full rounded-full" />
            <div className="kree-skel h-4 w-[75%] rounded-full" />
          </div>
        </div>
        <div className="kree-skel h-72 rounded-[1.6rem] lg:sticky lg:top-24" />
      </div>
      <span className="sr-only">Chargement de l’annonce…</span>
    </div>
  );
}

export function ListingGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[1.4rem] ring-1 ring-[var(--kree-blue)]/10"
        >
          <div className="kree-skel aspect-[16/10]" />
          <div className="space-y-2.5 p-4">
            <div className="kree-skel h-3 w-20 rounded-full" />
            <div className="kree-skel h-5 w-[80%] rounded-lg" />
            <div className="kree-skel h-3 w-[65%] rounded-full" />
            <div className="kree-skel mt-2 h-6 w-28 rounded-lg" />
          </div>
        </div>
      ))}
      <span className="sr-only">Chargement des annonces…</span>
    </div>
  );
}

export function HomeHeroSkeleton() {
  return (
    <section className="relative flex h-[88vh] min-h-[620px] items-end overflow-hidden bg-[linear-gradient(120deg,#084d6b,#0c6e9a)]">
      <div className="absolute inset-0 opacity-30">
        <div className="kree-skel h-full w-full rounded-none bg-white/10" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-36 sm:px-6 lg:px-8">
        <div className="kree-skel mb-5 h-7 w-36 rounded-full bg-white/20" />
        <div className="kree-skel mb-4 h-12 w-full max-w-xl rounded-2xl bg-white/20 sm:h-14" />
        <div className="kree-skel mb-6 h-5 w-full max-w-md rounded-full bg-white/15" />
        <div className="kree-skel h-10 w-48 rounded-2xl bg-white/25" />
      </div>
    </section>
  );
}

export function HomeCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-5 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[min(80vw,320px)] shrink-0 overflow-hidden rounded-[1.6rem] ring-1 ring-[var(--kree-blue)]/10"
        >
          <div className="kree-skel aspect-[4/3]" />
          <div className="space-y-2 p-4">
            <div className="kree-skel h-3 w-16 rounded-full" />
            <div className="kree-skel h-5 w-4/5 rounded-lg" />
            <div className="kree-skel h-6 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
