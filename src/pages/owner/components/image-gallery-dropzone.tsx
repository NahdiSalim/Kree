import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon, TrashBinIcon } from "@/icons";

export interface GalleryImage {
  id: string;
  dataUrl: string;
  name: string;
}

interface ImageGalleryDropzoneProps {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
  maxFiles?: number;
  maxSizeMb?: number;
  accent?: "blue" | "orange";
  error?: string;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function ImageGalleryDropzone({
  images,
  onChange,
  maxFiles = 10,
  maxSizeMb = 3,
  accent = "blue",
  error,
}: ImageGalleryDropzoneProps) {
  const inputId = useId();
  const [localError, setLocalError] = useState("");
  const [busy, setBusy] = useState(false);
  const imagesRef = useRef(images);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  const isOrange = accent === "orange";
  const remaining = Math.max(0, maxFiles - images.length);

  const addFiles = useCallback(
    async (files: File[]) => {
      setLocalError("");
      if (!files.length) return;

      const room = Math.max(0, maxFiles - imagesRef.current.length);
      if (room <= 0) {
        setLocalError(`Maximum ${maxFiles} images.`);
        return;
      }

      const slice = files.slice(0, room);
      const tooBig = slice.find((f) => f.size > maxSizeMb * 1024 * 1024);
      if (tooBig) {
        setLocalError(`Chaque image doit faire moins de ${maxSizeMb} Mo.`);
        return;
      }

      setBusy(true);
      try {
        const next: GalleryImage[] = [];
        for (const file of slice) {
          if (!file.type.startsWith("image/")) continue;
          const dataUrl = await readAsDataUrl(file);
          next.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            dataUrl,
            name: file.name,
          });
        }
        if (next.length) onChange([...imagesRef.current, ...next]);
        if (files.length > room) {
          setLocalError(`Seules ${room} image(s) ont été ajoutées (max ${maxFiles}).`);
        }
      } catch {
        setLocalError("Impossible de lire une des images.");
      } finally {
        setBusy(false);
      }
    },
    [maxFiles, maxSizeMb, onChange],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (accepted) => {
      void addFiles(accepted);
    },
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    maxSize: maxSizeMb * 1024 * 1024,
    multiple: true,
    disabled: busy || remaining === 0,
  });

  const removeAt = (id: string) => {
    onChange(images.filter((img) => img.id !== id));
    setLocalError("");
  };

  const clearAll = () => {
    onChange([]);
    setLocalError("");
  };

  const dropTone = isDragReject
    ? "border-red-400 bg-red-50"
    : isDragAccept || isDragActive
      ? isOrange
        ? "border-[var(--kree-orange)] bg-orange-50/80"
        : "border-[var(--kree-blue)] bg-[var(--kree-blue-soft)]"
      : isOrange
        ? "border-[var(--kree-orange)]/35 bg-gradient-to-b from-orange-50/80 to-white hover:border-[var(--kree-orange)]"
        : "border-[var(--kree-blue)]/30 bg-gradient-to-b from-[var(--kree-blue-soft)] to-white hover:border-[var(--kree-blue)]";

  const showError = error || localError;

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`relative cursor-pointer overflow-hidden rounded-[1.4rem] border-2 border-dashed px-5 py-10 text-center outline-none transition ${dropTone} ${
          remaining === 0 ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        <input {...getInputProps()} id={inputId} />
        <div
          className={`pointer-events-none absolute -top-10 -right-10 size-32 rounded-full blur-2xl ${
            isOrange ? "bg-[var(--kree-orange)]/20" : "bg-[var(--kree-blue)]/15"
          }`}
        />
        <div className="relative flex flex-col items-center">
          <div
            className={`mb-4 flex size-16 items-center justify-center rounded-full shadow-inner ${
              isOrange
                ? "bg-[var(--kree-orange)] text-white shadow-[var(--kree-orange)]/25"
                : "bg-[var(--kree-blue)] text-white shadow-[var(--kree-blue)]/25"
            }`}
          >
            <UploadIcon className="size-7 text-current" />
          </div>
          <h4 className="font-display text-xl font-bold text-[var(--kree-ink)]">
            {isDragReject
              ? "Format non supporté"
              : isDragActive
                ? "Déposez vos images ici"
                : "Importer vos photos"}
          </h4>
          <p className="mt-2 max-w-sm text-sm text-[var(--kree-muted)]">
            Glissez-déposez plusieurs images (JPG, PNG, WebP) ou cliquez pour
            parcourir. Jusqu’à {maxFiles} photos · {maxSizeMb} Mo max / image.
          </p>
          <span
            className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white ${
              isOrange ? "bg-[var(--kree-orange)]" : "bg-[var(--kree-blue)]"
            }`}
          >
            {busy ? "Import…" : remaining === 0 ? "Limite atteinte" : "Parcourir"}
          </span>
          {images.length > 0 && (
            <p className="mt-3 text-xs font-medium text-[var(--kree-muted)]">
              {images.length} / {maxFiles} · encore {remaining} possible
              {remaining > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {showError && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
          {showError}
        </p>
      )}

      {images.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[var(--kree-ink)]">
              Photos ({images.length})
              <span className="ms-2 text-xs font-medium text-[var(--kree-muted)]">
                La 1ʳᵉ est la couverture
              </span>
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-red-500 hover:underline"
            >
              Tout supprimer
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img, index) => (
              <li
                key={img.id}
                className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--kree-blue)]/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--kree-blue-soft)]">
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  {index === 0 && (
                    <span
                      className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${
                        isOrange
                          ? "bg-[var(--kree-orange)]"
                          : "bg-[var(--kree-blue)]"
                      }`}
                    >
                      Couverture
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeAt(img.id)}
                    className="absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-full bg-white/95 text-red-500 opacity-0 shadow transition group-hover:opacity-100"
                    aria-label="Supprimer"
                  >
                    <TrashBinIcon className="size-4" />
                  </button>
                </div>
                <p className="truncate px-2.5 py-2 text-[11px] text-[var(--kree-muted)]">
                  {img.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
