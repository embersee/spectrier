"use client";

import { ItemCard } from "./item-card";
import { Products } from "@/types/products";
import { MainButton, useShowPopup } from "@vkruglikov/react-telegram-web-app";

import { useEffect } from "react";

type CatalogProps = {
  products: Products[];
};

export default function Catalog({ products }: CatalogProps) {
  const showPopup = useShowPopup();

  useEffect(() => {
    if (window == undefined) return;
    Telegram.WebApp.ready();
  }, []);

  return (
    <div>
      <div className="grid gap-2 grid-cols-3 grid-rows-3">
        {products.map((p, i) => (
          <ItemCard key={i} product={p} />
        ))}
      </div>
      <MainButton />
    </div>
  );
}
