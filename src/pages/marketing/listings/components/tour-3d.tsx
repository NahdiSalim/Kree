export default function Tour3DModal({
  open,
  onClose,
  title,
  tourUrl,
  fallbackImage,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  tourUrl?: string;
  fallbackImage: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-[var(--kree-ink)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
        <div>
          <p className="text-xs font-bold tracking-wide text-[var(--kree-orange)] uppercase">
            Visite 3D immersive
          </p>
          <h2 className="font-display text-lg font-bold text-white sm:text-xl">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
        >
          Quitter la visite
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        {tourUrl ? (
          <iframe
            title={`Visite 3D — ${title}`}
            src={tourUrl}
            className="h-full w-full border-0"
            allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="relative flex h-full items-center justify-center overflow-hidden">
            <img
              src={fallbackImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-40 blur-sm"
            />
            <div className="relative z-10 max-w-md rounded-[1.6rem] bg-white/10 p-8 text-center text-white ring-1 ring-white/20 backdrop-blur-xl">
              <p className="font-display text-2xl font-bold">Visite 3D bientôt disponible</p>
              <p className="mt-3 text-sm text-white/75">
                Le propriétaire n’a pas encore ajouté de visite Matterport. Explorez la galerie photo
                en attendant.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-2xl bg-[var(--kree-orange)] px-5 py-3 text-sm font-semibold text-white"
              >
                Retour aux photos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
