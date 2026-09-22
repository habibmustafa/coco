import { DialogHybrid } from './dialog'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogSection,
  DialogSectionSeparator,
  DialogTitle,
  DialogTrigger,
} from './dialog-parts'

export const Dialog = Object.assign(DialogHybrid, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Section: DialogSection,
  SectionSeparator: DialogSectionSeparator,
  Footer: DialogFooter,
  Close: DialogClose,
})

export {
  DialogRoot,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogSectionSeparator,
  DialogTitle,
  DialogTrigger,
  DIALOG_PADDING_X,
  DIALOG_PADDING_X_SMALL,
  DIALOG_PADDING_Y,
  DIALOG_PADDING_Y_SMALL,
} from './dialog-parts'
export type { DialogRootProps } from './dialog-parts'
export type { DialogProps, DialogClassNames, DialogRenderContext } from './dialog'
