import { Button, Sheet } from '../../../src'

export default function SheetNonmodalPropsDemo() {
  return (
    <Sheet
      modal={false}
      trigger={<Button variant="outline">Show Sheet</Button>}
      title="Log details"
      slotProps={{ content: { className: 'flex flex-col gap-0' } }}
      footer={({ close }) => (
        <Button variant="outline" onClick={close}>
          Close
        </Button>
      )}
    >
      <p className="text-sm text-foreground-lighter">
        This sheet does not block the underlying content, but it does overlap it.
      </p>
    </Sheet>
  )
}
