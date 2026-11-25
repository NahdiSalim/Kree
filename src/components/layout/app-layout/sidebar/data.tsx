import {
  BoxIcon,
  CalendarIcon,
  LayoutGridIcon,
  ListIcon,
  UserCircleIcon,
} from "@/icons";
import type { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    icon: <LayoutGridIcon className="size-5" />,
    key: "dashboard",
    path: "/dashboard",
  },
  {
    icon: <BoxIcon className="size-5" />,
    key: "ownerMaisons",
    path: "/dashboard/maisons",
  },
  {
    icon: <ListIcon className="size-5" />,
    key: "ownerVehicules",
    path: "/dashboard/vehicules",
  },
  {
    icon: <CalendarIcon className="size-5" />,
    key: "ownerDemandes",
    path: "/dashboard/demandes",
  },
  {
    icon: <UserCircleIcon className="size-5" />,
    key: "ownerProfile",
    path: "/dashboard/profil",
  },
];

export const othersItems: NavItem[] = [];

export const supportItems: NavItem[] = [];
