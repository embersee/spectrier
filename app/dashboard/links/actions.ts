"use server";

import { db } from "@/lib/db";
import { link } from "@/lib/db/schema";
import { LinkForm } from "@/types/form-schema";

export async function onCreateLink(linkData: LinkForm) {
  return await db.insert(link).values(linkData);
}
