import Link from "next/link";

const pieces = [
  { title: "Untitled (Blue Field)", artist: "Emerging · 2024", tag: "Investigate", note: "Strong comps in mid-century abstract; surface needs verification." },
  { title: "Coastal Study No. 7", artist: "Regional · oil on board", tag: "Pass", note: "Clean provenance signal; value range aligns with recent sales." },
  { title: "Figural Bronze", artist: "Unknown foundry", tag: "Skip", note: "Cast quality inconsistent; high authenticity risk." },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-6">
          Art Intelligence Platform
        </p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          Art<span className="text-neutral-400">Period</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-xl mb-10">
          Discover, track, and collect fine art with intelligence. Built for
          collectors who move fast and think deeper.
        </p>
        <div className="flex gap-4">
          <Link
            href="/triage"
            className="px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition"
          >
            Field triage
          </Link>
          <a
            href="https://andy-sd-hub.vercel.app"
            className="px-8 py-3 border border-neutral-700 text-sm font-semibold rounded-full hover:border-neutral-400 transition"
          >
            Andy SD Hub
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Discover", desc: "Surface undervalued works before the market catches on." },
          { title: "Track", desc: "Follow artists, galleries, and auction results in one place." },
          { title: "Collect", desc: "Provenance notes, valuation ranges, collection intelligence." },
        ].map((f) => (
          <div key={f.title} className="border border-neutral-800 rounded-2xl p-8 hover:border-neutral-600 transition">
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-4">
        <h2 className="text-sm uppercase tracking-widest text-neutral-500">Sample triage</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {pieces.map((p) => (
            <div key={p.title} className="rounded-xl border border-neutral-800 p-5 space-y-2">
              <div className="flex justify-between gap-2">
                <h3 className="font-medium">{p.title}</h3>
                <span className="text-xs text-neutral-500 shrink-0">{p.tag}</span>
              </div>
              <p className="text-xs text-neutral-500">{p.artist}</p>
              <p className="text-sm text-neutral-400">{p.note}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
