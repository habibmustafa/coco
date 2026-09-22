import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogSection,
  DialogSectionSeparator,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '../../../src'

export default function DialogDemo() {
  return (
    <>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="danger">Delete project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="text">Cancel</Button>
            <Button variant="danger">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="outline">Update email</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update email</DialogTitle>
            <DialogDescription>We'll send a confirmation link to the new address.</DialogDescription>
          </DialogHeader>
          <DialogSectionSeparator />
          <DialogSection className="flex flex-col gap-2">
            <Label htmlFor="dialog-demo-email">New email</Label>
            <Input id="dialog-demo-email" type="email" placeholder="you@example.com" />
          </DialogSection>
          <DialogFooter>
            <Button variant="text">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  )
}
