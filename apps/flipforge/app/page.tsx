"use client";

import { useMemo, useState } from "react";

function computeFlip(title: string, cost: number) {
  const t = title.toLowerCase();
  let retail = 40;
  if (/14k|gold|sterling|diamond/.test(t)) retail = 220;
  else if (/matco|tool|dewalt|milwaukee/.test(t)) retail = 120;
  else if (/vintage|mid.?century|mcm/.test(t)) retail = 95;
  else if (/nike|jordan|leather/.test(t)) retail = 85;
  const fees = retail * 0.15;
  const net = retail - cost - fees;
  const margin = retail > 0 ? (net / retail) * 100 : 0;
  const verdict = net > 25 && margin >= 20 ? "FLIP" : net > 0 ? "HOLD" : "PASS";
  const listing = `${title.trim() || "Item"} — clean, ready to ship. Priced to move.`;
  return { retail, fees, net, margin, verdict, listing };
}

export default function FlipForgePage() {
  const [title, setTitle] = useState("Vintage leather messenger bag");
  const [cost, setCost] = useState("18");
  const r = useMemo(() => computeFlip(title, Number(cost) || 0), [title, cost]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-10">
      <header className="space-y-3">
        <p className="text-accent text-sm font-medium tracking-widest uppercase">FlipForge</p>
        <h1 className="text-4xl font-bold tracking-tight">Photo-to-verdict resale</h1>
        <p className="text-slate-400">
          Field triage, value range, and instant listing draft — where generic lens tools stop.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <label className="block space-y-1 text-sm">
            <span className="text-slate-500">What did you find?</span>
            <input
              className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 outline-none focus:border-accent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="text-slate-500">Acquisition cost ($)</span>
            <input
              type="number"
              className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 outline-none focus:border-accent"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </label>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
          <div className="text-3xl font-bold text-accent">{r.verdict}</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-slate-500 text-xs">Est. retail</div>
              <div className="font-mono">${r.retail.toFixed(0)}</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">Net after fees</div>
              <div className="font-mono">${r.net.toFixed(0)}</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">Margin</div>
              <div className="font-mono">{r.margin.toFixed(0)}%</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs">Fees (~15%)</div>
              <div className="font-mono">${r.fees.toFixed(0)}</div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-3">
            <div className="text-xs text-slate-500 mb-1">Listing draft</div>
            <p className="text-sm text-slate-300">{r.listing}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
