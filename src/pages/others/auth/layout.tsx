import { Outlet } from "react-router";
import BrandPanel from "./brand-panel";

export default function AuthLayout() {
  return (
    <div className="kree-home kree-auth min-h-screen bg-white text-[var(--kree-ink)]">
      <div className="flex min-h-screen">
        <BrandPanel />
        <main className="relative flex min-h-screen w-full flex-1 flex-col overflow-y-auto">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(12,110,154,0.08),transparent_40%),radial-gradient(circle_at_10%_100%,rgba(255,179,71,0.08),transparent_35%)]" />
          <div className="relative z-10 flex flex-1 flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
