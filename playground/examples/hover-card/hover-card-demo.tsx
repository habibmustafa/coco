import { Avatar, AvatarFallback, Button, HoverCard, HoverCardContent, HoverCardTrigger } from '../../../src'

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@supabase</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>SB</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Supabase</p>
            <p className="text-sm text-foreground-light">The open source Firebase alternative.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
