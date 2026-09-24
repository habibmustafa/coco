import {
  Button,
  Dialog,
  Input,
  Label,
} from '../../../src'

export default function DialogDemo() {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="danger">Delete project</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Delete project?</Dialog.Title>
            <Dialog.Description>This action cannot be undone.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Button variant="text">Cancel</Button>
            <Button variant="danger">Delete</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="outline">Update email</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Update email</Dialog.Title>
            <Dialog.Description>We'll send a confirmation link to the new address.</Dialog.Description>
          </Dialog.Header>
          <Dialog.SectionSeparator />
          <Dialog.Section className="flex flex-col gap-2">
            <Label htmlFor="dialog-demo-email">New email</Label>
            <Input id="dialog-demo-email" type="email" placeholder="you@example.com" />
          </Dialog.Section>
          <Dialog.Footer>
            <Button variant="text">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
