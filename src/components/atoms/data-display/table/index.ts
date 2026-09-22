import { TableHybrid } from './table'
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableHeadSort,
  TableRoot,
  TableRow,
} from './table-parts'

export const Table = Object.assign(TableHybrid, {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  HeadSort: TableHeadSort,
  Cell: TableCell,
  Caption: TableCaption,
})

export {
  TableRoot,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableHeadSort,
  TableRow,
} from './table-parts'
export type { TableRootProps, TableHeadSortProps } from './table-parts'
export type { TableProps, TableColumn, TableClassNames } from './table'
