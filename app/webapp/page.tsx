import { CartView } from "@/app/webapp/cart-view";
import Catalog from "@/app/webapp/catalog";
import { db } from "@/lib/db";
import { Products } from "@/types/products";
import { getCategories } from "./actions";

export default async function WebAppPage() {
  const products = (await db.query.product.findMany({
    with: {
      category: true,
    },
  })) as Products[];

  const categories = await getCategories();

  return (
    <section className="m-2 grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex space-x-4 justify-between">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Shop
        </h1>

        <CartView />
      </div>
      <Catalog products={products} categories={categories} />
    </section>
  );
}
