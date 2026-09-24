import { ChevronsUpDown } from 'lucide-react'

import { Button, Collapsible } from '../../../src'

export default function CollapsibleDemo() {
  return (
    <Collapsible.Root className="w-full max-w-sm">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm">Advanced settings</p>
        <Collapsible.Trigger asChild>
          <Button variant="text" icon={<ChevronsUpDown />} aria-label="Toggle" />
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content className="mt-2 flex flex-col gap-2">
        <div className="rounded-md border border-border px-3 py-2 text-sm">Statement timeout</div>
        <div className="rounded-md border border-border px-3 py-2 text-sm">Max connections</div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
