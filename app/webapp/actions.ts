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
    await db.transaction(async (tx) => {
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
      await tx.insert(productsToOrders).values(NewProductsToOrders).returning();
    });
  } else {
    const tx = await db.transaction(async (tx) => {
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
      await tx.insert(productsToOrders).values(NewProductsToOrders).returning();
    });
  }

  return await sendMessageToUser({
    cart,
    totalSum,
    comment,
    address,
    user: userObj,
  });
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
*Итог:* ${totalSum} Тенге
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

  await res.json();
};

export const sendInvoiceToBot = async ({
  cart,
  totalSum,
  comment,
  address,
  user: userObj,
}: InvoiceToSupportProps) => {
  let newTelegramOrder = [
    {
      orderId: 0,
    },
  ];

  const userExists = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.telegramId, userObj.telegramId),
  });

  if (!userExists) {
    await db.transaction(async (tx) => {
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
        paymentType: "telegram",
        paymentStatus: "incomplete",
        totalSum,
      };

      // New order transaction
      const newOrder = await tx
        .insert(order)
        .values(NewOrder)
        .returning({ orderId: order.id });

      newTelegramOrder = newOrder;

      const NewProductsToOrders: NewProductsToOrders[] = cart.map((v) => ({
        orderId: newOrder[0].orderId,
        productId: v.id,
        quantity: v.quantity,
      }));

      // New productToOrder many-to-many connection
      await tx.insert(productsToOrders).values(NewProductsToOrders).returning();
    });
  } else {
    await db.transaction(async (tx) => {
      const NewOrder: NewOrder = {
        userId: userExists.id,
        comment: comment,
        orderStatus: "created",
        address: address,
        paymentType: "telegram",
        paymentStatus: "incomplete",
        totalSum,
      };

      // New order transaction
      const newOrder = await tx
        .insert(order)
        .values(NewOrder)
        .returning({ orderId: order.id });

      newTelegramOrder = newOrder;

      const NewProductsToOrders: NewProductsToOrders[] = cart.map((v) => ({
        orderId: newOrder[0].orderId,
        productId: v.id,
        quantity: v.quantity,
      }));

      // New productToOrder many-to-many connection
      await tx.insert(productsToOrders).values(NewProductsToOrders).returning();
    });
  }

  const prices = cart.map((value) => {
    return {
      label: value.name,
      amount: value.price * 100 * (value.quantity as number),
    };
  });

  const items = cart.map((c, i) => ({
    name: c.name,
    quantity: c.quantity,
    sum: c.price * (c.quantity as number),
    // cost: c.price,
    // payment_method: "full_payment",
    // payment_object: "commodity",
    tax: "none", // FIXME: ask vadim https://docs.robokassa.kz/fiscalization/#example
  }));

  const invoice = {
    chat_id: userObj.telegramId,
    title: `Ваш Заказ №${userObj.telegramId}_${new Date().getTime()}`,
    description: "Оплатите ваш заказ!",
    provider_token: process.env.ROBOKASSA_TEST_KEY,
    payload: {
      unique_id: `${userObj.telegramId}_${new Date().toISOString()}`,
      order_id: newTelegramOrder.at(0)?.orderId,
      provider_token: process.env.ROBOKASSA_TEST_KEY,
    },
    provider_data: {
      InvoiceId: userObj.telegramId + new Date().getTime(),
      Receipt: {
        items: items,
      },
    },

    currency: "KZT",
    start_parameter: "test",
    prices: prices,
    need_phone_number: true,
    need_email: true,
    need_shipping_address: true,
    send_phone_number_to_provider: true,
  };

  await sendMessageToUser({
    cart,
    totalSum,
    comment,
    address,
    user: userObj,
  });

  await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendInvoice`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    }
  );
};
