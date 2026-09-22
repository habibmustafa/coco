import { ComponentPreview } from './component-preview'
import { Preview, Section, Swatch } from './docs'
import { ThemeSwitcher } from './theme-switcher'

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
      { id: 'card', label: 'Card' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'collapsible', label: 'Collapsible' },
      { id: 'dialog', label: 'Dialog' },
      { id: 'dropdown-menu', label: 'Dropdown Menu' },
      { id: 'hover-card', label: 'Hover Card' },
      { id: 'input', label: 'Input' },
      { id: 'label', label: 'Label' },
      { id: 'popover', label: 'Popover' },
      { id: 'progress', label: 'Progress' },
      { id: 'radio-group', label: 'Radio Group' },
      { id: 'select', label: 'Select' },
      { id: 'separator', label: 'Separator' },
      { id: 'sheet', label: 'Sheet' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'switch', label: 'Switch' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'textarea', label: 'Textarea' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  },
]

export function App() {
  return (
    <div className="min-h-screen bg-studio text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-studio/95 backdrop-blur-sm supports-backdrop-filter:bg-studio/60">
        <div className="flex h-10 items-center justify-between px-6">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium">core</span>
            <span className="text-sm text-foreground-lighter">design system</span>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-10 z-30 hidden h-[calc(100vh-3rem)] shrink-0 overflow-y-auto border-r px-6 md:block">
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

        <main className="min-w-0 flex-1 scroll-mt-12 px-6 py-8 outline-hidden md:px-10">
          <div className="max-w-3xl">
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
              <ComponentPreview name="accordion-demo" />
            </Section>

            <Section
              id="alert"
              title="Alert"
              description="Tinted container with an optional icon, title and description."
            >
              <ComponentPreview name="alert-variants" />
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
              <ComponentPreview name="avatar-demo" />
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
              id="card"
              title="Card"
              description="Panel with border-separated header, content and footer sections."
            >
              <ComponentPreview name="card-demo" />
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
              <ComponentPreview name="collapsible-demo" />
            </Section>

            <Section
              id="dialog"
              title="Dialog"
              description="Modal built on Radix, with header, section and footer slots."
            >
              <ComponentPreview name="dialog-demo" />
            </Section>

            <Section
              id="dropdown-menu"
              title="Dropdown Menu"
              description="Menu with labels, separators, shortcuts and submenus."
            >
              <ComponentPreview name="dropdown-menu-demo" />
            </Section>

            <Section
              id="hover-card"
              title="Hover Card"
              description="Richer preview surface shown after a hover delay."
            >
              <ComponentPreview name="hover-card-demo" />
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
              <ComponentPreview name="popover-demo" />
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
              <ComponentPreview name="radio-group-demo" label="Items" />
              <ComponentPreview name="radio-group-large" label="Large items" />
            </Section>

            <Section
              id="select"
              title="Select"
              description="Radix select on the raised control surface, with grouped items and a separator."
            >
              <ComponentPreview name="select-sizes" label="Sizes" />
              <ComponentPreview name="select-groups" label="Groups" />
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
              <ComponentPreview name="sheet-demo" />
            </Section>

            <Section
              id="skeleton"
              title="Skeleton"
              description="Pulsing placeholder for content that is still loading."
            >
              <ComponentPreview name="skeleton-demo" />
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
              id="tabs"
              title="Tabs"
              description="Tab list with an animated indicator driven by useTabIndicator."
            >
              <ComponentPreview name="tabs-demo" />
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
              <ComponentPreview name="tooltip-demo" />
            </Section>
          </div>
        </main>
      </div>
    </div>
  )
}
