/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui/src/components/shadcn/ui/collapsible.tsx
 * Changes: import paths only.
 */

'use client'

import { Collapsible as CollapsiblePrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '../../../../lib/utils'
import { getExplicitTabIndex } from '../../../../lib/get-explicit-tab-index'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, disabled, tabIndex, ...props }, ref) => {
  const computedTabIndex = getExplicitTabIndex(tabIndex, disabled)

  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      className={cn('relative focus-inset', className)}
      {...props}
      disabled={disabled}
      tabIndex={computedTabIndex}
    />
  )
})
CollapsibleTrigger.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
