# Hybrid API migration — agent brief

> Task brief for a coding agent (Claude Code / Codex). Lives in `docs/` next to
> `plan.md` and `codex-prompt.md`, referenced from both.

---

## 0. Read first (mandatory, before any code)

1. `CLAUDE.md` — working rules
2. `docs/plan.md` — decisions journal, corrections journal, structure, workflow
3. `docs/codex-prompt.md` — full project briefing
4. `package.json`, `vite.config.ts`, `src/index.ts`
5. For every component you touch: its source in `src/components/atoms/...`, its playground
   examples, and the upstream demo(s) in
   `apps/design-system/registry/default/example/<name>-demo.tsx`

Check the React version in `package.json`:
- React 19 → `ref` is a regular prop, do not use `forwardRef`
- React 18 → use `forwardRef` and set `displayName`

---

## 1. Project context

`core` is a React component library that reproduces Supabase's open-source design system
(`github.com/supabase/supabase`, Apache-2.0).

- Vite library mode (single package), es + cjs, `cssFileName: styles`, `private: true`
- Tailwind v4 (`@tailwindcss/vite`), vendored upstream CSS tokens (552 tokens, 0 diff)
- `cn()` = `clsx` + `tailwind-merge`
- Radix, `cmdk`, `vaul` are runtime deps, **external** in the build
- Components: `src/components/atoms/<category>/<name>/`, `src/components/fragments/<name>/`
- File names: lowercase kebab-case
- Playground: `playground/examples/*.tsx`, shown via `import.meta.glob(..., '?raw')` + Shiki
- Verification: `npx tsc -b`, `npm run verify` (build:lib + lint + check:classes + check:tokens)

All 28 current atoms expose a **compound API only** (shadcn/Radix style).

---

## 2. What "identical to Supabase" means from now on

**Identical = design and behavior. Not source code.**

The atoms were initially ported as byte-exact copies. From this migration on, the source
code is owned by this project and may be refactored freely. Re-syncing files from upstream
by script is no longer a goal.

What MUST stay identical to upstream:
- rendered DOM structure and element types
- class strings on every element (visual output)
- ARIA attributes, roles, focus management, keyboard behavior
- `data-state` / `data-side` / other Radix data attributes (animations depend on them)
- animations, transitions, portals, z-index layering
- the compound API of every part (prop names, types, defaults), except the root renames in §4.3

What MAY change:
- file layout, internal code structure, types, naming of internals
- new props (props-driven API), new exports, context, hooks
- `data-slot` attributes may be added (ignored in markup comparison)

Visual fidelity is proven by **golden markup tests** (§8), not by comparing source files.

Source attribution and license details are centralized in
`src/styles/vendor/theme/NOTICE.md`. The current package is private; revisit
Apache-2.0 §4(b) file-level change notices before distributing it.

---

## 3. Goal

Every suitable atom becomes **hybrid**: usable props-driven and compound, from the same
import:

```tsx
import { Tabs, Dialog } from "core";

// Props-driven
<Tabs items={[{ value: "a", label: "A", content: <A /> }]} />
<Dialog trigger={<Button>Delete</Button>} title="Delete project?" onConfirm={remove} />

// Compound
<Tabs>
  <TabsList>...</TabsList>
  <TabsContent value="a">...</TabsContent>
</Tabs>
<Dialog.Root>
  <Dialog.Trigger asChild><Button>Open</Button></Dialog.Trigger>
  <Dialog.Content>...</Dialog.Content>
</Dialog.Root>
```

---

## 4. Architecture

### 4.1 Folder layout (per hybrid component)

```
src/components/atoms/<category>/<name>/
├── <name>-parts.tsx      # compound parts (former <name>.tsx), class strings unchanged
├── <name>-context.tsx    # only if a render-function slot or part needs shared state
├── <name>.tsx            # props-driven component + namespace assembly
└── index.ts              # public exports
```

Rules:
- Props-driven code is built **only from the component's own parts** (and other atoms).
  It never imports Radix / cmdk / vaul directly. One implementation of behavior.
- Class strings are never duplicated: if the props-driven render needs a demo layout class
  (e.g. `grid w-full`), it lives in the props component, not copied into parts.

