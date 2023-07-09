"use server";

import { db } from "@/lib/db";
import { NewProduct, category, product } from "@/lib/db/schema";
import { ProductForm, ProductFormUpdate } from "@/types/form-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface ProductInput extends ProductForm {
  imageOne: string | undefined;
  imageTwo: string | undefined;
  imageThree: string | undefined;
  imageFour: string | undefined;
  imageFive: string | undefined;
}

export async function onSubmitProduct(data: ProductInput) {
  const NewProduct: NewProduct = {
    name: data.name,
    description: data.description,
    categoryID: Number(data.category),
    price: data.price,
    discount: data.discount,
    stock: data.stock,
    imageOne: data.imageOne || "",
    imageTwo: data.imageTwo,
    imageThree: data.imageThree,
    imageFour: data.imageFour,
    imageFive: data.imageFive,
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
    imageOne: data.imageOne || "",
    imageTwo: data.imageTwo,
    imageThree: data.imageThree,
    imageFour: data.imageFour,
    imageFive: data.imageFive,
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
