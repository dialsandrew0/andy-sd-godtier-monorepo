/** Shared utilities & types for Andy SD monorepo. */

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
