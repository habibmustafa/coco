// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.
import type * as React from 'react'

import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from './accordion-parts'

export interface AccordionItemData {
  value: string
  trigger: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionClassNames {
  item?: string
  trigger?: string
  content?: string
}

// Radix's own root props are a `type`-discriminated union (single value vs. string[]).
// `Omit<RootProps, ...>` would collapse that union to its common keys and lose the
// discrimination — so the two shapes are mirrored here by hand instead.
type AccordionItemsCommonProps = {
  disabled?: boolean
  dir?: 'ltr' | 'rtl'
  orientation?: 'horizontal' | 'vertical'
  className?: string
  items: readonly AccordionItemData[]
  classNames?: AccordionClassNames
  children?: never
}

type AccordionSingleItemsProps = AccordionItemsCommonProps & {
  type: 'single'
  collapsible?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

type AccordionMultipleItemsProps = AccordionItemsCommonProps & {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

type AccordionItemsProps = AccordionSingleItemsProps | AccordionMultipleItemsProps

type AccordionCompoundProps = React.ComponentProps<typeof AccordionRoot> & { items?: never }

export type AccordionProps = AccordionItemsProps | AccordionCompoundProps

export function AccordionHybrid(props: AccordionProps) {
  if (props.items === undefined) {
    return <AccordionRoot {...props} />
  }

  const { items, classNames, ...rootProps } = props

  return (
    <AccordionRoot {...rootProps}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={classNames?.item}
        >
          <AccordionTrigger className={classNames?.trigger}>{item.trigger}</AccordionTrigger>
          <AccordionContent className={classNames?.content}>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  )
}
