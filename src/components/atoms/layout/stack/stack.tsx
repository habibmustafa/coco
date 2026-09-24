/*
 * coco-specific layout primitive — no upstream counterpart; see box.tsx and docs/plan.md #37.
 *
 * Stack is the opinionated preset of Flex: 1-dimensional, vertical by default, with a gap
 * that is always set. Use Flex when you need full control over both axes.
 */
import * as React from 'react'

import { Flex, type FlexProps } from '../flex'
import { Separator } from '../separator'
import type { BoxProps } from '../box'
import type { FlexAlign, FlexJustify, FlexWrap, Responsive, Space } from '../layout-types'

export type StackProps<E extends React.ElementType = 'div'> = BoxProps<E> & {
  /** @default "column" */
  direction?: Responsive<'row' | 'column'>
  align?: Responsive<FlexAlign>
  justify?: Responsive<FlexJustify>
  wrap?: FlexWrap
  /** @default "md" */
  gap?: Responsive<Space>
  /**
   * `true` draws a Separator between children (horizontal for a column stack, vertical for a
   * row stack); pass a node to use your own element instead.
   */
  divider?: boolean | React.ReactNode
}

export function Stack<E extends React.ElementType = 'div'>({
  direction = 'column',
  gap = 'md',
  divider,
  children,
  ...props
}: StackProps<E>) {
  const orientation = direction === 'row' ? 'vertical' : 'horizontal'
  const dividerNode = divider === true ? <Separator orientation={orientation} /> : divider

  const content =
    dividerNode == null
      ? children
      : React.Children.toArray(children).map((child, index) => (
          <React.Fragment key={index}>
            {index > 0 && dividerNode}
            {child}
          </React.Fragment>
        ))

  return (
    <Flex<E> direction={direction} gap={gap} {...(props as FlexProps<E>)}>
      {content}
    </Flex>
  )
}
