/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui/src/components/shadcn/ui/hover-card.tsx
 * Changes: hybrid API migration (docs/hybrid-api-migration.md) — root renamed
 * HoverCard → HoverCardRoot so the atom's default export can become props-driven.
 * Compound parts, class strings, ARIA and data attributes are unchanged.
 */
// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.

'use client'

import { HoverCard as HoverCardPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '../../../../lib/utils'

const HoverCardRoot = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
    animate?: 'zoom-in' | 'slide-in'
  }
>(({ className, align = 'center', animate = 'zoom-in', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-64 rounded-md border bg-overlay p-4 text-popover-foreground shadow-md outline-hidden',
        animate === 'zoom-in'
          ? 'animate-in zoom-in-[99%]'
          : 'animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        className
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCardRoot, HoverCardContent, HoverCardTrigger }
