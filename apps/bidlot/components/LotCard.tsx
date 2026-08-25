import type { ScoredLot } from "@/lib/types";
import clsx from "clsx";

const decisionStyles: Record<string, string> = {
  bid: "bg-bid/20 text-bid border-bid/40",
  watch: "bg-watch/20 text-watch border-watch/40",
  maybe: "bg-slate-500/20 text-slate-300 border-slate-500/40",
  skip: "bg-skip/20 text-skip border-skip/40",
};

export function LotCard({ lot }: { lot: ScoredLot }) {
  return (
    <article className="rounded-xl border border-white/10 bg-panel/60 p-5 space-y-3 hover:border-white/20 transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-white leading-snug">{lot.title}</h3>
        <span
          className={clsx(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
            decisionStyles[lot.decision]
          )}
        >
          {lot.decision}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="text-slate-500 text-xs">Current bid</div>
          <div className="font-mono text-white">${lot.currentBid.toFixed(0)}</div>
        </div>
        <div>
          <div className="text-slate-500 text-xs">Max bid</div>
          <div className="font-mono text-accent">${lot.maxBid.toFixed(0)}</div>
        </div>
        <div>
          <div className="text-slate-500 text-xs">Est. ARV</div>
          <div className="font-mono">${lot.estimatedARV.toFixed(0)}</div>
        </div>
        <div>
          <div className="text-slate-500 text-xs">Spread</div>
          <div
            className={clsx(
              "font-mono",
              lot.spreadToBid >= 0 ? "text-bid" : "text-skip"
            )}
          >
            {lot.spreadToBid >= 0 ? "+" : ""}
            ${lot.spreadToBid.toFixed(0)}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-400">
        <span className="rounded bg-white/5 px-2 py-0.5">{lot.category}</span>
        <span className="rounded bg-white/5 px-2 py-0.5">
          conf {(lot.confidence * 100).toFixed(0)}%
        </span>
        <span className="rounded bg-white/5 px-2 py-0.5">{lot.shippingMode}</span>
      </div>
      {lot.reasons[0] && (
        <p className="text-xs text-slate-500 border-t border-white/5 pt-2">
          {lot.reasons[0]}
        </p>
      )}
    </article>
  );
}
