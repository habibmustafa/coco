/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui/src/components/shadcn/ui/label.tsx
 * Changes: import paths only.
 */

'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Label as LabelPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '../../../../lib/utils'

const labelVariants = cva(
  'text-sm text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
