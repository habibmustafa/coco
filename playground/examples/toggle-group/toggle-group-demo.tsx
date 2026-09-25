import { Bold, Italic, Underline } from 'lucide-react'

import { ToggleGroup } from '../../../src'

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup.Root type="multiple">
      <ToggleGroup.Item value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
