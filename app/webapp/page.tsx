import { CartView } from "@/app/webapp/cart-view";
import Catalog from "@/app/webapp/catalog";
import { SelectCategory } from "@/components/select-category";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Products } from "@/types/products";
import Link from "next/link";

export default async function WebAppPage() {
  const products = (await db.query.product.findMany({
    with: {
      category: true,
    },
  })) as Products[];

  return (
    <section className="m-2 grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex space-x-4 justify-between">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Shop
        </h1>

        <CartView />
      </div>
      <SelectCategory />
      <Catalog products={products} />
    </section>
  );
}
