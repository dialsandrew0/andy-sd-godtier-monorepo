"use client";

import { useState } from "react";
import { LotCard } from "@/components/LotCard";
import type { ScoredLot } from "@/lib/types";

export default function ImportPage() {
  const [json, setJson] = useState(
    JSON.stringify(
      {
        lots: [
          {
            source: "ctbids",
            lotUrl: "https://ctbids.com/lot/demo",
            title: "14k Gold Chain Bracelet",
            location: "Hartford, CT",
            shippingMode: "shippable",
            currentBid: 45,
            currency: "USD",
            timeRemainingSeconds: 7200,
            watchlistCapturedAt: new Date().toISOString(),
          },
        ],
        importedAt: new Date().toISOString(),
        source: "ctbids",
        pageUrl: "https://ctbids.com/watchlist",
      },
      null,
      2
    )
  );
  const [scored, setScored] = useState<ScoredLot[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onImport() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/import/ctbids-watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      setScored(data.lots);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Import failed");
      setScored(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">CTBids import</h1>
        <p className="text-slate-400 text-sm mt-1">
          POST watchlist JSON from the Chrome extension (or paste below). Scores
          every lot with the production engine. No database required for demo mode.
        </p>
      </div>
      <textarea
        className="w-full h-64 rounded-xl border border-white/10 bg-panel/60 p-4 font-mono text-xs text-slate-200 outline-none focus:border-accent"
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />
      <button
        onClick={onImport}
        disabled={loading}
        className="rounded-lg bg-accent/20 border border-accent/40 text-accent px-4 py-2 text-sm font-semibold hover:bg-accent/30 disabled:opacity-50"
      >
        {loading ? "Scoring…" : "Import & score"}
      </button>
      {error && <p className="text-skip text-sm">{error}</p>}
      {scored && (
        <div className="grid gap-4 md:grid-cols-2">
          {scored.map((lot) => (
            <LotCard key={lot.title + lot.currentBid} lot={lot} />
          ))}
        </div>
      )}
    </div>
  );
}
