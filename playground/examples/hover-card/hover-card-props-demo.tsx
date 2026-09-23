import { Avatar, AvatarFallback, Button, HoverCard } from '../../../src'

export default function HoverCardPropsDemo() {
  return (
    <HoverCard
      trigger={<Button variant="link">@coco</Button>}
      className="w-64"
      content={
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>CO</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">coco</p>
            <p className="text-sm text-foreground-light">React components for your next interface.</p>
          </div>
        </div>
      }
    />
  )
}
