/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui/src/components/shadcn/ui/progress.tsx
 * Changes: import paths only.
 */

'use client'

import { Progress as ProgressPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '../../../../lib/utils'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-1 w-full overflow-hidden rounded-full bg-surface-300', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-foreground transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
