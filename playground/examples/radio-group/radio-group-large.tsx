import { RadioGroup } from '../../../src'

export default function RadioGroupLarge() {
  return (
    <RadioGroup.Root defaultValue="us-east" className="grid-flow-col">
      <RadioGroup.LargeItem value="us-east" label="US East (N. Virginia)" />
      <RadioGroup.LargeItem value="eu-west" label="EU West (Ireland)" />
    </RadioGroup.Root>
  )
}
