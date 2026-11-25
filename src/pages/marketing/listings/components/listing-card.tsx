import { Link } from "react-router";
import type { HouseListing, VehicleListing } from "../data";

export function HouseCard({ listing }: { listing: HouseListing }) {
  return (
    <Link
      to={`/maisons/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-[var(--kree-blue)]/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(12,110,154,0.14)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {listing.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-[var(--kree-orange)] px-2.5 py-1 text-[11px] font-bold text-white">
            {listing.badge}
          </span>
        )}
        {listing.tour3dUrl && (
          <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[var(--kree-blue)]">
            Visite 3D
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          ★ {listing.rating.toFixed(1)}
          <span className="font-normal text-white/70">({listing.reviewsCount})</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold tracking-wide text-[var(--kree-orange)] uppercase">
          {listing.city} · {listing.category}
        </p>
        <h3 className="mt-1 line-clamp-1 font-display text-lg font-bold text-[var(--kree-ink)]">
          {listing.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--kree-muted)]">
          {listing.specs.bedrooms > 0 ? `${listing.specs.bedrooms} ch.` : "Studio"} ·{" "}
          {listing.specs.bathrooms} sdb · {listing.specs.area} m²
        </p>
        <p className="mt-auto pt-3 text-[var(--kree-blue)]">
          <span className="font-display text-xl font-bold">{listing.price}</span>
          <span className="text-sm font-medium"> TND / {listing.unit}</span>
        </p>
      </div>
    </Link>
  );
}

export function VehicleCard({ listing }: { listing: VehicleListing }) {
  return (
    <Link
      to={`/vehicules/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-[var(--kree-blue)]/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(12,110,154,0.14)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {listing.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-[var(--kree-orange)] px-2.5 py-1 text-[11px] font-bold text-white">
            {listing.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          ★ {listing.rating.toFixed(1)}
          <span className="font-normal text-white/70">({listing.reviewsCount})</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold tracking-wide text-[var(--kree-orange)] uppercase">
          {listing.city} · {listing.category}
        </p>
        <h3 className="mt-1 line-clamp-1 font-display text-lg font-bold text-[var(--kree-ink)]">
          {listing.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--kree-muted)]">
          {listing.specs.year} · {listing.specs.transmission} · {listing.specs.fuel}
        </p>
        <p className="mt-auto pt-3 text-[var(--kree-blue)]">
          <span className="font-display text-xl font-bold">{listing.price}</span>
          <span className="text-sm font-medium"> TND / {listing.unit}</span>
        </p>
      </div>
    </Link>
  );
}
