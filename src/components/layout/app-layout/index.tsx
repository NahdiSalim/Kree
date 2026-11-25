import AppHeader from "@/components/layout/app-layout/header";
import AppSidebar from "@/components/layout/app-layout/sidebar";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

export default function AppLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="kree-owner min-h-svh">
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="bg-[linear-gradient(180deg,#f3f9fb_0%,#ffffff_40%)]">
          <AppHeader />
          <div className="mx-auto w-full max-w-(--breakpoint-2xl) p-4 md:p-6 lg:p-8">
            {children ?? <Outlet />}
          </div>
        </SidebarInset>
        <ScrollToTop />
      </SidebarProvider>
    </div>
  );
}
