import { RadioGroupCard } from '../../../src'

export default function RadioGroupCardDemo() {
  return (
    <RadioGroupCard.Root defaultValue="comfortable" className="flex flex-wrap gap-3" aria-label="Size">
      <RadioGroupCard.Item value="default" label="Default" />
      <RadioGroupCard.Item value="comfortable" label="Comfortable" />
      <RadioGroupCard.Item value="compact" label="Compact" />
    </RadioGroupCard.Root>
  )
}
