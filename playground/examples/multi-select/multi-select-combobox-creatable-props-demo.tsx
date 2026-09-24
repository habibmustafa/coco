import { useState } from 'react'

import { MultiSelector } from '../../../src'

const fruitOptions = [
  { value: 'Mango' },
  { value: 'Date' },
  { value: 'Apple' },
  { value: 'Elderberrie' },
  { value: 'Fig' },
  { value: 'Grape' },
  { value: 'Banana' },
  { value: 'Kiwi' },
  { value: 'Strawberry' },
  { value: 'Cherry' },
]

export default function MultiSelectComboboxCreatablePropsDemo() {
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
      creatable
    />
  )
}
