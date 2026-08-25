import { scoreWatchlist } from "@/lib/scoring";
import { DEMO_LOTS } from "@/lib/demo-lots";
import { LotCard } from "@/components/LotCard";
import Link from "next/link";

export default function InboxPage() {
  const scored = scoreWatchlist(DEMO_LOTS).sort(
    (a, b) => b.spreadToBid - a.spreadToBid
  );
  const groups = {
    bid: scored.filter((l) => l.decision === "bid"),
    watch: scored.filter((l) => l.decision === "watch"),
    maybe: scored.filter((l) => l.decision === "maybe"),
    skip: scored.filter((l) => l.decision === "skip"),
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inbox</h1>
          <p className="text-slate-400 text-sm mt-1">
            {scored.length} lots scored — import CTBids watchlist or try the{" "}
            <Link href="/engine" className="text-accent hover:underline">
              live engine
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-bid/40 bg-bid/20 text-bid px-3 py-1">
            Bid: {groups.bid.length}
          </span>
          <span className="rounded-full border border-watch/40 bg-watch/20 text-watch px-3 py-1">
            Watch: {groups.watch.length}
          </span>
          <span className="rounded-full border border-slate-500/40 bg-slate-500/20 text-slate-300 px-3 py-1">
            Maybe: {groups.maybe.length}
          </span>
          <span className="rounded-full border border-skip/40 bg-skip/20 text-skip px-3 py-1">
            Skip: {groups.skip.length}
          </span>
        </div>
      </div>

      {(["bid", "watch", "maybe", "skip"] as const).map((key) =>
        groups[key].length > 0 ? (
          <section key={key}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
              {key} ({groups[key].length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {groups[key].map((lot) => (
                <LotCard key={lot.title} lot={lot} />
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
