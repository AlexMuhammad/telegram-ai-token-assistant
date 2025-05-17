import { Context } from "grammy";

export class TelegramHandlers {
  constructor() {}

  async handleStart(ctx: Context): Promise<void> {
    await ctx.reply("Welcome to the CryptoSleuthBot!");
  }
  async handleHelp(ctx: Context): Promise<void> {
    const response = `Helping you with your crypto needs!
    - Send a token contract address (e.g., 0x123...) to get token details, AI insights, and security score.
    - Ask for token price (e.g., "What's the price of $PEPE?") for current price and market data.
    `;
    await ctx.reply(response);
  }
}
