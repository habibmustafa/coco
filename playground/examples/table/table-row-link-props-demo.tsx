import { ChevronRight, Folder as FilesBucketIcon } from 'lucide-react'

import { Card, Table } from '../../../src'

const buckets = [
  {
    id: 'avatars',
    name: 'avatars',
    updated: '2 hours ago',
  },
  {
    id: 'listing-photos',
    name: 'listing-photos',
    updated: '1 day ago',
  },
  {
    id: 'documents',
    name: 'documents',
    updated: '3 days ago',
  },
]

// Studio: See also createNavigationHandler in apps/studio/lib/navigation.ts
// It handles all of the below, plus modifier clicks and middle mouse button clicks.
const handleBucketNavigation = (
  _bucketId: string,
  event: React.MouseEvent | React.KeyboardEvent
) => {
  if (event.metaKey || event.ctrlKey) {
    // window.open(`${bucketId}`, '_blank') Disabled for demo purposes
  } else {
    // router.push(bucketId) Disabled for demo purposes
  }
}

export default function TableRowLinkPropsDemo() {
  return (
    <Card.Root className="w-full">
      <Table
        rowKey={(row) => row.id}
        data={buckets}
        onRowClick={(row, event) => handleBucketNavigation(row.id, event)}
        columns={[
          {
            key: 'icon',
            header: <span className="sr-only">Icon</span>,
            headerClassName: 'w-1',
            cellClassName: 'w-1',
            render: () => (
              <FilesBucketIcon
                aria-label="bucket icon"
                size={16}
                className="text-foreground-muted"
              />
            ),
          },
          {
            key: 'name',
            header: 'Name',
            render: (row) => row.name,
          },
          {
            key: 'updated',
            header: 'Updated',
            cellClassName: 'text-foreground-muted',
            render: (row) => row.updated,
          },
          {
            key: 'actions',
            header: <span className="sr-only">Actions</span>,
            headerClassName: 'w-1',
            render: () => (
              <div className="flex h-full items-center justify-end">
                <ChevronRight aria-hidden={true} size={14} className="text-foreground-muted/60" />
              </div>
            ),
          },
        ]}
      />
    </Card.Root>
  )
}
