import { Copy } from 'lucide-react'

import { Button, Dialog, Input, Label } from '../../../src'

export default function DialogCloseButtonPropsDemo() {
  return (
    <Dialog
      trigger={<Button>Share</Button>}
      title="Share link"
      description="Anyone who has this link will be able to view this."
      slotProps={{ content: { className: 'sm:max-w-md' } }}
      classNames={{ footer: 'sm:justify-start' }}
      footer={({ close }) => (
        <Button type="button" onClick={close}>
          Custom Close Button
        </Button>
      )}
    >
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="dialog-close-button-link" className="sr-only">
            Link
          </Label>
          <Input
            id="dialog-close-button-link"
            defaultValue="https://ui.shadcn.com/docs/installation"
            readOnly
          />
        </div>
        <Button type="submit" size="small" variant="secondary" className="px-3">
          <span className="sr-only">Copy</span>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </Dialog>
  )
}
