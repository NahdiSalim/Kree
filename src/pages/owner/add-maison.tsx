import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PageMeta } from "@/components/shared/page-meta";
import { addOwnerHouse } from "@/lib/owner-listings";
import {
  houseCategories,
  tunisianCities,
  type HouseCategory,
} from "@/pages/marketing/listings/data";
import ImageGalleryDropzone, {
  type GalleryImage,
} from "./components/image-gallery-dropzone";

const AMENITY_OPTIONS = [
  "Wi-Fi",
  "Climatisation",
  "Cuisine équipée",
  "Parking",
  "Piscine",
  "Jardin",
  "Ascenseur",
  "Machine à laver",
  "TV",
  "Chauffage",
];

export default function OwnerAddMaisonPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState<string>(tunisianCities[0] || "Tunis");
  const [governorate, setGovernorate] = useState("");
  const [addressArea, setAddressArea] = useState("");
  const [category, setCategory] = useState<HouseCategory>("Appartement");
  const [price, setPrice] = useState("150");
  const [unit, setUnit] = useState<"nuit" | "mois">("nuit");
  const [bedrooms, setBedrooms] = useState("2");
  const [bathrooms, setBathrooms] = useState("1");
  const [area, setArea] = useState("80");
  const [floor, setFloor] = useState("");
  const [furnished, setFurnished] = useState(true);
  const [parking, setParking] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [amenities, setAmenities] = useState<string[]>(["Wi-Fi", "Climatisation"]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [availableFrom, setAvailableFrom] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleAmenity = (a: string) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || title.trim().length < 4) {
      setError("Indiquez un titre clair (4 caractères min.).");
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
      const item = await addOwnerHouse({
        title: title.trim(),
        description: description.trim(),
        city,
        governorate: governorate.trim() || city,
        addressArea: addressArea.trim() || city,
        category,
        price: priceNum,
        unit,
        images: images.map((img) => img.dataUrl),
        amenities,
        specs: {
          bedrooms: Number(bedrooms) || 0,
          bathrooms: Number(bathrooms) || 1,
          area: Number(area) || 50,
          furnished,
          floor: floor === "" ? undefined : Number(floor),
          parking,
          petsAllowed,
        },
        availableFrom,
      });
      navigate(`/dashboard/maisons`, { state: { createdId: item.id } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de la publication");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageMeta title="Ajouter une maison | Kree" />
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link
            to="/dashboard/maisons"
            className="inline-flex text-sm font-medium text-[var(--kree-muted)] hover:text-[var(--kree-blue)]"
          >
            ← Retour aux maisons
          </Link>
          <p className="mt-4 text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
            Nouvelle annonce
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[var(--kree-ink)]">
            Ajouter une maison
          </h1>
          <p className="mt-1 text-sm text-[var(--kree-muted)]">
            Remplissez les infos essentielles. L’annonce apparaîtra dans votre
            tableau de bord.
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
                placeholder="Villa avec piscine à Hammamet"
              />
            </Field>
            <Field label="Description *">
              <textarea
                className="owner-field min-h-28 resize-none py-2.5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez le logement, le quartier, ce qui le rend unique…"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Catégorie">
                <select
                  className="owner-field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as HouseCategory)}
                >
                  {houseCategories.map((c) => (
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
                  placeholder="Ex. Nabeul"
                />
              </Field>
              <Field label="Quartier / zone">
                <input
                  className="owner-field"
                  value={addressArea}
                  onChange={(e) => setAddressArea(e.target.value)}
                  placeholder="Ex. Yasmine Hammamet"
                />
              </Field>
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
                  onChange={(e) => setUnit(e.target.value as "nuit" | "mois")}
                >
                  <option value="nuit">Par nuit</option>
                  <option value="mois">Par mois</option>
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

          <Section title="Caractéristiques">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Chambres">
                <input
                  type="number"
                  min="0"
                  className="owner-field"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              </Field>
              <Field label="Salles de bain">
                <input
                  type="number"
                  min="1"
                  className="owner-field"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                />
              </Field>
              <Field label="Surface (m²)">
                <input
                  type="number"
                  min="10"
                  className="owner-field"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </Field>
              <Field label="Étage">
                <input
                  type="number"
                  className="owner-field"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  placeholder="Optionnel"
                />
              </Field>
            </div>
            <div className="mt-3 flex flex-wrap gap-4">
              <Toggle checked={furnished} onChange={setFurnished} label="Meublé" />
              <Toggle checked={parking} onChange={setParking} label="Parking" />
              <Toggle
                checked={petsAllowed}
                onChange={setPetsAllowed}
                label="Animaux acceptés"
              />
            </div>
          </Section>

          <Section title="Équipements">
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((a) => {
                const on = amenities.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                      on
                        ? "bg-[var(--kree-blue)] text-white"
                        : "bg-[var(--kree-blue-soft)] text-[var(--kree-muted)]"
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Photos">
            <ImageGalleryDropzone
              images={images}
              onChange={setImages}
              accent="blue"
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
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--kree-blue)] px-6 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-blue)]/20 disabled:opacity-60"
            >
              {saving ? "Enregistrement…" : "Publier la maison"}
            </button>
            <Link
              to="/dashboard/maisons"
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
