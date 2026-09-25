import { Bold, Italic, Underline } from 'lucide-react'

import { ToggleGroup } from '../../../src'

export default function ToggleGroupPropsDemo() {
  return (
    <ToggleGroup
      type="multiple"
      items={[
        { value: 'bold', icon: <Bold className="h-4 w-4" />, 'aria-label': 'Toggle bold' },
        { value: 'italic', icon: <Italic className="h-4 w-4" />, 'aria-label': 'Toggle italic' },
        {
          value: 'underline',
          icon: <Underline className="h-4 w-4" />,
          'aria-label': 'Toggle underline',
        },
      ]}
    />
  )
}
