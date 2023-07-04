import { CartView } from "@/components/cart-view";
import { db } from "@/lib/db";
import { Products } from "@/types/products";
import { getCategories } from "./actions";
import CatalogKZ from "@/components/catalog-kz";

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
          Каталог
        </h1>

        <CartView />
      </div>
      <CatalogKZ products={products} categories={categories} />
    </section>
  );
}
