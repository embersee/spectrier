"use client";

import { useCartStore } from "@/lib/store";
import { useRef } from "react";

export function StoreInitializer() {
  const initialized = useRef(false);

  if (!initialized.current) {
    useCartStore.setState({ cart: [], totalItems: 0, totalPrice: 0 });
    initialized.current = true;
  }

  return null;
}
