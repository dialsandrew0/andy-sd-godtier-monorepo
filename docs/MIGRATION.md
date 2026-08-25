# Migration plan

## Target state

All product code lives in this monorepo. Old repos become empty shells with a README pointing here, or are archived.

## Suggested order

1. **Foundation** (done) — workspace, turbo, packages skeleton, app stubs.
2. **Core engines** — flesh out `@andy-sd/valuematrix`, `auction-core`, `triage` from existing scattered logic.
3. **BidLot** — pull best of `bidlot` + `bidlot-dashboard` + `LotForge` into `apps/bidlot`.
4. **ArtPeriod** — consolidate art variants into `apps/artperiod`.
5. **FlipForge** — consolidate flip tools into `apps/flipforge`.
6. **GigDesk & Portfolio** — absorb remaining apps.
7. **Cleanup** — archive or empty obsolete repos; add redirects in their READMEs.

## Rules while migrating

- Do not leave secrets in git history; rotate if any were committed.
- Prefer TypeScript strict mode.
- One README per app that states purpose + local run instructions.
