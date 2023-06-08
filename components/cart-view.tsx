"use client";
import { useCartStore } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function CartView() {
  const router = useRouter();

  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);

  useEffect(() => {
    if (window == undefined) return;
    if (totalItems > 0) {
      Telegram.WebApp.MainButton.setText("View Cart");
      Telegram.WebApp.MainButton.onClick(() => router.push("/cart"));
      Telegram.WebApp.MainButton.show();
    }
  }, [totalItems]);

  return (
    <div>
      <h1>In cart: {totalItems}</h1>
      <h1>Total: {totalPrice}</h1>
    </div>
  );
}
