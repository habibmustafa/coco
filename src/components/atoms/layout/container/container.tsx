/*
 * coco-specific layout primitive — no upstream counterpart; see box.tsx and docs/plan.md #37.
 *
 * Centred, bounded page-width wrapper. Upstream sizes pages with ad-hoc max-w-* utilities;
 * Container names the three widths the design system actually uses so call sites stay
 * consistent.
 */
import * as React from 'react'

import { cn } from '../../../../lib/utils'
import { Box, type BoxProps } from '../box'
import { PADDING_X_RESPONSIVE, responsiveClasses } from '../layout-classes'
import type { Responsive, Space } from '../layout-types'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'full'

const SIZE: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-full',
}

export type ContainerProps<E extends React.ElementType = 'div'> = BoxProps<E> & {
  /** @default "lg" */
  size?: ContainerSize
  /** Centre the container with `mx-auto`. @default true */
  centered?: boolean
  /** Shorthand for `padding="md"` (i.e. `px-4`). @default false */
  padded?: boolean
  /** Explicit, responsive horizontal gutter. */
  padding?: Responsive<Space>
}

export function Container<E extends React.ElementType = 'div'>({
  size = 'lg',
  centered = true,
  padded = false,
  padding,
  className,
  ...props
}: ContainerProps<E>) {
  return (
    <Box<E>
      {...(props as BoxProps<E>)}
      className={cn(
        SIZE[size],
        'w-full',
        centered && 'mx-auto',
        padded && 'px-4',
        ...responsiveClasses(padding, PADDING_X_RESPONSIVE),
        className
      )}
    />
  )
}
