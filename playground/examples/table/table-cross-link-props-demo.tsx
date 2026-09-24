import { Copy, DatabaseZap, Edit2, EllipsisVertical, Trash2 } from 'lucide-react'

import {
  Button,
  Card,
  DropdownMenu,
  Table,
} from '../../../src'

const triggers = [
  {
    name: 'trigger_purchase',
    table: 'stock',
    function: 'check_stock_levels',
  },
  {
    name: 'trigger_refund',
    table: 'stock',
    function: 'process_return',
  },
  {
    name: 'trigger_update',
    table: 'inventory',
    function: 'update_quantity',
  },
]

function CrossLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      className="text-link-table-cell text-foreground-lighter hover:text-foreground duration-100"
      // Demo purposes only
      href="/"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      {children}
    </a>
  )
}

export default function TableCrossLinkPropsDemo() {
  return (
    <Card.Root className="w-full">
      <Table
        rowKey={(row) => row.name}
        data={triggers}
        columns={[
          {
            key: 'icon',
            header: <span className="sr-only">Icon</span>,
            headerClassName: 'w-1',
            cellClassName: 'w-1',
            render: () => <DatabaseZap size={16} className="text-foreground-muted" />,
          },
          {
            key: 'name',
            header: 'Name',
            render: (row) => row.name,
          },
          {
            key: 'table',
            header: 'Table',
            render: (row) => <CrossLink>{row.table}</CrossLink>,
          },
          {
            key: 'function',
            header: 'Function',
            render: (row) => <CrossLink>{row.function}</CrossLink>,
          },
          {
            key: 'actions',
            header: <span className="sr-only">Actions</span>,
            headerClassName: 'w-1',
            cellClassName: 'flex items-center gap-x-2',
            render: () => (
              <>
                <Button size="tiny" icon={<Edit2 />} className="hit-area-2">
                  Edit
                </Button>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button
                      icon={<EllipsisVertical />}
                      aria-label="More actions"
                      className="w-7 hit-area-2"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content side="bottom" align="end" className="w-40">
                    <DropdownMenu.Item className="gap-x-2">
                      <Copy size={14} />
                      <span>Duplicate trigger</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="gap-x-2">
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </>
            ),
          },
        ]}
      />
    </Card.Root>
  )
}
