import { botConfig } from "@/config/bot";
import { db } from "@/lib/db";
import { order } from "@/lib/db/schema";
import { InvoicePayload } from "@/types/invoice-payload";
import { eq } from "drizzle-orm";
import { Bot, Keyboard, webhookCallback } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

const keyboard = new Keyboard()
  .text("Каталог")
  .row()
  .text("Помощь")
  .row()
  .text("Публичная оферта & политика конфиденциальности")
  .resized()
  .persistent();

bot.command("start", async (ctx) => {
  console.log(JSON.stringify(ctx.from, null, 4));

  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    return await ctx.reply(botConfig.kk.commands.start);
  }

  await ctx.reply(botConfig.ru.commands.start, {
    reply_markup: keyboard,
  });
});

bot.command("help", async (ctx) => {
  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    return await ctx.reply(botConfig.kk.commands.help);
  }

  await ctx.reply(botConfig.ru.commands.help);
});

bot.hears("Помощь", async (ctx) => {
  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    return await ctx.reply(botConfig.kk.commands.help);
  }

  await ctx.reply(botConfig.ru.commands.help);
});

bot.command("terms", async (ctx) => {
  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    return await ctx.reply(botConfig.kk.commands.terms);
  }

  await ctx.reply("terms");
});

bot.hears("Публичная оферта & политика конфиденциальности", async (ctx) => {
  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    return await ctx.reply(botConfig.kk.commands.terms);
  }

  await ctx.reply("terms");
});

bot.command("catalog", async (ctx) => {
  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    return await ctx.reply(botConfig.kk.commands.catalog);
  }

  await ctx.reply(botConfig.ru.commands.catalog);
});

bot.hears("Каталог", async (ctx) => {
  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    return await ctx.reply(botConfig.kk.commands.catalog);
  }

  await ctx.reply(botConfig.ru.commands.catalog);
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

  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    return await ctx.reply(botConfig.kk.commands.success);
  }

  return ctx.reply(botConfig.ru.commands.success);
});

export default webhookCallback(bot, "next-js");
