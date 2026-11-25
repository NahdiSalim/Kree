import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { clearOwnerSession, useOwnerSession } from "@/lib/owner-auth";
import { getInitials } from "@/utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function OwnerProfileDropdown() {
  const owner = useOwnerSession();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!owner) return null;

  const initials = getInitials(owner.name);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="inline-flex items-center gap-2.5 rounded-2xl py-1.5 ps-1.5 pe-2.5 outline-none transition hover:bg-[#e8f4f8] focus-visible:ring-2 focus-visible:ring-[#0c6e9a]/30">
        <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0c6e9a] text-sm font-bold text-white shadow-md shadow-[#0c6e9a]/20 ring-2 ring-white">
          {owner.avatar ? (
            <img src={owner.avatar} alt="" className="size-full object-cover" />
          ) : (
            initials
          )}
          <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-[#ffb347] ring-2 ring-white" />
        </span>
        <span className="hidden min-w-0 text-start sm:block">
          <span className="block truncate text-sm font-semibold text-[#123041]">
            {owner.name}
          </span>
          <span className="block truncate text-xs text-[#5f7380]">
            Propriétaire
          </span>
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5f7380"
          strokeWidth="2.4"
          className={`hidden transition sm:block ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 gap-0 overflow-hidden rounded-2xl border border-[#0c6e9a]/10 bg-white p-0 shadow-[0_20px_50px_rgba(12,110,154,0.16)]"
      >
        <div className="border-b border-[#0c6e9a]/10 bg-[#e8f4f8] px-4 py-3.5">
          <p className="truncate text-sm font-bold text-[#123041]">
            {owner.name}
          </p>
          <p className="mt-0.5 truncate text-xs text-[#5f7380]">{owner.email}</p>
        </div>

        <div className="p-2">
          <Link
            to="/dashboard/profil"
            onClick={() => setOpen(false)}
            className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-semibold text-[#123041] transition hover:bg-[#e8f4f8] hover:text-[#0c6e9a]"
          >
            Mon profil
          </Link>

          <DropdownMenuSeparator className="my-1.5 bg-[#0c6e9a]/10" />

          <button
            type="button"
            className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            onClick={() => {
              clearOwnerSession();
              setOpen(false);
              navigate("/signin");
            }}
          >
            Déconnexion
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
