import { PopoverHybrid } from './popover'
import { PopoverAnchor, PopoverContent, PopoverRoot, PopoverSeparator, PopoverTrigger } from './popover-parts'

export const Popover = Object.assign(PopoverHybrid, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Anchor: PopoverAnchor,
  Separator: PopoverSeparator,
})

export { PopoverRoot, PopoverAnchor, PopoverContent, PopoverSeparator, PopoverTrigger } from './popover-parts'
export type { PopoverContentProps } from './popover-parts'
export type { PopoverProps, PopoverClassNames } from './popover'
