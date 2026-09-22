// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.
import type * as React from 'react'

import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from './table-parts'
import { cn } from '../../../../lib/utils'

export interface TableColumn<TRow> {
  key: string
  header: React.ReactNode
  render: (row: TRow) => React.ReactNode
  headerClassName?: string
  cellClassName?: string
  /** @default "left" */
  align?: 'left' | 'right'
}

export interface TableClassNames {
  caption?: string
  header?: string
  body?: string
  row?: string
  footer?: string
}

type RootProps = React.ComponentProps<typeof TableRoot>

type TableColumnsProps<TRow> = Omit<RootProps, 'children'> & {
  columns: readonly TableColumn<TRow>[]
  data: readonly TRow[]
  rowKey: (row: TRow) => string
  caption?: React.ReactNode
  /** Rendered inside TableFooter as-is — compose your own TableRow/TableCell for the summary row. */
  footer?: React.ReactNode
  classNames?: TableClassNames
  children?: never
}

type TableCompoundProps = RootProps & { columns?: never }

export type TableProps<TRow = unknown> = TableColumnsProps<TRow> | TableCompoundProps

export function TableHybrid<TRow = unknown>(props: TableProps<TRow>) {
  if (props.columns === undefined) {
    return <TableRoot {...props} />
  }

  const { columns, data, rowKey, caption, footer, classNames, ...rootProps } = props

  return (
    <TableRoot {...rootProps}>
      {caption != null && <TableCaption className={classNames?.caption}>{caption}</TableCaption>}
      <TableHeader className={classNames?.header}>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={cn(column.align === 'right' && 'text-right', column.headerClassName)}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className={classNames?.body}>
        {data.map((row) => (
          <TableRow key={rowKey(row)} className={classNames?.row}>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                className={cn(column.align === 'right' && 'text-right', column.cellClassName)}
              >
                {column.render(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {footer != null && <TableFooter className={classNames?.footer}>{footer}</TableFooter>}
    </TableRoot>
  )
}
