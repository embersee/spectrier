import { botConfig } from "@/config/bot";
import { db } from "@/lib/db";
import { link, order, user } from "@/lib/db/schema";
import { InvoicePayload } from "@/types/invoice-payload";
import { eq } from "drizzle-orm";
import { Bot, Keyboard, webhookCallback } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

const keyboard = new Keyboard()
  .text("Каталог")
  .text("Помощь")
  .row()
  // .text("Публичная оферта")
  // .text("Политика конфиденциальности")
  // .row()
  .text("Связь с оператором")
  .resized()
  .persistent();

// const publicPolicy = new InlineKeyboard().webApp(
//   "Открыть",
//   "https://spectrier.vercel.app/policy"
// );

// const publicOffer = new InlineKeyboard().webApp(
//   "Открыть",
//   "https://spectrier.vercel.app/public-offer"
// );

bot.command("start", async (ctx) => {
  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    await ctx.replyWithPhoto(
      "https://utfs.io/f/a9bdcc6f-8b45-48af-a9ac-cc784c28e542_2023-08-21%2013.40.35.jpg"
    );
    return await ctx.reply(botConfig.kk.commands.start);
  }

  await ctx.replyWithPhoto(
    "https://utfs.io/f/a9bdcc6f-8b45-48af-a9ac-cc784c28e542_2023-08-21%2013.40.35.jpg"
  );
  await ctx.reply(botConfig.ru.commands.start, {
    reply_markup: keyboard,
  });

  if (ctx.match.length) {
    const found = await db.query.link.findFirst({
      where: eq(link.code, ctx.match),
    });

    if (!found) return;

    await db
      .update(link)
      .set({ reponses: found.reponses + 1 })
      .where(eq(link.code, found.code));

    await db.insert(user).values({
      name:
        ctx.message?.from.first_name || "" + ctx.message?.from.last_name || "",
      telegramId: ctx.message?.from.id.toString() || "",
      username: ctx.message?.from.username || "",
    });
  }
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

bot.hears("Связь с оператором", async (ctx) => {
  if (ctx.from?.language_code?.toLocaleLowerCase() == "kk") {
    return await ctx.reply(botConfig.kk.commands.support);
  }

  await ctx.reply(botConfig.ru.commands.support);
});

// bot.command("terms", async (ctx) => {
//   await ctx.reply("Публичная оферта ссылка", {
//     reply_markup: publicOffer,
//   });

//   await ctx.reply("Политика конфиденциальности ссылка", {
//     reply_markup: publicPolicy,
//   });
// });

// bot.hears("Публичная оферта", async (ctx) => {
//   await ctx.reply("Публичная оферта ссылка", {
//     reply_markup: publicOffer,
//   });
// });

// bot.hears("Политика конфиденциальности", async (ctx) => {
//   await ctx.reply("Политика конфиденциальности ссылка", {
//     reply_markup: publicPolicy,
//   });
// });

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

export const config = {
  runtime: "edge",
};

export default webhookCallback(bot, "next-js");
