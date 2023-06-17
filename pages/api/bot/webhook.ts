import { db } from "@/lib/db";
import { order } from "@/lib/db/schema";
import { InvoicePayload } from "@/types/invoice-payload";
import { eq } from "drizzle-orm";
import { Bot, webhookCallback } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

bot.command("start", async (ctx) => {
  await ctx.reply("Hello, world!");
});

bot.command("help", async (ctx) => {
  await ctx.reply("help");
});

bot.command("terms", async (ctx) => {
  await ctx.reply("terms");
});

bot.command("catalog", async (ctx) => {
  await ctx.reply("как открыть каталог");
});

bot.on("pre_checkout_query", async (ctx) => {
  return ctx.answerPreCheckoutQuery(true);
});

bot.on("message:successful_payment", async (ctx) => {
  console.log(JSON.stringify(ctx.update.message.successful_payment, null, 4));

  const payload: InvoicePayload = JSON.parse(
    ctx.message.successful_payment.invoice_payload
  );

  await db
    .update(order)
    .set({ orderStatus: "successful", paymentStatus: "complete" })
    .where(eq(order.id, payload.order_id));

  return ctx.reply("Успешно оплачено!");
});

export default webhookCallback(bot, "next-js");
