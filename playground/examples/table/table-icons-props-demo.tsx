import { User } from 'lucide-react'

import { Card, Table } from '../../../src'

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

export default function TableIconsPropsDemo() {
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
        ]}
      />
    </Card.Root>
  )
}
