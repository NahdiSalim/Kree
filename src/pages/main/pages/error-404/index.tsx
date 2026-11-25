import { cn } from "@/utils";
import { Link } from "react-router";
import type { Error404Props } from "./types";

export default function Error404({
  title = "404",
  description = "Cette page n’existe pas ou a été déplacée.",
  homeLinkText = "Retour à l’accueil",
  homeHref = "/",
  className,
}: Error404Props) {
  return (
    <div
      className={cn(
        "kree-owner relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f3f9fb_0%,#ffffff_55%)] p-6",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-lg text-center">
        <Link to="/" className="mb-8 inline-flex items-center gap-2">
          <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-2xl bg-[var(--kree-blue)] text-white">
            <span className="font-display text-lg font-bold">K</span>
            <span className="absolute -right-1 -bottom-1 size-3.5 rounded-full bg-[var(--kree-orange)]" />
          </span>
          <span className="font-display text-xl font-bold text-[var(--kree-ink)]">
            Kree
          </span>
        </Link>

        <p className="text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
          Introuvable
        </p>
        <h1 className="mt-2 font-display text-5xl font-bold text-[var(--kree-blue)] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-base text-[var(--kree-muted)] sm:text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={homeHref}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-[var(--kree-blue)] px-6 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-blue)]/20"
          >
            {homeLinkText}
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-[var(--kree-blue-soft)] px-6 text-sm font-semibold text-[var(--kree-blue)]"
          >
            Contact
          </Link>
        </div>
      </div>

      <p className="absolute inset-s-1/2 bottom-6 -translate-x-1/2 text-center text-sm text-[var(--kree-muted)] rtl:translate-x-1/2">
        &copy; {new Date().getFullYear()} Kree · Tunisie
      </p>
    </div>
  );
}
