export const revalidate = 60; // revalidate this page every 60 seconds

export default function ProductsLayout({
  children,
  modal,
}: ProductsLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

interface ProductsLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}
