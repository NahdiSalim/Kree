import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  houseTypes,
  moreMenu,
  vehicleTypes,
  type MegaCategory,
  type MegaPreview,
} from "../data";

type MenuKey = "maisons" | "vehicules" | "plus" | null;

const menus: Record<Exclude<MenuKey, null>, MegaCategory[]> = {
  maisons: houseTypes,
  vehicules: vehicleTypes,
  plus: moreMenu,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const toggle = (key: Exclude<MenuKey, null>) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  return (
    <header
      ref={navRef}
      className={`kree-nav fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen || open
          ? "bg-white/95 shadow-[0_8px_30px_rgba(12,110,154,0.08)] backdrop-blur-xl"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(null)}>
          <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-2xl bg-[var(--kree-blue)] text-white shadow-lg shadow-[var(--kree-blue)]/30">
            <span className="font-display text-lg font-bold tracking-tight">K</span>
            <span className="absolute -right-1 -bottom-1 size-4 rounded-full bg-[var(--kree-orange)]" />
          </span>
          <span
            className={`font-display text-xl font-bold tracking-tight transition-colors ${
              scrolled || mobileOpen || open ? "text-[var(--kree-ink)]" : "text-white"
            }`}
          >
            Kree
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {(
            [
              ["maisons", "Maisons"],
              ["vehicules", "Véhicules"],
              ["plus", "Plus"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-expanded={open === key}
              onClick={() => toggle(key)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                scrolled || open
                  ? "text-[var(--kree-ink)]/80 hover:bg-[var(--kree-blue-soft)] hover:text-[var(--kree-blue)]"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              } ${
                open === key
                  ? scrolled || open
                    ? "bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]"
                    : "bg-white/10 text-white"
                  : ""
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

          <a
            href="#derniers"
            onClick={() => setOpen(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              scrolled || open
                ? "text-[var(--kree-ink)]/80 hover:bg-[var(--kree-blue-soft)] hover:text-[var(--kree-blue)]"
                : "text-white/90 hover:bg-white/10 hover:text-white"
            }`}
          >
            Nouveautés
          </a>
          <a
            href="#offres"
            onClick={() => setOpen(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              scrolled || open
                ? "text-[var(--kree-ink)]/80 hover:bg-[var(--kree-blue-soft)] hover:text-[var(--kree-blue)]"
                : "text-white/90 hover:bg-white/10 hover:text-white"
            }`}
          >
            Offres
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/signin"
            className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition sm:inline-flex ${
              scrolled || mobileOpen || open
                ? "text-[var(--kree-blue)] hover:bg-[var(--kree-blue-soft)]"
                : "text-white hover:bg-white/10"
            }`}
          >
            Connexion
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center rounded-full bg-[var(--kree-orange)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-orange)]/25 transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Publier
          </Link>
          <button
            type="button"
            className={`inline-flex size-10 items-center justify-center rounded-full lg:hidden ${
              scrolled || mobileOpen || open
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
      </div>

      {open && (
        <ThreePanelMega
          categories={menus[open]}
          onNavigate={() => setOpen(null)}
        />
      )}

      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-[var(--kree-blue)]/10 bg-white px-4 py-5 lg:hidden">
          <MobileGroup title="Maisons" items={houseTypes} />
          <MobileGroup title="Véhicules" items={vehicleTypes} />
          <MobileGroup title="Plus" items={moreMenu} />
          <div className="mt-4 flex flex-col gap-2">
            <Link
              to="/signin"
              className="rounded-2xl border border-[var(--kree-blue)]/15 px-4 py-3 text-center font-semibold text-[var(--kree-blue)]"
              onClick={() => setMobileOpen(false)}
            >
              Connexion
            </Link>
            <Link
              to="/signup"
              className="rounded-2xl bg-[var(--kree-blue)] px-4 py-3 text-center font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Créer un compte
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function ThreePanelMega({
  categories,
  onNavigate,
}: {
  categories: MegaCategory[];
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
    <div className="hidden border-t border-[var(--kree-blue)]/10 bg-white/98 shadow-[0_30px_60px_rgba(12,110,154,0.12)] backdrop-blur-xl lg:block">
      <div
        className={`mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8 ${
          activeType === null
            ? "justify-start"
            : activeItem === null
              ? ""
              : ""
        }`}
      >
        {/* Panel 1 — types */}
        <div
          className={`w-[16.5rem] shrink-0 py-4 pr-3 ${
            activeType !== null ? "border-r border-[var(--kree-blue)]/8" : ""
          }`}
        >
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
                    <span className="block text-xs text-[var(--kree-muted)]">{cat.desc}</span>
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Panel 2 — top 5 (appears on type hover) */}
        {category && (
          <div className="min-w-0 flex-1 animate-[kreeFadeUp_0.22s_ease] border-r border-[var(--kree-blue)]/8 py-4 px-4">
            <p className="mb-2 px-2 text-[11px] font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
              Top 5 · {category.label}
            </p>
            <ul className="space-y-1">
              {category.items.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
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
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Panel 3 — detail (appears on listing hover) */}
        {preview && (
          <div className="w-[22rem] shrink-0 animate-[kreeFadeUp_0.22s_ease] py-4 pl-4">
            <PreviewCard item={preview} onNavigate={onNavigate} />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewCard({
  item,
  onNavigate,
}: {
  item: MegaPreview;
  onNavigate: () => void;
}) {
  return (
    <a
      href="#"
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
    </a>
  );
}

function MobileGroup({
  title,
  items,
}: {
  title: string;
  items: MegaCategory[];
}) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
        {title}
      </p>
      <div className="grid gap-1">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-xl px-3 py-2.5 hover:bg-[var(--kree-blue-soft)]"
          >
            <div className="text-sm font-semibold text-[var(--kree-ink)]">{item.label}</div>
            <div className="text-xs text-[var(--kree-muted)]">{item.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
