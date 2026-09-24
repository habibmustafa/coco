import { ChevronRight, EllipsisVertical, Pencil, Shield, Trash2 } from 'lucide-react'
import { Button, Card, DropdownMenu, Table } from '../../../src'

const policies = [
  {
    id: 'policy-1',
    name: 'Anyone can view all active listings',
    command: 'select',
    appliedTo: 'public',
  },
  {
    id: 'policy-2',
    name: 'Users can delete their own listings',
    command: 'delete',
    appliedTo: 'authenticated',
  },
  {
    id: 'policy-3',
    name: 'Admins can update any listing',
    command: 'update',
    appliedTo: 'authenticated',
  },
]

// Studio: See also createNavigationHandler in apps/studio/lib/navigation.ts
// It handles all of the below, plus modifier clicks and middle mouse button clicks.
const handlePolicyNavigation = (
  _policyId: string,
  event: React.MouseEvent | React.KeyboardEvent
) => {
  if (event.metaKey || event.ctrlKey) {
    // window.open(`${bucketId}`, '_blank') Disabled for demo purposes
  } else {
    // router.push(bucketId) Disabled for demo purposes
  }
}

export default function TableRowLinkActions() {
  return (
    <Card.Root className="w-full">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-1">
              <span className="sr-only">Icon</span>
            </Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Command</Table.Head>
            <Table.Head>Applied to</Table.Head>
            <Table.Head className="w-1">
              <span className="sr-only">Actions</span>
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {policies.map((policy) => (
            <Table.Row
              key={policy.id}
              className="relative cursor-pointer focus-inset"
              onClick={(event) => {
                if (event.currentTarget !== event.target) return
                handlePolicyNavigation(policy.id, event)
              }}
              onKeyDown={(event) => {
                if (event.currentTarget !== event.target) return
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handlePolicyNavigation(policy.id, event)
                }
              }}
              tabIndex={0}
            >
              <Table.Cell className="w-1">
                <Shield aria-label="policy icon" size={16} className="text-foreground-muted" />
              </Table.Cell>
              <Table.Cell>{policy.name}</Table.Cell>
              <Table.Cell>
                <code className="text-foreground-muted text-code-inline uppercase">
                  {policy.command}
                </code>
              </Table.Cell>
              <Table.Cell className="text-foreground-lighter">{policy.appliedTo}</Table.Cell>
              <Table.Cell className="flex justify-end items-center h-full gap-3">
                <div
                  className="flex justify-end items-center h-full gap-3"
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                >
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
                        <span>Edit policy</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="gap-x-2">
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                  <ChevronRight aria-hidden={true} size={14} className="text-foreground-muted/60" />
                  <button tabIndex={-1} className="sr-only">
                    Go to policy
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  )
}
