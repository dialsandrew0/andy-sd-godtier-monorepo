import type {
  Category,
  CategoryDefaults,
  Decision,
  RawLot,
  ScoredLot,
  ShippingMode,
} from "./types";

export const CATEGORY_DEFAULTS: Record<Category, CategoryDefaults> = {
  fine_jewelry: {
    confidence: 0.88,
    feeRate: 0.13,
    riskRate: 0.1,
    profitRate: 0.22,
    logisticsShippable: 12,
    logisticsPickupOnly: 25,
  },
  costume_jewelry: {
    confidence: 0.58,
    feeRate: 0.15,
    riskRate: 0.24,
    profitRate: 0.28,
    logisticsShippable: 10,
    logisticsPickupOnly: 22,
  },
  tools: {
    confidence: 0.7,
    feeRate: 0.14,
    riskRate: 0.16,
    profitRate: 0.24,
    logisticsShippable: 18,
    logisticsPickupOnly: 45,
  },
  furniture: {
    confidence: 0.55,
    feeRate: 0.12,
    riskRate: 0.26,
    profitRate: 0.3,
    logisticsShippable: 25,
    logisticsPickupOnly: 80,
  },
  art_decor: {
    confidence: 0.6,
    feeRate: 0.14,
    riskRate: 0.2,
    profitRate: 0.25,
    logisticsShippable: 16,
    logisticsPickupOnly: 35,
  },
  auto_parts: {
    confidence: 0.68,
    feeRate: 0.14,
    riskRate: 0.2,
    profitRate: 0.25,
    logisticsShippable: 20,
    logisticsPickupOnly: 50,
  },
  media: {
    confidence: 0.64,
    feeRate: 0.15,
    riskRate: 0.16,
    profitRate: 0.22,
    logisticsShippable: 10,
    logisticsPickupOnly: 25,
  },
  fashion: {
    confidence: 0.52,
    feeRate: 0.15,
    riskRate: 0.22,
    profitRate: 0.25,
    logisticsShippable: 12,
    logisticsPickupOnly: 28,
  },
  unknown: {
    confidence: 0.4,
    feeRate: 0.15,
    riskRate: 0.35,
    profitRate: 0.3,
    logisticsShippable: 15,
    logisticsPickupOnly: 35,
  },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hasAny(title: string, patterns: string[]): boolean {
  const t = title.toLowerCase();
  return patterns.some((p) => t.includes(p.toLowerCase()));
}

export function classifyCategory(title: string): Category {
  if (
    hasAny(title, [
      "14k",
      "10k",
      "karat",
      "diamond",
      "ring",
      "pendant",
      "necklace",
      "bracelet",
      "earring",
      "gold",
      "sterling",
      "silver",
    ])
  )
    return "fine_jewelry";
  if (hasAny(title, ["costume jewelry", "jewelry assortment", "brooch", "rhinestone"]))
    return "costume_jewelry";
  if (
    hasAny(title, [
      "drill press",
      "matco",
      "tools",
      "socket",
      "wrench",
      "saw",
      "compressor",
      "welder",
    ])
  )
    return "tools";
  if (
    hasAny(title, [
      "chair",
      "sofa",
      "bed",
      "dresser",
      "cabinet",
      "furniture",
      "desk",
      "table",
    ])
  )
    return "furniture";
  if (
    hasAny(title, [
      "clock",
      "lamp",
      "decor",
      "frame",
      "mirror",
      "vase",
      "figurine",
      "painting",
      "print",
    ])
  )
    return "art_decor";
  if (
    hasAny(title, [
      "ford",
      "mustang",
      "automotive",
      "engine",
      "transmission",
      "exhaust",
    ])
  )
    return "auto_parts";
  if (hasAny(title, ["vinyl", "album", "cassette", "book", "record", "cd", "dvd"]))
    return "media";
  if (hasAny(title, ["purse", "dress", "clothing", "handbag", "shoes", "jacket"]))
    return "fashion";
  return "unknown";
}

export function estimateARVStub(
  title: string,
  category: Category,
  providedARV?: number
): number {
  if (typeof providedARV === "number" && providedARV > 0) return providedARV;
  const t = title.toLowerCase();
  if (category === "fine_jewelry") {
    if (t.includes("diamond")) return 380;
    return 220;
  }
  if (category === "costume_jewelry") return 45;
  if (category === "tools") {
    if (t.includes("matco")) return 280;
    return 95;
  }
  if (category === "furniture") return 140;
  if (category === "art_decor") return 65;
  if (category === "auto_parts") return 120;
  if (category === "media") return 55;
  if (category === "fashion") return 40;
  return 35;
}

function estimateLogistics(shippingMode: ShippingMode, category: Category): number {
  const d = CATEGORY_DEFAULTS[category];
  return shippingMode === "pickup_only" ? d.logisticsPickupOnly : d.logisticsShippable;
}

export function scoreWatchlistItem(
  raw: RawLot,
  overrideARV?: number
): ScoredLot {
  const reasons: string[] = [];
  let category = classifyCategory(raw.title);

  if (hasAny(raw.title, ["14k", "10k", "sterling", "solid gold"])) {
    category = "fine_jewelry";
    reasons.push("Precious-metal keyword — routed to fine_jewelry.");
  }

  const defaults = CATEGORY_DEFAULTS[category];
  const arv = estimateARVStub(raw.title, category, overrideARV);
  let confidence = defaults.confidence;
  let riskRate = defaults.riskRate;

  if (hasAny(raw.title, ["matco", "ford", "mustang", "beatles", "samsung"])) {
    confidence += 0.08;
    reasons.push("Brand/model signal — confidence boosted.");
  }
  if (hasAny(raw.title, ["assorted", "assortment", "miscellaneous", "mystery"])) {
    confidence -= 0.14;
    riskRate += 0.1;
    reasons.push("Vague bundle wording — confidence down, risk up.");
  }
  if (raw.shippingMode === "pickup_only") {
    reasons.push("Pickup-only — higher logistics penalty.");
  }
  if (raw.timeRemainingSeconds < 86400) {
    reasons.push("Closing within 24h — prioritize review.");
  }

  confidence = clamp(confidence, 0.2, 0.95);

  const fees = arv * defaults.feeRate;
  const logistics = estimateLogistics(raw.shippingMode, category);
  const risk = arv * riskRate;
  const profitFloor = arv * defaults.profitRate;
  const maxBidRaw = arv * confidence - fees - logistics - risk - profitFloor;
  const maxBid = Math.max(0, Number(maxBidRaw.toFixed(2)));
  const spreadToBid = Number((maxBid - raw.currentBid).toFixed(2));
  const ratio = maxBid > 0 ? spreadToBid / maxBid : -1;

  let decision: Decision = "maybe";
  if (raw.currentBid > maxBid) {
    decision = "skip";
    reasons.push("Current bid exceeds max bid — no margin.");
  } else if (confidence < 0.6) {
    decision = "maybe";
    reasons.push("Confidence below 0.60 — deep dive recommended.");
  } else if (ratio >= 0.25) {
    decision = "bid";
    reasons.push("Strong margin — current bid well below max.");
  } else if (ratio >= 0.1) {
    decision = "watch";
    reasons.push("Moderate margin — monitor closely.");
  } else {
    decision = "maybe";
    reasons.push("Thin margin — deep dive required.");
  }

  return {
    ...raw,
    category,
    estimatedARV: Number(arv.toFixed(2)),
    confidence: Number(confidence.toFixed(2)),
    fees: Number(fees.toFixed(2)),
    logistics: Number(logistics.toFixed(2)),
    risk: Number(risk.toFixed(2)),
    profitFloor: Number(profitFloor.toFixed(2)),
    maxBid,
    spreadToBid,
    decision,
    reasons,
    scoredAt: new Date().toISOString(),
  };
}

export function scoreWatchlist(lots: RawLot[]): ScoredLot[] {
  return lots.map((lot) => scoreWatchlistItem(lot));
}
