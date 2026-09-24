/*
 * coco-specific layout primitive — no upstream counterpart; see box.tsx and docs/plan.md #37.
 */
import * as React from 'react'

import { cn } from '../../../../lib/utils'
import { Box, type BoxProps } from '../box'
import { ALIGN, FLEX_DIRECTION, GAP, JUSTIFY, responsiveClasses } from '../layout-classes'
import type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexWrap,
  Responsive,
  Space,
} from '../layout-types'

export type FlexProps<E extends React.ElementType = 'div'> = BoxProps<E> & {
  /** @default "row" */
  direction?: Responsive<FlexDirection>
  align?: Responsive<FlexAlign>
  justify?: Responsive<FlexJustify>
  /** `true` → flex-wrap, `"reverse"` → flex-wrap-reverse, `false` → flex-nowrap. */
  wrap?: FlexWrap
  gap?: Responsive<Space>
  /** Render `inline-flex` instead of `flex`. */
  inline?: boolean
}

export function Flex<E extends React.ElementType = 'div'>({
  direction = 'row',
  align,
  justify,
  wrap,
  gap,
  inline,
  className,
  ...props
}: FlexProps<E>) {
  const wrapClass =
    wrap === true
      ? 'flex-wrap'
      : wrap === 'reverse'
        ? 'flex-wrap-reverse'
        : wrap === false
          ? 'flex-nowrap'
          : undefined

  return (
    <Box<E>
      {...(props as BoxProps<E>)}
      className={cn(
        inline ? 'inline-flex' : 'flex',
        ...responsiveClasses(direction, FLEX_DIRECTION),
        ...responsiveClasses(align, ALIGN),
        ...responsiveClasses(justify, JUSTIFY),
        wrapClass,
        ...responsiveClasses(gap, GAP),
        className
      )}
    />
  )
}
