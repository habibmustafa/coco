import {
  Button,
  Input,
  Label,
  Sheet,
} from '../../../src'

export default function SheetDemo() {
  return (
    <>
      <Sheet.Root>
        <Sheet.Trigger asChild>
          <Button>Open sheet</Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Connection details</Sheet.Title>
            <Sheet.Description>Slides in from the edge of the viewport.</Sheet.Description>
          </Sheet.Header>
          <Sheet.Section>
            <p className="text-sm text-foreground-light">
              Sheets share the dialog primitive, so focus trapping and escape handling match.
            </p>
          </Sheet.Section>
        </Sheet.Content>
      </Sheet.Root>

      <Sheet.Root>
        <Sheet.Trigger asChild>
          <Button variant="outline">Edit profile</Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Edit profile</Sheet.Title>
            <Sheet.Description>Update your public profile information.</Sheet.Description>
          </Sheet.Header>
          <Sheet.Section>
            <div className="flex flex-col gap-2">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" defaultValue="Jane Doe" />
            </div>
          </Sheet.Section>
          <Sheet.Footer>
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet.Root>
    </>
  )
}
