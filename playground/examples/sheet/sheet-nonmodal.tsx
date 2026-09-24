import { Button, Sheet } from '../../../src'

export default function SheetNonmodal() {
  return (
    <Sheet.Root modal={false}>
      <Sheet.Trigger asChild>
        <Button variant="outline">Show Sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content className="flex flex-col gap-0">
        <Sheet.Header>
          <Sheet.Title>Log details</Sheet.Title>
        </Sheet.Header>
        <div className="overflow-auto grow px-0">
          <Sheet.Section>
            <p className="text-sm text-foreground-lighter">
              This sheet does not block the underlying content, but it does overlap it.
            </p>
          </Sheet.Section>
        </div>
        <Sheet.Footer>
          <Sheet.Close asChild>
            <Button variant="outline">Close</Button>
          </Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}
