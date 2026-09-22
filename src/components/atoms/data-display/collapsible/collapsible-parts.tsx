/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui/src/components/shadcn/ui/collapsible.tsx
 * Changes: hybrid API migration (docs/hybrid-api-migration.md) — root renamed
 * Collapsible → CollapsibleRoot so the atom's default export can become props-driven.
 * Compound parts, class strings, ARIA and data attributes are unchanged.
 */
// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.

'use client'

import { Collapsible as CollapsiblePrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '../../../../lib/utils'
import { getExplicitTabIndex } from '../../../../lib/get-explicit-tab-index'

const CollapsibleRoot = CollapsiblePrimitive.Root

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

export { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent }
