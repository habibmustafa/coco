import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/*
 * `spacing: ['card', 'content']` mirrors the upstream cn() config so the
 * --spacing-card / --spacing-content scales declared in the vendored theme.css
 * are recognised as padding/margin utilities and de-duplicated correctly.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ['card', 'content'],
    },
  },
})

export type { ClassValue }

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
