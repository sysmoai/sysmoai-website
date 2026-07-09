---
name: zod v3/v4 hidden-hoist conflict
description: Why a transitive zod@4 dependency can break website typecheck and how to prevent it
---

The workspace pins zod 3.25.76 via catalog, but transitive dev deps (e.g. orval's @scalar/* packages) can pull zod@4 into the lockfile. pnpm's hidden hoist (`node_modules/.pnpm/node_modules/zod`) may then resolve to zod 4, which breaks TS resolution for packages like `@hookform/resolvers` whose d.ts imports bare `zod` — surfacing as zodResolver type errors in `sysmoai-website/src/pages/Contact.tsx`.

**Why:** `@hookform/resolvers` doesn't declare zod as a dependency, so its types resolve zod from the hidden hoist, which is version-nondeterministic when multiple zod majors exist.

**How to apply:** Keep zod 4 out of the lockfile. Guards in place: root `package.json` has `zod: catalog:` (pins openai's peer) and `pnpm-workspace.yaml` overrides `'@scalar/openapi-types>zod': '3.25.76'`. Also `orval` is pinned to 8.5.3 in `lib/api-spec` because orval ≥8.20 emits zod v4 syntax (`zod.email()`) incompatible with zod 3. After any install, if website typecheck breaks in Contact.tsx, check `grep zod@4 pnpm-lock.yaml`.
