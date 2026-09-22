import { RadioGroup } from '../../../src'

export default function RadioGroupLargePropsDemo() {
  return (
    <RadioGroup
      defaultValue="us-east"
      className="grid-flow-col"
      options={[
        { value: 'us-east', label: 'US East (N. Virginia)', variant: 'large' },
        { value: 'eu-west', label: 'EU West (Ireland)', variant: 'large' },
      ]}
    />
  )
}
