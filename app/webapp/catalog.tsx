"use client";

import { ItemCard } from "./item-card";
import { Products } from "@/types/products";

import { useEffect } from "react";

type CatalogProps = {
  products: Products[];
};

export default function Catalog({ products }: CatalogProps) {
  useEffect(() => {
    if (window == undefined) return;
    Telegram.WebApp.ready();

    //hide the back button whenever youre in the catalog
    Telegram.WebApp.BackButton.hide();
  }, []);

  return (
    <div>
      <div className="grid gap-2 grid-cols-2">
        {products.map((p, i) => (
          <ItemCard key={i} product={p} />
        ))}
      </div>
    </div>
  );
}