### 4.2 Shared hook

```ts
// src/lib/use-controllable-state.ts
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const onChangeRef = useRef(onChange);
  useLayoutEffect(() => {
    onChangeRef.current = onChange;
  });

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [current, setValue] as const;
}
```

Used whenever the props-driven component owns state (open, value, pending).

### 4.3 Two hybrid strategies — choose per component

The root name (`Tabs`, `Dialog`, …) is already used as the compound root. There are two
ways to make it hybrid:

**Strategy A — Additive root (non-breaking).** Used when props mode has a **required data
prop** that compound mode never has (`items`, `options`, `columns`, `content`, `groups`).
The root accepts a discriminated union: with the data prop it renders props mode, without
it it behaves exactly as today.

```ts
type TabsItemsProps<TValue extends string> = { items: readonly TabItem<TValue>[]; children?: never; /* ... */ };
type TabsCompoundProps = React.ComponentProps<typeof TabsRoot> & { items?: never };
export type TabsProps<TValue extends string = string> = TabsItemsProps<TValue> | TabsCompoundProps;
```

The discriminator is a typed prop, checked with `props.items !== undefined`. TypeScript
forbids mixing modes (`items` + `children` is a compile error).

**Strategy B — Renamed root (breaking, internal only).** Used when there is no unambiguous
discriminator. Overlays are the case: `<Dialog open>{children}</Dialog>` could mean
"root with compound children" or "props mode with body content", and a wrong guess renders
broken UI silently. So:
- `Dialog` becomes the props-driven component
- the compound root moves to `Dialog.Root` and named export `DialogRoot`
- every existing usage in `playground/` is migrated in the same turn
- the package is `private: true`, so only the playground is affected; record the rename in
  the decisions journal

| Component | Strategy | Discriminator / note |
|---|---|---|
| Dialog | B | `DialogRoot` |
| Sheet | B | `SheetRoot` |
| Drawer | B | `DrawerRoot` |
| Tooltip | A | `content` |
| Popover | A | `content` |
| HoverCard | A | `content` |
| DropdownMenu | A | `items` |
| Tabs | A | `items` |
| Accordion | A | `items` |
| Collapsible | A | `trigger` + `content`? → decide in plan; if ambiguous, B |
| Select | A | `options` |
| RadioGroup | A | `options` |
| Command | A | `groups` |
| Card | A | any of `title` / `description` / `footer` / `headerAction` → propose exact rule in plan |
| Alert | A | `title` / `description` → propose exact rule in plan |
| Avatar | A | `src` / `fallback` |
| Table | A | `columns` + `data` |

If during analysis a Strategy A component turns out ambiguous, switch it to B and say why.

Never detect mode by inspecting `children` types (`child.type === X`).

### 4.4 Exports

For every hybrid component, `index.ts` exports:

```ts
export const Dialog = Object.assign(DialogHybrid, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
  // + every other public part, key = export name minus prefix
});

// All existing named part exports stay (DialogContent, DialogTitle, ...)
export { DialogRoot, DialogTrigger, DialogContent, /* ... */ } from "./dialog-parts";
export type { DialogProps, DialogClassNames, DialogRenderContext } from "./dialog";
export type { DialogRootProps } from "./dialog-parts";
```

- Namespace values are the parts by reference (no wrappers)
- Existing named exports of parts are kept unchanged → only Strategy B roots change
- If a root was a direct Radix re-export (`const Tabs = TabsPrimitive.Root`), wrap it in a
  function component before attaching statics — never `Object.assign` onto a Radix object
- Public export count in `plan.md` is updated after each component

---

## 5. Visual rules for props mode

1. **Default props render = upstream demo markup.** Open the upstream `<name>-demo.tsx`
   and reproduce its structure and classes. Example: upstream Tabs demo uses `TabsList`
   with `grid w-full grid-cols-N` and `<TabsIndicator />` inside. Props-mode Tabs must
   render exactly that.
2. Tailwind cannot see dynamic classes (`grid-cols-${n}`). Use a static literal map:
   ```ts
   const GRID_COLS = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3",
     4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6" } as const;
   ```
   and a `style={{ gridTemplateColumns }}` fallback above 6, documented as an exception.
