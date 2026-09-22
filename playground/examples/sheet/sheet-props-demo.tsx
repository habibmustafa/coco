import { Button, Input, Label, Sheet } from '../../../src'

export default function SheetPropsDemo() {
  return (
    <>
      <Sheet trigger={<Button>Open sheet</Button>} title="Connection details" description="Slides in from the edge of the viewport.">
        <p className="text-sm text-foreground-light">
          Sheets share the dialog primitive, so focus trapping and escape handling match.
        </p>
      </Sheet>

      <Sheet
        trigger={<Button variant="outline">Edit profile</Button>}
        title="Edit profile"
        description="Update your public profile information."
        onConfirm={() => new Promise((resolve) => setTimeout(resolve, 800))}
      >
        {({ pending }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Jane Doe" disabled={pending} />
          </div>
        )}
      </Sheet>
    </>
  )
}
