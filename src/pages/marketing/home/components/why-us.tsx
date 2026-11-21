import type { ReactNode } from "react";
import { whyUs } from "../data";

const icons: Record<string, ReactNode> = {
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  map: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  ),
  layers: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5M3 17l9 5 9-5" />
    </svg>
  ),
  support: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3a7 7 0 00-7 7v2a3 3 0 003 3h1v-5H7a5 5 0 0110 0h-2v5h1a3 3 0 003-3v-2a7 7 0 00-7-7z" />
      <path d="M9 18h6v1a3 3 0 01-3 3h0a3 3 0 01-3-3v-1z" />
    </svg>
  ),
};

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[var(--kree-blue-soft)] py-16 sm:py-20">
      <div className="pointer-events-none absolute -top-20 -right-16 size-72 rounded-full bg-[var(--kree-orange)]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 size-80 rounded-full bg-[var(--kree-blue)]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
            Confiance
          </p>
          <h2 className="font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl">
            Pourquoi choisir Kree ?
          </h2>
          <p className="mt-3 text-[var(--kree-muted)]">
            Une plateforme tunisienne pensée pour louer simplement — chez soi, sur la route, ou pour déménager.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, index) => (
            <article
              key={item.title}
              className="group rounded-[1.6rem] bg-white p-6 shadow-[0_10px_40px_rgba(12,110,154,0.06)] ring-1 ring-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(12,110,154,0.12)]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--kree-blue)] text-white shadow-lg shadow-[var(--kree-blue)]/25 transition group-hover:bg-[var(--kree-orange)]">
                {icons[item.icon]}
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--kree-ink)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--kree-muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
