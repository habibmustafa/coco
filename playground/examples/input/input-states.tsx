import { Input } from '../../../src'

export default function InputStates() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Input placeholder="Default" />
      <Input aria-invalid defaultValue="not-an-email" />
      <Input disabled placeholder="Disabled" />
      <Input readOnly value="Read only" />
    </div>
  )
}
