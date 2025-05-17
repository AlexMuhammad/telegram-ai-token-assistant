import { AiRepository } from "../data/repositories/ai";
import { DexScreenerRepository } from "../data/repositories/dexscreener";
import { DexScreenerToken, Token } from "../data/types";
import { validators } from "../utils/validators";

export class TokenService {
  constructor(
    private dexscreenerRepository: DexScreenerRepository,
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
}
