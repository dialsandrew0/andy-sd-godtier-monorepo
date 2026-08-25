/**
 * Arbitrage / value-gap engine.
 * Migrated from previous valuamatrix-core / FF_ArbitrageEngine.
 */

export interface ValueInput {
  estimatedRetail: number;
  acquisitionCost: number;
  feesPercent?: number;
  shipping?: number;
}

export interface ValueResult {
  netProfit: number;
  marginPercent: number;
  isArbitrage: boolean;
  score: number; // 0–100
}

export function computeArbitrage(input: ValueInput): ValueResult {
  const fees = (input.feesPercent ?? 0.15) * input.estimatedRetail;
  const shipping = input.shipping ?? 0;
  const netProfit = input.estimatedRetail - input.acquisitionCost - fees - shipping;
  const marginPercent =
    input.estimatedRetail > 0 ? (netProfit / input.estimatedRetail) * 100 : 0;
  const isArbitrage = netProfit > 0 && marginPercent >= 20;
  const score = Math.max(0, Math.min(100, Math.round(marginPercent * 1.5)));

  return { netProfit, marginPercent, isArbitrage, score };
}
