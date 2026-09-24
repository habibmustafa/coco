import { EllipsisVertical, Pencil, Trash2, User } from 'lucide-react'

import {
  Button,
  Card,
  DropdownMenu,
  Table,
} from '../../../src'

const users = [
  {
    name: 'Feathers McGraw',
    email: 'feathers@example.com',
  },
  {
    name: 'Piella Bakewell',
    email: 'piella@example.com',
  },
  {
    name: 'Wendolene Ramsbottom',
    email: 'wendolene@example.com',
  },
]

export default function TableActionsPropsDemo() {
  return (
    <Card.Root className="w-full">
      <Table
        rowKey={(row) => row.email}
        data={users}
        columns={[
          {
            key: 'icon',
            header: <span className="sr-only">Icon</span>,
            headerClassName: 'w-1',
            cellClassName: 'w-1',
            render: () => <User size={16} className="text-foreground-muted" />,
          },
          {
            key: 'name',
            header: 'Name',
            render: (row) => row.name,
          },
          {
            key: 'email',
            header: 'Email',
            cellClassName: 'text-foreground-lighter',
            render: (row) => row.email,
          },
          {
            key: 'actions',
            header: <span className="sr-only">Actions</span>,
            headerClassName: 'w-1',
            cellClassName: 'flex items-center gap-x-2',
            render: () => (
              <>
                <Button size="tiny" className="hit-area-2">
                  Inspect
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
                      <Pencil size={14} />
                      <span>Edit user</span>
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
