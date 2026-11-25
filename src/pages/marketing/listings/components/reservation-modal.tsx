import { useEffect, useState } from "react";
import { addReservation } from "@/lib/reservations";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  listing: {
    id: string;
    type: "maison" | "vehicule";
    title: string;
    city: string;
    images: string[];
    host: { name: string };
  };
}

export default function ReservationModal({
  open,
  onClose,
  listing,
}: ReservationModalProps) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSent(false);
    setError("");
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const phoneDigits = clientPhone.replace(/\s+/g, "");
    if (!clientName.trim() || clientName.trim().length < 2) {
      setError("Indiquez votre nom complet.");
      return;
    }
    if (!/^[0-9]{8}$/.test(phoneDigits)) {
      setError("Téléphone invalide — 8 chiffres (ex. 20123456).");
      return;
    }
    if (!startDate || !endDate) {
      setError("Choisissez les dates de début et de fin.");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError("La date de fin doit être après la date de début.");
      return;
    }

    setSubmitting(true);
    try {
      await addReservation({
        listingId: listing.id,
        listingType: listing.type,
        clientName: clientName.trim(),
        clientPhone: `+216${phoneDigits}`,
        clientEmail: clientEmail.trim(),
        startDate,
        endDate,
        message: message.trim(),
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l’envoi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-[var(--kree-ink)]/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[1.6rem] bg-white p-6 shadow-2xl sm:rounded-[1.6rem] sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
              Demande de réservation
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-[var(--kree-ink)]">
              {listing.title}
            </h2>
            <p className="text-sm text-[var(--kree-muted)]">{listing.city}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--kree-blue-soft)] text-[var(--kree-blue)]"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {sent ? (
          <div className="rounded-2xl bg-[var(--kree-blue-soft)] px-5 py-8 text-center">
            <p className="font-display text-2xl font-bold text-[var(--kree-blue)]">
              Demande envoyée
            </p>
            <p className="mt-2 text-sm text-[var(--kree-muted)]">
              Votre demande est en attente. Le propriétaire la verra dans son
              tableau de bord et vous recontactera.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex rounded-2xl bg-[var(--kree-blue)] px-5 py-3 text-sm font-semibold text-white"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            <Field label="Nom complet *">
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="kree-field"
                placeholder="Votre nom"
                autoComplete="name"
              />
            </Field>

            <Field label="Téléphone *">
              <div className="flex h-11 overflow-hidden rounded-xl bg-[var(--kree-blue-soft)] ring-1 ring-[var(--kree-blue)]/10 focus-within:ring-2 focus-within:ring-[var(--kree-blue)]/35">
                <span className="flex items-center border-r border-[var(--kree-blue)]/10 px-3 text-sm font-semibold text-[var(--kree-blue)]">
                  +216
                </span>
                <input
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="h-full flex-1 bg-transparent px-3 text-sm outline-none"
                  placeholder="20 123 456"
                  inputMode="numeric"
                  autoComplete="tel-national"
                />
              </div>
            </Field>

            <Field label="E-mail (optionnel)">
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="kree-field"
                placeholder="vous@exemple.tn"
                autoComplete="email"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Début *">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="kree-field"
                />
              </Field>
              <Field label="Fin *">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="kree-field"
                />
              </Field>
            </div>

            <Field label="Message">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="kree-field resize-none py-2.5"
                placeholder="Précisez vos besoins…"
              />
            </Field>

            {error && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--kree-blue)] text-sm font-semibold text-white shadow-lg shadow-[var(--kree-blue)]/20 transition hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? "Envoi…" : "Envoyer la demande"}
            </button>
            <p className="text-center text-xs text-[var(--kree-muted)]">
              Aucun compte requis — le propriétaire reçoit votre demande en
              attente.
            </p>
          </form>
        )}
      </div>

      <style>{`
        .kree-field {
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
        .kree-field:focus {
          box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--kree-blue) 35%, transparent);
        }
        textarea.kree-field {
          height: auto;
          min-height: 5rem;
        }
      `}</style>
    </div>
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
