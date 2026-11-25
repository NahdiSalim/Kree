export function OwnerGuardSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#f3f9fb_0%,#ffffff_45%)]">
      <div className="flex flex-1">
        <div className="hidden w-[17rem] shrink-0 border-e border-[var(--kree-blue)]/10 bg-[linear-gradient(180deg,#0c6e9a,#084d6b)] p-4 md:block">
          <div className="kree-skel mb-8 h-10 w-28 rounded-xl bg-white/20" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="kree-skel h-10 w-full rounded-xl bg-white/15" />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex h-16 items-center justify-between border-b border-[var(--kree-blue)]/10 px-6">
            <div className="kree-skel h-8 w-40 rounded-xl" />
            <div className="kree-skel size-10 rounded-full" />
          </div>
          <div className="space-y-6 p-6 md:p-8">
            <div className="kree-skel h-36 w-full rounded-[1.8rem]" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="kree-skel h-28 rounded-[1.4rem]" />
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="kree-skel h-64 rounded-[1.6rem]" />
              <div className="kree-skel h-64 rounded-[1.6rem]" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Chargement du tableau de bord…</span>
    </div>
  );
}

export function OwnerOverviewSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true">
      <div className="kree-skel h-40 rounded-[1.8rem]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="kree-skel h-28 rounded-[1.4rem]" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="kree-skel h-72 rounded-[1.6rem]" />
        <div className="kree-skel h-72 rounded-[1.6rem]" />
      </div>
    </div>
  );
}

export function OwnerListingsSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="kree-skel h-3 w-20 rounded-full" />
          <div className="kree-skel h-9 w-56 rounded-xl" />
          <div className="kree-skel h-4 w-36 rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="kree-skel h-11 w-36 rounded-2xl" />
          <div className="kree-skel h-11 w-44 rounded-2xl" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[1.4rem] ring-1 ring-[var(--kree-blue)]/10"
          >
            <div className="kree-skel aspect-[16/10]" />
            <div className="space-y-2 p-4">
              <div className="kree-skel h-3 w-16 rounded-full" />
              <div className="kree-skel h-5 w-[80%] rounded-lg" />
              <div className="kree-skel h-3 w-[60%] rounded-full" />
              <div className="kree-skel mt-2 h-6 w-28 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OwnerDemandesSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="space-y-2">
        <div className="kree-skel h-3 w-24 rounded-full" />
        <div className="kree-skel h-9 w-52 rounded-xl" />
        <div className="kree-skel h-4 w-72 rounded-full" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="kree-skel h-9 w-24 rounded-full" />
        ))}
      </div>
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="kree-skel h-48 rounded-[1.6rem]" />
        ))}
      </div>
    </div>
  );
}
