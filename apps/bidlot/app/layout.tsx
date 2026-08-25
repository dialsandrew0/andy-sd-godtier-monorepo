import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BidLot — Auction Intelligence OS",
  description:
    "Estate sale triage, max-bid scoring, category-aware valuation for serious buyers.",
};

const nav = [
  { href: "/", label: "Inbox" },
  { href: "/radar", label: "Radar" },
  { href: "/engine", label: "Engine" },
  { href: "/import", label: "Import" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-white/10 bg-panel/80 backdrop-blur sticky top-0 z-50">
            <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center font-bold text-accent">
                  B
                </div>
                <div>
                  <div className="font-semibold tracking-tight">BidLot</div>
                  <div className="text-xs text-slate-400">Auction Intelligence OS</div>
                </div>
              </Link>
              <nav className="flex gap-4 text-sm text-slate-300">
                {nav.map((n) => (
                  <Link key={n.href} href={n.href} className="hover:text-white transition">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <footer className="border-t border-white/10 mt-16 py-8 text-center text-sm text-slate-500">
            Andy SD · BidLot · God-tier monorepo
          </footer>
        </div>
      </body>
    </html>
  );
}
