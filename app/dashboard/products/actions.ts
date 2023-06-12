"use server";

import { db } from "@/lib/db";
import { category, product } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { NewProduct } from "@/lib/db/schema";
import { ProductForm, ProductFormUpdate } from "@/types/form-schema";
import { eq } from "drizzle-orm";

export async function onSubmitProduct(data: ProductForm) {
  const NewProduct: NewProduct = {
    name: data.name,
    description: data.description,
    categoryID: Number(data.category),
    price: data.price,
    discount: data.discount,
    stock: data.stock,
    image: data.image,
    createdAt: new Date().toString(),
  };

  const insertProduct = async (p: NewProduct) => {
    return db.insert(product).values(p);
  };

  await insertProduct(NewProduct).then(() =>
    revalidatePath("/dashboard/products")
  );
}

export async function deleteProduct(id: number) {
  const deleteItem = async (id: number) => {
    return db.delete(product).where(eq(product.id, id));
  };

  await deleteItem(id).then(() => revalidatePath("/dashboard/products"));
}

export async function getProduct(id: number) {
  const getItem = async (id: number) => {
    const query = await db.query.product.findFirst({
      where: eq(product.id, id),
      with: {
        category: true,
      },
    });
    return query;
  };

  const res = await getItem(id);

  return res;
}

export async function getCategories() {
  return await db.select().from(category);
}

export async function updateProduct(data: ProductFormUpdate) {
  const Product: NewProduct = {
    id: data.id,
    name: data.name,
    description: data.description,
    categoryID: Number(data.category),
    price: data.price,
    discount: data.discount,
    stock: data.stock,
    image: data.image,
    updatedAt: new Date().toString(),
  };

  const updateProduct = async (id: number, data: NewProduct) => {
    await db
      .update(product)
      .set(data)
      .where(eq(product.id, id))
      .then(() => revalidatePath("/dashboard/products"));
  };

  await updateProduct(data.id, Product);
}
