import { productColumns } from "@/components/table/product-columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Products } from "@/types/products";
import Link from "next/link";

export default async function ProductsPage() {
  const products = (await db.query.product.findMany({
    with: {
      category: true,
    },
  })) as Products[];

  return (
    <>
      <div className="flex space-x-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Продукты
        </h1>
        <Link href={"/dashboard/products/create-product"}>
          <Button variant="secondary">Создать</Button>
        </Link>
      </div>

      <DataTable columns={productColumns} data={products} />
    </>
  );
}

export const revalidate = 0;
