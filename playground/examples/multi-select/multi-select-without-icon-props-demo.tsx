import { useState } from 'react'

import { MultiSelector } from '../../../src'

const fruitOptions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Cherry' }]

export default function MultiSelectWithoutIconPropsDemo() {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  return (
    <MultiSelector
      values={selectedValues}
      onValuesChange={setSelectedValues}
      options={fruitOptions}
      triggerClassName="w-72"
      label="Select fruits"
      showIcon={false}
    />
  )
}
