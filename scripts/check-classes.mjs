/*
 * Reports utility classes used in the source that produce no rule in the built CSS.
 *
 * Tailwind only emits what it recognises, and a vendored custom utility only exists
 * if its CSS file is actually imported. So a class with no matching rule means either
 * a typo or a missing import — both render as silently-unstyled markup.
 *
 * Run after `npm run build:lib`.
 */

import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const CSS = 'dist/styles.css'
const SOURCES = ['src/**/*.tsx', 'playground/**/*.tsx']

// Tokens that look like class names rather than prose, ids or paths.
const CANDIDATE = /^[a-z@][a-z0-9@:_\-[\]()/.,%!#&'*+<>=?|$]*$/
const LOOKS_LIKE_UTILITY = /[-:[]/

function escapeClass(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, (char) => `\\${char}`)
}

// Demo ids, data-slot values and other strings that sit next to a className but are
// not classes. Keeping this list short is the point: a clean report means a real miss
// stands out instead of being buried.
const NOT_CLASSES = new Set([
  'after:easing-[0.24,',
  'alert-description',
  'alert-title',
  'aria-describedby',
  'aria-disabled',
  'aria-invalid',
  'aria-label=',
  'aspect-ratio',
  'block-end',
  'block-start',
  'before:easing-[0.24,',
  'dialog-demo-email',
  'dialog-props-render-fn-email',
  'drawer-content',
  'error-display-title',
  // Upstream typo (Bootstrap-style name; Tailwind's own utility is `italic`) — not a real
  // utility on their site either, kept verbatim for fidelity to the ported markup.
  'font-italic',
  // CodeBlock: `--color-surface` (unsuffixed, distinct from the `surface-75..400` scale we do
  // have) isn't a token check-tokens.mjs finds on the live site either — a dead class there
  // too, kept verbatim. `code-block` is a bare CSS hook with no rule in the public design
  // system bundle (Studio-dashboard-only styling, out of reach for this port).
  'border-surface',
  'code-block',
  'language-pgsql',
  'var(--background-selection)',
  // TimestampInfo/StatusCode: same category as font-italic/border-surface above — upstream
  // typos that never resolved to a real utility on their own site either. `items-right` isn't
  // a Tailwind utility (only `items-end`/`justify-end` are); `rounded-l-0` isn't valid Tailwind
  // radius syntax (the scale is none/sm/md/lg/full, not numeric).
  'items-right',
  'rounded-l-0',
  // Resizable: `data-slot` values, not classes.
  'resizable-panel',
  'resizable-panel-group',
  // Row: a CSS custom property read out of a JS `style` object, not a class.
  'var(--column-width)',
  'calc(var(--radix-popover-content-available-height)',
  "hsl(var(--brand-default))",
  'inline-combobox',
  'multi-select',
  'sheet-demo-name',
  'short-lived',
  'third-party',
  'drawer-description',
  'drawer-footer',
  'drawer-header',
  'drawer-overlay',
  'drawer-portal',
  'drawer-title',
  'eu-west',
  'flex-start',
  'group/sidebar-wrapper',
  'group-action',
  'group-content',
  'group-label',
  'inline-end',
  'inline-start',
  'input-group',
  'input-group-addon',
  'input-group-control',
  'menu-action',
  'menu-badge',
  'menu-button',
  'menu-item',
  'menu-skeleton',
  'menu-skeleton-icon',
  'menu-skeleton-text',
  'menu-sub',
  'menu-sub-button',
  'my-project',
  'not-an-email',
  'plan-free',
  'plan-pro',
  'plan-team',
  'popover-trigger-width',
  'project-name',
  'radio-group',
  'sep-1',
  'sep-2',
  'us-east',
  'var(--color-desktop)',
  'var(--color-mobile)',
  'var(--foreground-default)',
])

// Only look at string literals near a className / cn() / cva() site, so prop values,
// package names and prose do not show up as candidates.
function classRegions(code) {
  const regions = []
  for (const match of code.matchAll(/className|\bcn\(|\bcva\(/g)) {
    regions.push(code.slice(match.index, match.index + 600))
  }
  return regions
}

function collectCandidates(file) {
  const code = readFileSync(file, 'utf8')
  const found = new Set()

  for (const match of classRegions(code).join('\n').matchAll(/(['"`])([^'"`\n]{2,400})\1/g)) {
    const literal = match[2]
    if (literal.includes('://') || literal.startsWith('.') || literal.startsWith('/')) continue

    for (const token of literal.split(/\s+/)) {
      if (!token || token.length > 80) continue
      if (!CANDIDATE.test(token)) continue
      if (!LOOKS_LIKE_UTILITY.test(token)) continue
      // A variant prefix never ends a class, so these are prose, not utilities.
      if (token.endsWith('-') || token.endsWith(':')) continue
      found.add(token)
    }
  }

  return found
}

const css = readFileSync(CSS, 'utf8')
const files = SOURCES.flatMap((pattern) => globSync(pattern))
const exampleNames = new Set(
  globSync('playground/examples/**/*.tsx').map((path) => path.split(/[\\/]/).pop().replace('.tsx', ''))
)
const candidates = new Set()
for (const file of files) for (const token of collectCandidates(file)) candidates.add(token)

const missing = [...candidates]
  .filter((name) => !NOT_CLASSES.has(name) && !exampleNames.has(name))
  .filter((name) => !css.includes(`.${escapeClass(name)}`))
  .sort()

console.log(`Scanned ${files.length} files, ${candidates.size} candidate classes.`)

if (missing.length === 0) {
  console.log('Every candidate class has a rule in the built CSS.')
  process.exit(0)
}

console.log(`\n${missing.length} without a rule (check for typos or a missing CSS import):`)
for (const name of missing) console.log(`  ${name}`)
console.log(
  '\nSome entries are expected: strings that only look like classes (prop values, ids).' +
    '\nAnything that is a real utility here renders unstyled.'
)
process.exitCode = 1
