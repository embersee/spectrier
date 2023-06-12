import { SiteHeader } from "@/components/site-header";

import Navigation from "./nav";

export const revalidate = 60; // revalidate this page every 60 seconds

export default function DashboardLayout({
  children,
  modal,
}: DashboardLayoutProps) {
  return (
    <>
      <SiteHeader />

      <div className="flex-1">
        <div className="container grid items-center gap-6 ">
          <Navigation />
          {modal}
          {children}
        </div>
      </div>
    </>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}
