"use client";

import { useCartStore } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useShowPopup } from "@vkruglikov/react-telegram-web-app";

export function CartViewKZ() {
  const router = useRouter();
  const showPopup = useShowPopup();

  const totalItems = useCartStore((state) => state.totalItems);

  useEffect(() => {
    if (window == undefined) return;
    if (totalItems > 0) {
      Telegram.WebApp.MainButton.setText("Сатып алу");
      Telegram.WebApp.MainButton.onClick(() => router.push("/kz/webapp/cart"));
      Telegram.WebApp.MainButton.show();
    } else {
      Telegram.WebApp.MainButton.hide();
    }
  }, [totalItems, router]);

  const clickCart = () => {
    if (!totalItems) {
      showPopup({
        title: "Oops! 😭",
        message: "Себет бос!",
        buttons: [{ type: "ok" }],
      });
      return;
    }
    router.push("/kz/webapp/cart");
  };

  return (
    <Button className=" space-x-2" onClick={clickCart}>
      <ShoppingCartIcon />
      {totalItems != 0 && <p className=" text-lg">{totalItems}</p>}
    </Button>
  );
}
