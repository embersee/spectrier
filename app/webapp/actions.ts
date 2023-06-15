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
  user: userObj,
}: InvoiceToSupportProps) {
  const userExists = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.telegramId, userObj.telegramId),
  });

  if (!userExists) {
    await db
      .transaction(async (tx) => {
        const NewUser = userObj as NewUser;

        // Create new user
        const newUser = await tx
          .insert(user)
          .values(NewUser)
          .returning({ userId: user.id });

        const NewOrder: NewOrder = {
          userId: newUser[0].userId,
          comment: comment,
          orderStatus: "created",
          address: address,
          paymentType: "support",
          paymentStatus: "incomplete",
          totalSum,
        };

        // New order transaction
        const newOrder = await tx
          .insert(order)
          .values(NewOrder)
          .returning({ orderId: order.id });

        const NewProductsToOrders: NewProductsToOrders[] = cart.map((v) => ({
          orderId: newOrder[0].orderId,
          productId: v.id,
          quantity: v.quantity,
        }));

        // New productToOrder many-to-many connection
        await tx
          .insert(productsToOrders)
          .values(NewProductsToOrders)
          .returning();
      })
      .then(() => {
        sendMessageToUser({ cart, totalSum, comment, address, user: userObj });
      });
  } else {
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

        // New order transaction
        const newOrder = await tx
          .insert(order)
          .values(NewOrder)
          .returning({ orderId: order.id });

        const NewProductsToOrders: NewProductsToOrders[] = cart.map((v) => ({
          orderId: newOrder[0].orderId,
          productId: v.id,
          quantity: v.quantity,
        }));

        // New productToOrder many-to-many connection
        await tx
          .insert(productsToOrders)
          .values(NewProductsToOrders)
          .returning();
      })
      .then(() => {
        sendMessageToUser({ cart, totalSum, comment, address, user: userObj });
      });
  }
}

const sendMessageToUser = async ({
  cart,
  totalSum,
  comment,
  address,
  user,
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
