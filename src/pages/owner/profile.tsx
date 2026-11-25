import { useEffect, useRef, useState } from "react";
import { PageMeta } from "@/components/shared/page-meta";
import { ApiError } from "@/lib/api";
import { patchOwnerProfile, useOwnerSession } from "@/lib/owner-auth";
import { getInitials } from "@/utils";

export default function OwnerProfilePage() {
  const session = useOwnerSession();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    company: "",
    bio: "",
    avatar: "",
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;
    setForm({
      name: session.name || "",
      email: session.email || "",
      phone: session.phone?.replace(/^\+216/, "") || "",
      city: session.city || "",
      company: session.company || "",
      bio: session.bio || "",
      avatar: session.avatar || "",
    });
  }, [session]);

  if (!session) return null;

  const onChange = (
    key: keyof typeof form,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const onAvatar = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 2_500_000) {
      alert("Image trop lourde (max 2,5 Mo).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange("avatar", String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setError("");
    setSaving(true);
    try {
      await patchOwnerProfile({
        name: form.name.trim(),
        phone: form.phone.trim()
          ? `+216${form.phone.replace(/\s+/g, "")}`
          : null,
        city: form.city.trim() || null,
        company: form.company.trim() || null,
        bio: form.bio.trim() || null,
        avatarUrl: form.avatar || null,
      });
      setSaved(true);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Enregistrement impossible",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageMeta title="Mon profil | Kree Propriétaire" />
      <div className="space-y-8">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
            Compte
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[var(--kree-ink)]">
            Mon profil
          </h1>
          <p className="mt-1 text-sm text-[var(--kree-muted)]">
            Photo, coordonnées et infos visibles dans votre espace propriétaire.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
        >
          <section className="rounded-[1.6rem] bg-white p-6 shadow-[0_16px_40px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10">
            <p className="text-sm font-semibold text-[var(--kree-ink)]">
              Photo de profil
            </p>
            <div className="mt-5 flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex size-28 items-center justify-center overflow-hidden rounded-[1.4rem] bg-[var(--kree-blue)] text-2xl font-bold text-white shadow-lg shadow-[var(--kree-blue)]/25 ring-4 ring-[var(--kree-blue-soft)]">
                  {form.avatar ? (
                    <img
                      src={form.avatar}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : (
                    getInitials(form.name || "P")
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute -right-1 -bottom-1 rounded-full bg-[var(--kree-orange)] px-3 py-1.5 text-xs font-bold text-white shadow-md"
                >
                  Changer
                </button>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onAvatar(e.target.files?.[0] || null)}
              />
              <p className="mt-4 text-xs text-[var(--kree-muted)]">
                JPG ou PNG · 2,5 Mo max
              </p>
              {form.avatar && (
                <button
                  type="button"
                  onClick={() => onChange("avatar", "")}
                  className="mt-2 text-xs font-semibold text-red-500 hover:underline"
                >
                  Supprimer la photo
                </button>
              )}
            </div>
          </section>

          <section className="rounded-[1.6rem] bg-white p-6 shadow-[0_16px_40px_rgba(12,110,154,0.08)] ring-1 ring-[var(--kree-blue)]/10 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom complet *">
                <input
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  required
                  className="owner-field"
                />
              </Field>
              <Field label="E-mail *">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  required
                  className="owner-field"
                />
              </Field>
              <Field label="WhatsApp">
                <div className="flex h-11 overflow-hidden rounded-xl bg-[var(--kree-blue-soft)] ring-1 ring-[var(--kree-blue)]/10 focus-within:ring-2 focus-within:ring-[var(--kree-blue)]/35">
                  <span className="flex items-center border-r border-[var(--kree-blue)]/10 px-3 text-sm font-semibold text-[var(--kree-blue)]">
                    +216
                  </span>
                  <input
                    value={form.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    className="h-full flex-1 bg-transparent px-3 text-sm outline-none"
                    placeholder="20 123 456"
                  />
                </div>
              </Field>
              <Field label="Ville">
                <input
                  value={form.city}
                  onChange={(e) => onChange("city", e.target.value)}
                  className="owner-field"
                  placeholder="Tunis"
                />
              </Field>
              <Field label="Société / enseigne" className="sm:col-span-2">
                <input
                  value={form.company}
                  onChange={(e) => onChange("company", e.target.value)}
                  className="owner-field"
                  placeholder="Ex. Villa Amira Hammamet"
                />
              </Field>
              <Field label="À propos" className="sm:col-span-2">
                <textarea
                  value={form.bio}
                  onChange={(e) => onChange("bio", e.target.value)}
                  rows={4}
                  className="owner-field min-h-[6.5rem] resize-none py-2.5"
                  placeholder="Présentez-vous aux locataires…"
                />
              </Field>
            </div>

            {error && (
              <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--kree-blue)] px-5 text-sm font-semibold text-white shadow-lg shadow-[var(--kree-blue)]/20 transition hover:brightness-110 disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
              {saved && !error && (
                <span className="text-sm font-semibold text-emerald-600">
                  Profil mis à jour
                </span>
              )}
            </div>
          </section>
        </form>
      </div>

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
        textarea.owner-field { height: auto; }
      `}</style>
    </>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-[var(--kree-ink)]">
        {label}
      </span>
      {children}
    </label>
  );
}
