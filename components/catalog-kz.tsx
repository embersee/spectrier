"use client";

import { Products } from "@/types/products";

import { useEffect, useState } from "react";
import { Category } from "@/lib/db/schema";
import { SelectCategoryKZ } from "./select-category-kz";
import { ItemCardKZ } from "./item-card-kz";

type CatalogProps = {
  products: Products[];
  categories: Category[];
};

export default function CatalogKZ({ products, categories }: CatalogProps) {
  const [selected, setSelected] = useState("");

  let filteredProducts = products;

  useEffect(() => {
    if (window == undefined) return;
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();

    //hide the back button whenever youre in the catalog
    Telegram.WebApp.BackButton.hide();
  }, []);

  if (selected) {
    filteredProducts = products.filter((p) => p.category.name == selected);
  }

  return (
    <div className="space-y-2">
      <p>
        {filteredProducts.length} өнімнің {products.length} табылды
      </p>
      <SelectCategoryKZ categories={categories} setSelected={setSelected} />
      <div className="grid gap-2 grid-cols-2">
        {filteredProducts.map((p, i) => (
          <ItemCardKZ key={i} product={p} />
        ))}
      </div>
    </div>
  );
}
