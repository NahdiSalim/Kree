import { Link } from "react-router";
import { BrandLogo } from "@/components/shared/brand-logo";
import SignUpFormFields from "./form";

export default function SignUp() {
  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-1 flex-col justify-center px-5 py-8 sm:px-8 sm:py-10">
      <Link
        to="/"
        className="mb-6 inline-flex items-center lg:hidden"
        aria-label="TunisRent — accueil"
      >
        <BrandLogo className="h-14" />
      </Link>

      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--kree-muted)] transition hover:text-[var(--kree-blue)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Retour à l’accueil
      </Link>

      <div className="mb-6">
        <p className="mb-2 text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
          Espace propriétaire
        </p>
        <h1 className="font-display text-3xl font-bold text-[var(--kree-ink)] sm:text-4xl">
          Publier sur Kree
        </h1>
        <p className="mt-2 text-[var(--kree-muted)]">
          Créez votre compte loueur pour gérer maisons, véhicules et demandes.
        </p>
      </div>

      <SignUpFormFields />

      <p className="mt-6 text-center text-sm text-[var(--kree-muted)]">
        Déjà un compte ?{" "}
        <Link
          to="/signin"
          className="font-semibold text-[var(--kree-blue)] hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
}
