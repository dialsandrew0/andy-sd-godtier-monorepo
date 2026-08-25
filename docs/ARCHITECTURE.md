# Architecture

## Monorepo layout

- **apps/** — products that deploy independently (Next.js preferred).
- **packages/** — shared libraries with clear public APIs.
- **tools/** — scripts, codegen, internal tooling.
- **docs/** — ADRs and product specs.

## Boundaries

- Apps may depend on packages.
- Packages must not depend on apps.
- Prefer pure functions in core packages (`valuematrix`, `auction-core`, `triage`) so they stay testable and framework-agnostic.

## Future

- Prisma/Drizzle in `packages/database` when a shared DB is needed.
- Auth package when identity is unified.
- Scrapers package for CTBids and other sale sources.
