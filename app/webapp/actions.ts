"use server";

import { db } from "@/lib/db";
import {
  NewOrder,
  NewProductsToOrders,
  NewUser,
  category,
  order,
  productsToOrders,
  user,
} from "@/lib/db/schema";
import { SendTelegram } from "@/lib/sendTelegram";
import { storeProduct } from "@/types/products";

export async function getCategories() {
  return await db.select().from(category);
}

export async function sendInvoiceToSupport(
  cart: storeProduct[],
  totalSum: number,
  comment: string,
  userValues: NewUser
) {
  const insertUser = async (u: NewUser) => {
    return await db.insert(user).values(u).returning({ userId: user.id });
  };

  const insertOrder = async (o: NewOrder) => {
    return await db.insert(order).values(o).returning({ orderId: order.id });
  };

  const insertProductsToOrder = async (cart: NewProductsToOrders[]) => {
    return await db.insert(productsToOrders).values(cart).returning();
  };

  const userExists = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.telegramId, userValues.telegramId),
  });

  if (userExists) {
    await db
      .transaction(async (tx) => {
        const NewOrder: NewOrder = {
          userId: userExists.id,
          comment: comment,
          orderStatus: "created",
          address: "empty",
          paymentType: "support",
          paymentStatus: "incomplete",
          totalSum,
        };

        const newOrder = await insertOrder(NewOrder);

        const NewProductsToOrders: NewProductsToOrders[] = cart.map((v) => ({
          orderId: newOrder[0].orderId,
          productId: v.id,
          quantity: v.quantity,
        }));

        await insertProductsToOrder(NewProductsToOrders);
      })
      .then(async () => {
        await SendTelegram("1019210352", "order created");
      });
  } else {
    await db
      .transaction(async (tx) => {
        const newUser = await insertUser(userValues);

        const NewOrder: NewOrder = {
          userId: newUser[0].userId,
          comment: comment,
          orderStatus: "created",
          address: "empty",
          paymentType: "support",
          paymentStatus: "incomplete",
          totalSum,
        };

        const newOrder = await insertOrder(NewOrder);

        const NewProductsToOrders: NewProductsToOrders[] = cart.map((v) => ({
          orderId: newOrder[0].orderId,
          productId: v.id,
          quantity: v.quantity,
        }));

        const newProductsToOrder = await insertProductsToOrder(
          NewProductsToOrders
        );
      })
      .then(async () => {
        await SendTelegram("1019210352", "order created");
      });
  }

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
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${
      user.id
    }&text=${encodeURI(message)}&parse_mode=MarkdownV2`
  );
}
