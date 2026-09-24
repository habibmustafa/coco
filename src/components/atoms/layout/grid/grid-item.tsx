/*
 * coco-specific layout primitive — no upstream counterpart; see box.tsx and docs/plan.md #37.
 */
import * as React from 'react'

import { cn } from '../../../../lib/utils'
import { Box, type BoxProps } from '../box'
import { baseClass, COL_SPAN, COL_START, ORDER, ROW_SPAN } from '../layout-classes'
import type { ColSpan, ColStart, Order, RowSpan } from '../layout-types'

export type GridItemProps<E extends React.ElementType = 'div'> = Omit<
  BoxProps<E>,
  'colSpan' | 'rowSpan'
> & {
  colSpan?: ColSpan
  rowSpan?: RowSpan
  colStart?: ColStart
  order?: Order
}

export function GridItem<E extends React.ElementType = 'div'>({
  colSpan,
  rowSpan,
  colStart,
  order,
  className,
  ...props
}: GridItemProps<E>) {
  return (
    <Box<E>
      {...(props as BoxProps<E>)}
      className={cn(
        baseClass(colSpan, COL_SPAN),
        baseClass(rowSpan, ROW_SPAN),
        baseClass(colStart, COL_START),
        baseClass(order, ORDER),
        className
      )}
    />
  )
}
