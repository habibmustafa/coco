import { Copy } from 'lucide-react'
import { Button, Dialog, Input, Label } from '../../../src'

export default function DialogCloseButton() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Share</Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-md">
        <Dialog.Header>
          <Dialog.Title>Share link</Dialog.Title>
          <Dialog.Description>Anyone who has this link will be able to view this.</Dialog.Description>
        </Dialog.Header>
        <Dialog.SectionSeparator />
        <Dialog.Section>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
            </div>
            <Button type="submit" size="small" variant="secondary" className="px-3">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </Dialog.Section>
        <Dialog.Footer className="sm:justify-start">
          <Dialog.Close asChild>
            <Button type="button">Custom Close Button</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
