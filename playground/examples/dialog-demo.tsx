import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '../../src'

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Rename project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>This changes the display name only.</DialogDescription>
        </DialogHeader>
        <DialogSection className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="my-project" />
        </DialogSection>
        <DialogFooter>
          <Button variant="text">Cancel</Button>
          <Button variant="primary">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
