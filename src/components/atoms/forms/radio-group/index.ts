import { RadioGroupHybrid } from './radio-group'
import { RadioGroupItem, RadioGroupLargeItem, RadioGroupRoot } from './radio-group-parts'
import { RadioGroupCardHybrid } from './radio-group-card'
import { RadioGroupCardRoot, RadioGroupCardItem } from './radio-group-card-parts'
import { RadioGroupStackedHybrid } from './radio-group-stacked'
import { RadioGroupStackedRoot, RadioGroupStackedItem } from './radio-group-stacked-parts'

export const RadioGroupCard = Object.assign(RadioGroupCardHybrid, {
  Root: RadioGroupCardRoot,
  Item: RadioGroupCardItem,
})

export const RadioGroupStacked = Object.assign(RadioGroupStackedHybrid, {
  Root: RadioGroupStackedRoot,
  Item: RadioGroupStackedItem,
})

export const RadioGroup = Object.assign(RadioGroupHybrid, {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
  LargeItem: RadioGroupLargeItem,
  Card: RadioGroupCard,
  CardItem: RadioGroupCardItem,
  Stacked: RadioGroupStacked,
  StackedItem: RadioGroupStackedItem,
})

export { RadioGroupRoot, RadioGroupItem, RadioGroupLargeItem } from './radio-group-parts'
export { RadioGroupCardRoot, RadioGroupCardItem } from './radio-group-card-parts'
export { RadioGroupStackedRoot, RadioGroupStackedItem } from './radio-group-stacked-parts'
export type { RadioGroupLargeItemProps } from './radio-group-parts'
export type { RadioGroupCardRootProps, RadioGroupCardItemProps } from './radio-group-card-parts'
export type { RadioGroupCardProps, RadioGroupCardOption, RadioGroupCardClassNames } from './radio-group-card'
export type { RadioGroupStackedRootProps, RadioGroupStackedItemProps } from './radio-group-stacked-parts'
export type { RadioGroupStackedProps, RadioGroupStackedOption, RadioGroupStackedClassNames } from './radio-group-stacked'
export type { RadioGroupProps, RadioOption, RadioGroupClassNames } from './radio-group'
