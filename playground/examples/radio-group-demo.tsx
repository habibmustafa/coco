import { Label, RadioGroup, RadioGroupItem } from '../../src'

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="free">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="free" id="plan-free" />
        <Label htmlFor="plan-free">Free</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pro" id="plan-pro" />
        <Label htmlFor="plan-pro">Pro</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="team" id="plan-team" />
        <Label htmlFor="plan-team">Team</Label>
      </div>
    </RadioGroup>
  )
}
