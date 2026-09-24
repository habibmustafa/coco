import { Avatar, Button, HoverCard } from '../../../src'

export default function HoverCardDemo() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <Button variant="link">@coco</Button>
      </HoverCard.Trigger>
      <HoverCard.Content className="w-64">
        <div className="flex gap-3">
          <Avatar.Root>
            <Avatar.Fallback>CO</Avatar.Fallback>
          </Avatar.Root>
          <div>
            <p className="text-sm font-medium">coco</p>
            <p className="text-sm text-foreground-light">React components for your next interface.</p>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  )
}
