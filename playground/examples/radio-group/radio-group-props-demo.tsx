import { RadioGroup } from '../../../src'

export default function RadioGroupPropsDemo() {
  return (
    <RadioGroup
      defaultValue="free"
      options={[
        { value: 'free', label: 'Free' },
        { value: 'pro', label: 'Pro' },
        { value: 'team', label: 'Team' },
      ]}
    />
  )
}
