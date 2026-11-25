import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { BrandLogo } from "@/components/shared/brand-logo";
import { useOwnerSession } from "@/lib/owner-auth";
import { useHome, type MegaCategory, type MegaPreview } from "@/lib/home-api";

type MenuKey = "maisons" | "vehicules" | null;

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const owner = useOwnerSession();
  const { data: home } = useHome();
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const isSolid = solid || scrolled || mobileOpen || open;

  const menus: Record<Exclude<MenuKey, null>, MegaCategory[]> = {
    maisons: home?.mega.maisons ?? [],
    vehicules: home?.mega.vehicules ?? [],
  };

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onEsc);
    };
  }, [mobileOpen]);

  const toggle = (key: Exclude<MenuKey, null>) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  return (
    <header ref={navRef} className="kree-nav fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          isSolid
            ? "bg-white shadow-[0_8px_30px_rgba(12,110,154,0.08)]"
            : "bg-gradient-to-b from-black/45 to-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 overflow-visible px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group relative z-10 -my-3 flex items-center"
            onClick={() => setOpen(null)}
            aria-label="TunisRent — accueil"
          >
            <BrandLogo className="h-14 sm:h-[3.75rem]" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {(
              [
                ["maisons", "Maisons"],
                ["vehicules", "Véhicules"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-expanded={open === key}
                onClick={() => toggle(key)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                  isSolid
                    ? "text-[var(--kree-ink)]/80 hover:bg-[var(--kree-blue-soft)] hover:text-[var(--kree-blue)]"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                } ${
                  open === key ? "bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]" : ""
                }`}
              >
                {label}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition ${open === key ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            ))}

            <Link
              to="/a-propos"
              onClick={() => setOpen(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isSolid
                  ? "text-[var(--kree-ink)]/80 hover:bg-[var(--kree-blue-soft)] hover:text-[var(--kree-blue)]"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              À propos
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isSolid
                  ? "text-[var(--kree-ink)]/80 hover:bg-[var(--kree-blue-soft)] hover:text-[var(--kree-blue)]"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {owner ? (
              <>
                <Link
                  to="/dashboard"
                  className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition sm:inline-flex ${
                    isSolid
                      ? "text-[var(--kree-blue)] hover:bg-[var(--kree-blue-soft)]"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {owner.avatar ? (
                    <img
                      src={owner.avatar}
                      alt=""
                      className="size-7 rounded-full object-cover ring-2 ring-white/40"
                    />
                  ) : null}
                  Tableau de bord
                </Link>
                <Link
                  to="/dashboard/maisons/ajouter"
                  className="inline-flex items-center rounded-full bg-[var(--kree-orange)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-orange)]/25 transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Publier
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition sm:inline-flex ${
                    isSolid
                      ? "text-[var(--kree-blue)] hover:bg-[var(--kree-blue-soft)]"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Espace pro
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center rounded-full bg-[var(--kree-orange)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-orange)]/25 transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Publier
                </Link>
              </>
            )}
            <button
              type="button"
              className={`inline-flex size-10 items-center justify-center rounded-full lg:hidden ${
                isSolid
                  ? "bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]"
                  : "bg-white/15 text-white"
              }`}
              aria-label="Menu"
              onClick={() => {
                setOpen(null);
                setMobileOpen((v) => !v);
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>

          {open && (
            <div className="absolute top-full left-4 z-[60] hidden pt-2 sm:left-6 lg:left-8 lg:block">
              <ThreePanelMega
                categories={menus[open]}
                listPath={open === "vehicules" ? "/vehicules" : "/maisons"}
                listingBase={open === "vehicules" ? "/vehicules" : "/maisons"}
                onNavigate={() => setOpen(null)}
              />
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden">
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between overflow-visible border-b border-[var(--kree-blue)]/10 px-4">
            <Link
              to="/"
              className="relative z-10 -my-3 inline-flex items-center"
              onClick={() => setMobileOpen(false)}
              aria-label="TunisRent — accueil"
            >
              <BrandLogo className="h-14 sm:h-[3.75rem]" />
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]"
              aria-label="Fermer le menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mb-6 grid gap-2">
              <Link
                to="/maisons"
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl bg-[var(--kree-blue)] px-4 py-4 text-center font-semibold text-white"
              >
                Maisons
              </Link>
              <Link
                to="/vehicules"
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl bg-[var(--kree-blue-soft)] px-4 py-4 text-center font-semibold text-[var(--kree-blue)]"
              >
                Véhicules
              </Link>
              <Link
                to="/a-propos"
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-[var(--kree-blue)]/15 px-4 py-4 text-center font-semibold text-[var(--kree-ink)]"
              >
                À propos
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-[var(--kree-blue)]/15 px-4 py-4 text-center font-semibold text-[var(--kree-ink)]"
              >
                Contact
              </Link>
            </div>

            <MobileGroup
              title="Maisons"
              items={menus.maisons}
              onNavigate={() => setMobileOpen(false)}
            />
            <MobileGroup
              title="Véhicules"
              items={menus.vehicules}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>

          <div className="shrink-0 space-y-2 border-t border-[var(--kree-blue)]/10 bg-white px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {owner ? (
              <>
                <Link
                  to="/dashboard"
                  className="block rounded-2xl border border-[var(--kree-blue)]/15 px-4 py-3.5 text-center font-semibold text-[var(--kree-blue)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Tableau de bord
                </Link>
                <Link
                  to="/dashboard/maisons/ajouter"
                  className="block rounded-2xl bg-[var(--kree-orange)] px-4 py-3.5 text-center font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Publier une annonce
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="block rounded-2xl border border-[var(--kree-blue)]/15 px-4 py-3.5 text-center font-semibold text-[var(--kree-blue)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Espace pro
                </Link>
                <Link
                  to="/signup"
                  className="block rounded-2xl bg-[var(--kree-orange)] px-4 py-3.5 text-center font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Publier une annonce
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function ThreePanelMega({
  categories,
  listPath,
  listingBase,
  onNavigate,
}: {
  categories: MegaCategory[];
  listPath: string;
  listingBase: string;
  onNavigate: () => void;
}) {
  const [activeType, setActiveType] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  useEffect(() => {
    setActiveType(null);
    setActiveItem(null);
  }, [categories]);

  const category = activeType !== null ? categories[activeType] : null;
  const preview =
    category && activeItem !== null ? category.items[activeItem] : null;

  return (
    <div className="flex w-max max-w-[min(100vw-2rem,72rem)] overflow-hidden rounded-3xl border border-[var(--kree-blue)]/10 bg-white shadow-[0_24px_50px_rgba(12,110,154,0.18)]">
      <div className="w-[16.5rem] shrink-0 p-4">
        <p className="mb-2 px-3 text-[11px] font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
          Catégories
        </p>
        <ul className="space-y-0.5">
          {categories.map((cat, index) => (
            <li key={cat.label}>
              <button
                type="button"
                onMouseEnter={() => {
                  setActiveType(index);
                  setActiveItem(null);
                }}
                onFocus={() => {
                  setActiveType(index);
                  setActiveItem(null);
                }}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left transition ${
                  activeType === index
                    ? "bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]"
                    : "text-[var(--kree-ink)] hover:bg-[var(--kree-blue-soft)]/60"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold">{cat.label}</span>
                  <span className="block text-xs text-[var(--kree-muted)]">
                    {cat.items.length > 0
                      ? `${cat.items.length} annonce${cat.items.length > 1 ? "s" : ""}`
                      : cat.desc}
                  </span>
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <Link
          to={listPath}
          onClick={onNavigate}
          className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--kree-blue)] px-3 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Voir tout le catalogue →
        </Link>
      </div>

      {category && (
        <div className="w-[22rem] shrink-0 animate-[kreeFadeUp_0.22s_ease] border-l border-[var(--kree-blue)]/8 p-4">
          <p className="mb-2 px-2 text-[11px] font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
            Top · {category.label}
          </p>
          {category.items.length === 0 ? (
            <p className="rounded-2xl bg-[var(--kree-blue-soft)] px-3 py-8 text-center text-sm text-[var(--kree-muted)]">
              Aucune annonce dans cette catégorie pour le moment.
            </p>
          ) : (
            <ul className="space-y-1">
              {category.items.map((item, index) => (
                <li key={item.id}>
                  <Link
                    to={`${listingBase}/${item.id}`}
                    onClick={onNavigate}
                    onMouseEnter={() => setActiveItem(index)}
                    onFocus={() => setActiveItem(index)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition ${
                      activeItem === index
                        ? "bg-[var(--kree-blue-soft)]"
                        : "hover:bg-[var(--kree-blue-soft)]/50"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="size-12 shrink-0 rounded-xl object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-[var(--kree-ink)]">
                        {item.title}
                      </span>
                      <span className="block text-xs text-[var(--kree-muted)]">
                        {item.city} · ★ {item.rating.toFixed(1)}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs font-bold text-[var(--kree-blue)]">
                      {item.price} TND
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {preview && (
        <div className="w-[20rem] shrink-0 animate-[kreeFadeUp_0.22s_ease] border-l border-[var(--kree-blue)]/8 p-4">
          <PreviewCard
            item={preview}
            href={`${listingBase}/${preview.id}`}
            onNavigate={onNavigate}
          />
        </div>
      )}
    </div>
  );
}

function PreviewCard({
  item,
  href,
  onNavigate,
}: {
  item: MegaPreview;
  href: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={href}
      onClick={onNavigate}
      className="group block h-full overflow-hidden rounded-[1.4rem] bg-[var(--kree-blue-soft)] ring-1 ring-[var(--kree-blue)]/10 transition hover:shadow-[0_16px_40px_rgba(12,110,154,0.15)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-[var(--kree-orange)] px-2.5 py-1 text-[11px] font-bold text-white">
          ★ {item.rating.toFixed(1)}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold tracking-wide text-[var(--kree-orange)] uppercase">
          {item.city}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold text-[var(--kree-ink)]">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--kree-muted)]">{item.meta}</p>
        <p className="mt-3 text-[var(--kree-blue)]">
          <span className="font-display text-xl font-bold">{item.price}</span>
          <span className="text-sm font-medium"> TND / {item.unit}</span>
        </p>
        <span className="mt-3 inline-flex text-sm font-semibold text-[var(--kree-blue)] group-hover:underline">
          Voir l’annonce →
        </span>
      </div>
    </Link>
  );
}

function MobileGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: MegaCategory[];
  onNavigate?: () => void;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
        {title}
      </p>
      <div className="grid gap-1">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={onNavigate}
            className="rounded-xl px-3 py-3 hover:bg-[var(--kree-blue-soft)]"
          >
            <div className="text-sm font-semibold text-[var(--kree-ink)]">{item.label}</div>
            <div className="text-xs text-[var(--kree-muted)]">
              {item.items.length > 0
                ? `${item.items.length} annonce${item.items.length > 1 ? "s" : ""}`
                : item.desc}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
