/*
 * coco-specific layout primitive — no upstream counterpart; see box.tsx and docs/plan.md #37.
 */
import * as React from 'react'

import { cn } from '../../../../lib/utils'
import { Box, type BoxProps } from '../box'
import { baseClass, BASIS, GROW, ORDER, SHRINK } from '../layout-classes'
import type { FlexBasis, Grow, Order, Shrink } from '../layout-types'

export type FlexItemProps<E extends React.ElementType = 'div'> = BoxProps<E> & {
  grow?: Grow
  shrink?: Shrink
  basis?: FlexBasis
  order?: Order
}

export function FlexItem<E extends React.ElementType = 'div'>({
  grow,
  shrink,
  basis,
  order,
  className,
  ...props
}: FlexItemProps<E>) {
  return (
    <Box<E>
      {...(props as BoxProps<E>)}
      className={cn(
        baseClass(grow, GROW),
        baseClass(shrink, SHRINK),
        baseClass(basis, BASIS),
        baseClass(order, ORDER),
        className
      )}
    />
  )
}
