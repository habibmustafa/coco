import { ChevronsUpDown } from 'lucide-react'

import { Button, Collapsible } from '../../../src'

export default function CollapsiblePropsDemo() {
  return (
    <Collapsible
      className="w-full max-w-sm"
      label="Advanced settings"
      trigger={<Button variant="text" icon={<ChevronsUpDown />} aria-label="Toggle" />}
      content={
        <>
          <div className="rounded-md border border-border px-3 py-2 text-sm">Statement timeout</div>
          <div className="rounded-md border border-border px-3 py-2 text-sm">Max connections</div>
        </>
      }
    />
  )
}
