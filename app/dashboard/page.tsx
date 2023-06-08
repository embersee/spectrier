"use server";

import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Products } from "@/types/products";
import Link from "next/link";

export default async function DashboardPage() {
  const products = (await db.query.product.findMany({
    with: {
      category: true,
    },
  })) as Products[];

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex space-x-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dashboard
        </h1>
        <Link href={"/dashboard/create-product"}>
          <Button variant="secondary">Создать</Button>
        </Link>
      </div>

      <DataTable columns={columns} data={products} />
    </section>
  );
}
