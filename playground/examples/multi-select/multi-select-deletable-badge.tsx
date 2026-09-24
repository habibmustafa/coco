import { useState } from 'react'
import { MultiSelector } from '../../../src'

export default function MultiSelectDemo() {
  const [selectedValues, setSelectedValues] = useState<string[]>(['Apple', 'Banana'])

  return (
    <MultiSelector.Root values={selectedValues} onValuesChange={setSelectedValues}>
      <MultiSelector.Trigger
        className="w-72"
        label="Select fruits"
        deletableBadge
        badgeLimit="wrap"
      />
      <MultiSelector.Content>
        <MultiSelector.List>
          <MultiSelector.Item value="Banana">Banana</MultiSelector.Item>
          <MultiSelector.Item value="Cherry">Cherry</MultiSelector.Item>
          <MultiSelector.Item value="Date">Date</MultiSelector.Item>
          <MultiSelector.Item value="Elderberrie">Elderberrie</MultiSelector.Item>
          <MultiSelector.Item value="Fig">Fig</MultiSelector.Item>
          <MultiSelector.Item value="Grape">Grape</MultiSelector.Item>
          <MultiSelector.Item value="Kiwi">Kiwi</MultiSelector.Item>
          <MultiSelector.Item value="Mango">Mango</MultiSelector.Item>
          <MultiSelector.Item value="Strawberry">Strawberry</MultiSelector.Item>
        </MultiSelector.List>
      </MultiSelector.Content>
    </MultiSelector.Root>
  )
}
