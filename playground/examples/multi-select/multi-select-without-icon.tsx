import { useState } from 'react'
import { MultiSelector } from '../../../src'

export default function MultiSelectWithoutIcon() {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  return (
    <MultiSelector.Root values={selectedValues} onValuesChange={setSelectedValues}>
      <MultiSelector.Trigger className="w-72" label="Select fruits" showIcon={false} />
      <MultiSelector.Content>
        <MultiSelector.List>
          <MultiSelector.Item value="Apple">Apple</MultiSelector.Item>
          <MultiSelector.Item value="Banana">Banana</MultiSelector.Item>
          <MultiSelector.Item value="Cherry">Cherry</MultiSelector.Item>
        </MultiSelector.List>
      </MultiSelector.Content>
    </MultiSelector.Root>
  )
}
