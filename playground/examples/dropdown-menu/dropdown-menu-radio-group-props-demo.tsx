import * as React from 'react'

import { Button, DropdownMenu } from '../../../src'

export default function DropdownMenuRadioGroupPropsDemo() {
  const [position, setPosition] = React.useState('bottom')

  return (
    <DropdownMenu
      trigger={<Button variant="outline">Open</Button>}
      className="w-56"
      items={[
        { type: 'label', key: 'position', label: 'Panel Position' },
        { type: 'separator', key: 'sep-1' },
        {
          type: 'radio-group',
          key: 'radio-group',
          value: position,
          onValueChange: setPosition,
          items: [
            { value: 'top', label: 'Top' },
            { value: 'bottom', label: 'Bottom' },
            { value: 'right', label: 'Right' },
          ],
        },
      ]}
    />
  )
}
