import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetSection,
  SheetTitle,
  SheetTrigger,
} from '../../src'

export default function SheetDemo() {
  return (
    <Sheet>
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
    </Sheet>
  )
}
