import * as React from 'react'

import { HoverCardContent, HoverCardRoot, HoverCardTrigger } from './hover-card-parts'
import { cn } from '../../../../lib/utils'

type RootProps = React.ComponentProps<typeof HoverCardRoot>
type HoverCardContentProps = React.ComponentProps<typeof HoverCardContent>

export interface HoverCardClassNames {
  content?: string
}

type HoverCardContentModeProps = Omit<RootProps, 'children'> & {
  /** Element that opens the hover card, rendered via HoverCardTrigger asChild. */
  trigger: React.ReactElement
  content: React.ReactNode
  className?: string
  classNames?: HoverCardClassNames
  slotProps?: {
    content?: Partial<HoverCardContentProps>
  }
  children?: never
}

type HoverCardCompoundProps = RootProps & { content?: never }

export type HoverCardProps = HoverCardContentModeProps | HoverCardCompoundProps

export function HoverCardHybrid(props: HoverCardProps) {
  if (props.content === undefined) {
    return <HoverCardRoot {...props} />
  }

  const { trigger, content, className, classNames, slotProps, ...rootProps } = props
  const { className: contentClassName, ...contentRest } = slotProps?.content ?? {}

  return (
    <HoverCardRoot {...rootProps}>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent
        {...contentRest}
        className={cn(className, classNames?.content, contentClassName)}
      >
        {content}
      </HoverCardContent>
    </HoverCardRoot>
  )
}
