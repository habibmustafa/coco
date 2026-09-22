import { SheetHybrid } from './sheet'
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetRoot,
  SheetSection,
  SheetTitle,
  SheetTrigger,
} from './sheet-parts'

export const Sheet = Object.assign(SheetHybrid, {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Content: SheetContent,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Section: SheetSection,
  Footer: SheetFooter,
  Close: SheetClose,
})

export {
  SheetRoot,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetSection,
  SheetTitle,
  SheetTrigger,
} from './sheet-parts'
export type { SheetProps, SheetClassNames, SheetRenderContext } from './sheet'
