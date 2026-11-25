import { Link } from "react-router";
import { BrandLogo } from "@/components/shared/brand-logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--kree-ink)] text-white">
      {/* Wave transition from white content above */}
      <div className="pointer-events-none absolute inset-x-0 -top-px leading-[0]">
        <svg
          className="relative block h-[70px] w-[calc(100%+1.3px)] sm:h-[90px]"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="#ffffff"
            d="M0,40 C180,90 360,0 540,30 C720,60 900,95 1080,55 C1260,15 1380,5 1440,25 L1440,0 L0,0 Z"
          />
          <path
            fill="rgba(255,179,71,0.18)"
            d="M0,52 C200,85 380,20 560,45 C740,70 920,90 1100,50 C1280,10 1380,25 1440,40 L1440,90 L0,90 Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(12,110,154,0.35),transparent_40%),radial-gradient(circle_at_10%_100%,rgba(255,179,71,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6 sm:pt-28 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center" aria-label="TunisRent — accueil">
              <BrandLogo onDark className="h-16 sm:h-20" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              La plateforme tunisienne pour louer une maison, un véhicule, et trouver un
              déménageur — le tout au même endroit.
            </p>
            <div className="mt-6 flex gap-3">
              {["f", "in", "ig"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full bg-white/8 text-sm font-bold uppercase transition hover:bg-[var(--kree-orange)]"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Explorer"
            links={[
              { label: "Maisons", href: "/maisons" },
              { label: "Véhicules", href: "/vehicules" },
              { label: "À propos", href: "/a-propos" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <FooterCol
            title="Aide"
            links={[
              { label: "Centre d’aide", href: "/contact" },
              { label: "Sécurité", href: "/contact" },
              { label: "Conditions", href: "/contact" },
              { label: "Confidentialité", href: "/contact" },
            ]}
          />
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
              Infos
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>Tunis, Tunisie</li>
              <li>
                <a href="mailto:hello@kree.tn" className="hover:text-white">
                  hello@kree.tn
                </a>
              </li>
              <li>
                <a href="tel:+21670000000" className="hover:text-white">
                  +216 70 000 000
                </a>
              </li>
            </ul>
            <div className="mt-5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs text-white/55">Newsletter</p>
              <form className="mt-2 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Votre e-mail"
                  className="min-w-0 flex-1 rounded-xl border-0 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-[var(--kree-orange)]"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[var(--kree-orange)] px-3 py-2 text-sm font-semibold text-white"
                >
                  OK
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kree. Tous droits réservés.</p>
          <p>Fait pour la Tunisie · TND</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
        {title}
      </h4>
      <ul className="space-y-3 text-sm text-white/70">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
