import { RadioGroup, RadioGroupLargeItem } from '../../../src'

export default function RadioGroupLarge() {
  return (
    <RadioGroup defaultValue="us-east" className="grid-flow-col">
      <RadioGroupLargeItem value="us-east" label="US East (N. Virginia)" />
      <RadioGroupLargeItem value="eu-west" label="EU West (Ireland)" />
    </RadioGroup>
  )
}
