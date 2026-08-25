# Andy SD — God-Tier Monorepo

**Single source of truth** for the Andy SD product ecosystem.

| Product | Path | Description |
|---------|------|-------------|
| **ArtPeriod** | `apps/artperiod` | Art discovery, collection intelligence, field triage |
| **BidLot** | `apps/bidlot` | Auction / estate-sale intelligence & max-bid scoring |
| **FlipForge** | `apps/flipforge` | Field & resale: photo-to-verdict, authenticity, listings |
| **GigDesk** | `apps/gigdesk` | Gig OS / mainframe |
| **Portfolio** | `apps/portfolio` | iAndySD personal site |

## Packages (shared)

| Package | Purpose |
|---------|---------|
| `@andy-sd/ui` | Design system & components |
| `@andy-sd/config` | Shared ESLint / TS / Tailwind configs |
| `@andy-sd/valuematrix` | Valuation & arbitrage engines |
| `@andy-sd/auction-core` | Max-bid scoring, category valuation, outcome learning |
| `@andy-sd/triage` | Field triage, authenticity tells, photo analysis |
| `@andy-sd/utils` | Shared types, helpers, constants |

## Quick start

```bash
# Requires Node 20+ and pnpm 9+
pnpm install
pnpm dev          # runs all apps in parallel (Turborepo)
pnpm build
pnpm test
pnpm lint
pnpm typecheck
```

### Run a single app

```bash
pnpm --filter @andy-sd/artperiod dev
pnpm --filter @andy-sd/bidlot dev
pnpm --filter @andy-sd/flipforge dev
pnpm --filter @andy-sd/gigdesk dev
```

## Structure

```
apps/           # Deployable products
packages/       # Shared libraries
tools/          # Dev tooling & scripts
docs/           # Architecture & ADRs
```

## Principles

1. **Apps ship** — each app is independently deployable.
2. **Packages share** — pure logic and UI live in packages; apps compose them.
3. **One toolchain** — single TypeScript, ESLint, Prettier, test runner.
4. **Kebab-case** folders; scoped package names (`@andy-sd/*`).

## Migration status

This monorepo is the canonical home. Older single-purpose repos will be absorbed or archived.

---

Built for serious buyers, collectors, and field operators.
