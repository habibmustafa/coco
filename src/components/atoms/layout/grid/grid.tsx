/*
 * coco-specific layout primitive — no upstream counterpart; see box.tsx and docs/plan.md #37.
 */
import * as React from 'react'

import { cn } from '../../../../lib/utils'
import { Box, type BoxProps } from '../box'
import {
  ALIGN,
  baseClass,
  GAP,
  GAP_X,
  GAP_Y,
  GRID_COLUMNS,
  GRID_FLOW,
  GRID_ROWS,
  JUSTIFY,
  responsiveClasses,
} from '../layout-classes'
import type {
  FlexAlign,
  FlexJustify,
  GridColumns,
  GridFlow,
  GridRows,
  Responsive,
  Space,
} from '../layout-types'

export type GridProps<E extends React.ElementType = 'div'> = BoxProps<E> & {
  columns?: Responsive<GridColumns>
  rows?: GridRows
  /** Applies to both axes unless columnGap/rowGap override it. */
  gap?: Responsive<Space>
  columnGap?: Responsive<Space>
  rowGap?: Responsive<Space>
  align?: Responsive<FlexAlign>
  justify?: Responsive<FlexJustify>
  flow?: GridFlow
  /** Render `inline-grid` instead of `grid`. */
  inline?: boolean
}

export function Grid<E extends React.ElementType = 'div'>({
  columns,
  rows,
  gap,
  columnGap,
  rowGap,
  align,
  justify,
  flow,
  inline,
  className,
  ...props
}: GridProps<E>) {
  return (
    <Box<E>
      {...(props as BoxProps<E>)}
      className={cn(
        inline ? 'inline-grid' : 'grid',
        ...responsiveClasses(columns, GRID_COLUMNS),
        baseClass(rows, GRID_ROWS),
        baseClass(flow, GRID_FLOW),
        ...responsiveClasses(gap, GAP),
        ...responsiveClasses(columnGap, GAP_X),
        ...responsiveClasses(rowGap, GAP_Y),
        ...responsiveClasses(align, ALIGN),
        ...responsiveClasses(justify, JUSTIFY),
        className
      )}
    />
  )
}
