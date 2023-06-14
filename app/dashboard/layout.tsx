import { SiteHeader } from "@/components/site-header";

import Navigation from "./nav";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardLayout({
  children,
  modal,
}: DashboardLayoutProps) {
  const session = await getServerSession(OPTIONS);

  const adminIds = process.env.ADMIN_ID as string;

  if (!adminIds.includes(session?.user?.id as string)) {
    redirect("/");
  }

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
