"use client";

import { useMemo, useState } from "react";
import { scoreWatchlistItem } from "@/lib/scoring";
import type { RawLot, ShippingMode } from "@/lib/types";
import { LotCard } from "./LotCard";

export function ScoreDemo() {
  const [title, setTitle] = useState("14k Gold Chain Bracelet");
  const [bid, setBid] = useState("50");
  const [shipping, setShipping] = useState<ShippingMode>("shippable");

  const scored = useMemo(() => {
    const currentBid = Number(bid) || 0;
    const raw: RawLot = {
      source: "demo",
      lotUrl: "#",
      title: title || "Untitled lot",
      location: "Demo",
      shippingMode: shipping,
      currentBid,
      currency: "USD",
      timeRemainingSeconds: 3600 * 24,
      watchlistCapturedAt: new Date().toISOString(),
    };
    return scoreWatchlistItem(raw);
  }, [title, bid, shipping]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4 rounded-xl border border-white/10 bg-panel/60 p-5">
        <label className="block space-y-1">
          <span className="text-xs text-slate-400">Lot title</span>
          <input
            className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-white outline-none focus:border-accent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs text-slate-400">Current bid (USD)</span>
          <input
            type="number"
            className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-white outline-none focus:border-accent"
            value={bid}
            onChange={(e) => setBid(e.target.value)}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs text-slate-400">Shipping</span>
          <select
            className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-white outline-none focus:border-accent"
            value={shipping}
            onChange={(e) => setShipping(e.target.value as ShippingMode)}
          >
            <option value="shippable">Shippable</option>
            <option value="pickup_only">Pickup only</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
      </div>
      <LotCard lot={scored} />
    </div>
  );
}
