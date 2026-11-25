import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { MenuTwoIcon, XIcon } from "@/icons";
import { Link } from "react-router";
import OwnerProfileDropdown from "./owner-profile-dropdown";

export default function AppHeader() {
  const { openMobile, toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 flex w-full shrink-0 border-b border-[var(--kree-blue)]/10 bg-white/90 backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-3 px-3 py-3 sm:px-6 xl:py-3.5">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-xl border-[var(--kree-blue)]/15 text-[var(--kree-blue)] hover:bg-[var(--kree-blue-soft)]"
            onClick={toggleSidebar}
            aria-label="Menu"
          >
            {openMobile ? (
              <XIcon className="size-5" />
            ) : (
              <MenuTwoIcon className="size-auto! rtl:-scale-x-100" />
            )}
          </Button>

          <Link
            to="/dashboard"
            className="inline-flex items-center xl:hidden"
            aria-label="TunisRent — tableau de bord"
          >
            <BrandLogo className="h-14" />
          </Link>

          <div className="hidden md:block">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--kree-orange)] uppercase">
              Espace propriétaire
            </p>
            <p className="text-sm text-[var(--kree-muted)]">
              Maisons · Véhicules · Demandes
            </p>
          </div>
        </div>

        <OwnerProfileDropdown />
      </div>
    </header>
  );
}
