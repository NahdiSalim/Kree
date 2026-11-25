import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { tunisianCities } from "../data";
import {
  houseCategories,
  vehicleCategories,
} from "@/pages/marketing/listings/data";

type Category = "maison" | "vehicule";

export default function SearchBar() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>("maison");
  const [city, setCity] = useState("");
  const [listingType, setListingType] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (listingType) params.set("category", listingType);
    if (priceMax) params.set("priceMax", priceMax);
    const qs = params.toString();
    void navigate(
      category === "maison"
        ? `/maisons${qs ? `?${qs}` : ""}`
        : `/vehicules${qs ? `?${qs}` : ""}`,
    );
  };

  return (
    <div className="relative z-30 -mt-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/95 shadow-[0_30px_80px_rgba(12,110,154,0.18)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2 border-b border-[var(--kree-blue)]/8 bg-[var(--kree-blue-soft)]/50 px-4 py-3 sm:px-6">
            <Toggle
              active={category === "maison"}
              onClick={() => {
                setCategory("maison");
                setListingType("");
              }}
              label="Maisons"
            />
            <Toggle
              active={category === "vehicule"}
              onClick={() => {
                setCategory("vehicule");
                setListingType("");
              }}
              label="Véhicules"
            />
            <span className="ml-auto hidden text-xs font-medium text-[var(--kree-muted)] sm:inline">
              Recherche détaillée · Tunisie
            </span>
          </div>

          <form
            className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[1.1fr_1fr_1fr_auto]"
            onSubmit={handleSubmit}
          >
            <Field label="Ville">
              <select
                className="kree-field"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Toutes les villes</option>
                {tunisianCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={category === "maison" ? "Type de bien" : "Type de véhicule"}>
              <select
                className="kree-field"
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
              >
                <option value="">Tous les types</option>
                {(category === "maison" ? houseCategories : vehicleCategories).map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ),
                )}
              </select>
            </Field>

            <Field label="Budget max (TND)">
              <input
                type="number"
                min={0}
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder={category === "maison" ? "ex. 1500" : "ex. 200"}
                className="kree-field"
              />
            </Field>

            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--kree-blue)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-blue)]/30 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[var(--kree-blue)] text-white shadow-md shadow-[var(--kree-blue)]/25"
          : "bg-white text-[var(--kree-ink)]/70 hover:text-[var(--kree-blue)]"
      }`}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-[var(--kree-muted)] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
