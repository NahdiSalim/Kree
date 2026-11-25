import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PageMeta } from "@/components/shared/page-meta";
import { addOwnerVehicle } from "@/lib/owner-listings";
import {
  tunisianCities,
  vehicleCategories,
  type VehicleCategory,
} from "@/pages/marketing/listings/data";
import ImageGalleryDropzone, {
  type GalleryImage,
} from "./components/image-gallery-dropzone";

const FEATURE_OPTIONS = [
  "Assurance incluse",
  "GPS",
  "Bluetooth",
  "Caméra de recul",
  "Siège bébé disponible",
  "Plein d’essence",
  "Livraison possible",
];

export default function OwnerAddVehiculePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState<string>(tunisianCities[0] || "Tunis");
  const [governorate, setGovernorate] = useState("");
  const [category, setCategory] = useState<VehicleCategory>("Voiture");
  const [price, setPrice] = useState("90");
  const [unit, setUnit] = useState<"jour" | "semaine">("jour");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2022");
  const [transmission, setTransmission] = useState<"Manuelle" | "Automatique">(
    "Manuelle",
  );
  const [fuel, setFuel] = useState<"Essence" | "Diesel" | "Hybride" | "Électrique">(
    "Essence",
  );
  const [seats, setSeats] = useState("5");
  const [doors, setDoors] = useState("4");
  const [mileage, setMileage] = useState("45000");
  const [airConditioning, setAirConditioning] = useState(true);
  const [features, setFeatures] = useState<string[]>(["Assurance incluse"]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [availableFrom, setAvailableFrom] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleFeature = (f: string) => {
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || title.trim().length < 4) {
      setError("Indiquez un titre clair (4 caractères min.).");
      return;
    }
    if (!brand.trim() || !model.trim()) {
      setError("Marque et modèle sont requis.");
      return;
    }
    if (!description.trim() || description.trim().length < 20) {
      setError("Ajoutez une description un peu plus détaillée.");
      return;
    }
    if (images.length === 0) {
      setError("Ajoutez au moins une photo.");
      return;
    }
    const priceNum = Number(price);
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      setError("Prix invalide.");
      return;
    }

    setSaving(true);
    try {
      await addOwnerVehicle({
        title: title.trim(),
        description: description.trim(),
        city,
        governorate: governorate.trim() || city,
        category,
        price: priceNum,
        unit,
        images: images.map((img) => img.dataUrl),
        features,
        specs: {
          brand: brand.trim(),
          model: model.trim(),
          year: Number(year) || new Date().getFullYear(),
          transmission,
          fuel,
          seats: Number(seats) || 5,
          doors: Number(doors) || 4,
          mileage: Number(mileage) || 0,
          airConditioning,
        },
        availableFrom,
      });
      navigate("/dashboard/vehicules");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de la publication");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageMeta title="Ajouter un véhicule | Kree" />
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link
            to="/dashboard/vehicules"
            className="inline-flex text-sm font-medium text-[var(--kree-muted)] hover:text-[var(--kree-blue)]"
          >
            ← Retour aux véhicules
          </Link>
          <p className="mt-4 text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
            Nouvelle annonce
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[var(--kree-ink)]">
            Ajouter un véhicule
          </h1>
          <p className="mt-1 text-sm text-[var(--kree-muted)]">
            Remplissez les infos du véhicule. L’annonce apparaîtra dans votre
            espace.
          </p>
        </div>

        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="space-y-6 rounded-[1.6rem] bg-white p-5 shadow-[0_12px_30px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10 sm:p-8"
        >
          <Section title="Informations générales">
            <Field label="Titre *">
              <input
                className="owner-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Peugeot 208 automatique — Tunis"
              />
            </Field>
            <Field label="Description *">
              <textarea
                className="owner-field min-h-28 resize-none py-2.5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="État du véhicule, conditions de location…"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Catégorie">
                <select
                  className="owner-field"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as VehicleCategory)
                  }
                >
                  {vehicleCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Ville">
                <select
                  className="owner-field"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {tunisianCities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Gouvernorat">
                <input
                  className="owner-field"
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  placeholder="Ex. Tunis"
                />
              </Field>
            </div>
          </Section>

          <Section title="Véhicule">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Marque *">
                <input
                  className="owner-field"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Peugeot"
                />
              </Field>
              <Field label="Modèle *">
                <input
                  className="owner-field"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="208"
                />
              </Field>
              <Field label="Année">
                <input
                  type="number"
                  className="owner-field"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Field>
              <Field label="Boîte">
                <select
                  className="owner-field"
                  value={transmission}
                  onChange={(e) =>
                    setTransmission(e.target.value as "Manuelle" | "Automatique")
                  }
                >
                  <option value="Manuelle">Manuelle</option>
                  <option value="Automatique">Automatique</option>
                </select>
              </Field>
              <Field label="Carburant">
                <select
                  className="owner-field"
                  value={fuel}
                  onChange={(e) =>
                    setFuel(
                      e.target.value as
                        | "Essence"
                        | "Diesel"
                        | "Hybride"
                        | "Électrique",
                    )
                  }
                >
                  <option value="Essence">Essence</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybride">Hybride</option>
                  <option value="Électrique">Électrique</option>
                </select>
              </Field>
              <Field label="Places">
                <input
                  type="number"
                  min="1"
                  className="owner-field"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />
              </Field>
              <Field label="Portes">
                <input
                  type="number"
                  min="2"
                  className="owner-field"
                  value={doors}
                  onChange={(e) => setDoors(e.target.value)}
                />
              </Field>
              <Field label="Kilométrage">
                <input
                  type="number"
                  min="0"
                  className="owner-field"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </Field>
            </div>
            <div className="mt-3">
              <Toggle
                checked={airConditioning}
                onChange={setAirConditioning}
                label="Climatisation"
              />
            </div>
          </Section>

          <Section title="Tarif & disponibilité">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Prix (TND) *">
                <input
                  type="number"
                  min="1"
                  className="owner-field"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Field>
              <Field label="Unité">
                <select
                  className="owner-field"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as "jour" | "semaine")}
                >
                  <option value="jour">Par jour</option>
                  <option value="semaine">Par semaine</option>
                </select>
              </Field>
              <Field label="Disponible dès">
                <input
                  type="date"
                  className="owner-field"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
              </Field>
            </div>
          </Section>

          <Section title="Inclus">
            <div className="flex flex-wrap gap-2">
              {FEATURE_OPTIONS.map((f) => {
                const on = features.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFeature(f)}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                      on
                        ? "bg-[var(--kree-orange)] text-white"
                        : "bg-orange-50 text-[var(--kree-muted)]"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Photos">
            <ImageGalleryDropzone
              images={images}
              onChange={setImages}
              accent="orange"
              maxFiles={10}
            />
          </Section>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3 border-t border-[var(--kree-blue)]/10 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--kree-orange)] px-6 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-orange)]/25 disabled:opacity-60"
            >
              {saving ? "Enregistrement…" : "Publier le véhicule"}
            </button>
            <Link
              to="/dashboard/vehicules"
              className="inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold text-[var(--kree-muted)] hover:bg-[var(--kree-blue-soft)]"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
      <FieldStyles />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-lg font-bold text-[var(--kree-ink)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-[var(--kree-ink)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--kree-ink)]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-[var(--kree-blue)]/30 text-[var(--kree-blue)]"
      />
      {label}
    </label>
  );
}

function FieldStyles() {
  return (
    <style>{`
      .owner-field {
        width: 100%;
        height: 2.75rem;
        border-radius: 0.75rem;
        background: var(--kree-blue-soft);
        padding: 0 0.85rem;
        font-size: 0.875rem;
        color: var(--kree-ink);
        outline: none;
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--kree-blue) 10%, transparent);
      }
      .owner-field:focus {
        box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--kree-blue) 35%, transparent);
      }
      textarea.owner-field { height: auto; min-height: 7rem; }
    `}</style>
  );
}
