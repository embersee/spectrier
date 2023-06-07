export default function DashboardLayout({
  children,
  modal,
}: DashboardLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export const revalidate = 60; // revalidate this page every 60 seconds
