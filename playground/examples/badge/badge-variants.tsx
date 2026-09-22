import { Badge } from '../../../src'

export default function BadgeVariants() {
  return (
    <>
      <Badge>default</Badge>
      <Badge variant="success">success</Badge>
      <Badge variant="warning">warning</Badge>
      <Badge variant="destructive">destructive</Badge>
      <Badge variant="secondary">secondary</Badge>
    </>
  )
}
