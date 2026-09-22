# Supabase attribution

The CSS files in this directory are vendored from the Supabase monorepo and are
used under the **Apache License 2.0**.

- Source: <https://github.com/supabase/supabase>
  - `packages/config/css/` → `colors.css`, `theme.css`, `charts.css`, `utilities.css`, `variants.css`, `base.css`
  - `packages/config/typography.css` → `typography.css`
  - `packages/config/unset-tw-colors.css` → `unset-tw-colors.css`
  - `packages/ui/build/css/source/` → `global.css`, `semantic.css`, `compat.css`
  - `packages/ui/build/css/themes/` → `themes/light.css`, `themes/dark.css`
- Fetched: 2026-09-22 (`master`)
- License: <https://github.com/supabase/supabase/blob/master/LICENSE> (Apache-2.0)

## Changes made

- Each file carries a header comment identifying its upstream path and fetch date.
- The import chain was re-created in `src/styles/globals.css` with these files scoped
  to this package; upstream imports that this package does not (yet) use were left out:
  `typography.config.js` and the `@tailwindcss/typography` plugin.
- No token values, selectors, or declarations inside the vendored files were modified.

The React components in `src/components/` are likewise adapted from
`packages/ui/src/components/shadcn/ui/` in the same repository. Most differ only in
import paths and the `cn` helper implementation. Since the hybrid API migration
(`docs/hybrid-api-migration.md`, 2026-09-22), 17 components additionally split into a
`*-parts.tsx` file (the unmodified compound primitives, per Apache-2.0 §4(b) marked with
a one-line "Modified: hybrid props API" header) and a new props-driven `*.tsx` file that
composes those parts; no upstream class strings, ARIA attributes, or markup were changed.
See the header comment in each component file.
