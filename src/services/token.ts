import { AiRepository } from "../data/repositories/ai";
import { CoinGeckoRepository } from "../data/repositories/coin-gecko";
import { DexScreenerRepository } from "../data/repositories/dexscreener";
import { DexScreenerToken, Token } from "../data/types";
import { validators } from "../utils/validators";

export class TokenService {
  constructor(
    private dexscreenerRepository: DexScreenerRepository,
    private coinGeckoRepository: CoinGeckoRepository,
    private aiRepository: AiRepository
  ) {}

  async getTokenByAddress(address: string): Promise<Token | null> {
    const { error } = validators.tokenAddress.validate(address);
    if (error) {
      throw new Error(error.message);
    }

    const tokenData = await this.dexscreenerRepository.getTokenByAddress(
      address
    );
    if (!tokenData) return null;
    const { insight, safetyScore } = await this.aiRepository.analyzeToken(
      tokenData
    );
    const token: Token = {
      ...tokenData,
      insight,
      safetyScore,
    };

    return token;
  }

  async getTokenBySymbol(symbol: string): Promise<Token | null> {
    const { error } = validators.tokenSymbol.validate(symbol);
    if (error) {
      throw new Error(error.message);
    }

    const tokenData = await this.coinGeckoRepository.getTokenPrice(symbol);
    if (!tokenData) return null;

    console.log(tokenData);

    const token: Token = {
      name: tokenData.name,
      symbol: tokenData.symbol,
      price: tokenData.price,
      volume24h: tokenData.volume24h,
      marketCap: tokenData.marketCap,
      chain: "",
      liquidity: 0,
    };

    return token;
  }
}
