import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useTranslations } from "@/i18n";
import { HorizontalDotsIcon } from "@/icons";
import { cn } from "@/utils";
import SidebarMenuItem from "./sidebar-menu-item";
import type { MenuType, NavItem } from "./types";

interface SidebarNavGroupProps {
  labelKey: string;
  menuType: MenuType;
  items: NavItem[];
  openSubmenu: { type: MenuType; index: number } | null;
  showContent: boolean;
  pathname: string;
  onToggleSubmenu: (index: number, menuType: MenuType) => void;
}

export default function SidebarNavGroup({
  labelKey,
  menuType,
  items,
  openSubmenu,
  showContent,
  pathname,
  onToggleSubmenu,
}: SidebarNavGroupProps) {
  const t = useTranslations("sidebar");

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel
        className={cn(
          "mb-3 flex h-auto p-0 text-[11px] font-bold tracking-[0.14em] text-white/45 uppercase",
          !showContent ? "xl:justify-center" : "justify-start",
        )}
      >
        {showContent ? t(labelKey) : <HorizontalDotsIcon className="text-white/45" />}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1.5">
        {items.map((nav, index) => (
          <SidebarMenuItem
            key={nav.key}
            nav={nav}
            isOpen={
              openSubmenu?.type === menuType && openSubmenu?.index === index
            }
            showContent={showContent}
            pathname={pathname}
            onToggle={() => onToggleSubmenu(index, menuType)}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
