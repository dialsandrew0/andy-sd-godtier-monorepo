const products = [
  {
    name: "BidLot",
    tag: "Auction Intelligence OS",
    desc: "Max-bid scoring, estate triage, category valuation for serious buyers.",
    href: "https://bidlot-godtier.vercel.app",
    status: "Live",
  },
  {
    name: "ArtPeriod",
    tag: "Collection Intelligence",
    desc: "Where art meets obsession — research index and field triage.",
    href: "https://art-period-henna.vercel.app",
    status: "Live",
  },
  {
    name: "FlipForge",
    tag: "Field & Resale",
    desc: "Photo-to-verdict, authenticity tells, listing generation.",
    href: "#",
    status: "In monorepo",
  },
  {
    name: "GigDesk",
    tag: "Gig OS",
    desc: "Mainframe for gig operators and workflow intelligence.",
    href: "#",
    status: "In monorepo",
  },
];

export default function HubPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-16">
      <header className="space-y-4 text-center">
        <p className="text-accent text-sm font-medium tracking-widest uppercase">
          Andy SD
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          God-tier product hub
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          One monorepo. Shared engines. Independent products for collectors,
          auction buyers, and field operators.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((p) => (
          <a
            key={p.name}
            href={p.href}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-accent/40 hover:bg-white/[0.05] transition"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold group-hover:text-accent transition">
                {p.name}
              </h2>
              <span className="text-xs rounded-full border border-white/10 px-2 py-0.5 text-slate-400">
                {p.status}
              </span>
            </div>
            <p className="text-sm text-accent/80 mb-2">{p.tag}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
          </a>
        ))}
      </div>

      <footer className="text-center text-sm text-slate-600 pt-8 border-t border-white/5">
        Monorepo:{" "}
        <a
          className="text-slate-400 hover:text-white"
          href="https://github.com/dialsandrew0/andy-sd-godtier-monorepo"
        >
          andy-sd-godtier-monorepo
        </a>
      </footer>
    </div>
  );
}
