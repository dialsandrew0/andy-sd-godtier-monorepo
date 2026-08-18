export type ItemCondition = 'NEW_SEALED' | 'LIKE_NEW' | 'VERY_GOOD' | 'GOOD' | 'ACCEPTABLE' | 'FOR_PARTS';
export type PlatformType = 'EBAY' | 'MERCARI' | 'POSHMARK' | 'FACEBOOK_MARKETPLACE' | 'WHATNOT';

export interface FeeStructure {
  percentFee: number;
  fixedFee: number;
  estPaymentProcFee: number;
}

export interface ArbitrageInput {
  buyPrice: number;
  estMarketValue: number;
  condition: ItemCondition;
  platform: PlatformType;
  estShippingCost?: number;
  inboundShippingCost?: number;
  miscOverhead?: number;
}

export interface ArbitrageMetrics {
  adjustedMarketValue: number;
  conditionMultiplier: number;
  platformFees: number;
  netProfit: number;
  roiPercentage: number;
  profitMarginPercentage: number;
  isViable: boolean;
  tierRating: 'GOD_TIER' | 'HIGH_YIELD' | 'MODERATE' | 'LOW_MARGIN' | 'NEGATIVE';
}

export const CONDITION_MULTIPLIERS: Record<ItemCondition, number> = {
  NEW_SEALED: 1.0,
  LIKE_NEW: 0.88,
  VERY_GOOD: 0.75,
  GOOD: 0.62,
  ACCEPTABLE: 0.45,
  FOR_PARTS: 0.20,
};

export const PLATFORM_FEES: Record<PlatformType, FeeStructure> = {
  EBAY: { percentFee: 0.1325, fixedFee: 0.30, estPaymentProcFee: 0.0 },
  MERCARI: { percentFee: 0.10, fixedFee: 0.50, estPaymentProcFee: 0.029 },
  POSHMARK: { percentFee: 0.20, fixedFee: 0.0, estPaymentProcFee: 0.0 },
  FACEBOOK_MARKETPLACE: { percentFee: 0.05, fixedFee: 0.40, estPaymentProcFee: 0.0 },
  WHATNOT: { percentFee: 0.08, fixedFee: 0.30, estPaymentProcFee: 0.029 },
};

export class FF_ArbitrageEngine {
  public static getAdjustedMarketValue(estMarketValue: number, condition: ItemCondition): number {
    const multiplier = CONDITION_MULTIPLIERS[condition] ?? 0.5;
    return Number((estMarketValue * multiplier).toFixed(2));
  }

  public static calculatePlatformFees(salePrice: number, platform: PlatformType): number {
    const config = PLATFORM_FEES[platform];
    if (!config) return 0;
    const totalFee = (salePrice * config.percentFee) + (salePrice * config.estPaymentProcFee) + config.fixedFee;
    return Number(totalFee.toFixed(2));
  }

  public static analyzeOpportunity(input: ArbitrageInput): ArbitrageMetrics {
    const { buyPrice, estMarketValue, condition, platform, estShippingCost = 0, inboundShippingCost = 0, miscOverhead = 0 } = input;
    const conditionMultiplier = CONDITION_MULTIPLIERS[condition] ?? 0.5;
    const adjustedMarketValue = this.getAdjustedMarketValue(estMarketValue, condition);
    const platformFees = this.calculatePlatformFees(adjustedMarketValue, platform);
    const totalCostBasis = buyPrice + inboundShippingCost + miscOverhead;
    const netProfit = Number((adjustedMarketValue - totalCostBasis - (platformFees + estShippingCost)).toFixed(2));
    const roiPercentage = totalCostBasis > 0 ? Number(((netProfit / totalCostBasis) * 100).toFixed(2)) : 0;
    const profitMarginPercentage = adjustedMarketValue > 0 ? Number(((netProfit / adjustedMarketValue) * 100).toFixed(2)) : 0;

    let tierRating: ArbitrageMetrics['tierRating'] = 'NEGATIVE';
    if (roiPercentage >= 100 && netProfit >= 25) tierRating = 'GOD_TIER';
    else if (roiPercentage >= 50 && netProfit >= 15) tierRating = 'HIGH_YIELD';
    else if (roiPercentage >= 20 && netProfit >= 5) tierRating = 'MODERATE';
    else if (netProfit > 0) tierRating = 'LOW_MARGIN';

    return { adjustedMarketValue, conditionMultiplier, platformFees, netProfit, roiPercentage, profitMarginPercentage, isViable: netProfit > 0 && roiPercentage >= 20, tierRating };
  }
}
