"use server";

import { db } from "@/lib/db";
import { category } from "@/lib/db/schema";
import { storeProduct } from "@/types/products";

export async function getCategories() {
  return await db.select().from(category);
}

export async function sendInvoiceToSupport(
  userId: string,
  cart: storeProduct[],
  totalSum: number,
  comment: string
) {
  const items = cart
    .map((item, i) => `${item.quantity} x ${item.name} – ${item.price}\n`)
    .join("");

  const message = `*Ваш Заказ:*
${items}
––––––––––––––
*Total:* ${totalSum} Рублей
${
  comment &&
  `––––––––––––––
*Ваш комментарий:* ${comment}`
}`;

  fetch(
    `https://api.telegram.org/bot${
      process.env.BOT_TOKEN
    }/sendMessage?chat_id=${userId}&text=${encodeURI(
      message
    )}&parse_mode=MarkdownV2`
  );
}
