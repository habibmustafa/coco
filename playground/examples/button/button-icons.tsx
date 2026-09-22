import { ArrowRight, Plus, Search, Trash2 } from 'lucide-react'

import { Button } from '../../../src'

export default function ButtonIcons() {
  return (
    <>
      <Button icon={<Plus />}>Add row</Button>
      <Button variant="primary" iconRight={<ArrowRight />}>
        Continue
      </Button>
      <Button variant="danger" icon={<Trash2 />}>
        Delete
      </Button>
      <Button variant="outline" icon={<Search />} aria-label="Search" />
      <Button rounded icon={<Plus />} aria-label="Add" />
    </>
  )
}
