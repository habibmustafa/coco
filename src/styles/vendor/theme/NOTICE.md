# Third-party notices

This project adapts code and styles from the Supabase monorepo under the Apache
License 2.0. Source: <https://github.com/supabase/supabase>.

- `src/components/atoms/` derives from `packages/ui/src/components/`.
- `src/components/fragments/` derives from `packages/ui-patterns/src/`.
- `src/lib/` and `src/providers/` include adaptations from `packages/ui/src/`.
- The styles in this directory derive from `packages/config/css/`,
  `packages/config/typography.css`, `packages/config/unset-tw-colors.css`,
  `packages/ui/build/css/source/`, and `packages/ui/build/css/themes/`.

The source files were retrieved on 2026-09-22. Changes include local import paths,
theme integration, public API adapters, and the hybrid component API. The copied
style rules retain their original values. The attribution is kept here while the
project is private; file-level change notices need review before distribution.

License: <https://github.com/supabase/supabase/blob/master/LICENSE>.
