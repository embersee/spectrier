import "@/styles/globals.css";
import { Metadata } from "next";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const revalidate = 60; // revalidate this page every 60 seconds

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function WebAppLayout({ children, cart }: WebAppLayoutProps) {
  return (
    <>
      {children}
      {cart}
    </>
  );
}

interface WebAppLayoutProps {
  children: React.ReactNode;
  cart: React.ReactNode;
}
