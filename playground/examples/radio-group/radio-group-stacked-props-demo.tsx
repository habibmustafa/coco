import { RadioGroupStacked } from '../../../src'

export default function RadioGroupStackedPropsDemo() {
  return (
    <RadioGroupStacked
      defaultValue="comfortable"
      aria-label="Size"
      options={[
        { value: 'default', id: 'r1', label: 'Default', description: 'The default option is the most spacious and comfortable.' },
        { value: 'comfortable', id: 'r2', label: 'Comfortable', description: 'The comfortable option is a bit more compact than the default option.' },
        { value: 'compact', id: 'r3', label: 'Compact', description: 'The compact option is the most compact and space-efficient.' },
      ]}
    />
  )
}
