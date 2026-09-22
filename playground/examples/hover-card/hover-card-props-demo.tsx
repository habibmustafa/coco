import { Avatar, AvatarFallback, Button, HoverCard } from '../../../src'

export default function HoverCardPropsDemo() {
  return (
    <HoverCard
      trigger={<Button variant="link">@supabase</Button>}
      className="w-64"
      content={
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>SB</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Supabase</p>
            <p className="text-sm text-foreground-light">The open source Firebase alternative.</p>
          </div>
        </div>
      }
    />
  )
}
