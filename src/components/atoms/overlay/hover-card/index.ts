import { HoverCardHybrid } from './hover-card'
import { HoverCardContent, HoverCardRoot, HoverCardTrigger } from './hover-card-parts'

export const HoverCard = Object.assign(HoverCardHybrid, {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
})

export { HoverCardRoot, HoverCardContent, HoverCardTrigger } from './hover-card-parts'
export type { HoverCardProps, HoverCardClassNames } from './hover-card'
