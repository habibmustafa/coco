import { EllipsisVertical, Pencil, Trash2, User } from 'lucide-react'
import { Button, Card, DropdownMenu, Table } from '../../../src'

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

export default function TableActions() {
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
            <Table.Head className="w-1">
              <span className="sr-only">Actions</span>
            </Table.Head>
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
              <Table.Cell className="flex items-center gap-x-2">
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
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  )
}
