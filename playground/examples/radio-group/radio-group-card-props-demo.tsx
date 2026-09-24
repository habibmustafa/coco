import { RadioGroupCard } from '../../../src'

export default function RadioGroupCardPropsDemo() {
  return (
    <RadioGroupCard
      defaultValue="comfortable"
      className="flex flex-wrap gap-3"
      aria-label="Size"
      options={[
        { value: 'default', label: 'Default' },
        { value: 'comfortable', label: 'Comfortable' },
        { value: 'compact', label: 'Compact' },
      ]}
    />
  )
}
