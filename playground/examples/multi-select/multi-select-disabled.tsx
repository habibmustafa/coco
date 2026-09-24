import { useState } from 'react'
import { MultiSelector } from '../../../src'

export default function MultiSelectDemo() {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  return (
    <MultiSelector.Root values={selectedValues} onValuesChange={setSelectedValues} disabled={true}>
      <MultiSelector.Trigger className="w-72" label="Select fruits" />
    </MultiSelector.Root>
  )
}
