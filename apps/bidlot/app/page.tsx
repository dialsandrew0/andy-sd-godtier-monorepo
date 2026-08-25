import { scoreWatchlist } from "@/lib/scoring";
import { DEMO_LOTS } from "@/lib/demo-lots";
import { LotCard } from "@/components/LotCard";
import { ScoreDemo } from "@/components/ScoreDemo";

export default function HomePage() {
  const scored = scoreWatchlist(DEMO_LOTS).sort(
    (a, b) => b.spreadToBid - a.spreadToBid
  );

  const counts = {
    bid: scored.filter((l) => l.decision === "bid").length,
    watch: scored.filter((l) => l.decision === "watch").length,
    maybe: scored.filter((l) => l.decision === "maybe").length,
    skip: scored.filter((l) => l.decision === "skip").length,
  };

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-accent text-sm font-medium tracking-wide uppercase">
          Live scoring engine
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl">
          Know your max bid before the room does.
        </h1>
        <p className="text-slate-400 text-lg max-w-xl">
          Category-aware ARV, fees, logistics, risk, and profit floor — turned into
          a single decision: bid, watch, maybe, or skip.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {(
            [
              ["Bid", counts.bid, "bg-bid/20 text-bid border-bid/40"],
              ["Watch", counts.watch, "bg-watch/20 text-watch border-watch/40"],
              ["Maybe", counts.maybe, "bg-slate-500/20 text-slate-300 border-slate-500/40"],
              ["Skip", counts.skip, "bg-skip/20 text-skip border-skip/40"],
            ] as const
          ).map(([label, n, cls]) => (
            <span
              key={label}
              className={`rounded-full border px-3 py-1 text-sm font-medium ${cls}`}
            >
              {label}: {n}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold text-white">Demo watchlist (scored)</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {scored.map((lot) => (
            <LotCard key={lot.title} lot={lot} />
          ))}
        </div>
      </section>

      <section id="engine" className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Try the engine</h2>
        <p className="text-slate-400 text-sm">
          Enter a lot title and current bid. Scoring runs client-side with the same
          production formula.
        </p>
        <ScoreDemo />
      </section>
    </div>
  );
}
