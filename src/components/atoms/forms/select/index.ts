import { SelectHybrid } from './select'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select-parts'

export const Select = Object.assign(SelectHybrid, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Group: SelectGroup,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
})

export {
  ComboboxTrigger,
  SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select-parts'
export { selectTriggerVariants } from './select-trigger'
export type { SelectTriggerVariantProps } from './select-trigger'
export type { SelectTriggerSize } from './select-parts'
export type { SelectProps, SelectOption, SelectOptionGroup, SelectClassNames } from './select'
