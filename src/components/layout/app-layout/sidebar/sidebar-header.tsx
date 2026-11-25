import { BrandLogo } from "@/components/shared/brand-logo";
import { SidebarHeader } from "@/components/ui/sidebar";
import { cn } from "@/utils";
import { Link } from "react-router";

interface AppSidebarHeaderProps {
  showContent: boolean;
}

export default function AppSidebarHeader({
  showContent,
}: AppSidebarHeaderProps) {
  return (
    <SidebarHeader className="px-4 pt-5 pb-6">
      <Link
        to="/"
        className={cn(
          "flex items-center gap-3",
          !showContent ? "justify-center" : "justify-start",
        )}
        aria-label="TunisRent — accueil"
      >
        {showContent ? (
          <span className="min-w-0">
            <BrandLogo onDark className="h-14 max-w-[17rem]" />
            <span className="mt-1.5 block text-[11px] font-medium text-white/65">
              Tableau de bord
            </span>
          </span>
        ) : (
          <BrandLogo markOnly />
        )}
      </Link>
    </SidebarHeader>
  );
}
