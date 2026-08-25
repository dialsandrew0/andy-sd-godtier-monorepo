"use client";

import { useMemo, useState } from "react";

type Verdict = "pass" | "investigate" | "skip";

function runTriage(input: {
  title: string;
  hasPhotos: boolean;
  price: number;
  redFlags: string;
}) {
  const notes: string[] = [];
  let score = 55;
  if (!input.hasPhotos) {
    notes.push("No photos — high uncertainty");
    score -= 25;
  }
  const flags = input.redFlags
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (flags.length) {
    notes.push(...flags.map((f) => `Flag: ${f}`));
    score -= flags.length * 10;
  }
  if (input.price <= 0) {
    notes.push("Invalid price");
    score -= 15;
  }
  if (/bronze|marble|oil|signed/i.test(input.title)) {
    notes.push("Medium/signature keywords present");
    score += 10;
  }
  score = Math.max(0, Math.min(100, score));
  const verdict: Verdict = score >= 65 ? "pass" : score >= 40 ? "investigate" : "skip";
  return { verdict, score, notes };
}

export default function TriagePage() {
  const [title, setTitle] = useState("Signed oil on canvas landscape");
  const [hasPhotos, setHasPhotos] = useState(true);
  const [price, setPrice] = useState("450");
  const [redFlags, setRedFlags] = useState("");
  const result = useMemo(
    () =>
      runTriage({
        title,
        hasPhotos,
        price: Number(price) || 0,
        redFlags,
      }),
    [title, hasPhotos, price, redFlags]
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Field triage</p>
        <h1 className="text-3xl font-bold">Photo-to-verdict</h1>
        <p className="text-neutral-400 mt-2 text-sm">
          Observed vs inferred confidence for field finds and collection intake.
        </p>
      </div>
      <div className="space-y-4 border border-neutral-800 rounded-2xl p-6">
        <label className="block space-y-1 text-sm">
          <span className="text-neutral-500">Title / description</span>
          <input
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 outline-none focus:border-neutral-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="text-neutral-500">Asking / found price</span>
          <input
            type="number"
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 outline-none focus:border-neutral-400"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={hasPhotos} onChange={(e) => setHasPhotos(e.target.checked)} />
          Has photos
        </label>
        <label className="block space-y-1 text-sm">
          <span className="text-neutral-500">Red flags (comma-separated)</span>
          <input
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 outline-none focus:border-neutral-400"
            value={redFlags}
            onChange={(e) => setRedFlags(e.target.value)}
            placeholder="water damage, no signature, ..."
          />
        </label>
      </div>
      <div className="border border-neutral-800 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold uppercase">{result.verdict}</span>
          <span className="text-neutral-400">score {result.score}</span>
        </div>
        <ul className="text-sm text-neutral-400 space-y-1">
          {result.notes.map((n) => (
            <li key={n}>· {n}</li>
          ))}
          {!result.notes.length && <li>· No flags</li>}
        </ul>
      </div>
    </div>
  );
}
