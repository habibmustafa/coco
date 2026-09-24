import { Plus } from 'lucide-react'
import { FolderPlus as BucketPlus } from 'lucide-react'
import { Button, EmptyStatePresentational } from '../../../src'

export default function EmptyStatePresentationalIcon() {
  return (
    <EmptyStatePresentational
      icon={BucketPlus}
      title="Create a vector bucket"
      description="Store, index, and query your vector embeddings at scale."
    >
      <Button size="tiny" variant="primary" icon={<Plus size={14} />}>
        Create bucket
      </Button>
    </EmptyStatePresentational>
  )
}
