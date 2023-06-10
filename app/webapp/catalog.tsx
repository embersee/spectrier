"use client";

import { ItemCard } from "./item-card";
import { Products } from "@/types/products";

import { useEffect, useState } from "react";
import { SelectCategory } from "./select-category";
import { Category } from "@/lib/db/schema";

type CatalogProps = {
  products: Products[];
  categories: Category[];
};

export default function Catalog({ products, categories }: CatalogProps) {
  const [selected, setSelected] = useState("");

  let filteredProducts = products;

  useEffect(() => {
    if (window == undefined) return;
    Telegram.WebApp.ready();

    //hide the back button whenever youre in the catalog
    Telegram.WebApp.BackButton.hide();
  }, []);

  if (selected) {
    filteredProducts = products.filter((p) => p.category.name == selected);
  }

  return (
    <div className="space-y-2">
      <p>
        Viewing {filteredProducts.length} out of {products.length}
      </p>
      <SelectCategory categories={categories} setSelected={setSelected} />
      <div className="grid gap-2 grid-cols-2">
        {filteredProducts.map((p, i) => (
          <ItemCard key={i} product={p} />
        ))}
      </div>
    </div>
  );
}
