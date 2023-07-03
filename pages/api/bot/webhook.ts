import { db } from "@/lib/db";
import { order } from "@/lib/db/schema";
import { InvoicePayload } from "@/types/invoice-payload";
import { eq } from "drizzle-orm";
import { Bot, webhookCallback, Context } from "grammy";

import { I18n, I18nFlavor } from "@grammyjs/i18n";

// For TypeScript and auto-completion support,
// extend the context with I18n's flavor:
type MyContext = Context & I18nFlavor;

const i18n = new I18n<MyContext>({
  defaultLocale: "ru",
  directory: "locales",
});

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot<MyContext>(token);

bot.use(i18n);

bot.command("start", async (ctx) => {
  await ctx.reply(ctx.t("start"));
});

bot.command("help", async (ctx) => {
  await ctx.reply(ctx.t("help"));
});

bot.command("terms", async (ctx) => {
  await ctx.reply(ctx.t("terms"));
});

bot.command("catalog", async (ctx) => {
  await ctx.reply(ctx.t("catalog"));
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

  return ctx.reply(ctx.t("success"));
});

export default webhookCallback(bot, "next-js");
