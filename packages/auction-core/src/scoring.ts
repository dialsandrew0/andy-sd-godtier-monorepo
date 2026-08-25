export interface LotInput {
  category: string;
  estimateLow?: number;
  estimateHigh?: number;
  condition: "poor" | "fair" | "good" | "excellent" | "mint";
  competitionLevel?: number; // 0–1
}

export interface MaxBidResult {
  suggestedMaxBid: number;
  confidence: number; // 0–1
  rationale: string;
}

const CONDITION_MULT: Record<LotInput["condition"], number> = {
  poor: 0.4,
  fair: 0.65,
  good: 0.85,
  excellent: 1.0,
  mint: 1.15,
};

export function scoreMaxBid(lot: LotInput): MaxBidResult {
  const mid =
    lot.estimateLow != null && lot.estimateHigh != null
      ? (lot.estimateLow + lot.estimateHigh) / 2
      : lot.estimateHigh ?? lot.estimateLow ?? 0;

  const conditionFactor = CONDITION_MULT[lot.condition];
  const competition = lot.competitionLevel ?? 0.5;
  // Leave room under mid when competition is high
  const bidFactor = 0.7 + (1 - competition) * 0.25;
  const suggestedMaxBid = Math.round(mid * conditionFactor * bidFactor);
  const confidence = mid > 0 ? 0.55 + conditionFactor * 0.3 : 0.3;

  return {
    suggestedMaxBid,
    confidence: Math.min(1, confidence),
    rationale: `Category ${lot.category}, condition ${lot.condition}, competition ${(competition * 100).toFixed(0)}%`,
  };
}
