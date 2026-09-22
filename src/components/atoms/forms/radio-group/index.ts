import { RadioGroupHybrid } from './radio-group'
import { RadioGroupItem, RadioGroupLargeItem, RadioGroupRoot } from './radio-group-parts'

export const RadioGroup = Object.assign(RadioGroupHybrid, {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
  LargeItem: RadioGroupLargeItem,
})

export { RadioGroupRoot, RadioGroupItem, RadioGroupLargeItem } from './radio-group-parts'
export type { RadioGroupLargeItemProps } from './radio-group-parts'
export type { RadioGroupProps, RadioOption, RadioGroupClassNames } from './radio-group'
