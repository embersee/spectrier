"use server";

import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { NewProduct } from "@/lib/db/schema";
import { productForm } from "@/components/table/schema";
import { eq } from "drizzle-orm";

export async function onSubmitProduct(data: productForm) {
  "use server";

  const NewProduct: NewProduct = {
    name: data.name,
    description: data.description,
    price: data.price,
    discount: data.discount,
    stock: data.stock,
    image: data.image,
    createdAt: new Date().toString(),
  };

  const insertProduct = async (p: NewProduct) => {
    return db
      .insert(product)
      .values(p)
      .then(() => revalidatePath("/dashboard"));
  };

  await insertProduct(NewProduct);
}

export async function deleteProduct(id: number) {
  "use server";

  const deleteItem = async (id: number) => {
    return db
      .delete(product)
      .where(eq(product.id, id))
      .then(() => revalidatePath("/dashboard"));
  };

  await deleteItem(id);
}
