import { NextRequest, NextResponse } from "next/server";
import { scoreWatchlist } from "@/lib/scoring";
import type { RawLot } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lots: RawLot[] = Array.isArray(body?.lots) ? body.lots : [];
    if (!lots.length) {
      return NextResponse.json(
        { error: "No lots in payload. Expected { lots: RawLot[] }" },
        { status: 400 }
      );
    }
    const normalized: RawLot[] = lots.map((l) => ({
      source: l.source || "ctbids",
      lotUrl: l.lotUrl || "#",
      title: String(l.title || "Untitled"),
      location: String(l.location || "Unknown"),
      postalCode: l.postalCode,
      shippingMode: l.shippingMode || "unknown",
      currentBid: Number(l.currentBid) || 0,
      currency: "USD",
      timeRemainingSeconds: Number(l.timeRemainingSeconds) || 0,
      watchlistCapturedAt: l.watchlistCapturedAt || new Date().toISOString(),
    }));
    const scored = scoreWatchlist(normalized);
    return NextResponse.json({
      received: normalized.length,
      scored: scored.length,
      lots: scored,
      importedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/import/ctbids-watchlist",
    method: "POST",
    body: {
      lots: [
        {
          source: "ctbids",
          lotUrl: "string",
          title: "string",
          location: "string",
          shippingMode: "shippable | pickup_only | unknown",
          currentBid: 0,
          currency: "USD",
          timeRemainingSeconds: 0,
          watchlistCapturedAt: "ISO8601",
        },
      ],
      importedAt: "ISO8601",
      source: "ctbids",
      pageUrl: "string",
    },
  });
}
