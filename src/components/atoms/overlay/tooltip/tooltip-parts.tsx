/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui/src/components/shadcn/ui/tooltip.tsx
 * Changes: hybrid API migration (docs/hybrid-api-migration.md) — root renamed
 * Tooltip → TooltipRoot so the atom's default export can become props-driven.
 * Compound parts, class strings, ARIA and data attributes are unchanged.
 */
// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.

'use client'

import { Tooltip as TooltipPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '../../../../lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const TooltipPortal = TooltipPrimitive.Portal

const TooltipRoot = (props: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>) => (
  <TooltipPrimitive.Root {...props} />
)

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.TooltipTrigger ref={ref} {...props} className={cn(className)} />
))

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      {...props}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-alternative px-3 py-1.5 text-xs text-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        className
      )}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>

export { TooltipRoot, TooltipContent, TooltipProvider, TooltipTrigger, TooltipPortal }
