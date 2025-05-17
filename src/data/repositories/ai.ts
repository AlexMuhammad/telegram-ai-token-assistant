import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../../config";
import { DexScreenerToken } from "../types";
import { logger } from "../../utils/logger";
import { cleanMarkdownFormatting } from "../../utils/textFormatter";

export class AiRepository {
  private model: ChatGoogleGenerativeAI;

  constructor() {
    this.model = new ChatGoogleGenerativeAI({
      apiKey: config.geminiApiKey,
      model: "gemini-1.5-flash",
    });
  }

  async analyzeToken(
    token: DexScreenerToken
  ): Promise<{ insight: string; safetyScore: number }> {
    const prompt = `
        Analyze crypto this token: 
        Name: ${token.name}
        Symbol: ${token.symbol}
        Chain: ${token.chain}
        Price: ${token.price}
        Liquidity: ${token.liquidity}
        Volume 24h: ${token.volume24h}
        Txns 24h: ${token.txns24h}
        FDV: ${token.fdv}

        Provide an insight about the token and a safety score from (0-100%).
    `;

    try {
      const response = await this.model.invoke(prompt);
      const insight = cleanMarkdownFormatting(response.content as string);

      let safetyScore = 50;
      if (token.liquidity > 100000) safetyScore += 20;
      if (token.volume24h > 1000000) safetyScore += 15;
      if (token.fdv > 1000000000) safetyScore -= 10;
      safetyScore = Math.min(100, Math.max(0, safetyScore));

      return { insight, safetyScore };
    } catch (error) {
      logger.error("Error analyzing token", error);
      return { insight: "Failed to analyze token", safetyScore: 0 };
    }
  }
}
