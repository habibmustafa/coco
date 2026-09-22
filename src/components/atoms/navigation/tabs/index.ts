import { TabsHybrid } from './tabs'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from './tabs-parts'

export const Tabs = Object.assign(TabsHybrid, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Indicator: TabsIndicator,
})

export { TabsRoot, TabsContent, TabsIndicator, TabsList, TabsTrigger }
export type { TabsProps, TabItem, TabsClassNames } from './tabs'
