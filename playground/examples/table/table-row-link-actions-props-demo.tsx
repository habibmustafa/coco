import { ChevronRight, EllipsisVertical, Pencil, Shield, Trash2 } from 'lucide-react'

import {
  Button,
  Card,
  DropdownMenu,
  Table,
} from '../../../src'

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

export default function TableRowLinkActionsPropsDemo() {
  return (
    <Card.Root className="w-full">
      <Table
        rowKey={(row) => row.id}
        data={policies}
        onRowClick={(row, event) => handlePolicyNavigation(row.id, event)}
        columns={[
          {
            key: 'icon',
            header: <span className="sr-only">Icon</span>,
            headerClassName: 'w-1',
            cellClassName: 'w-1',
            render: () => (
              <Shield aria-label="policy icon" size={16} className="text-foreground-muted" />
            ),
          },
          {
            key: 'name',
            header: 'Name',
            render: (row) => row.name,
          },
          {
            key: 'command',
            header: 'Command',
            render: (row) => (
              <code className="text-foreground-muted text-code-inline uppercase">
                {row.command}
              </code>
            ),
          },
          {
            key: 'appliedTo',
            header: 'Applied to',
            cellClassName: 'text-foreground-lighter',
            render: (row) => row.appliedTo,
          },
          {
            key: 'actions',
            header: <span className="sr-only">Actions</span>,
            headerClassName: 'w-1',
            cellClassName: 'flex h-full items-center justify-end gap-3',
            render: () => (
              <div
                className="flex h-full items-center justify-end gap-3"
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
              </div>
            ),
          },
        ]}
      />
    </Card.Root>
  )
}
