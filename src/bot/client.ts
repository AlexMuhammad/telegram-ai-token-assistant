import { Bot } from "grammy";
import { config } from "../config";
import { TelegramHandlers } from "./handlers";

export class TelegramBotClient {
  private bot: Bot;

  constructor(handlers: TelegramHandlers) {
    this.bot = new Bot(config.telegramBotToken);

    this.bot.command("start", (ctx) => handlers.handleStart(ctx));
    this.bot.command("help", (ctx) => handlers.handleHelp(ctx));

    this.bot.on("message:text", async (ctx) => {
      const text = ctx.message.text;
      if (
        text.startsWith("What’s the price of $") ||
        text.startsWith("What is the price of $")
      ) {
        await ctx.reply("Price query is not implemented yet.");
      } else if (/^0x[a-fA-F0-9]{40}$/.test(text)) {
        await handlers.handleTokenAddress(ctx);
      } else {
        await ctx.reply(
          "Invalid command. Send a token contract address (e.g., 0x123...) to get token details, AI insights, and security score."
        );
      }
    });
  }

  start() {
    this.bot.start();
    console.log("Bot started");
  }
}
