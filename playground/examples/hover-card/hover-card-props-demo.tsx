import { Avatar, Button, HoverCard } from '../../../src'

export default function HoverCardPropsDemo() {
  return (
    <HoverCard
      trigger={<Button variant="link">@habibmustafa</Button>}
      className="w-64"
      content={
        <div className="flex gap-3">
          <Avatar.Root>
            <Avatar.Fallback>UI</Avatar.Fallback>
          </Avatar.Root>
          <div>
            <p className="text-sm font-medium">ui</p>
            <p className="text-sm text-foreground-light">React components for your next interface.</p>
          </div>
        </div>
      }
    />
  )
}
