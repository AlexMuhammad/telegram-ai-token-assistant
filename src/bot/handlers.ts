import { Context } from "grammy";
import { TokenService } from "../services/token";
import { formatters } from "../utils/formatters";

export class TelegramHandlers {
  constructor(private tokenService: TokenService) {}

  async handleTokenAddress(ctx: Context): Promise<void> {
    const address = ctx.message?.text;
    if (!address) return;
    try {
      const token = await this.tokenService.getTokenByAddress(address);
      if (!token) {
        await ctx.reply(
          "Token not found or invalid address, Please try again."
        );
        return;
      }

      const response = `
📊 Token: ${token.name} (${token.symbol})
   Chain: ${token.chain}
   Price: ${formatters.currency(token.price)}
   Liquidity: ${formatters.currency(token.liquidity)}
   24h Volume: ${formatters.currency(token.volume24h)} (${token.txns24h} txns)
🧠 AI Insight: ${token.insight}
🛡 Safety Score: ${
        token.safetyScore
      }% (Based on liquidity, volume, and market cap)
`;
      await ctx.reply(response);
    } catch (error) {
      await ctx.reply((error as Error).message || "An error occurred.");
    }
  }

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
