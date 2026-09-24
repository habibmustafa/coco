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

export default function TableIcons() {
  return (
    <Card.Root className="w-full">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-1">
              <span className="sr-only">Icon</span>
            </Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Email</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.email}>
              <Table.Cell className="w-1">
                <User size={16} className="text-foreground-muted" />
              </Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell className="text-foreground-lighter">{user.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  )
}
