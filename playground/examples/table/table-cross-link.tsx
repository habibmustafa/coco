import { Copy, DatabaseZap, Edit2, EllipsisVertical, Trash2 } from 'lucide-react'
import { Button, Card, DropdownMenu, Table } from '../../../src'

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

export default function TableCrossLink() {
  return (
    <Card.Root className="w-full">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-1">
              <span className="sr-only">Icon</span>
            </Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Table</Table.Head>
            <Table.Head>Function</Table.Head>
            <Table.Head className="w-1">
              <span className="sr-only">Actions</span>
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {triggers.map((trigger) => (
            <Table.Row key={trigger.name}>
              <Table.Cell className="w-1">
                <DatabaseZap size={16} className="text-foreground-muted" />
              </Table.Cell>
              <Table.Cell>{trigger.name}</Table.Cell>
              <Table.Cell>
                <a
                  className="text-link-table-cell text-foreground-lighter hover:text-foreground duration-100"
                  // Demo purposes only
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  {trigger.table}
                </a>
              </Table.Cell>
              <Table.Cell>
                <a
                  className="text-link-table-cell text-foreground-lighter hover:text-foreground duration-100"
                  // Demo purposes only
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  {trigger.function}
                </a>
              </Table.Cell>
              <Table.Cell className="flex items-center gap-x-2">
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
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  )
}
