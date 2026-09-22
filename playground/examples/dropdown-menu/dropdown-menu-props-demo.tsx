import { Button, DropdownMenu } from '../../../src'

export default function DropdownMenuPropsDemo() {
  return (
    <DropdownMenu
      trigger={<Button variant="outline">Open menu</Button>}
      align="start"
      className="w-48"
      items={[
        { type: 'label', key: 'project', label: 'Project' },
        { type: 'separator', key: 'sep-1' },
        { key: 'settings', label: 'Settings', shortcut: '⌘S' },
        { key: 'duplicate', label: 'Duplicate' },
        { type: 'separator', key: 'sep-2' },
        { key: 'delete', label: 'Delete' },
      ]}
    />
  )
}
