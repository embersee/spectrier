"use server";

import { db } from "@/lib/db";
import { link } from "@/lib/db/schema";
import { LinkForm } from "@/types/form-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function onCreateLink(linkData: LinkForm) {
  return await db.insert(link).values(linkData);
}

export async function deleteLink(id: number) {
  await db
    .update(link)
    .set({ active: false })
    .where(eq(link.id, id))
    .then(() => revalidatePath("/dashboard/links"));
}

export async function returnLink(id: number) {
  await db
    .update(link)
    .set({ active: true })
    .where(eq(link.id, id))
    .then(() => revalidatePath("/dashboard/links"));
}
