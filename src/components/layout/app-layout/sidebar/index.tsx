import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import { useLocation } from "react-router";
import { navItems } from "./data";
import AppSidebarHeader from "./sidebar-header";
import SidebarNavGroup from "./sidebar-nav-group";
import type { MenuType } from "./types";

const menuSections = [
  { type: "main" as MenuType, labelKey: "groups.menu", items: navItems },
];

const findMatchingSubmenu = (path: string) => {
  for (const section of menuSections) {
    for (let index = 0; index < section.items.length; index++) {
      const nav = section.items[index];
      if (nav.subItems?.some((subItem) => subItem.path === path)) {
        return { type: section.type, index };
      }
    }
  }
  return null;
};

export default function AppSidebar() {
  const { open, isMobile, isHovered } = useSidebar();
  const { pathname } = useLocation();

  const showContent = open || isHovered || isMobile;

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: MenuType;
    index: number;
  } | null>(() => findMatchingSubmenu(pathname));

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenSubmenu(findMatchingSubmenu(pathname));
  }

  const handleSubmenuToggle = (index: number, menuType: MenuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <Sidebar
      side="left"
      collapsible="icon"
      className="kree-owner-sidebar border-e border-[var(--kree-blue)]/10 bg-[linear-gradient(180deg,#0c6e9a_0%,#084d6b_100%)] text-white"
    >
      <AppSidebarHeader showContent={showContent} />

      <SidebarContent className="overflow-y-auto px-4 duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {menuSections.map((section) => (
              <SidebarNavGroup
                key={section.type}
                labelKey={section.labelKey}
                menuType={section.type}
                items={section.items}
                openSubmenu={openSubmenu}
                showContent={showContent}
                pathname={pathname}
                onToggleSubmenu={handleSubmenuToggle}
              />
            ))}
          </div>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
