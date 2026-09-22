import { Monitor, Moon, Sun } from 'lucide-react'

import { cn, singleThemes, useTheme, type Theme } from '../src'

const ICONS: Record<string, typeof Sun> = {
  system: Monitor,
  dark: Moon,
  light: Sun,
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center gap-0.5 rounded-md border border-border bg-surface-100 p-0.5"
    >
      {singleThemes.map(({ name, value }) => {
        const Icon = ICONS[value]
        const isActive = theme === value

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            title={name}
            onClick={() => setTheme(value as Theme)}
            className={cn(
              'focus-ring inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-colors',
              isActive
                ? 'bg-surface-300 text-foreground'
                : 'text-foreground-lighter hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{name}</span>
          </button>
        )
      })}
    </div>
  )
}
