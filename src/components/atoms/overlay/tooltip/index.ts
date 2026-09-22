import { TooltipHybrid } from './tooltip'
import {
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from './tooltip-parts'

export const Tooltip = Object.assign(TooltipHybrid, {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Provider: TooltipProvider,
  Portal: TooltipPortal,
})

export { TooltipRoot, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from './tooltip-parts'
export type { TooltipContentProps } from './tooltip-parts'
export type { TooltipProps, TooltipClassNames } from './tooltip'
