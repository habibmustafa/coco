import { ComponentPreview } from './component-preview'
import { Preview, Section, Swatch } from './docs'
import { ThemeSwitcher } from './theme-switcher'
import { Badge, SonnerToaster, useTheme } from '../src'

const NAV = [
  {
    title: 'Getting started',
    items: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
    ],
  },
  {
    title: 'Atom components',
    items: [
      { id: 'accordion', label: 'Accordion' },
      { id: 'alert', label: 'Alert' },
      { id: 'aspect-ratio', label: 'Aspect Ratio' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'badge', label: 'Badge' },
      { id: 'button', label: 'Button' },
      { id: 'calendar', label: 'Calendar' },
      { id: 'card', label: 'Card' },
      { id: 'chart', label: 'Chart' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'collapsible', label: 'Collapsible' },
      { id: 'command', label: 'Command' },
      { id: 'dialog', label: 'Dialog' },
      { id: 'drawer', label: 'Drawer' },
      { id: 'dropdown-menu', label: 'Dropdown Menu' },
      { id: 'form', label: 'Form' },
      { id: 'hover-card', label: 'Hover Card' },
      { id: 'input', label: 'Input' },
      { id: 'label', label: 'Label' },
      { id: 'popover', label: 'Popover' },
      { id: 'progress', label: 'Progress' },
      { id: 'radio-group', label: 'Radio Group' },
      { id: 'select', label: 'Select' },
      { id: 'separator', label: 'Separator' },
      { id: 'sheet', label: 'Sheet' },
      { id: 'sidebar', label: 'Sidebar' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'sonner', label: 'Sonner' },
      { id: 'switch', label: 'Switch' },
      { id: 'table', label: 'Table' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'textarea', label: 'Textarea' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  },
]

export function App() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="min-h-screen bg-studio text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-studio/95 backdrop-blur-sm supports-backdrop-filter:bg-studio/60 relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-default/70 to-transparent"
        />
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <a href="#" aria-label="coco — ana səhifə" className="focus-ring rounded-sm">
              <img src="/coco-logo.svg" alt="coco" width={84} height={26} className="dark:invert" />
            </a>
            <Badge variant="secondary">design system</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success" className="hidden sm:inline-flex">
              17 hybrid · 33 atoms
            </Badge>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-14 z-30 hidden h-[calc(100vh-3.5rem)] shrink-0 overflow-y-auto border-r px-6 md:block">
          <nav className="flex min-w-[220px] flex-col gap-6 py-6 lg:py-8">
            {NAV.map((group) => (
              <div key={group.title} className="flex flex-col gap-2">
                <p className="font-mono text-xs uppercase text-foreground-muted">{group.title}</p>
                {group.items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm text-foreground-light transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 scroll-mt-14 px-6 py-8 outline-hidden md:px-10">
          <div className="mx-auto max-w-4xl">
            <h1 className="scroll-m-20 text-4xl tracking-tight">Components</h1>
            <p className="mt-2 text-lg text-foreground-light">
              Ported from the Supabase design system. Tokens, variants and markup match upstream.
            </p>
            <div role="none" className="mt-6 mb-6 h-px w-full shrink-0 bg-border-muted" />

            <Section
              id="colors"
              title="Colors"
              description="Semantic tokens derived in OKLCH from a single hue, surface and contrast input."
            >
              <Preview label="Surfaces" align="start">
                <Swatch token="bg-background" className="bg-background" />
                <Swatch token="bg-surface-100" className="bg-surface-100" />
                <Swatch token="bg-surface-200" className="bg-surface-200" />
                <Swatch token="bg-surface-300" className="bg-surface-300" />
                <Swatch token="bg-overlay" className="bg-overlay" />
              </Preview>
              <Preview label="Brand & status" align="start">
                <Swatch token="bg-brand-default" className="bg-brand-default" />
                <Swatch token="bg-brand-400" className="bg-brand-400" />
                <Swatch token="bg-primary" className="bg-primary" />
                <Swatch token="bg-warning" className="bg-warning" />
                <Swatch token="bg-destructive" className="bg-destructive" />
              </Preview>
              <Preview label="Foreground & border" align="start">
                <Swatch token="bg-foreground" className="bg-foreground" />
                <Swatch token="bg-foreground-light" className="bg-foreground-light" />
                <Swatch token="bg-foreground-muted" className="bg-foreground-muted" />
                <Swatch token="bg-border" className="bg-border" />
                <Swatch token="bg-border-stronger" className="bg-border-stronger" />
              </Preview>
            </Section>

            <Section
              id="typography"
              title="Typography"
              description="Inter-tuned scale: text-sm is 13px and text-base 15px, with normal weight at 450."
            >
              <Preview label="Scale" align="start">
                <div className="flex flex-col gap-2">
                  <p className="text-2xl">text-2xl — heading</p>
                  <p className="text-base">text-base — body</p>
                  <p className="text-sm text-foreground-light">text-sm — foreground-light</p>
                  <p className="text-xs text-foreground-lighter">text-xs — foreground-lighter</p>
                  <p className="font-mono text-xs uppercase text-foreground-muted">
                    font-mono — labels
                  </p>
                </div>
              </Preview>
            </Section>

            <Section
              id="accordion"
              title="Accordion"
              description="Disclosure list with animated height transitions."
            >
              <ComponentPreview
                name="accordion-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'accordion-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'accordion-demo' },
                ]}
              />
            </Section>

            <Section
              id="alert"
              title="Alert"
              description="Tinted container with an optional icon, title and description."
            >
              <ComponentPreview
                name="alert-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'alert-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'alert-variants' },
                ]}
              />
            </Section>

            <Section
              id="aspect-ratio"
              title="Aspect Ratio"
              description="Keeps embedded content at a fixed ratio."
            >
              <ComponentPreview name="aspect-ratio-demo" />
            </Section>

            <Section
              id="avatar"
              title="Avatar"
              description="Image with a fallback shown while it loads or when it fails."
            >
              <ComponentPreview
                name="avatar-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'avatar-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'avatar-demo' },
                ]}
              />
            </Section>

            <Section
              id="badge"
              title="Badge"
              description="Uppercase pill used for status; five variants."
            >
              <ComponentPreview name="badge-variants" />
            </Section>

            <Section
              id="button"
              title="Button"
              description="Nine variants, five sizes, icons on either side, loading and block states."
            >
              <ComponentPreview name="button-variants" label="Variants" />
              <ComponentPreview name="button-sizes" label="Sizes" />
              <ComponentPreview name="button-icons" label="With icons" />
              <ComponentPreview name="button-states" label="States" />
              <ComponentPreview name="button-block" label="Block" />
            </Section>

            <Section
              id="calendar"
              title="Calendar"
              description="Single and range date selection built on React DayPicker."
            >
              <ComponentPreview name="calendar-demo" />
            </Section>

            <Section
              id="card"
              title="Card"
              description="Panel with border-separated header, content and footer sections."
            >
              <ComponentPreview
                name="card-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'card-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'card-demo' },
                ]}
              />
            </Section>

            <Section
              id="chart"
              title="Chart"
              description="Responsive Recharts wrapper with theme-aware colour configuration, tooltips and legends."
            >
              <ComponentPreview
                name="chart-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'chart-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'chart-bar-demo' },
                ]}
              />
            </Section>

            <Section
              id="checkbox"
              title="Checkbox"
              description="Sunk control surface that inverts to the foreground colour when checked."
            >
              <ComponentPreview name="checkbox-demo" />
            </Section>

            <Section
              id="collapsible"
              title="Collapsible"
              description="Single disclosure region without the list chrome."
            >
              <ComponentPreview
                name="collapsible-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'collapsible-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'collapsible-demo' },
                ]}
              />
            </Section>

            <Section
              id="command"
              title="Command"
              description="Searchable command menu with grouped items, shortcuts and dialog composition."
            >
              <ComponentPreview
                name="command-props-demo"
                label="Inline"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'command-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'command-demo' },
                ]}
              />
              <ComponentPreview
                name="command-dialog-props-demo"
                label="Dialog"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'command-dialog-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'command-dialog' },
                ]}
              />
            </Section>

            <Section
              id="dialog"
              title="Dialog"
              description="Modal built on Radix, with header, section and footer slots."
            >
              <ComponentPreview
                name="dialog-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'dialog-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'dialog-demo' },
                ]}
              />
            </Section>

            <Section
              id="drawer"
              title="Drawer"
              description="Touch-friendly sliding panel with directional layouts and drag gestures."
            >
              <ComponentPreview
                name="drawer-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'drawer-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'drawer-demo' },
                ]}
              />
            </Section>

            <Section
              id="dropdown-menu"
              title="Dropdown Menu"
              description="Menu with labels, separators, shortcuts and submenus."
            >
              <ComponentPreview
                name="dropdown-menu-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'dropdown-menu-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'dropdown-menu-demo' },
                ]}
              />
            </Section>

            <Section
              id="form"
              title="Form"
              description="React Hook Form composition with accessible labels, descriptions and animated validation messages."
            >
              <ComponentPreview name="input-form" />
            </Section>

            <Section
              id="hover-card"
              title="Hover Card"
              description="Richer preview surface shown after a hover delay."
            >
              <ComponentPreview
                name="hover-card-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'hover-card-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'hover-card-demo' },
                ]}
              />
            </Section>

            <Section
              id="input"
              title="Input"
              description="Sunk field surface with the shared size scale and an aria-invalid state."
            >
              <ComponentPreview name="input-sizes" label="Sizes" />
              <ComponentPreview name="input-states" label="States" />
            </Section>

            <Section
              id="label"
              title="Label"
              description="Radix label bound to a control; dims when its peer is disabled."
            >
              <ComponentPreview name="label-demo" />
            </Section>

            <Section
              id="popover"
              title="Popover"
              description="Anchored surface for small forms and controls."
            >
              <ComponentPreview
                name="popover-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'popover-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'popover-demo' },
                ]}
              />
            </Section>

            <Section
              id="progress"
              title="Progress"
              description="Determinate bar filled with the foreground colour."
            >
              <ComponentPreview name="progress-demo" />
            </Section>

            <Section
              id="radio-group"
              title="Radio Group"
              description="Standard items, plus the large card-style item used for pickers."
            >
              <ComponentPreview
                name="radio-group-props-demo"
                label="Items"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'radio-group-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'radio-group-demo' },
                ]}
              />
              <ComponentPreview
                name="radio-group-large-props-demo"
                label="Large items"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'radio-group-large-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'radio-group-large' },
                ]}
              />
            </Section>

            <Section
              id="select"
              title="Select"
              description="Radix select on the raised control surface, with grouped items and a separator."
            >
              <ComponentPreview
                name="select-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'select-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'select-demo' },
                ]}
              />
              <ComponentPreview
                name="select-sizes-props-demo"
                label="Sizes"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'select-sizes-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'select-sizes' },
                ]}
              />
              <ComponentPreview
                name="select-groups-props-demo"
                label="Groups"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'select-groups-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'select-groups' },
                ]}
              />
            </Section>

            <Section
              id="separator"
              title="Separator"
              description="One-pixel divider in either orientation."
            >
              <ComponentPreview name="separator-demo" />
            </Section>

            <Section
              id="sheet"
              title="Sheet"
              description="Same primitive as Dialog, anchored to an edge of the viewport."
            >
              <ComponentPreview
                name="sheet-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'sheet-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'sheet-demo' },
                ]}
              />
            </Section>

            <Section
              id="sidebar"
              title="Sidebar"
              description="Responsive navigation shell with collapsible icon mode, mobile sheet and tooltip support."
            >
              <ComponentPreview name="sidebar-demo" />
            </Section>

            <Section
              id="skeleton"
              title="Skeleton"
              description="Pulsing placeholder for content that is still loading."
            >
              <ComponentPreview name="skeleton-demo" />
            </Section>

            <Section
              id="sonner"
              title="Sonner"
              description="Theme-aware toast stack with Supabase status icons and button variants."
            >
              <ComponentPreview name="sonner-demo" />
            </Section>

            <Section
              id="switch"
              title="Switch"
              description="Three sizes; the checked track uses the brand fill."
            >
              <ComponentPreview name="switch-sizes" label="Sizes" />
              <ComponentPreview name="switch-states" label="States" />
            </Section>

            <Section
              id="table"
              title="Table"
              description="Responsive data table with scroll shadows, sortable headers and an optional sticky last column."
            >
              <ComponentPreview
                name="table-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'table-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'table-demo' },
                ]}
              />
            </Section>

            <Section
              id="tabs"
              title="Tabs"
              description="Tab list with an animated indicator driven by useTabIndicator."
            >
              <ComponentPreview
                name="tabs-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'tabs-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'tabs-demo' },
                ]}
              />
            </Section>

            <Section
              id="textarea"
              title="Textarea"
              description="Multi-line field sharing the Input surface, with an aria-invalid state."
            >
              <ComponentPreview name="textarea-states" />
            </Section>

            <Section
              id="tooltip"
              title="Tooltip"
              description="Short hint on hover or focus; requires a TooltipProvider."
            >
              <ComponentPreview
                name="tooltip-props-demo"
                codeVariants={[
                  { id: 'props', label: 'Props-driven', name: 'tooltip-props-demo' },
                  { id: 'compound', label: 'Compound', name: 'tooltip-demo' },
                ]}
              />
            </Section>
          </div>
        </main>
      </div>
      <SonnerToaster theme={resolvedTheme} />
    </div>
  )
}
