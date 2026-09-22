import { Textarea } from '../../../src'

export default function TextareaStates() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Textarea placeholder="Tell us what happened" />
      <Textarea aria-invalid defaultValue="Too short" />
      <Textarea disabled placeholder="Disabled" />
    </div>
  )
}
