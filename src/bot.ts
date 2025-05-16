import { Bot, Context } from "grammy";
import * as dotenv from "dotenv";

dotenv.config();

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.command("help", handleHelp);

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.trim();

  if (text.startsWith("0x") && text.length === 42) {
    return handleContractAddress(ctx, text);
  }

  if (text.toLowerCase().includes("price") || text.includes("$")) {
    return handlePriceQuery(ctx, text);
  }

  return ctx.reply(
    "I don't understand what you are saying. use /help to see the list of commands."
  );
});

async function handleHelp(ctx: Context) {
  await ctx.reply(
    "Hello! I am a bot that can help you with your questions. I am still in development, so I may not be able to answer all of your questions. If you have any questions, please feel free to ask me!"
  );
}

async function handleContractAddress(ctx: Context, text: string) {
  await ctx.reply("You are asking for the contract address: " + text);
}

async function handlePriceQuery(ctx: Context, text: string) {
  await ctx.reply("You are asking for the price: " + text);
}
