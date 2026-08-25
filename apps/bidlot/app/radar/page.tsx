import { scoreWatchlist } from "@/lib/scoring";
import { DEMO_LOTS } from "@/lib/demo-lots";
import clsx from "clsx";

export default function RadarPage() {
  const lots = scoreWatchlist(DEMO_LOTS).sort((a, b) => b.spreadToBid - a.spreadToBid);
  const bids = lots.filter((l) => l.decision === "bid");
  const totalSpread = bids.reduce((s, l) => s + Math.max(0, l.spreadToBid), 0);

  const badge: Record<string, string> = {
    bid: "bg-bid/20 text-bid border-bid/40",
    watch: "bg-watch/20 text-watch border-watch/40",
    maybe: "bg-slate-500/20 text-slate-300 border-slate-500/40",
    skip: "bg-skip/20 text-skip border-skip/40",
  };
  const edge: Record<string, string> = {
    bid: "border-l-bid",
    watch: "border-l-watch",
    maybe: "border-l-slate-500",
    skip: "border-l-skip",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Radar Board</h1>
          <p className="text-slate-400 text-sm mt-1">
            {lots.length} lots · {bids.length} bid opportunities
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-xs uppercase tracking-widest">Potential spread</p>
          <p className="text-2xl font-bold text-bid">${totalSpread.toFixed(0)}</p>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 text-xs uppercase tracking-widest text-slate-500">
        <div className="col-span-4">Lot</div>
        <div className="col-span-1 text-center">Signal</div>
        <div className="col-span-1 text-right">Current</div>
        <div className="col-span-1 text-right">Max</div>
        <div className="col-span-1 text-right">ARV</div>
        <div className="col-span-1 text-right">Spread</div>
        <div className="col-span-1 text-right">Conf</div>
        <div className="col-span-2 text-right">Category</div>
      </div>

      <div className="space-y-2">
        {lots.map((lot) => (
          <div
            key={lot.title}
            className={clsx(
              "grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 items-center px-4 py-3 rounded-lg border border-white/10 border-l-4 bg-panel/60 text-sm",
              edge[lot.decision]
            )}
          >
            <div className="md:col-span-4 font-medium text-white">{lot.title}</div>
            <div className="md:col-span-1 md:text-center">
              <span
                className={clsx(
                  "inline-block rounded border px-2 py-0.5 text-xs font-bold uppercase",
                  badge[lot.decision]
                )}
              >
                {lot.decision}
              </span>
            </div>
            <div className="md:col-span-1 md:text-right font-mono">${lot.currentBid}</div>
            <div className="md:col-span-1 md:text-right font-mono text-accent">${lot.maxBid}</div>
            <div className="md:col-span-1 md:text-right font-mono text-slate-400">
              ${lot.estimatedARV}
            </div>
            <div
              className={clsx(
                "md:col-span-1 md:text-right font-mono",
                lot.spreadToBid >= 0 ? "text-bid" : "text-skip"
              )}
            >
              {lot.spreadToBid >= 0 ? "+" : ""}
              ${lot.spreadToBid}
            </div>
            <div className="md:col-span-1 md:text-right text-slate-400">
              {(lot.confidence * 100).toFixed(0)}%
            </div>
            <div className="md:col-span-2 md:text-right text-slate-500 text-xs">
              {lot.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
