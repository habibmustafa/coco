// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.
import type * as React from 'react'

import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from './tabs-parts'
import { cn } from '../../../../lib/utils'

const GRID_COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
} as const

export interface TabItem<TValue extends string = string> {
  value: TValue
  label: React.ReactNode
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface TabsClassNames {
  list?: string
  trigger?: string
  content?: string
}

type RootProps = React.ComponentProps<typeof TabsRoot>

type TabsItemsProps<TValue extends string> = Omit<
  RootProps,
  'value' | 'defaultValue' | 'onValueChange' | 'children'
> & {
  items: readonly TabItem<TValue>[]
  value?: TValue
  defaultValue?: TValue
  onValueChange?: (value: TValue) => void
  /** Render the animated underline, as in the upstream demo. @default true */
  indicator?: boolean
  classNames?: TabsClassNames
  children?: never
}

type TabsCompoundProps = RootProps & { items?: never }

export type TabsProps<TValue extends string = string> = TabsItemsProps<TValue> | TabsCompoundProps

export function TabsHybrid<TValue extends string = string>(props: TabsProps<TValue>) {
  if (props.items === undefined) {
    return <TabsRoot {...props} />
  }

  const { items, value, defaultValue, onValueChange, indicator = true, classNames, ...rootProps } =
    props

  const count = items.length
  const colsClass = GRID_COLS[count as keyof typeof GRID_COLS]

  return (
    <TabsRoot
      {...rootProps}
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={onValueChange ? (v) => onValueChange(v as TValue) : undefined}
    >
      <TabsList
        className={cn('grid w-full', colsClass, classNames?.list)}
        style={colsClass ? undefined : { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={classNames?.trigger}
          >
            {item.icon}
            {item.label}
          </TabsTrigger>
        ))}
        {indicator && <TabsIndicator />}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value} className={classNames?.content}>
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  )
}
