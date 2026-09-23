import { Plus } from 'lucide-react'

import { Button, EmptyStatePresentational } from '../../../src'

export default function EmptyStatePresentationalDemo() {
  return (
    <EmptyStatePresentational
      title="Create an auth hook"
      description="Use Postgres functions or HTTP endpoints to customize your authentication flow."
    >
      <Button size="tiny" variant="primary" icon={<Plus size={14} />}>
        Add hook
      </Button>
    </EmptyStatePresentational>
  )
}
