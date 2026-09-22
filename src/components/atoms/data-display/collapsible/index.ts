import { CollapsibleHybrid } from './collapsible'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from './collapsible-parts'

export const Collapsible = Object.assign(CollapsibleHybrid, {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})

export { CollapsibleRoot, CollapsibleContent, CollapsibleTrigger } from './collapsible-parts'
export type { CollapsibleProps, CollapsibleClassNames } from './collapsible'
