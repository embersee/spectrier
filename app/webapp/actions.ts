"use server";

import { db } from "@/lib/db";
import { category } from "@/lib/db/schema";

export async function getCategories() {
  return await db.select().from(category);
}
