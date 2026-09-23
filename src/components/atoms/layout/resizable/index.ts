import { ResizableHybrid } from './resizable'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable-parts'

export const Resizable = Object.assign(ResizableHybrid, {
  Group: ResizablePanelGroup,
  Panel: ResizablePanel,
  Handle: ResizableHandle,
})

export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  useDefaultLayout,
  usePanelRef,
} from './resizable-parts'
export type { ResizablePanelSpec, ResizableProps } from './resizable'
