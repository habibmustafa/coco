import * as React from 'react'

import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from './collapsible-parts'
import { cn } from '../../../../lib/utils'
import { useControllableState } from '../../../../lib/use-controllable-state'

type RootProps = React.ComponentProps<typeof CollapsibleRoot>

export interface CollapsibleClassNames {
  header?: string
  label?: string
  content?: string
}

type CollapsibleTriggerModeProps = Omit<
  RootProps,
  'children' | 'open' | 'defaultOpen' | 'onOpenChange' | 'content'
> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Always-visible text shown next to the trigger (matches the upstream demo's header row). */
  label?: React.ReactNode
  /** Element that toggles the collapsible, rendered via CollapsibleTrigger asChild. */
  trigger: React.ReactElement
  content: React.ReactNode
  className?: string
  classNames?: CollapsibleClassNames
  children?: never
}

type CollapsibleCompoundProps = RootProps & { trigger?: never }

export type CollapsibleProps = CollapsibleTriggerModeProps | CollapsibleCompoundProps

export function CollapsibleHybrid(props: CollapsibleProps) {
  const isTriggerMode = props.trigger !== undefined

  // Called unconditionally — rules-of-hooks. Unused (and harmless) in compound mode,
  // which manages its own open state via CollapsibleRoot directly.
  const [open, setOpen] = useControllableState({
    value: isTriggerMode ? props.open : undefined,
    defaultValue: isTriggerMode ? (props.defaultOpen ?? false) : false,
    onChange: isTriggerMode ? props.onOpenChange : undefined,
  })

  if (!isTriggerMode) {
    return <CollapsibleRoot {...props} />
  }

  const {
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange: _onOpenChange,
    label,
    trigger,
    content,
    className,
    classNames,
    ...rootProps
  } = props

  return (
    <CollapsibleRoot {...rootProps} open={open} onOpenChange={setOpen} className={className}>
      <div className={cn('flex items-center justify-between gap-4', classNames?.header)}>
        {label != null && <p className={cn('text-sm', classNames?.label)}>{label}</p>}
        <CollapsibleTrigger asChild>{trigger}</CollapsibleTrigger>
      </div>
      <CollapsibleContent className={cn('mt-2 flex flex-col gap-2', classNames?.content)}>
        {content}
      </CollapsibleContent>
    </CollapsibleRoot>
  )
}
