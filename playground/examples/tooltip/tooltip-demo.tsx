import { Button, Tooltip } from '../../../src'

export default function TooltipDemo() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Restarts the database</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
