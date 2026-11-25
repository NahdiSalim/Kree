import { Link } from "react-router";
import { BrandLogo } from "@/components/shared/brand-logo";
import SignInFormFields from "./form";

export default function SignIn() {
  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center px-5 py-10 sm:px-8">
      <Link
        to="/"
        className="mb-8 inline-flex items-center lg:hidden"
        aria-label="TunisRent — accueil"
      >
        <BrandLogo className="h-14" />
      </Link>

      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--kree-muted)] transition hover:text-[var(--kree-blue)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Retour à l’accueil
      </Link>

      <div className="mb-7">
        <p className="mb-2 text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
          Espace propriétaire
        </p>
        <h1 className="font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl">
          Connexion
        </h1>
        <p className="mt-2 text-[var(--kree-muted)]">
          Réservé aux propriétaires et loueurs. Les clients contactent sans
          compte.
        </p>
      </div>

      <SignInFormFields />

      <p className="mt-7 text-center text-sm text-[var(--kree-muted)]">
        Pas encore de compte ?{" "}
        <Link
          to="/signup"
          className="font-semibold text-[var(--kree-blue)] hover:underline"
        >
          Créer un espace propriétaire
        </Link>
      </p>
    </div>
  );
}
