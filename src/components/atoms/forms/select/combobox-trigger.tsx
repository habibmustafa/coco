/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui/src/components/shadcn/ui/combobox-trigger.tsx
 * Changes: import paths only.
 */

'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import { getExplicitTabIndex } from '../../../../lib/get-explicit-tab-index'
import { cn } from '../../../../lib/utils'
import { selectTriggerVariants, type SelectTriggerVariantProps } from './select-trigger'

const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & SelectTriggerVariantProps
>(({ className, children, disabled, size, tabIndex, ...props }, ref) => {
  const computedTabIndex = getExplicitTabIndex(tabIndex, disabled)

  return (
    <button
      ref={ref}
      type="button"
      role="combobox"
      disabled={disabled}
      className={cn(selectTriggerVariants({ size }), className)}
      tabIndex={computedTabIndex}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate text-left">{children}</span>
      <ChevronDown
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-foreground-lighter"
        strokeWidth={1.5}
      />
    </button>
  )
})
ComboboxTrigger.displayName = 'ComboboxTrigger'

export { ComboboxTrigger }
