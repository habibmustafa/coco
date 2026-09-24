import type * as React from 'react'

import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeadSort,
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
  /**
   * Renders the header through TableHeadSort instead of plain text. Combine with the
   * table-level `sort` + `onSortChange` props; without them the indicator stays idle.
   */
  sortable?: boolean
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
  /** Current sort, `"<columnKey>:<asc|desc>"` — drives the sortable headers' indicator. */
  sort?: string
  /** Called with the clicked column key; toggle your own sort state in response. */
  onSortChange?: (column: string) => void
  /**
   * Makes every row activatable (click + Enter/Space), matching upstream's
   * `createNavigationHandler` row pattern. Ignored for clicks that land on an interactive
   * child (a button, link, or menu inside the row) — only a click on the row itself fires.
   */
  onRowClick?: (row: TRow, event: React.MouseEvent | React.KeyboardEvent) => void
  children?: never
}

/** Parses the table-level `sort` string for a given column, to drive the header's aria-sort. */
function sortDirection(sort: string | undefined, column: string): 'asc' | 'desc' | undefined {
  const [currentCol, currentOrder] = (sort ?? '').split(':')
  if (currentCol !== column) return undefined
  return currentOrder === 'asc' || currentOrder === 'desc' ? currentOrder : undefined
}

type TableCompoundProps = RootProps & { columns?: never }

export type TableProps<TRow = unknown> = TableColumnsProps<TRow> | TableCompoundProps

export function TableHybrid<TRow = unknown>(props: TableProps<TRow>) {
  if (props.columns === undefined) {
    return <TableRoot {...props} />
  }

  const {
    columns,
    data,
    rowKey,
    caption,
    footer,
    classNames,
    sort,
    onSortChange,
    onRowClick,
    ...rootProps
  } = props

  return (
    <TableRoot {...rootProps}>
      {caption != null && <TableCaption className={classNames?.caption}>{caption}</TableCaption>}
      <TableHeader className={classNames?.header}>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={cn(column.align === 'right' && 'text-right', column.headerClassName)}
              aria-sort={
                column.sortable
                  ? sortDirection(sort, column.key) === 'asc'
                    ? 'ascending'
                    : sortDirection(sort, column.key) === 'desc'
                      ? 'descending'
                      : 'none'
                  : undefined
              }
            >
              {column.sortable ? (
                <TableHeadSort
                  column={column.key}
                  currentSort={sort ?? ''}
                  onSortChange={(clicked) => onSortChange?.(clicked)}
                  className={cn(column.align === 'right' && 'justify-end')}
                >
                  {column.header}
                </TableHeadSort>
              ) : (
                column.header
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className={classNames?.body}>
        {data.map((row) => (
          <TableRow
            key={rowKey(row)}
            className={cn(onRowClick && 'relative cursor-pointer focus-inset', classNames?.row)}
            {...(onRowClick && {
              tabIndex: 0,
              onClick: (event: React.MouseEvent<HTMLTableRowElement>) => {
                if (event.currentTarget !== event.target) return
                onRowClick(row, event)
              },
              onKeyDown: (event: React.KeyboardEvent<HTMLTableRowElement>) => {
                if (event.currentTarget !== event.target) return
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onRowClick(row, event)
                }
              },
            })}
          >
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
