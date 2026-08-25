export type ShippingMode = "shippable" | "pickup_only" | "unknown";

export type Category =
  | "fine_jewelry"
  | "costume_jewelry"
  | "tools"
  | "furniture"
  | "art_decor"
  | "auto_parts"
  | "media"
  | "fashion"
  | "unknown";

export type Decision = "bid" | "watch" | "maybe" | "skip";

export interface RawLot {
  source: "ctbids" | "demo";
  lotUrl: string;
  title: string;
  location: string;
  postalCode?: string;
  shippingMode: ShippingMode;
  currentBid: number;
  currency: "USD";
  timeRemainingSeconds: number;
  watchlistCapturedAt: string;
}

export interface ScoredLot extends RawLot {
  category: Category;
  estimatedARV: number;
  confidence: number;
  fees: number;
  logistics: number;
  risk: number;
  profitFloor: number;
  maxBid: number;
  spreadToBid: number;
  decision: Decision;
  reasons: string[];
  scoredAt: string;
}

export interface CategoryDefaults {
  confidence: number;
  feeRate: number;
  riskRate: number;
  profitRate: number;
  logisticsShippable: number;
  logisticsPickupOnly: number;
}
