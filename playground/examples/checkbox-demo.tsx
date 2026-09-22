import { Checkbox, Label } from '../../src'

export default function CheckboxDemo() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" defaultChecked />
        <Label htmlFor="newsletter">Subscribe</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="locked" disabled defaultChecked />
        <Label htmlFor="locked">Disabled</Label>
      </div>
    </>
  )
}
