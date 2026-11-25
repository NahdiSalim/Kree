import { Link } from "react-router";
import { BrandLogo } from "@/components/shared/brand-logo";

const highlights = [
  "Maisons & véhicules au même endroit",
  "Annonces vérifiées partout en Tunisie",
  "Publiez en quelques minutes",
];

export default function BrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden lg:flex lg:w-[46%] xl:w-[48%]">
      <img
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,45,70,0.88)_0%,rgba(12,110,154,0.72)_55%,rgba(8,45,70,0.85)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,179,71,0.28),transparent_42%)]" />

      <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
        <Link
          to="/"
          className="inline-flex items-center self-start"
          aria-label="TunisRent — accueil"
        >
          <BrandLogo onDark className="h-16" />
        </Link>

        <div className="max-w-md">
          <p className="mb-3 text-xs font-bold tracking-[0.16em] text-[var(--kree-orange)] uppercase">
            Tunisie · Location
          </p>
          <h2 className="font-display text-4xl leading-tight font-bold text-white xl:text-5xl">
            Louez une maison ou un véhicule, simplement.
          </h2>
          <p className="mt-4 text-base text-white/75">
            Rejoignez la plateforme qui connecte locataires et propriétaires partout en Tunisie.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/90 ring-1 ring-white/15 backdrop-blur-md"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--kree-orange)] text-xs font-bold text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-white/50">Fait pour la Tunisie · TND</p>
      </div>
    </aside>
  );
}
