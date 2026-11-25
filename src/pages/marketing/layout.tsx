import type { ReactNode } from "react";
import Footer from "./home/components/footer";
import Navbar from "./home/components/navbar";

export default function MarketingLayout({
  children,
  solidNav = true,
}: {
  children: ReactNode;
  solidNav?: boolean;
}) {
  return (
    <div className="kree-home flex min-h-screen flex-col bg-white text-[var(--kree-ink)]">
      <Navbar solid={solidNav} />
      <main className="flex-1 pt-[4.5rem]">{children}</main>
      <Footer />
    </div>
  );
}
