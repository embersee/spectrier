"use server";

import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { NewProduct } from "@/lib/db/schema";
import { ProductFormValues, productForm } from "@/components/table/schema";
import { eq } from "drizzle-orm";

export async function onSubmitProduct(data: productForm) {
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
    return db.insert(product).values(p);
  };

  await insertProduct(NewProduct).then(() => revalidatePath("/dashboard"));
}

export async function deleteProduct(id: number) {
  const deleteItem = async (id: number) => {
    return db.delete(product).where(eq(product.id, id));
  };

  await deleteItem(id).then(() => revalidatePath("/dashboard"));
}

export async function getProduct(id: number) {
  const getItem = async (id: number) => {
    const query = await db
      .select()
      .from(product)
      .where(eq(product.id, id))
      .limit(1);
    return query;
  };

  const res = await getItem(id);

  return res[0];
}

export async function updateProduct(data: ProductFormValues) {
  const Product: NewProduct = {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    discount: data.discount,
    stock: data.stock,
    image: data.image,
    updatedAt: new Date().toString(),
  };

  const updateProduct = async (id: number, data: productForm) => {
    await db
      .update(product)
      .set(data)
      .where(eq(product.id, id))
      .then(() => revalidatePath("/dashboard"));
  };

  await updateProduct(data.id, Product);
}
