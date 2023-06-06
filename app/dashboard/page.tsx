import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

export default async function DashboardPage() {
  const products = await db.query.product.findMany({
    with: {
      category: true,
    },
  });
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex space-x-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dashboard
        </h1>
        <Sheet>
          <SheetTrigger>
            <Button variant="secondary">Добавить</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Добавить новый товар в магазин</SheetTitle>
              <SheetDescription>Описание действия</SheetDescription>
            </SheetHeader>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Добавить</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <DataTable columns={columns} data={products} />
    </section>
  );
}
