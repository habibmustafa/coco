import { Button, Textarea } from '../../../src'

export default function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button variant="primary">Send message</Button>
    </div>
  )
}
