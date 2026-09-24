import {
  Button,
  DropdownMenu,
} from '../../../src'

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start" className="w-48">
        <DropdownMenu.Label>Project</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          Settings
          <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
