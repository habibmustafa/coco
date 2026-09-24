import * as React from 'react'

import { Button, DropdownMenu } from '../../../src'

export default function DropdownMenuCheckboxesPropsDemo() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <DropdownMenu
      trigger={<Button variant="outline">Open</Button>}
      className="w-56"
      items={[
        { type: 'label', key: 'appearance', label: 'Appearance' },
        { type: 'separator', key: 'sep-1' },
        {
          type: 'checkbox',
          key: 'status-bar',
          label: 'Status Bar',
          checked: showStatusBar,
          onCheckedChange: setShowStatusBar,
        },
        {
          type: 'checkbox',
          key: 'activity-bar',
          label: 'Activity Bar',
          checked: showActivityBar,
          onCheckedChange: setShowActivityBar,
          disabled: true,
        },
        {
          type: 'checkbox',
          key: 'panel',
          label: 'Panel',
          checked: showPanel,
          onCheckedChange: setShowPanel,
        },
      ]}
    />
  )
}
