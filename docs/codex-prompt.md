# Handoff prompt (for ChatGPT Codex or any other coding agent)

Copy everything below the line into the new agent's first message.

---

You are continuing work on an existing project. Read this brief fully before touching anything.

## 1. What the project is

`coco/` (Windows path: `C:\Users\hmustafazadeh\Desktop\core`) is a **private React component
library** that ports the **Supabase design system** (<https://supabase.com/design-system>).

The goal is **visual identity, not inspiration**: components must look exactly like upstream.
Upstream is open source under **Apache-2.0** (`github.com/supabase/supabase`), so its code and
CSS are copied with attribution rather than reimplemented.

It is **not published to npm**. `package.json` is publish-shaped (`exports`, `files`,
`sideEffects`, `peerDependencies`) but stays `"private": true`.

## 2. Stack

React 19 · TypeScript 6 · Vite 8 (library mode) · Tailwind CSS v4 (CSS-first `@theme`) ·
Radix (`radix-ui` single package) · `cmdk` · `vaul` · `sonner` · `react-day-picker` · `recharts` ·
`react-hook-form` · `framer-motion` · `class-variance-authority` · `clsx` + `tailwind-merge` ·
`lucide-react` · oxlint. Playground-only: `shiki`, `@hookform/resolvers`, `zod`. Git branch: `main`.

Commands:

```
npm run dev            # playground dev server
npm run build:lib      # dist/coco.js + coco.cjs + styles.css + index.d.ts
npm run lint           # oxlint
npx tsc -b             # typecheck
npm run check:classes  # every utility class used must exist in the built CSS
npm run check:tokens   # our design tokens vs the live supabase.com/design-system CSS
npm run verify         # all of the above in order
```

## 3. Talk to the user in Azerbaijani

The user writes in Azerbaijani and expects prose, explanations and docs in Azerbaijani.
Code, identifiers, code comments and file names stay in English.

## 4. Where the docs live (read these first)

- `CLAUDE.md` — the working rules, auto-loaded by Claude Code. Treat it as binding.
- `docs/plan.md` — **living record**: decision log, corrections log, structure, completed work,
  roadmap, verification. **Update it in the same turn as the work, not in a batch at the end.**
  The user asked for this explicitly.

## 5. Current state

Layihənin adı **coco**-dur. Paket və build çıxışları `coco` adını istifadə edir;
fiziki workspace yolu hələ `C:\Users\hmustafazadeh\Desktop\core`-dur.
SVG loqo, nişan və favicon `public/` altındadır; qaydalar `docs/brand.md`-dədir.

**33 atom components ported** (upstream source is preserved; import paths and TypeScript-only
compatibility annotations are adapted):

accordion, alert, aspect-ratio, avatar, badge, button, calendar, card, chart, checkbox, collapsible,
command, dialog, drawer, dropdown-menu, form, hover-card, input, label, popover, progress,
radio-group, select, separator, sheet, sidebar, skeleton, sonner, switch, table, tabs, textarea,
tooltip.

Plus: `ThemeProvider` + `useTheme` + `singleThemes` (System/Dark/Light, persisted in
localStorage, live `matchMedia` tracking, cross-tab sync, no-flash inline script in `index.html`).

Build output: `dist/coco.js` ~168 kB (gzip 35.5 kB), `dist/styles.css` ~164.5 kB (gzip 28.3 kB),
205 public exports. Runtime deps are **external** in the bundle.

### Structure

```
coco/
├── CLAUDE.md, docs/plan.md, docs/codex-prompt.md
├── scripts/{check-classes.mjs, check-tokens.mjs}
├── index.html                      # playground shell; Inter + Source Code Pro; no-flash theme script
├── playground/                     # dev-only docs site, never built or published
│   ├── main.tsx, app.tsx, docs.tsx, theme-switcher.tsx
│   ├── component-preview.tsx       # Preview/Code tabs, Shiki highlight, copy button
│   ├── shiki-theme.ts
│   └── examples/*.tsx              # 42 demo files
├── src/
│   ├── index.ts                    # public entry (imports the CSS, re-exports everything)
│   ├── lib/{utils.ts, constants.ts, get-explicit-tab-index.ts}
│   ├── providers/{theme-provider.tsx, single-themes.ts}
│   ├── styles/
│   │   ├── globals.css             # the upstream import chain, order matters
│   │   └── vendor/supabase/        # 17 vendored CSS files + NOTICE.md
│   └── components/
│       ├── atoms/                  # from packages/ui
│       │   ├── actions/button/
│       │   ├── data-display/{accordion,avatar,chart,collapsible,table}/
│       │   ├── feedback/{alert,badge,progress,skeleton,sonner}/
│       │   ├── forms/{calendar,checkbox,form,input,label,radio-group,select,switch,textarea}/
│       │   ├── layout/{aspect-ratio,card,separator}/
│       │   ├── navigation/{command,sidebar,tabs}/
│       │   └── overlay/{dialog,drawer,dropdown-menu,hover-card,popover,sheet,tooltip}/
│       └── fragments/              # from packages/ui-patterns — still empty
├── vite.config.ts, package.json, tsconfig*.json
```

### Vendored CSS (import order in `src/styles/globals.css` is significant)

`tailwindcss` → `@plugin @tailwindcss/forms` → `tw-animate-css` → `global.css` →
`semantic.css` → `compat.css` → `themes/dark.css` → `themes/light.css` → `unset-tw-colors.css`
→ `colors.css` → `theme.css` → `charts.css` → `animations.css` → `utilities.css` → `hit-area.css` →
`variants.css` → `base.css` → `typography.css` → `design-system-base.css` →
`code-block-variables.css`.

Never edit values inside `src/styles/vendor/supabase/`. Each file carries a source header;
`NOTICE.md` holds the Apache-2.0 attribution and the list of changes.

## 6. How to port a component (follow exactly)

1. **Find the public implementation.** Check `packages/ui/index.tsx` upstream — not everything
   lives under `shadcn/ui/`. Example: the public `Button` is
   `packages/ui/src/components/Button/Button.tsx`, while `shadcn/ui/button.tsx` is only exported
   as the legacy alias `Button_Shadcn_`. Porting the wrong one produces a visibly poorer component.
2. **Fetch the file and change only import paths.** CVA variants, class strings and markup stay
   identical. Use a script rather than retyping:
   `curl` the raw file, prepend an attribution header, then `sed`
   `'../../../lib/utils/cn'` → `'../../../../lib/utils'`,
   `'../../../lib/utils/getExplicitTabIndex'` → `'../../../../lib/get-explicit-tab-index'`,
   `'../../../lib/constants'` → `'../../../../lib/constants'`.
   (Atoms sit one level deeper than upstream, hence four `../`.)
3. **Also fetch upstream's own usage example**:
   `apps/design-system/registry/default/example/<name>-demo.tsx`. The component file alone is not
   enough — see the Tabs gotcha below.
4. Place it in the right category folder, add an `index.ts` barrel, re-export from `src/index.ts`
   (keep it alphabetical).
5. Add a `playground/examples/<name>-demo.tsx` and a `<Section>` + `<ComponentPreview>` in
   `playground/app.tsx`, in alphabetical order.
6. Run `npm run verify`. Both checks must be clean.
7. Update `docs/plan.md`.

## 7. Gotchas already paid for — do not rediscover these

- **The rendered look does not come from component files alone.** The type scale, font stacks and
  base layer live in `apps/design-system/styles/globals.css`, not `packages/config`. Without them
  Tailwind v4's default border colour (`currentColor`) makes every bare `border` render in the
  text colour. Vendored as `design-system-base.css`.
- **Files that look skippable are not**: `focus-ring` is in `utilities.css`, `--card-padding-x` in
  `global.css`, the `dark:` variant in `variants.css`, accordion/overlay keyframes in
  `animations.css`, `hit-area-6` (Dialog/Sheet close button) in `tailwind-plugins/hit-area.css`.
- **`dark:` utilities key off `data-theme*="dark"`, tokens key off `.dark`/`.light`.** Both must be
  set; `ThemeProvider` does that. Document it for consumers.
- **Component usage matters.** `TabsTrigger` has no horizontal padding: spacing comes from
  `TabsList` being `grid w-full grid-cols-N`, and `<TabsIndicator />` must be placed inside the
  list for the animated underline. Without both, tab labels collide.
- **Shiki themes**: put rules in `settings`, never `tokenColors`. Shiki reads `settings` first and
  only falls back to `tokenColors` when absent, so an empty `settings: []` silently drops every
  rule (this produced monochrome code blocks). Shiki v4 does accept `var(--x)` as a colour, which
  is how code blocks follow the theme without re-highlighting.
- **`vite-plugin-dts` v5** renamed `rollupTypes` to `bundleTypes` and needs
  `@microsoft/api-extractor` installed.
- **Windows**: the running dev server locks directories. Stop it before moving folders, and use
  PowerShell `Move-Item` — Git Bash `mv` fails with "Permission denied". Also note `TaskStop` on
  the npm wrapper can leave the vite child alive holding the port.
- New runtime dependencies must also be added to `rollupOptions.external` in `vite.config.ts`.

## 8. Roadmap

**Remaining atoms** (from `packages/ui/src/components/shadcn/ui/`): Resizable, Input OTP,
alert-dialog, context-menu, menubar, navigation-menu, scroll-area, slider, toggle, toggle-group,
button-group, input-group, field, breadcrumb. Start with **Resizable** next.

**Fragments** (from `packages/ui-patterns/src/`, go in `src/components/fragments/`, flat, no
categories): Admonition, `collapsible-alert.tsx`, CollapsibleCardSection, `form/` (FormItemLayout),
`info-tooltip.tsx`, `multi-select/`, DataInputs, EmptyStatePresentational, ErrorDisplay, FilterBar,
InnerSideMenu, MetricCard, PageBreadcrumbs/Container/Header/Nav/Section, ShimmeringLoader,
SkipToContent, StatusCode, Toc, TimestampInfo, DatePicker, CodeBlock.
Do **not** port Supabase-specific ones: ConsentToast, PromoToast, TweetCard, SqlToRest,
McpUrlBuilder, PrivacySettings.

## 9. Known open issues

- **Nothing has been verified visually in a browser** — all checking so far is at the CSS/type
  level via the two scripts. Side-by-side comparison against the live site is still owed.
- README coco istifadəsini və tema inteqrasiyasını sənədləşdirir.
- No tests (upstream has `*.test.tsx` files that were not ported).
- `oxlint` reports a handful of warnings that come from upstream code as-is
  (`only-export-components`, unused params). Leave them; do not "fix" vendored logic.

## 10. First thing to do

Read `CLAUDE.md` and `docs/plan.md`, run `npm run verify` to confirm the baseline is green, then
ask the user which item from the roadmap to start with.
