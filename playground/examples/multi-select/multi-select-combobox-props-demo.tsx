import { useState } from 'react'

import { MultiSelector } from '../../../src'

const fruitOptions = [
  { value: 'Apple' },
  { value: 'Banana' },
  { value: 'Cherry' },
  { value: 'Date' },
  { value: 'Elderberrie' },
  { value: 'Fig' },
  { value: 'Grape' },
  { value: 'Kiwi' },
  { value: 'Mango' },
  { value: 'Strawberry' },
]

export default function MultiSelectComboboxPropsDemo() {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  return (
    <MultiSelector
      values={selectedValues}
      onValuesChange={setSelectedValues}
      options={fruitOptions}
      triggerClassName="w-72"
      label="Select fruits"
      badgeLimit="wrap"
      searchable
      searchPlaceholder="Search fruits"
    />
  )
}
