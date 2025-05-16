import { Bot } from "grammy";
import { config } from "../config";

export class TelegramBotClient {
  private bot: Bot;

  constructor(handlers?: any) {
    this.bot = new Bot(config.telegramBotToken);

    this.bot.command("start", (ctx) => ctx.reply("Welcome!"));
    this.bot.command("help", (ctx) => ctx.reply("Help!"));

    this.bot.on("message:text", async (ctx) => {
      await ctx.reply("Hello!");
    });
  }

  start() {
    this.bot.start();
    console.log("Bot started");
  }
}
