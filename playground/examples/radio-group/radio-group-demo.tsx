import { Label, RadioGroup } from '../../../src'

export default function RadioGroupDemo() {
  return (
    <RadioGroup.Root defaultValue="free">
      <div className="flex items-center gap-2">
        <RadioGroup.Item value="free" id="plan-free" />
        <Label htmlFor="plan-free">Free</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item value="pro" id="plan-pro" />
        <Label htmlFor="plan-pro">Pro</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item value="team" id="plan-team" />
        <Label htmlFor="plan-team">Team</Label>
      </div>
    </RadioGroup.Root>
  )
}
