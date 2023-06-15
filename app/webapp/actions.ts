"use server";

import { db } from "@/lib/db";
import {
  NewOrder,
  NewProductsToOrders,
  NewUser,
  category,
  insertProductsToOrder,
  insertUser,
} from "@/lib/db/schema";
import { SendTelegram } from "@/lib/sendTelegram";
import { storeProduct } from "@/types/products";

import { insertOrder } from "@/lib/db/schema";

export async function getCategories() {
  return await db.select().from(category);
}

type InvoiceToSupportProps = {
  cart: storeProduct[];
  totalSum: number;
  comment: string;
  address: string;
  user: NewUser;
};

export async function sendInvoiceToSupport({
  cart,
  totalSum,
  comment,
  address,
  user,
}: InvoiceToSupportProps) {
  const userExists = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.telegramId, user.telegramId),
  });

  if (userExists) {
    await db
      .transaction(async (tx) => {
        const NewOrder: NewOrder = {
          userId: userExists.id,
          comment: comment,
          orderStatus: "created",
          address: address,
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
      .then(() => {
        sendMessageToUser({ cart, totalSum, comment, address, user });
      });
  } else {
    await db
      .transaction(async (tx) => {
        const newUser = await insertUser(user);

        const NewOrder: NewOrder = {
          userId: newUser[0].userId,
          comment: comment,
          orderStatus: "created",
          address: address,
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
      .then(() => {
        sendMessageToUser({ cart, totalSum, comment, address, user });
      });
  }
}

const sendMessageToUser = async ({
  cart,
  user,
  totalSum,
  comment,
  address,
}: InvoiceToSupportProps) => {
  const items = cart
    .map((item) => `${item.quantity} x ${item.name} – ${item.price}\n`)
    .join("");

  const message = `*Ваш Заказ:*
${items}
––––––––––––––
*Total:* ${totalSum} Рублей
${
  comment &&
  `––––––––––––––
*Ваш комментарий:* ${comment}`
}
${
  address &&
  `––––––––––––––
*Адрес доставки:* ${address}`
}`;

  const res = await SendTelegram(
    user.telegramId?.toString() as string,
    message
  );

  await res.json().then((data) => console.log(data));
};
