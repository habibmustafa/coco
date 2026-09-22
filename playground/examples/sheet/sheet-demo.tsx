import {
  Button,
  Input,
  Label,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetRoot,
  SheetSection,
  SheetTitle,
  SheetTrigger,
} from '../../../src'

export default function SheetDemo() {
  return (
    <>
      <SheetRoot>
        <SheetTrigger asChild>
          <Button>Open sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Connection details</SheetTitle>
            <SheetDescription>Slides in from the edge of the viewport.</SheetDescription>
          </SheetHeader>
          <SheetSection>
            <p className="text-sm text-foreground-light">
              Sheets share the dialog primitive, so focus trapping and escape handling match.
            </p>
          </SheetSection>
        </SheetContent>
      </SheetRoot>

      <SheetRoot>
        <SheetTrigger asChild>
          <Button variant="outline">Edit profile</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Update your public profile information.</SheetDescription>
          </SheetHeader>
          <SheetSection>
            <div className="flex flex-col gap-2">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" defaultValue="Jane Doe" />
            </div>
          </SheetSection>
          <SheetFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </SheetFooter>
        </SheetContent>
      </SheetRoot>
    </>
  )
}
