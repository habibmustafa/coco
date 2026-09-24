import { Admonition, Button } from '../../../src'

export default function AdmonitionDemo() {
  return (
    <Admonition
      type="default"
      layout="responsive"
      title="Disk management has moved"
      description="Disk management is now handled alongside Project Compute on the Compute and Disk page."
      actions={<Button>Go to Compute and Disk</Button>}
    />
  )
}
