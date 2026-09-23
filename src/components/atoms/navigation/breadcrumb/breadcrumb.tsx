/*
 * Hybrid API layer (docs/hybrid-api-migration.md) for Breadcrumb — Strategy A, discriminator
 * `items`. Not present upstream; follows the same shape as DropdownMenu/Select's flat
 * `items`/`options` props.
 */
import * as React from 'react'

import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbRoot,
  BreadcrumbSeparator,
} from './breadcrumb-parts'

type RootProps = React.ComponentPropsWithoutRef<typeof BreadcrumbRoot>

export interface BreadcrumbItemData {
  label: React.ReactNode
  /** Omit on the current page — it renders as non-interactive text. */
  href?: string
}

type BreadcrumbItemsModeProps = Omit<RootProps, 'children'> & {
  items: BreadcrumbItemData[]
  children?: never
}

type BreadcrumbCompoundProps = RootProps & { items?: never }

export type BreadcrumbProps = BreadcrumbItemsModeProps | BreadcrumbCompoundProps

export function BreadcrumbHybrid(props: BreadcrumbProps) {
  if (props.items === undefined) {
    return <BreadcrumbRoot {...props} />
  }

  const { items, ...rootProps } = props

  return (
    <BreadcrumbRoot {...rootProps}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}

// Re-exported so consumers building a custom row (e.g. inserting a BreadcrumbEllipsis) can
// still reach for it without dropping into the fully compound API.
export { BreadcrumbEllipsis }
