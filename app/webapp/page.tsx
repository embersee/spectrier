import { ItemCard } from "@/components/item-card";
import { SelectCategory } from "@/components/select-category";
import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";

export default async function WebAppPage() {
  const products = await db.query.product.findMany({
    with: {
      category: true,
    },
  });

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Shop
      </h1>
      <SelectCategory />
      <div className="grid gap-2 grid-cols-3 grid-rows-3">
        {products.map((p, i) => (
          <ItemCard product={p} />
        ))}
      </div>
    </section>
  );
}
