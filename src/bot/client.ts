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
      await ctx.reply("Hello!");
    });
  }

  start() {
    this.bot.start();
    console.log("Bot started");
  }
}
