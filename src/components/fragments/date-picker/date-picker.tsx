/*
 * Hybrid API layer (docs/hybrid-api-migration.md) for DatePicker — Strategy A, discriminator
 * `calendarProps`. Not present upstream; the compound parts here are already a thin styled
 * re-export of Popover, so this mode simply wires Trigger → Button → Content → Calendar for
 * the common case (upstream's own demo composes exactly this by hand every time).
 */
import type { ComponentProps, ReactNode } from 'react'

import { Calendar } from '../../atoms/forms/calendar'
import {
  DatePickerButton,
  DatePickerContent,
  DatePickerRoot,
  DatePickerTrigger,
  type DatePickerButtonProps,
} from './date-picker-parts'

type RootProps = ComponentProps<typeof DatePickerRoot>
type CalendarProps = ComponentProps<typeof Calendar>

type DatePickerPropsMode = Omit<RootProps, 'children'> & {
  /** Passed straight to Calendar — carries `mode`/`selected`/`onSelect` and everything else. */
  calendarProps: CalendarProps
  /** Trigger button label. @default "Pick a date" */
  triggerLabel?: ReactNode
  buttonProps?: Omit<DatePickerButtonProps, 'children'>
  contentClassName?: string
  /** Extra content rendered above the Calendar inside DatePickerContent, e.g. a presets Select. */
  beforeCalendar?: ReactNode
  children?: never
}

type DatePickerCompoundProps = RootProps & { calendarProps?: never }

export type DatePickerProps = DatePickerPropsMode | DatePickerCompoundProps

export function DatePickerHybrid(props: DatePickerProps) {
  if (props.calendarProps === undefined) {
    return <DatePickerRoot {...props} />
  }

  const { calendarProps, triggerLabel, buttonProps, contentClassName, beforeCalendar, ...rootProps } =
    props

  return (
    <DatePickerRoot {...rootProps}>
      <DatePickerTrigger asChild>
        <DatePickerButton variant="outline" {...buttonProps}>
          {triggerLabel ?? <span>Pick a date</span>}
        </DatePickerButton>
      </DatePickerTrigger>
      <DatePickerContent className={contentClassName}>
        {beforeCalendar}
        <Calendar {...calendarProps} />
      </DatePickerContent>
    </DatePickerRoot>
  )
}
