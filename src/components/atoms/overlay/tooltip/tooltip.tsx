// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.
import * as React from 'react'

import { TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger } from './tooltip-parts'
import { cn } from '../../../../lib/utils'

type RootProps = React.ComponentProps<typeof TooltipRoot>
type TooltipContentProps = React.ComponentProps<typeof TooltipContent>

export interface TooltipClassNames {
  content?: string
}

type TooltipContentModeProps = Omit<RootProps, 'children'> & {
  /** Element that triggers the tooltip, rendered via TooltipTrigger asChild. */
  trigger: React.ReactElement
  content: React.ReactNode
  className?: string
  classNames?: TooltipClassNames
  slotProps?: {
    content?: Partial<TooltipContentProps>
  }
  children?: never
}

type TooltipCompoundProps = RootProps & { content?: never }

export type TooltipProps = TooltipContentModeProps | TooltipCompoundProps

export function TooltipHybrid(props: TooltipProps) {
  if (props.content === undefined) {
    return <TooltipRoot {...props} />
  }

  const { trigger, content, className, classNames, slotProps, ...rootProps } = props
  const { className: contentClassName, ...contentRest } = slotProps?.content ?? {}

  return (
    <TooltipProvider>
      <TooltipRoot {...rootProps}>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent
          {...contentRest}
          className={cn(className, classNames?.content, contentClassName)}
        >
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}
