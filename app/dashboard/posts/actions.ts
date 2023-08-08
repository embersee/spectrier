"use server";

import { db } from "@/lib/db";
import { NewPost, Post, post } from "@/lib/db/schema";
import { SendTelegram } from "@/lib/sendTelegram";
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

export async function sendPost(postData: Post, destination: string) {
  try {
    if (destination == "" || destination == "none" || postData == undefined)
      return "Failed to submit";

    const date = new Date().toString();
    if (destination != "all") {
      const res = await SendTelegram(
        // session?.user.id as string,
        "1019210352",
        postData.postText
      );
      console.log(res);
      if (res.status == 400) {
        throw "status: 400 ";
      }
      return `Status:${res.status} sent to ${destination}`;
    }

    throw "error";
  } catch (error) {
    return "error";
  }
}
