import type { ReactNode } from "react";
import { tunisianCities } from "../data";

export interface HouseFiltersState {
  city: string;
  category: string;
  priceMax: string;
  bedrooms: string;
  furnished: string;
  unit: string;
  sort: string;
  q: string;
}

export interface VehicleFiltersState {
  city: string;
  category: string;
  priceMax: string;
  transmission: string;
  fuel: string;
  seats: string;
  sort: string;
  q: string;
}

export const defaultHouseFilters: HouseFiltersState = {
  city: "",
  category: "",
  priceMax: "",
  bedrooms: "",
  furnished: "",
  unit: "",
  sort: "relevant",
  q: "",
};

export const defaultVehicleFilters: VehicleFiltersState = {
  city: "",
  category: "",
  priceMax: "",
  transmission: "",
  fuel: "",
  seats: "",
  sort: "relevant",
  q: "",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold tracking-wide text-[var(--kree-muted)] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

const selectClass =
  "w-full rounded-xl border-0 bg-white px-3 py-2.5 text-sm text-[var(--kree-ink)] outline-none ring-1 ring-[var(--kree-blue)]/12 focus:ring-2 focus:ring-[var(--kree-blue)]/35";

export function HouseFilters({
  value,
  onChange,
  categories,
  resultCount,
  onReset,
}: {
  value: HouseFiltersState;
  onChange: (next: HouseFiltersState) => void;
  categories: string[];
  resultCount: number;
  onReset: () => void;
}) {
  const set = <K extends keyof HouseFiltersState>(key: K, v: HouseFiltersState[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <aside className="rounded-[1.6rem] bg-[var(--kree-blue-soft)] p-5 ring-1 ring-[var(--kree-blue)]/10">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-bold text-[var(--kree-ink)]">Filtres</h2>
          <p className="text-xs text-[var(--kree-muted)]">{resultCount} résultats</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-[var(--kree-blue)] hover:underline"
        >
          Réinitialiser
        </button>
      </div>

      <div className="space-y-3.5">
        <Field label="Recherche">
          <input
            value={value.q}
            onChange={(e) => set("q", e.target.value)}
            placeholder="Villa, Lac 2…"
            className={selectClass}
          />
        </Field>
        <Field label="Ville">
          <select
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
            className={selectClass}
          >
            <option value="">Toute la Tunisie</option>
            {tunisianCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Type de bien">
          <select
            value={value.category}
            onChange={(e) => set("category", e.target.value)}
            className={selectClass}
          >
            <option value="">Tous</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Durée">
          <select
            value={value.unit}
            onChange={(e) => set("unit", e.target.value)}
            className={selectClass}
          >
            <option value="">Nuit ou mois</option>
            <option value="nuit">À la nuit</option>
            <option value="mois">Au mois</option>
          </select>
        </Field>
        <Field label="Budget max (TND)">
          <input
            type="number"
            min={0}
            value={value.priceMax}
            onChange={(e) => set("priceMax", e.target.value)}
            placeholder="ex. 2000"
            className={selectClass}
          />
        </Field>
        <Field label="Chambres min.">
          <select
            value={value.bedrooms}
            onChange={(e) => set("bedrooms", e.target.value)}
            className={selectClass}
          >
            <option value="">Indifférent</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </Field>
        <Field label="Meublé">
          <select
            value={value.furnished}
            onChange={(e) => set("furnished", e.target.value)}
            className={selectClass}
          >
            <option value="">Indifférent</option>
            <option value="yes">Oui</option>
            <option value="no">Non</option>
          </select>
        </Field>
        <Field label="Trier par">
          <select
            value={value.sort}
            onChange={(e) => set("sort", e.target.value)}
            className={selectClass}
          >
            <option value="relevant">Pertinence</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Mieux notés</option>
          </select>
        </Field>
      </div>
    </aside>
  );
}

export function VehicleFilters({
  value,
  onChange,
  categories,
  resultCount,
  onReset,
}: {
  value: VehicleFiltersState;
  onChange: (next: VehicleFiltersState) => void;
  categories: string[];
  resultCount: number;
  onReset: () => void;
}) {
  const set = <K extends keyof VehicleFiltersState>(
    key: K,
    v: VehicleFiltersState[K],
  ) => onChange({ ...value, [key]: v });

  return (
    <aside className="rounded-[1.6rem] bg-[var(--kree-blue-soft)] p-5 ring-1 ring-[var(--kree-blue)]/10">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-bold text-[var(--kree-ink)]">Filtres</h2>
          <p className="text-xs text-[var(--kree-muted)]">{resultCount} résultats</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-[var(--kree-blue)] hover:underline"
        >
          Réinitialiser
        </button>
      </div>

      <div className="space-y-3.5">
        <Field label="Recherche">
          <input
            value={value.q}
            onChange={(e) => set("q", e.target.value)}
            placeholder="SUV, Peugeot…"
            className={selectClass}
          />
        </Field>
        <Field label="Ville">
          <select
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
            className={selectClass}
          >
            <option value="">Toute la Tunisie</option>
            {tunisianCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Type de véhicule">
          <select
            value={value.category}
            onChange={(e) => set("category", e.target.value)}
            className={selectClass}
          >
            <option value="">Tous</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget max / jour (TND)">
          <input
            type="number"
            min={0}
            value={value.priceMax}
            onChange={(e) => set("priceMax", e.target.value)}
            placeholder="ex. 200"
            className={selectClass}
          />
        </Field>
        <Field label="Boîte">
          <select
            value={value.transmission}
            onChange={(e) => set("transmission", e.target.value)}
            className={selectClass}
          >
            <option value="">Toutes</option>
            <option value="Automatique">Automatique</option>
            <option value="Manuelle">Manuelle</option>
          </select>
        </Field>
        <Field label="Carburant">
          <select
            value={value.fuel}
            onChange={(e) => set("fuel", e.target.value)}
            className={selectClass}
          >
            <option value="">Tous</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybride">Hybride</option>
            <option value="Électrique">Électrique</option>
          </select>
        </Field>
        <Field label="Places min.">
          <select
            value={value.seats}
            onChange={(e) => set("seats", e.target.value)}
            className={selectClass}
          >
            <option value="">Indifférent</option>
            <option value="2">2+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="7">7+</option>
          </select>
        </Field>
        <Field label="Trier par">
          <select
            value={value.sort}
            onChange={(e) => set("sort", e.target.value)}
            className={selectClass}
          >
            <option value="relevant">Pertinence</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Mieux notés</option>
          </select>
        </Field>
      </div>
    </aside>
  );
}