3. Only classes that exist in atoms or upstream demos. No new tokens, CSS files, spacing
   scales. `check:classes` must stay green.
4. Forward variant props as-is, derived from parts: `React.ComponentProps<typeof DialogContent>["size"]`.
   Never re-declare unions or invent parallel scales.
5. Internal UI uses existing atoms with their real API. The `Button` is Supabase's:
   visual variant in `type` (`"primary" | "default" | "danger" | …`), native type in
   `htmlType`, plus `loading`, `icon`, `iconRight`, `block`, `size`. Verify in source.
   Pending state uses `loading`, not swapped text.
6. No upstream demo for a case → most minimal composition of parts, noted as
   "no upstream reference" in the plan.

---

## 6. API conventions (identical across all components)

### 6.1 Slot semantics

| Value | Meaning |
|---|---|
| `undefined` | default rendering (upstream demo markup) |
| `null` | part not rendered |
| `ReactNode` | custom content |
| `(ctx) => ReactNode` | custom content with access to internal state |

```ts
type Slot<C> = React.ReactNode | ((ctx: C) => React.ReactNode);
```

### 6.2 Standard prop names — use exactly these

`open` / `defaultOpen` / `onOpenChange`, `value` / `defaultValue` / `onValueChange`,
`trigger` (a `ReactElement`, rendered via the part's Trigger with `asChild`),
`title`, `description`, `icon`, `children`, `content`, `footer`, `headerAction`, `action`,
`items`, `options`, `columns`, `data`, `groups`, `placeholder`, `emptyText`, `disabled`,
`dismissible`, `onConfirm`, `onCancel`, `confirmText`, `cancelText`, `confirmType`,
`closeOnConfirm`, `className`, `classNames`, `slotProps`.

Content props accept `ReactNode`, never `string` only. Value types are generic
(`TValue extends string`) for Tabs, Accordion, Select, RadioGroup.

### 6.3 Styling / pass-through

- `className` → outermost visual element
- `classNames` → object, one key per rendered part
- `slotProps` → typed pass-through to each part, derived from it:
  ```ts
  slotProps?: {
    content?: Partial<React.ComponentProps<typeof DialogContent>>;
    footer?: Partial<React.ComponentProps<typeof DialogFooter>>;
  };
  ```
  Part features (`side`, `align`, `size`, …) that are not first-class props stay reachable
  without new props.
- Merge order with `cn()`: default demo classes → `classNames.x` → `slotProps.x.className`.

### 6.4 Menu items type

```ts
export type MenuItem =
  | { type?: "item"; key: string; label: React.ReactNode; icon?: React.ReactNode;
      shortcut?: string; disabled?: boolean; onSelect?: () => void }
  | { type: "separator"; key: string }
  | { type: "label"; key: string; label: React.ReactNode }
  | { type: "group"; key: string; label?: React.ReactNode; items: MenuItem[] }
  | { type: "submenu"; key: string; label: React.ReactNode; items: MenuItem[] }
  | { type: "checkbox"; key: string; label: React.ReactNode; checked: boolean;
      onCheckedChange: (checked: boolean) => void };
```

Only include variants for which a matching part exists.

### 6.5 Async actions

`onConfirm` may return a Promise: set `pending`, pass `loading` to the confirm `Button`,
disable cancel, block overlay click / Escape while pending, close after resolve
(`closeOnConfirm`, default `true`), `try/finally` — errors are never swallowed.

---

## 7. Reference implementations

### 7.1 Strategy B — Dialog

`dialog-parts.tsx` = the current `dialog.tsx` with the root export renamed
`Dialog` → `DialogRoot` (plus `DialogRootProps` type). Nothing else
changes in it.

```tsx
// src/components/atoms/overlay/dialog/dialog.tsx
import * as React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./dialog-parts";
import { Button } from "../../actions/button";
import { cn } from "../../../../lib/utils";
import { useControllableState } from "../../../../lib/use-controllable-state";

type ButtonType = React.ComponentProps<typeof Button>["type"];

export interface DialogRenderContext {
  close: () => void;
  pending: boolean;
}

type Slot = React.ReactNode | ((ctx: DialogRenderContext) => React.ReactNode);

export interface DialogClassNames {
  content?: string;
  header?: string;
  title?: string;
  description?: string;
  body?: string;
  footer?: string;
}

export interface DialogProps {
  /** Controlled open state */
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the dialog, rendered via DialogTrigger asChild */
  trigger?: React.ReactElement;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: Slot;
  /** undefined = default buttons (only if onConfirm), null = hidden, node/fn = custom */
  footer?: Slot | null;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  /** @default "Confirm" */
  confirmText?: React.ReactNode;
  /** @default "Cancel" */
  cancelText?: React.ReactNode;
  /** Visual variant of the confirm Button @default "primary" */
  confirmType?: ButtonType;
  /** @default true */
  closeOnConfirm?: boolean;
  /** Allow closing via overlay click / Escape @default true */
  dismissible?: boolean;
  className?: string;
  classNames?: DialogClassNames;
  slotProps?: {
    content?: Partial<React.ComponentProps<typeof DialogContent>>;
  };
}

const renderSlot = (slot: Slot | undefined, ctx: DialogRenderContext) =>
  typeof slot === "function" ? slot(ctx) : slot;

export function DialogHybrid({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmType = "primary",
  closeOnConfirm = true,
  dismissible = true,
  className,
  classNames,
  slotProps,
}: DialogProps) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [pending, setPending] = React.useState(false);

  const close = React.useCallback(() => setOpen(false), [setOpen]);
  const ctx: DialogRenderContext = { close, pending };

  const handleOpenChange = (next: boolean) => {
    if (!next && pending) return;
    setOpen(next);
  };

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setPending(true);
    try {
      await onConfirm();
      if (closeOnConfirm) setOpen(false);
    } finally {
      setPending(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    close();
  };

  const blockDismiss = (e: Event) => {
    if (!dismissible || pending) e.preventDefault();
  };

  const footerNode =
    footer === null ? null : footer !== undefined ? (
      renderSlot(footer, ctx)
    ) : onConfirm ? (
      <>
        <Button type="default" onClick={handleCancel} disabled={pending}>
          {cancelText}
        </Button>
        <Button type={confirmType} onClick={handleConfirm} loading={pending}>
          {confirmText}
        </Button>
      </>
    ) : null;

  const { className: contentClassName, onInteractOutside, onEscapeKeyDown, ...contentRest } =
    slotProps?.content ?? {};

  return (
    <DialogRoot open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        {...contentRest}
        className={cn(className, classNames?.content, contentClassName)}
        onInteractOutside={(e) => {
          blockDismiss(e);
          onInteractOutside?.(e);
        }}
        onEscapeKeyDown={(e) => {
          blockDismiss(e);
          onEscapeKeyDown?.(e);
        }}
        {...(description == null && { "aria-describedby": undefined })}
      >
        <DialogHeader className={classNames?.header}>
          {/* Radix requires a Title for a11y */}
          <DialogTitle className={cn(!title && "sr-only", classNames?.title)}>
            {title ?? "Dialog"}
          </DialogTitle>
          {description != null && (
            <DialogDescription className={classNames?.description}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children != null && (
          <div className={classNames?.body}>{renderSlot(children, ctx)}</div>
        )}

        {footerNode != null && (
          <DialogFooter className={classNames?.footer}>{footerNode}</DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
}
```

The body/section structure above is a skeleton. The real implementation must reproduce the
sections and spacing of the upstream dialog demo (e.g. if parts include `DialogSection` /
`DialogSectionSeparator`, use them as the demo does).

### 7.2 Strategy A — Tabs

```tsx
// src/components/atoms/navigation/tabs/tabs.tsx
import * as React from "react";
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "./tabs-parts";
import { cn } from "../../../../lib/utils";

const GRID_COLS = {
  1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3",
  4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6",
} as const;

export interface TabItem<TValue extends string = string> {
  value: TValue;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsClassNames {
  list?: string;
  trigger?: string;
  content?: string;
}

type RootProps = React.ComponentProps<typeof TabsRoot>;

type TabsItemsProps<TValue extends string> = Omit<
  RootProps,
  "value" | "defaultValue" | "onValueChange" | "children"
> & {
  items: readonly TabItem<TValue>[];
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  /** Render the animated underline, as in the upstream demo @default true */
  indicator?: boolean;
  classNames?: TabsClassNames;
  children?: never;
};

type TabsCompoundProps = RootProps & { items?: never };

export type TabsProps<TValue extends string = string> =
  | TabsItemsProps<TValue>
  | TabsCompoundProps;

export function TabsHybrid<TValue extends string = string>(props: TabsProps<TValue>) {
  if (props.items === undefined) {
    return <TabsRoot {...props} />;
  }

  const {
    items,
    value,
    defaultValue,
    onValueChange,
    indicator = true,
    classNames,
    ...rootProps
  } = props;

  const count = items.length;
  const colsClass = GRID_COLS[count as keyof typeof GRID_COLS];

  return (
    <TabsRoot
      {...rootProps}
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={onValueChange ? (v) => onValueChange(v as TValue) : undefined}
    >
      <TabsList
        className={cn("grid w-full", colsClass, classNames?.list)}
        style={
          colsClass ? undefined : { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }
        }
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={classNames?.trigger}
          >
            {item.icon}
            {item.label}
          </TabsTrigger>
        ))}
        {indicator && <TabsIndicator />}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value} className={classNames?.content}>
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
```

`index.ts`: `export const Tabs = Object.assign(TabsHybrid, { Root: TabsRoot, List: TabsList, … })`.
Existing `<Tabs>…</Tabs>` compound usage keeps working unchanged (no `items` → compound).
Verify the exact class list against the upstream tabs demo before finalizing.

---

## 8. Golden markup tests (the safety net for "identical")

Because source is no longer byte-exact, fidelity is proven by comparing rendered DOM.

Setup (dev dependencies only, list them in the plan and wait for approval):
`vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`.

1. **Baseline BEFORE any refactor** — a separate commit:
   - render every `playground/examples/*.tsx` in jsdom, snapshot `document.body.innerHTML`
   - for overlay examples, open them (click the first trigger with user-event) and
     snapshot the open state too (portals render into `document.body`)
   - normalize before snapshot: strip Radix auto ids (`radix-:r…:`, `:r…:`), strip
     `data-slot`, sort attributes
   - store as `tests/golden/<example>.html`
2. **After each component refactor**:
   - all existing golden snapshots must be byte-identical → proves compound parts unchanged
   - add a props-mode test: the props-driven example with default options must produce the
     **same normalized markup** as the upstream demo example (or document each intentional
     difference in the test with a comment)
3. Add `npm run test` and include it in `npm run verify`.
4. `check:classes` and `check:tokens` stay as they are.

This also closes the "no tests" open issue in `plan.md`.

---

## 9. Scope and order

1. Infrastructure: `use-controllable-state`, golden test setup + baseline commit
2. Dialog (Strategy B — reference for overlays)
3. Tabs (Strategy A — reference for collection components)
4. Sheet, Drawer
5. Tooltip, Popover, HoverCard
6. Accordion, Collapsible
7. Select, RadioGroup, DropdownMenu
8. Alert, Card, Avatar
9. Table, Command

Skipped (already single-component): Button, Input, Textarea, Label, Checkbox, Switch,
Separator, AspectRatio, Badge, Skeleton, Progress. Label + control + description + error
becomes a `FormItemLayout`-style fragment later (check upstream `ui-patterns` first).

Remaining Faza 5 atoms (Sonner, Calendar, Chart, Form, Sidebar, Resizable, Input OTP):
port as before (visual + behavior identical, upstream demo as reference), add golden
snapshots, then hybridize in the same phase.

Fragments: before inventing a props-driven composition, check whether upstream
`packages/ui-patterns` already has one (confirmation dialog, `FormItemLayout`,
`InfoTooltip`, `Admonition`, `MultiSelect`, `DatePicker`) and match its design and
prop names.

---

## 10. Playground

- For each hybrid component add:
  - `<name>-props-demo.tsx` — minimal props usage
  - `<name>-props-render-fn-demo.tsx` — render-function slot using internal state
    (only where the component has one)
- Existing compound demos stay; Strategy B components get their root usage migrated
  (`<Dialog>` → `<Dialog.Root>` or `<DialogRoot>`)
- In each section, show "Compound" and "Props" as separate Preview/Code blocks
- The props demo with default options must look identical to the compound upstream demo

---

## 11. plan.md updates required

Add to the decisions journal (next free numbers):
- Identical = design + behavior, not source. Script-based byte-exact porting (#13) is
  superseded for existing atoms; upstream re-sync is no longer a goal
- Hybrid API in place (no separate entry)
- Strategy A (additive root, discriminated union) vs Strategy B (renamed root) + list
- Golden markup tests as the fidelity guarantee
- Source attribution in `NOTICE.md`; review file-level notices before distribution

Update: structure section (`-parts.tsx` files, `tests/`), verification section
(`npm run test`), open issues (remove "no tests"), public export count, bundle sizes.
Also update `docs/codex-prompt.md`.

---

## 12. Workflow

**Turn 1 — plan only, no code.** Return:
1. Per component: current exports, upstream demo markup summary, chosen strategy
   (A/B) with the exact discriminator rule, proposed props table
2. Golden test setup: dev deps, normalization rules, how overlays are opened
3. List of playground files affected by Strategy B renames
4. Proposed decisions-journal rows
5. Open questions

Wait for approval.

**Turn 2 — golden baseline only.** Test setup + baseline snapshots, no component changes.
All tests green.

**Then one component per turn** in §9 order:
1. Split into `-parts.tsx` + hybrid file + `index.ts`
2. Update `src/index.ts` exports
3. Playground examples (+ Strategy B migrations)
4. Golden tests: baseline unchanged + new props-mode test
5. `npx tsc -b`, `npm run verify` — all green
6. Update `docs/plan.md` and `docs/codex-prompt.md`

Windows: stop the dev server before moving/renaming folders; use PowerShell `Move-Item`,
not Git Bash `mv`.

---

## 13. Anti-patterns

- Changing any class string, element type, ARIA or data attribute of an existing part
- Props-driven code importing Radix / cmdk / vaul directly
- Detecting mode by `child.type`
- Strategy A with an ambiguous discriminator
- New classes, tokens, CSS files or runtime dependencies
- Dynamic Tailwind class names (`grid-cols-${n}`)
- Re-declaring part variant unions instead of deriving them
- Boolean prop explosion (`hideHeader`, `footerAlign`, …) — use `null` slots,
  `classNames`, `slotProps`, or compound mode
- More than ~15 first-class props on one component
- `useEffect` to sync controlled / uncontrolled state
- Inline `[]` / `{}` defaults that break memoization
- `string`-only content props, `any`, unexplained non-null assertions
- Updating golden snapshots to make a failing test pass without explaining why

---

## 14. Output format (per component turn)

1. **Analysis** — exports, upstream demo structure, strategy + discriminator
2. **Files** — full contents of every created/changed file, path as first-line comment,
   no ellipsis or "unchanged" placeholders
3. **Usage** — props minimal / props with render-function / compound
4. **Props table** — prop | type | default | description
5. **Verification** — tsc, verify, test results; golden diff = none; bundle sizes
6. **Plan diff** — exact lines added to `docs/plan.md`

---

## 15. Definition of done

- [ ] All pre-existing golden snapshots byte-identical
- [ ] Props-mode default render matches the upstream demo markup
- [ ] Compound part API unchanged (only Strategy B root renamed)
- [ ] Props code composes parts only; no headless imports
- [ ] Controlled + uncontrolled via `useControllableState`
- [ ] Slot semantics (undefined / null / node / fn) implemented
- [ ] `className`, `classNames`, `slotProps` present and typed from parts
- [ ] Namespace + named exports + types from `core`
- [ ] Strict TS, no `any`, JSDoc with `@default` on public props
- [ ] A11y preserved (Title always rendered, `aria-describedby` handled)
- [ ] Async actions: pending, `loading`, no swallowed errors
- [ ] License header on modified files
- [ ] `npx tsc -b`, `npm run verify`, `npm run test` green
- [ ] `docs/plan.md` and `docs/codex-prompt.md` updated
