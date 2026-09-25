import { ToggleGroupHybrid } from './toggle-group'
import { ToggleGroupIndicator, ToggleGroupItem, ToggleGroupRoot } from './toggle-group-parts'

export const ToggleGroup = Object.assign(ToggleGroupHybrid, {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
  Indicator: ToggleGroupIndicator,
})

export { ToggleGroupIndicator, ToggleGroupItem, ToggleGroupRoot } from './toggle-group-parts'
export type { ToggleGroupItemProps, ToggleGroupRootProps } from './toggle-group-parts'
export type { ToggleGroupItemData, ToggleGroupProps } from './toggle-group'
