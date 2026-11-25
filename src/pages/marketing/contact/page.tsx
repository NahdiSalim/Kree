import { useState } from "react";
import { Helmet } from "react-helmet-async";
import MarketingLayout from "../layout";
import { whatsappUrl } from "@/lib/reservations";

const SUPPORT_PHONE = "21620000000";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("question");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <MarketingLayout>
      <Helmet>
        <title>Contact | Kree</title>
      </Helmet>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(12,110,154,0.12),_transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
              Contact
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold text-[var(--kree-ink)] sm:text-5xl">
              Parlons de votre location
            </h1>
            <p className="mt-3 text-lg text-[var(--kree-muted)]">
              Une question sur une annonce, un partenariat, ou besoin d’aide
              pour publier ? Écrivez-nous — réponse sous 24 h en moyenne.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              onSubmit={handleSubmit}
              className="rounded-[1.6rem] bg-white p-6 shadow-[0_20px_50px_rgba(12,110,154,0.1)] ring-1 ring-[var(--kree-blue)]/10 sm:p-8"
            >
              {sent ? (
                <div className="py-10 text-center">
                  <p className="font-display text-2xl font-bold text-[var(--kree-blue)]">
                    Message envoyé
                  </p>
                  <p className="mt-2 text-sm text-[var(--kree-muted)]">
                    Merci {name}. Notre équipe vous répondra bientôt.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold">Nom *</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 w-full rounded-2xl bg-[var(--kree-blue-soft)] px-4 text-sm ring-1 ring-[var(--kree-blue)]/10 outline-none focus:ring-2 focus:ring-[var(--kree-blue)]/35"
                      placeholder="Votre nom"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold">E-mail</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-2xl bg-[var(--kree-blue-soft)] px-4 text-sm ring-1 ring-[var(--kree-blue)]/10 outline-none focus:ring-2 focus:ring-[var(--kree-blue)]/35"
                      placeholder="vous@exemple.tn"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold">Sujet</span>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="h-12 w-full rounded-2xl bg-[var(--kree-blue-soft)] px-4 text-sm ring-1 ring-[var(--kree-blue)]/10 outline-none focus:ring-2 focus:ring-[var(--kree-blue)]/35"
                    >
                      <option value="question">Question générale</option>
                      <option value="proprietaire">Devenir propriétaire</option>
                      <option value="annonce">Problème avec une annonce</option>
                      <option value="partenariat">Partenariat</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold">
                      Message *
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full resize-none rounded-2xl bg-[var(--kree-blue-soft)] px-4 py-3 text-sm ring-1 ring-[var(--kree-blue)]/10 outline-none focus:ring-2 focus:ring-[var(--kree-blue)]/35"
                      placeholder="Comment pouvons-nous vous aider ?"
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--kree-blue)] text-sm font-semibold text-white shadow-lg shadow-[var(--kree-blue)]/25"
                  >
                    Envoyer
                  </button>
                </div>
              )}
            </form>

            <aside className="space-y-4">
              <div className="rounded-[1.6rem] bg-[var(--kree-blue)] p-6 text-white sm:p-8">
                <h2 className="font-display text-2xl font-bold">WhatsApp</h2>
                <p className="mt-2 text-sm text-white/80">
                  Pour une réponse rapide, écrivez-nous directement sur WhatsApp.
                </p>
                <a
                  href={whatsappUrl(
                    SUPPORT_PHONE,
                    "Bonjour Kree, j’ai une question…",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex rounded-2xl bg-[var(--kree-orange)] px-5 py-3 text-sm font-semibold text-white"
                >
                  Ouvrir WhatsApp
                </a>
              </div>
              <div className="rounded-[1.6rem] bg-white p-6 ring-1 ring-[var(--kree-blue)]/10 sm:p-8">
                <h3 className="font-display text-lg font-bold text-[var(--kree-ink)]">
                  Infos pratiques
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-[var(--kree-muted)]">
                  <li>
                    <span className="font-semibold text-[var(--kree-ink)]">
                      E-mail :
                    </span>{" "}
                    hello@kree.tn
                  </li>
                  <li>
                    <span className="font-semibold text-[var(--kree-ink)]">
                      Horaires :
                    </span>{" "}
                    Lun–Sam, 9h–19h
                  </li>
                  <li>
                    <span className="font-semibold text-[var(--kree-ink)]">
                      Zone :
                    </span>{" "}
                    Toute la Tunisie
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
