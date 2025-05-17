export interface DexScreenerToken {
  name: string;
  symbol: string;
  chain: string;
  price: number;
  liquidity: number;
  volume24h: number;
  txns24h: number;
  fdv: number;
}

export interface Token {
  name: string;
  symbol: string;
  chain: string;
  price: number;
  liquidity: number;
  volume24h: number;
  txns24h?: number;
  fdv?: number;
  marketCap?: number;
  insight?: string;
  safetyScore?: number;
}
