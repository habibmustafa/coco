import { CommandDialog, CommandHybrid } from './command'
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandRoot,
  CommandSeparator,
  CommandShortcut,
} from './command-parts'

export const Command = Object.assign(CommandHybrid, {
  Root: CommandRoot,
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
  Shortcut: CommandShortcut,
})

export {
  CommandRoot,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command-parts'
export { CommandDialog } from './command'
export type { CommandDialogProps } from './command'
export type { CommandProps, CommandItemData, CommandGroupData, CommandClassNames } from './command'
