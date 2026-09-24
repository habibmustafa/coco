import { useState } from 'react'

import {
  MultiSelector,
} from '../../../src'

export default function MultiSelectDemo() {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const fruits = [
    { value: 'Apple', isDisabled: false },
    { value: 'Banana', isDisabled: false },
    { value: 'Cherry', isDisabled: false },
    { value: 'Date', isDisabled: false },
    { value: 'Elderberrie', isDisabled: false },
    { value: 'Fig', isDisabled: false },
    { value: 'Grape', isDisabled: false },
    { value: 'Kiwi', isDisabled: true },
    { value: 'Mango', isDisabled: false },
    { value: 'Strawberry', isDisabled: false },
  ]

  return (
    <MultiSelector.Root values={selectedValues} onValuesChange={setSelectedValues}>
      <MultiSelector.Trigger className="w-72" label="Select fruits" badgeLimit="wrap" />
      <MultiSelector.Content>
        <MultiSelector.List>
          {fruits.map(({ value, isDisabled }) => (
            <MultiSelector.Item key={value} value={value} disabled={isDisabled}>
              {value}
            </MultiSelector.Item>
          ))}
        </MultiSelector.List>
      </MultiSelector.Content>
    </MultiSelector.Root>
  )
}
