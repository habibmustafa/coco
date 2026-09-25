/*
 * Hybrid API layer (docs/hybrid-api-migration.md) for ContextMenu — Strategy A,
 * discriminator `items`. Not present upstream; the compound parts here are already a
 * thin styled re-export of Radix, so this mode wires Trigger → Content → items for
 * the common case, mirroring DropdownMenu's own hybrid layer (the two components are
 * structurally and visually identical, differing only in how they're activated).
 */
import type * as React from 'react'

import type { MenuItem } from '../dropdown-menu'
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu-parts'

function renderMenuItems(items: readonly MenuItem[]): React.ReactNode {
  return items.map((item) => {
    switch (item.type) {
      case 'separator':
        return <ContextMenuSeparator key={item.key} />
      case 'label':
        return <ContextMenuLabel key={item.key}>{item.label}</ContextMenuLabel>
      case 'group':
        return (
          <ContextMenuGroup key={item.key}>
            {item.label != null && <ContextMenuLabel>{item.label}</ContextMenuLabel>}
            {renderMenuItems(item.items)}
          </ContextMenuGroup>
        )
      case 'submenu':
        return (
          <ContextMenuSub key={item.key}>
            <ContextMenuSubTrigger>{item.label}</ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent>{renderMenuItems(item.items)}</ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
        )
      case 'checkbox':
        return (
          <ContextMenuCheckboxItem
            key={item.key}
            checked={item.checked}
            onCheckedChange={item.onCheckedChange}
            disabled={item.disabled}
          >
            {item.label}
          </ContextMenuCheckboxItem>
        )
      case 'radio-group':
        return (
          <ContextMenuRadioGroup key={item.key} value={item.value} onValueChange={item.onValueChange}>
            {item.items.map((radio) => (
              <ContextMenuRadioItem key={radio.value} value={radio.value}>
                {radio.label}
              </ContextMenuRadioItem>
            ))}
          </ContextMenuRadioGroup>
        )
      default:
        return (
          <ContextMenuItem key={item.key} disabled={item.disabled} onSelect={item.onSelect}>
            {item.icon}
            {item.label}
            {item.shortcut && <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>}
          </ContextMenuItem>
        )
    }
  })
}

type RootProps = React.ComponentProps<typeof ContextMenuRoot>
type ContextMenuContentProps = React.ComponentProps<typeof ContextMenuContent>

type ContextMenuItemsProps = Omit<RootProps, 'children'> & {
  /** The area that opens the menu on right-click, rendered as ContextMenuTrigger's children. */
  trigger: React.ReactNode
  triggerClassName?: string
  items: readonly MenuItem[]
  className?: ContextMenuContentProps['className']
  children?: never
}

type ContextMenuCompoundProps = RootProps & { items?: never }

export type ContextMenuProps = ContextMenuItemsProps | ContextMenuCompoundProps

export function ContextMenuHybrid(props: ContextMenuProps) {
  if (props.items === undefined) {
    return <ContextMenuRoot {...props} />
  }

  const { trigger, triggerClassName, items, className, ...rootProps } = props

  return (
    <ContextMenuRoot {...rootProps}>
      <ContextMenuTrigger className={triggerClassName}>{trigger}</ContextMenuTrigger>
      <ContextMenuContent className={className}>{renderMenuItems(items)}</ContextMenuContent>
    </ContextMenuRoot>
  )
}
