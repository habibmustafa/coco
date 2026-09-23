import { Avatar, AvatarFallback, Button, HoverCard, HoverCardContent, HoverCardTrigger } from '../../../src'

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@coco</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>CO</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">coco</p>
            <p className="text-sm text-foreground-light">React components for your next interface.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
