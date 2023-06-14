"use client";

import { SessionProvider } from "next-auth/react";

export default function Provider({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

type ProviderProps = {
  children: React.ReactNode;
};
