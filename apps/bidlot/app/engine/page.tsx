import { ScoreDemo } from "@/components/ScoreDemo";

export default function EnginePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Scoring engine</h1>
        <p className="text-slate-400 text-sm mt-1">
          MaxBid = (ARV × confidence) − fees − logistics − risk − profit floor. Runs
          client-side with production formulas.
        </p>
      </div>
      <ScoreDemo />
    </div>
  );
}
