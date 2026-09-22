// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.
import * as React from 'react'

import { PopoverContent, PopoverRoot, PopoverTrigger } from './popover-parts'
import { cn } from '../../../../lib/utils'

type RootProps = React.ComponentProps<typeof PopoverRoot>
type PopoverContentProps = React.ComponentProps<typeof PopoverContent>

export interface PopoverClassNames {
  content?: string
}

type PopoverContentModeProps = Omit<RootProps, 'children'> & {
  /** Element that opens the popover, rendered via PopoverTrigger asChild. */
  trigger: React.ReactElement
  content: React.ReactNode
  className?: string
  classNames?: PopoverClassNames
  slotProps?: {
    content?: Partial<PopoverContentProps>
  }
  children?: never
}

type PopoverCompoundProps = RootProps & { content?: never }

export type PopoverProps = PopoverContentModeProps | PopoverCompoundProps

export function PopoverHybrid(props: PopoverProps) {
  if (props.content === undefined) {
    return <PopoverRoot {...props} />
  }

  const { trigger, content, className, classNames, slotProps, ...rootProps } = props
  const { className: contentClassName, ...contentRest } = slotProps?.content ?? {}

  return (
    <PopoverRoot {...rootProps}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        {...contentRest}
        className={cn(className, classNames?.content, contentClassName)}
      >
        {content}
      </PopoverContent>
    </PopoverRoot>
  )
}
