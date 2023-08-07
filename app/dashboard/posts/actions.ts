"use server";

import { db } from "@/lib/db";
import { NewPost, post } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function savePost({ postText, postImageURL }: NewPost) {
  await db.insert(post).values({ postText, postImageURL });
}

export async function deletePost(id: number) {
  await db
    .update(post)
    .set({ active: false })
    .where(eq(post.id, id))
    .then(() => revalidatePath("/dashboard/posts"));
}

export async function returnPost(id: number) {
  await db
    .update(post)
    .set({ active: true })
    .where(eq(post.id, id))
    .then(() => revalidatePath("/dashboard/posts"));
}
