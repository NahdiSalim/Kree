import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuItem as UiSidebarMenuItem } from "@/components/ui/sidebar";
import { useTranslations } from "@/i18n";
import { ChevronDownIcon } from "@/icons";
import { usePendingReservationCount } from "@/lib/reservations";
import { cn } from "@/utils";
import { Link } from "react-router";
import SidebarSubmenuItem from "./sidebar-submenu-item";
import type { NavItem } from "./types";

interface SidebarMenuItemProps {
  nav: NavItem;
  isOpen: boolean;
  showContent: boolean;
  pathname: string;
  onToggle: () => void;
}

export default function SidebarMenuItem({
  nav,
  isOpen,
  showContent,
  pathname,
  onToggle,
}: SidebarMenuItemProps) {
  const t = useTranslations("sidebar");
  const pendingCount = usePendingReservationCount();

  const hasSubItems = Boolean(nav.subItems?.length);
  const hasActiveChild = Boolean(
    nav.subItems?.some((subItem) => subItem.path === pathname),
  );
  const isDirectActive = Boolean(nav.path && nav.path === pathname);
  const isItemActive = hasSubItems ? isOpen || hasActiveChild : isDirectActive;
  const isPanelOpen = showContent && isOpen;
  const showNotif = nav.key === "ownerDemandes" && pendingCount > 0;

  const itemClass = cn(
    "group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition",
    isItemActive
      ? "bg-white text-[var(--kree-blue)] shadow-lg shadow-black/10"
      : "text-white/80 hover:bg-white/10 hover:text-white",
    !showContent && "lg:justify-center",
  );

  const notifBadge = showNotif ? (
    <span
      className={cn(
        "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold",
        isItemActive
          ? "bg-[var(--kree-orange)] text-white"
          : "bg-[var(--kree-orange)] text-white shadow-sm",
        showContent ? "ms-auto" : "absolute -top-1 -end-1",
      )}
    >
      {pendingCount > 9 ? "9+" : pendingCount}
    </span>
  ) : null;

  return (
    <UiSidebarMenuItem>
      {hasSubItems ? (
        <Collapsible open={isPanelOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger className={cn(itemClass, "cursor-pointer")}>
            <span className="shrink-0">{nav.icon}</span>
            {showContent && (
              <span className="truncate">{t(`items.${nav.key}`)}</span>
            )}
            {showContent && (
              <ChevronDownIcon
                className={cn(
                  "ms-auto size-4 transition-transform duration-200",
                  isOpen ? "rotate-180" : "",
                )}
              />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="ms-9 mt-2 space-y-1">
              {nav.subItems?.map((subItem) => (
                <SidebarSubmenuItem
                  key={subItem.key}
                  subItem={subItem}
                  isActive={subItem.path === pathname}
                />
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        nav.path && (
          <Link to={nav.path} target={nav.target} className={itemClass}>
            <span className="relative shrink-0">
              {nav.icon}
              {!showContent && notifBadge}
            </span>
            {showContent && (
              <span className="truncate">{t(`items.${nav.key}`)}</span>
            )}
            {showContent && showNotif && notifBadge}
            {isItemActive && showContent && !showNotif && (
              <span className="ms-auto size-2 rounded-full bg-[var(--kree-orange)]" />
            )}
          </Link>
        )
      )}
    </UiSidebarMenuItem>
  );
}
