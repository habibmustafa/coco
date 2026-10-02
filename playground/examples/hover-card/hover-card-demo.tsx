import { Avatar, Button, HoverCard } from '../../../src'

export default function HoverCardDemo() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <Button variant="link">@habibmustafa</Button>
      </HoverCard.Trigger>
      <HoverCard.Content className="w-64">
        <div className="flex gap-3">
          <Avatar.Root>
            <Avatar.Fallback>UI</Avatar.Fallback>
          </Avatar.Root>
          <div>
            <p className="text-sm font-medium">ui</p>
            <p className="text-sm text-foreground-light">React components for your next interface.</p>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  )
}
