# Andy SD — God-Tier Monorepo

**Single source of truth** for the Andy SD product ecosystem.

| Product | Path | Live |
|---------|------|------|
| **BidLot** | `apps/bidlot` | https://bidlot-godtier.vercel.app |
| **Hub** | `apps/hub` | https://andy-sd-hub.vercel.app |
| **ArtPeriod** | `apps/artperiod` | https://artperiod-godtier.vercel.app |
| **FlipForge** | `apps/flipforge` | https://flipforge-godtier.vercel.app |
| **GigDesk** | `apps/gigdesk` | scaffold |
| **Portfolio** | `apps/portfolio` | scaffold |

## Quick start (Termux / local)

```bash
git pull origin main
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install

# All live apps (Turbo)
pnpm build
pnpm typecheck

# Single app
pnpm dev:bidlot      # http://localhost:3001
pnpm dev:hub
pnpm dev:artperiod   # :3002
pnpm dev:flipforge   # :3003
```

**Do not** use `npm run build --workspaces` — that walks scaffolds and dead paths. Use **pnpm** + the scripts above.

## Packages (shared)

| Package | Purpose |
|---------|---------|
| `@andy-sd/ui` | Design tokens / components |
| `@andy-sd/config` | Shared TS config |
| `@andy-sd/valuematrix` | Valuation & arbitrage |
| `@andy-sd/auction-core` | Max-bid scoring |
| `@andy-sd/triage` | Field triage |
| `@andy-sd/utils` | Helpers |

## Principles

1. Apps ship independently (Vercel `rootDirectory`).
2. Packages share pure logic; apps compose.
3. One toolchain: pnpm + Turbo + TypeScript.
4. Legacy stubs (`flip-findr-v2`, `gig-desk-mainframe`, `valumatrix-core`) removed.

---

Built for serious buyers, collectors, and field operators.
