import { Button, Tooltip } from '../../../src'

export default function TooltipPropsDemo() {
  return <Tooltip trigger={<Button variant="outline">Hover me</Button>} content="Restarts the database" />
}
