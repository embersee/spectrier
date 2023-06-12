import { DataTable } from "@/components/table/data-table";
import { orderColumns } from "@/components/table/order-columns";
import { db } from "@/lib/db";
import {
  Order,
  Product,
  ProductsToOrders,
  User,
  order,
  product,
  productsToOrders,
  user,
} from "@/lib/db/schema";
import { orderProduct, storeProduct } from "@/types/products";
import { eq } from "drizzle-orm";

import Link from "next/link";

export default async function OrdersPage() {
  const orders = await db
    .select()
    .from(order)
    .leftJoin(productsToOrders, eq(order.id, productsToOrders.orderId))
    .leftJoin(product, eq(productsToOrders.productId, product.id))
    .leftJoin(user, eq(order.userId, user.id));

  const result = orders.reduce<
    Record<
      number,
      {
        order: Order;
        product: orderProduct[];
        user: User;
        productsToOrders: ProductsToOrders;
      }
    >
  >((acc, row) => {
    const order = row.order;
    const product = row.product;
    const user = row.user as User;
    const productsToOrders = row.productsToOrders as ProductsToOrders;

    if (!acc[order.id]) {
      acc[order.id] = { order, product: [], user, productsToOrders };
    }

    if (product) {
      acc[order.id].product.push({
        ...product,
        quantity: productsToOrders.quantity as number,
      });
    }

    return acc;
  }, {});

  const res = Object.entries(result).map(([key, value], i) => value);

  return (
    <>
      <div className="flex space-x-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Заказы
        </h1>
        {/* <Link href={"/dashboard/products/create-product"}>
          <Button variant="secondary">Создать</Button>
        </Link> */}
      </div>

      <DataTable columns={orderColumns} data={res} />
    </>
  );
}

export const revalidate = 0;
