/**
 * @andy-sd/triage
 * Field triage, authenticity signals, photo-to-verdict helpers.
 */

export type TriageVerdict = "pass" | "investigate" | "skip";

export interface TriageInput {
  title: string;
  category?: string;
  price?: number;
  hasPhotos: boolean;
  redFlags?: string[];
}

export interface TriageResult {
  verdict: TriageVerdict;
  score: number;
  notes: string[];
}

export function runTriage(input: TriageInput): TriageResult {
  const notes: string[] = [];
  let score = 50;

  if (!input.hasPhotos) {
    notes.push("No photos — high uncertainty");
    score -= 25;
  }
  if (input.redFlags?.length) {
    notes.push(...input.redFlags.map((f) => `Flag: ${f}`));
    score -= input.redFlags.length * 10;
  }
  if (input.price != null && input.price <= 0) {
    notes.push("Invalid or zero price");
    score -= 20;
  }

  score = Math.max(0, Math.min(100, score));
  const verdict: TriageVerdict =
    score >= 65 ? "pass" : score >= 40 ? "investigate" : "skip";

  return { verdict, score, notes };
}
