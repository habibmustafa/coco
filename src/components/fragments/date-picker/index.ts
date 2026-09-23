import { DatePickerHybrid } from './date-picker'
import {
  DatePickerButton,
  DatePickerContent,
  DatePickerRoot,
  DatePickerTrigger,
} from './date-picker-parts'

export const DatePicker = Object.assign(DatePickerHybrid, {
  Root: DatePickerRoot,
  Trigger: DatePickerTrigger,
  Button: DatePickerButton,
  Content: DatePickerContent,
})

export {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerButton,
  DatePickerContent,
} from './date-picker-parts'
export type { DatePickerButtonProps } from './date-picker-parts'
export type { DatePickerProps } from './date-picker'
