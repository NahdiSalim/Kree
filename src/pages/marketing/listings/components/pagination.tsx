export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex h-10 items-center rounded-full border border-[var(--kree-blue)]/15 px-4 text-sm font-semibold text-[var(--kree-blue)] transition hover:bg-[var(--kree-blue-soft)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Précédent
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold transition ${
            p === page
              ? "bg-[var(--kree-blue)] text-white shadow-md shadow-[var(--kree-blue)]/25"
              : "border border-[var(--kree-blue)]/15 text-[var(--kree-ink)] hover:bg-[var(--kree-blue-soft)]"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="inline-flex h-10 items-center rounded-full border border-[var(--kree-blue)]/15 px-4 text-sm font-semibold text-[var(--kree-blue)] transition hover:bg-[var(--kree-blue-soft)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Suivant
      </button>
    </nav>
  );
}

export const LIST_PAGE_SIZE = 12;
