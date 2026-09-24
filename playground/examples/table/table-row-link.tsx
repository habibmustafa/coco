import { ChevronRight } from 'lucide-react'
import { Folder as FilesBucketIcon } from 'lucide-react'
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

export default function TableRowLink() {
  return (
    <Card.Root className="w-full">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-1">
              <span className="sr-only">Icon</span>
            </Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Updated</Table.Head>
            <Table.Head className="w-1">
              <span className="sr-only">Actions</span>
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {buckets.map((bucket) => (
            <Table.Row
              key={bucket.id}
              className="relative cursor-pointer focus-inset"
              onClick={(event) => {
                if (event.currentTarget !== event.target) return
                handleBucketNavigation(bucket.id, event)
              }}
              onKeyDown={(event) => {
                if (event.currentTarget !== event.target) return
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleBucketNavigation(bucket.id, event)
                }
              }}
              tabIndex={0}
            >
              <Table.Cell className="w-1">
                <FilesBucketIcon
                  aria-label="bucket icon"
                  size={16}
                  className="text-foreground-muted"
                />
              </Table.Cell>
              <Table.Cell>{bucket.name}</Table.Cell>
              <Table.Cell className="text-foreground-muted">{bucket.updated}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-end items-center h-full">
                  <ChevronRight aria-hidden={true} size={14} className="text-foreground-muted/60" />
                </div>
                <button tabIndex={-1} className="sr-only">
                  Go to bucket
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  )
}
