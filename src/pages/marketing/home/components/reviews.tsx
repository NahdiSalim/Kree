import { reviews } from "../data";

export default function Reviews() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
            Avis
          </p>
          <h2 className="font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl">
            Ce que disent nos locataires
          </h2>
          <p className="mt-3 text-[var(--kree-muted)]">
            Des Tunisiens qui ont trouvé leur maison, leur voiture, ou les deux — sur Kree.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="relative rounded-[1.7rem] bg-[var(--kree-blue-soft)] p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(12,110,154,0.1)]"
            >
              <div className="mb-4 flex gap-1 text-[var(--kree-orange)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < review.rating ? "opacity-100" : "opacity-25"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-[var(--kree-ink)]/85 leading-relaxed">“{review.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="size-11 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <p className="font-semibold text-[var(--kree-ink)]">{review.name}</p>
                  <p className="text-xs text-[var(--kree-muted)]">{review.city}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
